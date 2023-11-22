import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateItemDto } from "./createItem.dto";

class ListDto {
    @IsString()
    @IsOptional()
    listName?: string;

    @IsDate()
    @IsOptional()
    deadline?: Date;

    @IsBoolean()
    @IsOptional()
    done?: boolean;
}

export class UpdateListDto {
    list: ListDto

    @IsArray()
    @IsOptional()
    items: CreateItemDto[]
}