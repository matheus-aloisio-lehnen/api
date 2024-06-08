import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { catchError, firstValueFrom, Observable } from "rxjs";
import { AxiosResponse } from "axios";

@Injectable()
export class HttpAdapter {


    constructor(
        protected http: HttpService,
    ) {
    }

    async sendAsync<T>(method: string, url: string, body: Object | null = null): Promise<T> {
        return await this.handleResponse(this.http.request<T>({ method, url, data: body }), true) as Promise<T>;
    }

    send <T>(method: string, url: string, body: Object | null = null): Observable<T> {
        return this.handleResponse(this.http.request<T>({ method, url, data: body }), false) as Observable<T>;
    };

    private handleResponse = <T>(response: Observable<AxiosResponse<T>>, returnPromise: boolean): Observable<T | any> | Promise<T | any> => {
        const request = response.pipe(
            catchError((error: any) => {
                throw new BadRequestException(error?.message)
            }));
        return returnPromise
            ? firstValueFrom(request)
            : request;
    };

}
