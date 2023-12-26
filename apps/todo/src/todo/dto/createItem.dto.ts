import { IsBoolean, IsDateString, IsOptional, IsString } from "class-validator";
import {ApiProperty} from '@nestjs/swagger'

export class CreateItemDto {
    @IsString()
    @ApiProperty()
    title: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    description: string;

    @IsDateString()
    @IsOptional()
    @ApiProperty()
    deadline?: Date;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({default: false})
    done?: boolean;
}