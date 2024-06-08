import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUser } from './update-user.use-case';

describe('UpdateUserUseCase', () => {
    let service: UpdateUser;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ UpdateUser ],
        }).compile();

        service = module.get<UpdateUser>(UpdateUser);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
