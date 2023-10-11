import AnatomicalStructureSubjectTable from "../../components/AnatomicalStructureSubjectTable";
import Button from "../../components/UI/Button";

const obj = {
    items: [
        {
            id: "3ebafa2a-7448-47ba-80fa-5e9ee88f73d8",
            name: "наименование 1 ",
            color: "00FF12",
        },
        {
            id: "4ebafa2a-7448-47ba-80fa-5e9ee88f73d7",
            name: "наименование 2",
            color: "00FF12",
        },
    ],
};

const AnatomicalStructureListPage = () => {
    return (
        <>
            <Button to="/admin/AnatomicalStructureSubject/create">Add new Anatomical Structure</Button>
            <AnatomicalStructureSubjectTable obj={obj.items} />
        </>
    );
};

export default AnatomicalStructureListPage;
