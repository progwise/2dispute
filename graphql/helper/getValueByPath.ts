const getValueByPath = (object: {} | [], path: string): unknown =>
  path
    .replace(/\[/g, '.')
    .replace(/\]/g, '')
    .split('.')
    .reduce((o, key) => (o || {})[key], object);

export default getValueByPath;
