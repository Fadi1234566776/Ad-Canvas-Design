import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { projects, type Project } from "../data/projects";
import { Lightbox } from "../components/lightbox";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      
      {/* Lightbox Modal */}
      <Lightbox project={selectedProject} onClose={() => setSelectedProject(null)} />

      {/* Hero Section */}
      <section className="relative flex items-center justify-center overflow-hidden py-20 sm:py-24">
        {/* Subtle Radial Glow */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, rgba(139, 92, 246, 0.12) 0%, transparent 50%)"
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            {/* Upwork Badge */}
            <div className="mb-6 inline-flex items-center px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
              <span className="text-xs sm:text-sm font-medium text-primary">Top Rated Plus on Upwork ⭐</span>
            </div>

            {/* Stars */}
            <div className="mb-6 flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>

            {/* Headline */}
            <div className="mb-6 space-y-2">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground tracking-tight">
                Fadi Hanuod
              </h1>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-primary tracking-tight">
                Meta Ads Portfolio
              </h2>
            </div>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-muted-foreground font-light max-w-xl mx-auto">
              Top Rated Plus on Upwork • 200+ clients served • Scroll-stopping creatives built for performance
            </p>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-border/30" />

      {/* Gallery Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
              className="group relative cursor-pointer block rounded-lg overflow-hidden"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt="Meta Ad Creative"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/20 bg-card/30 py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Top Rated Plus on Upwork</p>
          <p className="text-muted-foreground text-sm leading-relaxed font-light">
            Specialized in Meta ad creatives, static ads, UGC concepts, and performance-focused design.
          </p>
        </div>
      </footer>

    </div>
  );
}
