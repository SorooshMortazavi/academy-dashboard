import axios, { AxiosInstance, AxiosResponse } from "axios";

class Http {
  private axiosInstance: AxiosInstance;
  private baseUrl: string;
  constructor() {
    this.axiosInstance = axios.create();
    this.baseUrl = process.env.REACT_APP_BASE_URL as string;
    this.get = this.get.bind(this)
    this.put = this.put.bind(this)
    this.patch = this.patch.bind(this)
    this.post = this.post.bind(this)
    this.delete = this.delete.bind(this)
  }

  public get<T, R = AxiosResponse<T>>(url: string, config?: object): Promise<R> {
    return this.axiosInstance.get(`${this.baseUrl}/${url}`, config);
  }

  public post<T, R = AxiosResponse<T>>(
    url: string,
    data: any,
    config?: object
  ): Promise<R> {
    return this.axiosInstance.post(`${this.baseUrl}/${url}`, data, config);
  }

  public put<T, R = AxiosResponse<T>>(
    url: string,
    data: any,
    config?: object
  ): Promise<R> {
    return this.axiosInstance.put(`${this.baseUrl}/${url}`, data, config);
  }

  public patch<T, R = AxiosResponse<T>>(
    url: string,
    data: any,
    config?: object
  ): Promise<R> {
    return this.axiosInstance.patch(`${this.baseUrl}/${url}`, data, config);
  }

  public delete<T, R = AxiosResponse<T>>(
    url: string,
    config?: object
  ): Promise<R> {
    return this.axiosInstance.delete(`${this.baseUrl}/${url}`, config);

  }
}

export default Http;
