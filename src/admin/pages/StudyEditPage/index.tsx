import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { createStudy, getStudyId, updateStudy } from "../../../requests/StudyRequests";
import Button from "../../../components/UI/Button";
import StudySeriesList from "../../components/StudySeriesList";
import s from "./styles.module.scss";
import { Study } from "../../../_types";

const StudyEditPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const formRef = useRef<HTMLFormElement | null>(null);

    const [study, setStudy] = useState<Study>();
    const [createAnother, setCreateAnother] = useState(false);
    const [values, setValues] = useState({
        externalId: "",
        name: "",
        description: "",
        previewFrame: "",
    });

    useEffect(() => {
        if (id) {
            const fetchDataAndSetStudyId = async () => {
                try {
                    const result = await getStudyId(id);
                    setStudy(result);
                } catch (error) {
                    console.error("StudyEditPage - ", error);
                }
            };
            fetchDataAndSetStudyId();
        }
    }, [id]);

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (id) {
            const fetchDataAndUpdateStudy = async () => {
                try {
                    const updatedObj = await updateStudy(values, id);
                    setStudy(updatedObj);
                    toast.success("Study updated!");
                } catch (error) {
                    toast.error("Study update - error!");
                    console.log("Error StudyEditPage, method PUT", error);
                }
            };
            fetchDataAndUpdateStudy();
        } else {
            const fetchDataAndCreateStudy = async () => {
                try {
                    const data = await createStudy(values);
                    if (data) {
                        if (!createAnother) {
                            navigate(`/admin/Study`);
                        } else {
                            toast.success("Исследование создано успешно!");
                        }
                    } else {
                        toast.error("Ошибка создания исследования");
                    }
                } catch (error) {
                    toast.error("Study create - Error");
                    console.log("Error StudyEditPage, method POST", error);
                }
            };
            fetchDataAndCreateStudy();
        }

        if (formRef.current) {
            formRef.current.reset();
        }
    };

    const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <div className={s.page}>
            <h1 className="title">{id ? `Редактирование` : `Создание`} Исследования</h1>
            <form ref={formRef} onSubmit={onSubmitHandler} className={s.form}>
                {
                    <label>
                        Внешний идентификатор * :
                        <input
                            required
                            type="text"
                            name="externalId"
                            defaultValue={study ? study.externalId : ""}
                            style={{ width: "300px", border: study ? "none" : "1px solid black", backgroundColor: "white" }}
                            onChange={handleChange}
                            disabled={study ? true : false}
                        />
                    </label>
                }
                <label>
                    Название исследования * :
                    <input required type="text" name="name" defaultValue={study?.name} onChange={handleChange} />
                </label>
                <label>
                    Описание исследования:
                    <textarea name="description" rows={4} cols={50} defaultValue={study?.description} onChange={handleChange} />
                </label>
                <label>
                    Предварительный кадр:
                    <input type="text" name="previewFrame" defaultValue={study?.previewFrame} onChange={handleChange} />
                </label>
                {typeof id === "undefined" ? (
                    <label>
                        Создать еще:
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
                <Button>Сохранить</Button>
            </form>

            {id ? <StudySeriesList seriesList={study?.seriesList} studyId={id} /> : null}
        </div>
    );
};

export default StudyEditPage;
