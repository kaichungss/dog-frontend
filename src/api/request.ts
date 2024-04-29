import axios, { AxiosRequestConfig } from "axios";
import { Response } from "../type/response";

// axios config
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Token"] = token;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response?.status === 403) {
    window.location.href = '/login';
  }
  return {data: {code: 404, msg: error.message, data: null}};
});
const request = async <T>(config: AxiosRequestConfig) => {
  const {data} = await instance.request<Response<T>>(config);
  if (data.code !== 200) {
    alert(data.msg)
    return null;
  }
  return data.data;
};

export const httpGet = async <T>(url: string, params: object) => {
  return request<T>({
    method: 'get',
    url,
    params,
  });
};

export const httpPost = async <T>(url: string, data: object) => {
  return request<T>({
    method: 'post',
    url,
    data,
  });
};

export const httpUpload = async <T>(url: string, data: object) => {
  return request<T>({
    method: 'post',
    url,
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
};

