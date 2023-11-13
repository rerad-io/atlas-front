import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { createStudy, getStudyId, updateStudy } from "../../../requests/StudyRequests";
import Button from "../../../components/UI/Button";
import StudySeriesList from "../../components/StudySeriesList";
import s from "./styles.module.scss";

const StudyEditPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const formRef = useRef<HTMLFormElement | null>(null);
    const [createAnother, setCreateAnother] = useState(false);

    const [study, setStudy] = useState();

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
        const formData = new FormData(e.currentTarget);
        const obj: Record<string, string> = {};

        formData.forEach((value, key) => {
            if (key !== "createAnother" && key !== "externalId") {
                obj[key] = value as string;
            }
        });

        if (id) {
            const fetchDataAndUpdateStudy = async () => {
                try {
                    const updatedObj = await updateStudy(obj, id);
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
                    const data = await createStudy(obj);
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

    return (
        <div className={s.page}>
            <h1 className="title">{id ? `Редактирование` : `Создание`} Исследования</h1>
            <form ref={formRef} onSubmit={onSubmitHandler} className={s.form}>
                {
                    <label htmlFor="externalId">
                        External Id:
                        <input
                            required
                            type="text"
                            name="externalId"
                            id="externalId"
                            defaultValue={study?.externalId}
                            placeholder={study?.externalId}
                            style={{ width: "300px" }}
                        />
                    </label>
                }
                <label htmlFor="studyName">
                    Study Name:
                    <input required type="text" name="name" id="studyName" defaultValue={study?.name} />
                </label>
                <label htmlFor="studyDescription">
                    Study Description:
                    <textarea id="studyDescription" name="description" rows={4} cols={50} defaultValue={study?.description}></textarea>
                </label>
                <label htmlFor="previewFrame">
                    Preview Frame:
                    <input type="text" name="previewFrame" id="previewFrame" defaultValue={study?.previewFrame} />
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

            {id ? <StudySeriesList seriesList={study?.seriesList} studyId={id} /> : null}
        </div>
    );
};

export default StudyEditPage;
