"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { name: "ARCHITECTURE", href: "#architecture" },
    { name: "ESTIMATOR", href: "#estimator" },
    { name: "PROCESS", href: "#process" },
    { name: "TEAM", href: "#team" },
  ];

  return (
    <>
      <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 md:px-6 pointer-events-none">
        <div
          className={cn(
            "pointer-events-auto flex items-center justify-between transition-all duration-500 rounded-full",
            scrolled
              ? "bg-[#FAFAF9]/95 dark:bg-neutral-950/90 border border-[rgba(9,9,11,0.08)] dark:border-white/15 py-3 px-6 md:px-8 w-full md:max-w-4xl shadow-xl dark:shadow-2xl shadow-black/5 dark:shadow-black/80 backdrop-blur-xl"
              : "bg-[#FAFAF9]/60 dark:bg-neutral-950/40 border border-[rgba(9,9,11,0.06)] dark:border-white/[0.08] py-4 px-6 md:px-10 w-full md:max-w-6xl backdrop-blur-md"
          )}
        >
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-2 h-2 rounded-full bg-accent-purple group-hover:scale-150 transition-transform duration-300 animate-pulse" />
            <span className="text-base md:text-lg font-bold tracking-widest text-[#09090B] dark:text-white uppercase font-heading">
              ZERYTHOUS<span className="text-accent-purple">.</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-mono tracking-widest text-[#52525B] hover:text-[#09090B] dark:text-neutral-400 dark:hover:text-white transition-colors relative py-1"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs & Theme Toggle */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/admin/login"
              className="text-xs font-mono text-[#52525B] hover:text-[#09090B] dark:text-neutral-400 dark:hover:text-white px-2 py-1.5 transition-colors"
            >
              ADMIN
            </Link>

            <ThemeToggle />

            <Link
              href="#project-builder"
              className="text-xs font-mono font-medium tracking-wider px-5 py-2.5 rounded-full bg-[#09090B] text-white hover:bg-accent-purple dark:bg-white dark:text-[#09090B] dark:hover:bg-accent-purple dark:hover:text-white transition-all duration-300 shadow-md flex items-center gap-1.5 group"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Trigger & Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="text-[#09090B] dark:text-white p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-[#FAFAF9] dark:bg-neutral-950 p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/[0.08] dark:border-white/10">
                <Link
                  href="/"
                  className="text-lg font-bold tracking-widest text-[#09090B] dark:text-white flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="w-2 h-2 rounded-full bg-accent-purple" />
                  ZERYTHOUS.
                </Link>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    className="text-[#52525B] dark:text-neutral-400 hover:text-[#09090B] dark:hover:text-white p-2 border border-black/10 dark:border-white/10 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close navigation menu"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <nav className="flex flex-col space-y-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-2xl font-light text-[#52525B] dark:text-neutral-300 hover:text-accent-purple dark:hover:text-accent-purple transition-colors tracking-tight"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="space-y-3 pt-6 border-t border-black/[0.08] dark:border-white/10">
              <Link
                href="#project-builder"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 text-center text-xs tracking-widest font-mono font-bold bg-[#09090B] text-white hover:bg-accent-purple dark:bg-white dark:text-[#09090B] dark:hover:bg-accent-purple dark:hover:text-white py-4 rounded-xl transition-colors shadow-lg"
              >
                <span>START A PROJECT</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center text-xs font-mono text-[#52525B] dark:text-neutral-400 py-3 rounded-xl hover:text-[#09090B] dark:hover:text-white transition-colors"
              >
                ADMIN CMS PORTAL →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
