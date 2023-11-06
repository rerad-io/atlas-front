import { useEffect, useState } from "react";
import TableComponent from "../../../components/UI/TableComponent";
import {
    deleteAnatomicalStructureSubject,
    getAnatomicalStructureSubjectById,
    getAnatomicalStructureSubjectList,
} from "../../../requests/anatomicalStructureSubjectRequests";
import { AnatomicalStructureSubject } from "../../../_types";

const AnatomicalStructureSubjectList = () => {
    const [subjectsList, setSubjectsList] = useState<AnatomicalStructureSubject[]>([]);
    const [columns, setColumns] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAnatomicalStructureSubjectList();
                setSubjectsList(result);
            } catch (error) {
                console.error("Error fetching AnatomicalStructureSubjectList:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (subjectsList.length) {
            const columnsTitles = Object.keys(subjectsList[0]);
            columnsTitles.push("Actions");
            setColumns(columnsTitles);
        }
    }, [subjectsList]);

    const removeItemById = async (itemId: string) => {
        const targetSubject = await getAnatomicalStructureSubjectById(itemId);
        if (!targetSubject.anatomicalStructures.length) {
            const isAlert = confirm("уверены, что хотите удалить?");
            if (isAlert) {
                try {
                    const result = await deleteAnatomicalStructureSubject(itemId);
                    if (result === 204) {
                        setSubjectsList(subjectsList.filter((item) => item.id !== itemId));
                    }
                } catch (error) {
                    console.error("Error fetching AnatomicalStructureSubjectList:", error);
                }
            }
        } else {
            alert("В этой теме есть анатомические структуры. Сперва нужно их удалить");
        }
    };
    return <TableComponent columns={columns} data={subjectsList} actions={"AnatomicalStructureSubject/"} removeItemById={removeItemById} />;
};

export default AnatomicalStructureSubjectList;
