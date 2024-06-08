import { Test, TestingModule } from '@nestjs/testing';
import { SelectUser } from './select-user.use-case';

describe('UpdateUserUseCase', () => {
    let service: SelectUser;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ SelectUser ],
        }).compile();

        service = module.get<SelectUser>(SelectUser);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
