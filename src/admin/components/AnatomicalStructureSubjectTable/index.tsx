import AnatomicalStructureSubjectTableItem from "../AnatomicalStructureSubjectTableItem";

const AnatomicalStructureSubjectTable = ({ subjectslist, removeItem }) => {
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
                    {/*{subjectslist.map((el) => ( // раскоментировать*/}
                    {subjectslist.slice(0, 6).map(
                        (
                            el, // удалить
                        ) => (
                            <AnatomicalStructureSubjectTableItem key={el.id} {...el} removeItem={removeItem} />
                        ),
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AnatomicalStructureSubjectTable;
