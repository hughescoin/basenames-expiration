import { createPublicClient, getContract, http } from 'viem';
import { base } from 'viem/chains';
import { BASENAMES_CONTRACT_ADDRESS, unixToHumanReadable } from '../utils';
import { BASENAMES_ABI } from '../abi';

const publicClient = createPublicClient({
  chain: base,
  transport: http(),
});

export async function getNameExpiration(tokenId: bigint): Promise<string> {
  const contract = getContract({
    address: BASENAMES_CONTRACT_ADDRESS,
    abi: BASENAMES_ABI,
    client: publicClient,
  });

  const expirationTimeUnix = await contract.read.nameExpires([tokenId]);
  let epochUnixTimestamp: bigint;
  console.log(expirationTimeUnix);

  if (expirationTimeUnix === 0n) {
    return '0';
  }
  if (typeof expirationTimeUnix === 'bigint') {
    epochUnixTimestamp = expirationTimeUnix;
  } else if (
    typeof expirationTimeUnix === 'string' ||
    typeof expirationTimeUnix === 'number'
  ) {
    epochUnixTimestamp = BigInt(expirationTimeUnix);
  } else {
    throw new Error('Unexpected type for expirationTimeUnix');
  }

  return unixToHumanReadable(epochUnixTimestamp);
}
