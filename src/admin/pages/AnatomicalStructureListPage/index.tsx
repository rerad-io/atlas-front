import { useEffect, useState } from "react";
import Button from "../../../components/UI/Button";
import AnatomicalStructureForm from "../../components/AnatomicalStructureForm";
import AnatomicalStructureList from "../../components/AnatomicalStructureList";
import { AnatomicalStructure } from "../../../_types";
import { getAnatomicalStructureList } from "../../../requests/anatomicalStructureRequests";
import s from "./styles.module.scss";

const columns = ["Идентификационный номер", "Название Структуры", "Тема ", "Действия"];

const AnatomicalStructureListPage = () => {
    const [anatomicalStructureList, setAnatomicalStructureList] = useState<AnatomicalStructure[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAnatomicalStructureList({});
                setAnatomicalStructureList(result);
            } catch (error) {
                console.error("Error fetching AnatomicalStructureList:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={s.page}>
            <div className="container">
                <div className={s.page_wrapper}>
                    <h1 className="title ">Анатомические структуры</h1>
                    <AnatomicalStructureForm {...{ setAnatomicalStructureList }} />
                    <Button to="/admin/AnatomicalStructure/create">Создать Анатомическую структуру</Button>
                </div>
            </div>
            <AnatomicalStructureList {...{ anatomicalStructureList, columns }} />
        </div>
    );
};

export default AnatomicalStructureListPage;
