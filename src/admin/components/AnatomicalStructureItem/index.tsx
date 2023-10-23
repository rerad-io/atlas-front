import { Link } from "react-router-dom";
import s from "./styles.module.scss";

//type AnatomicalStructureItemProps = {
//	id: string;
//	name: string;
//	anatomicalStructureSubject: {
//		id: string,
//		name: string,
//		color: string,
//	}
//};

const AnatomicalStructureItem = ({ id, name, anatomicalStructureSubject, removeItem }) => {
    return (
        <tr>
            <td className={s.table_cage}>
                <Link to={`/admin/AnatomicalStructure/${id}`} className={s.link}>
                    {name}
                </Link>
            </td>
            <td className={s.table_cage}>
                <Link
                    to={`/admin/AnatomicalStructureSubject/${anatomicalStructureSubject?.id}`}
                    className={s.link}
                    style={{ color: anatomicalStructureSubject?.color }}
                >
                    {anatomicalStructureSubject?.name}
                </Link>
            </td>
            <td className={s.table_cage}>
                <button className={s.btn_delete} onClick={() => removeItem(id)}>
                    X
                </button>
            </td>
        </tr>
    );
};

export default AnatomicalStructureItem;
