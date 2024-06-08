import { Test, TestingModule } from '@nestjs/testing';
import { CreateResetPassword } from "./create-reset-password.use-case";

describe('CreateResetPassword', () => {
    let service: CreateResetPassword;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ CreateResetPassword ],
        }).compile();

        service = module.get<CreateResetPassword>(CreateResetPassword);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
