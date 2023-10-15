import Button from "../../../components/UI/Button";
import AnatomicalStructureList from "../../components/AnatomicalStructureList";
import s from "./styles.module.scss";

const anatomicalStructureListPage = [
    {
        id: "3ebafa2a-7448-47ba-80fa-5e9ee88f7999",
        name: "структура 1 ",
        subject: "костная ткань",
        anatomicalStructureSubjectId: "3ebafa2a-7448-47ba-80fa-5e9ee88f73d8",
        color: "00FF12",
    },
    {
        id: "4ebafa2a-7448-47ba-80fa-5e9ee8f76667",
        name: "структура с текстом 2",
        subject: "мышечная ткань",
        anatomicalStructureSubjectId: "4ebafa2a-7448-47ba-80fa-5e9ee88f73d7",
        color: "d92020",
    },
];

const AnatomicalStructureListPage = () => {
    return (
        <div className={s.page}>
            <div className="container">
                <h1 className="title ">Анатомические структуры</h1>
                <Button to="/admin/AnatomicalStructure/create">Add new Anatomical Structure</Button>
            </div>
            <AnatomicalStructureList structureList={anatomicalStructureListPage} />
        </div>
    );
};

export default AnatomicalStructureListPage;
