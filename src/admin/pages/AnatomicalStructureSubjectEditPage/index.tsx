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
    const [structures, setStructures] = useState<AnatomicalStructure[]>([]);

    const formRef = useRef<HTMLFormElement | null>(null);
    const notifySuccess = (message: string) => toast.success(message, { duration: 2000 });
    const notifyError = (message: string) => toast.error(message, { duration: 2000 });

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const result = await getAnatomicalStructureSubjectById(id);
                    setSubject(result);
                    setStructures(result.anatomicalStructures);
                } catch (error) {
                    console.error("Error fetching AnatomicalStructureSubjectList:", error);
                }
            };

            fetchData();
        }
    }, [id]);

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newSubject: Record<string, string> = {};

        formData.forEach((value, key) => {
            newSubject[key] = value as string;
            newSubject.color = value.slice(1) as string;
        });

        if (newSubject.name) {
            const fetchData = async () => {
                try {
                    if (id) {
                        const updatedSubject = updateAnatomicalStructureSubject(id, newSubject);
                        if (updatedSubject?.id) {
                            notifySuccess("изменение успешно!");
                        } else {
                            notifyError("ошибка!");
                        }
                    } else {
                        const createdSubject = await createAnatomicalStructureSubject(newSubject);
                        if (!createAnother) {
                            navigate(`/admin/AnatomicalStructureSubject/${createdSubject.id}`);
                        } else {
                            if (createdSubject?.id) {
                                notifySuccess("обьект создан!");
                            } else {
                                notifyError("ошибка!");
                            }
                        }
                    }
                } catch (error) {
                    console.error("Error fetching AnatomicalStructureSubjectList:", error);
                }
            };

            fetchData();
        }

        if (formRef.current) {
            formRef.current.reset();
        }
    };

    return (
        <div className={s.page}>
            <div className="container">
                <h1 className="title">{id ? "Редактировать" : "Создать"} тему</h1>
                <form ref={formRef} onSubmit={onSubmitHandler} className={s.form}>
                    <label htmlFor="themeName">
                        Theme Name*:
                        <input type="text" name="name" id="themeName" placeholder={subject?.name} required/>
                    </label>
                    <label htmlFor="themeColor">
                        Theme Color*:
                        <input type="color" name="color" id="themeColor" value = {subject ? `#${subject?.color}` : `#ffffff`} required/>
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
            {id ? <AnatomicalStructureList anatomicalStructureList={structures} /> : null}
        </div>
    );
};

export default AnatomicalStructureSubjectEditPage;
