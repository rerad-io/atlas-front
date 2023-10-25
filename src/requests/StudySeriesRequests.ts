import axios from "axios";

const backendUrl = "https://atlas-api.d.medcol.io";

export const getStudySeriesList = async () => {
    const result = await axios.get(`${backendUrl}/api/Series/`); // что со "/" в конце ?
    if (result.status >= 200 && result.status <= 300) {
        return result.data;
    }
    console.log("Error status: ", result.status);
    console.log("Error data: ", result.data);
    throw new Error("API returned unsuccessful message");
};

export const getStudySeriesId = async (id) => {
    const result = await axios.get(`${backendUrl}/api/Series/${id}`);
    if (result.status >= 200 && result.status <= 300) {
        return result.data;
    }
    console.log("Error status: ", result.status);
    console.log("Error data: ", result.data);
    throw new Error("API returned unsuccessful message");
};

export const createStudySeries = async (body) => {
    const result = await axios.post(`${backendUrl}/api/Series/`, body); // что со "/" в конце ?
    if (result.status >= 200 && result.status <= 300) {
        return result.data;
    }
    console.log("Error status: ", result.status);
    console.log("Error data: ", result.data);
    throw new Error("API returned unsuccessful message");
};

export const updateStudySeries = async (body, id) => {
    const result = await axios.put(`${backendUrl}/api/Series/${id}`, body);
    if (result.status >= 200 && result.status <= 300) {
        return result.data;
    }
    console.log("Error status: ", result.status);
    console.log("Error data: ", result.data);
    throw new Error("API returned unsuccessful message");
};

export const deleteStudySeries = async (id) => {
    const result = await axios.delete(`${backendUrl}/api/Series/${id}`);
    if (result.status >= 200 && result.status <= 300) {
        return result.data;
    }
    console.log("Error status: ", result.status);
    console.log("Error data: ", result.data);
    throw new Error("API returned unsuccessful message");
};
