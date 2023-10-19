//import { useEffect, useState } from "react";
import Button from "../../../components/UI/Button";
import AnatomicalStructureList from "../../components/AnatomicalStructureList";
//import { anatomicalStructure } from "../../../data/data";
import s from "./styles.module.scss";

const AnatomicalStructureListPage = () => {

	//const [structureList, setStructureList] = useState<any[]>([]);

	//useEffect(() => {
	//		getList();
	//}, []);

	//const getList = () => {
	//	setStructureList(anatomicalStructure.items); // удалить после добавления базы
			//раскоментировать после добавления базы
			//	try {
			//		axios.get(`${baseUrl}AnatomicalStructure`)
			//		.then(res=> {
			//			setStructureList(res.data);
			//		})
			//	} catch (error) {
			//		console.log(error);
			//}
	//};

	//const removeItem = (itemId: string) => {
		//заменить после добавления базы
		//setStructureList(structureList.filter((item) => item.id !== itemId));
		//	try {
		//		axios.delete(`${baseUrl}AnatomicalStructure/${itemId}`)
		//		.then(res=> {
			//if(res.data === '204'){
				//getList();
			//}
		//		})
		//	} catch (error) { 
		//		console.log(error);
		//}
//};

	
    return (
        <div className={s.page}>
            <div className="container">
                <h1 className="title ">Анатомические структуры</h1>
                <Button to="/admin/AnatomicalStructure/create">Add new Anatomical Structure</Button>
            </div>
            {/*<AnatomicalStructureList anatomicalStructureList={structureList} removeItem={removeItem}/>*/}
            <AnatomicalStructureList/>
        </div>
    );
};

export default AnatomicalStructureListPage;
