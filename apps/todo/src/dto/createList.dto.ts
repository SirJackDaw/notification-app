import { ApiProperty } from '@nestjs/swagger';
import { CreateItemDto } from './createItem.dto';
import { IsArray, IsDate, IsOptional, IsString } from "class-validator";

class ListDto {
    @IsString()
    @IsOptional()
    @ApiProperty()
    listName: string;

    @IsDate()
    @IsOptional()
    @ApiProperty()
    deadline: Date;
}

export class CreateListDto {
    @ApiProperty()
    list: ListDto

    @IsArray()
    @IsOptional()
    @ApiProperty()
    items: CreateItemDto[]

    userId: string;
}