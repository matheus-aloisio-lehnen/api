import { IsEnum, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { LegalStatus } from "../../../enum/legal-status.enum";

export class CreatePersonalDataDto {


    @IsNotEmpty({ message: "O email não pode estar vazio!" })
    @IsString({ message: "Campo com formato incorreto!" })
    @MaxLength(255, { message: "Tamanho máximo de caracteres atingido!" })
    name: string;

    @IsNotEmpty({ message: "O número de documento não pode estar vazio!" })
    @IsString({ message: "Campo com formato incorreto!" })
    @MaxLength(255, { message: "Tamanho máximo de caracteres atingido!" })
    documentNumber: string;

    @IsString({ message: "Campo com formato incorreto!" })
    @MaxLength(255, { message: "Tamanho máximo de caracteres atingido!" })
    mobile: string;

    @IsNotEmpty({ message: "O tipo de pessoa não pode estar vazio!" })
    @IsEnum(LegalStatus, { message: "Tipo de pessoa inválido" })
    legalStatus: LegalStatus;

}
