import { useEffect, useState, useRef } from "react";
import { fabric } from "fabric";
import { CanvasInstance } from "../CanvasInstance";
import s from "./styles.module.scss";

export const WhiteBoardCanvas = () => {
    const canvasEl = useRef<HTMLCanvasElement>(null);

    const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas>();

    useEffect(() => {
        const options = {
            width: 500,
            height: 500,
            backgroundColor: "whitesmoke",
            fireMiddleClick: true,
        };

        setFabricCanvas(new fabric.Canvas(canvasEl.current, options));

        // TODO: try to use for add instance
        //	if(fabricCanvas){
        //	fabricCanvas.on("mouse:down", (event) => {
        //		const pointer = fabricCanvas.getPointer(event.e);
        //		//console.log("🚀 ~ file: index.tsx:24 ~ canvas.on ~ canvas:", canvas)
        //		const x = pointer.x; // Координата x клика
        //		const y = pointer.y; // Координата y клика
        //		console.log(`Mouse click at (${x}, ${y})`);
        //	});
        //}

        return () => {
            if (fabricCanvas) {
                fabricCanvas.dispose();
                setFabricCanvas(null);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
<section className={s.frame_info}>
<div className="container">
		<div className={s.current_frame}>
		<canvas ref={canvasEl} />
            {fabricCanvas && <CanvasInstance fabricCanvas={fabricCanvas} />}
		</div>
</div>
</section>
    );
};
