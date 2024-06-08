import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateAddressDto {

    @IsNotEmpty({ message: "O Cep não pode estar vazio!" } )
    @IsString({ message: "Campo com formato incorreto!" })
    @MaxLength(9)
    zipCode: string;

    @IsNotEmpty({ message: "A rua não pode estar vazia!" } )
    @IsString({ message: "Campo com formato incorreto!" })
    @MaxLength(255)
    street: string;

    @IsNotEmpty({ message: "O número da residência não pode estar vazio!" } )
    @IsString({ message: "Campo com formato incorreto!" })
    @MaxLength(255)
    number: string;

}
