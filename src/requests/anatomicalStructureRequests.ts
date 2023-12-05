import axios from "axios";
import { backendUrl } from "./backendUrl";
import { AnatomicalStructure, AnatomicalStructureModel } from "../_types";

const prepareQuery = (parameters: Record<string, unknown>): string => {
    if (parameters) {
        const queryParams = new URLSearchParams(parameters as Record<string, string>).toString();
        if (queryParams) {
            return `/search?${queryParams}`;
        }
        return `?${queryParams}`;
    }
    return "";
};

export const getAnatomicalStructureList = async (parameters: Record<string, unknown>) => {
    const result = await axios.get<AnatomicalStructure[]>(`${backendUrl}AnatomicalStructure${prepareQuery(parameters)}`);
    if (result.status >= 200 && result.status <= 300) {
        return result.data;
    }
    console.log("Error status", result.status);
    console.log("Error data", result.data);
    throw new Error("API returned unsuccesfull message");
};

// TODO: для аутентификации
//export const getAnatomicalStructureAuthList = async (parameters: Record<string, unknown>) => {
//    const result = await axios.get<AnatomicalStructure[]>(`${backendUrl}AnatomicalStructure${prepareQuery(parameters)}`, {
//			headers:{
//				"Authorization":"Bearer YOUR_ACCESS_TOKEN",
//			}
//		});
//    if (result.status >= 200 && result.status <= 300) {
//        return result.data;
//    }
//    console.log("Error status", result.status);
//    console.log("Error data", result.data);
//    throw new Error("API returned unsuccesfull message");
//};

export const getAnatomicalStructureById = async (id: string) => {
    const result = await axios.get<AnatomicalStructureModel>(`${backendUrl}AnatomicalStructure/${id}`);
    if (result.status >= 200 && result.status <= 300) {
        return result.data;
    }
    console.log("Error status", result.status);
    console.log("Error data", result.data);
    throw new Error("API returned unsuccessful message");
};

export const createAnatomicalStructure = async (body: Record<string, unknown>) => {
    const result = await axios.post(`${backendUrl}AnatomicalStructure/`, body);
    if (result.status >= 200 && result.status <= 300) {
        return result.data;
    }
    console.log("Error status", result.status);
    console.log("Error data", result.data);
    throw new Error("API returned unsuccessful message");
};

export const updateAnatomicalStructure = async (id: string, body: Record<string, unknown>) => {
    const result = await axios.put(`${backendUrl}AnatomicalStructure/${id}`, body);
    if (result.status >= 200 && result.status <= 300) {
        return result.data;
    }
    console.log("Error status", result.status);
    console.log("Error data", result.data);
    throw new Error("API returned unsuccessful message");
};

export const deleteAnatomicalStructure = async (id: string) => {
    const result = await axios.delete(`${backendUrl}AnatomicalStructure/${id}`);
    return result.status;
    console.log("Error status", result.status);
    console.log("Error data", result.data);
    throw new Error("API returned unsuccessful message");
};
