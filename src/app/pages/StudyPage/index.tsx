import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { seriesData } from "../../../data/data";
import TableComponent from "../../../components/UI/TableComponent";
import s from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getStudyId } from "../../../requests/StudyRequests";
import { getSeriesList } from "../../../store/instance";

const StudyPage = () => {
    const { id } = useParams<string>();

    const {series} = useSelector(store => store.instance);
    const dispatch = useDispatch();

    const [study, setStudy] = useState({});
    //const [series, setSeries] = useState([]);
    const [activeNumber, setActiveNumber] = useState<string>(Object.values(series)[0]?.id);
    const [activeSeries, setActiveSeries] = useState(Object.values(series)[0]);
    //const [instances, setInstances] = useState([]);
    //const [instanceColumns, setInstanceColumns] = useState<string[]>([]);

    //const instanceData = instanceSelector(store => store.instance);

    useEffect(() => {
        const fetchData = async () => {
            try {
                //получить данные о самом исследовании
                //в ответset Studyе должен быть массив с записями объекта InstanceData
                //Массив с записями объекта Series
                // TODO: данные нужно получить из базы
                if (id) {
                    const tempStudy = await getStudyId(id);
                    setStudy(tempStudy);
                    // TODO: раскоментировать при рабочей базе, убрать ипмпорт seriesData
                    //const seriesData = await getStudySeriesList();										
                    dispatch(getSeriesList(seriesData.filter(serie=> serie.study.id === id)));
                }
            } catch (error) {
                console.error("Error fetching StudyPage:", error);

                //const instance = instanceList;
                //setInstances(instance.filter((item) => item.study === id));
                //const tempSeries = seriesData;
                //setSeries(tempSeries.filter((item) => item.study === id));
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        if (series) {
            setActiveNumber(Object.values(series)[0]?.id);
            setActiveSeries(series[0]);
        }
    }, [series]);

    //useEffect(() => {
    //    if (instances.length) {
    //        const columnsTitles = Object.keys(instances[0]);
    //        setInstanceColumns(columnsTitles);
    //    }
    //}, [instances]);

    const handleClick = (id: string) => {
        const elem = Object.values(series).find((elem) => elem.id === id);
        setActiveNumber(elem.id);
        setActiveSeries(elem);
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
                    {/*{activeSeries ? <TableComponent data={Object.entries(activeSeries)} /> : ""}*/}
                </div>
            </section>

            {/*<section>
                <div className="container">
                    <h2>Инстансы исследования {`"${study.name}"`}</h2>
                    {instances.length ? <TableComponent columns={instanceColumns} data={instances} /> : ""}
                </div>
            </section>*/}

            <section>
                <div className="container">
                    {/*<img
                        src={activeSeries?.previewFrame}
                        alt={activeSeries?.name}
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />*/}
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
