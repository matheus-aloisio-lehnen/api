import { Test, TestingModule } from '@nestjs/testing';
import { SelectResetPassword } from "./select-reset-password.use-case";

describe('SelectResetPassword', () => {
    let service: SelectResetPassword;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ SelectResetPassword ],
        }).compile();

        service = module.get<SelectResetPassword>(SelectResetPassword);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
