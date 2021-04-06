import validator from "validator";

export default function validateName(name: string) {
  return !validator.isEmpty(name);
}
