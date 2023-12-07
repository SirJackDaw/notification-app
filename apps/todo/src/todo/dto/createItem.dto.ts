import { IsBoolean, IsOptional, IsString } from "class-validator";
import {ApiProperty} from '@nestjs/swagger'

export class CreateItemDto {
    @IsString()
    @IsOptional()
    @ApiProperty()
    text: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    done?: boolean;
}