import axios from "axios";

const backendUrl = "https://atlas-api.d.medcol.io";

export const getStudyList = async () => {
    const result = await axios.get(`${backendUrl}/api/Study/`); // что со "/" в конце ?
    if (result.status >= 200 && result.status <= 300) {
        return result.data;
    }
    console.log("Error status: ", result.status);
    console.log("Error data: ", result.data);
    throw new Error("API returned unsuccessful message");
};

export const getStudyId = async (id) => {
    const result = await axios.get(`${backendUrl}/api/Study/${id}`); 
    if (result.status >= 200 && result.status <= 300) {
        return result.data;
    }
    console.log("Error status: ", result.status);
    console.log("Error data: ", result.data);
    throw new Error("API returned unsuccessful message");
};

export const createStudy = async (body) => {
    const result = await axios.post(`${backendUrl}/api/Study/`, body); // что со "/" в конце ?
    if (result.status >= 200 && result.status <= 300) {
        return result.data;
    }
    console.log("Error status: ", result.status);
    console.log("Error data: ", result.data);
    throw new Error("API returned unsuccessful message");
};

export const updateStudy = async (body, id) => {
    const result = await axios.put(`${backendUrl}/api/Study/${id}`, body); 
    if (result.status >= 200 && result.status <= 300) {
        return result.data;
    }
    console.log("Error status: ", result.status);
    console.log("Error data: ", result.data);
    throw new Error("API returned unsuccessful message");
};

export const deleteStudy = async (id) => {
    const result = await axios.delete(`${backendUrl}/api/Study/${id}`); 
    if (result.status >= 200 && result.status <= 300) {
        return result.data;
    }
    console.log("Error status: ", result.status);
    console.log("Error data: ", result.data);
    throw new Error("API returned unsuccessful message");
};
