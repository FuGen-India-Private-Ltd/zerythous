import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-black/[0.08] dark:border-white/[0.08] pt-16 pb-12 text-[#52525B] dark:text-neutral-400 transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-16">
          
          <div>
            <Link href="/" className="text-2xl font-bold tracking-widest text-[#09090B] dark:text-white block mb-2 font-heading uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-purple" />
              ZERYTHOUS<span className="text-accent-purple">.</span>
            </Link>
            <p className="font-mono text-xs text-[#71717A] dark:text-neutral-400 tracking-wider">
              Autonomous Systems & Custom AI Architecture
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 text-xs font-mono">
            <div className="flex flex-col gap-3">
              <span className="text-[#09090B] dark:text-white font-bold tracking-wider uppercase mb-1">NAVIGATION</span>
              <Link href="#work" className="hover:text-accent-purple transition-colors">Selected Work</Link>
              <Link href="#services" className="hover:text-accent-purple transition-colors">Capabilities</Link>
              <Link href="#architecture" className="hover:text-accent-purple transition-colors">Architecture Topology</Link>
              <Link href="#estimator" className="hover:text-accent-purple transition-colors">Sprint Estimator</Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[#09090B] dark:text-white font-bold tracking-wider uppercase mb-1">ENGAGEMENT</span>
              <Link href="#process" className="hover:text-accent-purple transition-colors">Engineering Process</Link>
              <Link href="#team" className="hover:text-accent-purple transition-colors">Leadership Cells</Link>
              <Link href="#contact" className="hover:text-accent-purple transition-colors">Direct Dispatch</Link>
              <Link href="/admin/login" className="text-accent-purple hover:underline font-bold transition-colors">Admin CMS Portal →</Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[#09090B] dark:text-white font-bold tracking-wider uppercase mb-1">CHANNELS</span>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent-purple transition-colors">LinkedIn</a>
              <a href="https://github.com/FuGen-India-Private-Ltd" target="_blank" rel="noopener noreferrer" className="hover:text-accent-purple transition-colors">GitHub Repository</a>
              <a href="mailto:zerythous345@gmail.com" className="hover:text-accent-purple transition-colors">zerythous345@gmail.com</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-black/[0.08] dark:border-white/[0.08] text-xs font-mono text-[#71717A] dark:text-neutral-400">
          <p className="tracking-wider">
            © 2026 Zerythous Systems & Enterprise AI Engineering. All rights reserved.
          </p>
          <div className="flex items-center gap-6 mt-4 sm:mt-0 tracking-wider">
            <span className="flex items-center gap-1.5 text-accent-purple font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-pulse" />
              SYSTEM STATUS: ALL OPERATIONAL
            </span>
            <span>INDIA // GLOBAL REMOTE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
