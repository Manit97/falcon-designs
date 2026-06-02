"use client";

import { useEffect, useRef, useState } from "react";
import type { BufferAttribute as ThreeBufferAttr } from "three";

/* ─────────────────────────────────────────────────────────────────
   GLSL — Fluid hero shader
────────────────────────────────────────────────────────────────── */
const FLUID_VERT = `void main(){gl_Position=vec4(position.xy,0.,1.);}`;

const FLUID_FRAG = `
precision highp float;
uniform float uTime;
uniform vec2  uMouse;
uniform vec2  uRes;

vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec2 mod289(vec2 x){return x-floor(x*(1./289.))*289.;}
vec3 permute(vec3 x){return mod289(((x*34.)+1.)*x);}
float snoise(vec2 v){
  const vec4 C=vec4(.211324865,.366025404,-.577350270,.024390244);
  vec2 i=floor(v+dot(v,C.yy));
  vec2 x0=v-i+dot(i,C.xx);
  vec2 i1=x0.x>x0.y?vec2(1.,0.):vec2(0.,1.);
  vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1;
  i=mod289(i);
  vec3 p=permute(permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
  vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);
  m=m*m;m=m*m;
  vec3 x=2.*fract(p*C.www)-1.,h=abs(x)-.5,ox=floor(x+.5),a0=x-ox;
  m*=1.79284291-.85373472*(a0*a0+h*h);
  vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.*dot(m,g);
}
vec2 curl(vec2 p,float t){
  float e=.008;
  float a=snoise(vec2(p.x,p.y+e)+t)-snoise(vec2(p.x,p.y-e)+t);
  float b=snoise(vec2(p.x+e,p.y)+t)-snoise(vec2(p.x-e,p.y)+t);
  return vec2(a,-b)/(2.*e);
}
void main(){
  vec2 uv=gl_FragCoord.xy/uRes;
  float asp=uRes.x/uRes.y;
  vec2 p=vec2(uv.x*asp,uv.y);
  float t=uTime*.14;
  vec2 f1=curl(p*1.2,t);
  vec2 f2=curl(p*2.7+f1*.55,t*.72);
  vec2 f3=curl(p*5.8+f2*.38,t*1.25);
  vec2 flow=f1*.5+f2*.32+f3*.18;
  vec2 uvd=p+flow*.18;
  vec2 mp=vec2(uMouse.x*asp,uMouse.y);
  float md=distance(p,mp);
  float ripple=sin(md*30.-uTime*5.)*smoothstep(.45,.0,md)*.07;
  uvd+=normalize(p-mp+.0001)*ripple;
  float c1=snoise(uvd*2.1+t*.32)*.5+.5;
  float c2=snoise(uvd*4.4-t*.22+3.7)*.5+.5;
  float c3=snoise(uvd*8.2+t*.17+7.3)*.5+.5;
  vec3 c0=vec3(.01,.01,.06);
  vec3 cn=vec3(.03,.04,.24);
  vec3 cv=vec3(.20,.08,.55);
  vec3 cg=vec3(.72,.54,.16);
  vec3 cc=vec3(.02,.55,.82);
  vec3 col=mix(c0,cn,smoothstep(.0,.42,c1));
  col=mix(col,cv,smoothstep(.40,.76,c2)*.88);
  col=mix(col,cg,pow(c3,4.)*.48);
  col=mix(col,cc,smoothstep(.0,.35,md)*pow(c2,3.)*.32);
  vec2 vc=uv*2.-1.;
  col*=.3+.7*clamp(1.-dot(vc*.65,vc*.65),0.,1.);
  gl_FragColor=vec4(col,1.);
}`;

/* ── Particle shaders ── */
const PART_VERT = `
uniform float uSize;
attribute float aScale;
attribute vec3  aColor;
varying vec3 vColor;
void main(){
  vColor=aColor;
  vec4 mv=modelViewMatrix*vec4(position,1.);
  gl_PointSize=uSize*aScale*(240./-mv.z);
  gl_Position=projectionMatrix*mv;
}`;

const PART_FRAG = `
varying vec3 vColor;
void main(){
  float r=length(gl_PointCoord-.5);
  if(r>.5)discard;
  float a=1.-smoothstep(.22,.5,r);
  gl_FragColor=vec4(vColor,a*.92);
}`;

