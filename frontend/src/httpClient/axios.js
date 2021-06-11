import axios from "axios";

const base_url = process.env.REACT_APP_BACKEND_API_HOST;

const getMatch = () => {
  return axios.get(`${base_url}/match`);
};

export default getMatch;
