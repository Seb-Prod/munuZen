import { ApiDataWrapper, ApiResponse } from "@/types/api-response";
import { LoginResult, RegisterResult } from "@/types/user";
import { apiPost } from "./apiClients";



export async function login(
  email: string,
  password: string
): Promise<ApiResponse<ApiDataWrapper<LoginResult>>> {
  const data = { email, password };
  return apiPost<ApiDataWrapper<LoginResult>>('login', data);
}

export async function register(
  username: string,
  email: string,
  password: string
): Promise<ApiResponse<ApiDataWrapper<RegisterResult>>> {
  const data = { username, email, password };
  return apiPost<ApiDataWrapper<RegisterResult>>('register', data);
}

export async function resendActivationEmail(
  email:string,
): Promise<ApiResponse<ApiDataWrapper<RegisterResult>>> {
  const data = { email };
  return apiPost<ApiDataWrapper<RegisterResult>>('resend-email', data);
}


