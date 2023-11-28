import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { instanceSelector } from "../../store/instance";
import { InstanceData, Point } from "../../_types";
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
    newPoint,
}: {
    fabricCanvas: fabric.Canvas;
    context: string;
    externalId?: string;
    newPoint?: Point;
    currentInstancesList: InstanceData[];
    activeFrameNumber: number;
    seriesNumber?: number;
}) => {
    const { study, currentInstanceData, currentInstanceNumber, currentSeriesNumber } = useSelector(instanceSelector);

    const pointsLayer = useRef<fabric.Group>(new fabric.Group([], {}));
    const [currentFrame, setCurrentFrame] = useState<string>("");
    const [currentData, setCurrentData] = useState<InstanceData[]>([]);

    useEffect(() => {
        if (context === "app") {
            const fetchInstanceData = () => {
                try {
                    setCurrentData(currentInstanceData?.filter((item) => item.instanceNumber === currentInstanceNumber || 1));
                    if (study?.externalId) {
                        setCurrentFrame(
                            `${backendUrl_2}api/file/content/atlas/${study?.externalId}/dicom/1/${currentSeriesNumber}/${
                                currentInstanceNumber || 1
                            }.jpg`,
                        );
                    }
                } catch (error) {
                    console.error("CanvasInstance - ", error);
                }
            };
            fetchInstanceData();
        }
    }, [context, currentInstanceData, currentInstanceNumber, study.externalId, currentSeriesNumber]);

    useEffect(() => {
        if (context === "admin") {
            setCurrentData(currentInstancesList);
        }
    }, [context, currentInstancesList]);

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
        // TODO: оставить для проверки loading компоненты
        //console.log("reload useEffect in CanvasInstance");

        pointsLayer.current.getObjects().forEach((fabricItem) => {
            pointsLayer.current.remove(fabricItem);
        });

        if (currentData.length) {
            currentData.forEach((item) => {
                const point = new fabric.Circle({
                    left: item?.x,
                    top: item?.y,
                    originX: "center",
                    originY: "center",
                    radius: 3,
                    fill: item.subjectColor ? `#${item.subjectColor}` : "red",
                });

                // TODO: почему не работает ?
                //point.on("mouse:over", function () {
                //    console.log("selected a circle");
                //});

                const startX = item?.x <= 250 ? item?.x - 5 : item?.x + 5;
                const finishX = item?.x <= 250 ? item?.x - 50 : item?.x + 50;

                const line = new fabric.Line([startX, item?.y, finishX, item?.y], {
                    originX: "center",
                    originY: "center",
                    stroke: item.subjectColor ? `#${item.subjectColor}` : "white",
                });

                const text = new fabric.Text(item.structureName, {
                    originX: "center",
                    originY: "center",
                    left: item?.x <= 250 ? startX - 130 : startX + 130,
                    top: item?.y,
                    fill: item.subjectColor ? `#${item.subjectColor}` : "white",
                    fontSize: 18,
                    hoverCursor: "hover",
                });
                const instanceGroup = new fabric.Group([point, line, text], {});

                pointsLayer.current.set("selectable", false);
                pointsLayer.current.addWithUpdate(instanceGroup);
            });
        }

        const targetPoint = new fabric.Circle(newPoint);
        pointsLayer.current.addWithUpdate(targetPoint);

        fabricCanvas.renderAll();
    }, [currentData, fabricCanvas, newPoint]);

    useEffect(() => {
        const layer1Bg = new fabric.Group([], {});
        const layer2Frame = new fabric.Group([], {});

        // TODO: попытка зафиксировать слои
        //fabricCanvas.moveTo(layer1Bg, 0);
        //fabricCanvas.moveTo(layer2Frame, 1);
        //fabricCanvas.moveTo(pointsLayer.current, 1000);

        // TODO: фиксация background и img
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
