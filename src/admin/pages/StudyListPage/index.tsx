import { useEffect, useState } from "react";
import StudyList from "../../components/StudyList";
import Button from "../../../components/UI/Button";
import s from "./s.module.css";
import { getStudyList } from "../../../requests/StudyRequests";

const StudyListPage = () => {
    const [studyList, setStudyList] = useState([]);
    const [columns, setColumns] = useState<string[]>([]);

    useEffect(() => {
        const fetchDataAndSetStudyList = async () => {
            try {
                const studies = await getStudyList();
                setStudyList(studies);
            } catch (error) {
                console.error("StudyListTable - ", error);
            }
        };
        fetchDataAndSetStudyList();
    }, []);

    useEffect(() => {
        if (studyList.length) {
            const columnsTitles = Object.keys(studyList[0]);
            columnsTitles.push("Actions");
            setColumns(columnsTitles);
        }
    }, [studyList]);

    return (
        <div className={s.page}>
            <h1>Исследования</h1>
            <Button to="/admin/Study/create">Add new Study</Button>
            <StudyList studyList={studyList} columns={columns} setStudyList={setStudyList} />
        </div>
    );
};

export default StudyListPage;
