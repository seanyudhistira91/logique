import { IsEmail, IsString, IsArray, Validate, IsEnum, minLength, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { CustomIsNotEmpty } from './custom-validation/not-empty.validator';
import { IsMMYYFormat } from './custom-validation/mm-yy-format.validator';

enum DebitCardType {
  Platinum = 'Platinum',
  Silver = 'Silver',
  Gold = 'Gold',
  Titanium = 'Titanium',
}

export class RegisterUserDto {
  @Validate(CustomIsNotEmpty, ['name'])
  @IsString()
  name: string;

  @Validate(CustomIsNotEmpty, ['address'])
  @IsString()
  address: string;

  @Validate(CustomIsNotEmpty, ['email'])
  @IsEmail()
  email: string;

  @Validate(CustomIsNotEmpty, ['password'])
  @IsString()
  password: string;

  @Validate(CustomIsNotEmpty, ['photos'])
  @IsArray()
  @Type(() => String)
  photos: string[];

  @Validate(CustomIsNotEmpty, ['debitcard_type'])
  @IsEnum(DebitCardType)
  @IsString()
  debitcard_type: string;

  @Validate(CustomIsNotEmpty, ['debitcard_number'])
  @IsString()
  @MinLength(10)
  @MaxLength(13)
  debitcard_number: string;

  @Validate(CustomIsNotEmpty, ['debitcard_name'])
  @IsString()
  debitcard_name: string;

  @Validate(CustomIsNotEmpty, ['debitcard_expired'])
  @IsString()
  @Validate(IsMMYYFormat)
  debitcard_expired: string;

  @Validate(CustomIsNotEmpty, ['debitcard_cvv'])
  @IsString()
  @MinLength(3)
  @MaxLength(3)
  debitcard_cvv: string;
}
