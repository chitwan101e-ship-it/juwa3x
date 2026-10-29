'use client';
import {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import {X} from 'lucide-react';

const storageKey = 'juwa3x-trivia-closed';
const triviaEnds = new Date(2026, 9, 1);
const letters = ['A', 'B', 'C'];

const questions = [
  {
    prompt: 'Are Juwa, Juwa777, and Juwa 777 the same app?',
    choices: ['Yes. They are names for the same app.', 'No. They are three different apps.', 'Only the name Juwa 777 is an app.'],
    answer: 0,
  },
  {
    prompt: 'Which games does Juwa777 include?',
    choices: ['Slots, fish shooting games, and keno', 'Only poker tables', 'Only sports betting'],
    answer: 0,
  },
  {
    prompt: 'How many Juwa777 game covers are on juwa3x.com?',
    choices: ['57 covers', '10 covers', '200 covers'],
    answer: 0,
  },
  {
    prompt: 'Who is Juwa777 for?',
    choices: ['Players 18 and older', 'Players 13 and older', 'There is no age limit'],
    answer: 0,
  },
];

function triviaStillRunning() {
  return new Date() < triviaEnds;
}

export default function TriviaPopup() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (!triviaStillRunning()) return;
    try {
      if (localStorage.getItem(storageKey) === '1') return;
    } catch {}
    const id = window.setTimeout(() => {
      try { localStorage.setItem(storageKey, '1'); } catch {}
      setOpen(true);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  function close() {
    if (timer.current) window.clearTimeout(timer.current);
    try { localStorage.setItem(storageKey, '1'); } catch {}
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') close();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  function choose(index: number) {
    setPicked(index);
    if (timer.current) window.clearTimeout(timer.current);
    if (index !== questions[step].answer) return;
    timer.current = window.setTimeout(() => {
      setPicked(null);
      setStep(current => current + 1);
    }, 280);
  }

  function back() {
    if (timer.current) window.clearTimeout(timer.current);
    setPicked(null);
    setStep(current => Math.max(0, current - 1));
  }

  if (!open || !triviaStillRunning()) return null;
  const finished = step >= questions.length;
  const question = questions[step];

  return (
    <div className="trivia-overlay">
      <div className="trivia-dialog" role="dialog" aria-modal="true" aria-labelledby="trivia-title">
        <button className="trivia-close" type="button" aria-label="Close trivia" onClick={close}><X size={18}/></button>
        <p className="eyebrow">JUWA777 TRIVIA</p>
        <p className="trivia-expire">Trivia expires on October 1, 2026.</p>
        <h2 id="trivia-title">{finished ? 'You finished the trivia.' : 'Participate in trivia and get qualified for $3 credits'}</h2>
        {finished ? (
          <p>You answered all 4 Juwa777 questions. This quiz is for fun on juwa3x.com. It does not add $3 to a Juwa777 account, and it is not cash you can withdraw. Entertainment only. 18+.</p>
        ) : (
          <>
            <p className="trivia-progress">Question {step + 1} of {questions.length}</p>
            <p className="trivia-prompt">{question.prompt}</p>
            <div className="trivia-options">
              {question.choices.map((choice, index) => (
                <button key={choice} type="button" className={picked === index ? (index === question.answer ? 'right' : 'wrong') : ''} onClick={() => choose(index)}>
                  <span className="trivia-letter">{letters[index]}</span>
                  <span>{choice}</span>
                </button>
              ))}
            </div>
            {picked !== null && picked !== question.answer && <p className="trivia-note">Not quite. Pick another answer.</p>}
            <p className="trivia-note">The $3 is a quiz label on juwa3x.com. It is not cash, and this site cannot add credit to a Juwa777 account. 18+.</p>
          </>
        )}
        <div className="trivia-links">
          {step > 0 ? <button className="trivia-back" type="button" onClick={back}>Back</button> : <span/>}
          <Link href="/faq">Read the Juwa777 FAQ</Link>
        </div>
      </div>
    </div>
  );
}
