"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BookingModal from "./BookingModal";

export default function FinalCTA() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <section className="relative py-32 md:py-48 overflow-hidden bg-[#FFFFFF]">
      {/* Abstract Architectural Visual */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="w-[800px] h-[800px] border border-[rgba(0,0,0,0.05)] rounded-full absolute" />
        <div className="w-[600px] h-[600px] border border-[rgba(0,0,0,0.1)] rounded-full absolute" />
        <div className="w-[400px] h-[400px] border border-[rgba(0,0,0,0.15)] rounded-full absolute" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,0,0,0.2)] to-transparent" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[rgba(0,0,0,0.2)] to-transparent" />
        <div className="absolute w-32 h-32 bg-accent-purple/20 blur-[60px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
        <h2 className="text-5xl md:text-7xl font-medium tracking-tight text-[#050505] mb-6">
          Your Next Product <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#71717A]">
            Shouldn&apos;t Be Average.
          </span>
        </h2>
        <p className="text-xl md:text-2xl text-[#52525B] mb-12 max-w-2xl mx-auto font-light">
          Bring us the problem.<br />We&apos;ll architect the system.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <Link
            href="#project-builder"
            className="w-full sm:w-auto flex items-center justify-center px-10 py-5 bg-black text-white text-lg font-medium rounded-md hover:bg-gray-200 transition-colors group"
          >
            Start Your Project
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center px-10 py-5 bg-[rgba(0,0,0,0.05)] text-[#050505] text-lg font-medium border border-[rgba(0,0,0,0.08)] rounded-md hover:bg-[rgba(0,0,0,0.1)] transition-colors"
          >
            Book a Discovery Call
          </button>
        </div>
      </div>

      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </section>
  );
}
