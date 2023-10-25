// import StudyListTableItem from "../StudyListTableItem"; // если будет принят компонент TableComponent то этот можно удалить

import { useEffect, useState } from "react";
import TableComponent from "../../../components/UI/TableComponent";
import { getStudyList } from "../../../requests/StudyRequests";

const StudyListTable = () => {
    const columns = ["Id", "ExternalId", "Name", "Description", "PreviewFrame", "Actions"];
    const [studyList, setStudyList] = useState([]);

    useEffect(() => {
        const fetchDataAndSetStudyList = async () => {
            try {
                const result = await getStudyList();
                setStudyList(result);
            } catch (error) {
                console.error("StudyListTable - ", error);
            }
        };
        fetchDataAndSetStudyList();
    }, []);

    return (
        <div>
            <TableComponent columns={columns} data={studyList} actions={"/admin/Study/"} />
        </div>
    );
};

export default StudyListTable;
