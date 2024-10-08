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
          color: 'white',
          background: '#0052ff',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >
        <h1 style={{ fontSize: 60, marginBottom: 20 }}>Basename Expiration</h1>
        <p style={{ fontSize: 30, marginBottom: 10 }}>
          Token ID: {tokenId} is invalid 😢
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 1200, // Updated to a 1:1 aspect ratio
    }
  );
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tokenId = searchParams.get('tokenId');

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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#0052FF',
            color: 'white',
            padding: '20px',
            boxSizing: 'border-box',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          <p style={{ fontSize: '36px', marginBottom: '10px' }}>
            Token ID:{' '}
            <span style={{ fontWeight: 'bold' }}>
              {tokenId.slice(0, 4)}...{tokenId.slice(-4)}
            </span>
          </p>
          <p style={{ fontSize: '48px', fontWeight: 'bold' }}>
            Expires: {readableDate}
          </p>
        </div>
      ),
      {
        width: 1200,
        height: 1200, // Updated to a 1:1 aspect ratio
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Error generating image', { status: 500 });
  }
}
