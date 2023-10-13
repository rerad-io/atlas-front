import { useParams } from "react-router-dom";

const AnatomicalStructureEditPage = () => {
    const { id } = useParams<{ id: string }>();

    return <div>{id ? `AnatomicalStructureEditPage/${id}` : "AnatomicalStructureEditPage/create"}</div>;
};

export default AnatomicalStructureEditPage;
