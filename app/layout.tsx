import type { Metadata } from 'next';
import './globals.css';
import FacebookPhone from './facebook-phone';
import TriviaPopup from './trivia-popup';
import {SiteHeader, SiteFooter} from './site-shell';
import {origin, jsonLd} from './seo';

export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: {default: 'Juwa777 Guides | Download, Bonuses & Games | juwa3x.com', template: '%s'},
  description: 'Juwa777 and Juwa 777 guides for download, games, bonuses, and FAQ on juwa3x.com. Entertainment only. 18+.',
  icons: {icon: [{url: '/favicon.png', type: 'image/png', sizes: '48x48'}], shortcut: '/favicon.png', apple: {url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png'}},
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap"/>
      </head>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader/>
        <div id="main-content">{children}</div>
        <SiteFooter/>
        <FacebookPhone/>
        <TriviaPopup/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: jsonLd({'@context': 'https://schema.org', '@type': 'WebSite', name: 'JUWA3X', url: origin, description: 'Independent Juwa777 guides on juwa3x.com for the Android and iOS app, slots, fish shooting games, keno, download, and bonuses.', alternateName: 'juwa3x.com'})}}/>
      </body>
    </html>
  );
}
