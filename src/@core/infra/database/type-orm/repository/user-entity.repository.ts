import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";

import { UserRepository } from "../../../../domain/repository/user.repository";
import { User } from "../../../../domain/model/user";
import { UserEntity } from "../entities/user.entity";
import { PaginationFilter } from "../../../../domain/dto/filter/paginationFilter";
import { toDomain, toDomainList } from "../../../utils/mapper/mapper.utils";
import { RecursivePartial } from "../../../../domain/type/recursive-partial.type";
import { paginate } from "../../../utils/pagination/pagination";


@Injectable()
export class UserEntityRepository extends Repository<UserEntity> implements UserRepository {

    findOneOptions: FindOneOptions;

    constructor(
        @InjectRepository(UserEntity) repository: Repository<UserEntity>
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
        this.findOneOptions = {
            select: {
                id: true,
                email: true,
                role: true,
                personalData: { id: true, name: true },
                address: { id: true, lat: true, lng: true, placeId: true },
                account: { id: true, balance: true }
            },
            where: null,
            loadEagerRelations: false,
            relations: [ 'account', 'address', 'personalData' ]
        }
    }

    async getAllUsers(): Promise<RecursivePartial<User>[]> {
        const teste = await this.find();
        return toDomainList(teste);
    }

    async getAllPaginated(filter: PaginationFilter): Promise<[ RecursivePartial<User>[], number ]> {
        const [ entities, total ] = await this.findAndCount(paginate(filter));
        return [ toDomainList(entities), total ];
    }

    async getUserById(id: number): Promise<RecursivePartial<User>> {
        this.findOneOptions.where = { id: id };
        return toDomain(await this.findOne(this.findOneOptions));
    }

    async getUserByEmail(email: string): Promise<RecursivePartial<User>> {
        return toDomain(await this.findOneBy({ email: email }));
    }

    async createUser(entity: RecursivePartial<UserEntity>): Promise<RecursivePartial<User>> {
        const userEntity = await this.save(entity);
        return toDomain(await this.getUserById(userEntity.id));
    }

    async createBulk(entities: RecursivePartial<UserEntity>[]): Promise<RecursivePartial<User>[]> {
        return toDomainList(await this.save(entities));
    }

    async updateUser(id: number, entity: RecursivePartial<UserEntity>): Promise<RecursivePartial<User>> {
        await this.update(id, entity);
        return await this.getUserById(id);
    }

    async removeUser(id: number): Promise<RecursivePartial<User>> {
        this.findOneOptions.where = { id: id }
        const entity: UserEntity = await this.findOne(this.findOneOptions);
        await this.softRemove(entity);
        return toDomain(entity);
    }

    async removeBulk(ids: string): Promise<RecursivePartial<User>[]> {
        const idList = ids.split(',').map(id => Number(id));
        const promises = idList.map(id => this.findOneBy({ id: id }));
        const entitiesDto = await Promise.all(promises);
        return toDomainList(await this.softRemove(entitiesDto));
    }

}