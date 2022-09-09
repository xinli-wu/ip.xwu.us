import axios, { AxiosResponse } from "axios";

export const getIpInfo = async (ipDomain: string | undefined): Promise<AxiosResponse<any, any>> => {
  return await axios.get(`${process.env.REACT_APP_API_ADDR}/${ipDomain || ''}`);
};