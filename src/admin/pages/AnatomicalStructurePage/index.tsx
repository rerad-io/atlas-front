import { useEffect } from "react";
import Button from "../../../components/UI/Button";
import AnatomicalStructureList from "../../components/AnatomicalStructureList";
import s from "./styles.module.scss";
import { useSelector } from "react-redux";
//import { anatomicalStructureSelector } from "../../../store/anatomicalStructure";
//import { fetchAnatomicalStructureList } from "../../../asyncActions/anatomicalStructure";

const AnatomicalStructurePage = () => {
	const anatomicalStructureList = useSelector((store) => store.anatomicalStructure)
	//const anatomicalStructureList = anatomicalStructureSelector((store) => store.anatomicalStructure)

	useEffect(()=>{
		//fetchAnatomicalStructureList();
	},[])
    return (
        <div className={s.page}>
            <div className="container">
                <h1 className="title ">Анатомические структуры</h1>
                <Button to="/admin/AnatomicalStructureSubject/create">Add new Anatomical Structure</Button>
            </div>
            <AnatomicalStructureList structureList={anatomicalStructureList} />
        </div>
    );
};

export default AnatomicalStructurePage;
