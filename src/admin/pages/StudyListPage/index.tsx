import StudyListTable from "../../components/StudyListTable";
import Button from "../../../components/UI/Button";
import s from "./s.module.css";

const StudyListPage = () => {
    return (
        <div className={s.page}>
            <h1>Исследования</h1>
            <Button to="/admin/Study/create">Add new Study</Button>
            <StudyListTable />
        </div>
    );
};

export default StudyListPage;
