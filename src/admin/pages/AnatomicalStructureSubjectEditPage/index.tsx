import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "../../../components/UI/Button";
import AnatomicalStructureList from "../../components/AnatomicalStructureList";
import {
    createAnatomicalStructureSubject,
    getAnatomicalStructureSubjectById,
    updateAnatomicalStructureSubject,
} from "../../../requests/anatomicalStructureSubjectRequests";
import { AnatomicalStructure, AnatomicalStructureSubjectModel } from "../../../_types";
import s from "./s.module.scss";

const AnatomicalStructureSubjectEditPage = () => {
    const { id } = useParams<string>();
    const navigate = useNavigate();
    const [createAnother, setCreateAnother] = useState(false);

    const [subject, setSubject] = useState<AnatomicalStructureSubjectModel>();
    const [anatomicalStructureList, setAnatomicalStructureList] = useState<AnatomicalStructure[]>([]);
    const [columns, setColumns] = useState<string[]>([]);
    const [subjectColor, setSubjectColor] = useState<string>(subject ? `#${subject.color}` : "000000");

    const formRef = useRef<HTMLFormElement | null>(null);
    const notifySuccess = (message: string) => toast.success(message, { duration: 2000 });
    const notifyError = (message: string) => toast.error(message, { duration: 2000 });

    useEffect(() => {
        const fetchData = async (subjectId: string) => {
            try {
                const result = await getAnatomicalStructureSubjectById(subjectId);
                setSubject(result);
                setSubjectColor(`#${result.color}`);
                setAnatomicalStructureList(result.anatomicalStructures);
            } catch (error) {
                console.error("Error fetching AnatomicalStructureSubjectList:", error);
            }
        };

        if (id) {
            fetchData(id);
        }
    }, [id]);

    useEffect(() => {
        if (anatomicalStructureList.length) {
            const columnsTitles = Object.keys(anatomicalStructureList[0]);
            columnsTitles.push("Actions");
            setColumns(columnsTitles);
        }
    }, [anatomicalStructureList]);

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newSubject: Record<string, string> = {};

        formData.forEach((value, key) => {
            newSubject[key] = value as string;
            if (key === "color") {
                newSubject.color = value.slice(1) as string;
            }
        });

        if (newSubject.name && newSubject.color) {
            const fetchDataUpdate = async (subjectId: string, obj: { name?: string; color?: string }) => {
                try {
                    const updatedSubject = await updateAnatomicalStructureSubject(subjectId, obj);
                    if (updatedSubject?.id) {
                        notifySuccess("изменение успешно!");
                    } else {
                        notifyError("ошибка!");
                    }
                } catch (error) {
                    console.error("Error fetching AnatomicalStructureSubjectList:", error);
                }
            };

            const fetchDataCreate = async (obj: { name?: string; color?: string }) => {
                try {
                    const createdSubject = await createAnatomicalStructureSubject(obj);

                    if (createdSubject) {
                        if (!createAnother) {
                            navigate(`/admin/AnatomicalStructureSubject/${createdSubject.id}`);
                        } else {
                            notifySuccess("Тема создана успешно!");
                        }
                    } else {
                        notifyError("ошибка!");
                    }
                } catch (error) {
                    console.error("Error fetching AnatomicalStructureSubjectList:", error);
                }
            };

            if (id) {
                fetchDataUpdate(id, newSubject);
            } else {
                fetchDataCreate(newSubject);
            }

            if (formRef.current) {
                formRef.current.reset();
            }
        }
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSubjectColor(e.target.value);
    };

    return (
        <div className={s.page}>
            <div className="container">
                <h1 className="title">{id ? "Редактировать" : "Создать"} тему</h1>
                <form ref={formRef} onSubmit={onSubmitHandler} className={s.form}>
                    <label htmlFor="themeName">
                        Theme Name*:
                        <input type="text" name="name" id="themeName" placeholder={subject?.name} required />
                    </label>
                    <label htmlFor="themeColor">
                        Theme Color*:
                        {subject ? (
                            <input type="color" name="color" id="themeColor" value={subjectColor} onChange={handleColorChange} required />
                        ) : (
                            <input type="color" name="color" id="themeColor" required />
                        )}
                    </label>
                    {typeof id === "undefined" ? (
                        <label htmlFor="createAnother">
                            Create Another:
                            <input
                                type="checkbox"
                                name="createAnother"
                                id="createAnother"
                                defaultChecked={createAnother}
                                onChange={() => {
                                    setCreateAnother(!createAnother);
                                }}
                            />
                        </label>
                    ) : null}
                    <Button>Save</Button>
                </form>
            </div>
            {id ? <AnatomicalStructureList {...{ anatomicalStructureList, columns }} /> : null}
        </div>
    );
};

export default AnatomicalStructureSubjectEditPage;
