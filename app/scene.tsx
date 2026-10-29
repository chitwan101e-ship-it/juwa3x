'use client';
import {useEffect,useRef,useState} from 'react';
import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
export default function ArcadeScene({active,roll,outcome='spark',onComplete}:{active:boolean;roll:number;outcome?:string;onComplete:()=>void}){
 const complete=useRef(onComplete);useEffect(()=>{complete.current=onComplete},[onComplete]);
 const holder=useRef<HTMLDivElement>(null),running=useRef(active),sequence=useRef(roll),outcomeRef=useRef(outcome);const [ready,setReady]=useState(false);
 useEffect(()=>{outcomeRef.current=outcome},[outcome]);
 useEffect(()=>{if(!ready&&roll>0&&active){const timer=setTimeout(()=>complete.current(),4400);return()=>clearTimeout(timer)}},[ready,roll,active]);
 useEffect(()=>{running.current=active},[active]);useEffect(()=>{sequence.current=roll},[roll]);
 useEffect(()=>{const el=holder.current;if(!el)return;let renderer:THREE.WebGLRenderer;
 try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'})}catch{return}
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.3;el.appendChild(renderer.domElement);renderer.domElement.setAttribute('aria-hidden','true');
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(35,1,.1,100);camera.position.set(0,1.4,8.8);camera.lookAt(0,0,0);const group=new THREE.Group();scene.add(group);group.rotation.set(.06,-.22,-.04);
 scene.add(new THREE.HemisphereLight(0xffe9c4,0x281323,3));const key=new THREE.DirectionalLight(0xffe6b2,5);key.position.set(-3,5,4);scene.add(key);const rim=new THREE.DirectionalLight(0xff3355,4);rim.position.set(4,2,1);scene.add(rim);const fill=new THREE.DirectionalLight(0xbfbaff,2);fill.position.set(-3,0,-1);scene.add(fill);
 const gold=new THREE.MeshStandardMaterial({color:0xe5b967,metalness:.78,roughness:.25}),red=new THREE.MeshStandardMaterial({color:0x6c0826,metalness:.55,roughness:.3}),black=new THREE.MeshStandardMaterial({color:0x140f16,metalness:.4,roughness:.28});const textures:THREE.Texture[]=[];
 function box(w:number,h:number,d:number,material:THREE.Material,x:number,y:number,z:number,r=.08){const mesh=new THREE.Mesh(new RoundedBoxGeometry(w,h,d,4,r),material);mesh.position.set(x,y,z);group.add(mesh);return mesh}
 box(3.05,2.18,.85,gold,0,.25,0,.16);box(2.88,2.02,.91,red,0,.25,.02,.14);box(2.7,1.35,.13,gold,0,.24,.54,.08);box(2.57,1.21,.13,black,0,.24,.62,.05);box(3.15,.26,1.03,gold,0,-.94,.06,.08);box(2.85,.12,.9,black,0,-1.1,.06,.04);
 function label(text:string,width:number,height:number,x:number,y:number,z:number){const c=document.createElement('canvas');c.width=1024;c.height=256;const ctx=c.getContext('2d')!;ctx.fillStyle='#eaca86';ctx.font='600 100px Georgia';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,512,128);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;textures.push(t);const m=new THREE.Mesh(new THREE.PlaneGeometry(width,height),new THREE.MeshBasicMaterial({map:t,transparent:true}));m.position.set(x,y,z);group.add(m)}
 label('JUWA3X',2.04,.43,0,1.04,.51);label('THE JUWA JOURNAL',1.55,.25,0,-.62,.52);
 const reels:THREE.Mesh[]=[];
 for(let j=0;j<3;j++){const c=document.createElement('canvas');c.width=256;c.height=1024;const ctx=c.getContext('2d')!;ctx.fillStyle='#f7eed9';ctx.fillRect(0,0,256,1024);['7','◆','★','♣'].forEach((symbol,i)=>{ctx.fillStyle=i%2?'#211820':'#ae1737';ctx.font='bold 150px Georgia';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(symbol,128,i*256+128)});const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapT=THREE.RepeatWrapping;t.repeat.set(1,.25);t.offset.y=j*.25;textures.push(t);
 // Curved reel strips retain depth while the texture slides across each drum.
 const geometry=new THREE.PlaneGeometry(.73,1.12,1,32);const positions=geometry.attributes.position;for(let k=0;k<positions.count;k++){const y=positions.getY(k);positions.setZ(k,Math.sqrt(.36-y*y))}geometry.computeVertexNormals();const m=new THREE.Mesh(geometry,new THREE.MeshStandardMaterial({map:t,roughness:.36,metalness:.12,side:THREE.DoubleSide})); m.position.set((j-1)*.84,.23,.67);group.add(m);reels.push(m)}
 const streaks:THREE.Mesh[]=[],locks:THREE.Mesh[]=[];{const c=document.createElement('canvas');c.width=64;c.height=256;const ctx=c.getContext('2d')!;const g=ctx.createLinearGradient(0,0,0,256);g.addColorStop(0,'rgba(255,244,220,0)');g.addColorStop(.45,'rgba(255,244,220,.95)');g.addColorStop(1,'rgba(255,244,220,0)');ctx.fillStyle=g;ctx.fillRect(0,0,64,256);const streakMap=new THREE.CanvasTexture(c);streakMap.colorSpace=THREE.SRGBColorSpace;textures.push(streakMap);reels.forEach(reel=>{const blur=new THREE.Mesh(new THREE.PlaneGeometry(.7,1.02),new THREE.MeshBasicMaterial({map:streakMap,transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending}));blur.position.copy(reel.position);blur.position.z+=.05;group.add(blur);streaks.push(blur);const glow=new THREE.Mesh(new THREE.PlaneGeometry(.8,1.18),new THREE.MeshBasicMaterial({color:0xffd56a,transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending}));glow.position.copy(reel.position);glow.position.z+=.09;group.add(glow);locks.push(glow)})}
 // Thin gold separators sit in front of the moving reel surfaces.
 [-.42,.42].forEach(x=>box(.045,1.18,.06,gold,x,.24,1.2,.015));
 const bulbs:THREE.Mesh[]=[];for(let i=0;i<14;i++){const mat=new THREE.MeshStandardMaterial({color:0xffdda0,emissive:0xffba42,emissiveIntensity:1});const b=new THREE.Mesh(new THREE.SphereGeometry(.035,10,8),mat);b.position.set(-1.28+i*.197,1.34,.27);group.add(b);bulbs.push(b)}for(let i=0;i<12;i++){const mat=new THREE.MeshStandardMaterial({color:0xffdda0,emissive:0xffba42,emissiveIntensity:.8});const b=new THREE.Mesh(new THREE.SphereGeometry(.028,8,6),mat);b.position.set(-1.15+i*.209,-.42,.72);group.add(b);bulbs.push(b)}
 const sparkCount=72,sparkPos=new Float32Array(sparkCount*3),sparkVel=Array.from({length:sparkCount},()=>({x:0,y:0,z:0}));const sparkGeo=new THREE.BufferGeometry();sparkGeo.setAttribute('position',new THREE.BufferAttribute(sparkPos,3));const sparkMat=new THREE.PointsMaterial({color:0xffe29a,size:.14,transparent:true,opacity:0,depthWrite:false,sizeAttenuation:true});const sparks=new THREE.Points(sparkGeo,sparkMat);sparks.position.set(0,.35,1.15);group.add(sparks);let sparkLife=0;
 const coinGeo=new THREE.CylinderGeometry(.062,.062,.015,14),coinMat=new THREE.MeshStandardMaterial({color:0xffe29a,metalness:.86,roughness:.2,emissive:0xc48a2a,emissiveIntensity:.45});const coins:THREE.Mesh[]=[],coinState=Array.from({length:18},()=>({x:0,y:0,z:0,vx:0,vy:0,vz:0,vr:0,life:0}));for(let i=0;i<18;i++){const c=new THREE.Mesh(coinGeo,coinMat);c.visible=false;group.add(c);coins.push(c)}
 const ring=new THREE.Mesh(new THREE.RingGeometry(.18,.25,48),new THREE.MeshBasicMaterial({color:0xffe29a,transparent:true,opacity:0,side:THREE.DoubleSide,depthWrite:false}));ring.position.set(0,.3,1.28);group.add(ring);let ringLife=0;
 const winLight=new THREE.PointLight(0xffd56a,0,7);winLight.position.set(0,.25,2.4);scene.add(winLight);
 const dice:THREE.Group[]=[];const pipGeo=new THREE.SphereGeometry(.045,12,8),pipMat=new THREE.MeshStandardMaterial({color:0x38121b,roughness:.4});
 const dots=[[[0,0]],[[-1,-1],[1,1]],[[-1,-1],[0,0],[1,1]],[[-1,-1],[1,-1],[-1,1],[1,1]],[[-1,-1],[1,-1],[0,0],[-1,1],[1,1]],[[-1,-1],[1,-1],[-1,0],[1,0],[-1,1],[1,1]]];
 for(let d=0;d<2;d++){const die=new THREE.Group();const body=new THREE.Mesh(new RoundedBoxGeometry(.62,.62,.62,4,.075),new THREE.MeshStandardMaterial({color:d?0xeec477:0xf4ebda,metalness:d?.48:.12,roughness:.26}));die.add(body);for(let face=0;face<6;face++){const side=new THREE.Group();side.rotation.set(face===2?-Math.PI/2:face===3?Math.PI/2:0,face===0?0:face===1?Math.PI:face===4?Math.PI/2:face===5?-Math.PI/2:0,0);dots[face].forEach(([x,y])=>{const pip=new THREE.Mesh(pipGeo,pipMat);pip.scale.z=.2;pip.position.set(x*.15,y*.15,.31);side.add(pip)});die.add(side)}die.position.set(d?1.55:-1.55,-1.33,d?1.1:.9);group.add(die);dice.push(die)}
 const lever=new THREE.Group();const shaft=new THREE.Mesh(new THREE.CylinderGeometry(.032,.032,.95,10),gold);shaft.position.y=.2;lever.add(shaft);const knob=new THREE.Mesh(new THREE.SphereGeometry(.1,14,12),new THREE.MeshStandardMaterial({color:0xff3355,emissive:0x8a1230,emissiveIntensity:.55,metalness:.35,roughness:.32}));knob.position.y=.7;lever.add(knob);const collar=new THREE.Mesh(new THREE.CylinderGeometry(.075,.075,.08,10),gold);collar.position.y=-.28;lever.add(collar);lever.position.set(1.72,.02,.62);lever.rotation.z=.2;group.add(lever);
 const orbit=new THREE.Mesh(new THREE.TorusGeometry(2.14,.006,6,120),new THREE.MeshBasicMaterial({color:0xbd955d,transparent:true,opacity:.26}));orbit.rotation.set(1.1,.2,.2);orbit.position.y=-.3;scene.add(orbit);
 let frame=0,last=0,time=0,elapsed=0,seen=sequence.current,reported=0,mx=0,my=0,spinning=false,burstSent=false;
 const stops=[1.15,1.9,2.7];
 const faceNormals=[new THREE.Vector3(0,0,1),new THREE.Vector3(0,0,-1),new THREE.Vector3(0,1,0),new THREE.Vector3(0,-1,0),new THREE.Vector3(1,0,0),new THREE.Vector3(-1,0,0)];
 const aim=new THREE.Vector3(),camLocal=new THREE.Vector3(),qTarget=new THREE.Quaternion(),qSpin=new THREE.Quaternion(),spinAxis=new THREE.Vector3(.35,1,.15).normalize();
 let plan:{symbols:number[];faces:number[];travel:number[];start:number[];from:number[][]}|null=null;
 function symbolOffset(symbol:number){return (0.75-symbol*.25+1)%1}
 function travelFor(start:number,symbol:number,turns:number){const desired=symbolOffset(symbol);let frac=start%1;if(frac<0)frac+=1;let delta=desired-frac;if(delta<.04)delta+=1;return turns+delta}
 function reelEase(p:number){if(p>=1)return 1;if(p<=.7)return (1-Math.pow(1-p/.7,2.15))*.86;const t=(p-.7)/.3;return .86+.14*(1-Math.pow(1-t,3))+Math.sin(t*Math.PI)*.055*(1-t)}
 function scheme(kind:string){if(kind==='jackpot')return {symbols:[0,0,0],faces:[5,5]};if(kind==='pair')return {symbols:[2,2,1],faces:[1,1]};if(kind==='dice')return {symbols:[1,3,0],faces:[0,5]};return {symbols:[0,0,1],faces:[2,4]}}
 function beginSpin(){const next=scheme(outcomeRef.current);const start=reels.map(r=>(r.material as THREE.MeshStandardMaterial).map!.offset.y);plan={symbols:next.symbols,faces:next.faces,start,travel:start.map((value,i)=>travelFor(value,next.symbols[i],5+i*2)),from:dice.map(d=>[d.rotation.x,d.rotation.y,d.rotation.z])};burstSent=false;sparkLife=0;sparkMat.opacity=0;ringLife=0;(ring.material as THREE.MeshBasicMaterial).opacity=0;coinState.forEach(s=>{s.life=0});coins.forEach(c=>{c.visible=false});winLight.color.setHex(0xffd56a)}
 const resize=()=>{const w=el.clientWidth,h=el.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.position.z=camera.aspect<1?10:8.8;camera.updateProjectionMatrix();renderer.render(scene,camera)};const observer=new ResizeObserver(resize);observer.observe(el);resize();const move=(e:PointerEvent)=>{const r=el.getBoundingClientRect();mx=(e.clientX-r.left)/r.width-.5;my=(e.clientY-r.top)/r.height-.5};el.addEventListener('pointermove',move);renderer.domElement.addEventListener('webglcontextlost',lost);
 function lost(e:Event){e.preventDefault();setReady(false)}
 const render=(now:number)=>{
  const dt=Math.min((now-last)/1000,.04);last=now;
  if(seen!==sequence.current){seen=sequence.current;elapsed=0;if(seen>0){spinning=true;beginSpin()}}
  if(running.current&&!document.hidden){
   time+=dt;elapsed+=dt;orbit.rotation.z+=dt*(spinning?0.85:.18);
   const sway=spinning?Math.sin(elapsed*7)*Math.max(0,1-elapsed/2.6)*.2:0;
   group.rotation.y+=(-.22+mx*.15+sway-group.rotation.y)*.1;
   group.rotation.x+=(.06+my*.08-group.rotation.x)*.05;
   group.position.y=Math.sin(time*.65)*.045;
   const baseZ=camera.aspect<1?10:8.8,punch=spinning?Math.sin(Math.min(elapsed/2.6,1)*Math.PI):0;
   camera.position.z=baseZ-punch*.95;camera.position.y=1.4+punch*.12;
   if(!(spinning&&outcomeRef.current==='jackpot'&&elapsed>stops[2]))camera.position.x+=(0-camera.position.x)*.12;
   if(spinning&&plan){
    const kind=outcomeRef.current;
    reels.forEach((reel,i)=>{const mat=reel.material as THREE.MeshStandardMaterial;const p=Math.min(elapsed/stops[i],1);let tease=0;if(kind==='spark'&&i===2&&p>.9&&p<1){const u=(p-.9)/.1;tease=Math.sin(u*Math.PI)*.25}mat.map!.offset.y=plan!.start[i]+reelEase(p)*plan!.travel[i]+tease;const blur=streaks[i].material as THREE.MeshBasicMaterial;blur.opacity=(1-p)*.7;const since=elapsed-stops[i];let flash=since>0&&since<.5?Math.sin(since/.5*Math.PI):0;if(kind==='jackpot'&&since>0)flash=Math.max(flash,.28+.22*Math.sin(elapsed*14+i));if(kind==='pair'&&i<2&&since>0)flash=Math.max(flash,.22+.16*Math.sin(elapsed*8));if(kind==='spark'&&i===2&&since>0&&since<1.1)flash=Math.max(flash,.18);const glow=locks[i].material as THREE.MeshBasicMaterial;glow.color.setHex(kind==='dice'?0x9ad8c8:kind==='spark'?0xe7c6ff:0xffd56a);glow.opacity=flash*.85});
    dice.forEach((die,i)=>{const p=Math.min(elapsed/(2.15+i*.28),1),ease=1-Math.pow(1-p,3),turns=(kind==='dice'?4:2)+i;camLocal.copy(camera.position);group.worldToLocal(camLocal);aim.copy(camLocal).sub(die.position).normalize();qTarget.setFromUnitVectors(faceNormals[plan!.faces[i]],aim);qSpin.setFromAxisAngle(spinAxis,(1-ease)*Math.PI*2*turns);die.quaternion.copy(qSpin).multiply(qTarget);const bounce=p>.78&&p<1?Math.sin((p-.78)/.22*Math.PI):0;die.position.y=-1.33+Math.sin(p*Math.PI)*(kind==='dice'?2.05:1.45)+bounce*.2;die.scale.set(1+bounce*.14,1-bounce*.22,1+bounce*.14);const body=(die.children[0] as THREE.Mesh).material as THREE.MeshStandardMaterial;if(kind==='dice'&&elapsed>stops[2]){body.emissive.setHex(0x9ad8c8);body.emissiveIntensity=1.3*Math.max(0,1-(elapsed-stops[2])/1.4)}else{body.emissive.setHex(0x000000);body.emissiveIntensity=0}});
    const pull=Math.min(elapsed/.22,1),back=elapsed>.5?Math.min((elapsed-.5)/.34,1):0,wobble=elapsed>.22&&elapsed<1?Math.sin((elapsed-.22)*18)*Math.exp(-(elapsed-.22)*6)*.45:0;lever.rotation.z=.2-pull*(1-back)*1.25+wobble;
    const chase=Math.floor(time*22)%bulbs.length;
    bulbs.forEach((b,i)=>{const mat=b.material as THREE.MeshStandardMaterial;mat.emissive.setHex(0xffba42);mat.emissiveIntensity=i===chase||i===(chase+1)%bulbs.length?3.1:.1});
    if(elapsed>=stops[2]&&!burstSent){burstSent=true;const power=kind==='jackpot'?3.4:kind==='pair'?1.9:kind==='dice'?1.6:.75;sparkMat.color.setHex(kind==='dice'?0xb7ffe8:kind==='spark'?0xe7c6ff:0xffe29a);sparkMat.size=kind==='jackpot'?0.22:.14;sparkLife=1;for(let i=0;i<sparkCount;i++){sparkPos[i*3]=(Math.random()-.5)*1.6;sparkPos[i*3+1]=(Math.random()-.5)*.35;sparkPos[i*3+2]=(Math.random()-.5)*.2;sparkVel[i]={x:(Math.random()-.5)*power,y:.45+Math.random()*power,z:(Math.random()-.5)*.4}}sparkGeo.attributes.position.needsUpdate=true;ringLife=1;(ring.material as THREE.MeshBasicMaterial).color.setHex(kind==='dice'?0x9ad8c8:kind==='spark'?0xe7c6ff:0xffe29a);const n=kind==='jackpot'?18:kind==='pair'?10:kind==='dice'?8:4;for(let i=0;i<18;i++){if(i<n){coinState[i]={x:(Math.random()-.5)*.9,y:.1,z:(Math.random()-.5)*.2,vx:(Math.random()-.5)*power*.6,vy:.9+Math.random()*power*.65,vz:(Math.random()-.5)*.25,vr:(Math.random()-.5)*10,life:1};coins[i].visible=true}else coinState[i].life=0}}
    const winT=elapsed-stops[2];
    if(winT>0){const fade=Math.max(0,1-winT/1.45);
     if(kind==='jackpot'){const flash=Math.sin(winT*28)>0?3.4:.35;bulbs.forEach(b=>{const mat=b.material as THREE.MeshStandardMaterial;mat.emissive.setHex(0xfff1c2);mat.emissiveIntensity=flash});winLight.color.setHex(0xfff1c2);winLight.intensity=9*fade;group.position.x=Math.sin(elapsed*54)*.05*fade;camera.position.x=Math.sin(elapsed*46)*.07*fade}
     else if(kind==='pair'){bulbs.forEach((b,i)=>{const mat=b.material as THREE.MeshStandardMaterial;mat.emissive.setHex(0xffd56a);mat.emissiveIntensity=.8+Math.sin(winT*9+i)*.9});winLight.color.setHex(0xffd56a);winLight.intensity=4.2*fade;group.position.x=0}
     else if(kind==='dice'){bulbs.forEach((b,i)=>{const mat=b.material as THREE.MeshStandardMaterial;mat.emissive.setHex(i%2?0x9ad8c8:0xffd56a);mat.emissiveIntensity=1.3+Math.sin(winT*7+i)*.7});winLight.color.setHex(0x9ad8c8);winLight.intensity=3.4*fade;group.position.x=0}
     else{bulbs.forEach((b,i)=>{const mat=b.material as THREE.MeshStandardMaterial;mat.emissive.setHex(0xe7c6ff);mat.emissiveIntensity=.55+Math.sin(winT*5+i)*.4});winLight.color.setHex(0xe7c6ff);winLight.intensity=1.6*fade;group.position.x=0}
    }else{winLight.intensity=0;group.position.x=0}
    if(seen>reported&&elapsed>=4.25){reported=seen;spinning=false;complete.current()}
   }else{
    group.position.x=0;winLight.intensity=0;lever.rotation.z+=(.2-lever.rotation.z)*.08;
    streaks.forEach(s=>{(s.material as THREE.MeshBasicMaterial).opacity=0});locks.forEach(s=>{(s.material as THREE.MeshBasicMaterial).opacity=0});
    dice.forEach(die=>{die.scale.set(1,1,1);const body=(die.children[0] as THREE.Mesh).material as THREE.MeshStandardMaterial;body.emissive.setHex(0x000000);body.emissiveIntensity=0});
    if(!plan)dice.forEach((die,i)=>{die.rotation.y=.5+Math.sin(time*.7+i)*.12;die.rotation.x=.4+Math.sin(time*.5)*.04;die.position.y=-1.33+Math.sin(time*.65+i)*.04});
    bulbs.forEach((b,i)=>{const mat=b.material as THREE.MeshStandardMaterial;mat.emissive.setHex(0xffba42);mat.emissiveIntensity=.5+.45*Math.sin(time*3+i*.4)});
   }
   if(sparkLife>0){sparkLife=Math.max(0,sparkLife-dt*.55);sparkMat.opacity=sparkLife;for(let i=0;i<sparkCount;i++){sparkVel[i].y-=dt*1.6;sparkPos[i*3]+=sparkVel[i].x*dt;sparkPos[i*3+1]+=sparkVel[i].y*dt;sparkPos[i*3+2]+=sparkVel[i].z*dt}sparkGeo.attributes.position.needsUpdate=true}
   if(ringLife>0){ringLife=Math.max(0,ringLife-dt*.7);ring.scale.setScalar(.35+(1-ringLife)*3.4);(ring.material as THREE.MeshBasicMaterial).opacity=ringLife*.85}
   coinState.forEach((s,i)=>{if(s.life<=0){coins[i].visible=false;return}s.life=Math.max(0,s.life-dt*.42);s.vy-=dt*2.5;s.x+=s.vx*dt;s.y+=s.vy*dt;s.z+=s.vz*dt;const c=coins[i];c.visible=s.y>-.2;c.position.set(s.x,s.y+.32,1.22+s.z);c.rotation.x+=s.vr*dt;c.rotation.z+=dt*6;c.scale.setScalar(.55+.45*s.life)});
   renderer.render(scene,camera);
  }
  frame=requestAnimationFrame(render);
 };
 // Show a coherent still frame before animation starts, including reduced-motion mode.
 dice.forEach(d=>d.rotation.set(.4,.5,.2));renderer.render(scene,camera);setReady(true);frame=requestAnimationFrame(render);
 return()=>{cancelAnimationFrame(frame);observer.disconnect();el.removeEventListener('pointermove',move);renderer.domElement.removeEventListener('webglcontextlost',lost);scene.traverse(o=>{if(o instanceof THREE.Mesh){o.geometry.dispose();const mats=Array.isArray(o.material)?o.material:[o.material];mats.forEach(m=>m.dispose())}});sparkGeo.dispose();sparkMat.dispose();textures.forEach(t=>t.dispose());renderer.dispose();renderer.domElement.remove()};
 },[]);
 return <div ref={holder} className="three-scene" role="img" aria-label="Decorative three-reel machine and rolling dice">{!ready&&<div className="scene-fallback"><img src="/art/arcade-portal.webp" alt="Chrome dice in an illuminated arcade portal"/></div>}</div>
}
