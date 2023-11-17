import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getStudyId } from "../../../requests/StudyRequests";
import { instanceSelector, setAnatomicalStructures, setCurrentInstanceNumber, setCurrentSereies, setStudy } from "../../../store/instance";
import { getAnatomicalStructureList } from "../../../requests/anatomicalStructureRequests";
import { RenderComponent } from "../../../components/RenderComponent";
import FrameSelectorComponent from "../../../components/FrameSelectorComponent";
import { SeriesControlComponent } from "../../components/SeriesControlComponent";
import s from "./styles.module.scss";

const StudyPage = () => {
    const { id } = useParams<string>();
    const dispatch = useDispatch();

    const { study } = useSelector(instanceSelector);

    useEffect(() => {
        if (id && id !== study.id) {
            const fetchStudyData = async (studyId: string) => {
                try {
                    const targetStudy = await getStudyId(studyId);
                    dispatch(
                        setStudy({
                            ...targetStudy,
                            instanceData: targetStudy.instanceDataList,
                        }),
                    );
                    dispatch(setCurrentSereies(targetStudy.seriesList[0]?.number));
                    dispatch(setCurrentInstanceNumber(targetStudy.instanceDataList[0]?.instanceNumber));

                    const anatomicalStructuresList = await getAnatomicalStructureList({});
                    dispatch(setAnatomicalStructures(anatomicalStructuresList));
                } catch (error) {
                    console.error("Error fetching StudyPage:", error);
                }
            };

            fetchStudyData(id);
        }
    }, [id, study.id, dispatch]);

    const handleCurrentFrame = (index: number) => {
        dispatch(setCurrentInstanceNumber(index));
    };

    return (
        <div className={s.page}>
            <div className="container">{study.name ? <h1> {`${study.name}`}</h1> : <h2>Loading...</h2>}</div>
            {Object.keys(study).length ? (
                <div style={{ marginTop: "30px" }}>
                    <FrameSelectorComponent handleCurrentFrame={handleCurrentFrame} context="app" />
                    <RenderComponent context="app" />
                    <SeriesControlComponent />
                </div>
            ) : (
                <div className="container">
                    <h2 style={{ marginTop: "30px" }}>Нет схраненных серий исследования...</h2>
                </div>
            )}
        </div>
    );
};

export default StudyPage;
