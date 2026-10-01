import api from "../config/axios";
import {isAxiosError} from "axios";
import type {User} from "../types";

export async function getUser() {
    try {
        const {data} = await api.get<User>('/user');
        return data;
    }
    catch (error) {
        if (isAxiosError(error) && error.response && error.response.data) {
            throw new Error(error.response.data.error);
        }
    }
}