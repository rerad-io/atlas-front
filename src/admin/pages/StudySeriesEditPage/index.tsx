import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "../../../components/UI/Button";
import { createStudySeries, getStudySeriesId, getStudySeriesList, updateStudySeries } from "../../../requests/StudySeriesRequests";
import s from "./s.module.css";
import { getStudyList } from "../../../requests/StudyRequests";
import FrameSelectorComponent from "../../../components/FrameSelectorComponent";
import { RenderComponent } from "../../../components/RenderComponent";
import { getInstanceDataList } from "../../../requests/instanceDataRequests";
import { InstanceData } from "../../../_types";
import { PointsFormCreate } from "../../components/PointsFormController";

const StudySeriesEditPage = () => {
    const { id } = useParams<{ id: string }>();

    const [studySerie, setStudySerie] = useState();
    // TODO: ID study должно браться из studySeries.study
    const [study, setStudy] = useState();
    // TODO: представление instanceData - раскоментировать когда будет исправлено
    const [instances, setInstances] = useState<InstanceData[]>();
    //const [currentFrame, setCurrentFrame] = useState();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const studyId = searchParams.get("studyId");

    useEffect(() => {
        if (id) {
            const fetchDataAndsetStudyseriesId = async () => {
                try {
                    // TODO: получать серию по ID =====
                    //const targetSerie = await getStudySeriesId(id);
                    const temporarySeriesList = await getStudySeriesList();
                    const targetSerie = temporarySeriesList.find((item) => item.id === id);
                    // =========
                    setStudySerie(targetSerie);
                    // TODO: представление instanceData - раскоментировать когда будет исправлено
                    //setInstances(result.study.instanceDataList);
                } catch (error) {
                    console.error("StudySeriesEditPage - ", error);
                }
            };
            fetchDataAndsetStudyseriesId();
        }
    }, [id]);

    useEffect(() => {
        if (studySerie) {
            // TODO: studyID должно браться из studySeries.study
            const fetchStudyId = async () => {
                try {
                    const temporaryStudyList = await getStudyList();
                    const tempStudy = temporaryStudyList.find((item) => {
                        if (item.seriesList.length) {
                            const tempSerie = item.seriesList.find((elem) => elem.id === studySerie?.id);
                            return tempSerie;
                        }
                    });
                    setStudy(tempStudy);
                } catch (error) {
                    console.error("StudySeriesEditPage - ", error);
                }
            };

            fetchStudyId();
        }
    }, [studySerie]);

    useEffect(() => {
        if (study) {
            // TODO: поиск инстанса должен быть сразу в серии
            const fetchInstanceData = async () => {
                try {
                    const temporaryInstance = await getInstanceDataList({});
                    const tempIstanceData = temporaryInstance.filter(
                        (item) => (item.series = studySerie?.name && item.study === study?.name),
                    );
                    setInstances(tempIstanceData);
                } catch (error) {
                    console.error("StudySeriesEditPage - ", error);
                }
            };
            fetchInstanceData();
        }
    }, [studySerie, study]);

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const obj: Record<string, string> = {};

        formData.forEach((value, key) => {
            obj[key] = value as string;
        });

        if (id) {
            const fetchDataAndUpdateStudySeries = async () => {
                try {
                    const updatedObj = await updateStudySeries(
                        {
                            ...obj,
                            study: {
                                id: studySerie?.study?.id,
                            },
                        },
                        id,
                    );
                    setStudySerie(updatedObj);
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
                    await createStudySeries({
                        ...obj,
                        study: {
                            id: studyId,
                        },
                    });
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

    return (
        <div className={s.page}>
            <div className="container">
                <h1 className="title">{id ? "Редактировать" : "Добавить"} Серию Исследования</h1>
                <form onSubmit={onSubmitHandler} className={s.form}>
                    <label htmlFor="Study">
                        Study ID:
                        <input
                            type="text"
                            name="study"
                            id="Study"
                            // TODO: studyID должно браться из studySeries.study
                            //defaultValue={studyId ? studyId : studySerie?.study?.id}
                            defaultValue={studyId ? studyId : study?.id}
                            disabled
                            style={{ width: "400px" }}
                        />
                    </label>
                    <label htmlFor="StudySeriesName">
                        Series Name:
                        <input type="text" id="StudySeriesName" name="name" defaultValue={studySerie?.name} />
                    </label>
                    <label htmlFor="studyNumber">
                        Series Number:
                        <input type="number" id="studyNumber" name="number" defaultValue={studySerie?.number} />
                    </label>
                    <label htmlFor="PreviewFrame">
                        Preview Frame:
                        <input type="text" name="previewFrame" id="PreviewFrame" defaultValue={studySerie?.previewFrame}></input>
                    </label>
                    <label htmlFor="SagitalFrame">
                        Sagital Frame:
                        <input type="text" name="sagitalFrame" id="SagitalFrame" defaultValue={studySerie?.sagitalFrame}></input>
                    </label>
                    <label htmlFor="CoronalFrame">
                        Coronal Frame:
                        <input type="text" name="coronalFrame" id="CoronalFrame" defaultValue={studySerie?.coronalFrame}></input>
                    </label>
                    <label htmlFor="instanceCount">
                        Instance Count:
                        <input type="number" name="instanceCount" id="instanceCount" defaultValue={studySerie?.instanceCount}></input>
                    </label>

                    <Button>Save</Button>
                </form>
            </div>
            {id ? (
                <>
                    <FrameSelectorComponent instances={instances} />
                    <RenderComponent />
                    {id ? <PointsFormCreate /> : null}
                </>
            ) : null}
        </div>
    );
};

export default StudySeriesEditPage;
