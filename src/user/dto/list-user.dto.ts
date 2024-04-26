import { IsString,IsOptional, IsNumberString } from 'class-validator';

export class ListUserDto {
  @IsString()
  q: string;
  
  @IsString()
  ob: string;

  @IsString()
  sb: string;

  @IsNumberString()
  @IsString()
  of: string;

  @IsNumberString()
  @IsString()
  lt: string;
}
