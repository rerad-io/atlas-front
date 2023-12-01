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
        if (frameSize) {
            const options = {
                width: frameSize?.width,
                height: frameSize?.width,

                originX: "center",
                originY: "center",
                backgroundColor: "#303030",
                cursor: "default",
            };

            if (fabricCanvas) {
                // TODO: Удаляем предыдущий канвас перед созданием нового?
                fabricCanvas.dispose();
            }

            const canvas = new fabric.Canvas(canvasEl.current, options);

            const onMouseDown = (event: fabric.IEvent<MouseEvent>) => {
                const pointer = canvas.getPointer(event.e);
                const clickX = (pointer.x * 100) / frameSize.width;
                const clickY = (pointer.y * 100) / frameSize.height;

                if (
                    pointer.x > (frameSize?.width - frameSize?.width * 0.626) / 2 &&
                    pointer.x < (frameSize?.width - frameSize?.width * 0.626) / 2 + frameSize?.width * 0.626 &&
                    pointer.y > (frameSize?.width - frameSize?.width * 0.626) / 2 &&
                    pointer.y < (frameSize?.width - frameSize?.width * 0.626) / 2 + frameSize?.width * 0.626
                ) {
                    const newPoint = {
                        x: clickX,
                        y: clickY,
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
                }
            };

            setFabricCanvas(canvas);

            if (context === "admin") {
                canvas.on("mouse:down", (e) => onMouseDown(e));

                return () => {
                    // TODO: обновление canvas остается под вопросом
                    //canvas.dispose();
                    setNewPoint({} as Point);
                    canvas.off("mouse:down", onMouseDown as (e: fabric.IEvent<Event>) => void);
                };
            }
        }
    }, [context, frameSize, setNewPoint]);

    return (
        <div style={{ width: frameSize?.width, height: frameSize?.height }} className={s.canvas_wrapper}>
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
