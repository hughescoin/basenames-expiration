import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
} from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../../config';

const image_url = 'https://basenames-expiration.vercel.app/basename-logo.png';
const title_text = 'Hello Title Text';
const site_text = 'basenames.vercel site';
async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: 'NEYNAR_ONCHAIN_KIT',
  });

  if (!isValid) {
    return new NextResponse('Message not valid', { status: 500 });
  }

  const text = message.input || '';
  let state = {
    page: 0,
  };
  try {
    state = JSON.parse(decodeURIComponent(message.state?.serialized));
  } catch (e) {
    console.error(e);
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: 'Check another name expiration',
          action: 'post',
        },
        {
          label: `success: ${text}`,
          action: 'link',
          target: 'https://basenames-expiration.vercel.app/',
        },
      ],
      //   image: {
      //     src: `${NEXT_PUBLIC_URL}/basename-logo.png`,
      //     aspectRatio: '1:1',
      //   },
      image: {
        src: `https://ogcdn.net/e4b8c678-7bd5-445d-ba03-bfaad510c686/v4/${site_text}/${title_text}/${image_url}/og.png`,
        aspectRatio: '1:1',
      },
      input: {
        text: 'Basename or TokenId',
      },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
      state: {
        page: state?.page + 1,
        time: new Date().toISOString(),
      },
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
