import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { feedAds, storyAds, squareAds, allProjects, type Project } from "../data/projects";
import { Lightbox } from "../components/lightbox";

interface SectionProps {
  label: string;
  format: string;
  projects: Project[];
  gridClass: string;
  aspectClass: string;
  onSelect: (p: Project) => void;
}

function AdSection({ label, format, projects, gridClass, aspectClass, onSelect }: SectionProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-4 px-1">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">{label}</span>
        <span className="text-xs text-muted-foreground/50 font-mono">{format}</span>
        <div className="flex-1 h-px bg-border/20" />
        <span className="text-xs text-muted-foreground/40">{projects.length} creatives</span>
      </div>
      <div className={`grid ${gridClass} gap-3`}>
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "50px" }}
            transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
            className="group relative cursor-pointer rounded-lg overflow-hidden bg-card"
            onClick={() => onSelect(project)}
          >
            <div className={`relative ${aspectClass} overflow-hidden`}>
              <img
                src={project.imageUrl}
                alt="Ad Creative"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleSelect = (project: Project) => setSelectedProject(project);
  const handleClose = () => setSelectedProject(null);

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">

      <Lightbox project={selectedProject} onClose={handleClose} />

      {/* Hero */}
      <section className="relative flex items-center justify-center overflow-hidden py-20 sm:py-24">
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at center, rgba(139, 92, 246, 0.12) 0%, transparent 55%)" }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="mb-6 inline-flex items-center px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
              <span className="text-xs sm:text-sm font-medium text-primary">Top Rated Plus on Upwork ⭐</span>
            </div>
            <div className="mb-6 flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <div className="mb-6 space-y-2">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground tracking-tight">
                Fadi Hanuod
              </h1>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-primary tracking-tight">
                Meta Ads Portfolio
              </h2>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground font-light max-w-xl mx-auto">
              Top Rated Plus on Upwork • 200+ clients served • Scroll-stopping creatives built for performance
            </p>
          </motion.div>
        </div>
      </section>

      <div className="w-full h-px bg-border/30" />

      {/* Gallery */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

        {/* 4:5 — Meta Feed Ads (3 columns) */}
        <AdSection
          label="Meta Feed Ads"
          format="4:5"
          projects={feedAds}
          gridClass="grid-cols-2 sm:grid-cols-3"
          aspectClass="aspect-[4/5]"
          onSelect={handleSelect}
        />

        {/* 9:16 — Story Ads (narrower columns to preserve tall ratio) */}
        <AdSection
          label="Story Ads"
          format="9:16"
          projects={storyAds}
          gridClass="grid-cols-3 sm:grid-cols-4 lg:grid-cols-6"
          aspectClass="aspect-[9/16]"
          onSelect={handleSelect}
        />

        {/* 1:1 — Square Ads */}
        <AdSection
          label="Square Ads"
          format="1:1"
          projects={squareAds}
          gridClass="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
          aspectClass="aspect-square"
          onSelect={handleSelect}
        />

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
