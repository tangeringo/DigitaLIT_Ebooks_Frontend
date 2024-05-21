import { LoginPayload } from "../globalTypes";
import { axiosInstance } from "../variables";

export const loginIntent = async <T>( url: string, payload: LoginPayload): Promise<T>=> {
    const res = await fetch(url, {
        method: 'Post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(payload)
    });

    const { tokens: {tokens} } = await res.json();
    return await tokens;
}

export const loginIntentAxios = async <T>( url: string, payload: LoginPayload): Promise<T>=> {
    const res = await axiosInstance.post(url, payload);
    const { tokens } = await res.data;
    return await tokens;
}
