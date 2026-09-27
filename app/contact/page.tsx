import {socials} from '../socials';
import {pageMeta} from '../seo';

export const metadata = pageMeta(
  'Juwa777 Help | Download, Login & App Support | juwa3x.com',
  'Juwa777 help for the Android and iOS download, login, bonuses, and app troubleshooting. Account mail is support@juwagame.com. Entertainment only. 18+.',
  '/contact',
);

export default function Contact() {
  return (
    <main className="wrap contact-page">
      <p className="eyebrow">JUWA777 HELP</p>
      <h1>Juwa777 help</h1>
      <p className="display-sub">Download, login,<br/><em>and app fixes.</em></p>
      <p className="dek">Juwa777, also called Juwa 777, is a free social gaming app for Android and iOS with slots, fish shooting games, and keno. Use the guides below for the download, the bonus, and the app. Account, login, and balance help is support@juwagame.com. Entertainment only. 18+.</p>
      <nav className="guide-links" aria-label="Juwa777 guides">
        <a href="/faq">Juwa777 FAQ</a>
        <a href="/journal/juwa777-download-guide">Download Juwa 777</a>
        <a href="/journal/juwa777-no-deposit-bonus">Juwa 777 bonus</a>
        <a href="/journal/juwa777-app-troubleshooting">Juwa777 troubleshooting</a>
      </nav>
      <div className="contact-grid">
        <section className="support-card">
          <span className="support-number">01 / JUWA777 GUIDES</span>
          <h2>Download, bonus, and FAQ</h2>
          <p>The download guide covers Juwa777 on Android and iPhone. The bonus guide covers the welcome match, the reload, and the referral. The FAQ answers login, age, and whether Juwa, Juwa777, and Juwa 777 are the same name.</p>
          <a className="contact-status" href="/faq">Open the Juwa777 FAQ</a>
          <p className="small-note">juwa3x.com explains Juwa777. It does not take a password or reset a Juwa777 account.</p>
        </section>
        <section className="support-card">
          <span className="support-number">02 / JUWA777 APP</span>
          <h2>Juwa777 app not opening?</h2>
          <p>If Juwa777 will not install, runs slowly, or a game will not load, use the troubleshooting guide. Android needs Android 7.0 or later and at least 100 MB free. iPhone uses the iOS download, not the Android file.</p>
          <p>For a Juwa777 login, balance, or admin access, email <a href="mailto:support@juwagame.com">support@juwagame.com</a>. Do not send passwords or codes.</p>
        </section>
      </div>
      <section className="contact-socials">
        <p className="eyebrow">STAY IN TOUCH</p>
        <h2>Our social corners.</h2>
        <div className="contact-grid social-cards">
          {socials.map(([name, img]) => (
            <section className="support-card" key={name} id={name.toLowerCase()}>
              <img src={'/art/' + img} alt="" width="44" height="44"/>
              <h3>{name}</h3>
              <p>Link coming soon.</p>
              <span className="small-note">This channel is not connected yet.</span>
            </section>
          ))}
        </div>
      </section>
      <section className="support-card facebook-contact" id="facebook">
        <p className="eyebrow">JUWA3X ON FACEBOOK</p>
        <h2>Follow the journal. Say hello.</h2>
        <p>Our Facebook page link is coming soon. Once connected, you can follow our stories or message us there. This page does not send messages yet.</p>
        <span className="contact-status">Facebook · Not connected yet</span>
      </section>
      <p>JUWA3X is an independent guide to Juwa777, not the official Juwa service. Juwa777 account help is support@juwagame.com.</p>
      <a className="button" href="/faq">Open the Juwa777 FAQ →</a>
    </main>
  );
}
