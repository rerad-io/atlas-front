import { useEffect, useState } from "react";
import Button from "../../../components/UI/Button";
import TableComponent from "../../../components/UI/TableComponent";
import { getStudySeriesList } from "../../../requests/StudySeriesRequests";
import s from "./s.module.css";

const StudySeriesList = ({ seriesId }) => {
    const columns = ["Id", "Study", "Number", "Name", "PreviewFrame", "InstanceCount", "SagitalFrame", "CoronalFrame", "Actions"];

    const [studySeriesList, setStudySeriesList] = useState([]);

    useEffect(() => {
        const fetchDataAndSetStudySeriesList = async () => {
            try {
                const result = await getStudySeriesList();
                setStudySeriesList(result);
                // TODO: добавить метод фильтр и отфильтровать по study
                //setStudySeriesList(result.filter(el => el.id === seriesId));
            } catch (error) {
                console.error("StudySeriesListTable - ", error);
            }
        };
        fetchDataAndSetStudySeriesList();
    }, []);

    return (
        <div className={s.page}>
            <h3>Список серий исследования</h3>

            <Button to={`/admin/StudySeries/create?seriesId=${seriesId}`}>Добавить серию исследования</Button>
            <section className={s.section}>
                <div className="container">
                    <div>
                        <TableComponent columns={columns} data={studySeriesList} actions={"/admin/StudySeries/"} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default StudySeriesList;
