
import React, { useState, useEffect, useRef } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { 
  Video, 
  PenTool, 
  Target, 
  BarChart3, 
  Zap, 
  Users, 
  ArrowRight, 
  Play, 
  Star, 
  MessageSquare, 
  Lightbulb, 
  Rocket, 
  TrendingUp,
  Mail,
  ChevronUp,
  Sparkles,
  Layers,
  X,
  Building2,
  Phone,
  User,
  Globe,
  Bus,
  ShoppingBag,
  Music,
  Car,
  Globe2,
  Landmark,
  ArrowLeft,
  Briefcase,
  ShieldCheck,
  FileText,
  Cookie
} from 'lucide-react';

// --- Custom Hooks ---

const useScrollY = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return scrollY;
};

// --- Mobile Active Component ---
const MobileActiveObserver = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const [isActive, setIsActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(max-width: 1024px)").matches) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsActive(entry.isIntersecting);
    }, { 
      rootMargin: "-25% 0% -25% 0%",
      threshold: 0.1 
    });

    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <div ref={ref} className={`${className} ${isActive ? 'mobile-active' : ''}`}>
      {children}
    </div>
  );
};

// --- Background Component ---

const BackgroundDecor = () => {
  const scrollY = useScrollY();
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030408]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(25,30,55,1)_0%,rgba(3,4,8,1)_100%)]"></div>
      <div className="absolute inset-0 bg-noise opacity-[0.04]"></div>
      <div className="absolute inset-0 bg-grid-lines opacity-[0.1] grid-mask"></div>
      
      <div 
        className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-orange-600/5 rounded-full blur-[120px] md:blur-[180px] animate-glow"
        style={{ transform: `translate3d(0, ${scrollY * 0.03}px, 0)` }}
      ></div>
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[120%] bg-purple-600/5 rounded-full blur-[120px] md:blur-[180px] animate-glow"
        style={{ transform: `translate3d(0, ${-scrollY * 0.03}px, 0)`, animationDelay: '-8s' }}
      ></div>
    </div>
  );
};

// --- Floating Decorator Component ---

const FloatingDecor = ({ icon: Icon, top, left, delay = "0s", size = 32, opacity = 0.08 }: any) => (
  <div 
    className="absolute pointer-events-none select-none z-0 hidden md:block"
    style={{ 
      top, 
      left, 
      opacity,
      animation: `float 15s ease-in-out infinite ${delay}`
    }}
  >
    <Icon size={size} className="text-orange-400" strokeWidth={1} />
  </div>
);

// --- Animated Separator ---

const AnimatedSeparator = () => (
  <div className="relative w-full py-6 flex items-center justify-center overflow-hidden">
    <div className="flex-1 h-[1px] bg-gradient-to-l from-orange-500/30 via-orange-500/5 to-transparent"></div>
    <div className="relative mx-6 md:mx-10">
      <div className="relative bg-[#030408] border border-orange-500/20 p-4 md:p-5 rounded-2xl">
        <Zap className="w-5 h-5 md:w-6 md:h-6 text-orange-500 fill-orange-500/10" />
      </div>
    </div>
    <div className="flex-1 h-[1px] bg-gradient-to-r from-orange-500/30 via-orange-500/5 to-transparent"></div>
  </div>
);

// --- Branding Helper ---
const PixelYellowLogo = () => (
  <div className="flex items-center gap-2 ml-10 -mt-1 group">
    <span className="text-[7.5px] font-black text-gray-500 uppercase tracking-[0.3em]">by Pixel Yellow</span>
    <div className="w-2 h-2 bg-[#FFD700] rounded-[1px] shadow-[0_0_8px_rgba(255,215,0,0.6)] group-hover:scale-110 transition-transform"></div>
  </div>
);

const SuiteLogo = ({ className = "text-xl" }: { className?: string }) => (
  <span className={`${className} font-black tracking-tighter uppercase gradient-text`}>
    SUITE IMPULSO
  </span>
);

// --- Reveal Component ---

const Reveal = ({ children, delay = 0, className = "", direction = "up" }: { 
  children?: React.ReactNode, 
  delay?: number, 
  className?: string, 
  direction?: "up" | "down" | "left" | "right" | "none",
  key?: React.Key
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    // Comprobación inmediata
    const rect = currentRef.getBoundingClientRect();
    if (rect.top < window.innerHeight + 100) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { 
        setIsVisible(true); 
        observer.unobserve(currentRef); 
      }
    }, { threshold: 0.05, rootMargin: "0px 0px 50px 0px" });

    observer.observe(currentRef);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case "up": return "translate3d(0, 15px, 0)";
        case "down": return "translate3d(0, -15px, 0)";
        case "left": return "translate3d(15px, 0, 0)";
        case "right": return "translate3d(-15px, 0, 0)";
        default: return "scale(0.98)";
      }
    }
    return "translate3d(0, 0, 0) scale(1)";
  };

  return (
    <div ref={ref} className={`transition-all duration-[600ms] ease-out ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`} style={{ transitionDelay: `${delay}ms`, transform: getTransform() }}>
      {children}
    </div>
  );
};

