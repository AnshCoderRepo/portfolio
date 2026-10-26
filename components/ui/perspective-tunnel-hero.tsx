"use client";

import {
    motion,
    useTransform,
    useReducedMotion,
    useMotionValue,
    useSpring,
    MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface TunnelServiceItem {
    src: string;
    title: string;
}

const DEFAULT_SERVICE_IMAGES: TunnelServiceItem[] = [
    { 
        src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop", 
        title: "Full-Stack Web Systems" 
    },
    { 
        src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop", 
        title: "AI & Neural Agents" 
    },
    { 
        src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop", 
        title: "Cloud & DevOps" 
    },
    { 
        src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop", 
        title: "Mobile Engineering" 
    },
    { 
        src: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop", 
        title: "UI/UX & Design Systems" 
    },
    { 
        src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop", 
        title: "High-Throughput APIs" 
    },
    { 
        src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop", 
        title: "Cybersecurity & Audit" 
    },
    { 
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop", 
        title: "Data & Analytics" 
    },
    { 
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop", 
        title: "Enterprise Solutions" 
    },
];

interface TunnelCardData {
    item: TunnelServiceItem;
    angleCos: number;
    angleSin: number;
    radiusFactorX: number;
    radiusFactorY: number;
    rotationZ: number;
    index: number;
}

const buildTunnelCards = (items: TunnelServiceItem[]): TunnelCardData[] => {
    return items.map((item, i) => {
        const goldenAngle = i * 137.5 * (Math.PI / 180);
        const radiusFactorX = 0.28 + (i % 3) * 0.08;
        const radiusFactorY = 0.26 + (i % 2) * 0.09;

        return {
            item,
            angleCos: Math.cos(goldenAngle),
            angleSin: Math.sin(goldenAngle),
            radiusFactorX,
            radiusFactorY,
            rotationZ: (i % 2 === 0 ? 1 : -1) * (3 + (i % 5) * 2),
            index: i,
        };
    });
};

const SPRING_CONFIG = { stiffness: 60, damping: 25, mass: 0.5 };

interface StageDimensions {
    width: number;
    height: number;
    isMobile: boolean;
}

function useCameraParallax(enabled: boolean) {
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const x = useSpring(rawX, SPRING_CONFIG);
    const y = useSpring(rawY, SPRING_CONFIG);

    useEffect(() => {
        if (!enabled) return;
        const onMove = (e: PointerEvent) => {
            rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
            rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
    }, [enabled, rawX, rawY]);

    return { x, y };
}

interface TunnelCardProps {
    card: TunnelCardData;
    progress: MotionValue<number>;
    pointer: { x: MotionValue<number>; y: MotionValue<number> };
    total: number;
    stage: StageDimensions;
}

function TunnelCard({ card, progress, pointer, total, stage }: TunnelCardProps) {
    const staggerSpan = 0.55;
    const start = (card.index / total) * (1 - staggerSpan);
    const end = start + staggerSpan;

    const localProgress = useTransform(progress, [start, end], [0, 1]);

    const farZ = stage.isMobile ? -1200 : -1700;
    const nearZ = stage.isMobile ? 350 : 500;
    const z = useTransform(localProgress, [0, 1], [farZ, nearZ]);

    const opacity = useTransform(localProgress, [0, 0.18, 0.82, 0.98], [0, 1, 1, 0]);

    const cardWidth = stage.isMobile
        ? Math.max(130, Math.min(180, stage.width * 0.38))
        : Math.max(180, Math.min(270, stage.width * 0.18));

    const baseX = card.angleCos * (stage.width * card.radiusFactorX);
    const baseY = card.angleSin * (stage.height * card.radiusFactorY);
    const panStrength = stage.isMobile ? 20 : 45;

    const transform = useTransform(
        [z, pointer.x, pointer.y],
        ([currZ, px, py]: number[]) => {
            const offsetX = baseX - px * panStrength;
            const offsetY = baseY - py * panStrength;
            return `translate3d(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px), ${currZ}px) rotateZ(${card.rotationZ}deg)`;
        }
    );

    return (
        <motion.div
            style={{
                width: cardWidth,
                transform,
                opacity,
                zIndex: card.index + 1,
            }}
            className="pointer-events-auto absolute left-1/2 top-1/2 aspect-[4/5] will-change-transform select-none cursor-pointer"
        >
            <div className="group relative h-full w-full overflow-hidden rounded-2xl bg-neutral-200 dark:bg-neutral-900 shadow-2xl shadow-neutral-950/20 dark:shadow-black/90 ring-1 ring-black/10 dark:ring-white/15 transition-all duration-500 hover:ring-cyan-500/70 dark:hover:ring-cyan-400/70 hover:shadow-cyan-500/25">
                <img
                    src={card.item.src}
                    alt={card.item.title}
                    draggable={false}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-4 sm:p-5">
                    <span className="text-xs sm:text-sm font-mono tracking-widest uppercase text-white/95 drop-shadow-md">
                        {card.item.title}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

export interface PerspectiveTunnelHeroProps {
    items?: TunnelServiceItem[];
    tagline?: string;
    title?: React.ReactNode;
    subtitle?: string;
    className?: string;
    id?: string;
}

export function PerspectiveTunnelHero({
    items = DEFAULT_SERVICE_IMAGES,
    tagline = "OUR SERVICES & CAPABILITIES",
    title = (
        <>
            SERVICES BUILT
            <br />
            FOR SCALE.
        </>
    ),
    subtitle = "Scroll trackpad or wheel to fly through our core engineering disciplines and specialized services.",
    className,
    id = "services",
}: PerspectiveTunnelHeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();

    const [stage, setStage] = useState<StageDimensions>({
        width: 1440,
        height: 900,
        isMobile: false,
    });

    const tunnelCards = buildTunnelCards(items);

    useEffect(() => {
        const updateDimensions = () => {
            setStage({
                width: window.innerWidth,
                height: window.innerHeight,
                isMobile: window.innerWidth < 768,
            });
        };

        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    // Raw motion value controlled directly by mouse wheel / touch trackpad
    const rawProgress = useMotionValue(0);
    const smoothProgress = useSpring(rawProgress, {
        stiffness: 80,
        damping: 30,
        restDelta: 0.0001,
    });

    // Handle wheel scrolling locally inside the container without scroll trapping
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const handleWheel = (e: WheelEvent) => {
            const current = rawProgress.get();
            const delta = e.deltaY * 0.0008; // Speed of tunnel travel
            const next = Math.min(1, Math.max(0, current + delta));

            // Prevent natural page scroll while progressing through corridor,
            // but release to page scroll when user reaches extreme boundaries
            if ((delta > 0 && current < 0.98) || (delta < 0 && current > 0.02)) {
                e.preventDefault();
                rawProgress.set(next);
            } else {
                rawProgress.set(next);
            }
        };

        el.addEventListener("wheel", handleWheel, { passive: false });
        return () => el.removeEventListener("wheel", handleWheel);
    }, [rawProgress]);

    const pointer = useCameraParallax(!reduce);

    const titleScale = useTransform(smoothProgress, [0, 0.5, 1], [0.7, 1, 1.35]);
    const titleOpacity = useTransform(smoothProgress, [0, 0.12, 0.85, 1], [0.25, 1, 1, 0]);
    const promptOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);

    return (
        <section
            ref={containerRef}
            id={id}
            aria-label="Services 3D Perspective Tunnel"
            className={cn(
                "relative h-[100svh] w-full overflow-hidden bg-background text-foreground select-none flex items-center justify-center border-t border-b border-surface-border",
                className
            )}
            style={{
                perspective: stage.isMobile ? "900px" : "1200px",
                transformStyle: "preserve-3d",
            }}
        >
            {/* Immersive Background Grid & Glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] dark:bg-[radial-gradient(#0e7490_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)] opacity-40 dark:opacity-50" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.12)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.18)_0%,transparent_75%)]" />

            {/* Depth Ring Guides */}
            <div className="pointer-events-none absolute h-[48vmin] w-[48vmin] rounded-full border border-cyan-500/15 dark:border-cyan-400/10" />
            <div className="pointer-events-none absolute h-[76vmin] w-[76vmin] rounded-full border border-dashed border-neutral-700/40 dark:border-white/10" />

            {/* Central Anchor Typography */}
            <motion.div
                style={{ scale: titleScale, opacity: titleOpacity }}
                className="pointer-events-none z-0 flex flex-col items-center text-center px-6 max-w-2xl"
            >
                <p className="text-xs font-mono uppercase tracking-[0.4em] text-cyan-400 dark:text-cyan-300 mb-4 font-semibold">
                    {tagline}
                </p>
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter leading-[0.95] bg-gradient-to-b from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
                    {title}
                </h2>
                <p className="mt-4 max-w-[42ch] text-sm sm:text-base font-light text-neutral-300/80">
                    {subtitle}
                </p>
            </motion.div>

            {/* Scroll Prompt */}
            <motion.div
                style={{ opacity: promptOpacity }}
                className="pointer-events-none absolute bottom-8 z-20 flex flex-col items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-neutral-400"
            >
                <span>Scroll Trackpad to Explore</span>
                <div className="h-6 w-px bg-gradient-to-b from-cyan-400 to-transparent" />
            </motion.div>

            {/* 3D Z-Space Plane */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ transformStyle: "preserve-3d" }}
            >
                {tunnelCards.map((card, i) => (
                    <TunnelCard
                        key={i}
                        card={card}
                        progress={smoothProgress}
                        pointer={pointer}
                        total={tunnelCards.length}
                        stage={stage}
                    />
                ))}
            </div>
        </section>
    );
}

// Support both CurtainSplitHero and PerspectiveTunnelHero imports
export const CurtainSplitHero = PerspectiveTunnelHero;
export default PerspectiveTunnelHero;
