import { LoginPayload, ResetPasswordPayload } from "../data/types/types.global";
import { axiosInstance } from "../data/variables/variables.dynamic";

export const authenticateUser = async <T>( url: string, payload: LoginPayload): Promise<T>=> {
    const res = await axiosInstance.post(url, payload);
    const { tokens } = await res.data;
    return await tokens;
}

export const resetPassword = async(url: string, payload: ResetPasswordPayload): Promise<[string, string]> => {
    const res = await axiosInstance.put(url, payload);
    const { accessToken, message } = await res.data;
    return [accessToken, message];
}
