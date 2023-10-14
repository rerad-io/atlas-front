import s from "./styles.module.css";
import Button from "../../../components/UI/Button";

type StudySeriesListItemProps = {
    Id: string;
    Study: string;
    Number: number;
    Name: string;
    PreviewFrame: string;
    InstanceCount: number;
    SagitalFrame: string;
    CoronalFrame: string;
};

const StudySeriesListItem = (props: StudySeriesListItemProps) => {
    return (
        <tr>
            <td className={s.table_cage}>{props.Id}</td>
            <td className={s.table_cage}>{props.Study}</td>
            <td className={s.table_cage}>{props.Number}</td>
            <td className={s.table_cage}>{props.Name}</td>
            <td className={s.table_cage}>{props.PreviewFrame}</td>
            <td className={s.table_cage}>{props.InstanceCount}</td>
            <td className={s.table_cage}>{props.SagitalFrame}</td>
            <td className={s.table_cage}>{props.CoronalFrame}</td>
            <td className={s.table_cage}>
                <Button to={`/admin/StudySeriesItem/${props.Id}`}>Edit</Button> <Button className={s.btnDelete}>Delete</Button>
            </td>
        </tr>
    );
};

export default StudySeriesListItem;
