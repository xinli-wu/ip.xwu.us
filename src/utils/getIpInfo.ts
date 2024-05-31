import axios, { AxiosResponse } from 'axios';

export const getIpInfo = (ipDomain: string | undefined): Promise<AxiosResponse<any, any>> => {
  return axios(`${process.env.REACT_APP_API_ADDR}/${ipDomain || ''}`);
};
