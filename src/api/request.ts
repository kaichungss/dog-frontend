import axios, { AxiosRequestConfig } from "axios";
import { Response } from "../type/response";


const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

instance.interceptors.request.use(function (config) {
  let accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers["Authorization"] = `${accessToken}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.status === 403) {
    window.location.href = '/login';
  }
  return Promise.reject(error);
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

