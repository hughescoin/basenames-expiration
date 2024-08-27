import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
} from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../../config';
import { generateWarpcastURL } from 'src/utils';

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
          label: 'Check another name',
          action: 'post',
        },
        {
          label: `Share`,
          action: 'link',
          target: generateWarpcastURL(
            'When does your Basename expire?',
            `${NEXT_PUBLIC_URL}/expiration-frame`
          ),
        },
      ],
      image: {
        src: `${NEXT_PUBLIC_URL}/api/og?tokenId=${text}`,
        aspectRatio: '1:1',
      },
      input: {
        text: 'Enter a Basename TokenId',
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
