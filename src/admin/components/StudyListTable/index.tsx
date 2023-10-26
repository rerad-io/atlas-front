// import StudyListTableItem from "../StudyListTableItem"; // если будет принят компонент TableComponent то этот можно удалить

import { useEffect, useState } from "react";
import TableComponent from "../../../components/UI/TableComponent";
import { getStudyList, deleteStudy } from "../../../requests/StudyRequests";

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

    const removeItemById = async (itemId: string) => {
        try {
            const result = await deleteStudy(itemId);
            if (result === 204) {
                setStudyList(studyList.filter((item) => item.id !== itemId));
            }
        } catch (error) {
            console.error("Error fetching StudyListTable:", error);
        }
    };

    return (
        <div>
            <TableComponent {...{ columns, data: studyList, actions: "Study/", removeItemById }} />
        </div>
    );
};

export default StudyListTable;
