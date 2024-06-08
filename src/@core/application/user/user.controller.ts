import { Controller, Get, Post, Body, Param, Delete, Query, Put, ParseArrayPipe } from '@nestjs/common';

import { fromDto, fromDtoList, toEntity, toEntityList } from "../../infra/utils/mapper/mapper.utils";
import { User } from "../../domain/model/user";
import { UpdateUserDto } from "../../domain/dto/user/update/update-user.dto";
import { CreateUserDto } from "../../domain/dto/user/create/create-user.dto";
import { PaginationFilter } from "../../domain/dto/filter/paginationFilter";
import { UserService } from "./user.service";
import { RecursivePartial } from "../../domain/type/recursive-partial.type";
import { Result } from "../../domain/type/result.type";

@Controller('user')
export class UserController {


    constructor(
        private userService: UserService,
    ) {
    }

    @Get()
    async getAll(): Promise<Result<RecursivePartial<User> | RecursivePartial<User>[]>> {
        return {
            data: await this.userService.getAll(),
            message: null
        };
    }

    @Get('params')
    async getAllPaginated(@Query() filter: PaginationFilter): Promise<Result<[ RecursivePartial<User>[], number ]>> {
        return {
            data: await this.userService.getAllPaginated(filter),
            message: null
        };
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<Result<RecursivePartial<User>>> {
        return {
            data: await this.userService.getById(+id),
            message: null
        };
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<Result<RecursivePartial<User>>> {
        const user = fromDto<CreateUserDto, User>(createUserDto);
        return {
            data: await this.userService.create(toEntity(user)),
            message: "Usuário criado com sucesso. Bora fazer login e conhecer nossa plataforma!"
        };
    }

    @Post('bulk')
    async createBulk(@Body(new ParseArrayPipe({ items: CreateUserDto })) createUserDtoList: CreateUserDto[]): Promise<Result<RecursivePartial<User>[]>> {
        const users = fromDtoList(createUserDtoList);
        return {
            data: await this.userService.createBulk(toEntityList(users)),
            message: "Usuários criados com sucesso."
        };
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<Result<RecursivePartial<User>>> {
        const user = fromDto(updateUserDto);
        return {
            data: await this.userService.update(+id, toEntity(user)),
            message: "Usuário editado com sucesso."
        };
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<Result<RecursivePartial<User>>> {
        return {
            data: await this.userService.remove(+id),
            message: "Usuário excluído com sucesso."
        };
    }

    @Delete('bulk/:ids')
    async removeBulk(@Param('ids') ids: string): Promise<Result<RecursivePartial<User>[]>> {
        return {
            data: await this.userService.removeBulk(ids),
            message: "Usuários excluídos com sucesso."
        };
    }

}
