import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'customIsNotEmpty', async: false })
export class CustomIsNotEmpty implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    if(relatedPropertyName==='photos'){
        return value.length>0
    }
    return typeof value === 'string' && value.trim().length > 0;
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    
    return `Please provide ${relatedPropertyName} field.`;
  }
}
