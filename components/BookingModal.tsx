"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { useState } from "react";
import { submitContact } from "@/app/actions/submit-contact";
import { cn } from "@/lib/utils";

export default function BookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const res = await submitContact(formData);

    setIsSubmitting(false);

    if (res.success) {
      setSubmitted(true);
    } else {
      setError(res.error || "Failed to submit message.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-[#09090B] border border-[rgba(255,255,255,0.1)] p-8 rounded-xl shadow-2xl z-10"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#A1A1AA] hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[rgba(255,255,255,0.05)] rounded-full flex items-center justify-center mx-auto mb-6 border border-[rgba(255,255,255,0.1)]">
                  <div className="w-8 h-8 bg-accent-purple rounded-full animate-pulse" />
                </div>
                <h3 className="text-2xl font-medium text-white mb-2 font-heading tracking-widest uppercase">Message Received.</h3>
                <p className="text-[#A1A1AA]">We will get back to you shortly.</p>
                <button
                  onClick={onClose}
                  className="mt-8 px-8 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-medium text-white mb-6 font-heading uppercase tracking-widest">Contact Zerythous</h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot */}
                  <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />
                  
                  <div>
                    <input required name="name" type="text" placeholder="Name *" className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-purple transition-colors" />
                  </div>
                  <div>
                    <input required name="email" type="email" placeholder="Email *" className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-purple transition-colors" />
                  </div>
                  <div>
                    <input name="phone" type="tel" placeholder="Phone (Optional)" className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-purple transition-colors" />
                  </div>
                  <div>
                    <input required name="subject" type="text" placeholder="Subject *" className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-purple transition-colors" />
                  </div>
                  <div>
                    <textarea required name="message" placeholder="Message *" className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-purple transition-colors h-32 resize-none" />
                  </div>
                  
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  
                  <button 
                    disabled={isSubmitting}
                    type="submit"
                    className={cn(
                      "w-full flex items-center justify-center py-4 rounded-lg font-medium transition-colors uppercase tracking-widest",
                      isSubmitting ? "bg-[rgba(255,255,255,0.1)] text-[#A1A1AA] cursor-not-allowed" : "bg-white text-black hover:bg-accent-purple hover:text-white"
                    )}
                  >
                    {isSubmitting ? (
                      <><Loader2 size={16} className="animate-spin mr-2" /> Sending...</>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
