import { ImageResponse } from 'next/og';
import { getNameExpiration } from '../../../lib/basenames';
import { NextRequest } from 'next/server';

function isValidTokenId(tokenId: string): boolean {
  return /^\d+$/.test(tokenId);
}

function generateErrorImage(tokenId: string) {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: 'black',
          background: 'white',
          width: '100%',
          height: '100%',
          padding: '50px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1 style={{ fontSize: 60, marginBottom: 20, color: '#3b82f6' }}>
          Basename Expiration
        </h1>
        <p style={{ fontSize: 30, marginBottom: 10 }}>
          Token ID: {tokenId} is invalid 😢
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tokenId = searchParams.get('tokenId');
  console.log(tokenId);

  if (!tokenId) {
    return new Response('Token ID is required', { status: 400 });
  }

  if (!isValidTokenId(tokenId)) {
    return generateErrorImage(tokenId);
  }

  try {
    const readableDate = await getNameExpiration(BigInt(tokenId));

    if (readableDate === '0') {
      return generateErrorImage(tokenId);
    }

    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 40,
            color: 'black',
            background: 'white',
            width: '100%',
            height: '100%',
            padding: '50px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1 style={{ fontSize: 60, marginBottom: 20, color: '#3b82f6' }}>
            Basename Expiration
          </h1>
          <p style={{ fontSize: 30, marginBottom: 10 }}>
            Token ID:{' '}
            <span style={{ fontWeight: 'bold' }}>
              {tokenId.slice(0, 4)}...{tokenId.slice(-4)}
            </span>
          </p>
          <p style={{ fontSize: 30, marginBottom: 10 }}>
            Expires on:{' '}
            <span style={{ fontWeight: 'bold' }}>{readableDate}</span>
          </p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Error generating image', { status: 500 });
  }
}
