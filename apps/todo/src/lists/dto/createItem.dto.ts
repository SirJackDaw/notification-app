import { IsDate, IsOptional, IsString } from "class-validator";
import {ApiProperty} from '@nestjs/swagger'

export class CreateItemDto {
    @IsString()
    @IsOptional()
    @ApiProperty()
    text: string;

    @IsDate()
    @IsOptional()
    @ApiProperty()
    done?: boolean;
}