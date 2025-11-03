import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type PartnerOffer = {
  partnerName: string;
  reward: string;
  tagline: string;
  cta: string;
  image: string;
  link: string;
};

const PartnerCarousel: React.FC<{ offers: PartnerOffer[] }> = ({ offers }) => {
  return (
    <div className="w-full rounded-2xl bg-white/5 border border-white/10 p-4 md:p-6 shadow-[0_0_40px_rgba(0,0,0,0.8)] relative overflow-hidden">
      {/* neon backing glow */}
      <div className="absolute -inset-32 bg-gradient-to-r from-fuchsia-600/20 via-cyan-400/10 to-transparent blur-3xl pointer-events-none" />

      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-semibold uppercase tracking-wide text-white/40 mb-1 flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-fuchsia-400 to-cyan-400 shadow-[0_0_12px_rgba(168,85,247,1)]" />
            Partner Spotlight
          </div>

          {/* We just show first partner for now. Cursor can auto-rotate later. */}
          {offers[0] && (
            <>
              <div className="text-lg font-semibold text-white leading-snug flex items-center gap-2 flex-wrap">
                <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                  {offers[0].partnerName}
                </span>
                <span className="text-white/50 text-sm font-normal">
                  {offers[0].tagline}
                </span>
              </div>

              <div className="text-white/60 text-[12px] leading-relaxed mt-1 max-w-md">
                {offers[0].reward}
              </div>

              <div className="mt-3">
                <a
                  href={offers[0].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg text-[11px] font-semibold px-3 py-2 bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-black shadow-[0_0_20px_rgba(168,85,247,0.6)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] border border-transparent"
                >
                  {offers[0].cta}
                </a>
              </div>
            </>
          )}
        </div>

        {/* partner art */}
        {offers[0] && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { duration: 0.2 } }}
            className="w-full md:w-44 lg:w-52 aspect-[4/3] rounded-xl bg-black/40 border border-white/10 flex items-center justify-center overflow-hidden relative"
          >
            {offers[0].image ? (
              <Image
                src={offers[0].image}
                alt={offers[0].partnerName}
                width={200}
                height={150}
                className="w-full h-full object-cover opacity-60 mix-blend-screen"
              />
            ) : (
              <div className="text-white/30 text-[10px] text-center leading-tight px-2">
                {offers[0].partnerName} Artwork
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PartnerCarousel;
