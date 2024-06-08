import { Test, TestingModule } from '@nestjs/testing';
import { CheckUsedEmail } from "./check-used-email.use-case";

describe('CheckUsedEmail', () => {
    let service: CheckUsedEmail;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ CheckUsedEmail ],
        }).compile();

        service = module.get<CheckUsedEmail>(CheckUsedEmail);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
