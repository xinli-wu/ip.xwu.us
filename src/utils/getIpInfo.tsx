import axios from "axios";

export const getIpInfo = async (ipDomain: string) => {
  const res = await axios.get(`${process.env.REACT_APP_API_ADDR}/${ipDomain || ''}`).catch(err => console.error(err));
  return res?.data;
};