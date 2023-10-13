import StudyListTableItem from "../StudyListTableItem";

const StudyListTable = ({ obj }) => {
    return (
        <div>
            <table>
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
            </table>
        </div>
    );
};

export default StudyListTable;
