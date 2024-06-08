import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
    MaxLength,
    ValidateNested
} from "class-validator";
import { Type } from "class-transformer";

import { CreatePersonalDataDto } from "./create-personal-data.dto";
import { CreateAddressDto } from "./create-address.dto";
import { Role } from "../../../enum/role.enum";

export class CreateUserDto {

    @IsNotEmpty({ message: "O email não pode estar vazio!" })
    @IsString({ message: "Campo com formato incorreto!" })
    @IsEmail({}, { message: "Formato incorreto do email!" })
    @MaxLength(255, { message: "Tamanho máximo de caracteres atingido!" })
    email: string;

    @IsNotEmpty({ message: "O email não pode estar vazio!" })
    @IsString({ message: "Campo com formato incorreto!" })
    @MaxLength(255, { message: "Tamanho máximo de caracteres atingido!" })
    password: string;

    @IsNotEmpty({ message: "O tipo de usuário não pode estar vazio!" })
    @IsEnum(Role, { message: "Tipo de usuário inexistente!" })
    role: Role;

    @IsNotEmpty({ message: "Os dados pessoais não podem estar vazios!" })
    @ValidateNested()
    @Type(() => CreatePersonalDataDto)
    personalData: CreatePersonalDataDto;

    @IsNotEmpty({ message: "Os campos do endereço não podem estar vazios!" })
    @ValidateNested()
    @Type(() => CreateAddressDto)
    address: CreateAddressDto;

}
