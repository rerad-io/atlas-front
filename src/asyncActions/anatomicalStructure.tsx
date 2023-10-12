import { AppDispatch } from "../store";
import { addAnatomicalStructureList } from "../store/anatomicalStructure";

export const baseUrl = 'http://localhost:3333';

export const fetchAnatomicalStructureList = async (dispatch:AppDispatch) => {
try {
	//const resp = await fetch(`${baseUrl}/api/AnatomicalStructure`)
	const resp = await fetch('https://fakestoreapi.com/products/')
	const data = await resp.json();
	console.log(data);
	dispatch(addAnatomicalStructureList(data)); 
} catch (error) {
	alert(error)
}

} 