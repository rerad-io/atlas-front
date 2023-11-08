import Button from "../Button";
import s from "./styles.module.scss";

function TableComponent({ columns = [], data = [], actions = "", removeItemById = null }) {
    const tableHeader = () => columns.map((column, index) => <th key={index}>{column}</th>);
    const tableData = () => {
        return data.map((item, index) => (
            <tr
                key={index}
                style={
                    item.anatomicalStructureSubject
                        ? { backgroundColor: `#${item.anatomicalStructureSubject.color}` }
                        : { backgroundColor: `#${item.color}` }
                }
            >
                {item.anatomicalStructureSubject ? (
                    <>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.anatomicalStructureSubject ? item.anatomicalStructureSubject.name : ""}</td>
                    </>
                ) : (
                    Object.values(item).map((value, objectIndex) => <td key={objectIndex}>{value}</td>)
                )}
                {actions ? (
                    <td className={s.actions}>
                        <div className={s.action_wrapper}>
                            <Button to={`/admin/${actions}/${item.id}`}>Edit</Button>
                            <Button onClick={() => removeItemById(item.id, actions)}>Delete</Button>
                        </div>
                    </td>
                ) : null}
            </tr>
        ));
    };

    return (
        <div className={s.table_content}>
            <div className="container">
                <div className={s.table_wrapper}>
                    <table className={s.table}>
                        <thead>
                            <tr className={s.table_header}>{tableHeader()}</tr>
                        </thead>
                        <tbody>{tableData()}</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TableComponent;
