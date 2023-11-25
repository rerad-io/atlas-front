import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { instanceSelector } from "../../store/instance";
import { InstanceData } from "../../_types";
import { backendUrl_2 } from "../../requests/backendUrl";

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
    context,
    externalId,
    currentInstancesList,
    activeFrameNumber,
    seriesNumber,
}: {
    fabricCanvas: fabric.Canvas;
    context: string;
    externalId: string;
    currentInstancesList: InstanceData[];
    activeFrameNumber: number;
    seriesNumber: number;
}) => {
    const { study, currentInstanceData, currentInstanceNumber, currentSeriesNumber } = useSelector(instanceSelector);

    const fabricObjects = useRef<fabric.Circle[]>([]);
    const pointsLayer = useRef<fabric.Group>(new fabric.Group([], {}));
    const textLayer = useRef<fabric.Group>(new fabric.Group([], {}));

    const [currentFrame, setCurrentFrame] = useState<string>("");
    const [currentData, setCurrentData] = useState<InstanceData[]>([]);

    useEffect(() => {
        setCurrentData(currentInstancesList);
    }, [currentInstancesList]);

    useEffect(() => {
        if (context === "app") {
            if (currentInstanceData.length) {
                const fetchInstanceData = () => {
                    try {
                        setCurrentData(currentInstanceData?.filter((item) => item.instanceNumber === currentInstanceNumber || 1));
                        setCurrentFrame(
                            `${backendUrl_2}api/file/content/atlas/${study?.externalId}/dicom/1/${currentSeriesNumber}/${
                                currentInstanceNumber || 1
                            }.jpg`,
                        );
                    } catch (error) {
                        console.error("CanvasInstance - ", error);
                    }
                };
                fetchInstanceData();
            }
        }
    }, [context, currentInstanceData, currentInstanceNumber, study.externalId, currentSeriesNumber]);

    useEffect(() => {
        if (context === "admin") {
            if (currentInstancesList?.length) {
                setCurrentFrame(
                    `${backendUrl_2}api/file/content/atlas/${externalId}/dicom/1/${currentInstancesList[0]?.seriesNumber}/${
                        currentInstancesList[0]?.instanceNumber || activeFrameNumber
                    }.jpg`,
                );
            } else {
                if (externalId) {
                    setCurrentFrame(`${backendUrl_2}api/file/content/atlas/${externalId}/dicom/1/${seriesNumber}/${activeFrameNumber}.jpg`);
                }
            }
        }
    }, [context, currentInstancesList, externalId, activeFrameNumber, seriesNumber]);

    useEffect(() => {
        console.log("reload useEffect in CanvasInstance");

        fabricObjects.current.forEach((fabricItem) => {
            pointsLayer.current.removeWithUpdate(fabricItem);
            textLayer.current.removeWithUpdate(fabricItem);
        });

        currentData?.forEach((item) => {
            const point = new fabric.Circle({
                top: item?.y,
                left: item?.x,
                radius: 3,
                fill: "red",
            });

            point.on("mouseover", function () {
                console.log("selected a circle");
            });

            const text = new fabric.Text(item.structureName, {
                fill: "white",
            });

            point.set("selectable", false);
            //text.set("selectable", false);
            pointsLayer.current.set("selectable", false);
            fabricObjects.current.push(point);
            pointsLayer.current.addWithUpdate(point);
            textLayer.current.addWithUpdate(text);
            //  1-слой для картинок, 1000- слой для точек
            //fabricCanvas.moveTo(point, 1000);
        });
    }, [currentData]);

    useEffect(() => {
        const layer1Bg = new fabric.Group([], {});
        const layer2Frame = new fabric.Group([], {});

        // TODO: попытка зафиксировать слои
        fabricCanvas.moveTo(layer1Bg, 0);
        fabricCanvas.moveTo(layer2Frame, 1);
        fabricCanvas.moveTo(pointsLayer.current, 1000);
        layer1Bg.set("selectable", false);
        layer2Frame.set("selectable", false);

        createImage(currentFrame, 500, 500, 0, 0).then((img) => {
            layer2Frame.addWithUpdate(img);
            //  1-слой для картинок, 1000- слой для точек
            //fabricCanvas.moveTo(img, 1);
            fabricCanvas.renderAll();
        });

        fabricCanvas.add(layer1Bg);
        fabricCanvas.add(layer2Frame);
        fabricCanvas.add(pointsLayer.current);
        fabricCanvas.renderAll();
    }, [fabricCanvas, currentFrame]);

    return <></>;
};
