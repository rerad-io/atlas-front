import { Link } from "react-router-dom";
import Button from "../../components/UI/Button";
import s from "./s.module.css";

const AnatomicalStructureSubjectTableItem = ({ id, name, color }) => {
    return (
        <tr style={{ backgroundColor: `#${color}` }}>
            <td>
                <Link to={`/admin/AnatomicalStructureSubject/${id}`} className={s.link}>
                    {name}
                </Link>
            </td>
            <td>{color}</td>
            <td>
                <Button className={s.btnDelete}>X</Button>
            </td>
        </tr>
    );
};

export default AnatomicalStructureSubjectTableItem;
