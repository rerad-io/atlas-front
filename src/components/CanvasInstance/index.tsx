import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { instanceSelector } from "../../store/instance";
import { getInstanceDataList } from "../../requests/instanceDataRequests";
import { InstanceData } from "../../_types";
import { useParams } from "react-router-dom";
import { getStudySeriesId } from "../../requests/StudySeriesRequests";
import { getStudyId } from "../../requests/StudyRequests";

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

export const CanvasInstance = ({
    fabricCanvas,
    newPoint,
    context,
}: {
    fabricCanvas: fabric.Canvas;
    newPoint?: fabric.Circle;
    context: string;
}) => {
    // TODO: получить данные инстанса можно взять из серии вытащив данные по ID
    const { id } = useParams<{ id: string }>();
    const { currentInstanceData, currentInstanceNumber } = useSelector(instanceSelector);
    const fabricObjects = useRef<fabric.Circle[]>([]);
    const [pointsLayer] = useState<fabric.Group>(
        new fabric.Group([], {
            hasControls: false,
            hasBorders: false,
            lockRotation: true,
            lockScalingX: true,
            lockScalingY: true,
        }),
    );
    const [currentFrame, setCurrentFrame] = useState<InstanceData[]>([]);

    useEffect(() => {
        const fetchInstanceData = async () => {
            try {
                if (context === "app") {
                    setCurrentFrame(currentInstanceData.filter((item) => item.instanceNumber === currentInstanceNumber));
                } else {
                    // TODO: получить данные инстанса можно взять из серии вытащив данные по ID
                    const instanceList = await getInstanceDataList({});
                    const tempSerie = await getStudySeriesId(id);
                    const tempStudy = await getStudyId(tempSerie?.studyId);
                    const targetFrame = instanceList.filter((item) => item.series === tempSerie.name && item.study === tempStudy.name);
                    if (targetFrame) {
                        setCurrentFrame(targetFrame);
                    }
                }
            } catch (error) {
                console.error("CanvasInstance - ", error);
            }
        };
        fetchInstanceData();
    }, [id, currentInstanceData, currentInstanceNumber, context]);

    useEffect(() => {
        console.log("reload useEffect in CanvasInstance");

        fabricObjects.current.forEach((fabricItem) => {
            pointsLayer.removeWithUpdate(fabricItem);
        });

        currentFrame.forEach((item) => {
            const point = new fabric.Circle({
                top: item?.y,
                left: item?.x,
                radius: 3,
                fill: "red",
            });
            fabricObjects.current.push(point);
            pointsLayer.addWithUpdate(point);
        });

        if (newPoint) {
            fabricObjects.current.push(newPoint);
            pointsLayer.addWithUpdate(newPoint);
            fabricCanvas.renderAll();
        }
    }, [pointsLayer, currentFrame, newPoint, fabricCanvas]);

    useEffect(() => {
        const layer1Bg = new fabric.Group([], {
            hasControls: false,
            hasBorders: false,
            lockRotation: true,
            lockScalingX: true,
            lockScalingY: true,
        });

        const layer2Frame = new fabric.Group([], {
            hasControls: false,
            hasBorders: false,
            lockRotation: true,
            lockScalingX: true,
            lockScalingY: true,
        });

        fabricCanvas.add(layer1Bg);
        fabricCanvas.add(layer2Frame);
        fabricCanvas.add(pointsLayer);
        fabricCanvas.renderAll();

        createImage(currentFrame[0]?.path, 500, 500, 0, 0).then((img) => {
            layer2Frame.addWithUpdate(img);
            fabricCanvas.renderAll();
        });
    }, [pointsLayer, fabricCanvas, currentInstanceNumber, currentFrame]);

    return <></>;
};
