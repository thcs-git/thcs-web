import validator from 'validator';

export default function validatePhone(phone:string){
  const landline = phone.replace('(', '').replace(')', '9').replace(' ', '').replace(' ', '').replace('-', '');
  var isValidPhoneNumber =  validator.isMobilePhone(landline, 'pt-BR');

  return (isValidPhoneNumber)
}
