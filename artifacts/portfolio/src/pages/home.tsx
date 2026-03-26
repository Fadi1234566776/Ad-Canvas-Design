import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Eye, Instagram, Linkedin, ArrowDown } from "lucide-react";
import { projects, type Project } from "../data/projects";
import { Lightbox } from "../components/lightbox";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const scrollToGallery = () => {
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      
      {/* Lightbox Modal */}
      <Lightbox project={selectedProject} onClose={() => setSelectedProject(null)} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-white/5">
        {/* Cinematic Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt="Cinematic background texture" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20 pb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            {/* Rating Badge */}
            <div className="mb-8 flex flex-col items-center gap-3">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-primary text-primary drop-shadow-[0_0_8px_rgba(255,183,77,0.5)]" />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-primary/90 uppercase">
                500+ Clients Served Globally
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif text-foreground leading-[1.1] mb-8 drop-shadow-xl">
              Meta Ad Creative <br className="hidden sm:block" />
              <span className="italic text-white/90">Portfolio</span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed mb-12 font-light">
              High-converting ad creatives that stop the scroll, drive clicks, 
              and maximize ROAS on Facebook & Instagram.
            </p>

            {/* CTA Button */}
            <button
              onClick={scrollToGallery}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full overflow-hidden shadow-[0_0_20px_rgba(255,183,77,0.3)] hover:shadow-[0_0_30px_rgba(255,183,77,0.5)] transition-all duration-300"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              <span className="relative text-sm tracking-widest uppercase">View My Work</span>
              <ArrowDown className="relative w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-32 px-6 sm:px-8 lg:px-12 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center sm:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">Featured Campaigns</h2>
          <div className="w-20 h-1 bg-primary/50 mx-auto sm:mx-0 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative cursor-pointer block rounded-xl overflow-hidden bg-card border border-card-border"
              onClick={() => setSelectedProject(project)}
            >
              {/* Image Container with 4:5 aspect ratio */}
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/60 transition-colors duration-500 ease-out flex items-center justify-center backdrop-blur-[0px] group-hover:backdrop-blur-[2px]">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white font-medium tracking-wide">
                    <Eye className="w-5 h-5" />
                    <span>View Creative</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Details */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background/90 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wider text-primary bg-primary/10 border border-primary/20 rounded-full">
                  {project.category}
                </span>
                <h3 className="text-xl font-serif font-medium text-white group-hover:text-primary transition-colors duration-300 line-clamp-1">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-card py-16 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="text-center md:text-left">
            <h4 className="font-serif text-2xl text-foreground mb-2">Meta Ad Creative</h4>
            <p className="text-muted-foreground text-sm font-light">Crafted for conversion. Designed for impact.</p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              <span className="text-xs font-medium text-primary uppercase tracking-wider">Available for new clients</span>
            </div>

            <div className="flex items-center gap-4">
              <a href="#" className="p-3 rounded-full bg-secondary hover:bg-white/10 text-muted-foreground hover:text-white transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 rounded-full bg-secondary hover:bg-white/10 text-muted-foreground hover:text-white transition-colors duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
        </div>
        
        <div className="max-w-5xl mx-auto mt-16 pt-8 border-t border-white/5 text-center text-xs text-muted-foreground/60 font-light">
          © {new Date().getFullYear()} Meta Ad Creative Portfolio. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
