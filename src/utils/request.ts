import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { CHAT_URL } from "config/api";
import id from "./id";

export type ApiResponse<T> = {
  errCode: number
  errDlt: string
  errMsg: string
  data: T
}

function createRequest(config: AxiosRequestConfig) {
  const instance = axios.create(config);

  instance.interceptors.request.use(config => {
    config.headers['operationID'] = id();
    return config;
  }, error => {
    console.error(error)
    return Promise.reject(error);
  });
  
  instance.interceptors.response.use(response => {
    const { data } = response;
    if (data.errCode && data.errCode !== 0) {
      return Promise.reject(data);
    }
    return response;
  }, error => {
    console.error(error)
    return Promise.reject(error);
  });

  return instance;
}

class Request {
  private instance: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.instance = createRequest(config);
  }

  async request<T = undefined>(config: AxiosRequestConfig): Promise<T> {
    try {
      const { data: axiosData } = await this.instance.request(config);
      return (axiosData as ApiResponse<T>).data;
    } catch (error) {
      throw error;
    }
  }

  get<T>(url: string, params: any): Promise<T> {
    return this.request<T>({ url, method: 'GET', params });
  }

  post<T>(url: string, data: any): Promise<T> {
    return this.request<T>({ url, method: 'POST', data });
  }

  put<T>(url: string, data: any): Promise<T> {
    return this.request<T>({ url, method: 'PUT', data });
  }

  delete<T>(url: string, params: any): Promise<T> {
    return this.request<T>({ url, method: 'DELETE', params });
  }
}

const request = new Request({
  baseURL: CHAT_URL,
  timeout: 10000,
});

export default request;