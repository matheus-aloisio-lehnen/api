import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        const status = 'On air:'
        const hi = 'Hello'
        const context = 'API!';
        const message = `${status} ${hi} ${context}`
        console.log(message)
        return message;
    }
}
