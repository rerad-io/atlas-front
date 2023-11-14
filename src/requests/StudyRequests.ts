import axios from "axios";
import { backendUrl } from "./backendUrl";
import { StudyFullModel } from "../_types";

export const getStudyList = async () => {
    const result = await axios.get(`${backendUrl}Study`);
    if (result.status >= 200 && result.status <= 300) {
        return result.data;
    }
    console.log("Error status: ", result.status);
    console.log("Error data: ", result.data);
    throw new Error("API returned unsuccessful message");
};

export const getStudyId = async (id: string) => {
    const result = await axios.get<StudyFullModel>(`${backendUrl}Study/${id}`);
    if (result.status >= 200 && result.status <= 300) {
        return result.data;
    }
    console.log("Error status: ", result.status);
    console.log("Error data: ", result.data);
    throw new Error("API returned unsuccessful message");
};

export const createStudy = async (body: Record<string, unknown>) => {
    const result = await axios.post(`${backendUrl}Study/`, body);
    if (result.status >= 200 && result.status <= 300) {
        return result.data;
    }
    console.log("Error status: ", result.status);
    console.log("Error data: ", result.data);
    throw new Error("API returned unsuccessful message");
};

export const updateStudy = async (body: Record<string, unknown>, id: string) => {
    const result = await axios.put(`${backendUrl}Study/${id}`, body);
    if (result.status >= 200 && result.status <= 300) {
        return result.data;
    }
    console.log("Error status: ", result.status);
    console.log("Error data: ", result.data);
    throw new Error("API returned unsuccessful message");
};

export const deleteStudy = async (id: string) => {
    const result = await axios.delete(`${backendUrl}Study/${id}`);
    if (result.status >= 200 && result.status <= 300) {
        return result.status;
    }
    console.log("Error status: ", result.status);
    console.log("Error data: ", result.data);
    throw new Error("API returned unsuccessful message");
};
