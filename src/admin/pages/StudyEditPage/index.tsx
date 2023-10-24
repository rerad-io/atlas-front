import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import s from "./s.module.css";
import Button from "../../../components/UI/Button";
import StudySeriesList from "../../components/StudySeriesList";
import { createStudy, getStudyId, updateStudy } from "../../../requests/StudyRequests.js";
import toast from "react-hot-toast";

const StudyEditPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [createAnother, setCreateAnother] = useState(false);

    const [study, setStudy] = useState();
    // console.log(study);

    useEffect(() => {
        if (id) {
            const fetchingData = async () => {
                try {
                    const result = await getStudyId(id);
                    setStudy(result);
                } catch (error) {
                    console.error("StudyEditPage - ", error);
                }
            };
            fetchingData();
        }
    }, [id]);

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const obj: Record<string, string> = {};

        formData.forEach((value, key) => {
            obj[key] = value as string;
        });

        if (id) {
            // Редактирование существующего исследования
            const fetchData = async () => {
                try {
                    const updatedObj = await updateStudy(obj, id);
                    setStudy(updatedObj);
                    toast.success("Study updated!");
                } catch (error) {
                    console.log("Error StudyEditPage, method PUT", error);
                }
            };
            fetchData();
        } else {
            // Создание нового исследования
            const fetchData = async () => {
                try {
                    // console.log(obj);
                    await createStudy(obj);
                    toast.success("Study created!");
                    // при возврате учти createAnother
                    if (!createAnother) {
                        navigate(`/admin/Study`);
                    }
                } catch (error) {
                    console.log("Error StudyEditPage, method POST", error);
                }
            };
            fetchData();
        }

        e.target.reset();
    };

    //  чтение файла - раскоментировать когда будем реализовывать сохранение файла
    // const readFile = (file: File): Promise<string> => {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();

    //         reader.onload = (e) => {
    //             resolve(e.target.result as string);
    //         };

    //         reader.onerror = (error) => {
    //             reject(error);
    //         };

    //         reader.readAsDataURL(file);
    //     });
    // };

    return (
        <div className={s.page}>
            <h1>Создание/Редактирование Исследования</h1>
            <form onSubmit={onSubmitHandler} className={s.form}>
                <label htmlFor="studyName">
                    Study Name:
                    <input required type="text" name="name" id="studyName" defaultValue={study?.name} />
                </label>
                <label htmlFor="studyDescription">
                    Study Description:
                    <textarea id="studyDescription" name="description" rows={4} cols={50} defaultValue={study?.description}></textarea>
                </label>
                {/* <input type="file" name="previewFrame" accept="image/*"></input> */}
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

            {typeof id !== "undefined" ? <StudySeriesList seriesId={id} /> : null}
        </div>
    );
};

export default StudyEditPage;
