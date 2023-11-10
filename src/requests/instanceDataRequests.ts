import axios from "axios";
import { backendUrl } from "./backendUrl";
import { InstanceData } from "../_types";

const prepareQuery = (parameters: Record<string, unknown>): string => {
    if (parameters) {
        const queryParams = new URLSearchParams(parameters as Record<string, string>).toString();
        return `?${queryParams}`;
    }
    return "";
};

export const getInstanceDataList = async (parameters: Record<string, unknown>) => {
    const result = await axios.get<InstanceData[]>(`${backendUrl}InstanceData${prepareQuery(parameters)}`);
    if (result.status >= 200 && result.status <= 300) {
        return result.data;
    }
    console.log("Error status", result.status);
    console.log("Error data", result.data);
    throw new Error("API returned unsuccesfull message");
};

export const getInstanceDataById = async (id: string) => {
    const result = await axios.get<InstanceData>(`${backendUrl}InstanceData/${id}`);
    if (result.status >= 200 && result.status <= 300) {
        return result.data;
    }
    console.log("Error status", result.status);
    console.log("Error data", result.data);
    throw new Error("API returned unsuccessful message");
};

export const createInstanceData = async (body: Record<string, unknown>) => {
    const result = await axios.post(`${backendUrl}InstanceData/`, body);
    if (result.status >= 200 && result.status <= 300) {
        return result.data;
    }
    console.log("Error status", result.status);
    console.log("Error data", result.data);
    throw new Error("API returned unsuccessful message");
};

export const updateInstanceData = async (id: string, body: Record<string, unknown>) => {
    const result = await axios.put(`${backendUrl}InstanceData/${id}`, body);
    if (result.status >= 200 && result.status <= 300) {
        return result.data;
    }
    console.log("Error status", result.status);
    console.log("Error data", result.data);
    throw new Error("API returned unsuccessful message");
};

export const deleteInstanceData = async (id: string) => {
    const result = await axios.delete(`${backendUrl}InstanceData/${id}`);
    return result.status;
    console.log("Error status", result.status);
    console.log("Error data", result.data);
    throw new Error("API returned unsuccessful message");
};
