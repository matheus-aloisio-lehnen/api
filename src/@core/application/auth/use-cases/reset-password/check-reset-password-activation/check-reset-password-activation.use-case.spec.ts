import { Test, TestingModule } from '@nestjs/testing';
import { CheckResetPasswordActivation } from "./check-reset-password-activation.use-case";

describe('CheckResetPasswordActivation', () => {
    let service: CheckResetPasswordActivation;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ CheckResetPasswordActivation ],
        }).compile();

        service = module.get<CheckResetPasswordActivation>(CheckResetPasswordActivation);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
