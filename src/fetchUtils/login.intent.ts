import { LoginPayload } from "../globalTypes";

export const loginIntent = async <T>( url: string, payload: LoginPayload): Promise<T>=> {
    const res = await fetch(url, {
        method: 'Post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(payload)
    });

    const { tokens: {tokens} } = await res.json();
    return await tokens;
}


