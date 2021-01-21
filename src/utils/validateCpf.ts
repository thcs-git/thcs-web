import validator from 'validator';

export default function validateCpf(cpf:string){
    return (validator.isAscii && !validator.isEmpty);
}
