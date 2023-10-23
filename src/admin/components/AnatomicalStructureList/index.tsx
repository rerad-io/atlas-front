
import { useEffect, useState } from "react";
import TableComponent from "../../../components/UI/TableComponent";
import { getItem, getList, removeItem } from "../../../axios/requestsAnatomicalStructure";
import s from "./styles.module.scss";
import { anatomicalStructure } from "../../../data/data";

type AnatomicalStructureListProps = {
    subjectId?: string;
};

const AnatomicalStructureList = (props: AnatomicalStructureListProps) => {
    //console.log("🚀 ~ file: index.tsx:12 ~ AnatomicalStructureList ~ props:", props.subjectId)

    const [anatomicalStructureList, setAnatomicalStructureList] = useState<any>([]);
    //console.log("🚀 ~ file: index.tsx:13 ~ AnatomicalStructureList ~ anatomicalStructureList:", anatomicalStructureList)
    const [columns, setColumns] = useState<any>([]);
    //console.log("🚀 ~ file: index.tsx:15 ~ AnatomicalStructureList ~ columns:", columns)

    useEffect(() => {
        if (props.subjectId) {
            //console.log("🚀 ~ file: index.tsx:20 ~ useEffect ~ props.subjectId:", props.subjectId)

            getItem(props.subjectId, "AnatomicalStructure/", setAnatomicalStructureList);
        } else {
            //setAnatomicalStructureList(anatomicalStructure.items)
            getList("AnatomicalStructure/", setAnatomicalStructureList);
        }
    }, []);

    useEffect(() => {
        if (anatomicalStructureList.length) {
            //console.log("🚀 ~ file: index.tsx:23 ~ useEffect ~ anatomicalStructureList:", anatomicalStructureList)
            const columnsTitles = Object.keys(anatomicalStructureList[0]);
            //console.log("🚀 ~ file: index.tsx:24 ~ useEffect ~ s:", s)
            columnsTitles.push("Actions");
            //console.log("🚀 ~ file: index.tsx:25 ~ useEffect ~ columnsTitles:", columnsTitles)
            setColumns(columnsTitles);
        }
    }, [anatomicalStructureList]);

    const removeItemById = (itemId: string) => {
        //заменить после добавления базы
        setAnatomicalStructureList(anatomicalStructureList.filter((item) => item.id !== itemId));
        //removeItem(itemId, actions);
    };

    return (
        <section className={s.section}>
            <TableComponent
                columns={columns}
                data={anatomicalStructureList}
                actions={"AnatomicalStructure/"}
                removeItemById={removeItemById}
            />
        </section>
    );
};

export default AnatomicalStructureList;
