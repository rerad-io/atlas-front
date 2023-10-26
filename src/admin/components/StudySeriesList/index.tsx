import { useEffect, useState } from "react";
import Button from "../../../components/UI/Button";
import TableComponent from "../../../components/UI/TableComponent";
import { getStudySeriesList, deleteStudySeries } from "../../../requests/StudySeriesRequests";
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

    const removeItemById = async (itemId: string) => {
        try {
            const result = await deleteStudySeries(itemId);
            if (result === 204) {
                setStudySeriesList(studySeriesList.filter((item) => item.id !== itemId));
            }
        } catch (error) {
            console.error("Error fetching StudySeriesList:", error);
        }
    };

    return (
        <div className={s.page}>
            <h3>Список серий исследования</h3>

            <Button to={`/admin/StudySeries/create?seriesId=${seriesId}`}>Добавить серию исследования</Button>
            <section className={s.section}>
                <div className="container">
                    <div>
                        <TableComponent {...{columns, data:studySeriesList, actions:"StudySeries/", removeItemById}}/>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default StudySeriesList;
