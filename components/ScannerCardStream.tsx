'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import * as THREE from 'three';

const defaultCardImages = [
  "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b55e654d1341fb06f8_4.1.png",
  "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5a080a31ee7154b19_1.png",
  "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5c1e4919fd69672b8_3.png",
  "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5f6a5e232e7beb4be_2.png",
  "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5bea2f1b07392d936_4.png",
];

const ASCII_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789(){}[]<>;:,._-+=!@#$%^&*|\\/\"'`~?";
const generateCode = (width: number, height: number): string => {
  let text = "";
  for (let i = 0; i < width * height; i++) {
    text += ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
  }
  let out = "";
  for (let i = 0; i < height; i++) {
    out += text.substring(i * width, (i + 1) * width) + "\n";
  }
  return out;
};

type ScannerCardStreamProps = {
  showControls?: boolean;
  showSpeed?: boolean;
  initialSpeed?: number;
  direction?: -1 | 1;
  cardImages?: string[];
  repeat?: number;
  cardGap?: number;
  friction?: number;
  scanEffect?: 'clip' | 'scramble';
};

const ScannerCardStream = ({
  showControls = false,
  showSpeed = false,
  initialSpeed = 150,
  direction = -1,
  cardImages = defaultCardImages,
  repeat = 6,
  cardGap = 60,
  friction = 0.95,
  scanEffect = 'scramble',
}: ScannerCardStreamProps) => {
  const [speed, setSpeed] = useState(initialSpeed);
  const [isPaused, setIsPaused] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const cards = useMemo(() => {
    const totalCards = cardImages.length * repeat;
    return Array.from({ length: totalCards }, (_, i) => ({
      id: i,
      image: cardImages[i % cardImages.length],
      ascii: generateCode(Math.floor(400 / 6.5), Math.floor(250 / 13)),
    }));
  }, [cardImages, repeat]);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardLineRef = useRef<HTMLDivElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const scannerCanvasRef = useRef<HTMLCanvasElement>(null);
  const originalAscii = useRef(new Map<number, string>());

  const cardStreamState = useRef({
    position: 0,
    velocity: initialSpeed,
    direction: direction,
    isDragging: false,
    lastMouseX: 0,
    lastTime: performance.now(),
    cardLineWidth: (400 + cardGap) * cards.length,
    friction: friction,
    minVelocity: 30,
  });

  const scannerState = useRef({ isScanning: false });

  const toggleAnimation = useCallback(() => setIsPaused(prev => !prev), []);

  useEffect(() => {
    const container = containerRef.current;
    const cardLine = cardLineRef.current;
    const particleCanvas = particleCanvasRef.current;
    const scannerCanvas = scannerCanvasRef.current;
    if (!container || !cardLine || !particleCanvas || !scannerCanvas) return;

    cards.forEach(card => originalAscii.current.set(card.id, card.ascii));

    let animationFrameId: number;

    const getW = () => container.offsetWidth || window.innerWidth;
    const getH = () => container.offsetHeight || 300;

    // Three.js particle layer
    const scene = new THREE.Scene();
    const w = getW(), h = getH();
    const camera = new THREE.OrthographicCamera(-w / 2, w / 2, h / 2, -h / 2, 1, 1000);
    camera.position.z = 100;
    const renderer = new THREE.WebGLRenderer({ canvas: particleCanvas, alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);

    const particleCount = 300;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount);
    const alphas = new Float32Array(particleCount);

    const texCanvas = document.createElement("canvas");
    texCanvas.width = 100; texCanvas.height = 100;
    const texCtx = texCanvas.getContext("2d")!;
    const half = 50;
    const grad = texCtx.createRadialGradient(half, half, 0, half, half, half);
    grad.addColorStop(0.025, "#afffaf");
    grad.addColorStop(0.1, `hsl(140,100%,22%)`);
    grad.addColorStop(0.25, `hsl(140,100%,4%)`);
    grad.addColorStop(1, "transparent");
    texCtx.fillStyle = grad;
    texCtx.arc(half, half, half, 0, Math.PI * 2);
    texCtx.fill();
    const texture = new THREE.CanvasTexture(texCanvas);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * w * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * h;
      velocities[i] = Math.random() * 60 + 30;
      alphas[i] = (Math.random() * 8 + 2) / 10;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: { pointTexture: { value: texture } },
      vertexShader: `attribute float alpha; varying float vAlpha; void main() { vAlpha = alpha; vec4 mvPosition = modelViewMatrix * vec4(position,1.0); gl_PointSize = 15.0; gl_Position = projectionMatrix * mvPosition; }`,
      fragmentShader: `uniform sampler2D pointTexture; varying float vAlpha; void main() { gl_FragColor = vec4(1.0,1.0,1.0,vAlpha)*texture2D(pointTexture,gl_PointCoord); }`,
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 2D scanner canvas
    const ctx = scannerCanvas.getContext("2d")!;
    scannerCanvas.width = w;
    scannerCanvas.height = h;

    let scannerParticles: {
      x: number; y: number; vx: number; vy: number;
      radius: number; alpha: number; life: number; decay: number;
    }[] = [];
    const baseMax = 500;
    const scanMax = 1800;
    let curMax = baseMax;

    const mkParticle = () => ({
      x: w / 2 + (Math.random() - 0.5) * 3,
      y: Math.random() * h,
      vx: Math.random() * 0.8 + 0.2,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 0.6 + 0.4,
      alpha: Math.random() * 0.4 + 0.6,
      life: 1.0,
      decay: Math.random() * 0.02 + 0.005,
    });
    for (let i = 0; i < baseMax; i++) scannerParticles.push(mkParticle());

    const runScramble = (el: HTMLElement, cardId: number) => {
      if (el.dataset.scrambling === "true") return;
      el.dataset.scrambling = "true";
      const orig = originalAscii.current.get(cardId) || "";
      let n = 0;
      const id = setInterval(() => {
        el.textContent = generateCode(Math.floor(400 / 6.5), Math.floor(250 / 13));
        if (++n >= 10) { clearInterval(id); el.textContent = orig; delete el.dataset.scrambling; }
      }, 30);
    };

    const updateCardEffects = () => {
      const cx = w / 2;
      const sw = 8;
      let anyScanning = false;
      cardLine.querySelectorAll<HTMLElement>(".card-wrapper").forEach((wrapper, idx) => {
        const rect = wrapper.getBoundingClientRect();
        const contRect = container.getBoundingClientRect();
        const localLeft = rect.left - contRect.left;
        const localRight = rect.right - contRect.left;
        const scanL = cx - sw / 2, scanR = cx + sw / 2;
        const normal = wrapper.querySelector<HTMLElement>(".card-normal")!;
        const ascii = wrapper.querySelector<HTMLElement>(".card-ascii")!;
        const pre = ascii.querySelector<HTMLElement>("pre")!;
        if (localLeft < scanR && localRight > scanL) {
          anyScanning = true;
          if (scanEffect === "scramble" && wrapper.dataset.scanned !== "true") runScramble(pre, idx);
          wrapper.dataset.scanned = "true";
          const iL = Math.max(scanL - localLeft, 0);
          const iR = Math.min(scanR - localLeft, rect.width);
          normal.style.setProperty("--clip-right", `${(iL / rect.width) * 100}%`);
          ascii.style.setProperty("--clip-left", `${(iR / rect.width) * 100}%`);
        } else {
          delete wrapper.dataset.scanned;
          if (localRight < scanL) {
            normal.style.setProperty("--clip-right", "100%");
            ascii.style.setProperty("--clip-left", "100%");
          } else {
            normal.style.setProperty("--clip-right", "0%");
            ascii.style.setProperty("--clip-left", "0%");
          }
        }
      });
      setIsScanning(anyScanning);
      scannerState.current.isScanning = anyScanning;
    };

    // Drag / wheel
    const onDown = (e: MouseEvent | TouchEvent) => {
      cardStreamState.current.isDragging = true;
      cardStreamState.current.lastMouseX = "touches" in e ? e.touches[0].clientX : e.clientX;
    };
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!cardStreamState.current.isDragging) return;
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      const dx = x - cardStreamState.current.lastMouseX;
      cardStreamState.current.position += dx;
      cardStreamState.current.velocity = Math.abs(dx) / 0.016;
      cardStreamState.current.direction = dx < 0 ? -1 : 1;
      cardStreamState.current.lastMouseX = x;
    };
    const onUp = () => { cardStreamState.current.isDragging = false; };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      cardStreamState.current.velocity = Math.min(Math.abs(e.deltaX) * 2, 800);
      cardStreamState.current.direction = e.deltaX < 0 ? 1 : -1;
    };

    cardLine.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    cardLine.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);
    cardLine.addEventListener("wheel", onWheel, { passive: false });

    const animate = (now: number) => {
      const dt = (now - cardStreamState.current.lastTime) / 1000;
      cardStreamState.current.lastTime = now;

      if (!isPaused && !cardStreamState.current.isDragging) {
        if (cardStreamState.current.velocity > cardStreamState.current.minVelocity) {
          cardStreamState.current.velocity *= cardStreamState.current.friction;
        }
        cardStreamState.current.position += cardStreamState.current.velocity * cardStreamState.current.direction * dt;
        setSpeed(Math.round(cardStreamState.current.velocity));
      }

      const { position, cardLineWidth } = cardStreamState.current;
      const cw = getW();
      if (position < -cardLineWidth) cardStreamState.current.position = cw;
      else if (position > cw) cardStreamState.current.position = -cardLineWidth;
      cardLine.style.transform = `translateX(${cardStreamState.current.position}px)`;

      updateCardEffects();

      // Three.js particles
      const t = now * 0.001;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities[i] * 0.016;
        if (positions[i * 3] > w / 2 + 100) positions[i * 3] = -w / 2 - 100;
        positions[i * 3 + 1] += Math.sin(t + i * 0.1) * 0.5;
        alphas[i] = Math.max(0.1, Math.min(1, alphas[i] + (Math.random() - 0.5) * 0.05));
      }
      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.alpha.needsUpdate = true;
      renderer.render(scene, camera);

      // Scanner particles
      ctx.clearRect(0, 0, w, h);
      const target = scannerState.current.isScanning ? scanMax : baseMax;
      curMax += (target - curMax) * 0.05;
      while (scannerParticles.length < curMax) scannerParticles.push(mkParticle());
      while (scannerParticles.length > curMax) scannerParticles.pop();
      scannerParticles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life -= p.decay;
        if (p.life <= 0 || p.x > w) Object.assign(p, mkParticle());
        ctx.globalAlpha = p.alpha * p.life;
        ctx.fillStyle = "#00ff41";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);

    const ro = new ResizeObserver(() => {
      const nw = getW(), nh = getH();
      renderer.setSize(nw, nh);
      scannerCanvas.width = nw; scannerCanvas.height = nh;
      camera.left = -nw / 2; camera.right = nw / 2;
      camera.top = nh / 2; camera.bottom = -nh / 2;
      camera.updateProjectionMatrix();
    });
    ro.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      cardLine.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      cardLine.removeEventListener("touchstart", onDown);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
      cardLine.removeEventListener("wheel", onWheel);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texture.dispose();
      ro.disconnect();
    };
  }, [isPaused, cards, cardGap, friction, scanEffect]);

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <style>{`
        @keyframes glitch { 0%,16%,50%,100% { opacity:1; } 15%,99% { opacity:0.9; } 49% { opacity:0.8; } }
        .scs-glitch { animation: glitch 0.1s infinite linear alternate-reverse; }
        @keyframes scanPulse { 0% { opacity:0.75; transform:translateX(-50%) translateY(-50%) scaleY(1); } 100% { opacity:1; transform:translateX(-50%) translateY(-50%) scaleY(1.03); } }
        .scs-pulse { animation: scanPulse 1.5s infinite alternate ease-in-out; }
      `}</style>

      <canvas ref={particleCanvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />
      <canvas ref={scannerCanvasRef} className="absolute inset-0 w-full h-full z-[10] pointer-events-none" />

      {/* Scanner line */}
      <div
        className={`absolute top-1/2 left-1/2 h-[280px] w-0.5 rounded-full z-20 pointer-events-none scs-pulse transition-opacity duration-300 ${isScanning ? "opacity-100" : "opacity-0"}`}
        style={{
          background: "linear-gradient(to bottom, transparent, #00ff41, transparent)",
          boxShadow: "0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 30px #00e538, 0 0 50px #00c42d",
        }}
      />

      {/* Card stream */}
      <div className="absolute w-full h-[250px] flex items-center overflow-hidden">
        <div
          ref={cardLineRef}
          className="flex items-center whitespace-nowrap cursor-grab select-none will-change-transform"
          style={{ gap: `${cardGap}px` }}
        >
          {cards.map(card => (
            <div key={card.id} className="card-wrapper relative shrink-0" style={{ width: 400, height: 250 }}>
              <div
                className="card-normal absolute top-0 left-0 w-full h-full rounded-[15px] overflow-hidden z-[2]"
                style={{ clipPath: "inset(0 0 0 var(--clip-right,0%))", boxShadow: "0 15px 40px rgba(0,0,0,0.4)" }}
              >
                <img
                  src={card.image}
                  alt=""
                  className="w-full h-full object-cover rounded-[15px] brightness-110 contrast-110 hover:brightness-125 hover:contrast-125 transition-all duration-300"
                />
              </div>
              <div
                className="card-ascii absolute top-0 left-0 w-full h-full rounded-[15px] overflow-hidden z-[1]"
                style={{ clipPath: "inset(0 calc(100% - var(--clip-left,0%)) 0 0)" }}
              >
                <pre
                  className="scs-glitch absolute top-0 left-0 w-full h-full m-0 p-0 font-mono overflow-hidden whitespace-pre text-left"
                  style={{
                    fontSize: 11, lineHeight: "13px",
                    color: "rgba(0,255,65,0.6)",
                    maskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.2) 100%)",
                  }}
                >
                  {card.ascii}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showSpeed && (
        <div className="absolute top-4 right-4 z-30 text-white/60 font-mono text-xs">
          {speed} px/s
        </div>
      )}
      {showControls && (
        <button onClick={toggleAnimation} className="absolute bottom-4 right-4 z-30 px-3 py-1 rounded bg-white/10 text-white text-xs font-mono hover:bg-white/20">
          {isPaused ? "▶ play" : "⏸ pause"}
        </button>
      )}
    </div>
  );
};

export { ScannerCardStream };
