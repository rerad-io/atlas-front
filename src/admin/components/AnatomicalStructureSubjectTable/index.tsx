import TableComponent from "../../../components/UI/TableComponent";
// import AnatomicalStructureSubjectTableItem from "../AnatomicalStructureSubjectTableItem"; // если будет принят компонент TableComponent то этот можно удалить

const AnatomicalStructureSubjectTable = ({ obj }) => {
    const columns = ["id", "Name", "Color", "Actions"];
    return (
        <div>
            {/* <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Color</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {obj.map((el) => (
                        <AnatomicalStructureSubjectTableItem key={el.id} {...el} />
                    ))}
                </tbody>
            </table> */}
            <TableComponent columns={columns} data={obj} actions={"/admin/AnatomicalStructureSubject/"} />
        </div>
    );
};

export default AnatomicalStructureSubjectTable;
