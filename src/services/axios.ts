import axios, { AxiosRequestConfig } from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';

export function toArray<T>(t?: T | T[]): T[] {
  return Array.isArray(t) ? t : t ? [t] : [];
}

const baseURL = 'http://localhost:8080/api/v1';
const defaultConfig: AxiosRequestConfig = {
  timeout: 60000,
  withCredentials: true,
  baseURL,
};

const decamelizeRequestKeys = (data: unknown) => {
  return data instanceof FormData ? data : decamelizeKeys(data);
};

const camelizeResponseKeys = (data: unknown) => {
  return data instanceof Blob ? data : camelizeKeys(data);
};

const createAxiosClient = (config: AxiosRequestConfig = defaultConfig) => {
  const instance = axios.create({
    ...config,
    transformResponse: [
      ...toArray(axios.defaults.transformResponse),
      camelizeResponseKeys,
    ],
    transformRequest: [
      decamelizeRequestKeys,
      ...toArray(axios.defaults.transformRequest),
    ],
  });
  return instance;
};

export const axiosClient = createAxiosClient();
