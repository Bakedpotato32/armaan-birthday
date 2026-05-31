"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, ChevronRight, Play, RefreshCw, Heart, Sparkles, 
  BookOpen, Gamepad2, ImageIcon
} from 'lucide-react';

interface ContentCard {
  id: number;
  title: string;
  caption: string;
  gradient: string;
  watermark: string;
  imageSrc?: string;
}

export default function BirthdayWebsite() {
  const [phase, setPhase] = useState<number>(1);

  return (
    // Explicit flex container centered horizontally and vertically to kill top-anchoring shifts[span_3](start_span)[span_3](end_span)
    <main className="relative w-full h-screen overflow-hidden bg-[#FFF0F5] flex items-center justify-center select-none z-10" style={{ color: '#0f172a' }}>
      
      {/* Premium Luxury Opaque Backdrop Layer[span_4](start_span)[span_4](end_span) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FFF0F5] via-[#FFE4E1] to-white" />
        <div className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] rounded-full bg-rose-300/50 blur-[110px] animate-pulse" style={{ animationDuration: '7s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[90vw] h-[90vw] rounded-full bg-red-200/40 blur-[130px] animate-pulse" style={{ animationDuration: '10s' }} />
      </div>

      {/* Internal Animation Keyframes[span_5](start_span)[span_5](end_span) */}
      <style>{`
        .nova-pulse { animation: nova-pulse 2.5s ease-in-out infinite; transform-origin: center; }
        .nova-twinkle { animation: nova-twinkle 2s ease-in-out infinite; transform-origin: center; }
        @keyframes nova-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.06); } }
        @keyframes nova-twinkle { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.12); opacity: 0.8; } }
        .hide-scrollbar::-webkit-scrollbar { display: none !important; }
        .hide-scrollbar { -ms-overflow-style: none !important; scrollbar-width: none !important; }
      `}</style>

      {/* Main Centered Orchestration Shell[span_6](start_span)[span_6](end_span) */}
      <div className="relative w-full max-w-sm h-full flex flex-col items-center justify-center px-4 z-10">
        <AnimatePresence mode="wait">
          {phase === 1 && <Phase1Intro onComplete={() => setPhase(2)} />}
          {phase === 2 && <Phase2Gallery onComplete={() => setPhase(3)} />}
          {phase === 3 && <Phase3Story onComplete={() => setPhase(4)} />}
          {phase === 4 && <Phase4Transition onComplete={() => setPhase(5)} />}
          {phase === 5 && <Phase5Game />}
        </AnimatePresence>
      </div>
    </main>
  );
}

