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
    const parentCanvas = useRef<HTMLDivElement>(null);
    const canvasEl = useRef<HTMLCanvasElement>(null);

    const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas>();
    const [frameSize, setFameSize] = useState<{ width: number; height: number }>({
        width: window.innerWidth <= 992 ? window.innerWidth : window.innerWidth * 0.4,
        height: window.innerWidth <= 992 ? window.innerWidth : window.innerWidth * 0.4,
    });

    useEffect(() => {
        const handleResize = () => {
            setFameSize({
                width: window.innerWidth <= 992 ? window.innerWidth : window.innerWidth * 0.4,
                height: window.innerWidth <= 992 ? window.innerWidth : window.innerWidth * 0.4,
            });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const options = {
            //width: frameSize.width,
            //height: frameSize.heght,
            //originX: "center",
            //originY: "center",
            //backgroundColor: "whitesmoke",
            backgroundColor: "black",
            cursor: "default",
        };
        const canvas = new fabric.Canvas(canvasEl.current, options);

        canvas.setWidth(parentCanvas?.current?.clientWidth);
        canvas.setHeight(parentCanvas?.current?.clientHeight);

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
                hoverCursor: "default",
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
    }, [context, frameSize, setNewPoint]);

    return (
        <div ref={parentCanvas} style={{ width: frameSize?.width, height: frameSize?.height }} className={s.canvas_wrapper}>
            <canvas ref={canvasEl} />
            {fabricCanvas && (
                <CanvasInstance
                    frameSize={frameSize}
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
    );
};
