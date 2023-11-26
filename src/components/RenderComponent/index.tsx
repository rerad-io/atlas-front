import { useEffect, useState, useRef } from "react";
import { fabric } from "fabric";
import { CanvasInstance } from "../CanvasInstance";
import { InstanceData, Point } from "../../_types";
import s from "./styles.module.scss";

type RenderComponentProps = {
    context: string;
    externalId?: string;
    currentInstancesList: InstanceData[];
    activeFrameNumber: number;
    seriesNumber?: number;
    newPoint?: Point;
    setNewPoint: (point: Point) => void;
};

export const RenderComponent = ({
    context,
    externalId,
    currentInstancesList,
    activeFrameNumber,
    seriesNumber,
    newPoint,
    setNewPoint,
}: RenderComponentProps) => {
    const canvasEl = useRef<HTMLCanvasElement>(null);

    const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas>();

    useEffect(() => {
        const options = {
            width: 500,
            height: 500,
            backgroundColor: "whitesmoke",
            cursor: "default",
        };
        const canvas = new fabric.Canvas(canvasEl.current, options);

        const onMouseDown = (event: fabric.IEvent<MouseEvent>) => {
            const pointer = canvas.getPointer(event.e);
            // TODO: оставить для проверки loading компоненты
            //console.log("RenderComponent => onMouseDown");

            const newPoint = {
                left: pointer.x,
                top: pointer.y,
                originX: "center",
                originY: "center",
                radius: 3,
                fill: "green",
                cursor: "default",
            };

            setNewPoint(newPoint);

            canvas.renderAll();
        };

        setFabricCanvas(canvas);

        if (context === "admin") {
            canvas.on("mouse:down", (e) => onMouseDown(e));

            return () => {
                setNewPoint({} as Point);
                canvas.off("mouse:down", onMouseDown as (e: fabric.IEvent<Event>) => void);
            };
        }
    }, [context, setNewPoint]);

    return (
        <div className={s.frame_info}>
            <div className={s.current_frame}>
                <canvas ref={canvasEl} />
                {fabricCanvas && (
                    <CanvasInstance
                        newPoint={newPoint}
                        fabricCanvas={fabricCanvas}
                        context={context}
                        externalId={externalId}
                        currentInstancesList={currentInstancesList}
                        seriesNumber={seriesNumber}
                        activeFrameNumber={activeFrameNumber}
                    />
                )}
            </div>
        </div>
    );
};
