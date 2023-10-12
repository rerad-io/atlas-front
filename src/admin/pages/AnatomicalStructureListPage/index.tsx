import AnatomicalStructureSubjectTable from "../../components/AnatomicalStructureSubjectTable";
import Button from "../../components/UI/Button";

type obj = {
    name: string;
    color: string;
};

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

const AnatomicalStructureListPage = () => {
    return (
        <>
            <Button to="/admin/AnatomicalStructureSubject/create">Add new Anatomical Theme</Button>
            <AnatomicalStructureSubjectTable obj={obj.items} />
        </>
    );
};

export default AnatomicalStructureListPage;
