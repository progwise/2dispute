const removeDoubleWhitespace = (input: string): string =>
  input.replace(/ +(?= )/g, '');

const trim = (input: string): string => removeDoubleWhitespace(input.trim());

export default trim;
