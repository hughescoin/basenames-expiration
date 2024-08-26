// pages/api/expiration.ts

import type { NextApiRequest, NextApiResponse } from 'next';
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

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	const { tokenId } = req.query;

	if (!tokenId || typeof tokenId !== 'string') {
		res
			.status(400)
			.json({ error: 'Token ID is required and must be a string' });
		return;
	}

	try {
		const readableDate = await getNameExpiration(BigInt(tokenId));
		res.status(200).json({ tokenId, expiration: readableDate });
	} catch (error) {
		console.error('Error fetching expiration:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
}
