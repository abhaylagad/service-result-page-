import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  TrendingUp, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  Target,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { caseStudies } from "./data";

interface CaseStudy {
  id: number;
  name: string;
  category: string;
  image: string;
  before: string;
  after: string;
  story: string;
}

const getSplitStory = (story: string) => {
  const sentences = story.match(/[^.!?]+[.!?]+(?:\s+|$)/g) || [story];
  if (sentences.length <= 2) {
    return { intro: story, remainder: "" };
  }
  const intro = sentences.slice(0, 2).join("").trim();
  const remainder = sentences.slice(2).join("").trim();
  return { intro, remainder };
};

const formatMetric = (text: string) => {
  const match = text.match(/^([^(]+)(?:\s+\(([^)]+)\))?$/);
  if (match) {
    const value = match[1].trim();
    const note = match[2] ? `(${match[2]})` : null;
    return { value, note };
  }
  return { value: text, note: null };
};

interface CaseStudyCardProps {
  key?: any;
  study: CaseStudy;
  cardVariants: any;
}

function CaseStudyCard({ study, cardVariants }: CaseStudyCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { intro, remainder } = getSplitStory(study.story);
  const formattedBefore = formatMetric(study.before);
  const formattedAfter = formatMetric(study.after);

  return (
    <motion.div 
      variants={cardVariants}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200/80 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Header: Avatar, Name, Category */}
        <div className="flex items-start gap-3 sm:gap-4 mb-5 md:mb-6">
          <div className="relative shrink-0">
            <img 
              src={study.image} 
              alt={`${study.name} Avatar`} 
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full object-cover shadow-inner border-2 border-slate-100/80 bg-slate-100"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-full p-1 shadow-md">
              <TrendingUp className="w-3 h-3 md:w-3.5 md:h-3.5" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <span className="inline-flex items-center gap-1 text-[10px] md:text-[11px] font-bold text-blue-600 bg-blue-50/70 border border-blue-100/60 px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1.5">
              {study.category}
            </span>
            <h3 className="text-base sm:text-lg md:text-xl font-display font-bold text-slate-900 tracking-tight leading-snug whitespace-normal break-words">
              {study.name}
            </h3>
            <div className="flex items-center gap-1.5 text-[11px] md:text-xs text-slate-400 mt-1">
              <Award className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span>Verified System Deployed</span>
            </div>
          </div>
        </div>

        {/* Before & After Metrics Side-by-Side */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-5 md:mb-6">
          {/* Before Box */}
          <div className="bg-rose-50/50 border border-rose-100/80 rounded-xl p-2.5 sm:p-3.5 flex flex-col justify-between">
            <span className="text-[9px] sm:text-[10px] font-bold text-rose-500 uppercase tracking-widest block mb-1">
              BEFORE WORKING WITH US
            </span>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base md:text-lg font-bold text-rose-700 tracking-tight leading-tight">
                {formattedBefore.value}
              </span>
              {formattedBefore.note && (
                <span className="text-[10px] sm:text-xs font-semibold text-rose-600 mt-0.5">
                  {formattedBefore.note}
                </span>
              )}
            </div>
          </div>

          {/* After Box */}
          <div className="bg-emerald-50/60 border border-emerald-100/80 rounded-xl p-2.5 sm:p-3.5 flex flex-col justify-between shadow-xs">
            <span className="text-[9px] sm:text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mb-1">
              AFTER DEPLOYING SYSTEM
            </span>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base md:text-lg font-bold text-emerald-700 tracking-tight leading-tight">
                {formattedAfter.value}
              </span>
              {formattedAfter.note && (
                <span className="text-[10px] sm:text-xs font-semibold text-emerald-600 mt-0.5">
                  {formattedAfter.note}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Story Paragraph with read more/less */}
        <div className="relative mt-2 pl-3 md:pl-4 border-l-2 border-slate-100">
          <p className="text-slate-600 leading-relaxed text-xs sm:text-sm md:text-[15px] font-normal inline">
            {intro}
          </p>
          {remainder && (
            <>
              <span className={isExpanded ? "inline" : "hidden sm:inline"}>
                {" "}{remainder}
              </span>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="sm:hidden inline-flex items-center gap-0.5 text-xs text-blue-600 font-semibold hover:text-blue-700 transition-colors ml-1 focus:outline-none cursor-pointer"
              >
                {isExpanded ? (
                  <>Show less <ChevronUp className="w-3.5 h-3.5 inline" /></>
                ) : (
                  <>... Read more <ChevronDown className="w-3.5 h-3.5 inline" /></>
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Verified Badge / Footer inside Card */}
      <div className="mt-5 md:mt-6 pt-3 md:pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-slate-400">
        <span className="inline-flex items-center gap-1.5 text-emerald-600 font-medium text-[11px] md:text-xs">
          <CheckCircle2 className="w-3.5 h-3.5" /> Core Acquisition Funnel Live
        </span>
        <span className="font-mono text-[10px] md:text-[11px] bg-slate-50 px-2 py-0.5 rounded text-slate-500 border border-slate-100">
          ID: #{study.id}0{study.id}
        </span>
      </div>
    </motion.div>
  );
}

export default function App() {
  useEffect(() => {
    // If window.instgrm is already loaded, process the embed immediately
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    } else {
      const interval = setInterval(() => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
          clearInterval(interval);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, []);

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* HEADER LOGO STRIP (Dark Navy/Black to blend the logo perfectly) */}
      <header id="app-header" className="bg-[#0B0F19] py-4 border-b border-slate-800/60 sticky top-0 z-50 shadow-sm backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex justify-center items-center">
          <a href="#" className="transition-transform duration-200 hover:scale-[1.02] inline-block">
            <img 
              id="header-logo"
              src="https://raw.githubusercontent.com/scale100million-prog/my-images/main/LOGO%202.jpeg" 
              alt="Scale100Million Logo" 
              className="h-12 md:h-14 w-auto object-contain rounded-md"
              referrerPolicy="no-referrer"
            />
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero-section" className="relative overflow-hidden bg-gradient-to-b from-[#0B0F19] to-slate-900 text-white pt-16 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden opacity-30">
          <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"></div>
          <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-[#1e40af]/15 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Tag */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-5 sm:mb-6"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified Case Studies
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-tight"
          >
            3x to 5x Growth. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Built On Systems, Not Luck.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-light"
          >
            These Business owners who were already running their businesses before working with us. None of them had a predictable client acquisition system. All of them do now.
          </motion.p>
        </div>
      </section>

      {/* STATS HIGHLIGHT */}
      <section className="bg-white border-y border-slate-100 py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="py-4 md:py-2">
              <span className="block text-3xl font-bold text-slate-900 font-display">9 Proven Stories</span>
              <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold mt-1 block">Full Funnel Transformations</span>
            </div>
            <div className="py-4 md:py-2">
              <span className="block text-3xl font-bold text-blue-600 font-display">3x – 5x Scaled</span>
              <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold mt-1 block">Average Inbound Revenue Growth</span>
            </div>
            <div className="py-4 md:py-2">
              <span className="block text-3xl font-bold text-slate-900 font-display">Zero Outreach</span>
              <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold mt-1 block">Automated Acquisition funnels</span>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS CARD GRID SECTION */}
      <main id="results-section" className="max-w-7xl mx-auto px-4 py-16 sm:py-20 lg:py-24">
        
        {/* Section Heading Info */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
            Client Transformations
          </h2>
          <p className="text-slate-500 mt-2 text-xs sm:text-sm md:text-base">
            Detailed proof of scalable client acquisition systems deployed in multiple niches.
          </p>
        </div>

        {/* Case Studies Grid */}
        <motion.div 
          id="case-studies-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10"
        >
          {caseStudies.map((study) => (
            <CaseStudyCard 
              key={study.id} 
              study={study} 
              cardVariants={cardVariants} 
            />
          ))}
        </motion.div>
      </main>

      {/* TESTIMONIAL VIDEO SECTION */}
      <section id="hear-it-from-clients" className="bg-white border-t border-slate-100 py-16 sm:py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
            Hear It From Our Clients
          </h2>
          <p className="text-slate-500 mt-2 text-xs sm:text-sm md:text-base mb-10">
            Real founders, in their own words.
          </p>
          
          {/* Centered responsive container for the two portrait players */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-12">
            {/* Video 1: Instagram Reel (Vertical) */}
            <div className="w-full max-w-[340px] flex flex-col items-center">
              <blockquote 
                className="instagram-media" 
                data-instgrm-captioned 
                data-instgrm-permalink="https://www.instagram.com/reel/DNqcOdCJ-np/?utm_source=ig_embed&utm_campaign=loading" 
                data-instgrm-version="14" 
                style={{
                  background: "#FFF", 
                  border: 0, 
                  borderRadius: "12px", 
                  boxShadow: "0 4px 24px rgba(15, 23, 42, 0.04), 0 1px 10px rgba(0,0,0,0.05)", 
                  margin: "1px", 
                  maxWidth: "540px", 
                  minWidth: "326px", 
                  padding: 0, 
                  width: "100%"
                }}
              >
              </blockquote>
            </div>

            {/* Video 2: Wistia Portrait (vertical format) */}
            <div className="w-full max-w-[340px] flex flex-col items-center">
              <div 
                className="w-full rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-slate-50"
                style={{ aspectRatio: "0.45977011494252873" }}
              >
                <wistia-player media-id="lapjnplxvu" aspect="0.45977011494252873"></wistia-player>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="app-footer" className="bg-[#080B12] text-slate-400 border-t border-slate-900 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-10 border-b border-slate-900">
            {/* Branding */}
            <div className="flex items-center gap-3">
              <img 
                src="https://raw.githubusercontent.com/scale100million-prog/my-images/main/LOGO%202.jpeg" 
                alt="Scale100Million Small Logo" 
                className="h-8 w-auto object-contain rounded"
                referrerPolicy="no-referrer"
              />
              <span className="font-display font-extrabold text-white text-lg tracking-tight">
                Scale100Million.com
              </span>
            </div>
            
            {/* Links */}
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <a href="#results-section" className="hover:text-blue-400 transition-colors">Case Studies</a>
              <span className="text-slate-600">|</span>
              <span className="text-slate-500 font-mono text-xs">EST. 2026</span>
            </div>
          </div>

          <div className="mt-10 max-w-4xl">
            <p className="text-xs text-slate-500 leading-relaxed font-normal mb-6">
              Disclaimer: Earnings and income representations made by us, our clients, or partners are aspirational statements only of your potential. Results depend on your offer, execution, market conditions, and ad spend. We do not guarantee specific financial results. This site is not affiliated with or endorsed by Meta or Facebook.
            </p>
            <p className="text-xs text-slate-600">
              © 2026 Scale100Million.com. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
