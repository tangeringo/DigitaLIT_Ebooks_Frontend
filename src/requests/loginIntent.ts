import { LoginPayload } from "../data/types/types.global";
import { axiosInstance } from "../data/variables/variables.dynamic";

export const loginIntent = async <T>( url: string, payload: LoginPayload): Promise<T>=> {
    const res = await axiosInstance.post(url, payload);
    const { tokens } = await res.data;
    return await tokens;
}
