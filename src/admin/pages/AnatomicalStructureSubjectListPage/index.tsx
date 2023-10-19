import { useEffect, useState } from "react";
//import axios from "axios";
import Button from "../../../components/UI/Button";
import AnatomicalStructureSubjectTable from "../../components/AnatomicalStructureSubjectTable";
import s from "./s.module.css";
import { anatomicalStructureSubjectsList } from "../../../data/data";

//const baseUrl = "https://api/";

const AnatomicalStructureSubjectListPage = () => {
    const [subjectslist, setSubjectsList] = useState<any[]>([]);

    useEffect(() => {
        getList();
    }, []);

    const getList = () => {
        setSubjectsList(anatomicalStructureSubjectsList.items); // удалить после добавления базы
        //раскоментировать после добавления базы
        //	try {
        //		axios.get(`${baseUrl}AnatomicalStructureSubject`)
        //		.then(res=> {
        //			setSubjectsList(res.data);
        //		})
        //	} catch (error) {
        //		console.log(error);
        //}
    };

    const removeItem = (itemId: string) => {
        //заменить после добавления базы
        setSubjectsList(subjectslist.filter((item) => item.id== itemId));
        //	try {
        //		axios.delete(`${baseUrl}AnatomicalStructureSubject/${itemId}`)
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
        <div className={s.page}>
            <h1>Темы Анатомической структуры</h1>
            <Button to="/admin/AnatomicalStructureSubject/create" >Add new Anatomical Theme</Button>
            <AnatomicalStructureSubjectTable subjectslist={subjectslist} removeItem={removeItem} />
        </div>
    );
};

export default AnatomicalStructureSubjectListPage;