// --- PHASE 1: FIXED VISIBILITY KINETIC WISH TEXTS ---
function Phase1Intro({ onComplete }: { onComplete: () => void }) {
  const phrases = [
    "Happy Birthday Armaan! 🎉",
    "God bless you my brother! 🙌",
    "Saal me ek hi din aata hai tera ye roop... 🤫"
  ];
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (currentIdx < phrases.length) {
      const timer = setTimeout(() => {
        setCurrentIdx((prev) => prev + 1);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      onComplete();
    }
  }, [currentIdx, onComplete, phrases.length]);

  return (
    // Uses absolute alignment inside the orchestrator to prevent container collapse height drops[span_7](start_span)[span_7](end_span)
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
      <AnimatePresence mode="wait">
        {phrases.map((phrase, idx) => {
          if (idx !== currentIdx) return null;
          return (
            <motion.h1
              key={idx}
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.04, y: -20, filter: "blur(6px)" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-4xl font-black tracking-tight leading-tight select-none w-full px-2"
              style={{ 
                color: '#e11d48', 
                textShadow: '0 4px 14px rgba(225, 29, 72, 0.2)'
              }}
            >
              {/* Breaks down line 1 into stacked centered blocks while fallback rendering other indices */}
              {idx === 0 ? (
                <span className="flex flex-col items-center justify-center gap-2">
                  <span>Happy Birthday</span>
                  <span>Armaan! 🎉</span>
                </span>
              ) : (
                phrase
              )}
            </motion.h1>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

// --- PHASE 2: CENTERED IMAGE CAROUSEL LOADED FROM PUBLIC ---
function Phase2Gallery({ onComplete }: { onComplete: () => void }) {
  // Corrected file directory targets matching your public folder file storage layout[span_8](start_span)[span_8](end_span)
  const cards: ContentCard[] = [
    { id: 1, title: "Hero Entry", caption: "Bhai look toh check karo, bilkul hero entry! 🔥😎", gradient: "linear-gradient(135deg, #f43f5e, #be123c)", watermark: "🔥", imageSrc: "/photo1.jpg" },
    { id: 2, title: "Aesthetic King", caption: "Aesthetic ka king, candid toh next level hai tera! ✨📸", gradient: "linear-gradient(135deg, #06b6d4, #0284c7)", watermark: "✨", imageSrc: "/photo2.jpg" },
    { id: 3, title: "The Real You", caption: "Par sach batau? Tera ye roop sabse best hai! Pariya bhi fail hain iske aage 😂🧚‍♀️", gradient: "linear-gradient(135deg, #a855f7, #6d28d9)", watermark: "🧚‍♀️", imageSrc: "/photo3.jpg" }
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  const handleNextCard = () => {
    if (activeIdx < cards.length - 1) {
      setActiveIdx(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
      className="w-full flex flex-col items-center justify-center gap-6"
    >
      <div className="text-center">
        <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: '#e11d48', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Memories Exhibition
        </p>
        <h2 style={{ margin: '4px 0 0 0', fontSize: '22px', fontWeight: 900, textTransform: 'uppercase', color: '#0f172a' }}>
          teri kuch photos jo mere pas hai
        </h2>
      </div>

      <div className="relative w-full h-[380px] flex items-center justify-center perspective-1000">
        <AnimatePresence mode="popLayout">
          {cards.map((card, idx) => {
            if (idx !== activeIdx) return null;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -40) handleNextCard();
                }}
                style={{ background: '#ffffff', borderRadius: '32px', border: '2px solid rgba(255,255,255,0.9)', padding: '18px', position: 'absolute', width: '100%', height: '100%', boxShadow: '0 15px 35px rgba(225,29,72,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}
                className="cursor-grab active:cursor-grabbing"
              >
                {/* Clean Next.js Root Public Path Image Loader with native fallback support[span_9](start_span)[span_9](end_span) */}
                <div style={{ borderRadius: '22px', height: '72%', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
                  <img 
                    src={card.imageSrc} 
                    alt={card.title} 
                    className="w-full h-full object-cover select-none pointer-events-none"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <span style={{ position: 'absolute', right: '15px', bottom: '-5px', fontSize: '80px', opacity: 0.15, pointerEvents: 'none' }}>{card.watermark}</span>
                </div>
                <div style={{ height: '24%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#1e293b', lineHeight: 1.4 }}>
                    {card.caption}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={handleNextCard}
        style={{ background: 'linear-gradient(135deg, #e11d48, #be123c)', color: 'white', border: 'none', padding: '14px 28px', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px', cursor: 'pointer', boxShadow: '0 6px 16px rgba(225,29,72,0.2)' }}
      >
        {activeIdx === cards.length - 1 ? "Aage Chalo" : "Next Memory"}
        <ChevronRight size={16} strokeWidth={2.5} />
      </motion.button>
    </motion.div>
  );
}

// --- PHASE 3: SWIPABLE NARRATIVE STORY CARD CAROUSEL[span_10](start_span)[span_10](end_span) ---
function Phase3Story({ onComplete }: { onComplete: () => void }) {
  const stories: ContentCard[] = [
    { id: 1, title: "Step 1", caption: "Waise... yaad hai 9th standard ka wo din? 🤔", gradient: "linear-gradient(135deg, #be123c, #9f1239)", watermark: "🏫" },
    { id: 2, title: "Step 2", caption: "School khatam ho gaya tha, hum sab class se nikal kar ghar jaane hi wale the...", gradient: "linear-gradient(135deg, #be123c, #9f1239)", watermark: "🏃‍♂️" },
    { id: 3, title: "Step 3", caption: "Tabhi Ritika mere paas aayi aur mujhse notebook mangne lagi... 📚", gradient: "linear-gradient(135deg, #be123c, #9f1239)", watermark: "📋" },
    { id: 4, title: "Step 4", caption: "Aur tune peeche se chillaya: 'Notebook kyo mang rahi hai? Number dedo ise apna, photos bhej dega notes ka!' 😏😂", gradient: "linear-gradient(135deg, #be123c, #9f1239)", watermark: "💬" },
    { id: 5, title: "Step 5", caption: "Bhai main toh wahi sharm se paani-paani ho gaya tha! I still remember that. 💀", gradient: "linear-gradient(135deg, #be123c, #9f1239)", watermark: "😳" }
  ];

  const [activeStoryIdx, setActiveStoryIdx] = useState(0);

  const handleNextStory = () => {
    if (activeStoryIdx < stories.length - 1) {
      setActiveStoryIdx(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full flex flex-col items-center justify-center gap-6"
    >
      <div className="text-center">
        <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: '#e11d48', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Flashback Path
        </p>
        <h2 style={{ margin: '4px 0 0 0', fontSize: '22px', fontWeight: 900, textTransform: 'uppercase', color: '#0f172a' }}>
          9th Standard Incident
        </h2>
      </div>

      <div className="relative w-full h-[360px] flex items-center justify-center perspective-1000">
        <AnimatePresence mode="popLayout">
          {stories.map((story, idx) => {
            if (idx !== activeStoryIdx) return null;
            return (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -40) handleNextStory();
                }}
                style={{ background: '#ffffff', borderRadius: '32px', border: '2px solid rgba(255,255,255,0.9)', padding: '24px', position: 'absolute', width: '100%', height: '100%', boxShadow: '0 15px 35px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}
                className="cursor-grab active:cursor-grabbing"
              >
                <div style={{ background: story.gradient, borderRadius: '22px', height: '42%', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BookOpen size={32} color="white" className="nova-twinkle" />
                  <span style={{ position: 'absolute', right: '15px', bottom: '-5px', fontSize: '85px', opacity: 0.15, pointerEvents: 'none' }}>{story.watermark}</span>
                </div>
                
                <div style={{ height: '54%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                  <p style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#1e293b', lineHeight: 1.5 }}>
                    {story.caption}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleNextStory}
        style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: 'white', border: 'none', padding: '14px 32px', borderRadius: '24px', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 5px 12px rgba(15,23,42,0.15)' }}
      >
        {activeStoryIdx === stories.length - 1 ? "Continue" : "Aage Suno"}
        <ChevronRight size={16} strokeWidth={2.5} />
      </motion.button>
    </motion.div>
  );
}

// --- PHASE 4: PERFECTLY CENTERED PLAY OVERLAY[span_11](start_span)[span_11](end_span) ---
function Phase4Transition({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="w-full flex flex-col items-center justify-center p-2">
      <motion.div 
        initial={{ scale: 0.93, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.93, opacity: 0 }}
        style={{ width: '100%', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '36px', padding: '36px 24px', boxShadow: '0 25px 50px rgba(15,23,42,0.05)', textAlign: 'center', boxSizing: 'border-box' }}
      >
        <div style={{ width: '56px', height: '56px', margin: '0 auto 18px', background: 'rgba(225,29,72,0.08)', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e11d48' }}>
          <Heart size={26} className="nova-pulse" fill="#e11d48" />
        </div>

        <h2 style={{ margin: '0 0 10px 0', fontSize: '20px', fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase', color: '#0f172a', lineHeight: 1.3 }}>
          Chalo bahut emotional aur bezatti wali baatein ho gayi...
        </h2>
        <p style={{ margin: '0 0 28px 0', fontSize: '11px', fontWeight: 800, color: '#e11d48', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          ye le tere liye ek game!
        </p>
        
        <motion.button 
          whileTap={{ scale: 0.96 }}
          onClick={onComplete}
          style={{ width: '100%', background: 'linear-gradient(135deg, #e11d48, #be123c)', color: '#ffffff', padding: '16px', borderRadius: '20px', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer', boxShadow: '0 6px 20px rgba(225,29,72,0.2)' }}
        >
          <Play size={15} fill="white" />
          Play Game
        </motion.button>
      </motion.div>
    </div>
  );
}

// --- PHASE 5: EXPANDED AND PERFECTLY CENTERED MINI-GAME[span_12](start_span)[span_12](end_span) ---
function Phase5Game() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState<number>(0);
  const [gameState, setGameState] = useState<"playing" | "ended">("playing");

  const stateRef = useRef({
    bucketX: 140,
    bucketWidth: 90,
    bucketHeight: 18,
    cakes: [] as Array<{ x: number; y: number; speed: number; radius: number; rot: number; rotSpeed: number }>,
    particles: [] as Array<{ x: number; y: number; vx: number; vy: number; color: string; alpha: number; size: number }>,
    score: 0,
    canvasWidth: 360,
    canvasHeight: 500, 
    spawnTimer: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || gameState !== "playing") return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      stateRef.current.canvasWidth = rect.width;
      stateRef.current.canvasHeight = rect.height;
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationFrameId: number;

    const loop = () => {
      const s = stateRef.current;
      
      ctx.fillStyle = "#FFF5F5"; 
      ctx.fillRect(0, 0, s.canvasWidth, s.canvasHeight);

      ctx.strokeStyle = "rgba(225, 29, 72, 0.05)";
      ctx.lineWidth = 1;
      for (let x = 0; x < s.canvasWidth; x += 24) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, s.canvasHeight); ctx.stroke();
      }
      for (let y = 0; y < s.canvasHeight; y += 24) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(s.canvasWidth, y); ctx.stroke();
      }

      s.spawnTimer++;
      if (s.spawnTimer > 30) {
        s.cakes.push({
          x: Math.random() * (s.canvasWidth - 50) + 25,
          y: -25,
          speed: Math.random() * 2 + 4.5,
          radius: 16,
          rot: Math.random() * Math.PI,
          rotSpeed: (Math.random() - 0.5) * 0.06
        });
        s.spawnTimer = 0;
      }

      for (let i = s.cakes.length - 1; i >= 0; i--) {
        const cake = s.cakes[i];
        cake.y += cake.speed;
        cake.rot += cake.rotSpeed;

        ctx.save();
        ctx.translate(cake.x, cake.y);
        ctx.rotate(cake.rot);
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("🎂", 0, 0);
        ctx.restore();

        const bucketTop = s.canvasHeight - 45;
        if (
          cake.y + cake.radius >= bucketTop &&
          cake.y - cake.radius <= bucketTop + s.bucketHeight &&
          cake.x >= s.bucketX - 12 &&
          cake.x <= s.bucketX + s.bucketWidth + 12
        ) {
          for (let p = 0; p < 14; p++) {
            s.particles.push({
              x: cake.x,
              y: bucketTop,
              vx: (Math.random() - 0.5) * 8,
              vy: -Math.random() * 5 - 3,
              color: `hsl(${Math.random() * 20 + 345}, 95%, 60%)`,
              alpha: 1,
              size: Math.random() * 4 + 2
            });
          }
          s.score += 1;
          setScore(s.score);
          s.cakes.splice(i, 1);
          continue;
        }

        if (cake.y > s.canvasHeight + 30) {
          s.cakes.splice(i, 1);
        }
      }

      for (let i = s.particles.length - 1; i >= 0; i--) {
        const p = s.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.18;
        p.alpha -= 0.03;

        if (p.alpha <= 0) {
          s.particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      }

      const bY = s.canvasHeight - 45;
      ctx.fillStyle = "#e11d48";
      ctx.beginPath();
      ctx.roundRect(s.bucketX, bY, s.bucketWidth, s.bucketHeight, [8]);
      ctx.fill();

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [gameState]);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    const s = stateRef.current;
    let nextX = touchX - s.bucketWidth / 2;
    if (nextX < 0) nextX = 0;
    if (nextX > s.canvasWidth - s.bucketWidth) nextX = s.canvasWidth - s.bucketWidth;
    s.bucketX = nextX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const s = stateRef.current;
    let nextX = mouseX - s.bucketWidth / 2;
    if (nextX < 0) nextX = 0;
    if (nextX > s.canvasWidth - s.bucketWidth) nextX = s.canvasWidth - s.bucketWidth;
    s.bucketX = nextX;
  };

  const resetGame = () => {
    stateRef.current.score = 0;
    stateRef.current.cakes = [];
    stateRef.current.particles = [];
    setScore(0);
    setGameState("playing");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="w-full flex flex-col items-center justify-center gap-4"
    >
      <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', background: '#ffffff', borderRadius: '24px', padding: '12px 20px', border: '1px solid #e2e8f0', boxShadow: '0 6px 20px rgba(0,0,0,0.02)', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Trophy size={16} color="#f59e0b" fill="#f59e0b" className="nova-pulse" />
          </div>
          <span style={{ fontSize: '14px', fontWeight: 900, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Score Board</span>
        </div>
        <span style={{ fontSize: '22px', fontWeight: 950, fontStyle: 'italic', color: '#e11d48' }}>{score}</span>
      </div>

      <div style={{ width: '100%', height: '460px', position: 'relative', background: '#ffffff', borderRadius: '32px', border: '2px solid #ffffff', overflow: 'hidden', boxShadow: '0 12px 30px rgba(0,0,0,0.03)' }}>
        <canvas
          ref={canvasRef}
          onTouchMove={handleTouchMove}
          onMouseMove={handleMouseMove}
          className="w-full h-full block touch-none"
        />

        {score >= 15 && gameState === "playing" && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(255, 255, 255, 0.96)', display: 'flex', flexDirection: 'column', items: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', zIndex: 40 }}>
            <div style={{ width: '56px', height: '56px', margin: '0 auto 16px', background: 'rgba(6,182,212,0.1)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={28} color="#06b6d4" className="nova-twinkle" />
            </div>
            <h2 style={{ margin: '0 0 6px 0', fontSize: '24px', fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase', color: '#0f172a' }}>Winner! 👑</h2>
            <p style={{ margin: '0 0 24px 0', fontSize: '13px', fontWeight: 700, color: '#475569' }}>Tu toh sach me heavy driver nikla bhai!</p>
            
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={resetGame}
              style={{ background: 'linear-gradient(135deg, #e11d48, #be123c)', color: '#ffffff', padding: '14px 28px', borderRadius: '16px', border: 'none', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 15px rgba(225,29,72,0.2)' }}
            >
              <RefreshCw size={14} /> Play Again
            </motion.button>
          </div>
        )}
      </div>

      <span style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(225,29,72,0.15)', color: '#be123c', padding: '10px 20px', borderRadius: '18px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        {score >= 15 ? "Task Completed! 🎉" : "Drag to catch the cakes!"}
      </span>
    </motion.div>
  );
}
