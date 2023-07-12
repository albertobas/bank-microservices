import { stringToHex } from 'viem';

/**
 * Encode a UTF-8 string into a 32 bytes wide hex string.
 * @param arg string to be converted.
 * @returns a hex value.
 */
export function stringToBytes32(arg: string): `0x${string}` {
  return stringToHex(arg, { size: 32 });
}
