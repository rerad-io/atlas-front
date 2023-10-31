import { useEffect, useState } from "react";
import TableComponent from "../../../components/UI/TableComponent";
import { deleteAnatomicalStructure } from "../../../requests/anatomicalStructureRequests";
import { AnatomicalStructure } from "../../../_types";

type Props = {
    anatomicalStructureList: AnatomicalStructure[];
    columns: string[];
};

const AnatomicalStructureList = ({ anatomicalStructureList, columns }: Props) => {
    const [structureList, setStructureList] = useState<AnatomicalStructure[]>(anatomicalStructureList);

    useEffect(() => {
        setStructureList(anatomicalStructureList);
    }, [anatomicalStructureList]);

    const removeItemById = async (itemId: string) => {
        const isAlert = confirm("уверены что хотите удалить?");
        if (isAlert) {
            try {
                const result = await deleteAnatomicalStructure(itemId);
                if (result === 204) {
                    setStructureList(structureList.filter((item) => item.id !== itemId));
                }
            } catch (error) {
                console.error("Error fetching AnatomicalStructureSubjectList:", error);
            }
        }
    };

    return <TableComponent columns={columns} data={structureList} actions={"AnatomicalStructure/"} removeItemById={removeItemById} />;
};

export default AnatomicalStructureList;
