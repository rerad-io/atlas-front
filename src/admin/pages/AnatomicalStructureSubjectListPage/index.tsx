import Button from "../../../components/UI/Button";
import AnatomicalStructureSubjectList from "../../components/AnatomicalStructureSubjectList";
import s from "./s.module.css";

const AnatomicalStructureSubjectListPage = () => {
    return (
        <div className={s.page}>
            <div className="container">
                <h1>Темы Анатомической структуры</h1>
                <Button to="/admin/AnatomicalStructureSubject/create">Add new Anatomical Theme</Button>
            </div>
            <AnatomicalStructureSubjectList />
        </div>
    );
};

export default AnatomicalStructureSubjectListPage;
