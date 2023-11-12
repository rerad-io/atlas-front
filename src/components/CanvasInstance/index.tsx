import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { instanceSelector } from "../../store/instance";

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

export const CanvasInstance = ({ fabricCanvas }: { fabricCanvas: fabric.Canvas }) => {
    const { currentInstanceData, currentInstanceNumber } = useSelector(instanceSelector);

    const fabricObjects = useRef<fabric.Circle[]>([]);
    const [pointsLayer] = useState<fabric.Group>(new fabric.Group([]));

    useEffect(() => {
        console.log("reload useEffect in CanvasInstance");

        fabricObjects.current.forEach((fabricItem) => {
            pointsLayer.removeWithUpdate(fabricItem);
        });

        currentInstanceData.forEach((item) => {
            const point = new fabric.Circle({
                top: item.y,
                left: item.x,
                radius: 3,
                fill: "red",
            });
            fabricObjects.current.push(point);
            pointsLayer.addWithUpdate(point);
        });
    }, [currentInstanceData]);

    useEffect(() => {
        const layer1Bg = new fabric.Group([]);

        const layer2Frame = new fabric.Group([]);

        fabricCanvas.add(layer1Bg);
        fabricCanvas.add(layer2Frame);
        fabricCanvas.add(pointsLayer);
        fabricCanvas.renderAll();

        const currentFrame = currentInstanceData.find((item) => item.instanceNumber === currentInstanceNumber);

        createImage(currentFrame?.path, 500, 500, 0, 0).then((img) => {
            layer2Frame.addWithUpdate(img);
            fabricCanvas.renderAll();
        });
    }, [fabricCanvas, currentInstanceData, currentInstanceNumber]);

    return <></>;
};
