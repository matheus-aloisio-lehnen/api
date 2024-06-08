import { Test, TestingModule } from '@nestjs/testing';
import { HttpAdapter } from './http.adapter';

describe('HttpAdapter', () => {
    let service: HttpAdapter;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ HttpAdapter ],
        }).compile();

        service = module.get<HttpAdapter>(HttpAdapter);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
