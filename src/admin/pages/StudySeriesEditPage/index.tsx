import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "../../../components/UI/Button";
import { InstanceData, Series } from "../../../_types";
import { createStudySeries, getStudySeriesId, updateStudySeries } from "../../../requests/StudySeriesRequests";
import FrameSelectorComponent from "../../../components/FrameSelectorComponent";
import s from "./styles.module.scss";
import { PointsFormController } from "../../components/PointsFormController";

const StudySeriesEditPage = () => {
    const { id } = useParams<{ id: string }>();

    const [studySerie, setStudySerie] = useState<Series>();
    const [instances, setInstances] = useState<InstanceData[]>();
    const [activeFrameNumber, setActiveFrameNumber] = useState<number>(1);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const studyId = searchParams.get("studyId");

    useEffect(() => {
        if (id) {
            const fetchDataAndsetStudyseriesId = async () => {
                try {
                    const targetSerie = await getStudySeriesId(id);
                    setStudySerie(targetSerie);
                    setInstances(targetSerie.instanceDataList);
                } catch (error) {
                    console.error("StudySeriesEditPage - ", error);
                }
            };
            fetchDataAndsetStudyseriesId();
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
            const fetchDataAndUpdateStudySeries = async () => {
                try {
                    const updatedObj = await updateStudySeries({ ...obj, studyId }, id);
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
                    await createStudySeries({ ...obj, studyId });
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

    const handleCurrentFrame = (index: number) => {
        setActiveFrameNumber(index);
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
                            name="studyId"
                            id="Study"
                            defaultValue={studyId ? studyId : studySerie?.studyId}
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
                    <FrameSelectorComponent
                        studySerie={studySerie}
                        handleCurrentFrame={handleCurrentFrame}
                        activeFrameNumber={activeFrameNumber}
                    />
                    <PointsFormController
                        externalId={studySerie?.studyExternalId}
                        serie={studySerie!}
                        instances={instances!}
                        activeFrameNumber={activeFrameNumber}
                    />
                </>
            ) : null}
        </div>
    );
};

export default StudySeriesEditPage;
