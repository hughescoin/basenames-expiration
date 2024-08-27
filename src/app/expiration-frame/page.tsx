import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from '../../config';
const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Check expiration',
      action: 'post',
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/basename-logo.png`,
    aspectRatio: '1:1',
  },
  input: {
    text: 'Basename or TokenId',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'Basename Expiration Checker',
  description: 'LFG',
  openGraph: {
    title: 'by Hughescoin',
    description: 'LFG',
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
