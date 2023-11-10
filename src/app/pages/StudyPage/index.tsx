import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getStudyId } from "../../../requests/StudyRequests";
import { instanceSelector, setAnatomicalStructures, setCurrentInstanceNumber, setCurrentSereies, setSeriesList, setStudy } from "../../../store/instance";
import { Series } from "../../../_types";
import FrameSelector from "../../../components/FrameSelector";
import RenderComponent from "../../../components/RenderComponent";
import { getAnatomicalStructureList } from "../../../requests/anatomicalStructureRequests";
import { getInstanceDataList } from "../../../requests/instanceDataRequests";
import s from "./styles.module.scss";

const StudyPage = () => {
    const { id } = useParams<string>();
    const dispatch = useDispatch();

    const { study, series, currentInstanceData } = useSelector(instanceSelector);
    //console.log("🚀 ~ file: index.tsx:18 ~ StudyPage ~ study:", study)
    //const [activeSerie, setActiveSerie] = useState<Series>({} as Series);
    //const [activeInstases, setActiveInstances] = useState([]);
    //const [currentFrame, setCurrentFrame] = useState({});

    useLayoutEffect(() => {
			if (id ) {
					console.log("🚀 ~ file: index.tsx:25 ~ useLayoutEffect ~ study:", study.id)
            const fetchStudyData = async (studyId: string) => {
                try {
                    const targetStudy = await getStudyId(studyId);
                    const instanceDataList = await getInstanceDataList({});

                    dispatch(setStudy({
                        ...targetStudy,
                        instanceData: instanceDataList.filter((item) => item.studyId === targetStudy.id),
                    }));

                    const tempStudiesList = await getAnatomicalStructureList({});
                    dispatch(setAnatomicalStructures(tempStudiesList));
                } catch (error) {
                    console.error("Error fetching StudyPage:", error);
                }
            };

            fetchStudyData(id); 
        } 

    //    return () => {
    //    setActiveSerie({});
    //    setActiveInstances([]);
    //    setCurrentFrame({});
    //};
    }, [id, dispatch]);

    //useEffect(() => {
    //    if (Object.keys(series).length) {
    //        setActiveSerie(Object.values(series)[0]);
    //    }
    //}, [series]);

    //useEffect(() => {
    //    if (Object.keys(activeSerie).length) {
    //        const currentInstance = currentInstanceData[activeSerie.number];
    //        if (currentInstance) {
    //            setActiveInstances(currentInstance);
    //            setCurrentFrame(currentInstance[0]);
    //        }
    //    }
    //}, [activeSerie, instanceData]);

    const changeSerie = (number: number) => {
        //const targetSerie: Series = series[number];
        //setActiveSerie(targetSerie);
				dispatch(setCurrentSereies(number))
			};
			
			const handleCurrentFrame = (number: number) => {
				//const currentInstance = instanceData[activeSerie.number];
        //setCurrentFrame(currentInstance[currentId]);
				dispatch(setCurrentInstanceNumber(number))
    };

    return (
        <div className={s.page}>
            <div className="container">{study.name ? <h1>Исследование: {`"${study.name}"`}</h1> : <h2>Loading...</h2>}</div>
            {Object.keys(study).length ? (
                <section>
                    <div style={{ marginTop: "30px" }}>
                        <FrameSelector frameList={activeInstases} handleCurrentFrame={handleCurrentFrame} />
                        <RenderComponent />
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
                                    <li style={{ textAlign: "center", width: "60px" }} key={index} onClick={() => changeSerie(item.number)}>
                                        <span style={{ display: "block" }}>{item.name}</span>
                                        {`${item.number === activeSerie?.number ? "(active)" : ""}`}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            ) : (
                <div className="container">
                    <h2 style={{ marginTop: "30px" }}>Нет схраненных серий исследования...</h2>
                </div>
            )}
        </div>
    );
};

export default StudyPage;
