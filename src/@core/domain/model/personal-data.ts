import { LegalStatus } from '../enum/legal-status.enum';

export class PersonalData {
    id: number;
    name: string;
    documentNumber: string;
    legalStatus: LegalStatus;
    mobile: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
