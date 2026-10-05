"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { booking } from "@/data/booking";
import { contact } from "@/data/contact";

export default function BookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-#FFFFFF/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-[#09090B] border border-[rgba(0,0,0,0.08)] p-8 rounded-xl shadow-2xl z-10"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#52525B] hover:text-[#050505] transition-colors"
            >
              <X size={20} />
            </button>

            <h3 className="text-2xl font-semibold mb-2">Book a Discovery Call</h3>
            
            {booking.url === "BOOKING_URL" ? (
              <div className="mt-6 space-y-6">
                <p className="text-[#52525B] leading-relaxed">
                  Online booking is currently being configured. Please contact us directly or submit a project brief.
                </p>
                <div className="space-y-4">
                  <a
                    href={`mailto:${contact.email}`}
                    className="block w-full text-center px-6 py-3 bg-[rgba(0,0,0,0.05)] border border-[rgba(0,0,0,0.08)] hover:bg-[rgba(0,0,0,0.1)] transition-colors rounded-md text-[#050505] font-medium"
                  >
                    Email: {contact.email}
                  </a>
                  <a
                    href={`tel:${contact.phoneLink}`}
                    className="block w-full text-center px-6 py-3 bg-[rgba(0,0,0,0.05)] border border-[rgba(0,0,0,0.08)] hover:bg-[rgba(0,0,0,0.1)] transition-colors rounded-md text-[#050505] font-medium"
                  >
                    Phone: {contact.phone}
                  </a>
                  <a
                    href="#project-builder"
                    onClick={onClose}
                    className="block w-full text-center px-6 py-3 bg-black hover:bg-gray-200 transition-colors rounded-md text-white font-medium"
                  >
                    Submit Project Brief
                  </a>
                </div>
              </div>
            ) : (
              <div className="mt-6">
                <p className="text-[#52525B] mb-6">
                  Schedule a time to discuss your project architecture and engineering requirements.
                </p>
                <a
                  href={booking.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-200 transition-colors"
                >
                  Continue to Calendar
                </a>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
