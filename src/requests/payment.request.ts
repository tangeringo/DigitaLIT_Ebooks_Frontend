import { PaylemtPayload } from "../data/types/types.global";
import { axiosInstance } from "../data/variables/variables.dynamic";

  
export const processPayment = async( url: string, payload: PaylemtPayload): Promise<[string, string]> => {
    const res = await axiosInstance.post(url, payload);
    const { accessToken, clientSecret } = await res.data;
    return [accessToken, clientSecret];
}