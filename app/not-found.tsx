import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found | juwa3x.com',
  description: 'That page is not on juwa3x.com.',
  robots: {index: false, follow: false},
};

export default function NotFound() {
  return (
    <main className="wrap contact-page">
      <p className="eyebrow">JUWA3X</p>
      <h1>Page not found</h1>
      <p className="dek">That address is not a page on this Juwa777 guide. Try the download guide, the games, or the FAQ.</p>
      <nav className="guide-links" aria-label="Juwa777 guides">
        <a href="/">Juwa777 guides</a>
        <a href="/journal/juwa777-download-guide">Download Juwa 777</a>
        <a href="/game-worlds">Juwa777 games</a>
        <a href="/faq">Juwa777 FAQ</a>
      </nav>
    </main>
  );
}
