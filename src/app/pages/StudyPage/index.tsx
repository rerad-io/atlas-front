import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { temporarySeriesData } from "../../../data/data";
import { getStudyId } from "../../../requests/StudyRequests";
import { setAnatomicalStructuresSubjects, setSeriesList, setStudy } from "../../../store/instance";
import { Series } from "../../../_types";
import TableComponent from "../../../components/UI/TableComponent";
import { getAnatomicalStructureSubjectList } from "../../../requests/anatomicalStructureSubjectRequests";
import s from "./styles.module.scss";

const StudyPage = () => {
    const { id } = useParams<string>();
    const dispatch = useDispatch();

    const { study, series, instanceData } = useSelector(({ instance }) => instance);
    const [activeSerie, setActiveSerie] = useState<Series>();
    const [activeInstases, setActiveInstances] = useState();

    useEffect(() => {
        if (id) {
            const fetchStudyData = async (studyId: string) => {
                try {
                    const tempStudy = await getStudyId(studyId);
                    dispatch(setStudy(tempStudy));
                    const tempStudiesList = await getAnatomicalStructureSubjectList();
                    dispatch(setAnatomicalStructuresSubjects(tempStudiesList));
                    // TODO: раскоментировать при рабочей базе, убрать ипмпорт seriesData
                    //const temporarySeriesData = await getStudySeriesList();
                    dispatch(setSeriesList(temporarySeriesData.filter((serie) => serie.study.id === studyId)));
                } catch (error) {
                    console.error("Error fetching StudyPage:", error);
                }
            };

            fetchStudyData(id);
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (series) {
            setActiveSerie(Object.values(series)[0]);
        }
    }, [series]);

    useEffect(() => {
        setActiveInstances(instanceData[activeSerie?.number]);
    }, [activeSerie, instanceData]);

    const handleClick = (number: string) => {
        const targetSerie: Series = series[number];
        setActiveSerie(targetSerie);
        setActiveInstances(instanceData[number]);
    };

    return (
        <div className={s.page}>
            <section>
                <div className="container">
                    <h1 className="title">Исследование</h1>
                    <TableComponent data={Object.entries(study)} />
                </div>
            </section>
            <section>
                <div className="container">
                    {study.name ? <h2>Активная серия исследования {`"${study.name}"`}</h2> : <h2>Loading...</h2>}
                    <div style={{ padding: "20px 0", display: "flex", flexDirection: "column", gap: "10px" }}>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <span>ID: {activeSerie?.id}</span>
                            <span>Name: {activeSerie?.name}</span>
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: "2px" }}>
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
                </div>
            </section>

            <section>
                <div className="container">
                    {study.name ? <h2>Инстансы исследования {`"${study.name}"`}</h2> : <h2>Loading...</h2>}
                    <ul style={{ padding: "20px 0", display: "flex", flexDirection: "column", gap: "10px" }}>
                        {activeInstases?.map((item, index) => (
                            <li key={index}>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <span>Instance Number: {item.instanceNumber}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section>
                <div className="container">
                    <ul style={{ marginTop: "15px", cursor: "pointer" }}>
                        {Object.values(series).map((item, index) => (
                            <li key={index} onClick={() => handleClick(item.number)}>
                                {`${item.name} ${item.number === activeSerie?.number ? "(active)" : ""}`}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default StudyPage;
