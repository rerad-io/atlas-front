import { useEffect, useState } from "react";
import Button from "../../../components/UI/Button";
import AnatomicalStructureForm from "../../components/AnatomicalStructureForm";
import AnatomicalStructureList from "../../components/AnatomicalStructureList";
import s from "./styles.module.scss";
import { AnatomicalStructure } from "../../../_types";
import { getAnatomicalStructureList } from "../../../requests/anatomicalStructureRequests";

const AnatomicalStructureListPage = () => {
    const [anatomicalStructureList, setAnatomicalStructureList] = useState<AnatomicalStructure[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAnatomicalStructureList();
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
                <h1 className="title ">Анатомические структуры</h1>
                <AnatomicalStructureForm setAnatomicalStructureList={setAnatomicalStructureList} />
                <Button to="/admin/AnatomicalStructure/create" style={{ marginTop: "30px" }}>
                    Add new Anatomical Structure
                </Button>
            </div>
            <AnatomicalStructureList anatomicalStructureList={anatomicalStructureList} />
        </div>
    );
};

export default AnatomicalStructureListPage;
