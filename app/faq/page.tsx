import SupportFaq, {groups} from '../support-faq';
import {pageMeta, origin, jsonLd} from '../seo';

export const metadata = pageMeta(
  'Juwa777 FAQ | Login, Download & App Help | juwa3x.com',
  'Juwa777 FAQ for login, the Juwa 777 download, bonuses, and app help. Entertainment only. 18+.',
  '/faq',
);

export default function FaqPage() {
  const mainEntity = groups.flatMap(group => group.items.map(([question, answer]) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: {'@type': 'Answer', text: answer},
  })));
  return (
    <main className="wrap contact-page">
      <p className="eyebrow">JUWA777 ON JUWA3X.COM</p>
      <h1>Juwa777 FAQ</h1>
      <p className="dek">Juwa, Juwa777, and Juwa 777 are names for the same free social gaming app for Android and iOS. These answers cover login, the download, bonuses, and the app. Account help is support@juwagame.com. This page does not collect a password. Entertainment only. 18+.</p>
      <SupportFaq/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: jsonLd({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        url: origin + '/faq',
        mainEntity,
      })}}/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: jsonLd({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {'@type': 'ListItem', position: 1, name: 'Home', item: origin},
          {'@type': 'ListItem', position: 2, name: 'Juwa777 FAQ', item: origin + '/faq'},
        ],
      })}}/>
    </main>
  );
}
