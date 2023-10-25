import Button from "../../../components/UI/Button";
import AnatomicalStructureList from "../../components/AnatomicalStructureList";
import s from "./styles.module.scss";

const AnatomicalStructureListPage = () => {
    return (
        <div className={s.page}>
            <div className="container">
                <h1 className="title ">Анатомические структуры</h1>
                <Button to="/admin/AnatomicalStructure/create">Add new Anatomical Structure</Button>
            </div>
            <AnatomicalStructureList />
        </div>
    );
};

export default AnatomicalStructureListPage;
