import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getStudyId } from "../../../requests/StudyRequests";
import { setAnatomicalStructures, setSeriesList, setStudy } from "../../../store/instance";
import { Series } from "../../../_types";
import FrameSelector from "../../../components/FrameSelector";
import RenderComponent from "../../../components/RenderComponent";
import { getAnatomicalStructureList } from "../../../requests/anatomicalStructureRequests";
import { getInstanceDataList } from "../../../requests/instanceDataRequests";
import s from "./styles.module.scss";

const StudyPage = () => {
    const { id } = useParams<string>();
    const dispatch = useDispatch();

    const { study, series, instanceData } = useSelector(({ instance }) => instance);
    const [activeSerie, setActiveSerie] = useState<Series>();
    const [activeInstases, setActiveInstances] = useState();
    const [currentFrame, setCurrentFrame] = useState();

    useEffect(() => {
        if (id) {
            const fetchStudyData = async (studyId: string) => {
                try {
                    const tempStudy = await getStudyId(studyId);
                    dispatch(setStudy(tempStudy));

                    const instanceDataList = await getInstanceDataList({});
                    dispatch(setSeriesList({ seriesList: tempStudy.seriesList, instanceDataList }));

                    const tempStudiesList = await getAnatomicalStructureList({});
                    dispatch(setAnatomicalStructures(tempStudiesList));
                } catch (error) {
                    console.error("Error fetching StudyPage:", error);
                }
            };

            fetchStudyData(id);
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (series) {
            if (series) {
                setActiveSerie(Object.values(series)[0]);
            }
        }
    }, [series]);

    useEffect(() => {
        if (activeSerie) {
            const currentInstance = instanceData[activeSerie.number];
            if (currentInstance) {
                setActiveInstances(currentInstance);
                setCurrentFrame(currentInstance[0]);
            }
        }
    }, [activeSerie, instanceData]);

    const handleClick = (number: string) => {
        const targetSerie: Series = series[number];
        setActiveSerie(targetSerie);
    };

    const handleCurrentFrame = (currentId: string) => {
        const currentInstance = instanceData[activeSerie.number];
        setCurrentFrame(currentInstance[currentId]);
    };

    return (
        <div className={s.page}>
            <section>
                <div className="container">{study.name ? <h1>Активная серия {`"${study.name}"`}</h1> : <h2>Loading...</h2>}</div>
                <div style={{ marginTop: "30px" }}>
                    <FrameSelector frameList={activeInstases} handleCurrentFrame={handleCurrentFrame} />
                    <RenderComponent currentFrame={currentFrame} />
                </div>
                <div className="container">
                    <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                            <div>
                                <span style={{ display: "block" }}>Sagital</span>
                                <img
                                    style={{ width: "60px", height: "60px" }}
                                    src={activeSerie?.sagitalFrame}
                                    alt={`Serie ${activeSerie?.name} sagitalFrame`}
                                />
                            </div>
                            <div>
                                <span style={{ display: "block" }}>Coronal</span>
                                <img
                                    style={{ width: "60px", height: "60px" }}
                                    src={activeSerie?.coronalFrame}
                                    alt={`Serie ${activeSerie?.name} coronalFrame`}
                                />
                            </div>
                        </div>
                        <ul style={{ marginTop: "15px", cursor: "pointer", display: "flex", gap: "5px" }}>
                            {Object.values(series).map((item, index) => (
                                <li style={{ textAlign: "center", width: "60px" }} key={index} onClick={() => handleClick(item.number)}>
                                    <span style={{ display: "block" }}>{item.name}</span>
                                    {`${item.number === activeSerie?.number ? "(active)" : ""}`}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default StudyPage;
