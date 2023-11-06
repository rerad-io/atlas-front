import { useEffect, useState } from "react";
import Button from "../../../components/UI/Button";
import TableComponent from "../../../components/UI/TableComponent";
import { deleteStudySeries } from "../../../requests/StudySeriesRequests";
import { temporarySeriesData } from "../../../data/data";
import { Series } from "../../../_types";
import s from "./s.module.css";

const StudySeriesList = ({ studyId }) => {
    const [studySeriesList, setStudySeriesList] = useState<Series[]>([]);
    const [columns, setColumns] = useState<string[]>([]);

    useEffect(() => {
        const fetchDataAndSetStudySeriesList = async () => {
            try {
                // TODO: раскоментировать с рабочей базой
                //const temporarySeriesData = await getStudySeriesList();
                const seriesData = temporarySeriesData.map(({ study, ...rest }) => {
                    return { ...rest, studyId: study.id };
                });
                setStudySeriesList(seriesData);
                const columnsTitles = Object.keys(seriesData[0]);
                columnsTitles.push("Actions");
                setColumns(columnsTitles);
                // TODO: добавить метод фильтр и отфильтровать по study
                //setStudySeriesList(result.filter(el => el.id === seriesId));
            } catch (error) {
                console.error("StudySeriesListTable - ", error);
            }
        };
        fetchDataAndSetStudySeriesList();
    }, []);

    const removeItemById = async (itemId: string) => {
        const isAlert = confirm("уверены, что хотите удалить?");
        if (isAlert) {
            try {
                const result = await deleteStudySeries(itemId);
                if (result === 204) {
                    setStudySeriesList(studySeriesList.filter((item) => item.id !== itemId));
                }
            } catch (error) {
                console.error("Error fetching StudySeriesList:", error);
            }
        }
    };

    return (
        <div className={s.page}>
            <h3>Список серий исследования</h3>
            <Button to={`/admin/StudySeries/create?studyId=${studyId}`}>Добавить серию исследования</Button>
            <section className={s.section}>
                <div className="container">
                    <div>
                        <TableComponent {...{ columns, data: studySeriesList, actions: "StudySeries/", removeItemById }} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default StudySeriesList;
