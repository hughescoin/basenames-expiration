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
  console.log('body', body);

  const text = body.untrustedData.inputText;

  if (!text) {
    return new NextResponse('No text', { status: 500 });
  }

  const state = {
    page: 0,
  };

  return new NextResponse(
    getFrameHtmlResponse({
      isOpenFrame: true,
      accepts: { xmtp: 'vNext', anonymous: '1' },
      buttons: [
        {
          label: 'Check another name',
          action: 'post',
          target: `${NEXT_PUBLIC_URL}/api/openframe`,
        },
        {
          label: `Share`,
          action: 'link',
          target: generateWarpcastURL(
            'When does your Basename expire?',
            `${NEXT_PUBLIC_URL}/expiration-frame-open`
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
      postUrl: `${NEXT_PUBLIC_URL}/api/openframe`,
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
