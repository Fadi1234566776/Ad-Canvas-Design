import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Project } from "../data/projects";

interface LightboxProps {
  project: Project | null;
  onClose: () => void;
}

export function Lightbox({ project, onClose }: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all duration-200 z-50 group"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
          </button>

          {/* Image Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-auto h-auto max-h-[85vh]">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-lg shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10"
              />
            </div>
            
            {/* Project Details */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-b-lg pointer-events-none text-center sm:text-left"
            >
              <div className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wider text-primary bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full">
                {project.category}
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-medium text-white drop-shadow-lg">
                {project.title}
              </h3>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
