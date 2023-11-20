import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateListDto {
    @IsUUID()
    @IsNotEmpty()
    id: string;

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