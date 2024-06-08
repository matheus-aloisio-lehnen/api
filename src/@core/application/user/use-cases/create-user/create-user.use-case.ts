import { Injectable } from '@nestjs/common';

import { Geocode } from "../../../../domain/type/geocode.type";
import { AccountEntity } from "../../../../infra/database/type-orm/entities/account.entity";
import { Address } from "../../../../domain/model/address";
import { AddressEntity } from "../../../../infra/database/type-orm/entities/address.entity";
import * as bcrypt from "bcrypt";
import { geocodeMock } from "../../../../../../test/mocks/geocode.mock";
import { UserEntity } from "../../../../infra/database/type-orm/entities/user.entity";
import { HttpService } from "../../../../infra/services/http/http.service";
import { RecursivePartial } from "../../../../domain/type/recursive-partial.type";
import { UserEntityRepository } from "../../../../infra/database/type-orm/repository/user-entity.repository";
import { User } from "../../../../domain/model/user";
import { CheckUsedEmail } from "../check-used-email/check-used-email.use-case";

@Injectable()
export class CreateUser {


    constructor(
        private http: HttpService,
        private checkUsedEmail: CheckUsedEmail,
        private repository: UserEntityRepository,
    ) {
    }

    async setupInitialUser(entity: RecursivePartial<UserEntity>) {

        // Comentado para não ficar fazendo request para API do google
        // const geocode: Geocode = await this.http.getGeocode(entity.address as Address);
        const geocode: Geocode = geocodeMock;

        entity.password = await bcrypt.hash(entity.password, Number(process.env.SALT_OR_ROUNDS));
        entity.account = this.setupAccount();
        entity.address = this.setupAddress(entity.address, geocode);
        entity.status = this.setupStatus();
    }

    setupAccount(): RecursivePartial<AccountEntity> {
        const cents = 100;
        const amount = 10000 * cents;
        return { balance: amount };
    }

    setupAddress(address: RecursivePartial<Address>, geocode: Geocode): RecursivePartial<AddressEntity> {
        return {
            ...address,
            lat: geocode.results[0].geometry.location.lat,
            lng: geocode.results[0].geometry.location.lng,
            placeId: geocode.results[0].place_id,
        }
    }

    setupStatus(): boolean {
        return true;
    }

    async createUser(entity: RecursivePartial<UserEntity>): Promise<RecursivePartial<User>> {
        await this.checkUsedEmail.exists('create', entity.email);
        await this.setupInitialUser(entity);
        return await this.repository.createUser(entity);
    }

    async createBulk(entities: RecursivePartial<UserEntity>[]): Promise<RecursivePartial<User>[]> {
        for (const entity of entities) {
            await this.checkUsedEmail.exists('create', entity.email);
            await this.setupInitialUser(entity);
        }
        return this.repository.createBulk(entities);
    }


}
