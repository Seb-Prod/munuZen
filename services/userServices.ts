import { ApiDataWrapper, ApiResponse } from "@/types/api-response";
import { AuthResult } from "@/types/user";
import { apiPost } from "./apiClients";



export async function loginUser(
  email: string,
  password: string
): Promise<ApiResponse<ApiDataWrapper<AuthResult>>> {
  const data = { email, password };
  return apiPost<ApiDataWrapper<AuthResult>>('login', data);
}