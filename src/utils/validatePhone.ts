import validator from 'validator';

export default function validatePhone(phone:string){
  return (validator.isAscii && !validator.isEmpty);
}