/* ─────────────────────────────────────────────────────────────────
   Design tokens
────────────────────────────────────────────────────────────────── */
const D = {
  bg:     "#050510",
  fg:     "#e8e4fc",
  violet: "#6c63ff",
  gold:   "#c8b887",
  dim:    "rgba(232,228,252,0.55)",
  muted:  "rgba(232,228,252,0.30)",
  border: "rgba(232,228,252,0.08)",
  card:   "#0a0a1f",
  navBg:  "rgba(5,5,16,0.94)",
};

/* ─────────────────────────────────────────────────────────────────
   Global CSS
────────────────────────────────────────────────────────────────── */
const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { overflow-x: hidden; cursor: none !important; background: #050510; }
  a, button { cursor: none !important; }

  /* Cursor */
  #fx-ring {
    position:fixed; top:0; left:0; z-index:9998; pointer-events:none;
    width:36px; height:36px; border-radius:50%;
    border:1px solid rgba(232,228,252,0.4);
    display:flex; align-items:center; justify-content:center;
    will-change:transform;
    transition: width .22s cubic-bezier(.16,1,.3,1),
                height .22s cubic-bezier(.16,1,.3,1),
                border-color .22s ease, opacity .22s ease;
  }
  #fx-ring.h { width:58px; height:58px; border-color:#6c63ff; opacity:1; }
  #fx-dot {
    position:fixed; top:0; left:0; z-index:9999; pointer-events:none;
    width:4px; height:4px; border-radius:50%; background:#e8e4fc;
    will-change:transform; transition:opacity .15s;
  }
  #fx-dot.h { opacity:0; }
  #fx-lbl { font-family:'Courier New',monospace; font-size:7px; letter-spacing:.14em; color:#6c63ff; text-transform:uppercase; }

  /* Grain */
  #fx-grain {
    position:fixed; inset:0; z-index:9997; pointer-events:none;
    opacity:.028; mix-blend-mode:overlay;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat:repeat;
    animation:fxGrain .5s steps(2) infinite;
  }
  @keyframes fxGrain {
    0%{background-position:0 0} 25%{background-position:-10px 5px}
    50%{background-position:8px -6px} 75%{background-position:-5px 9px}
  }

  /* Loader */
  #fx-loader {
    position:fixed; inset:0; z-index:9000; background:#050510;
    display:flex; align-items:center; justify-content:center; flex-direction:column; gap:20px;
    transition:opacity .9s cubic-bezier(.16,1,.3,1), visibility .9s;
  }
  #fx-loader.done { opacity:0; visibility:hidden; pointer-events:none; }
  #fx-track { width:140px; height:1px; background:rgba(232,228,252,.08); position:relative; overflow:hidden; }
  #fx-bar { position:absolute; inset:0; background:#6c63ff; transform:scaleX(0); transform-origin:left;
    animation:fxLoad 2.1s cubic-bezier(.16,1,.3,1) forwards; }
  @keyframes fxLoad { to { transform:scaleX(1) } }

  /* Nav */
  #fx-nav { transition:background .5s ease, backdrop-filter .5s ease, border-color .5s ease; }

  /* Hero canvas */
  #fx-hero-canvas { position:absolute; inset:0; width:100%; height:100%; display:block; }

  /* Tilt wrapper */
  #fx-tilt { transition:transform .05s linear; transform-style:preserve-3d; will-change:transform; }

  /* Marquee */
  @keyframes fxMarquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  .fx-marquee { animation:fxMarquee 24s linear infinite; will-change:transform; }

  /* Scan lines on hero */
  #fx-scanlines {
    position:absolute; inset:0; pointer-events:none; z-index:2;
    background:repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(5,5,16,.12) 2px, rgba(5,5,16,.12) 4px);
  }

  /* Particle canvas */
  #fx-part-canvas { display:block; width:100%; height:100%; }

  /* Capability card hover */
  .fx-cap:hover { border-color:rgba(108,99,255,.35) !important; background:#0a0a1f !important; }

  /* Modal */
  #fx-modal {
    position:fixed; inset:0; z-index:8000;
    background:rgba(0,0,0,.97); backdrop-filter:blur(10px);
    display:flex; align-items:center; justify-content:center;
    opacity:0; visibility:hidden; pointer-events:none;
    transition:opacity .4s ease, visibility .4s;
  }
  #fx-modal.open { opacity:1; visibility:visible; pointer-events:auto; }

  /* Clip for hero title */
  .fx-clip { overflow:hidden; padding-bottom:.08em; }

  @media(max-width:768px){ .fx-nav-links{display:none!important;} }
