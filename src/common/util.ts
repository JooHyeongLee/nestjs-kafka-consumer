import * as https from 'https';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import { catchError } from 'rxjs/operators';

export class Util {
  async httpRequest<Type>(
    url: string,
    method: string,
    body?: Type,
    timeout = 5000,
    headers?: any,
  ): Promise<{
    data: any;
    status: number;
    url: string;
  }> {
    const httpService = new HttpService();
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    try {
      if (method === 'GET') {
        const { data, status, config } = await firstValueFrom(
          httpService
            .get<AxiosResponse>(url, {
              httpAgent: httpsAgent,
              timeout: timeout,
              headers: headers,
            })
            .pipe(
              catchError((error: AxiosError) => {
                throw error;
              }),
            ),
        );
        return { data: data, status: status, url: config.url };
      } else if (method === 'POST') {
        const { data, status, config } = await firstValueFrom(
          httpService
            .post<AxiosResponse>(url, body, {
              httpAgent: httpsAgent,
              timeout: timeout,
              headers: headers,
            })
            .pipe(
              catchError((error: AxiosError) => {
                throw error;
              }),
            ),
        );
        return { data: data, status: status, url: config.url };
      } else if (method === 'PUT') {
        const { data, status, config } = await firstValueFrom(
          httpService
            .put<AxiosResponse>(url, body, {
              httpAgent: httpsAgent,
              timeout: timeout,
              headers: headers,
            })
            .pipe(
              catchError((error: AxiosError) => {
                throw error;
              }),
            ),
        );
        return { data: data, status: status, url: config.url };
      } else if (method === 'DELETE') {
        const { data, status, config } = await firstValueFrom(
          httpService
            .delete<AxiosResponse>(url, {
              httpAgent: httpsAgent,
              timeout: timeout,
              headers: headers,
            })
            .pipe(
              catchError((error: AxiosError) => {
                throw error;
              }),
            ),
        );
        return { data: data, status: status, url: config.url };
      }
    } catch (error) {
      if (error.response?.data) {
        throw {
          data: error.response.data,
          status: error.response.status,
          url: error.config.url,
        };
      } else {
        throw {
          message: error.message,
          code: error.code,
          url: error.config.url,
        };
      }
    }
  }

  sleep(timeout: number) {
    return new Promise<void>((resolve) => setTimeout(resolve, timeout));
  }
}
