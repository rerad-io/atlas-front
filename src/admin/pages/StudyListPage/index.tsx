import StudyListTable from "../../components/StudyListTable";
import Button from "../../../components/UI/Button";
import s from "./s.module.css";

type obj = {
    Id: "string";
    ExternalId: "string";
    Name: "string";
    Description: "string";
    PreviewFrame: "string";
};

const obj = {
    items: [
        {
            Id: "3ebafa2a-7448-47ba-80fa-5e9ee88f73d8",
            ExternalId: "3ebafa2a-7448-47ba-80fa-5e9ee88f73d8string",
            Name: "Study - name 1",
            Description: "Study description 1",
            PreviewFrame: "someImg.jpg",
        },
        {
            Id: "8ebafa2a-7448-47ba-80fa-5e9ee88f73d5",
            ExternalId: "8ebafa2a-7448-47ba-80fa-5e9ee88f73d5",
            Name: "Study - name 2",
            Description: "Study description 2",
            PreviewFrame: "someImg2.jpg",
        },
    ],
};

const StudyListPage = () => {
    return (
        <div className={s.page}>
            <h1>Исследования</h1>
            <Button to="/admin/Study/create">Add new Study</Button>
            <StudyListTable obj={obj.items} />
        </div>
    );
};

export default StudyListPage;
