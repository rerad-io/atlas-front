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
    //newPoint,
    context,
    instances,
    externalId,
    activeFrameNumber,
}: {
    fabricCanvas: fabric.Canvas;
    //newPoint?: fabric.Circle;
    context: string;
    externalId: string;
    activeFrameNumber: number;
    instances: InstanceData[];
}) => {
    const { study, series, currentInstanceData, currentInstanceNumber, currentSeriesNumber } = useSelector(instanceSelector);

    const fabricObjects = useRef<fabric.Circle[]>([]);
    const pointsLayer = useRef<fabric.Group>(
        new fabric.Group([], {
            hasControls: false,
            hasBorders: false,
            lockRotation: true,
            lockScalingX: true,
            lockScalingY: true,
            lockMovementX: true,
            lockMovementY: true,
        }),
    );
    const [newPoint, setNewPoint] = useState<fabric.Circle>();
    // https://stackoverflow.com/questions/57847594/react-hooks-accessing-up-to-date-state-from-within-a-callback
    const newPointRef = useRef(newPoint);
    newPointRef.current = newPoint;
    const [currentFrame, setCurrentFrame] = useState<string>("");
    const [currentData, setCurrentInstanseData] = useState<InstanceData[]>([]);

    useEffect(() => {
        const fetchInstanceData = async () => {
            try {
                if (context === "app") {
                    if (currentInstanceData.length) {
                        setCurrentInstanseData(currentInstanceData?.filter((item) => item.instanceNumber === currentInstanceNumber || 1));
                        setCurrentFrame(
                            `${backendUrl_2}api/file/content/atlas/${study.externalId}/dicom/1/${currentSeriesNumber}/${
                                currentInstanceNumber || 1
                            }.jpg`,
                        );
                    } else {
                        setCurrentFrame("https://sofia.medicalistes.fr/spip/IMG/jpg/xray-skulls-cross-bones.jpg");
                        setCurrentInstanseData([]);
                    }
                } else {
                    const targetIstanceData = instances?.filter((item) => item.instanceNumber === activeFrameNumber);

                    setCurrentInstanseData(targetIstanceData);
                    if (targetIstanceData?.length) {
                        setCurrentFrame(
                            `${backendUrl_2}api/file/content/atlas/${externalId}/dicom/1/${targetIstanceData[0].seriesNumber}/${activeFrameNumber}.jpg`,
                        );
                    } else {
                        setCurrentFrame(`${backendUrl_2}api/file/content/atlas/${externalId}/dicom/1/${1}/${activeFrameNumber}.jpg`);
                    }
                }
            } catch (error) {
                console.error("CanvasInstance - ", error);
            }
        };
        fetchInstanceData();
    }, [
        instances,
        currentSeriesNumber,
        activeFrameNumber,
        context,
        currentInstanceData,
        currentInstanceNumber,
        series,
        externalId,
        study.externalId,
    ]);

    useEffect(() => {
        console.log("Point create", fabricCanvas);
        // TODO: задача RenderComponent заключается в рендеринге канвас и предоставить API() к нему
        // TODO:  зона ответсвенности  CanvasInstance - принятие решения по событию клика:
        // добавить новую точку или переместить ее.
        const onMouseDown = (event: fabric.IEvent<MouseEvent>) => {
            console.log("🚀 ~ file: index.tsx:107 ~ fabricCanvas?.on ~ event:", event);

            const pointer = fabricCanvas.getPointer(event.e);
            console.log(`Mouse click at (${pointer.x}, ${pointer.y})`);
            if (newPointRef.current) {
                // TODO: перенести точку
                newPointRef.current.left = pointer.x;
                newPointRef.current.top = pointer.y;
            } else {
                const point = new fabric.Circle({
                    left: pointer.x,
                    top: pointer.y,
                    originX: "center",
                    originY: "center",
                    radius: 3,
                    fill: "green",
                });

                //setPointCoordinates({
                //    x: point.left,
                //    y: point.top,
                //});
                fabricObjects.current.push(point);
                pointsLayer.current.addWithUpdate(point);
                setNewPoint(point);
            }

            fabricCanvas.renderAll();
        };

        try {
					fabricCanvas?.on("mouse:down", onMouseDown);

				} catch (error) {
					console.log("Ошибка мыши", error)
				}
				console.log("Проверка мыши прошла ")

        return () => {
            fabricCanvas?.off("mouse:down", onMouseDown as (e: fabric.IEvent<Event>) => void);
        };
    }, [fabricCanvas]);

    useEffect(() => {
        console.log("reload useEffect in CanvasInstance");

        fabricObjects.current.forEach((fabricItem) => {
            pointsLayer.current.removeWithUpdate(fabricItem);
        });

        currentData?.forEach((item) => {
            const point = new fabric.Circle({
                top: item?.y,
                left: item?.x,
                radius: 3,
                fill: "red",
                hasControls: false,
                hasBorders: false,
                lockRotation: true,
                lockScalingX: true,
                lockScalingY: true,
                lockMovementX: true,
                lockMovementY: true,
            });

            fabricObjects.current.push(point);
            pointsLayer.current.addWithUpdate(point);
            //  1-слой для картинок, 1000- слой для точек
            fabricCanvas.moveTo(point, 1000);
        });
    }, [currentData, fabricCanvas]);

    //useEffect(() => {
    //    if (newPoint) {
    //        //fabricObjects.current.pop();
    //        fabricObjects.current.push(newPoint);
    //        pointsLayer.addWithUpdate(newPoint);
    //        fabricCanvas.renderAll();
    //    }
    //}, [pointsLayer, newPoint, fabricCanvas]);

    useEffect(() => {
        const layer1Bg = new fabric.Group([], {});

        const layer2Frame = new fabric.Group([], {
            hasControls: false,
            hasBorders: false,
            lockRotation: true,
            lockScalingX: true,
            lockScalingY: true,
            lockMovementX: true,
            lockMovementY: true,
            lockScalingFlip: true,
        });

        fabricCanvas.add(layer1Bg);
        fabricCanvas.add(layer2Frame);
        fabricCanvas.add(pointsLayer.current);
        fabricCanvas.renderAll();

        createImage(currentFrame, 500, 500, 0, 0).then((img) => {
            layer2Frame.addWithUpdate(img);
            //  1-слой для картинок, 1000- слой для точек
            fabricCanvas.moveTo(img, 1);
            fabricCanvas.renderAll();
        });
    }, [fabricCanvas, currentFrame]);

    return <></>;
};
