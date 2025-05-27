/**
 * Truncates an EVM wallet address to the format 0x1234...abcd by including a configurable number of characters
 * from the start and end of the address. Defaults to 6 at the start and 4 at the end.
 * @param address The full wallet address
 * @param options Optional. Object with includeFirst and includeLast to specify how many characters to show from the start and end
 * @returns The truncated address
 */
const formatWalletAddress = (
  address: string,
  options: {includeFirst: number; includeLast: number} = {
    includeFirst: 6,
    includeLast: 4
  }
): string => {
  const {includeFirst, includeLast} = options;
  if (!address || address.length < includeFirst + includeLast) return address;
  return `${address.slice(0, includeFirst)}...${address.slice(-1 * includeLast)}`;
};

export default formatWalletAddress;
export {formatWalletAddress};
