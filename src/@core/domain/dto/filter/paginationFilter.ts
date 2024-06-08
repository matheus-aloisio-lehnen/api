import { Transform } from "class-transformer";
import { IsBoolean, IsEnum, IsInt, IsOptional, Min } from "class-validator";
import { SortOrder } from "../../enum/sort-order.enum";
import { FindOptionsWhere } from "typeorm";

export class PaginationFilter {


    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(1)
    public page?: number = 1;

    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(1)
    public pageSize?: number = 10;

    @IsOptional()
    public orderBy?: string;

    @IsEnum(SortOrder)
    @IsOptional()
    public sortOrder?: SortOrder = SortOrder.DESC;

    @IsOptional()
    public where?: FindOptionsWhere<any>;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true' || value === true)
    public withDeleted?: boolean = false;

    order?: any;

    skip?: number;

}