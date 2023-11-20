import { IsDate, IsOptional, IsString } from "class-validator";

export class CreateListDto {
    @IsString()
    @IsOptional()
    listName: string;

    @IsDate()
    @IsOptional()
    deadline: Date;

    userId: string;
}