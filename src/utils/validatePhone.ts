import validator from 'validator';

export default function validatePhone(phone:string){
  return validator.isNumeric(phone);
}
