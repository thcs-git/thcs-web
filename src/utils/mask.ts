export default function mask(value: any, pattern: string) {

  if (!value) return '';

  let i = 0;
  const v = value.toString();
  return pattern.replace(/#/g, () => v[i++] || '');
}
