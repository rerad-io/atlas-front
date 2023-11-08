import axios from "axios";
import { backendUrl } from "./backendUrl";

export const getStudySeriesList = async () => {
    const result = await axios.get(`${backendUrl}Series`);
    if (result.status >= 200 && result.status <= 300) {
        return result.data;
    }
    console.log("Error status: ", result.status);
    console.log("Error data: ", result.data);
    throw new Error("API returned unsuccessful message");
};

export const getStudySeriesId = async (id: string) => {
    const result = await axios.get(`${backendUrl}Series/${id}`);
    if (result.status >= 200 && result.status <= 300) {
        return result.data;
    }
    console.log("Error status: ", result.status);
    console.log("Error data: ", result.data);
    throw new Error("API returned unsuccessful message");
};

export const createStudySeries = async (body: Record<string, unknown>) => {
    console.log("🚀 ~ file: StudySeriesRequests.ts:25 ~ createStudySeries ~ body:", body);
    const result = await axios.post(`${backendUrl}Series/`, body);
    if (result.status >= 200 && result.status <= 300) {
        return result.data;
    }
    console.log("Error status: ", result.status);
    console.log("Error data: ", result.data);
    throw new Error("API returned unsuccessful message");
};

export const updateStudySeries = async (body: Record<string, unknown>, id: string) => {
    console.log("🚀 ~ file: StudySeriesRequests.ts:38 ~ updateStudySeries ~ body:", body);
    const result = await axios.put(`${backendUrl}Series/${id}`, body);
    if (result.status >= 200 && result.status <= 300) {
        return result.data;
    }
    console.log("Error status: ", result.status);
    console.log("Error data: ", result.data);
    throw new Error("API returned unsuccessful message");
};

export const deleteStudySeries = async (id: string) => {
    const result = await axios.delete(`${backendUrl}Series/${id}`);
    if (result.status >= 200 && result.status <= 300) {
        return result.data;
    }
    console.log("Error status: ", result.status);
    console.log("Error data: ", result.data);
    throw new Error("API returned unsuccessful message");
};
