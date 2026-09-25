export const origin='https://juwa3x.vercel.app';
export function pageMeta(title:string,description:string,path:string,image='/art/juwa-logo.png'){return {title,description,alternates:{canonical:origin+path},openGraph:{title,description,url:origin+path,siteName:'JUWA3X',type:'website',images:[{url:origin+image}]},twitter:{card:'summary_large_image' as const,title,description,images:[origin+image]}}}
export function jsonLd(value:unknown){return JSON.stringify(value).replace(/</g,'\\u003c')}
