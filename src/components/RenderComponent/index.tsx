import { useEffect, useState, useRef } from "react";
import { fabric } from "fabric";
import toast, { Toaster } from "react-hot-toast";
import { CanvasInstance } from "../CanvasInstance";
import { AnatomicalStructure, InstanceData } from "../../_types";
import { PointsFormController } from "../../admin/components/PointsFormController";
import { createInstanceData } from "../../requests/instanceDataRequests";
import s from "./styles.module.scss";

export const RenderComponent = ({
    context,
    instances,
    activeFrameNumber,
}: {
    context: string;
    instances: InstanceData[];
		activeFrameNumber:number
}) => {
    const canvasEl = useRef<HTMLCanvasElement>(null);

    const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas>();
    const [newPoint, setNewPoint] = useState<fabric.Circle>();

    const notifySuccess = (message: string) => toast.success(message, { duration: 2000 });
    const notifyError = (message: string) => toast.error(message, { duration: 2000 });

    useEffect(() => {
        const options = {
            width: 500,
            height: 500,
            backgroundColor: "whitesmoke",
            fireMiddleClick: true,
        };

        const canvas = new fabric.Canvas(canvasEl.current, options);

        canvas?.on("mouse:down", (event) => {
            const pointer = canvas.getPointer(event.e);
						// TODO: логи для проверки отрисовки точек
            //console.log("🚀 ~ file: index.tsx:28 ~ canvas?.on ~ pointer:", pointer);
            const point = new fabric.Circle({
                top: pointer.y,
                left: pointer.x,
                radius: 3,
                fill: "green",
            });
            //console.log(`Mouse click at (${point.top}, ${point.left})`);
            setNewPoint(point);
        });

        setFabricCanvas(canvas);

        // TODO: возникает ошибка удаления DOM NODE?
        //return () => {
        //    if (fabricCanvas) {
        //        fabricCanvas.dispose();
        //        setFabricCanvas(null);
        //    }
        //};

        // TODO: ограничение eslint, требует зависимости
    }, []);

    const handleSubmit = async (structure: AnatomicalStructure) => {
        try {
            const newInstance = {
                study: instances[0]?.studyId,
                series: instances[0]?.seriesId,
                structure: structure.id,
                instanceNumber: instances[0]?.instanceNumber,
                type: "Point",
                x: newPoint?.left,
                y: newPoint?.top,
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
