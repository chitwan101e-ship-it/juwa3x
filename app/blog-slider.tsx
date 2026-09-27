'use client';
import {useEffect,useRef,useState} from 'react';
import {ArrowRight,ArrowUpRight,ChevronLeft,ChevronRight} from 'lucide-react';
import type {Story} from './stories';

export function BlogSlider({articles}:{articles:Story[]}){
 const track=useRef<HTMLDivElement>(null);
 const [index,setIndex]=useState(0);
 const [atStart,setAtStart]=useState(true);
 const [atEnd,setAtEnd]=useState(false);
 const key=articles.map(a=>a.slug).join('|');
 useEffect(()=>{track.current?.scrollTo({left:0})},[key]);
 useEffect(()=>{
  const el=track.current;
  if(!el) return;
  const update=()=>{
   const max=el.scrollWidth-el.clientWidth;
   const card=el.querySelector<HTMLElement>('.journal-slide');
   const size=(card?.offsetWidth||1)+18;
   setAtStart(el.scrollLeft<=4);
   setAtEnd(max<=4||el.scrollLeft>=max-4);
   setIndex(Math.min(Math.max(articles.length-1,0),Math.round(el.scrollLeft/size)));
  };
  update();
  el.addEventListener('scroll',update,{passive:true});
  const observer=new ResizeObserver(update);
  observer.observe(el);
  return()=>{el.removeEventListener('scroll',update);observer.disconnect()};
 },[key,articles.length]);
 function step(){
  const el=track.current;
  const card=el?.querySelector<HTMLElement>('.journal-slide');
  return (card?.offsetWidth||280)+18;
 }
 function go(dir:number){track.current?.scrollBy({left:dir*step(),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}
 function goTo(i:number){track.current?.scrollTo({left:i*step(),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}
 return <div className="journal-slider">
  <div className="journal-toolbar">
   <p>Slide through the Juwa777 guides</p>
   <div>
    <button type="button" aria-label="Previous Juwa777 story" onClick={()=>go(-1)} disabled={atStart}><ChevronLeft size={18}/></button>
    <button type="button" aria-label="Next Juwa777 story" onClick={()=>go(1)} disabled={atEnd}><ChevronRight size={18}/></button>
   </div>
  </div>
  <div className="journal-track" ref={track} tabIndex={0} aria-label="Juwa777 blog stories">
   {articles.map(a=><a href={'/journal/'+a.slug} key={a.slug} className={'story journal-slide'+(a.slug==='character-design'?' characters-slide':'')}>
    <div className={'story-image '+(a.slug==='character-design'?'characters-image':'')}><img src={a.image} alt={a.alt} loading="lazy"/><span className="image-arrow"><ArrowUpRight/></span></div>
    <div className="story-copy"><p className="eyebrow">{a.category} / {a.read} MIN READ</p><h3>{a.title}</h3><p>{a.description}</p><span className="read-link">Read the Juwa777 guide <ArrowRight size={17}/></span></div>
   </a>)}
  </div>
  <div className="journal-dots" role="tablist" aria-label="Juwa777 story position">
   {articles.map((a,i)=><button key={a.slug} type="button" role="tab" aria-selected={i===index} aria-label={'Show '+a.title} className={i===index?'on':''} onClick={()=>goTo(i)}/>)}
  </div>
 </div>;
}
