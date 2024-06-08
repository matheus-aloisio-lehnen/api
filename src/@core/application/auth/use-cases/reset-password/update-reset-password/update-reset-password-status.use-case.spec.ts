import { Test, TestingModule } from '@nestjs/testing';
import { UpdateResetPassword } from "./update-reset-password.use-case";

describe('UpdateResetPassword', () => {
    let service: UpdateResetPassword;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ UpdateResetPassword ],
        }).compile();

        service = module.get<UpdateResetPassword>(UpdateResetPassword);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
