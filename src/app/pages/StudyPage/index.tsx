import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getStudyId } from "../../../requests/StudyRequests";
import { instanceSelector, setAnatomicalStructures, setCurrentInstanceNumber, setCurrentSereies, setStudy } from "../../../store/instance";
import { getAnatomicalStructureList } from "../../../requests/anatomicalStructureRequests";
import { getInstanceDataList } from "../../../requests/instanceDataRequests";
import s from "./styles.module.scss";
import { RenderComponent } from "../../../components/RenderComponent";
import FrameSelectorComponent from "../../../components/FrameSelectorComponent";
import { SeriesControlComponent } from "../../../components/SeriesControlComponent";

const StudyPage = () => {
    const { id } = useParams<string>();
    const dispatch = useDispatch();

    const { study } = useSelector(instanceSelector);

    useEffect(() => {
        if (id && id !== study.id) {
            const fetchStudyData = async (studyId: string) => {
                try {
                    const targetStudy = await getStudyId(studyId);
                    const instanceDataList = await getInstanceDataList({});

                    dispatch(
                        setStudy({
                            ...targetStudy,
                            // TODO: из бека фильтровать по ID
                            instanceData: instanceDataList.filter((item) => item.study === targetStudy.name),
                            //instanceData: instanceDataList.filter((item) => item.studyId === targetStudy.id),
                        }),
                    );
                    dispatch(setCurrentSereies(1));
                    dispatch(setCurrentInstanceNumber(0));

                    const tempStudiesList = await getAnatomicalStructureList({});
                    dispatch(setAnatomicalStructures(tempStudiesList));
                } catch (error) {
                    console.error("Error fetching StudyPage:", error);
                }
            };

            fetchStudyData(id);
        }
    }, [id, study.id, dispatch]);

    return (
        <div className={s.page}>
            <div className="container">{study.name ? <h1>Исследование: {`"${study.name}"`}</h1> : <h2>Loading...</h2>}</div>
            {Object.keys(study).length ? (
                <div style={{ marginTop: "30px" }}>
                    <FrameSelectorComponent />
                    <RenderComponent />
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
