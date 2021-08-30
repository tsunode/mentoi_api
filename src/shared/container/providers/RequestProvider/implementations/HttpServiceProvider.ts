import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ICallDTO } from '../dtos/ICallDTO';

export class HttpServiceProvider {
  public static readonly GET = 'get';

  public static readonly POST = 'post';

  public static readonly PUT = 'put';

  public static readonly DELETE = 'delete';

  protected client: AxiosInstance;

  private readonly basepath: string;

  constructor(basepath: string, token: string) {
    this.basepath = basepath;

    this.client = axios.create({
      baseURL: this.basepath,
      headers: {
        authorization: `Basic ${token}`,
      },
    });
  }

  public async call<T>({
    method,
    path,
    requestConfig,
  }: ICallDTO): Promise<AxiosResponse<T>> {
    return this.client.request({
      method,
      url: path,
      ...requestConfig,
    });
  }
}
