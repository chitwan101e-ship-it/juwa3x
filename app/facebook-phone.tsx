'use client';
import {useEffect, useRef, useState} from 'react';
import {X, MessageCircle} from 'lucide-react';
import {usePathname} from 'next/navigation';

const scrollDelay = 2000;
const idleDelay = 2 * 60 * 1000;

export default function FacebookPhone() {
  const [visible, setVisible] = useState(false);
  const path = usePathname();
  const closeRef = useRef<() => void>(() => {});

  useEffect(() => {
    const scrollTimer = {id: 0};
    const idleTimer = {id: 0};
    let dismissed = false;
    let showing = false;

    function clearScroll() {
      if (scrollTimer.id) window.clearTimeout(scrollTimer.id);
      scrollTimer.id = 0;
    }
    function clearIdle() {
      if (idleTimer.id) window.clearTimeout(idleTimer.id);
      idleTimer.id = 0;
    }
    function show() {
      if (path === '/contact' || path === '/game-worlds') return;
      clearScroll();
      clearIdle();
      dismissed = false;
      showing = true;
      setVisible(true);
    }
    function armIdle() {
      clearIdle();
      idleTimer.id = window.setTimeout(show, idleDelay);
    }
    function scheduleFromScroll() {
      if (dismissed || showing || scrollTimer.id) return;
      scrollTimer.id = window.setTimeout(() => {
        scrollTimer.id = 0;
        if (!dismissed && !showing) show();
      }, scrollDelay);
    }
    function close() {
      clearScroll();
      showing = false;
      dismissed = true;
      setVisible(false);
      armIdle();
    }

    setVisible(false);
    closeRef.current = close;
    if (path === '/contact' || path === '/game-worlds') {
      return () => {
        clearScroll();
        clearIdle();
        closeRef.current = () => {};
      };
    }

    function onScroll() {
      if (dismissed) {
        armIdle();
        return;
      }
      scheduleFromScroll();
    }
    function onActivity() {
      if (!dismissed) return;
      armIdle();
    }

    if (window.scrollY > 0) scheduleFromScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    const activity = ['pointermove', 'keydown', 'touchstart', 'wheel'] as const;
    for (const name of activity) window.addEventListener(name, onActivity, {passive: true});

    return () => {
      clearScroll();
      clearIdle();
      closeRef.current = () => {};
      window.removeEventListener('scroll', onScroll);
      for (const name of activity) window.removeEventListener(name, onActivity);
    };
  }, [path]);

  if (!visible) return null;
  return (
    <aside className="facebook-phone" aria-label="Stay in touch on Facebook">
      <div className="phone-earpiece" aria-hidden="true"/>
      <button className="phone-close" aria-label="Dismiss Facebook invitation" onClick={() => closeRef.current()}><X size={17}/></button>
      <div className="phone-facebook"><span className="facebook-letter" aria-hidden="true">f</span><MessageCircle size={16}/></div>
      <span className="phone-brand">JUWA3X · LET’S CONNECT</span>
      <h2>Follow the stories.<br/>Say hello.</h2>
      <p>Find us on Facebook or send a message when our page goes live.</p>
      <a href="/contact#facebook">Facebook · Coming soon <span aria-hidden="true">↗</span></a>
    </aside>
  );
}
