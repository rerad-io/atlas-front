import { useEffect, useState } from "react";
import TableComponent from "../../../components/UI/TableComponent";
import { deleteStudy } from "../../../requests/StudyRequests";
import { Study } from "../../../_types";


type Props = {
	studyList: Study[];
	columns: string[];
};
const StudyList = ({ studyList, columns }: Props) => {
    const [list, setList] = useState(studyList);

		useEffect(() => {
			setList(studyList);
	}, [studyList]);

    const removeItemById = async (itemId: string) => {
        try {
            const result = await deleteStudy(itemId);
            if (result === 204) {
                setList(list.filter((item) => item.id !== itemId));
            }
        } catch (error) {
            console.error("Error fetching StudyListTable:", error);
        }
    };

    return (
        <div>
            <TableComponent columns={columns} data={list} actions={"Study/"} removeItemById={removeItemById} />
        </div>
    );
};

export default StudyList;
