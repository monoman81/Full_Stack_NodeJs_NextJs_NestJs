import api from "../config/axios";
import {isAxiosError} from "axios";
import type {User} from "../types";

export async function getUser() {
    const token = localStorage.getItem('AUTH_TOKEN');
    try {
        const {data} = await api.get<User>('/user', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return data;
    }
    catch (error) {
        if (isAxiosError(error) && error.response && error.response.data) {
            throw new Error(error.response.data.error);
        }
    }
}