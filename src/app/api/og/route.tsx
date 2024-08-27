import { ImageResponse } from 'next/og';
import { getNameExpiration } from '../../../lib/basenames';
import { NextRequest } from 'next/server';
import CompressedFrameBg from '../../../svg/CompressedFrameBg';

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
            display: 'flex',
            position: 'relative',
            width: '100vw',
            height: '100vh',
            backgroundColor: '#0052FF',
            boxShadow: `
      0px 4px 16px rgba(0, 82, 255, 0.32), 
      inset 0px 8px 16px rgba(255, 255, 255, 0.25), 
      inset 0px 4px 32px rgba(69, 225, 229, 0.5), 
      inset 0px 2px 16px #0052FF, 
      inset 0px -2px 4px rgba(255, 255, 255, 0.25), 
      inset 0px -8px 32px rgba(0, 0, 0, 0.25), 
      inset 0px 8px 32px rgba(255, 255, 255, 0.5)
    `,
            borderRadius: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          ></div>
          <div
            style={{
              display: 'flex',
              fontSize: '40px',
              fontStyle: 'normal',
              color: 'white',
              marginTop: '30px',
              lineHeight: 1.8,
              whiteSpace: 'pre-wrap',
            }}
          >
            {' '}
            <p style={{ fontSize: '36px', marginBottom: '10px' }}>
              Token ID:{' '}
              <span style={{ fontWeight: 'bold' }}>
                {tokenId.slice(0, 4)}...{tokenId.slice(-4)}{' '}
              </span>{' '}
            </p>{' '}
            <p style={{ fontSize: '48px', fontWeight: 'bold' }}>
              Expires: {readableDate}{' '}
            </p>
          </div>
        </div>
      )
    );
    // return new ImageResponse(
    //   (
    //     <div
    //       style={{
    //         width: '1200px',
    //         height: '630px',
    //         display: 'flex',
    //         flexDirection: 'column',
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         background: '#0052ff',
    //         position: 'relative',
    //       }}
    //     >
    //       {/* SVG Background */}
    //       <div
    //         style={{
    //           position: 'absolute',
    //           top: 0,
    //           left: 0,
    //           width: '100%',
    //           height: '100%',
    //           display: 'flex',
    //           justifyContent: 'center',
    //           alignItems: 'center',
    //         }}
    //       >
    //         <CompressedFrameBg />
    //       </div>

    //       {/* Content */}
    //       <div
    //         style={{
    //           display: 'flex',
    //           flexDirection: 'column',
    //           alignItems: 'center',
    //           justifyContent: 'center',
    //           color: 'white',
    //           fontFamily: 'Arial, sans-serif',
    //           textAlign: 'center',
    //           zIndex: 1,
    //           position: 'relative',
    //         }}
    //       >
    //         <h1 style={{ fontSize: '72px', marginBottom: '20px' }}>
    //           Basename Expiration
    //         </h1>
    //         <p style={{ fontSize: '36px', marginBottom: '10px' }}>
    //           Token ID:{' '}
    //           <span style={{ fontWeight: 'bold' }}>
    //             {tokenId.slice(0, 4)}...{tokenId.slice(-4)}
    //           </span>
    //         </p>
    //         <p style={{ fontSize: '48px', fontWeight: 'bold' }}>
    //           Expires on: {readableDate}
    //         </p>
    //       </div>
    //     </div>
    //   ),
    //   {
    //     width: 1200,
    //     height: 630,
    //   }
    // );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Error generating image', { status: 500 });
  }
}
