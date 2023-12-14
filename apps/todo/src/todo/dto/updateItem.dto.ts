import { IsBoolean, IsDateString, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateItemDto {
    @IsString()
    @IsOptional()
    @ApiProperty()
    title?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    description?: string;

    @IsDateString()
    @IsOptional()
    @ApiProperty()
    deadline?: Date;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    done?: boolean;
}