import axios from "axios";

export const getIpInfo = () => {
  // const response = await fetch('https://api.ipify.org?format=json');
  // const ip = await response.json();
  // const ipInfo = await fetch(`https://ipapi.co/${ip.ip}/json/`);
  // return await ipInfo.json();

  return axios.get("https://ip.xwu.us/")
    .then(response => response.data)
    .catch(error => console.error(error.message));
};