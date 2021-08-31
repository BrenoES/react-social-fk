import axios, { AxiosRequestConfig } from 'axios';

class ApiService {
  private static _api = axios.create({
    baseURL: process.env.REACT_APP_BASE_API,
  });

  static get<T>(url: string, config?: AxiosRequestConfig) {
    return this._api.get<T>(url, config).then((response) => response.data);
  }

  static post<T>(url: string, data: T, config?: AxiosRequestConfig) {
    return this._api.post(url, data, config).then((response) => response.data);
  }
}

export default ApiService;
