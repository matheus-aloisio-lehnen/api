import { Test, TestingModule } from '@nestjs/testing';
import { CheckUserExists } from "./check-user-exists.use-case";

describe('CheckUserExists', () => {
    let service: CheckUserExists;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ CheckUserExists ],
        }).compile();

        service = module.get<CheckUserExists>(CheckUserExists);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
