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
  console.log(error.config.url.indexOf("/click"))
  if (error.config.url.indexOf("/click") === -1 && error.response?.status === 403) {
    localStorage.clear();
    alert("a login is required to operate!")
  }
  return {data: {code: error.response?.status || 201, msg: error.message, data: null}};
});
const request = async <T>(config: AxiosRequestConfig) => {
  const {data} = await instance.request<Response<T>>(config);
  if (data.code !== 200 && data.code !== 403) {
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

