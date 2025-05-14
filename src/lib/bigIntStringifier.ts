const bigIntStringifier = (key: string, value: bigint): string =>
  typeof value === 'bigint' ? value.toString() : value;

export default bigIntStringifier;
export {bigIntStringifier};
