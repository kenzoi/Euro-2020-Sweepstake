import axios from "axios";

const base_url = process.env.REACT_APP_BACKEND_API_HOST;

export const getMatch = () => {
  return axios.get(`${base_url}/match`);
};

export const getPredictions = (pool, user) => {
  return axios.get(`${base_url}/prediction/${pool}/user/${user}`);
};

export const postPredictions = (pool, user, predictions) => {
  return axios.post(`${base_url}/prediction/${pool}/user/${user}`, {
    data: {
      predictions,
    },
  });
};

export const putPredictions = (pool, user, predictions) => {
  return axios.put(`${base_url}/prediction/${pool}/user/${user}`, {
    data: {
      predictions,
    },
  });
};