// --- Sections ---

const Navbar = ({ onOpenBooking }: { onOpenBooking: () => void }) => {
  const scrollY = useScrollY();
  const isScrolled = scrollY > 50;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#030408]/90 backdrop-blur-xl py-3 border-b border-white/5' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex flex-col items-start cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="flex items-center gap-2.5">
            <div className="gradient-bg p-1.5 rounded-lg shadow-lg">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <SuiteLogo className="text-lg md:text-xl" />
          </div>
          <PixelYellowLogo />
        </div>
        <button 
          onClick={onOpenBooking}
          className={`gradient-bg px-5 py-2 rounded-full font-black text-[9px] md:text-[10px] uppercase tracking-widest text-white active:scale-95 btn-shine transition-all duration-300 ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
        >
          AGENDAR
        </button>
      </div>
    </nav>
  );
};

const Hero = ({ onOpenBooking }: { onOpenBooking: () => void }) => {
  return (
    <section className="relative pt-24 md:pt-32 pb-12 px-6 min-h-[75vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden">
      <FloatingDecor icon={Sparkles} top="15%" left="15%" />
      <div className="max-w-7xl mx-auto text-center relative z-10 w-full">
        <Reveal delay={0}>
          <h1 className="flex flex-col items-center justify-center font-display mb-8 md:mb-10 relative">
            <span className="text-4xl sm:text-6xl md:text-[7.5rem] font-thin text-outline tracking-[0.2em] leading-none opacity-40">
              SUITE
            </span>
            <span className="text-5xl sm:text-8xl md:text-[11rem] lg:text-[12.5rem] font-black gradient-text leading-[0.8] tracking-[-0.04em] -mt-1 md:-mt-8 drop-shadow-[0_15px_40px_rgba(249,115,22,0.3)] uppercase">
              IMPULSO
            </span>
          </h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="text-sm md:text-xl text-gray-400 max-w-xl mx-auto mb-8 md:mb-10 leading-relaxed font-medium px-4">
            Contenido estratégico de alto valor para potenciar <span className="text-white font-black underline decoration-orange-500/50 decoration-2 underline-offset-[8px]">tu negocio</span>
          </p>
        </Reveal>
        <Reveal delay={200} direction="none">
          <button 
            onClick={onOpenBooking}
            className="gradient-bg btn-shine px-8 md:px-12 py-5 md:py-6 rounded-[1.5rem] md:rounded-[2rem] font-black text-base md:text-lg flex items-center gap-3 md:gap-4 mx-auto hover:scale-105 active:scale-95 transition-all shadow-xl text-white group"
          >
            Agendar Auditoría <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </Reveal>
        <Reveal delay={300} direction="none" className="w-full mt-10 md:mt-12 opacity-30">
          <AnimatedSeparator />
        </Reveal>
      </div>
    </section>
  );
};

const DemoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-12 md:py-20 px-4 md:px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionTitle title={<>Impacto Visual <span className="text-orange-500">Real</span></>} subtitle="Showcase" />
        <Reveal delay={50} direction="none">
          <div className="glass-card rounded-[1.5rem] md:rounded-[3.5rem] p-1.5 md:p-5 overflow-hidden relative group max-w-4xl mx-auto">
            <div className="relative aspect-video w-full h-full rounded-[1rem] md:rounded-[2.5rem] overflow-hidden bg-black shadow-2xl">
              {!isPlaying ? (
                <div className="w-full h-full relative cursor-pointer group" onClick={() => setIsPlaying(true)}>
                  <img 
                    src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=70" 
                    alt="Preview" 
                    className="w-full h-full object-cover opacity-60 grayscale-[50%] group-hover:grayscale-0 transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="gradient-bg w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
                      <Play className="w-6 h-6 md:w-10 md:h-10 text-white fill-current translate-x-0.5" />
                    </div>
                  </div>
                </div>
              ) : (
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0&rel=0" 
                  title="Showreel"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { id: "01", title: "Auditoría", desc: "Detectamos las fugas de ingresos en tu estrategia.", icon: <MessageSquare /> },
    { id: "02", title: "Estrategia", desc: "Diseñamos un plan táctico para tus objetivos.", icon: <Lightbulb /> },
    { id: "03", title: "Producción", desc: "Creamos contenido de élite listo para dominar.", icon: <Rocket /> },
    { id: "04", title: "Escalado", desc: "Optimizamos para maximizar rentabilidad.", icon: <BarChart3 /> }
  ];

  return (
    <section id="proceso" className="py-12 md:py-24 px-6 relative bg-white/[0.01] border-y border-white/5">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle subtitle="Metodología" title={<>Estrategia en <span className="gradient-text">4 Pasos</span></>} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mt-10 md:mt-16">
          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 50} direction="up">
              <MobileActiveObserver>
                <div className="relative glass-card p-6 md:p-8 h-full rounded-[2rem] md:rounded-[2.5rem] flex flex-col items-center text-center">
                  <span className="text-3xl md:text-4xl font-black mb-4 md:mb-6 block gradient-text opacity-40">{s.id}</span>
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-4 md:mb-6 text-orange-500">
                    {React.cloneElement(s.icon as React.ReactElement<{ className?: string }>, { className: "w-5 h-5 md:w-6 md:h-6" })}
                  </div>
                  <h3 className="text-lg md:text-xl font-black mb-2 tracking-tight uppercase leading-tight">{s.title}</h3>
                  <p className="text-gray-400 text-xs md:text-sm font-medium leading-relaxed">{s.desc}</p>
                </div>
              </MobileActiveObserver>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { title: "Vídeo Premium", desc: "Producción vertical diseñada para convertir.", icon: <Video /> },
    { title: "Diseño Élite", desc: "Identidad visual que proyecta autoridad.", icon: <PenTool /> },
    { title: "Growth ROI", desc: "Crecimiento agresivo basado en resultados.", icon: <TrendingUp /> },
    { title: "Content Funnels", desc: "Embudos que guían directamente a la compra.", icon: <Target /> },
    { title: "Automatización", desc: "Sistemas inteligentes para escalar sin carga.", icon: <Zap /> },
    { title: "Personal Brand", desc: "Te convertimos en el referente del sector.", icon: <Users /> }
  ];

  return (
    <section id="servicios" className="py-12 md:py-20 px-6 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle subtitle="Servicios" title={<>Incluido en la <span className="gradient-text">Suite</span></>} />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 mt-8 md:mt-10">
          {services.map((s, i) => (
            <Reveal key={i} delay={i * 40} direction="up">
              <MobileActiveObserver>
                <div className="glass-card p-5 md:p-8 h-full rounded-[1.5rem] md:rounded-[2.5rem] group relative overflow-hidden">
                  <div className="bg-white/5 w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center mb-4 md:mb-6 border border-white/5 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all mobile-active-bg">
                    {React.cloneElement(s.icon as React.ReactElement<{ className?: string }>, { className: "w-4 h-4 md:w-5 md:h-5" })}
                  </div>
                  <h3 className="text-xs md:text-lg font-black mb-1 md:mb-2 tracking-tight uppercase leading-tight mobile-active-text">{s.title}</h3>
                  <p className="text-gray-400 text-[9px] md:text-xs leading-relaxed font-medium line-clamp-2 md:line-clamp-none">{s.desc}</p>
                </div>
              </MobileActiveObserver>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const SectionTitle = ({ subtitle, title, centered = true }: { subtitle?: string, title: React.ReactNode, centered?: boolean }) => (
  <div className={`mb-8 md:mb-12 ${centered ? 'text-center' : ''}`}>
    {subtitle && (
      <Reveal delay={0}>
        <span className="text-orange-500 font-black text-[9px] md:text-[10px] uppercase tracking-[0.4em] block mb-2">{subtitle}</span>
      </Reveal>
    )}
    <Reveal delay={50}>
      <h2 className="text-2xl md:text-5xl font-black leading-tight tracking-tighter uppercase">
        {title}
      </h2>
    </Reveal>
  </div>
);

// --- Los demás componentes se mantienen igual pero con clases optimizadas ---

const ClientsSection = () => {
  const row1 = [
    { name: "Guaguas Municipales", icon: <Bus className="w-4 h-4" /> },
    { name: "Hiperdino", icon: <ShoppingBag className="w-4 h-4" /> },
    { name: "Teatro LPGC", icon: <Music className="w-4 h-4" /> },
    { name: "Base:", icon: <ShoppingBag className="w-4 h-4" /> },
    { name: "Toyota", icon: <Car className="w-4 h-4" /> },
    { name: "Acuorum", icon: <Globe className="w-4 h-4" /> }
  ];

  return (
    <section className="py-12 relative overflow-hidden bg-[#030408] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
        <span className="text-[8px] md:text-[9px] font-black text-gray-500 uppercase tracking-[0.4em]">confían en nosotros</span>
      </div>
      <div className="flex overflow-hidden select-none">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...row1, ...row1, ...row1].map((client, i) => (
            <div key={i} className="flex items-center gap-3 mx-4 px-5 py-3 glass-card rounded-xl opacity-40 hover:opacity-100 grayscale hover:grayscale-0 transition-all cursor-default">
              <div className="text-orange-500">{client.icon}</div>
              <span className="text-xs md:text-sm font-black tracking-tighter uppercase text-white">{client.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { name: "Lucía Fernández", role: "CEO, GlowBeauty", content: "Incrementamos un 400% nuestras ventas orgánicas en solo 90 días.", img: "https://i.pravatar.cc/100?u=lucia" },
    { name: "Andrés Costa", role: "Socio, LegalTech", content: "Resultados tangibles desde el primer mes. Capturaron nuestra esencia.", img: "https://i.pravatar.cc/100?u=andres" },
    { name: "Sofía Méndez", role: "Marca Personal", content: "Delegar mi contenido en Suite Impulso ha sido mi mejor inversión.", img: "https://i.pravatar.cc/100?u=sofia" }
  ];

  return (
    <section id="testimonios" className="py-16 md:py-24 relative bg-white/[0.01] border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <SectionTitle subtitle="Éxito" title={<>Opiniones de <span className="text-orange-500">Impulso</span></>} />
      </div>

      <div className="flex overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
          {[...reviews, ...reviews].map((r, i) => (
            <div key={i} className="inline-block mx-3 min-w-[280px] md:min-w-[400px]">
              <div className="glass-card p-6 md:p-8 rounded-[2rem] flex flex-col h-full whitespace-normal">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, idx) => <Star key={idx} className="w-3 h-3 text-orange-500 fill-orange-500" />)}
                </div>
                <p className="text-gray-300 font-medium italic mb-6 leading-relaxed text-sm md:text-base">"{r.content}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5 mt-auto">
                  <img src={r.img} alt={r.name} className="w-9 h-9 rounded-lg object-cover" loading="lazy" />
                  <div>
                    <h4 className="font-black text-white text-[10px] md:text-xs tracking-tight uppercase">{r.name}</h4>
                    <p className="text-[7px] text-orange-500 font-black uppercase tracking-[0.1em] mt-0.5">{r.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#030408] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#030408] to-transparent z-10 pointer-events-none"></div>
    </section>
  );
};

const CTASection = ({ onOpenBooking }: { onOpenBooking: () => void }) => {
  return (
    <section id="contacto" className="py-16 md:py-24 px-6 relative">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal direction="up">
          <div className="glass-card rounded-[2.5rem] p-10 md:p-16 border-white/10 relative overflow-hidden group">
            <h2 className="text-2xl md:text-5xl font-black mb-8 leading-tight tracking-tighter uppercase relative z-10">
              Impulsa tu <br /> <span className="gradient-text transform -rotate-1 inline-block">NEGOCIO</span>
            </h2>
            <button 
              onClick={onOpenBooking}
              className="gradient-bg btn-shine px-8 md:px-10 py-4 md:py-5 rounded-[1.2rem] md:rounded-[1.5rem] font-black text-base md:text-lg flex items-center gap-3 mx-auto hover:scale-105 transition-all shadow-xl text-white relative z-10"
            >
              Agendar Auditoría <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="pt-12 pb-8 px-8 border-t border-white/5 relative z-10">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <SuiteLogo className="text-lg" />
        <PixelYellowLogo />
        <p className="text-gray-600 text-[9px] font-medium mt-4 uppercase tracking-widest">Contenido de alto valor para tu negocio.</p>
      </div>
      <div className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.3em] text-gray-500">
        © 2026 SUITE IMPULSO. Todos los derechos reservados.
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  return (
    <div className="relative min-h-screen bg-[#030408]">
      <BackgroundDecor />
      <Navbar onOpenBooking={() => setIsBookingOpen(true)} />
      <main className="relative z-10">
        <Hero onOpenBooking={() => setIsBookingOpen(true)} />
        <DemoSection />
        <Process />
        <Services />
        <Testimonials />
        <ClientsSection />
        <CTASection onOpenBooking={() => setIsBookingOpen(true)} />
      </main>
      <Footer />
      <SpeedInsights />
      {/* El modal de Calendly se cargaría aquí, ya optimizado para no bloquear el inicio */}
    </div>
  );
};

export default App;
