import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../../components/UI/Button";
import { AnatomicalStructure, InstanceData, Point, SeriesListModel } from "../../../_types";
import { createStudySeries, getStudySeriesId, updateStudySeries } from "../../../requests/StudySeriesRequests";
import FrameSelectorComponent from "../../../components/FrameSelectorComponent";
import toast, { Toaster } from "react-hot-toast";
import { PointsFormController } from "../../components/PointsFormController";
import { createInstanceData, deleteInstanceData, updateInstanceData } from "../../../requests/instanceDataRequests";
import { getAnatomicalStructureList } from "../../../requests/anatomicalStructureRequests";
import { RenderComponent } from "../../../components/RenderComponent";
import s from "./styles.module.scss";

const StudySeriesEditPage = () => {
    const { id } = useParams<{ id: string }>();

    const [serieId, setSerieId] = useState<string>(id as string);
    const [studySerie, setStudySerie] = useState<SeriesListModel>();
    const [instances, setInstances] = useState<InstanceData[]>();
    const [activeFrameNumber, setActiveFrameNumber] = useState<number>(1);
    const [newPoint, setNewPoint] = useState<Point>();
    const [currentInstancesList, setCurrentInstancesList] = useState<InstanceData[]>([]);
    const [anatomicalStructureList, setAnatomicalStructureList] = useState<AnatomicalStructure[]>([]);

    const notifySuccess = (message: string) => toast.success(message, { duration: 2000 });
    const notifyError = (message: string) => toast.error(message, { duration: 2000 });

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const studyId = searchParams.get("studyId");

    useEffect(() => {
        if (id) {
            const fetchDataAndsetStudyseriesId = async () => {
                try {
                    setSerieId(id);
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

    useEffect(() => {
        const currentInstances = instances?.filter((instance) => instance.instanceNumber === activeFrameNumber);
        if (currentInstances) setCurrentInstancesList(currentInstances);
    }, [activeFrameNumber, instances]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const structureList = await getAnatomicalStructureList({});
                const usedStructureIds = currentInstancesList?.map((instance) => instance.structureId);
                const availableStructures = structureList?.filter(({ id }) => !usedStructureIds?.includes(id));
                setAnatomicalStructureList(availableStructures);
            } catch (error) {
                console.error("Error fetching PointsFormController:", error);
            }
        };
        fetchData();
    }, [activeFrameNumber, instances, currentInstancesList]);

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

        (e.currentTarget as HTMLFormElement).reset();
    };

    const handleCurrentFrame = (index: number) => {
        setActiveFrameNumber(index);
    };

    const handleSubmit = async (structure: AnatomicalStructure) => {
        if (!newPoint?.left) {
            notifyError("Определите расположение структуры!");
            return;
        }
        try {
            const newInstance = {
                studyId: studySerie?.studyId,
                seriesId: studySerie?.id,
                structureId: structure.id,
                instanceNumber: activeFrameNumber,
                type: "POINT",
                x: newPoint?.left,
                y: newPoint?.top,
                path: "path",
            };
            const result = await createInstanceData(newInstance);
            if (result.id) {
                notifySuccess("новая структура отмечена!");
                const targetSerie = await getStudySeriesId(serieId);
                setStudySerie(targetSerie);
                setInstances(targetSerie.instanceDataList);
                setNewPoint({} as Point);
            } else {
                notifyError("ошибка фиксации структуры!");
            }
        } catch (error) {
            notifyError("ошибка фиксации структуры!");
            console.error("Error fetching PointsFormController:", error);
        }
    };

    const handleRemove = async (selectedInstanceId: string) => {
        if (selectedInstanceId) {
            const isAlert = confirm("уверены что хотите удалить структуру из исследования?");
            if (isAlert) {
                try {
                    const result = await deleteInstanceData(selectedInstanceId);
                    if (result === 204) {
                        const targetSerie = await getStudySeriesId(serieId);
                        setStudySerie(targetSerie);
                        setInstances(targetSerie.instanceDataList);
                        notifySuccess("структура удалена из инстанса!");
                    } else {
                        notifyError("ошибка удаления структуры!");
                    }
                } catch (error) {
                    notifyError("ошибка удаления структуры!");
                    console.error("Error fetching PointsFormController:", error);
                }
            }
        }
    };

    const handleApprove = async (selectedInstanceId: string) => {
        if (selectedInstanceId) {
            try {
                const targetInstance = currentInstancesList.find((instance) => instance.id === selectedInstanceId);
                if (targetInstance?.status !== "VERIFIED") {
                    const verifiedInstance = await updateInstanceData(selectedInstanceId, {
                        ...targetInstance,
                        status: "VERIFIED",
                    });
                    if (verifiedInstance.id) {
                        const targetSerie = await getStudySeriesId(serieId);
                        setStudySerie(targetSerie);
                        setInstances(targetSerie.instanceDataList);
                        notifySuccess("структура подтверждена!");
                    } else {
                        notifyError("ошибка подтверждения!");
                    }
                } else {
                    notifyError("структура уже была подтверждена");
                }
            } catch (error) {
                notifyError("ошибка подтверждения!");
                console.error("Error fetching PointsFormController:", error);
            }
        }
    };

    return (
        <div className={s.page}>
            <div className="container">
                <Toaster />
                <h1 className="title">{id ? "Редактировать" : "Добавить"} Серию Исследования</h1>
                <form onSubmit={onSubmitHandler} className={s.form}>
                    <label htmlFor="Study">
                        Study ID*:
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
                        Series Name*:
                        <input type="text" id="StudySeriesName" name="name" defaultValue={studySerie?.name} required />
                    </label>
                    <label htmlFor="studyNumber">
                        Series Number*:
                        <input type="number" id="studyNumber" name="number" defaultValue={studySerie?.number} required />
                    </label>
                    <label htmlFor="PreviewFrame">
                        Preview Frame:
                        <input type="text" name="previewFrame" id="PreviewFrame" defaultValue={studySerie?.previewFrame} required></input>
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
                        setNewPoint={setNewPoint}
                        studySerie={studySerie}
                        handleCurrentFrame={handleCurrentFrame}
                        activeFrameNumber={activeFrameNumber}
                    />
                    <div className="container">
                        <div className={s.controller_wrapper}>
                            <RenderComponent
                                context="admin"
                                externalId={studySerie?.studyExternalId}
                                setNewPoint={setNewPoint}
                                newPoint={newPoint}
                                currentInstancesList={currentInstancesList}
                                seriesNumber={studySerie?.number}
                                activeFrameNumber={activeFrameNumber}
                            />
                            <PointsFormController
                                handleApprove={handleApprove}
                                handleSubmit={handleSubmit}
                                anatomicalStructureList={anatomicalStructureList}
                                handleRemove={handleRemove}
                                currentInstancesList={currentInstancesList}
                            />
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default StudySeriesEditPage;
