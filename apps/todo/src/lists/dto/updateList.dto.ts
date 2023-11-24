import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateItemDto } from "./createItem.dto";
import { ApiProperty } from "@nestjs/swagger";

class ListDto {
    @IsString()
    @IsOptional()
    @ApiProperty()
    listName?: string;

    @IsDate()
    @IsOptional()
    @ApiProperty()
    deadline?: Date;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    done?: boolean;
}

export class UpdateListDto {
    @ApiProperty()
    list: ListDto

    @IsArray()
    @IsOptional()
    @ApiProperty({type: CreateItemDto, isArray: true})
    items: CreateItemDto[]
}