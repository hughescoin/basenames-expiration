import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from '../../config';
const frameMetadata = getFrameMetadata({
  isOpenFrame: true,
  accepts: { xmtp: 'vNext' },
  buttons: [
    {
      label: 'Check expiration',
      action: 'post',
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/basename-starter-image.png`,
    aspectRatio: '1:1',
  },
  input: {
    text: 'Enter a Basename TokenId',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/openframe`,
});

export const metadata: Metadata = {
  title: 'Basename Expiration Checker',
  description: 'Check the expiration of a Basename',
  openGraph: {
    title: 'by Hughescoin',
    description: 'Check the expiration of a Basename',
    images: [`${NEXT_PUBLIC_URL}/basename-starter-image.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>Basename Expiration Checker</h1>
    </>
  );
}
