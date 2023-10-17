import AnatomicalStructureSubjectTable from "../../components/AnatomicalStructureSubjectTable";
import Button from "../../../components/UI/Button";
import s from "./s.module.css";

const obj = {
    items: [
        {
            id: "3ebafa2a-7448-47ba-80fa-5e9ee88f73d8",
            name: "наименование 1 ",
            color: "74b9ff",
        },
        {
            id: "4ebafa2a-7448-47ba-80fa-5e9ee88f73d7",
            name: "наименование 2",
            color: "00b894",
        },
    ],
};

const AnatomicalStructureSubjectListPage = () => {
    return (
        <div className={s.page}>
            <h1>Темы Анатомической структуры</h1>
            <Button to="/admin/AnatomicalStructureSubject/create">Add new Anatomical Theme</Button>
            <AnatomicalStructureSubjectTable obj={obj.items} />
        </div>
    );
};

export default AnatomicalStructureSubjectListPage;
