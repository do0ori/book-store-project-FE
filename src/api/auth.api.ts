import { SignupProps } from "../pages/Signup";
import { httpClient } from "./http";

export const signup = async (userData: SignupProps) => {
    const response = await httpClient.post("/users/signup", userData);
    return response.data;
};

export const resetRequest = async (data: SignupProps) => {
    const response = await httpClient.post("/users/reset-password", data);
    return response.data;
};

export const resetPassword = async (data: SignupProps) => {
    const response = await httpClient.put("/users/reset-password", data);
    return response.data;
};

interface LoginResponse {
    accessToken: string;
}

export const login = async (userData: SignupProps) => {
    const response = await httpClient.post<LoginResponse>("/users/login", userData);
    return response.data;
};