import Button from "../../../components/UI/Button";
import AnatomicalStructureSubjectTable from "../../components/AnatomicalStructureSubjectTable";
import s from "./s.module.css";

const AnatomicalStructureSubjectListPage = () => {
    return (
        <div className={s.page}>
            <div className="container">
                <h1>Темы Анатомической структуры</h1>
                <Button to="/admin/AnatomicalStructureSubject/create">Add new Anatomical Theme</Button>
            </div>
            <AnatomicalStructureSubjectTable />
        </div>
    );
};

export default AnatomicalStructureSubjectListPage;
