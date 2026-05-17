import { useState, useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { EnvelopeOpening } from "@/components/wedding/EnvelopeOpening";
import { ScratchReveal } from "@/components/wedding/ScratchReveal";
import { MusicPlayer } from "@/components/wedding/MusicPlayer";

import { Countdown } from "@/components/wedding/Countdown";
import { FlowerShower } from "@/components/wedding/FlowerShower";
import { LanternShower } from "@/components/wedding/LanternShower";
import { ScrollReveal } from "@/components/wedding/ScrollReveal";
import { AmbientDrift } from "@/components/wedding/AmbientDrift";
import mandalaBg from "@/assets/mandala-bg.jpg";
import tropicalCorner from "@/assets/tropical-corner.png";
import palmLeaf from "@/assets/palm-leaf.png";
import mdMonogram from "@/assets/new-monogram.jpg";
import { Curtain } from "@/components/wedding/Curtain";
import { KnottedDrape } from "@/components/wedding/KnottedDrape";
import { EmbroideredLetter } from "@/components/wedding/EmbroideredLetter";
import haldiCardBg from "@/assets/haldi.jpg";
import sangeetCardBg from "@/assets/sangeet-new-bg.jpg";
import weddingCardBg from "@/assets/wedding.jpeg";
import mandapImg from "@/assets/mandap.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Darshan & Mansi — A Royal Wedding" },
      { name: "description", content: "Join us in celebrating the royal wedding of Darshan & Mansi, 19–20 June 2026, Mumbai." },
      { property: "og:title", content: "Darshan weds Mansi" },
      { property: "og:description", content: "A two-day royal celebration. 19–20 June 2026, Mumbai." },
    ],
  }),
  component: Index,
});

function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`ornament-divider my-6 ${className}`}>
      <span className="text-gold-shimmer text-xl">✦</span>
    </div>
  );
}

function SectionTitle({ kicker, title, script }: { kicker?: string; title: string; script?: string }) {
  return (
    <div className="text-center mb-10">
      {kicker && (
        <p className="font-display text-[10px] md:text-xs tracking-[0.5em] uppercase mb-3" style={{ color: "var(--magenta)" }}>
          {kicker}
        </p>
      )}
      <h2 className="font-display text-3xl md:text-5xl text-gold-shimmer">{title}</h2>
      {script && <p className="font-script text-3xl md:text-4xl mt-2" style={{ color: "var(--maroon)" }}>{script}</p>}
      <Ornament />
    </div>
  );
}

// (Old SabyaDivider replaced by KnotDivider — see component.)

