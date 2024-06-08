import { Injectable } from '@nestjs/common';

import { HttpAdapter } from "./adapter/http.adapter";


@Injectable()
export class HttpService extends HttpAdapter {


    async anyEndpoint(object: any): Promise<any> {
        const url = `https://baseUrl/something`;
        const { data } = await this.sendAsync<any>('get', url);
        return data;
    }

}
