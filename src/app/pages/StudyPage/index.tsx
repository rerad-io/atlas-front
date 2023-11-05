import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { temporarySeriesData } from "../../../data/data";
import TableComponent from "../../../components/UI/TableComponent";
import s from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getStudyId } from "../../../requests/StudyRequests";
import { getSeriesList } from "../../../store/instance";

const StudyPage = () => {
    const { id } = useParams<string>();

    const { series } = useSelector((store) => store.instance);
    const dispatch = useDispatch();

    const [study, setStudy] = useState({});
    const [activeNumber, setActiveNumber] = useState<string>(Object.values(series)[0]?.id);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // TODO: данные нужно получить из базы
                if (id) {
                    const tempStudy = await getStudyId(id);
                    setStudy(tempStudy);
                    // TODO: раскоментировать при рабочей базе, убрать ипмпорт seriesData
                    //const seriesData = await getStudySeriesList();
                    dispatch(getSeriesList(temporarySeriesData.filter((serie) => serie.study.id === id)));
                }
            } catch (error) {
                console.error("Error fetching StudyPage:", error);
            }
        };

        fetchData();
    }, [id, dispatch]);

    useEffect(() => {
        if (series) {
            setActiveNumber(Object.values(series)[0]?.id);
            setActiveSeries(series[0]);
        }
    }, [series]);

    const handleClick = (id: string) => {
        const elem = Object.values(series).find((elem) => elem.id === id);
        setActiveNumber(elem.id);
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
                    {study.name ? <h2>Серии исследования {`"${study.name}"`}</h2> : <h2>Loading...</h2>}
                    {series ? <TableComponent data={Object.keys(series)} /> : ""}
                </div>
            </section>

            <section>
                <div className="container">
                    <ul style={{ marginTop: "15px", cursor: "pointer" }}>
                        {Object.values(series).map((item, index) => (
                            <li key={index} onClick={() => handleClick(item.id)}>
                                {`${item.name} ${item.id === activeNumber ? "(active)" : ""}`}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default StudyPage;
