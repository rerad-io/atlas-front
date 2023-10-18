import s from "./styles.module.css";
import Button from "../../../components/UI/Button";

type StudySeriesListItemProps = {
    id: string;
    study: string;
    number: number;
    name: string;
    previewFrame: string;
    instanceCount: number;
    sagitalFrame: string;
    coronalFrame: string;
};

const StudySeriesListItem = (props: StudySeriesListItemProps) => {
    return (
        <tr>
            <td className={s.table_cage}>{props.id}</td>
            <td className={s.table_cage}>{props.study}</td>
            <td className={s.table_cage}>{props.number}</td>
            <td className={s.table_cage}>{props.name}</td>
            <td className={s.table_cage}>{props.previewFrame}</td>
            <td className={s.table_cage}>{props.instanceCount}</td>
            <td className={s.table_cage}>{props.sagitalFrame}</td>
            <td className={s.table_cage}>{props.coronalFrame}</td>
            <td className={s.table_cage}>
                <Button to={`/admin/StudySeries/${props.id}`}>Edit</Button> <Button className={s.btnDelete}>Delete</Button>
            </td>
        </tr>
    );
};

export default StudySeriesListItem;
