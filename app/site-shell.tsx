'use client';
import {useEffect, useRef, useState} from 'react';
import {usePathname} from 'next/navigation';
import {Menu,X,BookOpen,ArrowUpRight} from 'lucide-react';
export function SiteHeader(){
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();
  const activePath = pathname?.startsWith('/journal/') ? '/blog' : pathname?.replace(/\/$/, '') || '/';

  useEffect(() => {
    const header = headerRef.current;
    const brand = brandRef.current;
    if (!header || !brand) return;
    let last = window.scrollY;
    let intent = 0;
    let compactNow = false;

    function measureShift() {
      const headerRect = header!.getBoundingClientRect();
      const brandRect = brand!.getBoundingClientRect();
      const transform = getComputedStyle(brand!).transform;
      let appliedX = 0;
      if (transform && transform !== 'none') appliedX = new DOMMatrix(transform).m41;
      const brandCenter = brandRect.left + brandRect.width / 2 - appliedX;
      const headerCenter = headerRect.left + headerRect.width / 2;
      return headerCenter - brandCenter;
    }
    function update(next: boolean) {
      if (next === compactNow) return;
      compactNow = next;
      if (next) {
        header!.style.setProperty('--logo-shift', `${measureShift()}px`);
        setOpen(false);
      }
      setCompact(next);
    }
    if (window.scrollY > 80) update(true);
    function onScroll() {
      const y = window.scrollY;
      const delta = y - last;
      last = y;
      if (y < 40) {
        intent = 0;
        update(false);
        return;
      }
      intent += delta;
      if (intent > 28) {
        intent = 0;
        update(true);
      } else if (intent < -28) {
        intent = 0;
        update(false);
      }
    }
    function onResize() {
      if (!compactNow) return;
      header!.style.setProperty('--logo-shift', `${measureShift()}px`);
    }
    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <div className={compact ? 'site-top nav-hidden' : 'site-top'}><div className="responsible-banner">⚠️ 18+ Only | For Entertainment Purposes Only | Play Responsibly</div><header className="wrap header" ref={headerRef}><a className="brand" href="/" aria-label="JUWA3X home" ref={brandRef}><img src="/art/juwa3x-logo.png" alt="JUWA3X Online" width="1718" height="914"/></a><nav className={open ? 'open' : ''} aria-label="Main navigation" aria-hidden={compact} inert={compact || undefined}>{[['/','Home'],['/game-worlds','Game worlds'],['/blog','Blog'],['/faq','FAQ'],['/about','About'],['/contact','Contact']].map(([url,label])=><a key={url} href={url} aria-current={activePath===url?'page':undefined} onClick={()=>setOpen(false)}>{label}</a>)}</nav><div className="header-actions" aria-hidden={compact} inert={compact || undefined}><a className="button header-link" href="/faq"><BookOpen size={17}/> Juwa777 FAQ <ArrowUpRight size={17}/></a><button className="menu" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div></header></div>;
}
export function SiteFooter(){return <footer className="wrap"><a className="footer-wordmark" href="/">JUWA<span>3X</span></a><p>Independent Juwa777 guide on juwa3x.com · Not an official Juwa service.<br/>Artwork and trademarks belong to their respective owners. Just for fun; no real money or redeemable rewards.</p><div><a href="/faq">Juwa777 FAQ</a><a href="/journal/juwa777-download-guide">Download Juwa 777</a><a href="/about">About</a><a href="/blog">Blog</a><a href="/contact">Contact</a><a href="/sitemap.xml">Sitemap</a><a href="/#home">Back to top ↑</a></div></footer>}


