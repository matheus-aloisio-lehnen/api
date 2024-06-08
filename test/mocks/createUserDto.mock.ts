import { LegalStatus } from "../../src/@core/domain/enum/legal-status.enum";

export const addressMock = {
    zipCode: '88015600',
    street: 'Rua Almirante Lamego',
    number: '748',
    supplemental: 'ap 804 B',
    district: 'Centro',
    city: 'Florianópolis',
    state: 'SC',
    country: 'BR',
}

export const personalDataMock = {
        name: 'Matheus Lehnen',
        personalId: '05850467947',
        mobile: '48998018902',
        legalStatus: LegalStatus.legalEntity,
        address: addressMock
}

export const CreateUserDtoMock = {
    email: 'matheuslehnen@hotmail.com',
    password: '123456',
    personalData: personalDataMock,
}
