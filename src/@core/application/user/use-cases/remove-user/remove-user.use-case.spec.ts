import { Test, TestingModule } from '@nestjs/testing';
import { RemoveUser } from './remove-user.use-case';

describe('UpdateUserUseCase', () => {
    let service: RemoveUser;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ RemoveUser ],
        }).compile();

        service = module.get<RemoveUser>(RemoveUser);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
