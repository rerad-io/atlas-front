import { useParams } from "react-router-dom";
import s from "./styles.module.scss";
import { useEffect, useState } from "react";
import { instanceList, seriesData, studiesList } from "../../../data/data";
import TableComponent from "../../../components/UI/TableComponent";

const StudyPage = () => {
    const { id } = useParams<string>();

    const [study, setStudy] = useState({});
    const [series, setSeries] = useState([]);
    const [activeNumber, setActiveNumber] = useState<string>(series[0]?.id);
    const [activeSeries, setActiveSeries] = useState(series[0]);
    const [instances, setInstances] = useState([]);
    const [instanceColumns, setInstanceColumns] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                //получить данные о самом исследовании
                //в ответset Studyе должен быть массив с записями объекта InstanceData
                //Массив с записями объекта Series
                // TODO: данные нужно получить из базы
                //const tempStudy = await getStudyId(id);
                //const tempSeries = await getStudySeriesId(id);

                const elem = studiesList.find((elem) => elem.id === id);
                setStudy(elem);

                const instance = instanceList;
                setInstances(instance.filter((item) => item.study === id));
                const tempSeries = seriesData;
                setSeries(tempSeries.filter((item) => item.study === id));
            } catch (error) {
                console.error("Error fetching AnatomicalStructureList:", error);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        if (series.length) {
            setActiveNumber(series[0].id);
            setActiveSeries(series[0]);
        }
    }, [series]);

    useEffect(() => {
        if (instances.length) {
            const columnsTitles = Object.keys(instances[0]);
            setInstanceColumns(columnsTitles);
        }
    }, [instances]);

    const handleClick = (id: string) => {
        const elem = series.find((elem) => elem.id === id);
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
                    <h2>Серии исследования {`"${study.name}"`}</h2>
                    {activeSeries ? <TableComponent data={Object.entries(activeSeries)} /> : ""}
                </div>
            </section>
            <section>
                <div className="container">
                    <h2>Инстансы исследования {`"${study.name}"`}</h2>
                    {instances.length ? <TableComponent columns={instanceColumns} data={instances} /> : ""}
                </div>
            </section>
            <section>
                <div className="container">
                    <img
                        src={activeSeries?.previewFrame}
                        alt={activeSeries?.name}
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                    <ul style={{ marginTop: "15px", cursor: "pointer" }}>
                        {series.map((item, index) => (
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
