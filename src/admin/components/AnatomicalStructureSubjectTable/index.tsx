import AnatomicalStructureSubjectTableItem from "../AnatomicalStructureSubjectTableItem";

const AnatomicalStructureSubjectTable = ({ obj }) => {
    return (
        <div>
            <table>
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
            </table>
        </div>
    );
};

export default AnatomicalStructureSubjectTable;
