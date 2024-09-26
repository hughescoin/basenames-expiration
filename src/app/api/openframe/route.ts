import { FrameRequest, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../../config';
import { generateWarpcastURL, generateTokenIdFromName } from '../../../utils';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  console.log('body', body);
  let text = body.untrustedData.inputText;
  console.log('text: ', text);

  if (!text) {
    console.log('No text provided');
    return new NextResponse('No text', { status: 500 });
  }

  let tokenId: string;

  if (text.endsWith('.base.eth')) {
    const baseName = text.slice(0, -9);
    console.log('basename: ', baseName);
    tokenId = generateTokenIdFromName(baseName);
  } else if (/^\d+$/.test(text)) {
    // If the input is already a numeric tokenId, use it as is
    tokenId = text;
  } else {
    // Assume the input is a basename without .base.eth
    tokenId = generateTokenIdFromName(text);
  }

  console.log('corresponding tokenId: ', tokenId);

  const state = {
    page: 0,
  };

  return new NextResponse(
    getFrameHtmlResponse({
      isOpenFrame: true,
      input: {
        text: 'Type Basename or TokenId',
      },
      accepts: { anonymous: '1' },
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
        src: `${NEXT_PUBLIC_URL}/api/og?tokenId=${tokenId}`,
        aspectRatio: '1:1',
      },
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
