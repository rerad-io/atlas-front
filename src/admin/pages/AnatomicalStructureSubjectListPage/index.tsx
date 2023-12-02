import Button from "../../../components/UI/Button";
import AnatomicalStructureSubjectList from "../../components/AnatomicalStructureSubjectList";
import s from "./styles.module.scss";

const AnatomicalStructureSubjectListPage = () => {
    return (
        <div className={s.page}>
            <div className="container">
                <h1>Темы Анатомической структуры</h1>
                <Button to="/admin/AnatomicalStructureSubject/create">Добавить новую тему</Button>
            </div>
            <AnatomicalStructureSubjectList />
        </div>
    );
};

export default AnatomicalStructureSubjectListPage;
