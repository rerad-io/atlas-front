import { useEffect, useState, useRef } from "react";
import { fabric } from "fabric";
import toast, { Toaster } from "react-hot-toast";
import { CanvasInstance } from "../CanvasInstance";
import { AnatomicalStructure, InstanceData, Series } from "../../_types";
import { PointsFormController } from "../../admin/components/PointsFormController";
import { createInstanceData } from "../../requests/instanceDataRequests";
import s from "./styles.module.scss";

export const RenderComponent = ({
    context,
    instances,
    externalId,
    serie,
    activeFrameNumber,
}: {
    context: string;
    externalId: string;
    serie: Series;
    instances: InstanceData[];
    activeFrameNumber: number;
}) => {
    const canvasEl = useRef<HTMLCanvasElement>(null);

    const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas>();
    const [newPoint, setNewPoint] = useState<fabric.Circle>();
    const [pointCoordinates, setPointCoordinates] = useState();

    const notifySuccess = (message: string) => toast.success(message, { duration: 2000 });
    const notifyError = (message: string) => toast.error(message, { duration: 2000 });

    useEffect(() => {
        const options = {
            width: 500,
            height: 500,
            backgroundColor: "whitesmoke",
            fireMiddleClick: true,
            hasControls: false,
            hasBorders: false,
            lockRotation: true,
            lockScalingX: true,
            lockScalingY: true,
        };

        const canvas = new fabric.Canvas(canvasEl.current, options);

        canvas?.on("mouse:down", (event) => {
            const pointer = canvas.getPointer(event.e);
            const point = new fabric.Circle({
                left: pointer.x,
                top: pointer.y,
                originX: "center",
                originY: "center",
                radius: 3,
                fill: "green",
            });
            console.log(`Mouse click at (${point.left}, ${point.top})`);
            setPointCoordinates({
                x: point.left,
                y: point.top,
            });
            setNewPoint(point);
        });

        setFabricCanvas(canvas);
    }, []);

    const handleSubmit = async (structure: AnatomicalStructure) => {
        console.log("newPoint: ", newPoint);
        try {
            const newInstance = {
                studyId: serie.studyId,
                seriesId: serie.id,
                structureId: structure.id,
                instanceNumber: activeFrameNumber,
                type: "Point",
                x: pointCoordinates?.x,
                y: pointCoordinates?.y,
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

    return (
        <section className={s.frame_info}>
            <div className="container">
                <Toaster />
                <div className={s.current_frame}>
                    <canvas ref={canvasEl} />
                    {fabricCanvas &&
                        (context !== "app" ? (
                            <CanvasInstance
                                fabricCanvas={fabricCanvas}
                                newPoint={newPoint}
                                context={context}
                                externalId={externalId}
                                activeFrameNumber={activeFrameNumber}
                                instances={instances}
                            />
                        ) : (
                            <CanvasInstance fabricCanvas={fabricCanvas} context={context} />
                        ))}
                </div>
            </div>
            {context !== "app" && <PointsFormController handleSubmit={handleSubmit} instances={instances} />}
        </section>
    );
};
