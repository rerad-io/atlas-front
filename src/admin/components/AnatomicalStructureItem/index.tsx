import { FC } from "react";
import s from "./styles.module.scss";
import { Link } from "react-router-dom";

type AnatomicalStructureItemProps = {
    id: string;
    name: string;
    subject: string;
    anatomicalStructureSubjectId: string;
    color: string;
};

const AnatomicalStructureItem: FC<AnatomicalStructureItemProps> = ({ id, name, subject, anatomicalStructureSubjectId, color }) => {
    return (
        <tr>
            <td className={s.table_cage}>
                <Link to={`/admin/AnatomicalStructure/${id}`}>{name}</Link>
            </td>
            <td className={s.table_cage} style={{ color: color }}>
                <Link to={`/admin/AnatomicalStructureSubject/${anatomicalStructureSubjectId}`}>{subject}</Link>
            </td>
            <td className={s.table_cage}>
                <button className={s.btn_delete}>X</button>
            </td>
        </tr>
    );
};

export default AnatomicalStructureItem;
