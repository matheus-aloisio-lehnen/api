import { Test, TestingModule } from '@nestjs/testing';
import { ChangePassword } from "./change-password.use-case";

describe('ChangePassword', () => {
    let service: ChangePassword;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ ChangePassword ],
        }).compile();

        service = module.get<ChangePassword>(ChangePassword);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
