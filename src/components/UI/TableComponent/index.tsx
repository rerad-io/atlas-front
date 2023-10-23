import Button from "../Button";
import s from "./styles.module.scss";

function TableComponent({ columns, data, actions = "", removeItemById }) {
    const tableHeader = () => {
        return columns.map((column, index) => <th key={index}>{column}</th>);
    };

    const tableData = () => {
        return data.map((item, index) => {
            return (
                <tr key={index} style={item.color && { backgroundColor: `#${item.color}` }}>
                    {Object.values(item).map((value, index) => (
                        <>
                            <td key={index}>{value}</td>
                        </>
                    ))}
                    {actions ? (
                        <td className={s.actions}>
                            <Button to={`/admin/${actions}/${item.id}`}>Edit</Button>
                            <Button onClick={() => removeItemById(item.id, actions)}>Delete</Button>
                        </td>
                    ) : null}
                </tr>
            );
        });
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
