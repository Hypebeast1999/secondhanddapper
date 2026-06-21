import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

const WordsPullUp = ({ text, className = "", showAsterisk = false, style }: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

export default function StoreHero({ onShopClick }: { onShopClick: () => void }) {
  return (
    <section className="h-screen w-full">
      <div className="relative h-full w-full overflow-hidden">
        {/* Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/hero.mp4"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/55" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/85" />
        <div className="pointer-events-none absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full bg-red-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 h-[420px] w-[420px] rounded-full bg-red-600/10 blur-3xl" />

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-10 sm:px-6 md:px-10">
          <div className="flex flex-wrap items-center gap-5">
            <h1
              className="font-extrabold leading-[0.85] tracking-[-0.05em] text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[8.5vw] text-white"
            >
              <WordsPullUp text="Secondhanddapper" />
            </h1>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onClick={onShopClick}
              className="group inline-flex items-center gap-2 self-center rounded-full bg-red-600 py-1.5 pl-6 pr-1.5 text-sm font-bold text-white shadow-lg shadow-red-600/40 transition-all hover:gap-3 hover:bg-red-700 sm:text-base"
            >
              Shop now
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                <ArrowRight className="h-4 w-4 text-white" />
              </span>
            </motion.button>
          </div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-sm text-white/70 md:text-base"
            style={{ lineHeight: 1.3 }}
          >
            Buy and sell the culture's most wanted — verified NBA team fits, designer rugs, and
            the sneakers everyone's chasing, at the current market price.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
