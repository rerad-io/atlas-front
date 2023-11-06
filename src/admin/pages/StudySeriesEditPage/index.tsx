import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "../../../components/UI/Button";
import FrameSelector from "../../../components/FrameSelector";
import RenderComponent from "../../../components/RenderComponent";
import { createStudySeries, updateStudySeries } from "../../../requests/StudySeriesRequests";
import { galleryList, temporarySeriesData } from "../../../data/data";
import s from "./s.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addSeriesList } from "../../../store/instance";

const StudySeriesEditPage = () => {
    const { id } = useParams<{ id: string }>();
		const dispatch = useDispatch();

		const { instances } = useSelector(({ instance }) => instance);
    const [studySeries, setStudySeries] = useState();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const studyId = searchParams.get("studyId");
		const [currentFrame, setCurrentFrame] = useState();

    useEffect(() => {
        if (id) {
            const fetchDataAndsetStudyseriesId = async () => {
                try {
									const result = temporarySeriesData.find((item) => item.id === id);
									setStudySeries(result);
                    // TODO: данные получать из базы
                    //const result = await getStudyseriesId(id);
										dispatch(addSeriesList(temporarySeriesData.filter((serie) => serie.study.id === result?.study?.id)));
                } catch (error) {
                    console.error("StudySeriesEditPage - ", error);
                }
            };
            fetchDataAndsetStudyseriesId();
        }
    }, [id]);
    useEffect(() => {
			setCurrentFrame(instances[studySeries?.number]?.[0]);
    }, [studySeries]);



    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const obj: Record<string, string> = {};

        formData.forEach((value, key) => {
            obj[key] = value as string;
        });

        //  TODO: чтение файла - раскоментировать когда будем реализовывать сохранение файла
        // const file_preview = formData.get("PreviewFrame") as File;
        // const file_sagital = formData.get("SagitalFrame") as File;
        // const file_coronal = formData.get("CoronalFrame") as File;

        // if (file_preview && file_preview.type.startsWith("image/")) {
        //     //промис чтения файла
        //     obj["PreviewFrame"] = Date.now() + "_P" + file_preview.name;
        //     obj["SagitalFrame"] = Date.now() + "_S" + file_sagital.name;
        //     obj["CoronalFrame"] = Date.now() + "_C" + file_coronal.name;

        //     // функция сохранения изображение на сервак - раскоментировать вместе с функцией readFile
        //     // const imgData = await readFile(file);
        //     // SAVE_IMAGE_FUNCTION(imgData);
        // }

        if (id) {
            const fetchDataAndUpdateStudySeries = async () => {
                try {
                    const updatedObj = await updateStudySeries(obj, id);
                    setStudySeries(updatedObj);
                    toast.success("Study Series updated!");
                } catch (error) {
                    toast.error("Study Series update - error!");
                    console.log("Error StudySeriesEditPage, method PUT", error);
                }
            };
            fetchDataAndUpdateStudySeries();
        } else {
            const fetchDataAndCreateStudySeries = async () => {
                try {
                    await createStudySeries(obj);
                    toast.success("Study Series created!");
                } catch (error) {
                    toast.error("Study Series create - error!");
                    console.log("Error StudySeriesEditPage, method POST", error);
                }
            };
            fetchDataAndCreateStudySeries();
        }

        e.target.reset();
    };

    //  TODO: чтение файла - раскоментировать когда будем реализовывать сохранение файла
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

    const handleClick = (id: string) => {
        const newFrame = instances[studySeries?.number];
        setCurrentFrame(newFrame[id]);
    };

    return (
        <div className={s.page}>
            <div className="container">
                <h1 className="title">{id ? "Редактировать" : "Добавить"} Серию Исследования</h1>
                <form onSubmit={onSubmitHandler} className={s.form}>
                    <label htmlFor="Study">
                        Study:
                        <input
                            type="text"
                            name="study"
                            id="Study"
                            defaultValue={studyId ? studyId : studySeries?.study?.id}
                            disabled
                            style={{ width: "400px" }}
                        />
                    </label>
                    <label htmlFor="StudySeriesName">
                        Study Series Name:
                        <input type="text" id="StudySeriesName" name="name" defaultValue={studySeries?.name} />
                    </label>
                    <label htmlFor="studyNumber">
                        Study Number:
                        <input type="number" id="studyNumber" name="number" defaultValue={studySeries?.number} />
                    </label>
                    <label htmlFor="PreviewFrame">
                        Preview Frame:
                        <input type="text" name="previewFrame" id="PreviewFrame" defaultValue={studySeries?.previewFrame}></input>
                    </label>
                    <label htmlFor="SagitalFrame">
                        Sagital Frame:
                        <input type="text" name="sagitalFrame" id="SagitalFrame" defaultValue={studySeries?.sagitalFrame}></input>
                    </label>
                    <label htmlFor="CoronalFrame">
                        Coronal Frame:
                        <input type="text" name="coronalFrame" id="CoronalFrame" defaultValue={studySeries?.coronalFrame}></input>
                    </label>
                    <label htmlFor="instanceCount">
                        Instance Count:
                        <input type="number" name="instanceCount" id="instanceCount" defaultValue={studySeries?.instanceCount}></input>
                    </label>

                    <Button>Save</Button>
                </form>
            </div>
            {id ? (
                <>
                  <FrameSelector frameList={instances[studySeries?.number]} handleClick={handleClick} />
                  <RenderComponent currentFrame={currentFrame} />
                </>
            ) : null}
        </div>
    );
};

export default StudySeriesEditPage;
