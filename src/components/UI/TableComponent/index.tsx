// Инструкция:

// До вызова компонента TableComponent создай массив с названиями колонок таблицы. Пример:
// const columns = ["id", "Name", "Color", "Actions"];
// Затем вызови компонент TableComponent следующим образом:
// <TableComponent columns={columns} data={obj} actions={"/admin/AnatomicalStructureSubject/"} />
// columns - это массив с названиями колонок таблицы.
// data - это массив с объектами данных.
// actions - укажите путь к странице редактирования элемента. В конце адреса будет подставлен id.
// ACTIONS (Действия)                /          ID
// /admin/AnatomicalStructureSubject/3213213

import Button from "../Button";
import s from "./s.module.css";

function TableComponent({ columns, data, actions = false }) {
    const tableHeader = () => {
        return columns.map((column, index) => <th key={index}>{column}</th>);
    };

    const tableData = () => {
        return data.map((item, index) => {
            return (
                <tr key={index} style={item.color && { backgroundColor: `#${item.color}` }}>
                    {Object.values(item).map((value, obj_index) => (
                        <>
                            <td key={obj_index}>{value}</td>
                        </>
                    ))}
                    {actions ? (
                        <td className={s.actions}>
                            {" "}
                            <Button to={`${actions}/${item.id}`}>Edit</Button> <Button>Delete</Button>
                        </td>
                    ) : (
                        ""
                    )}
                </tr>
            );
        });
    };

    return (
        <table className={s.table}>
            <thead>
                <tr>{tableHeader()}</tr>
            </thead>
            <tbody>{tableData()}</tbody>
        </table>
    );
}

export default TableComponent;
