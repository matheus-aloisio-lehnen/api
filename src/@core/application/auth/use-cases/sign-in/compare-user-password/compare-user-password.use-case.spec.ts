import { Test, TestingModule } from '@nestjs/testing';
import { CompareUserPassword } from "./compare-user-password.use-case";

describe('CompareUserPassword', () => {
    let service: CompareUserPassword;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ CompareUserPassword ],
        }).compile();

        service = module.get<CompareUserPassword>(CompareUserPassword);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
