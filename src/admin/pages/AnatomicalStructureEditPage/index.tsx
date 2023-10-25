import { useNavigate, useParams } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Button from "../../../components/UI/Button";
import {
    createAnatomicalStructure,
    getAnatomicalStructureById,
    updateAnatomicalStructure,
} from "../../../requests/anatomicalStructureRequests";
import { getAnatomicalStructureSubjectList } from "../../../requests/anatomicalStructureSubjectRequests";
import s from "./styles.module.scss";

const AnatomicalStructureEditPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [createAnother, setCreateAnother] = useState(false);
    const formRef = useRef<HTMLFormElement | null>(null);

    const [subjectsList, setSubjectsList] = useState([]);
    const [structure, setStructure] = useState({});

    const notifySuccess = (message: string) => toast.success(message, { duration: 2000 });
    const notifyError = (message: string) => toast.error(message, { duration: 2000 });

    useEffect(() => {
        const fetchStructureData = async () => {
            try {
                const result = await getAnatomicalStructureById(id);
                setStructure(result);
            } catch (error) {
                console.error("Error fetching AnatomicalStructureSubjectList:", error);
            }
        };

        const fetchSubjectData = async () => {
            try {
                const result = await getAnatomicalStructureSubjectList();
                setSubjectsList(result);
            } catch (error) {
                console.error("Error fetching AnatomicalStructureSubjectList:", error);
            }
        };
        if (id) {
            fetchStructureData();
        } else {
            fetchSubjectData();
        }
    }, [id]);

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newStructure: Record<string, string> = {};

        formData.forEach((value, key) => {
            newStructure[key] = value as string;
            const elem = subjectsList.find((elem) => elem.name === value);
            if (elem) {
                newStructure.anatomicalStructureSubjectId = elem.id as string;
            }
        });

        if (id) {
            const updatedStructure = updateAnatomicalStructure(id, newStructure);
            if (updatedStructure?.id) {
                notifySuccess("изменение успешно!");
            } else {
                notifyError("ошибка!");
            }
        } else {
            const fetchData = async () => {
                try {
                    const createdStructure = await createAnatomicalStructure(newStructure);
                    if (!createAnother) {
                        navigate(`/admin/AnatomicalStructure/${createdStructure.id}`);
                    }
                } catch (error) {
                    console.error("Error fetching AnatomicalStructureList:", error);
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
                <div className={s.page_wrapper}>
                    <Toaster />
                    <h1 className="title">{id ? `Редактирование` : `Создание`} Анатомической структуры</h1>
                    <form ref={formRef} onSubmit={onSubmitHandler} className={s.form}>
                        <label>
                            Subject Name:
                            {id ? (
                                <input type="text" name="anatomicalStructureSubjectId" />
                            ) : (
                                <select name="anatomicalStructureSubjectId">
                                    {subjectsList.map((subject) => (
                                        <option key={subject.id}>{subject.name}</option>
                                    ))}
                                </select>
                            )}
                        </label>
                        <label>
                            Structure Name:
                            <input type="text" name="name" placeholder={structure.name} />
                        </label>
                        {typeof id === "undefined" ? (
                            <label>
                                Create Another:
                                <input
                                    type="checkbox"
                                    name="createAnother"
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
            </div>
        </div>
    );
};

export default AnatomicalStructureEditPage;
