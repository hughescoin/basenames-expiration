export const BASENAMES_CONTRACT_ADDRESS =
  '0x03c4738Ee98aE44591e1A4A4F3CaB6641d95DD9a';

export function unixToHumanReadable(unixTimestamp: bigint): string {
  const milliseconds = Number(unixTimestamp) * 1000;
  const date = new Date(milliseconds);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  };

  return date.toLocaleString('en-US', options);
}

export function generateWarpcastURL(
  customText: string,
  embedURL: string
): string {
  // Encode the custom text
  const encodedText = encodeURIComponent(customText).replace(/%20/g, '+');

  // Encode the embed URL
  const encodedEmbedURL = encodeURIComponent(embedURL);

  // Construct the final URL
  const url = `https://warpcast.com/~/compose?text=${encodedText}&embeds%5B%5D=${encodedEmbedURL}`;

  return url;
}