function FunctionFlow({
  date, day, name, theme, themeDesc, venue, address, time, image, reverse = false,
}: {
  date: string; day: string; name: string; theme: string; themeDesc: string; venue: string; address: string; time: string; image: string; reverse?: boolean;
}) {
  return (
    <div className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-6xl mx-auto px-6 ${reverse ? "md:[&>div:first-child]:order-2" : ""}`}>
      <div className="relative flex flex-col items-center text-center">
        <div className="absolute inset-0 -z-10 rounded-full blur-3xl opacity-30"
             style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 65%)" }} />
        <img src={image} alt={name} className="w-56 h-56 md:w-72 md:h-72 object-contain animate-gentle-float drop-shadow-[0_20px_40px_oklch(0.32_0.14_22/0.35)]" loading="lazy" />
      </div>
      <div className="flex flex-col text-center md:text-left">
        <div className="font-display text-[10px] md:text-xs tracking-[0.5em] uppercase" style={{ color: "var(--magenta)" }}>{day}</div>
        <div className="font-display text-xs tracking-[0.4em] uppercase mt-1" style={{ color: "var(--maroon)" }}>{date}</div>
        <h3 className="mt-3 font-script text-6xl md:text-7xl leading-none" style={{ color: "var(--maroon)" }}>{name}</h3>
        <div className="ornament-divider my-5 max-w-[180px] md:mx-0 mx-auto"><span style={{ color: "var(--gold)" }}>✦</span></div>
        <h4 className="font-display text-xl md:text-2xl text-gold-shimmer">{theme}</h4>
        <p className="font-serif italic text-lg md:text-xl mt-2 mb-5" style={{ color: "var(--maroon)" }}>{themeDesc}</p>
        <div className="space-y-1 text-sm md:text-base">
          <p className="font-display text-[10px] tracking-[0.4em] uppercase" style={{ color: "var(--magenta)" }}>Venue</p>
          <p className="font-serif text-lg" style={{ color: "var(--foreground)" }}>{venue}</p>
          <p className="font-serif" style={{ color: "var(--muted-foreground)" }}>{address}</p>
          <p className="mt-3 font-serif font-semibold" style={{ color: "var(--maroon)" }}>{time}</p>
        </div>
      </div>
    </div>
  );
}

function SabyaFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <img src={tropicalCorner} alt="" className="absolute -top-8 -left-8 w-32 md:w-52 pointer-events-none select-none animate-gentle-float" loading="lazy" />
      <img src={tropicalCorner} alt="" className="absolute -bottom-8 -right-8 w-32 md:w-52 pointer-events-none select-none animate-gentle-float" style={{ transform: "scale(-1,-1)", animationDelay: "1.5s" }} loading="lazy" />
      {children}
    </div>
  );
}

function CurtainHeader({ kicker, title, script }: { kicker: string; title: string; script: string }) {
  return (
    <div className="text-center mb-6 md:mb-8">
      <p className="font-display text-[9px] md:text-[10px] tracking-[0.5em] uppercase mb-2" style={{ color: "var(--magenta)" }}>
        {kicker}
      </p>
      <h3 className="font-script text-4xl md:text-6xl leading-none" style={{ color: "var(--maroon)" }}>
        {title}
      </h3>
      <p className="mt-2 font-serif italic text-sm md:text-base" style={{ color: "var(--maroon)", opacity: 0.85 }}>
        {script}
      </p>
      <div className="ornament-divider mt-4 max-w-[140px] mx-auto"><span className="text-gold-shimmer">✦</span></div>
    </div>
  );
}

function Index() {
  const [opened, setOpened] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [shower, setShower] = useState(false);
  const [lanterns, setLanterns] = useState(false);

  const handleOpen = () => {
    setOpened(true);
    setShower(true);
    setTimeout(() => setShower(false), 6000);
  };

  // Soft scroll-lock: allow scrolling within the hero (so the scratch card
  // is reachable), but smoothly clamp the page back if the user tries to
  // scroll past the hero before revealing the date.
  const heroRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!opened || revealed) return;
    let raf = 0;
    const clamp = () => {
      raf = 0;
      const el = heroRef.current;
      if (!el) return;
      const max = el.offsetTop + el.offsetHeight - window.innerHeight;
      if (window.scrollY > max + 4) {
        window.scrollTo({ top: Math.max(0, max), behavior: "smooth" });
      }
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(clamp);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [opened, revealed]);

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "var(--ivory)" }}>
      {!opened && <EnvelopeOpening onOpen={handleOpen} />}
      {shower && <FlowerShower count={30} />}
      {lanterns && <LanternShower count={70} />}
      <MusicPlayer opened={opened} />

      {/* faint mandala background */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.06] z-0"
        style={{ backgroundImage: `url(${mandalaBg})`, backgroundSize: "600px", backgroundRepeat: "repeat" }}
      />

      {/* ambient floating petals & paisleys */}
      {opened && <AmbientDrift density={16} />}

{/* Side frame removed — knot dividers now flow between sections */}

      <main className={`relative z-10 transition-opacity duration-1000 ${opened ? "opacity-100" : "opacity-0"}`}>
        {/* HERO */}
        <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center">
          <img src={palmLeaf} alt="" className="absolute -top-4 -left-6 w-32 md:w-48 opacity-80 animate-sway origin-top-left" loading="lazy" />
          <img src={palmLeaf} alt="" className="absolute -top-4 -right-6 w-32 md:w-48 opacity-80 animate-sway origin-top-right scale-x-[-1]" loading="lazy" />
          <img src={tropicalCorner} alt="" className="absolute -bottom-6 -left-6 w-40 md:w-64 opacity-90 animate-gentle-float" loading="lazy" />
          <img src={tropicalCorner} alt="" className="absolute -bottom-6 -right-6 w-40 md:w-64 opacity-90 animate-gentle-float scale-x-[-1]" style={{ animationDelay: "1s" }} loading="lazy" />

          <p className="font-serif italic tracking-widest text-sm" style={{ color: "var(--magenta)" }}>
            ॥ Shree Ganeshay Namah ॥<br />॥ Shree Mahaviray Namah ॥
          </p>

          {/* MD Monogram */}
          <div className="relative mt-3 mb-1 flex items-center justify-center">
            <span className="hidden md:block h-px w-24 lg:w-32" style={{ background: "linear-gradient(90deg, transparent, var(--gold))" }} />
            <div className="relative mx-4">
              <div className="absolute inset-0 -z-10 rounded-full blur-2xl opacity-50"
                   style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)" }} />
              <img
                src={mdMonogram}
                alt="Darshan & Mansi monogram"
                className="w-40 md:w-56 lg:w-64 mx-auto animate-gentle-float"
                style={{ mixBlendMode: "multiply" }}
                loading="eager"
              />
            </div>
            <span className="hidden md:block h-px w-24 lg:w-32" style={{ background: "linear-gradient(270deg, transparent, var(--gold))" }} />
          </div>
          <p className="mt-2 font-display text-xs md:text-sm tracking-[0.5em] uppercase" style={{ color: "var(--maroon)" }}>
            With the blessings of our families
          </p>

          <ScrollReveal variant="scale" delay={100}>
            <h1 className="mt-6 font-script text-7xl md:text-[10rem] leading-tight animate-glow-pulse" style={{ color: "var(--maroon)" }}>
              Darshan
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="fade" delay={250}>
            <div className="my-2 flex items-center gap-4 justify-center">
              <span className="block w-16 h-px animate-shimmer-line origin-right" style={{ background: "var(--gold)" }} />
              <span className="font-display text-2xl md:text-4xl text-gold-shimmer">&</span>
              <span className="block w-16 h-px animate-shimmer-line origin-left" style={{ background: "var(--gold)" }} />
            </div>
          </ScrollReveal>
          <ScrollReveal variant="scale" delay={400}>
            <h1 className="font-script text-7xl md:text-[10rem] leading-none animate-glow-pulse" style={{ color: "var(--maroon)" }}>
              Mansi
            </h1>
          </ScrollReveal>

          <Ornament />

          {/* Scratch reveal */}
          <div className="mt-12 w-full max-w-2xl mx-auto">
            <p className="mb-3 font-script text-2xl md:text-3xl" style={{ color: "var(--maroon)" }}>
              The beginning of our forever awaits
            </p>
            <p className="mb-6 text-sm tracking-[0.3em] uppercase font-display" style={{ color: "var(--magenta)" }}>
              Scratch to reveal the date
            </p>
            <ScratchReveal onRevealed={() => setRevealed(true)}>
              <div className="py-6 px-4 w-full">
                <p className="font-script text-4xl sm:text-5xl md:text-6xl whitespace-nowrap" style={{ color: "var(--maroon)" }}>
                  20<sup className="font-serif italic text-base md:text-2xl ml-1" style={{ verticalAlign: "super" }}>th</sup> June
                </p>
                <p className="mt-3 font-display text-xs md:text-sm tracking-[0.4em]" style={{ color: "var(--maroon)" }}>2026 · MUMBAI</p>
                <div className="ornament-divider my-3 max-w-[160px] mx-auto"><span className="text-gold-shimmer">✦</span></div>
                <p className="font-display text-[10px] md:text-xs tracking-[0.5em] uppercase" style={{ color: "var(--magenta)" }}>Save the date</p>
              </div>
            </ScratchReveal>
            {revealed && (
              <p className="mt-6 font-serif italic text-xl md:text-2xl animate-fade-up" style={{ color: "var(--maroon)" }}>
                Mark your hearts. Save your day.
              </p>
            )}
          </div>

          {/* Scroll-down prompt — appears after scratch reveal, fades out */}
          {revealed && (
            <div
              className="mt-10 flex flex-col items-center gap-2 opacity-0 pointer-events-none"
              style={{ animation: "scroll-hint 4.5s ease-out 0.6s forwards" }}
            >
              <span className="font-display text-[10px] tracking-[0.5em] uppercase" style={{ color: "var(--maroon)", opacity: 0.6 }}>
                Scroll to continue
              </span>
              <span className="text-2xl animate-bounce" style={{ color: "var(--gold)" }}>↓</span>
            </div>
          )}
        </section>

        {/* COUNTDOWN */}
        <section className="relative px-6 pt-4 pb-8 md:pt-6 md:pb-10">
          {/* Golden decorative divider line */}
          <div className="flex items-center justify-center gap-3 mb-8 md:mb-10 max-w-md mx-auto">
            <span className="block h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, var(--gold))" }} />
            <span className="text-gold-shimmer text-lg">✦</span>
            <span className="block h-px flex-1" style={{ background: "linear-gradient(270deg, transparent, var(--gold))" }} />
          </div>
          <ScrollReveal>
            <SectionTitle kicker="Shubh Muhurat Approaches" title="Counting Down" script="till the sacred vows are taken" />
          </ScrollReveal>
          <ScrollReveal variant="scale" delay={150}>
            <Countdown />
          </ScrollReveal>
        </section>

        {/* BRIDGE — invitation poem (no container) */}
        <ScrollReveal variant="fade">
          <div className="relative px-6 pt-10 pb-16 md:pt-16 md:pb-20">
            <EmbroideredLetter>
              <div className="text-center">
                <p
                  className="font-serif italic leading-[1.7] text-[1rem] md:text-[1.25rem]"
                  style={{ color: "var(--maroon)" }}
                >
                  With hearts full of love
                  <br />
                  and families united in joy,
                  <br />
                  we invite you to celebrate
                  <br />
                  the wedding festivities
                  <br />
                  as we begin this beautiful journey
                  <br />
                  of togetherness, laughter, and forever.
                </p>

                <div className="mt-8 flex items-center justify-center gap-4 text-[0.7rem] md:text-xs tracking-[0.5em] uppercase font-display" style={{ color: "var(--gold)" }}>
                  <span className="missive-line flex-1" />
                  <span className="whitespace-nowrap">✦ WITH LOVE ✦</span>
                  <span className="missive-line flex-1" />
                </div>
              </div>
            </EmbroideredLetter>
          </div>
        </ScrollReveal>


        {/* FAMILIES */}
        <section className="relative px-6 py-24">
          {/* tropical ambient backdrop — leaves anchored to viewport edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 -z-10 overflow-hidden">
            <div className="absolute inset-x-0 top-10 h-72 opacity-60"
                 style={{ background: "radial-gradient(ellipse at center, oklch(0.92 0.08 140 / 0.35), transparent 65%)" }} />
            <div className="absolute inset-x-0 bottom-10 h-72 opacity-60"
                 style={{ background: "radial-gradient(ellipse at center, oklch(0.85 0.12 30 / 0.3), transparent 65%)" }} />
            <img src={palmLeaf} alt="" className="edge-leaf left" style={{ top: "8%" }} loading="lazy" />
            <img src={palmLeaf} alt="" className="edge-leaf right" style={{ top: "12%", animationDelay: "0.6s" }} loading="lazy" />
            <img src={palmLeaf} alt="" className="edge-leaf left" style={{ top: "55%", width: 220, animationDelay: "1.2s", opacity: 0.4 }} loading="lazy" />
            <img src={palmLeaf} alt="" className="edge-leaf right" style={{ top: "62%", width: 220, animationDelay: "0.4s", opacity: 0.4 }} loading="lazy" />
          </div>

          <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <SectionTitle kicker="With pride & joy" title="Our Families" script="who made us who we are" />
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-10 md:gap-14">
            {/* Groom family */}
            <ScrollReveal variant="left" delay={100}>
            <SabyaFrame>
              <div className="relative rounded-[2rem] family-card animate-card-breathe p-10 md:p-14 text-center">
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-3 mb-3">
                    <span className="h-px w-8" style={{ background: "var(--gold)" }} />
                    <span className="text-2xl animate-lotus-bloom" style={{ color: "var(--magenta)" }}>❀</span>
                    <span className="h-px w-8" style={{ background: "var(--gold)" }} />
                  </div>
                  
                  <h3 className="mt-4 font-script text-6xl md:text-7xl text-maroon-shimmer leading-tight">Darshan </h3>
                  <p className="font-display text-[10px] tracking-[0.5em] uppercase mt-2" style={{ color: "var(--maroon)" }}>The Groom</p>
                  <Ornament />
                  <div className="space-y-5 text-base">
                    <ScrollReveal variant="up" delay={300}>
                      <p>
                        <span className="font-display text-[10px] tracking-[0.4em] uppercase" style={{ color: "var(--magenta)" }}>Son of</span><br />
                        <span className="font-serif text-xl mt-1 inline-block" style={{ color: "var(--maroon)" }}>Bina Doshi &amp; Rajesh Doshi</span>
                      </p>
                    </ScrollReveal>
                    <ScrollReveal variant="up" delay={450}>
                      <p>
                        <span className="font-display text-[10px] tracking-[0.4em] uppercase" style={{ color: "var(--magenta)" }}>Grandson of</span><br />
                        <span className="font-serif italic text-base" style={{ color: "var(--foreground)" }}>Late Shri Chhaganlal Doshi</span><br />
                        <span className="font-serif italic text-base" style={{ color: "var(--foreground)" }}>Late Smt. Manchaben Doshi</span>
                      </p>
                    </ScrollReveal>
                  </div>
                </div>
              </div>
            </SabyaFrame>
            </ScrollReveal>

            {/* Bride family */}
            <ScrollReveal variant="right" delay={250}>
            <SabyaFrame>
              <div className="relative rounded-[2rem] family-card animate-card-breathe p-10 md:p-14 text-center" style={{ animationDelay: "1.5s" }}>
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-3 mb-3">
                    <span className="h-px w-8" style={{ background: "var(--gold)" }} />
                    <span className="text-2xl animate-lotus-bloom" style={{ color: "var(--magenta)", animationDelay: "0.3s" }}>❀</span>
                    <span className="h-px w-8" style={{ background: "var(--gold)" }} />
                  </div>
                  
                  <h3 className="mt-4 font-script text-6xl md:text-7xl text-maroon-shimmer leading-tight">Dr. Mansi</h3>
                  <p className="font-display text-[10px] tracking-[0.5em] uppercase mt-2" style={{ color: "var(--maroon)" }}>The Bride</p>
                  <Ornament />
                  <div className="space-y-5 text-base">
                    <ScrollReveal variant="up" delay={300}>
                      <p>
                        <span className="font-display text-[10px] tracking-[0.4em] uppercase" style={{ color: "var(--magenta)" }}>Daughter of</span><br />
                        <span className="font-serif text-xl mt-1 inline-block" style={{ color: "var(--maroon)" }}>Dr. Heena Bhatt &amp; Dr. Milind Bhatt</span>
                      </p>
                    </ScrollReveal>
                    <ScrollReveal variant="up" delay={450}>
                      <p>
                        <span className="font-display text-[10px] tracking-[0.4em] uppercase" style={{ color: "var(--magenta)" }}>Granddaughter of</span><br />
                        <span className="font-serif italic text-base" style={{ color: "var(--foreground)" }}>Late Dr. Rasiklal Himmatlal Bhatt</span><br />
                        <span className="font-serif italic text-base" style={{ color: "var(--foreground)" }}>Late Smt. Hasmanben Bhatt</span>
                      </p>
                    </ScrollReveal>
                  </div>
                </div>
              </div>
            </SabyaFrame>
            </ScrollReveal>
          </div>

          {/* Third card — Awaiting your presence */}
          <ScrollReveal variant="up" delay={200}>
            <div className="mt-8 md:mt-12 max-w-md mx-auto">
              <SabyaFrame>
                <div className="relative rounded-[1.5rem] family-card animate-card-breathe p-6 md:p-8 text-center" style={{ animationDelay: "0.8s" }}>
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 mb-2">
                      <span className="h-px w-6" style={{ background: "var(--gold)" }} />
                      <span className="text-lg animate-lotus-bloom" style={{ color: "var(--magenta)", animationDelay: "0.6s" }}>❀</span>
                      <span className="h-px w-6" style={{ background: "var(--gold)" }} />
                    </div>
                    <h3 className="font-script text-2xl md:text-3xl text-maroon-shimmer leading-tight">Awaiting your presence</h3>
                    <div className="ornament-divider my-3"><span style={{ color: "var(--gold)" }}>✦</span></div>
                    <ScrollReveal variant="up" delay={250}>
                      <p className="text-sm">
                        <span className="font-serif text-base inline-block" style={{ color: "var(--maroon)" }}>Kruti-Kunur</span><br />
                        <span className="font-serif text-base inline-block" style={{ color: "var(--maroon)" }}>Malay</span><br />
                        <span className="font-serif text-base inline-block" style={{ color: "var(--maroon)" }}>Jinal-Hardik</span>
                      </p>
                    </ScrollReveal>
                  </div>
                </div>
              </SabyaFrame>
            </div>
          </ScrollReveal>
          </div>
        </section>

        {/* THE CELEBRATIONS */}
        <section className="relative px-4 md:px-6 py-12 md:py-20 max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto">
              <p className="font-display text-[10px] md:text-xs tracking-[0.5em] uppercase mb-4" style={{ color: "var(--magenta)" }}>
                One Dream · Two Days
                <br />
                Three Royal Functions
              </p>
              <h2 className="font-display text-5xl md:text-7xl text-gold-shimmer leading-tight">
                The Celebrations
              </h2>
              <div className="ornament-divider mt-8">
                <span className="text-gold-shimmer text-xl">✦</span>
              </div>
            </div>
          </ScrollReveal>

        </section>

      {/* FUNCTIONS */}
      <section className="relative py-8 md:py-16">
        
        {/* ─── CURTAIN 1: HALDI & MEHENDI ─── */}
        <div className="max-w-3xl mx-auto px-4">
          <CurtainHeader kicker="Day One" title="Haldi & Mehendi" script="soft hues and happy beginnings" />
        </div>
        <div className="mx-auto px-4 flex justify-center">
          <Curtain label="Tap to Unveil" minHeight="min(80vh, 160vw)">
            <div className="relative aspect-[9/16] h-[80vh] max-h-[80vh] rounded-xl overflow-hidden shadow-lg border border-[#e2d5c3] bg-[#fbf8f1]">
              <img src={haldiCardBg} alt="Haldi & Mehendi" className="w-full h-full object-cover" />
              <a
                href="https://www.google.com/maps/search/?api=1&query=Imara+by+Canto+Mahalaxmi+Race+Course+Mumbai"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10 cursor-pointer"
                title="View Venue on Map"
              />
            </div>
          </Curtain>
        </div>

        <div className="my-10 md:my-16"><KnottedDrape /></div>

        {/* ─── CURTAIN 2: SANGEET ─── */}
        <div className="max-w-3xl mx-auto px-4">
          <CurtainHeader kicker="Day One" title="Sangeet & Ring Ceremony" script="a night of music, dance & love" />
        </div>
        <div className="mx-auto px-4 flex justify-center">
          <Curtain label="Tap to Unveil" minHeight="min(80vh, 160vw)">
            <div className="relative aspect-[9/16] h-[80vh] max-h-[80vh] rounded-xl overflow-hidden shadow-lg border border-[#1a2a4a] bg-[#0d1c3a]">
              <img src={sangeetCardBg} alt="Sangeet & Ring Ceremony" className="w-full h-full object-cover" />
              <a
                href="https://www.google.com/maps/place/Taj+The+Trees/@19.0928262,72.9215139,17z/data=!4m9!3m8!1s0x3be7c7366770a291:0x18aaf36cc47a4d47!5m2!4m1!1i2!8m2!3d19.0928262!4d72.9215139!16s%2Fg%2F11j1fdbyql"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10 cursor-pointer"
                title="View Venue on Map"
              />
            </div>
          </Curtain>
        </div>

        <div className="my-10 md:my-16"><KnottedDrape /></div>

        {/* ─── CURTAIN 3: WEDDING ─── */}
        <div className="max-w-3xl mx-auto px-4">
          <CurtainHeader kicker="Day Two · The Vows" title="The Wedding" script="where two souls become one" />
        </div>
        <div className="mx-auto px-4 flex justify-center">
          <Curtain label="Tap to Unveil" minHeight="min(80vh, 160vw)">
            <div className="relative aspect-[9/16] h-[80vh] max-h-[80vh] rounded-xl overflow-hidden shadow-lg border border-[#f5d5c5] bg-[#fdf0ee]">
              <img src={weddingCardBg} alt="The Wedding" className="w-full h-full object-cover" />
              <a
                href="https://maps.google.com/?q=St.+Regis+Mumbai,+Lower+Parel"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10 cursor-pointer"
                title="View Venue on Map"
              />
            </div>
          </Curtain>
        </div>

      </section>

      {/* FOOTER */}
      <section className="relative px-4 md:px-6 py-20 md:py-32 mt-12 md:mt-24 text-center overflow-hidden" style={{ background: "linear-gradient(180deg, oklch(0.38 0.16 22) 0%, oklch(0.28 0.13 22) 100%)", borderTop: "1px solid oklch(0.75 0.16 80 / 0.4)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.06] md:opacity-10" style={{ backgroundImage: `url(${mandalaBg})`, backgroundSize: "600px", mixBlendMode: "soft-light", filter: "invert(1) brightness(1.6) contrast(0.6)" }} />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <ScrollReveal variant="fade" delay={150}>
            <h3 className="font-script text-4xl md:text-5xl text-gold-shimmer mb-8">Bless Us with Your Presence</h3>
          </ScrollReveal>

          <ScrollReveal variant="fade" delay={300}>
            <p className="font-serif italic text-base md:text-xl leading-relaxed max-w-2xl mx-auto mb-10" style={{ color: "var(--ivory)", opacity: 0.85 }}>
              As we step into this new chapter of love, laughter and lifelong togetherness, we humbly request your presence to shower us with your blessings and make these moments truly unforgettable.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade" delay={450}>
            <button onClick={() => { setLanterns(true); setTimeout(() => setLanterns(false), 8000); }} className="mb-10 px-8 py-3 rounded-full font-display text-[10px] md:text-xs tracking-[0.4em] uppercase hover:scale-105 transition-all animate-pulse-glow shadow-lg text-center leading-relaxed" style={{ background: "linear-gradient(135deg, oklch(0.42 0.16 22 / 0.85), oklch(0.30 0.13 22 / 0.95))", color: "var(--gold)", border: "1px solid oklch(0.75 0.16 80 / 0.5)", backdropFilter: "blur(8px)" }}>
              Light the Celebration<br />Click the button ✦
            </button>
          </ScrollReveal>

          <ScrollReveal variant="fade" delay={600}>
            <p className="font-script text-4xl md:text-5xl text-gold-shimmer mb-2">With love,</p>
            <p className="font-script text-5xl md:text-7xl text-gold-shimmer leading-tight mb-2">Darshan &</p>
            <p className="font-script text-5xl md:text-7xl text-gold-shimmer leading-tight mb-10">Mansi</p>
          </ScrollReveal>

          <ScrollReveal variant="fade" delay={750}>
            <p className="font-display tracking-[0.5em] text-[10px] md:text-xs uppercase" style={{ color: "oklch(0.85 0.12 80)" }}>
              — Blessings only —
            </p>
          </ScrollReveal>
        </div>
      </section>
      </main>
    </div>
  );
}
