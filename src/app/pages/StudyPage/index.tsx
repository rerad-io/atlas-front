import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getStudyId } from "../../../requests/StudyRequests";
import {
    instanceSelector,
    setAnatomicalStructures,
    setCurrentInstanceNumber,
    setCurrentSereies,
    setStudy,
} from "../../../store/instance";
import { getAnatomicalStructureList } from "../../../requests/anatomicalStructureRequests";
import { getInstanceDataList } from "../../../requests/instanceDataRequests";
import s from "./styles.module.scss";
import { WhiteBoardCanvas } from "../../../components/WhiteBoardCanvas";
import FrameSelector from "../../../components/FrameSelector";

const StudyPage = () => {
    const { id } = useParams<string>();
    const dispatch = useDispatch();

    const {study} = useSelector(instanceSelector);

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
                            //instanceData: instanceDataList,
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

    const changeSerie = (number: number) => {
        //const targetSerie: Series = series[number];
        //setActiveSerie(targetSerie);
        dispatch(setCurrentSereies(number));
    };

    return (
        <div className={s.page}>
            <div className="container">{study.name ? <h1>Исследование: {`"${study.name}"`}</h1> : <h2>Loading...</h2>}</div>
            {Object.keys(study).length ? (
                <section>
                    <div style={{ marginTop: "30px" }}>
                        <FrameSelector/>
                        <WhiteBoardCanvas />
                    </div>
                    {/*<div className="container">
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
                    </div>*/}
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
