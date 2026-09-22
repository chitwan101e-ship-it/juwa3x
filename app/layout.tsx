import type { Metadata } from 'next';
import './globals.css';
import {SiteHeader,SiteFooter,SocialDock} from './site-shell';
import {pageMeta,origin,jsonLd} from './seo';
export const metadata: Metadata = {...pageMeta('Juwa777 Guides & Free Browser Mini-Games | JUWA3X','Explore Juwa777 artwork and guides, plus original free browser mini-games on JUWA3X. No signup, real money or redeemable rewards. 18+.','/'),metadataBase:new URL(origin),icons:{icon:'/favicon.svg',shortcut:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader/><div id="main-content">{children}</div><SiteFooter/><SocialDock/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd({'@context':'https://schema.org','@type':'WebSite',name:'JUWA3X',url:origin,description:'Independent editorial blog about Juwa777 game categories and artwork.'})}}/></body></html>}

