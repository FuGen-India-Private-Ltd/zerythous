"use client";

import { useState } from "react";
import { ArrowRight, Calendar } from "lucide-react";
import BookingModal from "./BookingModal";
import Link from "next/link";

export default function Contact() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <section id="contact" className="py-32 md:py-48 bg-[#08080A] relative overflow-hidden">
      {/* Subtle abstract background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[rgba(255,255,255,0.05)] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[rgba(255,255,255,0.1)] rounded-full" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          
          <h2 className="text-[12vw] sm:text-[90px] md:text-[130px] font-medium leading-[0.9] tracking-tighter text-white mb-12 font-heading">
            LET&apos;S BUILD <br />
            SOMETHING <br />
            <span className="text-accent-purple">SERIOUS.</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-[#A1A1AA] font-light max-w-2xl mb-16 leading-relaxed">
            Have a product, platform, or system that needs to be engineered? <br/><br/>Let&apos;s talk.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 mb-20 w-full sm:w-auto">
            <Link
              href="#project-builder"
              className="w-full sm:w-auto flex items-center justify-center px-10 py-5 bg-white text-black text-sm font-medium tracking-wide rounded-full hover:bg-gray-200 hover:scale-[1.02] transition-all duration-300 group"
            >
              START A PROJECT
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center px-10 py-5 bg-transparent border border-[rgba(255,255,255,0.2)] text-white text-sm font-medium tracking-wide rounded-full hover:bg-[rgba(255,255,255,0.05)] transition-all duration-300"
            >
              <Calendar size={18} className="mr-2 opacity-70" />
              CONTACT ZERYTHOUS
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-8 md:gap-16 pt-16 border-t border-[rgba(255,255,255,0.08)] w-full justify-center">
            <div className="text-center">
              <span className="font-mono text-[10px] text-[#A1A1AA] uppercase tracking-widest block mb-2">EMAIL US</span>
              <a href="mailto:zerythous345@gmail.com" className="text-lg text-white hover:text-accent-purple transition-colors">
                zerythous345@gmail.com
              </a>
            </div>
            <div className="hidden sm:block w-px h-10 bg-[rgba(255,255,255,0.1)]" />
            <div className="text-center">
              <span className="font-mono text-[10px] text-[#A1A1AA] uppercase tracking-widest block mb-2">CALL US</span>
              <a href="tel:+918660904369" className="text-lg text-white hover:text-accent-purple transition-colors">
                +91 8660904369
              </a>
            </div>
          </div>

        </div>
      </div>

      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </section>
  );
}
