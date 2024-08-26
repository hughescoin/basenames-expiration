import { NextRequest, NextResponse } from 'next/server';
import { createPublicClient, getContract, http } from 'viem';
import { base } from 'viem/chains';
import {
  BASENAMES_CONTRACT_ADDRESS,
  unixToHumanReadable,
} from '../../../utils';
import { BASENAMES_ABI } from '../../../abi';

const publicClient = createPublicClient({
  chain: base,
  transport: http(),
});

async function getNameExpiration(tokenId: bigint): Promise<string> {
  const contract = getContract({
    address: BASENAMES_CONTRACT_ADDRESS,
    abi: BASENAMES_ABI,
    client: publicClient,
  });

  const expirationTimeUnix = await contract.read.nameExpires([tokenId]);
  let epochUnixTimestamp: bigint;

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

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const tokenId = searchParams.get('tokenId');
  console.log('params: ', searchParams);
  console.log('tokenId2: ', tokenId);

  //   if (!tokenId || typeof tokenId !== 'string') {
  //     return new Response("error: 'Token ID is required and must be a string'", {
  //       status: 400,
  //     });
  //   }
  if (!tokenId) {
    return Response.json({ error: 'Token ID is required' }, { status: 400 });
  }
  try {
    const readableDate = await getNameExpiration(BigInt(tokenId));
    console.log(`api data: \n`, { tokenId, expiration: readableDate });
    return NextResponse.json({ tokenId, expiration: readableDate });
  } catch (error) {
    console.error('Error fetching expiration:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
