import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { instanceSelector } from "../../store/instance";
import { backendUrl_2 } from "../../requests/backendUrl";
import { SeriesListModel } from "../../_types";
import { getStudyId } from "../../requests/StudyRequests";
import { Slider } from "../Slider";
import s from "./styles.module.scss";

type Props = {
    studySerie: SeriesListModel;
    activeFrameNumber: number;
    handleCurrentFrame: (index: number) => void;
    context: string;
};

const FrameSelectorComponent = ({ context, studySerie, handleCurrentFrame, activeFrameNumber }: Props) => {
    const { study, series, currentSeriesNumber, currentInstanceNumber, currentInstanceData } = useSelector(instanceSelector);
    const [instancesFrame, setInstancesFrame] = useState<string[]>([]);
    const [activeFrame, setActiveFrame] = useState<number>(1);
    const [currentSerie, setCurrentSerie] = useState<SeriesListModel>({} as SeriesListModel);
    const [currentExternalId, setCurrentExternalId] = useState<string>("");

    useEffect(() => {
        if (context === "app") {
            if (currentInstanceData.length) {
                const serieOject: SeriesListModel | undefined = Object.values(series)?.find(
                    (serie) => serie.number === currentSeriesNumber,
                );
                if (serieOject) setCurrentSerie(serieOject);
                if (study) setCurrentExternalId(study.externalId);
                setActiveFrame(currentInstanceNumber);
            } else {
                setCurrentExternalId("");
            }
        } else {
            const fetchStudyById = async () => {
                try {
                    const targetStudy = await getStudyId(studySerie?.studyId);
                    setCurrentExternalId(targetStudy.externalId);
                } catch (error) {
                    console.error("StudySeriesEditPage: ", error);
                }
            };
            fetchStudyById();
            setCurrentSerie(studySerie);
            setActiveFrame(activeFrameNumber);
        }
    }, [study, series, studySerie, currentSeriesNumber, context, currentInstanceData.length, currentInstanceNumber, activeFrameNumber]);

    useEffect(() => {
        const framesList: string[] = [];
        for (let i = 1; i <= currentSerie?.instanceCount; i++) {
            framesList.push(`${backendUrl_2}api/file/content/atlas/${currentExternalId}/dicom/1/${currentSerie.number}/${i}.jpg`);
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
                <Slider instancesFrame={instancesFrame} activeFrame={activeFrame} handleCurrentFrame={handleCurrentFrame} />
                <div className={s.pagination}>
                    <span>{activeFrame}</span>
                    <span>{` / ${instancesFrame.length}`}</span>
                </div>
            </div>
        </section>
    );
};

export default FrameSelectorComponent;
