import { Method, AxiosRequestConfig } from 'axios';

export interface ICallDTO {
  method: Method;
  path: string;
  requestConfig?: AxiosRequestConfig;
}
