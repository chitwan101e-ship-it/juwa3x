export const origin = 'https://www.juwa3x.com';
const shareAlt = 'Juwa777 guides on juwa3x.com. Independent guide. Entertainment only. 18+.';

export function pageMeta(title: string, description: string, path: string, image = '/art/juwa3x-og.png') {
  const share = image === '/art/juwa3x-og.png'
    ? {url: origin + image, width: 1200, height: 630, alt: shareAlt}
    : {url: origin + image, alt: title};
  return {
    title,
    description,
    alternates: {canonical: origin + path},
    openGraph: {title, description, url: origin + path, siteName: 'JUWA3X', type: 'website' as const, images: [share]},
    twitter: {card: 'summary_large_image' as const, title, description, images: [origin + image]},
  };
}

export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
