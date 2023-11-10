import { fabric } from "fabric";
import { useEffect, useState } from "react";

const createImage = (url: string, width: number, height: number, x: number, y: number) =>
    new Promise<fabric.Image>((resolve) => {
        fabric.Image.fromURL(url, (item) => {
            item.scaleToHeight(width);
            item.scaleToWidth(height);
            item.set({
                left: x,
                top: y,
            });
            resolve(item);
        });
    });

export const CanvasInstance = ({ fabricCanvas, frame }: { fabricCanvas: fabric.Canvas }) => {
    const [framePosition, setFramePosition] = useState();

    useEffect(() => {
        setFramePosition(frame);
    }, [frame]);

    useEffect(() => {
        const point1 = new fabric.Circle({
            top: framePosition?.y,
            left: framePosition?.x,
            radius: 3,
            fill: "red",
        });
        const layer1Bg = new fabric.Group([]);

        const layer2Frame = new fabric.Group([]);

        const layer3Point = new fabric.Group([]);

        layer3Point.addWithUpdate(point1);

        fabricCanvas.add(layer1Bg);
        fabricCanvas.add(layer2Frame);
        fabricCanvas.add(layer3Point);
        fabricCanvas.renderAll();

        createImage(framePosition?.path, 500, 500, 0, 0).then((img) => {
            layer2Frame.addWithUpdate(img);
            fabricCanvas.renderAll();
        });
    }, [fabricCanvas, framePosition]);

    return <></>;
};
