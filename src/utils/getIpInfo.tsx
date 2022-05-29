import axios from "axios";

export const getIpInfo = async (ipDomain: string) => {
  const res = await axios.get(`https://api.ip.xwu.us/${ipDomain || ''}`).catch(err => console.error(err));
  console.log(res);
  return res?.data;
};