`;

/* ─────────────────────────────────────────────────────────────────
   Capabilities data
────────────────────────────────────────────────────────────────── */
const CAPS = [
  { n:"01", title:"WebGL Rendering",    body:"GPU-accelerated visuals at 60fps. Custom GLSL shaders, particle systems, and real-time post-processing." },
  { n:"02", title:"Fluid Simulation",   body:"Curl-noise driven flow fields that respond to user input. Every interaction leaves a trace in the field." },
  { n:"03", title:"Particle Physics",   body:"Tens of thousands of particles with spring dynamics, repulsion forces, and elastic recovery." },
  { n:"04", title:"GSAP + Lenis",       body:"Frame-perfect scroll choreography. Every transition, reveal, and pin is orchestrated to the millisecond." },
  { n:"05", title:"SplitType Reveals",  body:"Text decomposed to characters. Each letter enters independently with expo easing and staggered timing." },
  { n:"06", title:"Mouse Parallax",     body:"The entire scene shifts with cursor position. CSS 3D perspective creates genuine depth without 3D models." },
];

/* ─────────────────────────────────────────────────────────────────
   Component
────────────────────────────────────────────────────────────────── */
export default function WebGLTemplate() {
  const [loaded,   setLoaded]   = useState(false);
  const [reelOpen, setReelOpen] = useState(false);

  const navRef         = useRef<HTMLElement>(null);
  const heroCanvasRef  = useRef<HTMLCanvasElement>(null);
  const partCanvasRef  = useRef<HTMLCanvasElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const partSectionRef = useRef<HTMLElement>(null);
  const tiltRef        = useRef<HTMLDivElement>(null);

  /* ── Loader ── */
  useEffect(() => {
    const t = setTimeout(() => {
      setLoaded(true);
      document.getElementById("fx-loader")?.classList.add("done");
    }, 2200);
    return () => clearTimeout(t);
  }, []);

  /* ── Cursor RAF ── */
  useEffect(() => {
    const ring = document.getElementById("fx-ring");
    const dot  = document.getElementById("fx-dot");
    if (!ring || !dot) return;
    let mx=-200, my=-200, rx=-200, ry=-200, id:number;
    const onMove = (e:MouseEvent) => { mx=e.clientX; my=e.clientY; };
    const tick = () => {
      rx+=(mx-rx)*.13; ry+=(my-ry)*.13;
      ring.style.transform=`translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;
      dot.style.transform =`translate3d(${mx}px,${my}px,0) translate(-50%,-50%)`;
      id=requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove, {passive:true});
    id=requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(id); };
  }, []);

  /* ── Mouse tilt on hero ── */
  useEffect(() => {
    const tilt = tiltRef.current;
    if (!tilt) return;
    const onMove = (e:MouseEvent) => {
      const x = (e.clientX/window.innerWidth  - .5) * 2;
      const y = (e.clientY/window.innerHeight - .5) * 2;
      tilt.style.transform = `perspective(1200px) rotateX(${-y*6}deg) rotateY(${x*6}deg)`;
    };
    window.addEventListener("mousemove", onMove, {passive:true});
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* ── Hero fluid WebGL ── */
  useEffect(() => {
    const canvas = heroCanvasRef.current;
    if (!canvas) return;
    let rafId:number, destroyed=false;

    (async () => {
      const THREE = await import("three");
      if (destroyed) return;

      const W = window.innerWidth, H = window.innerHeight;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias:false });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));

      const scene  = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1,1,1,-1,0,1);
      const geo    = new THREE.PlaneGeometry(2,2);
      const mouse  = new THREE.Vector2(.5,.5);

      const mat = new THREE.ShaderMaterial({
        uniforms: {
          uTime:  { value:0 },
          uMouse: { value:mouse },
          uRes:   { value:new THREE.Vector2(W,H) },
        },
        vertexShader:   FLUID_VERT,
        fragmentShader: FLUID_FRAG,
      });

      scene.add(new THREE.Mesh(geo, mat));

      const onMove = (e:MouseEvent) => {
        mouse.x = e.clientX/window.innerWidth;
        mouse.y = 1 - e.clientY/window.innerHeight;
      };
      window.addEventListener("mousemove", onMove, {passive:true});

      const onResize = () => {
        const W2=window.innerWidth, H2=window.innerHeight;
        renderer.setSize(W2,H2);
        mat.uniforms.uRes.value.set(W2,H2);
      };
      window.addEventListener("resize", onResize);

      const clock = new THREE.Clock();
      const animate = () => {
        mat.uniforms.uTime.value = clock.getElapsedTime();
        renderer.render(scene, camera);
        rafId = requestAnimationFrame(animate);
      };
      animate();

      // cleanup stored on destroyed
      (canvas as HTMLCanvasElement & { _cleanup?: () => void })._cleanup = () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("resize", onResize);
        renderer.dispose(); geo.dispose(); mat.dispose();
      };
    })();

    return () => {
      destroyed = true;
      const canvas2 = canvas as HTMLCanvasElement & { _cleanup?: () => void };
      canvas2._cleanup?.();
    };
  }, []);

  /* ── Particle system ── */
  useEffect(() => {
    const canvas = partCanvasRef.current;
    const section = partSectionRef.current;
    if (!canvas || !section) return;
    let rafId:number, destroyed=false;

    (async () => {
      const THREE = await import("three");
      if (destroyed) return;

      const W = canvas.offsetWidth, H = canvas.offsetHeight;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias:false, alpha:true });
      renderer.setSize(W, H, false);
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);

      const scene  = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, W/H, .1, 100);
      camera.position.z = 2.8;

      /* ── Sample "FLUX" text into particle positions ── */
      const offscreen = document.createElement("canvas");
      offscreen.width  = 700;
      offscreen.height = 160;
      const ctx = offscreen.getContext("2d")!;
      ctx.fillStyle = "white";
      ctx.font = "bold 140px 'Courier New', monospace";
      ctx.textAlign    = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("FLUX", 350, 80);

      const { data } = ctx.getImageData(0, 0, 700, 160);
      const stride = 4;
      const homeX:number[]=[], homeY:number[]=[];

      for (let py=0; py<160; py+=stride) {
        for (let px=0; px<700; px+=stride) {
          if (data[(py*700+px)*4+3] > 120) {
            homeX.push( (px/700 - .5)*4.6 );
            homeY.push(-(py/160 - .5)*1.05);
          }
        }
      }

      const N = homeX.length;
      const posArr   = new Float32Array(N*3);
      const colArr   = new Float32Array(N*3);
      const scaleArr = new Float32Array(N);
      // live physics arrays (CPU)
      const cx=new Float32Array(N), cy=new Float32Array(N);
      const vx=new Float32Array(N), vy=new Float32Array(N);

      // Scatter initial positions
      for (let i=0; i<N; i++) {
        cx[i] = (Math.random()-.5)*6;
        cy[i] = (Math.random()-.5)*3;
        scaleArr[i] = .4+Math.random()*.6;
        // default color: mid-violet
        colArr[i*3]   = .2 + Math.random()*.3;
        colArr[i*3+1] = .1 + Math.random()*.15;
        colArr[i*3+2] = .7 + Math.random()*.3;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(posArr, 3));
      geo.setAttribute("aColor",   new THREE.BufferAttribute(colArr,  3));
      geo.setAttribute("aScale",   new THREE.BufferAttribute(scaleArr,1));

      const mat = new THREE.ShaderMaterial({
        uniforms: { uSize:{ value:4.5 } },
        vertexShader:   PART_VERT,
        fragmentShader: PART_FRAG,
        transparent:    true,
        depthWrite:     false,
        blending:       THREE.AdditiveBlending,
      });

      const points = new THREE.Points(geo, mat);
      scene.add(points);

      /* mouse in world space */
      let mouseWX=0, mouseWY=0, isHovering=false;
      const onMove = (e:MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const nx = ((e.clientX - rect.left)/rect.width  - .5)*2;
        const ny = -((e.clientY - rect.top )/rect.height - .5)*2;
        // unproject at z=0
        const aspect = rect.width/rect.height;
        const fovRad = (60*Math.PI/180);
        const h = Math.tan(fovRad/2)*camera.position.z;
        mouseWX = nx * h * aspect;
        mouseWY = ny * h;
        isHovering = true;
      };
      const onLeave = () => { isHovering=false; };
      canvas.addEventListener("mousemove", onMove, {passive:true});
      canvas.addEventListener("mouseleave", onLeave);

      const posAttr  = geo.attributes.position as ThreeBufferAttr;
      const colAttr  = geo.attributes.aColor   as ThreeBufferAttr;
      const REPEL_R  = .55;
      const REPEL_F  = .018;
      const SPRING   = .055;
      const FRICTION = .88;

      const clock = new THREE.Clock();
      const animate = () => {
        rafId = requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        for (let i=0; i<N; i++) {
          // spring toward home
          vx[i] += (homeX[i]-cx[i])*SPRING;
          vy[i] += (homeY[i]-cy[i])*SPRING;

          // mouse repulsion
          if (isHovering) {
            const dx=cx[i]-mouseWX, dy=cy[i]-mouseWY;
            const d=Math.sqrt(dx*dx+dy*dy);
            if (d<REPEL_R && d>.0001) {
              const f=(REPEL_R-d)/REPEL_R;
              vx[i]+=(dx/d)*f*f*REPEL_F*60;
              vy[i]+=(dy/d)*f*f*REPEL_F*60;
            }
          }

          // friction
          vx[i]*=FRICTION; vy[i]*=FRICTION;
          cx[i]+=vx[i];    cy[i]+=vy[i];

          posArr[i*3]   = cx[i];
          posArr[i*3+1] = cy[i];
          posArr[i*3+2] = 0;

          // color based on speed
          const speed = Math.sqrt(vx[i]*vx[i]+vy[i]*vy[i]);
          const t = Math.min(speed*20, 1);
          // slow: deep violet → fast: cyan/white
          colArr[i*3]   = .2 + t*.75 + Math.sin(elapsed*.5+i*.01)*.05;
          colArr[i*3+1] = .08+ t*.8;
          colArr[i*3+2] = .8 + t*.2;
        }

        posAttr.needsUpdate = true;
        colAttr.needsUpdate = true;

        // slow rotation
        points.rotation.z = Math.sin(elapsed*.08)*.04;

        renderer.render(scene, camera);
      };
      animate();

      (canvas as HTMLCanvasElement & {_pclean?:()=>void})._pclean = () => {
        cancelAnimationFrame(rafId);
        canvas.removeEventListener("mousemove", onMove);
        canvas.removeEventListener("mouseleave", onLeave);
        renderer.dispose(); geo.dispose(); mat.dispose();
      };
    })();

    return () => {
      destroyed=true;
      (canvas as HTMLCanvasElement & {_pclean?:()=>void})._pclean?.();
    };
  }, []);

  /* ── GSAP + Lenis ── */
  useEffect(() => {
    let destroyed=false, lenisCleaner:(() => void)|undefined;

    (async () => {
      const [{ default:Lenis }, { gsap }, { ScrollTrigger }, { default:SplitType }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("split-type"),
      ]);
      if (destroyed) return;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({ lerp:.09, wheelMultiplier:.85, smoothWheel:true, syncTouch:false });
      lenis.on("scroll", (e:{scroll:number}) => {
        const nav=navRef.current;
        if (!nav) return;
        const p=e.scroll>60;
        nav.style.background     = p ? D.navBg  : "transparent";
        nav.style.backdropFilter = p ? "blur(14px)" : "none";
        nav.style.borderBottomColor = p ? D.border : "transparent";
      });
      lenis.on("scroll", ScrollTrigger.update);
      const tf=(t:number)=>lenis.raf(t*1000);
      gsap.ticker.add(tf);
      gsap.ticker.lagSmoothing(0);

      // Hero title
      const hero = document.getElementById("fx-hero-title");
      if (hero) {
        const split = new SplitType(hero, {types:"chars"});
        gsap.set(split.chars, {yPercent:120, opacity:0});
        gsap.to(split.chars, {yPercent:0, opacity:1, duration:1.3, ease:"expo.out", stagger:.028, delay:2.5, force3D:true});
      }
      const sub = document.getElementById("fx-hero-sub");
      if (sub) gsap.fromTo(sub, {opacity:0,y:20},{opacity:1,y:0,duration:1,ease:"expo.out",delay:3.0});

      // Scroll reveals
      gsap.utils.toArray<HTMLElement>(".fx-reveal").forEach(el=>{
        gsap.fromTo(el,{opacity:0,y:50,force3D:true},{opacity:1,y:0,duration:1,ease:"expo.out",force3D:true,
          scrollTrigger:{trigger:el,start:"top 87%",toggleActions:"play none none none"}});
      });

      lenisCleaner=()=>{ lenis.destroy(); gsap.ticker.remove(tf); ScrollTrigger.getAll().forEach(t=>t.kill()); };
    })();

    return ()=>{ destroyed=true; lenisCleaner?.(); };
  }, []);

  /* ── Cursor helpers ── */
  const cOn  = (t="") => { document.getElementById("fx-ring")?.classList.add("h"); document.getElementById("fx-dot")?.classList.add("h"); const l=document.getElementById("fx-lbl"); if(l) l.textContent=t; };
  const cOff = ()      => { document.getElementById("fx-ring")?.classList.remove("h"); document.getElementById("fx-dot")?.classList.remove("h"); const l=document.getElementById("fx-lbl"); if(l) l.textContent=""; };

  const mono  = {fontFamily:"'Courier New',monospace"} as const;
  const serif = {fontFamily:"Georgia,serif"} as const;
  const label = {fontFamily:"'Courier New',monospace", fontSize:11, letterSpacing:"0.22em", color:D.muted, textTransform:"uppercase" as const};

  return (
    <>
      <style suppressHydrationWarning>{CSS}</style>
      <div id="fx-grain" aria-hidden />

      {/* Cursor */}
      <div id="fx-ring" aria-hidden><span id="fx-lbl"/></div>
      <div id="fx-dot"  aria-hidden />

      {/* Loader */}
      <div id="fx-loader" aria-hidden>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{...mono,fontSize:12,letterSpacing:"0.32em",color:D.violet,textTransform:"uppercase"}}>FLUX</span>
          <span style={{width:1,height:16,background:D.violet,opacity:.3}}/>
          <span style={{...mono,fontSize:8,letterSpacing:"0.25em",color:D.muted,textTransform:"uppercase"}}>WebGL Interactive</span>
        </div>
        <div id="fx-track"><div id="fx-bar"/></div>
      </div>

      {/* ── SITE ── */}
      <div style={{background:D.bg,color:D.fg,minHeight:"100vh"}}>

        {/* NAV */}
        <nav id="fx-nav" ref={navRef} style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"0 48px",height:72,display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid transparent"}}>
          <a href="#" onMouseEnter={()=>cOn()} onMouseLeave={cOff}
            style={{...mono,fontSize:13,letterSpacing:"0.28em",color:D.fg,textDecoration:"none",textTransform:"uppercase"}}>
            FLUX
          </a>
          <div className="fx-nav-links" style={{display:"flex",gap:40}}>
            {["Demo","Capabilities","Contact"].map(item=>(
              <a key={item} href={`#${item.toLowerCase()}`} onMouseEnter={()=>cOn()} onMouseLeave={cOff}
                onMouseOver={e=>(e.currentTarget.style.color=D.fg)} onMouseOut={e=>(e.currentTarget.style.color=D.muted)}
                style={{...mono,fontSize:11,letterSpacing:"0.2em",color:D.muted,textDecoration:"none",textTransform:"uppercase",transition:"color .25s"}}>
                {item}
              </a>
            ))}
          </div>
          <button onClick={()=>setReelOpen(true)} onMouseEnter={()=>cOn("PLAY")} onMouseLeave={cOff}
            onMouseOver={e=>(e.currentTarget as HTMLButtonElement).style.background=D.fg}
            onMouseOut={e=>(e.currentTarget as HTMLButtonElement).style.background=D.violet}
            style={{...mono,fontSize:10,letterSpacing:"0.18em",color:"#050510",background:D.violet,border:"none",padding:"11px 22px",textTransform:"uppercase",transition:"background .25s"}}>
            View Demo
          </button>
        </nav>

        {/* ── HERO ── */}
        <section ref={heroSectionRef} style={{position:"relative",height:"100vh",overflow:"hidden"}}>
          {/* WebGL canvas */}
          <div ref={tiltRef} id="fx-tilt" style={{position:"absolute",inset:"-5%",zIndex:0}}>
            <canvas ref={heroCanvasRef} id="fx-hero-canvas" />
          </div>
          {/* Scan lines */}
          <div id="fx-scanlines" aria-hidden/>
          {/* Vertical rules */}
          {[25,50,75].map(p=>(
            <div key={p} aria-hidden style={{position:"absolute",top:0,bottom:0,left:`${p}%`,width:1,background:D.border,zIndex:2,pointerEvents:"none"}}/>
          ))}

          {/* Content */}
          <div style={{position:"relative",zIndex:3,height:"100%",display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"0 48px 80px"}}>
            <div style={{position:"absolute",top:100,right:48,textAlign:"right"}}>
              <p style={{...label,fontSize:10}}>GPU · Shaders · Physics</p>
              <p style={{...label,fontSize:10,marginTop:4}}>WebGL 2.0</p>
            </div>

            <div className="fx-clip">
              <h1 id="fx-hero-title"
                style={{...serif,fontSize:"clamp(4rem,12vw,10rem)",fontWeight:400,lineHeight:.88,letterSpacing:"-0.025em",color:D.fg}}>
                BEYOND<br/><em style={{fontStyle:"italic",color:D.violet}}>THE&nbsp;SCREEN</em>
              </h1>
            </div>

            <div id="fx-hero-sub" style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginTop:40,paddingTop:32,borderTop:`1px solid ${D.border}`,opacity:0}}>
              <p style={{...mono,fontSize:12,letterSpacing:"0.15em",color:D.dim,maxWidth:360,lineHeight:1.9,textTransform:"uppercase"}}>
                Real-time fluid simulation<br/>Interactive particle physics<br/>GPU-accelerated at 60fps
              </p>
              <a href="#demo" onMouseEnter={()=>cOn("EXPLORE")} onMouseLeave={cOff}
                style={{...mono,fontSize:10,letterSpacing:"0.2em",color:D.violet,textDecoration:"none",display:"flex",alignItems:"center",gap:12,textTransform:"uppercase",border:`1px solid ${D.border}`,padding:"14px 24px",transition:"border-color .25s"}}>
                <span style={{width:0,height:0,borderStyle:"solid",borderWidth:"5px 0 5px 9px",borderColor:`transparent transparent transparent ${D.violet}`}}/>
                Explore the demo
              </a>
            </div>

            <div style={{position:"absolute",bottom:80,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:12}}>
              <span style={{...label,fontSize:9}}>Scroll</span>
              <div style={{width:1,height:40,background:`linear-gradient(to bottom, ${D.violet}, transparent)`}}/>
            </div>
          </div>
        </section>

        {/* ── PARTICLE DEMO ── */}
        <section id="demo" ref={partSectionRef} style={{height:"100vh",position:"relative",background:D.bg,overflow:"hidden",display:"flex",flexDirection:"column"}}>
          {/* Instruction */}
          <div className="fx-reveal" style={{padding:"48px 48px 0",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
            <p style={{...label,fontSize:10,color:D.violet}}>Interactive Demo</p>
            <p style={{...mono,fontSize:11,letterSpacing:"0.18em",color:D.muted,textTransform:"uppercase"}}>
              ← Drag your cursor through the field →
            </p>
          </div>

          {/* Particle canvas — fills remaining space */}
          <div style={{flex:1,position:"relative",overflow:"hidden"}}>
            <canvas ref={partCanvasRef} id="fx-part-canvas" style={{width:"100%",height:"100%"}}
              onMouseEnter={()=>cOn("DRAG")} onMouseLeave={cOff}/>
            {/* Glow beneath particles */}
            <div aria-hidden style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 50%, rgba(108,99,255,.06) 0%, transparent 65%)",pointerEvents:"none",zIndex:1}}/>
          </div>

          <div style={{padding:"0 48px 40px",borderTop:`1px solid ${D.border}`,marginTop:"auto",flexShrink:0,display:"flex",justifyContent:"space-between",paddingTop:20}}>
            <span style={{...label,fontSize:10}}>Three.js · BufferGeometry · Spring Physics</span>
            <span style={{...label,fontSize:10}}>
              <span style={{color:D.violet}}>●</span>&nbsp;Live render
            </span>
          </div>
        </section>

        {/* ── CAPABILITIES ── */}
        <section id="capabilities" style={{padding:"160px 48px",borderTop:`1px solid ${D.border}`,overflow:"hidden"}}>
          <div style={{maxWidth:1200,margin:"0 auto"}}>
            <div className="fx-reveal" style={{marginBottom:80}}>
              <p style={{...label,fontSize:11,color:D.violet,marginBottom:16}}>Capabilities</p>
              <h2 style={{...serif,fontSize:"clamp(2rem,5vw,4rem)",fontWeight:400,color:D.fg,lineHeight:1.1}}>What This Enables</h2>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:1,background:D.border,border:`1px solid ${D.border}`}}>
              {CAPS.map((c,i)=>(
                <div key={c.n} className="fx-reveal fx-cap"
                  style={{background:D.bg,padding:"40px 36px",transition:"background .3s, border-color .3s",border:"1px solid transparent",borderBottom:i<CAPS.length-2?`1px solid ${D.border}`:"none"}}>
                  <p style={{...mono,fontSize:13,color:D.muted,marginBottom:16}}>{c.n}</p>
                  <h3 style={{...serif,fontSize:"clamp(1.1rem,2vw,1.5rem)",fontWeight:400,color:D.fg,marginBottom:12}}>{c.title}</h3>
                  <p style={{...mono,fontSize:11,letterSpacing:"0.08em",color:D.dim,lineHeight:1.9}}>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MARQUEE ── */}
        <section style={{borderTop:`1px solid ${D.border}`,borderBottom:`1px solid ${D.border}`,padding:"26px 0",overflow:"hidden"}}>
          <div className="fx-marquee" style={{display:"flex",whiteSpace:"nowrap"}}>
            {[...Array(2)].flatMap(()=>["WebGL","GLSL","Three.js","GSAP","Lenis","SplitType","Particles","Shaders","60fps","GPU","Canvas","RAF"]).map((t,i)=>(
              <span key={i} style={{...mono,fontSize:11,letterSpacing:"0.28em",color:i%2===0?D.muted:D.dim,textTransform:"uppercase",padding:"0 48px",flexShrink:0}}>{t}</span>
            ))}
          </div>
        </section>

        {/* ── CONTACT / CTA ── */}
        <section id="contact" style={{padding:"160px 48px",overflow:"hidden"}}>
          <div className="fx-reveal" style={{maxWidth:900,margin:"0 auto",textAlign:"center"}}>
            <p style={{...label,fontSize:11,color:D.violet,marginBottom:32}}>Add This To Your Project</p>
            <h2 style={{...serif,fontSize:"clamp(3rem,8vw,7rem)",fontWeight:400,lineHeight:.95,color:D.fg,marginBottom:48,letterSpacing:"-0.02em"}}>
              BUILD<br/><em style={{fontStyle:"italic",color:D.violet}}>SOMETHING</em><br/>REAL
            </h2>
            <a href="mailto:falcondesigns001@gmail.com" onMouseEnter={()=>cOn("MAIL")} onMouseLeave={cOff}
              onMouseOver={e=>(e.currentTarget.style.color=D.violet)} onMouseOut={e=>(e.currentTarget.style.color=D.fg)}
              style={{...mono,fontSize:"clamp(.85rem,2vw,1.1rem)",letterSpacing:"0.1em",color:D.fg,textDecoration:"none",display:"inline-block",borderBottom:`1px solid ${D.violet}`,paddingBottom:4,transition:"color .25s"}}>
              falcondesigns001@gmail.com
            </a>
            <div style={{marginTop:80,paddingTop:48,borderTop:`1px solid ${D.border}`,display:"flex",justifyContent:"center",gap:48,flexWrap:"wrap"}}>
              {["Instagram","Dribbble","GitHub"].map(l=>(
                <a key={l} href="#" onMouseEnter={()=>cOn()} onMouseLeave={cOff}
                  onMouseOver={e=>(e.currentTarget.style.color=D.fg)} onMouseOut={e=>(e.currentTarget.style.color=D.muted)}
                  style={{...mono,fontSize:11,letterSpacing:"0.22em",color:D.muted,textDecoration:"none",textTransform:"uppercase",transition:"color .25s"}}>
                  {l}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{borderTop:`1px solid ${D.border}`,padding:"28px 48px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <span style={{...mono,fontSize:12,letterSpacing:"0.2em",color:D.muted,textTransform:"uppercase"}}>© 2026 Flux — WebGL Template</span>
          <span style={{...mono,fontSize:9,letterSpacing:"0.18em",color:D.muted,textTransform:"uppercase"}}>Site by Falcon Designs</span>
        </footer>
      </div>

      {/* REEL MODAL */}
      <div id="fx-modal" className={reelOpen?"open":""} onClick={()=>setReelOpen(false)}>
        <div onClick={e=>e.stopPropagation()} style={{width:"min(900px,90vw)",position:"relative"}}>
          <button onClick={()=>setReelOpen(false)} onMouseEnter={()=>cOn()} onMouseLeave={cOff}
            style={{position:"absolute",top:-36,right:0,background:"transparent",border:"none",color:D.dim,...mono,fontSize:10,letterSpacing:"0.2em",textTransform:"uppercase"}}>
            Close ✕
          </button>
          <div style={{aspectRatio:"16/9",background:D.card,border:`1px solid ${D.border}`}}>
            {reelOpen&&<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1"
              style={{width:"100%",height:"100%",border:"none"}} allow="autoplay; fullscreen" title="Demo reel"/>}
          </div>
        </div>
      </div>
    </>
  );
}
