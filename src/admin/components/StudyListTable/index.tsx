// import StudyListTableItem from "../StudyListTableItem"; // если будет принят компонент TableComponent то этот можно удалить

import TableComponent from "../../../components/UI/TableComponent";

const StudyListTable = ({ obj }) => {
    const columns = ["Id", "Name", "ExternalId", "Description", "PreviewFrame", "Actions"];
    return (
        <div>
            {/* <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>ExternalId</th>
                        <th>Description</th>
                        <th>PreviewFrame</th>
                    </tr>
                </thead>
                <tbody>
                    {obj.map((el) => (
                        <StudyListTableItem key={el.id} {...el} />
                    ))}
                </tbody>
            </table> */}
            <TableComponent columns={columns} data={obj} actions={"/admin/Study/"} />
        </div>
    );
};

export default StudyListTable;
