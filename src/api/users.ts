import api from "@/config/axios";
import { GenderEnum } from "@/lib/typedef";
import { apiRequest } from "@/lib/utils";
export interface UserRegisterInputData extends LoginInputData {
  fullName: string;
  gender: GenderEnum;
}

export interface LoginInputData {
  email: string;
  password: string;
}

export const registerUserApi = (registerData: UserRegisterInputData) =>
  apiRequest(api.post("/users/register", registerData));

export const loginUserApi = (loginData: LoginInputData) =>
  apiRequest(api.post("/users/login", loginData));

export const getUserData = (userId: string) =>
  apiRequest(api.get(`/users/${userId}`));
