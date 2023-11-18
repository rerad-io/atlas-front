import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { AnatomicalStructure, InstanceData, Series } from "../../../_types";
import { getAnatomicalStructureList } from "../../../requests/anatomicalStructureRequests";
import Button from "../../../components/UI/Button";
import toast, { Toaster } from "react-hot-toast";
import { createInstanceData, deleteInstanceData } from "../../../requests/instanceDataRequests";
import s from "./styles.module.scss";
import { Point, RenderComponent } from "../../../components/RenderComponent";

type PointsFormControllerProps = {
    instances: InstanceData[];
    externalId: string;
    serie: Series;
    activeFrameNumber: number;
};

export const PointsFormController = ({ instances, externalId, serie, activeFrameNumber }: PointsFormControllerProps) => {
    const [anatomicalStructureList, setAnatomicalStructureList] = useState<AnatomicalStructure[]>([]);
    const [currentInstancesList, setCurrentInstancesList] = useState<InstanceData[]>([]);
    const [selectedInstanceId, setSelectedInstanceId] = useState<string>();
    const [selectedStructure, setSelectedStructure] = useState<AnatomicalStructure>();

    const notifySuccess = (message: string) => toast.success(message, { duration: 2000 });
    const notifyError = (message: string) => toast.error(message, { duration: 2000 });
    const newPointRef = useRef<fabric.Circle>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const structureList = await getAnatomicalStructureList({});
                const currentInstances = instances.filter((instance) => instance.instanceNumber === activeFrameNumber);
                const usedStructureIds = currentInstances?.map((instance) => instance.structureId);
                const availableStructures = structureList.filter((structure) => !usedStructureIds.includes(structure.id));

                setCurrentInstancesList(currentInstances);
                setAnatomicalStructureList(availableStructures);
            } catch (error) {
                console.error("Error fetching AnatomicalStructureList:", error);
            }
        };

        fetchData();
    }, [activeFrameNumber, instances]);

    const handleSelectInstance = (event: React.FormEvent<HTMLSelectElement>) => {
        const selectedId = event.currentTarget.value;
        setSelectedInstanceId(selectedId);
    };
    const handleSelectStructure = (event: React.FormEvent<HTMLSelectElement>) => {
        const selectedIndex = +event.currentTarget.value;
        if (selectedIndex >= 0) setSelectedStructure(anatomicalStructureList[selectedIndex]);
    };

    const handleRemove = async () => {
        if (selectedInstanceId) {
            const isAlert = confirm("уверены что хотите удалить структуру из исследования?");
            if (isAlert) {
                try {
                    const result = await deleteInstanceData(selectedInstanceId);
                    if (result === 204) {
                        const targetInstance = selectedInstanceId.find((instance) => instance.id === selectedInstanceId);
                        setCurrentInstancesList(targetInstance);
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

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedStructure) handleSubmit(selectedStructure);
    };

    const handleSubmit = async (structure: AnatomicalStructure) => {
        if (!newPointRef.current) {
            notifyError("Поставьте сперва точку.");
            return;
        }
        try {
            const newInstance = {
                studyId: serie.studyId,
                seriesId: serie.id,
                structureId: structure.id,
                instanceNumber: activeFrameNumber,
                type: "Point",
                x: newPointRef.current.left,
                y: newPointRef.current.top,
                path: "path",
            };
            const result = await createInstanceData(newInstance);
            if (result.id) {
                notifySuccess("новая структура отмечена!");
            } else {
                notifyError("ошибка фиксации структуры!");
            }
        } catch (error) {
            notifyError("ошибка фиксации структуры!");
            console.error("Error fetching RenderComponent:", error);
        }
    };

    const onCanvasClick = (point: Point, sender: fabric.Canvas) => {
        console.log("PointsFormController.onCanvasClick");

        if (newPointRef.current) {
            newPointRef.current.left = point.x;
            newPointRef.current.top = point.y;
        } else {
            newPointRef.current = new fabric.Circle({
                left: point.x,
                top: point.y,
                originX: "center",
                originY: "center",
                radius: 3,
                fill: "green",
            });

            sender.add(newPointRef.current);
        }

        sender.moveTo(newPointRef.current, 1000);

        sender.renderAll();
    };

    return (
        <>
            <RenderComponent
                context="admin"
                externalId={externalId}
                instances={instances}
                activeFrameNumber={activeFrameNumber}
                onClick={(point, sender) => onCanvasClick(point, sender)}
            />
            <section>
                <div className="container">
                    <Toaster />
                    <form className={s.form} onSubmit={submit}>
                        <h3>Форма редактирования / добавления точек </h3>
                        <label>
                            Существующие точки
                            <select name="points" onChange={handleSelectInstance}>
                                <option value="">без значения</option>
                                {currentInstancesList?.map((el) => (
                                    <option key={el.id} value={el.id}>
                                        {`${el.structureName} (${el.x}, ${el.y})`}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Анатомические структуры
                            <select name="structure" onChange={handleSelectStructure} required>
                                <option value="">без значения</option>
                                {anatomicalStructureList?.map((el, index) => (
                                    <option key={el.id} value={index}>
                                        {el.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <div className={s.buttons}>
                            <Button type="button" onClick={handleRemove}>
                                Удалить
                            </Button>
                            <Button type="submit">Сохранить</Button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};
