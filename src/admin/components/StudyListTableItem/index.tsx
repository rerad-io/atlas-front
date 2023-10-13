import { Link } from "react-router-dom";
import Button from "../../components/UI/Button";
import s from "./s.module.css";

const StudyListTableItem = ({ Id, ExternalId, Name, Description, PreviewFrame }) => {
    return (
        <tr>
            <td>
                <Link to={`/admin/Study/${Id}`} className={s.link}>
                    {Name}
                </Link>
            </td>
            <td>{ExternalId}</td>
            <td>{Description}</td>
            <td>
                <img src={`#${PreviewFrame}`} alt="" />
            </td>
            <td>
                <Button className={s.btnDelete}>X</Button>
            </td>
        </tr>
    );
};

export default StudyListTableItem;
