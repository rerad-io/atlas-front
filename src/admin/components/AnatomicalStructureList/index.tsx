import { useEffect, useState } from "react";
import TableComponent from "../../../components/UI/TableComponent";
import { deleteAnatomicalStructure, getAnatomicalStructureList } from "../../../requests/anatomicalStructureRequests";
import { AnatomicalStructure } from "../../../_types";

const AnatomicalStructureList = ({ subjectId }) => {
    const [anatomicalStructureList, setAnatomicalStructureList] = useState<AnatomicalStructure[]>([]);
    const [columns, setColumns] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAnatomicalStructureList();
                if (subjectId) {
                    const subjectIdList = result.filter((elem) => elem.anatomicalStructureSubject?.id === subjectId);
                    setAnatomicalStructureList(subjectIdList);
                } else {
                    setAnatomicalStructureList(result);
                }
            } catch (error) {
                console.error("Error fetching AnatomicalStructureList:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (anatomicalStructureList.length) {
            const columnsTitles = Object.keys(anatomicalStructureList[0]);
            columnsTitles.push("Actions");
            setColumns(columnsTitles);
        }
    }, [anatomicalStructureList]);

    const removeItemById = async (itemId: string) => {
        try {
            const result = await deleteAnatomicalStructure(itemId);
            if (result === 204) {
                setAnatomicalStructureList(anatomicalStructureList.filter((item) => item.id !== itemId));
            }
        } catch (error) {
            console.error("Error fetching AnatomicalStructureSubjectList:", error);
        }
    };

    return (
        <TableComponent columns={columns} data={anatomicalStructureList} actions={"AnatomicalStructure/"} removeItemById={removeItemById} />
    );
};

export default AnatomicalStructureList;
