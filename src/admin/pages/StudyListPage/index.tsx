import StudyListTable from "../../components/StudyListTable";
import Button from "../../components/UI/Button";

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
            ExternalId: "3ebafa2a-7448-47ba-80fa-5e9ee88f73d8string",
            Name: "Study - name 1",
            Description: "Study description 1",
            PreviewFrame: "someImg.jpg",
        },
        {
            id: "8ebafa2a-7448-47ba-80fa-5e9ee88f73d5",
            ExternalId: "8ebafa2a-7448-47ba-80fa-5e9ee88f73d5",
            Name: "Study - name 2",
            Description: "Study description 2",
            PreviewFrame: "someImg2.jpg",
        },
    ],
};

const StudyListPage = () => {
    return (
        <>
            <Button to="/admin/Study/create">Add new Study</Button>
            <StudyListTable obj={obj.items} />
        </>
    );
};

export default StudyListPage;
