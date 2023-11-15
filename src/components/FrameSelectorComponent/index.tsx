import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { instanceSelector } from "../../store/instance";
import { backendUrl_2 } from "../../requests/backendUrl";
import { SeriesListModel } from "../../_types";
import { getStudyId } from "../../requests/StudyRequests";
import s from "./styles.module.scss";

const slideWidth: number = 80;

type Props = {
    studySerie: SeriesListModel;
    activeFrameNumber: number;
    handleCurrentFrame: (index: number) => void;
};

const FrameSelectorComponent = ({ studySerie, handleCurrentFrame, activeFrameNumber }: Props) => {
    const { study, series, currentSeriesNumber, currentInstanceNumber } = useSelector(instanceSelector);
    const [instancesFrame, setInstancesFrame] = useState<string[]>([]);
    const [activeFrame, setActiveFrame] = useState<number>(1);
    const [currentSerie, setCurrentSerie] = useState<SeriesListModel>({} as SeriesListModel);
    const [currentExternalId, setCurrentExternalId] = useState<string>("");

    useEffect(() => {
        if (!studySerie?.id) {
            const serieOject: SeriesListModel | undefined = Object.values(series)?.find((serie) => serie.number === currentSeriesNumber);
            if (serieOject) setCurrentSerie(serieOject);
            if (study) setCurrentExternalId(study.externalId);
            setActiveFrame(currentInstanceNumber);
        } else {
            const fetchStudyById = async () => {
                try {
                    const targetStudy = await getStudyId(studySerie?.studyId);
                    setCurrentExternalId(targetStudy.externalId);
                } catch (error) {
                    console.error("StudySeriesEditPage - ", error);
                }
            };
            fetchStudyById();
            setCurrentSerie(studySerie);
            setActiveFrame(activeFrameNumber);
        }
    }, [study, series, studySerie, currentSeriesNumber, currentInstanceNumber, activeFrameNumber]);

    useEffect(() => {
        const framesList: string[] = [];
        for (let i = 1; i <= currentSerie?.instanceCount; i++) {
            // TODO: при исправлении инстанса раскоментировать/и удалить то что используется
            //framesList.push(`${backendUrl_2}api/file/content/atlas/${currentExternalId}/dicom/1/${currentSerie.number}/${i}.jpg`);
            framesList.push(`${backendUrl_2}api/file/content/atlas/${currentExternalId}/dicom/1/${1}/${i}.jpg`);
        }
        setInstancesFrame(framesList);

        return () => {
            setInstancesFrame([]);
            setActiveFrame(1);
        };
    }, [currentSerie, currentExternalId]);

    return (
        <section>
            <div className="container">
                <div
                    className={s.slider}
                    style={{
                        maxWidth: `calc(${currentSerie.instanceCount}*${slideWidth}px)`,
                        minWidth: "500px",
                    }}
                >
                    <ul
                        className={s.slider_wrapper}
                        style={{
                            height: `${slideWidth}px`,
                        }}
                    >
                        {instancesFrame?.map((slide, index) => (
                            <li
                                key={index}
                                className={`${s.slide} ${s[activeFrame === index + 1 ? "active" : ""] || ""}`}
                                style={{
                                    width: `${slideWidth}px`,
                                    height: `${slideWidth}px`,
                                    color: "white",
                                    backgroundColor: "black",
                                }}
                                onClick={() => handleCurrentFrame(index + 1)}
                            >
                                {<img src={slide} alt="#foto" className={s.slide_img} />}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default FrameSelectorComponent;
