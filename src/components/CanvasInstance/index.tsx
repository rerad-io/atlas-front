import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { instanceSelector } from "../../store/instance";
import { InstanceData, Point } from "../../_types";
import { backendUrl_2 } from "../../requests/backendUrl";

const CANVASOBJECT_WIDTH = 150;

const createImage = (url: string, width: number, height: number, x: number, y: number) =>
    new Promise<fabric.Image>((resolve) => {
        fabric.Image.fromURL(url, (item) => {
            item.scaleToHeight(width);
            item.scaleToWidth(height);
            item.set({
                originX: "center",
                originY: "center",
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
    currentInstancesList?: InstanceData[];
    activeFrameNumber?: number;
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
            setCurrentData(currentInstancesList!);
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

        if (!fabricCanvas || currentData.length < 0) return;

        pointsLayer.current.getObjects().forEach((fabricItem) => {
            pointsLayer.current.remove(fabricItem);
        });

        const leftDots: InstanceData[] = currentData.reduce((acum: InstanceData[], item: InstanceData) => {
            if ((fabricCanvas.width! * item?.x) / 100 <= fabricCanvas.width! * 0.5) {
                acum = [...acum, item];
            }
            acum.sort((a, b) => a.y - b.y);
            return acum;
        }, []);

        const rightDots: InstanceData[] = currentData.reduce((acum: InstanceData[], item: InstanceData) => {
            if ((fabricCanvas.width! * item?.x) / 100 > fabricCanvas.width! * 0.5) {
                acum = [...acum, item];
            }
            acum.sort((a, b) => a.y - b.y);
            return acum;
        }, []);

        const getVericalLine = (oneSideDataLength: number, oneSideDataItem: number) => {
            const targetY = (fabricCanvas.height! / oneSideDataLength) * oneSideDataItem;
            return targetY + 50;
        };

        const drawData = (oneSideData: InstanceData[]) => {
            oneSideData.forEach((item, index) => {
                const itemX = (fabricCanvas.width! * item?.x) / 100;
                const itemY = (fabricCanvas.height! * item?.y) / 100;

                const point = new fabric.Circle({
                    left: itemX,
                    top: itemY,
                    originX: "center",
                    originY: "center",
                    radius: 2,
                    fill: item.subjectColor ? `#${item.subjectColor}` : "red",
                });

                const imgLeft = (fabricCanvas.width! - fabricCanvas.width! * 0.626) / 2;
                const imgRight = (fabricCanvas.width! - fabricCanvas.width! * 0.626) / 2 + fabricCanvas.width! * 0.626;

                const targetX = itemX <= fabricCanvas.width! * 0.5 ? imgLeft + 50 : imgRight - 50;
                const targetY = getVericalLine(oneSideData.length, index);
                const finishX = itemX <= fabricCanvas.width! * 0.5 ? targetX - CANVASOBJECT_WIDTH : targetX + CANVASOBJECT_WIDTH;

                const line_1 = new fabric.Line([itemX, itemY, targetX, targetY], {
                    originX: "center",
                    originY: "center",
                    width: CANVASOBJECT_WIDTH,
                    stroke: item.subjectColor ? `#${item.subjectColor}` : "white",
                });

                const line_2 = new fabric.Line([targetX, targetY, finishX, targetY], {
                    originX: "center",
                    originY: "center",
                    stroke: item.subjectColor ? `#${item.subjectColor}` : "white",
                });
                const lineGroup = new fabric.Group([line_1, line_2], {});

                const text = new fabric.Textbox(item.structureName, {
                    originX: itemX <= fabricCanvas.width! * 0.5 ? "right" : "left",
                    originY: "bottom",
                    left: itemX <= fabricCanvas.width! * 0.5 ? targetX - 5 : targetX + 5,
                    top: targetY,
                    lineHeight: 0.8,
                    hoverCursor: "pointer",
                    fontSize: 18,
                    selectable: true,
                    width: CANVASOBJECT_WIDTH,
                    textAlign: itemX <= fabricCanvas.width! * 0.5 ? "right" : "left",
                    fill: item.subjectColor ? `#${item.subjectColor}` : "white",
                });

                const instanceGroup = new fabric.Group([point, text, lineGroup], {});

                pointsLayer.current.set("selectable", false);
                pointsLayer.current.addWithUpdate(instanceGroup);
            });
        };

        drawData(leftDots);
        drawData(rightDots);

        fabricCanvas.renderAll();
    }, [currentData, fabricCanvas]);

    useEffect(() => {
        pointsLayer.current.getObjects().forEach((fabricItem) => {
            if (fabricItem.name === "newPoint") pointsLayer.current.remove(fabricItem);
        });

        const targetPoint = new fabric.Circle(newPoint);
        pointsLayer.current.addWithUpdate(targetPoint);

        fabricCanvas.renderAll();
    }, [newPoint, fabricCanvas]);

    useEffect(() => {
        const layer2Frame = new fabric.Group([], {});

        layer2Frame.set("selectable", false);

        if (fabricCanvas) {
            const imgWidth = fabricCanvas.width! * 0.626;
            const imgHeight = fabricCanvas.height! * 0.626;
            const imgX = fabricCanvas.width! * 0.5;
            const imgY = fabricCanvas.width! * 0.5;

            createImage(currentFrame, imgWidth, imgHeight, imgX, imgY)
                .then((img) => {
                    layer2Frame.addWithUpdate(img);
                    fabricCanvas.renderAll();
                })
                .catch((error) => {
                    console.error("Ошибка загрузки изображения:", error);
                });

            fabricCanvas.add(layer2Frame);
            fabricCanvas.add(pointsLayer.current);
            fabricCanvas.renderAll();
        }
    }, [fabricCanvas, currentFrame]);

    return <></>;
};
