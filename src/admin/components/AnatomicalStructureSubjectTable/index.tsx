import { useEffect, useState } from "react";
import TableComponent from "../../../components/UI/TableComponent";
import { getAnatomicalStructureSubjectList } from "../../../axios/requestsAnatomicalStructureSubject";

const AnatomicalStructureSubjectTable = () => {
    const [subjectslist, setSubjectsList] = useState([]);
    const [columns, setColumns] = useState<string[]>([]);

    useEffect(() => {
			const structureList = getAnatomicalStructureSubjectList();
			console.log("🚀 ~ file: index.tsx:11 ~ useEffect ~ structureList:", structureList)
			setSubjectsList(structureList);
    }, []);

    useEffect(() => {
        if (subjectslist.length) {
            const columnsTitles = Object.keys(subjectslist[0]);
            columnsTitles.push("Actions");
            setColumns(columnsTitles);
        }
    }, [subjectslist]);

    return <TableComponent columns={columns} data={subjectslist} actions={"AnatomicalStructureSubject/"} />;
};

export default AnatomicalStructureSubjectTable;
