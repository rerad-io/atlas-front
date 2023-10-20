import { useEffect, useState } from "react";
import axios from "axios";
import TableComponent from "../../../components/UI/TableComponent";
// import AnatomicalStructureItem from "../AnatomicalStructureItem"; // если будет принят компонент TableComponent то этот можно удалить
import s from "./styles.module.scss";
import { anatomicalStructure } from "../../../data/data";

type AnatomicalStructureListProps = {
	subjectId?: string
}
const columns = ["Id", "Name", "Subject", "Anatomical Structure Subject Id", "color", "Actions"];

const baseUrl = "https://api/";

const AnatomicalStructureList = (props: AnatomicalStructureListProps) => {

	const [anatomicalStructureList, setAnatomicalStructureList] = useState<any>([]);
	useEffect(() => {
		getList();
}, []);

const getList = () => {
	//раскоментировать после добавления базы
	let url: string = `${baseUrl}AnatomicalStructure`;
	if(props.subjectId){
		url = url+ "/props.subjectId";
		const temporaryAnatomicalStructureList = anatomicalStructure.items.filter((elem) => elem.anatomicalStructureSubject.id === props.subjectId); // удалить
		setAnatomicalStructureList(temporaryAnatomicalStructureList); // удалить
	}else{
		setAnatomicalStructureList(anatomicalStructure.items); // удалить после добавления базы
		}
		//	try {
		//		axios.get(url)
		//		.then(res=> {
		//			setAnatomicalStructureList(res.data);
		//		})
		//	} catch (error) {
		//		console.log(error);
		//}
};

const removeItem = (itemId: string) => {
	//заменить после добавления базы
	setAnatomicalStructureList(anatomicalStructureList.filter((item) => item.id !== itemId));
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
};

    return (
        <section className={s.section}>
            <div className="container">
                <div>
                    {/*<table>
                        <thead>
                            <tr>
                                <th className={s.table_head}>Name</th>
                                <th className={s.table_head}>Thema</th>
                                <th className={s.table_head}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {anatomicalStructureList?.map((el) => (
                                <AnatomicalStructureItem key={el.id} {...el} removeItem={removeItem}/>
                            ))}
                        </tbody>
                    </table>*/}
										<TableComponent columns={columns} data={removeItem} actions={"/admin/AnatomicalStructure/"} />
                </div>
            </div>
        </section>
    );
};

export default AnatomicalStructureList;
