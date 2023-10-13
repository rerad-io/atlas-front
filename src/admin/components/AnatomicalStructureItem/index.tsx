import { Link } from "react-router-dom";
import s from "./styles.module.scss";

type AnatomicalStructureItemProps = {
    id: string;
    name: string;
    subject: string;
    anatomicalStructureSubjectId: string;
    color: string;
};

const AnatomicalStructureItem = (props: AnatomicalStructureItemProps) => {
    return (
        <tr>
            <td className={s.table_cage}>
                <Link to={`/admin/AnatomicalStructure/${props.id}`}>{props.name}</Link>
            </td>
            <td className={s.table_cage} style={{ color: props.color }}>
                <Link to={`/admin/AnatomicalStructureSubject/${props.anatomicalStructureSubjectId}`}>{props.subject}</Link>
            </td>
            <td className={s.table_cage}>
                <button className={s.btn_delete}>X</button>
            </td>
        </tr>
    );
};

export default AnatomicalStructureItem;
