"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import BookingModal from "./BookingModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "WORK", href: "#work" },
    { name: "CAPABILITIES", href: "#services" },
    { name: "PROCESS", href: "#process" },
    { name: "ABOUT", href: "#about" },
  ];

  return (
    <>
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 md:px-0 pointer-events-none">
        <div
          className={cn(
            "pointer-events-auto flex items-center justify-between transition-all duration-500 rounded-full",
            scrolled
              ? "bg-[#FAFAFA]/80 backdrop-blur-md border border-[rgba(0,0,0,0.08)] py-3 px-6 md:px-8 w-full md:max-w-4xl shadow-2xl"
              : "bg-transparent py-4 px-6 md:px-12 w-full md:max-w-[1400px]"
          )}
        >
          <Link href="/" className="text-lg md:text-xl font-bold tracking-widest text-[#050505]">
            ZERYTHOUS
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-mono tracking-widest text-[#52525B] hover:text-[#050505] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
            <Link
              href="#project-builder"
              className={cn(
                "text-xs font-mono tracking-widest px-5 py-2.5 rounded-full transition-all duration-300",
                scrolled 
                  ? "bg-black text-white hover:bg-gray-200" 
                  : "bg-black text-white hover:bg-gray-200"
              )}
            >
              START A PROJECT
            </Link>
          </div>

          <button
            className="md:hidden text-[#050505] p-2"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-[#FFFFFF] p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-12">
              <Link href="/" className="text-xl font-bold tracking-widest text-[#050505]" onClick={() => setMobileMenuOpen(false)}>
                ZERYTHOUS
              </Link>
              <button
                className="text-[#050505] p-2 border border-[rgba(0,0,0,0.08)] rounded-full"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            
            <nav className="flex flex-col space-y-8 flex-1 mt-12">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-4xl font-light text-[#52525B] hover:text-[#050505] transition-colors tracking-tight"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col space-y-4 pb-8">
              <Link
                href="#project-builder"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center text-sm tracking-widest font-mono bg-black text-white py-4 rounded-full transition-colors"
              >
                START A PROJECT
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
    </>
  );
}
