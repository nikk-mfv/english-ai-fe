import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { camelizeKeys } from 'humps';

const baseURL = 'http://localhost:8080/api/v1';
const defaultConfig: AxiosRequestConfig = {
  timeout: 60000,
  withCredentials: true,
  baseURL,
};

const addRequestInterceptors = () => {};

const addResponseInterceptors = (instance: AxiosInstance) => {
  // convert to camel case
  instance.interceptors.response.use((response) => {
    response.data = camelizeKeys(response.data);

    return response;
  });

  return instance;
};

const createAxiosClient = (config: AxiosRequestConfig = defaultConfig) => {
  const instance = axios.create(config);
  addRequestInterceptors();
  return addResponseInterceptors(instance);
};

export const axiosClient = createAxiosClient();
