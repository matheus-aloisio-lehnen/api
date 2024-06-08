import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from "class-validator";

import { CreateUserDto } from '../create/create-user.dto';
import { Type } from "class-transformer";
import { AccountEntity } from "../../../../infra/database/type-orm/entities/account.entity";

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsOptional()
    @ValidateNested()
    @Type(() => AccountEntity)
    account?: AccountEntity;

    @IsOptional()
    @IsBoolean()
    status?: boolean;

}
