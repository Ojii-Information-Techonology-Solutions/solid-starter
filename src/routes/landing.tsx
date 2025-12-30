import CanvasBackground from "~/components/canvasbackground";
import StaggeredText from "~/components/staggeredtext";

export default function App() {
  return (
    <main class="relative min-h-screen">
      <CanvasBackground />

      {/* Hero Section */}
      <section class="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div class="mb-4 inline-block px-3 py-1 border border-gold/30 rounded-full text-[10px] uppercase tracking-[0.3em] text-gold animate-pulse">
          Digital Alchemy 2025
        </div>
        
        <StaggeredText 
          text="Transforming Code Into Pure Gold" 
          class="text-6xl md:text-8xl font-black tracking-tighter max-w-4xl leading-[0.9]" 
        />
        
        <p class="mt-8 text-white/40 max-w-lg text-lg stagger-item" style="animation-delay: 0.8s">
          A high-performance SolidJS template built with Tailwind v4 for those who refuse to build "ugly" websites.
        </p>

        <div class="mt-12 flex gap-6 stagger-item" style="animation-delay: 1s">
          <button class="group relative px-8 py-4 bg-gold text-black font-bold uppercase tracking-widest text-xs rounded-none transition-all hover:scale-105 active:scale-95">
            Start Project
            <div class="absolute inset-0 border border-gold translate-x-2 translate-y-2 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
          </button>
          
          <button class="px-8 py-4 border border-white/10 hover:border-gold/50 transition-colors uppercase tracking-widest text-xs">
            The Process
          </button>
        </div>
      </section>

      {/* Floating Interactive Element */}
      <div class="fixed bottom-10 right-10 w-24 h-24 rounded-full border border-gold/20 flex items-center justify-center group cursor-pointer hover:bg-gold transition-all duration-500">
        <div class="text-[10px] text-gold group-hover:text-black font-bold rotate-90 uppercase tracking-tighter">
          Scroll
        </div>
      </div>
    </main>
  );
}