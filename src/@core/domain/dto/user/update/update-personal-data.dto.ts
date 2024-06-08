import { IsNotEmpty, IsNumber } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { CreatePersonalDataDto } from "../create/create-personal-data.dto";

export class UpdatePersonalDataDto extends PartialType(CreatePersonalDataDto) {

    @IsNotEmpty()
    @IsNumber()
    id: number;

}
