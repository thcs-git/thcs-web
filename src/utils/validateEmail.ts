import validator from 'validator';

export default function validateEmail(email: string) {
  return validator.isEmail(email);
}
