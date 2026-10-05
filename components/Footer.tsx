"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#FFFFFF] border-t border-[rgba(0,0,0,0.05)] pt-16 pb-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-16">
          
          <div>
            <Link href="/" className="text-2xl font-bold tracking-widest text-[#050505] block mb-2">
              ZERYTHOUS
            </Link>
            <p className="font-mono text-[10px] text-[#52525B] tracking-widest uppercase">
              Custom Software & AI Architecture
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
            <div className="flex flex-col gap-3">
              <Link href="#work" className="text-sm font-medium text-[#52525B] hover:text-[#050505] transition-colors">Work</Link>
              <Link href="#services" className="text-sm font-medium text-[#52525B] hover:text-[#050505] transition-colors">Services</Link>
              <Link href="#process" className="text-sm font-medium text-[#52525B] hover:text-[#050505] transition-colors">Process</Link>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="#about" className="text-sm font-medium text-[#52525B] hover:text-[#050505] transition-colors">About</Link>
              <Link href="#contact" className="text-sm font-medium text-[#52525B] hover:text-[#050505] transition-colors">Contact</Link>
            </div>
            <div className="flex flex-col gap-3">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#52525B] hover:text-[#050505] transition-colors">LinkedIn</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#52525B] hover:text-[#050505] transition-colors">GitHub</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-[rgba(0,0,0,0.05)]">
          <p className="font-mono text-[10px] text-[#52525B] tracking-widest uppercase">
            © 2026 Zerythous
          </p>
          <div className="flex gap-4 mt-4 sm:mt-0 font-mono text-[10px] text-[#52525B] tracking-widest uppercase">
            <span>India</span>
            <span>Remote</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
