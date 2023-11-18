import { useEffect, useState, useRef } from "react";
import { fabric } from "fabric";
import { CanvasInstance } from "../CanvasInstance";
import { InstanceData } from "../../_types";
import s from "./styles.module.scss";

export type Point = {
    x: number;
    y: number;
};

type RenderComponentProps = {
    context: string;
    externalId: string;
    instances: InstanceData[];
    activeFrameNumber: number;
    onClick?: (point: Point, sender: fabric.Canvas) => void;
};

export const RenderComponent = ({ context, instances, externalId, activeFrameNumber, onClick }: RenderComponentProps) => {
    const canvasEl = useRef<HTMLCanvasElement>(null);

    const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas>();

    useEffect(() => {
        const options = {
            width: 500,
            height: 500,
            backgroundColor: "whitesmoke",
            //fireMiddleClick: true,
        };

        const canvas = new fabric.Canvas(canvasEl.current, options);
        setFabricCanvas(canvas);

        const onMouseDown = (event: fabric.IEvent<MouseEvent>) => {
            if (onClick) {
                const pointer = canvas.getPointer(event.e);
                onClick(pointer, canvas);
            }
        };

        canvas.on("mouse:down", (e) => onMouseDown(e));

        return () => {
            canvas.off("mouse:down", onMouseDown as (e: fabric.IEvent<Event>) => void);
        };
    }, [onClick]);

    return (
        <section className={s.frame_info}>
            <div className="container">
                <div className={s.current_frame}>
                    <canvas ref={canvasEl} />
                    {fabricCanvas &&
                        (context !== "app" ? (
                            <CanvasInstance
                                fabricCanvas={fabricCanvas}
                                //newPoint={newPoint}
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
        </section>
    );
};
