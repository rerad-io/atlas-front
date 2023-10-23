import TableComponent from "../../../components/UI/TableComponent";

const AnatomicalStructureSubjectTable = ({ subjectslist, removeItem }) => {
    const columns = ["id", "Name", "Color", "Actions"];

    return (
        <>
          <TableComponent columns={columns} data={obj} actions={"/admin/AnatomicalStructureSubject/"} />
        </>
    );
};

export default AnatomicalStructureSubjectTable;
