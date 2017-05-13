/**
 * Created by Ákos on 2017. 05. 08.
 */
import { XRegExp } from 'xregexp';

/*const RFCCompliantRegex = XRegExp(
  /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/);

export function validateEmail(value: string): boolean {
  return RFCCompliantRegex.test(value);
}*/

export function validatePassword(value: string): boolean {
  //TODO write some more password validation
  return (value.length > 7 && value.length < 65);
}

export class Validators {
  static required = (value: any) => {
    return value ? undefined : 'Required';
  };
  static minLength = (min: number) => (value: string) =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined;
  static maxLength = (max: number) => (value: string) =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined;
  static minMaxLength = (min: number, max: number) => (value: any) => {
    if (value) {
      if (value.length < min) {
        return `Must be ${min} characters or more`;
      } else if (value.length > max) {
        return `Must be ${max} characters or less`;
      } else {
        return undefined;
      }
    }
    return undefined;
  };
  static maxLength15 = Validators.maxLength(15);
  static number = (value: any) => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
  static minValue = (min: number) => (value: any) =>
    value && value < min ? `Must be at least ${min}` : undefined;
  static minValue18 = Validators.minValue(18);
  static email = (value: string) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
      'Invalid email address' : undefined;
}