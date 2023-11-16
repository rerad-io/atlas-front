import axios from "axios";
import { backendUrl } from "./backendUrl";
import { AnatomicalStructureSubject, AnatomicalStructureSubjectModel } from "../_types";

export const getAnatomicalStructureSubjectList = async () => {
    const result = await axios.get<AnatomicalStructureSubject[]>(`${backendUrl}AnatomicalStructureSubject`);
    if (result.status >= 200 && result.status <= 300) {
        return result.data;
    }
    console.log("Error status", result.status);
    console.log("Error data", result.data);
    throw new Error("API returned unsuccessful message");
};

export const getAnatomicalStructureSubjectById = async (id: string) => {
    const result = await axios.get<AnatomicalStructureSubjectModel>(`${backendUrl}AnatomicalStructureSubject/${id}`);
    if (result.status >= 200 && result.status <= 300) {
        return result.data;
    }
    console.log("Error status", result.status);
    console.log("Error data", result.data);
    throw new Error("API returned unsuccessful message");
};

export const createAnatomicalStructureSubject = async (body: { name?: string; color?: string }) => {
    const result = await axios.post(`${backendUrl}AnatomicalStructureSubject/`, body);
    if (result.status >= 200 && result.status <= 300) {
        return result.data;
    }
    console.log("Error status", result.status);
    console.log("Error data", result.data);
    throw new Error("API returned unsuccessful message");
};

export const updateAnatomicalStructureSubject = async (id: string, body: { name?: string; color?: string }) => {
    const result = await axios.put(`${backendUrl}AnatomicalStructureSubject/${id}`, body);
    if (result.status >= 200 && result.status <= 300) {
        return result.data;
    }
    console.log("Error status", result.status);
    console.log("Error data", result.data);
    throw new Error("API returned unsuccessful message");
};

export const deleteAnatomicalStructureSubject = async (id: string) => {
    const result = await axios.delete(`${backendUrl}AnatomicalStructureSubject/${id}`);
    console.log("🚀 ~ file: anatomicalStructureSubjectRequests.ts:48 ~ deleteAnatomicalStructureSubject ~ result:", result)
    return result.status;
    console.log("Error status", result.status);
    console.log("Error data", result.data);
    throw new Error("API returned unsuccessful message");
};
