import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Banknote, Clock3, PenTool } from "lucide-react";
import { feedAds, storyAds, squareAds, allProjects, type Project } from "../data/projects";
import { Lightbox } from "../components/lightbox";

const UPWORK_PROFILE_URL = "https://www.upwork.com/freelancers/~01ff81f80387338c54";

function HireBar() {
  return (
    <aside
      aria-label="Work with Fadi"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 shadow-[0_-8px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <p className="text-[13px] leading-snug font-medium text-foreground/90 sm:text-sm">
            Let’s design your next winning ad.
          </p>
          <p className="mt-1 hidden text-xs text-muted-foreground sm:block">
            Work with me directly on Upwork.
          </p>
        </div>
        <a
          href={UPWORK_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Hire Fadi on Upwork (opens in a new tab)"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:px-5 sm:text-[13px]"
        >
          <span className="sm:hidden">Hire Me</span>
          <span className="hidden sm:inline">Hire Me on Upwork</span>
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </aside>
  );
}

interface SectionProps {
  label: string;
  format: string;
  projects: Project[];
  gridClass: string;
  aspectClass: string;
  onSelect: (p: Project) => void;
  eagerCount?: number;
}

function AdSection({ label, format, projects, gridClass, aspectClass, onSelect, eagerCount = 0 }: SectionProps) {
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
                loading={index < eagerCount ? "eager" : "lazy"}
                fetchPriority={index < Math.min(eagerCount, 3) ? "high" : "auto"}
                decoding="async"
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
    <div className="min-h-screen bg-background pb-28 selection:bg-primary selection:text-primary-foreground">

      <Lightbox project={selectedProject} onClose={handleClose} />

      {/* Hero */}
      <section className="relative flex items-center justify-center overflow-hidden pt-12 pb-12 sm:pt-16 sm:pb-14">
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, hsl(var(--primary) / 0.12) 0%, transparent 55%)",
            maskImage: "linear-gradient(to bottom, black 0%, black 45%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 45%, transparent 100%)",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary ring-4 ring-primary/10" />
              <span className="text-[10px] font-medium tracking-[0.18em] text-foreground/60 uppercase sm:text-[11px]">
                Available for projects
              </span>
            </div>

            <h1 className="mb-3 text-4xl leading-tight font-bold tracking-[-0.04em] text-foreground sm:text-5xl md:text-6xl">
              Fadi Hanuod
            </h1>
            <h2 className="mb-3 text-lg leading-snug font-semibold text-balance text-primary sm:text-xl">
              Direct Response &amp; Static Ad Design
            </h2>

            <div className="mx-auto mb-6 max-w-2xl space-y-1.5">
              <p className="text-sm leading-relaxed text-balance text-foreground/70 sm:text-[15px]">
                Scroll-stopping visuals. Clear messaging. Static ads built to convert.
              </p>
              <p className="text-xs leading-relaxed text-balance text-foreground/45 sm:text-[13px]">
                Performance-focused design for Meta ads and eCommerce brands.
              </p>
            </div>

            <div className="flex justify-center text-xs text-foreground/60 sm:text-[13px]">
              <a
                href={UPWORK_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Top Rated Plus on Upwork, rated 4.9 out of 5"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-sm transition-colors hover:text-foreground/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                <img
                  src="/upwork-top-rated-plus.svg"
                  width="18"
                  height="20"
                  alt=""
                  aria-hidden="true"
                  className="h-5 w-[18px] shrink-0"
                />
                <span>Top Rated Plus on Upwork</span>
                <span className="ml-0.5 rounded-md border border-foreground/8 bg-foreground/[0.025] px-1.5 py-0.5 text-[10px] font-medium text-foreground/45 tabular-nums">
                  4.9/5
                </span>
              </a>
            </div>

            <dl
              aria-label="Experience at a glance"
              className="mx-auto mt-6 grid w-full max-w-lg grid-cols-3 divide-x divide-foreground/10"
            >
              <div className="flex min-w-0 flex-col items-center gap-1.5 px-1 sm:px-4">
                <dt className="text-[10px] leading-relaxed text-foreground/45 sm:text-xs">Earned on Upwork</dt>
                <dd className="order-first inline-flex items-center gap-1.5 text-lg font-semibold tracking-tight text-foreground/90 tabular-nums sm:gap-2 sm:text-2xl">
                  <Banknote size={16} className="shrink-0 text-primary/65" aria-hidden="true" />
                  $80K+
                </dd>
              </div>
              <div className="flex min-w-0 flex-col items-center gap-1.5 px-1 sm:px-4">
                <dt className="text-[10px] leading-relaxed text-foreground/45 sm:text-xs">Hours on Upwork</dt>
                <dd className="order-first inline-flex items-center gap-1.5 text-lg font-semibold tracking-tight text-foreground/90 tabular-nums sm:gap-2 sm:text-2xl">
                  <Clock3 size={16} className="shrink-0 text-primary/65" aria-hidden="true" />
                  4,000+
                </dd>
              </div>
              <div className="flex min-w-0 flex-col items-center gap-1.5 px-1 sm:px-4">
                <dt className="text-[10px] leading-relaxed text-foreground/45 sm:text-xs">Static ad designs</dt>
                <dd className="order-first inline-flex items-center gap-1.5 text-lg font-semibold tracking-tight text-foreground/90 tabular-nums sm:gap-2 sm:text-2xl">
                  <PenTool size={16} className="shrink-0 text-primary/65" aria-hidden="true" />
                  1,000+
                </dd>
              </div>
            </dl>
          </motion.div>
        </div>
      </section>

      <div aria-hidden="true" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="h-px w-full"
          style={{
            background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.3) 30%, hsl(var(--primary) / 0.3) 70%, transparent 100%)",
          }}
        />
      </div>

      {/* Gallery */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

        {/* 4:5 — Meta Feed Ads (3 columns) */}
        <AdSection
          label="Meta Feed Ads"
          format="4:5"
          projects={feedAds}
          gridClass="grid-cols-2 sm:grid-cols-3"
          aspectClass="aspect-[4/5]"
          eagerCount={6}
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

      {!selectedProject && <HireBar />}

    </div>
  );
}

