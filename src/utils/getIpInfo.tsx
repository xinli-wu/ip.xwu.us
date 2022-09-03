import axios from "axios";

export const getIpInfo = async (ipDomain: string | undefined) => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_ADDR}/${ipDomain || ''}`);//.catch(err => console.error(err));
  return data;
};