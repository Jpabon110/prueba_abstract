/* eslint-disable camelcase */
import superagent from 'superagent';

const API_ROOT = process.env.REACT_APP_URL_BACKEND;


export const requests = {
  del: url => superagent.del(`${API_ROOT}${url}`),
  get: url => superagent.get(`${API_ROOT}${url}`),
  put: (url, body) => superagent.put(`${API_ROOT}${url}`, body),
  post: (url, body) => superagent.post(`${API_ROOT}${url}`, body),
};

export const setToken = (_token) => {
  token = _token;
};
