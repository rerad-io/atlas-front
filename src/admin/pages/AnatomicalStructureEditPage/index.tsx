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
import { AnatomicalStructureModel, AnatomicalStructureSubject } from "../../../_types";
import s from "./styles.module.scss";

const AnatomicalStructureEditPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const formRef = useRef<HTMLFormElement | null>(null);

    const [createAnother, setCreateAnother] = useState(false);

    const [subjectsList, setSubjectsList] = useState<AnatomicalStructureSubject[]>([]);
    const [structure, setStructure] = useState<AnatomicalStructureModel>();
    const [subject, setSubject] = useState<AnatomicalStructureSubject>();

    const notifySuccess = (message: string) => toast.success(message, { duration: 2000 });
    const notifyError = (message: string) => toast.error(message, { duration: 2000 });

    useEffect(() => {
        const fetchStructureData = async (structureId: string = "") => {
            try {
                const targetStructure: AnatomicalStructureModel = await getAnatomicalStructureById(structureId);
                setStructure(targetStructure);
            } catch (error) {
                console.error("Error fetching AnatomicalStructureSubjectList:", error);
            }
        };
        const fetchSubjectsData = async () => {
            try {
                const subjects: AnatomicalStructureSubject[] = await getAnatomicalStructureSubjectList();
                setSubjectsList(subjects);
            } catch (error) {
                console.error("Error fetching AnatomicalStructureSubjectList:", error);
            }
        };
        if (id) {
            fetchStructureData(id);
        }
        fetchSubjectsData();
    }, [id]);

    useEffect(() => {
        setSubject(structure?.anatomicalStructureSubject);
    }, [structure]);

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const targetSubject = subjectsList.find((subject) => subject.name === formData.get("anatomicalStructureSubjectId"));
        const newStructure: { name: string; anatomicalStructureSubject: { id: string } } = {
            name: formData.get("name") as string,
            anatomicalStructureSubject: {
                id: targetSubject?.id || "",
            },
        };
        const fetchDataUpdate = async (structureId: string, object: { name: string; anatomicalStructureSubject: { id: string } }) => {
            try {
                const updatedStructure = await updateAnatomicalStructure(structureId, object);
                if (updatedStructure) {
                    notifySuccess("изменение успешно!");
                } else {
                    notifyError("ошибка!");
                }
            } catch (error) {
                notifyError("ошибка!");
                console.error("Error fetching AnatomicalStructureList:", error);
            }
        };

        const fetchDataCreate = async (object: { name: string; anatomicalStructureSubject: { id: string } }) => {
            try {
                const createdStructure = await createAnatomicalStructure(object);
                if (!createAnother) {
                    navigate(`/admin/AnatomicalStructure`);
                } else {
                    if (createdStructure?.id) {
                        notifySuccess("обьект создан!");
                    } else {
                        notifyError("ошибка!");
                    }
                }
            } catch (error) {
                notifyError("ошибка!");
                console.error("Error fetching AnatomicalStructureList:", error);
            }
        };

        if (id) {
            fetchDataUpdate(id, newStructure);
        } else {
            fetchDataCreate(newStructure);
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
                        {
                            // TODO: На данный момент тему при редактировании Анатомической структуры
                            // поменять нельзя. При изменениии раскоментировать select
                            /*<label>
                            Subject Name:
																<select name="anatomicalStructureSubjectId" required>
                                    <option disabled value={""}>
                                        выбрать
                                    </option>
                                    {subjectsList.map((subject) => (
                                        <option key={subject.id}>{subject.name}</option>
                                    ))}
                                </select>
                        </label>*/
                        }
                        <p>
                            {" "}
                            Subject Name: <b>{subject?.name}</b>
                        </p>

                        <label>
                            Structure Name*:
                            <input type="text" name="name" placeholder={structure?.name} required />
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
