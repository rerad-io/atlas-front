import { useEffect, useState } from "react";
import StudyList from "../../components/StudyList";
import Button from "../../../components/UI/Button";
import s from "./styles.module.scss";
import { getStudyList } from "../../../requests/StudyRequests";
import { Study } from "../../../_types";

const columns = [
    "Идентификационный номер",
    "Внешний идентификатор",
    "Название исследования",
    "Описание",
    "Предварительный кадр",
    "Действия",
];

const StudyListPage = () => {
    const [studyList, setStudyList] = useState([]);

    useEffect(() => {
        const fetchDataAndSetStudyList = async () => {
            try {
                const studies = await getStudyList();
                setStudyList(
                    studies.map((study: Study) => ({
                        id: study.id,
                        externalId: study?.externalId,
                        name: study.name,
                        description: study?.description,
                    })),
                );
            } catch (error) {
                console.error("StudyListTable - ", error);
            }
        };
        fetchDataAndSetStudyList();
    }, []);

    return (
        <div className={s.page}>
            <h1>Исследования</h1>
            <Button to="/admin/Study/create">Добавить исследование</Button>
            <StudyList studyList={studyList} columns={columns} actions="Study/" />
        </div>
    );
};

export default StudyListPage;
