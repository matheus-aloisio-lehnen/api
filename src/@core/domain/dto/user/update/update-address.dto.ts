import { IsNotEmpty, IsNumber } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { CreateAddressDto } from "../create/create-address.dto";

export class UpdateAddressDto extends PartialType(CreateAddressDto) {

    @IsNotEmpty()
    @IsNumber()
    id: number;

}
