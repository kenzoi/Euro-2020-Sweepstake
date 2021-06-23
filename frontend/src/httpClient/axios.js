import axios from "axios";

const baseUrl = "http://localhost:3005";

export const getMatches = () => axios.get(`${baseUrl}/match`);

export const getPredictions = (pool, user) =>
  axios.get(`${baseUrl}/prediction/${pool}/user/${user}`);

export const postPredictions = (pool, user, predictions) =>
  axios.post(`${baseUrl}/prediction/${pool}/user/${user}`, {
    data: {
      predictions,
    },
  });

export const putPredictions = (pool, user, predictions) =>
  axios.put(`${baseUrl}/prediction/${pool}/user/${user}`, {
    data: {
      predictions,
    },
  });

export const getPools = (userId) => axios.get(`${baseUrl}/pool/user/${userId}`);

export const postCreatePool = (userId) =>
  axios.post(`${baseUrl}/pool/user/${userId}`);

export const postJoinPool = (poolId, userId) =>
  axios.post(`${baseUrl}/pool/${poolId}/user/${userId}`);

export const getLeaderboard = (nanoId) =>
  axios.get(`${baseUrl}/leaderboard/${nanoId}`);

export const login = (user) => axios.post(`${baseUrl}/login/${user}`);
