import { ApiDataWrapper, ApiResponse } from "@/types/api-response";
import { LoginResult, RefreshTokenResult, RegisterResult } from "@/types/user";
import { apiPost } from "./apiClients";



export async function login(
  login: string,
  password: string
): Promise<ApiResponse<ApiDataWrapper<LoginResult>>> {
  const data = { login, password };
  return apiPost<ApiDataWrapper<LoginResult>>('login', data);
}

export async function refreshToken(
  refreshToken:string,
): Promise<ApiResponse<ApiDataWrapper<RefreshTokenResult>>>{
  const data ={refreshToken};
  return apiPost<ApiDataWrapper<RefreshTokenResult>>('refresh-token', data);
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


