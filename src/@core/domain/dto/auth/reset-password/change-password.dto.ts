import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ChangePasswordDto {

    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    password: string;

}
