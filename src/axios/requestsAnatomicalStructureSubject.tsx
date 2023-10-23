import axios from "axios";
import toast from "react-hot-toast";

const backendUrl = "https://atlas-api.d.medcol.io";
const notify = (message: string) => toast(message, { duration: 2000 });

export type AnatomicalStructureSubjectItem = {
	id: string;
	name: string;
	color: string;
}

export const getAnatomicalStructureSubjectList =  async() => {
				const result = await axios.get<AnatomicalStructureSubjectItem>(`${backendUrl}/api/AnatomicalStructure`);
				console.log("🚀 ~ file: requestsAnatomicalStructureSubject.tsx:16 ~ getAnatomicalStructureSubjectList ~ result:", result)
				if(result.status >=200 && result.status <=300){
					return result.data;
				}
				console.log("Error status", result.status); 
				console.log("Error data", result.data); 
				throw new Error("API returned unsuccesfull message");
};

export const getItem: () => void = (id?: string, path?: string, callback?: any) => {
    try {
        //axios.get(`${baseUrl}${path}${id}`)
        axios.get(`https://jsonplaceholder.typicode.com/comments?postId=1`).then((res) => callback(res.data));
    } catch (error) {
        console.log(error);
    }
};

export const addItem: () => void = (body?: { name?: string; anatomicalStructureSubjectId?: string }, path?: string) => {
    try {
        axios.post(`${baseUrl}${path}`, body).then((res) => console.log(res.data));
    } catch (error) {
        console.log(error);
    }
};

export const updateItem: () => void = (body?: { name?: string; anatomicalStructureSubjectId?: string }, id?: string, path?: string) => {
    try {
        axios.put(`${baseUrl}${path}${id}`, body).then((res) => console.log(res.data));
        notify("изменение успешно!");
    } catch (error) {
        console.log(error);
        notify("ошибка сохранения");
    }
};

export const removeItem: () => void = (id?: string, path?: string) => {
    try {
        axios.delete(`${baseUrl}${path}${id}`).then((res) => {
            if (res.data === "204") {
                console.log(res.data);
            }
        });
    } catch (error) {
        console.log(error);
    }
};
