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

export const CanvasInstance = ({ fabricCanvas }: { fabricCanvas: fabric.Canvas }) => {
	// TODO: получить данные инстанса можно взять из серии вытащив данные по ID
		const { id } = useParams<{ id: string }>();
    const { currentInstanceData, currentInstanceNumber } = useSelector(instanceSelector);
  
    const fabricObjects = useRef<fabric.Circle[]>([]);
    const [pointsLayer] = useState<fabric.Group>(new fabric.Group([]));
    const [currentFrame, setCurrentFrame] = useState<InstanceData[]>([]);
    console.log("🚀 ~ file: index.tsx:28 ~ CanvasInstance ~ currentFrame:", currentFrame)

    useEffect(() => {
        const fetchInstanceData = async () => {
            try {
                if (currentInstanceData.length) {
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
    }, [currentInstanceData, currentInstanceNumber]);

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
    }, [currentFrame]);

    useEffect(() => {
        const layer1Bg = new fabric.Group([]);

        const layer2Frame = new fabric.Group([]);

        fabricCanvas.add(layer1Bg);
        fabricCanvas.add(layer2Frame);
        fabricCanvas.add(pointsLayer);
        fabricCanvas.renderAll();
				
        createImage(currentFrame[0]?.path, 500, 500, 0, 0).then((img) => {
            layer2Frame.addWithUpdate(img);
            fabricCanvas.renderAll();
        });
    }, [fabricCanvas, currentInstanceNumber, currentFrame]);
  
    return <></>;
};
