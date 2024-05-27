import { LoginPayload } from "../globalTypes";
import { axiosInstance } from "../variables";

export const loginIntent = async <T>( url: string, payload: LoginPayload): Promise<T>=> {
    const res = await axiosInstance.post(url, payload);
    const { tokens } = await res.data;
    return await tokens;
}
