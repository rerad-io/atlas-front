import { useEffect, useState } from "react";
import TableComponent from "../../../components/UI/TableComponent";
import { deleteAnatomicalStructure, getAnatomicalStructureList } from "../../../requests/anatomicalStructureRequests";
import { AnatomicalStructure } from "../../../_types";

type Props = {
	anatomicalStructureList: AnatomicalStructure[],
}

const AnatomicalStructureList = ({ anatomicalStructureList }:Props) => {
    const [structureList, setStructureList] = useState<AnatomicalStructure[]>(anatomicalStructureList);
    const [columns, setColumns] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAnatomicalStructureList({});
                setStructureList(result);
            } catch (error) {
                console.error("Error fetching AnatomicalStructureList:", error);
            }
        };
            fetchData();
    }, []);

    useEffect(() => {
        if (structureList.length) {
            const columnsTitles = Object.keys(structureList[0]);
            columnsTitles.push("Actions");
            setColumns(columnsTitles);
        }
    }, [structureList]);

    const removeItemById = async (itemId: string) => {
        try {
            const result = await deleteAnatomicalStructure(itemId);
            if (result === 204) {
                setStructureList(structureList.filter((item) => item.id !== itemId));
            }
        } catch (error) {
            console.error("Error fetching AnatomicalStructureSubjectList:", error);
        }
    };

    return <TableComponent columns={columns} data={structureList} actions={"AnatomicalStructure/"} removeItemById={removeItemById} />;
};

export default AnatomicalStructureList;
