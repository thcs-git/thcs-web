import validator from "validator";

export default function validateEmpty(item: string) {
  return validator.isEmpty(item);
}
