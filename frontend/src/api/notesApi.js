import axios from "axios";

const API_URL = "http://localhost:5000/api/notes";

export const getNotes = async (params = {}) => {
    const { data } = await axios.get(API_URL, { params });
    return data;
};

export const createNote = async (note) => {
    const { data } = await axios.post(API_URL, note);
    return data;
};

export const updateNote = async (id, updates) => {
    const { data } = await axios.put(`${API_URL}/${id}`, updates);
    return data;
};

export const deleteNote = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
