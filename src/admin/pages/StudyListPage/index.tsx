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
            id: "3ebafa2a-7448-47ba-80fa-5e9ee88f73d8",
            externalId: "3ebafa2a-7448-47ba-80fa-5e9ee88f73d8string",
            name: "Study - name 1",
            description: "Study description 1",
            previewFrame: "someImg.jpg",
        },
        {
            id: "8ebafa2a-7448-47ba-80fa-5e9ee88f73d5",
            externalId: "8ebafa2a-7448-47ba-80fa-5e9ee88f73d5",
            name: "Study - name 2",
            description: "Study description 2",
            previewFrame: "someImg2.jpg",
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
