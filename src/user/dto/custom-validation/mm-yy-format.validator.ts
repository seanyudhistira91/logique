import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'IsMMYYFormat', async: false })
export class IsMMYYFormat implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    // Regular expression to match "mm/YY" format
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    return regex.test(value);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Invalid format. Must be in mm/YY format.';
  }
}