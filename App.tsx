
import React, { useState, useEffect, useRef } from 'react';
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
  MousePointer2,
  Sparkles,
  Layers
} from 'lucide-react';

// --- Custom Hooks ---

const useScrollY = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return scrollY;
};

// --- Background Component ---

const BackgroundDecor = () => {
  const scrollY = useScrollY();
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030408]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(20,25,40,1)_0%,rgba(3,4,8,1)_70%)]"></div>
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-grid-dots opacity-20"></div>
      <div className="absolute inset-0 bg-grid-lines opacity-[0.15] grid-mask"></div>
      <div 
        className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-orange-600/10 rounded-full blur-[120px] animate-glow"
        style={{ transform: `translateY(${scrollY * 0.08}px)` }}
      ></div>
      <div 
        className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-purple-600/10 rounded-full blur-[120px] animate-glow"
        style={{ transform: `translateY(${-scrollY * 0.08}px)`, animationDelay: '-6s' }}
      ></div>
      <div 
        className="absolute top-[35%] left-[15%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[150px] animate-glow"
        style={{ animationDelay: '-3s' }}
      ></div>
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
    </div>
  );
};

// --- Floating Decorator Component ---

const FloatingDecor = ({ icon: Icon, top, left, delay = "0s", size = 32, opacity = 0.04 }: any) => (
  <div 
    className="absolute pointer-events-none select-none z-0"
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
  <div className="relative w-full py-12 flex items-center justify-center overflow-hidden">
    {/* Line Left */}
    <div className="flex-1 h-[1px] bg-gradient-to-l from-orange-500/50 via-orange-500/10 to-transparent"></div>
    
    {/* Central Icon Container */}
    <div className="relative mx-8 group">
      <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl group-hover:bg-orange-500/40 transition-all duration-700 animate-pulse"></div>
      <div className="relative bg-[#030408] border border-orange-500/30 p-4 rounded-2xl group-hover:rotate-[360deg] transition-all duration-[1500ms] ease-in-out shadow-[0_0_30px_rgba(249,115,22,0.2)]">
        <Zap className="w-8 h-8 text-orange-500 fill-orange-500/10" />
      </div>
      
      {/* Orbital Particles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-white/5 rounded-full animate-[spin_10s_linear_infinite]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-orange-400 rounded-full shadow-[0_0_10px_#f97316]"></div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-purple-400 rounded-full shadow-[0_0_10px_#a855f7]"></div>
      </div>
    </div>

    {/* Line Right */}
    <div className="flex-1 h-[1px] bg-gradient-to-r from-orange-500/50 via-orange-500/10 to-transparent"></div>
    
    {/* Scanning Light Beam */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-1/2 left-0 w-40 h-[2px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent -translate-y-1/2 animate-[scan_4s_linear_infinite]"></div>
    </div>

    <style>{`
      @keyframes scan {
        0% { left: -20%; opacity: 0; }
        20% { opacity: 1; }
        80% { opacity: 1; }
        100% { left: 120%; opacity: 0; }
      }
    `}</style>
  </div>
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case "up": return "translateY(30px)";
        case "down": return "translateY(-30px)";
        case "left": return "translateX(30px)";
        case "right": return "translateX(-30px)";
        default: return "scale(0.98)";
      }
    }
    return "translate(0, 0) scale(1)";
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] transform ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      style={{ 
        transitionDelay: `${delay}ms`,
        transform: getTransform()
      }}
    >
      {children}
    </div>
  );
};

// --- Helper Components ---

const SectionTitle = ({ subtitle, title, centered = true }: { subtitle?: string, title: React.ReactNode, centered?: boolean }) => (
  <div className={`mb-10 ${centered ? 'text-center' : ''}`}>
    {subtitle && (
      <Reveal delay={100}>
        <span className="text-orange-500 font-bold text-[10px] uppercase tracking-[0.4em] block mb-3 animate-pulse">{subtitle}</span>
      </Reveal>
    )}
    <Reveal delay={200}>
      <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tighter">
        {title}
      </h2>
    </Reveal>
  </div>
);

const Navbar = () => {
  const scrollY = useScrollY();
  const isScrolled = scrollY > 50;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled ? 'bg-[#030408]/70 backdrop-blur-xl py-3 border-b border-white/5 shadow-2xl' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="gradient-bg p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-500 shadow-lg shadow-orange-500/10">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter">SUITE <span className="gradient-text">IMPULSO</span></span>
          </div>
          <a 
            href="https://www.pixelyellow.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[8px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-11 -mt-1 hover:text-yellow-400 transition-all flex items-center gap-1.5 group/py"
          >
            by <span className="text-gray-400 group-hover/py:text-white transition-colors">Pixel</span> <span className="text-gray-400 group-hover/py:text-yellow-400 transition-colors">Yellow</span>
            <div className="w-1 h-1 bg-yellow-400 rounded-[1px] shadow-[0_0_5px_rgba(250,204,21,0.5)] group-hover/py:scale-125 transition-transform"></div>
          </a>
        </div>
        
        <div className="hidden md:flex items-center gap-10 text-[12px] font-bold text-gray-400 uppercase tracking-widest">
          {['Servicios', 'Proceso', 'Testimonios'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="relative hover:text-white transition-colors group">
              {item}
              <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </div>

        <a href="mailto:pixel@pixelyellow.com" className="gradient-bg btn-shine hover:scale-105 transition-all px-7 py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-widest text-white shadow-xl shadow-orange-500/10 active:scale-95 inline-block text-center">
          Reservar Auditoría
        </a>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 min-h-[90vh] flex items-center justify-center overflow-hidden">
      <FloatingDecor icon={Sparkles} top="15%" left="12%" delay="0s" size={36} />
      <FloatingDecor icon={Layers} top="75%" left="8%" delay="2s" size={42} />
      <FloatingDecor icon={MousePointer2} top="28%" left="82%" delay="4s" size={32} />
      <FloatingDecor icon={Rocket} top="82%" left="88%" delay="1s" size={38} />
      
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <Reveal delay={100} direction="down">
          <div className="inline-flex items-center gap-3 glass-card px-6 py-2 rounded-full mb-8 border-white/10 hover:border-orange-500/30 cursor-default transition-all">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></div>
            <span className="text-[10px] md:text-xs font-bold text-orange-100 tracking-[0.2em] uppercase">ESCALA HASTA EL SIGUIENTE NIVEL</span>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <h1 className="text-6xl md:text-9xl font-black mb-8 leading-[0.9] tracking-tight flex flex-col items-center justify-center group cursor-default">
            <span className="opacity-90">SUITE</span> 
            <span className="gradient-text inline-block transform -rotate-[4deg] -mt-0.5 transition-all duration-700 ease-out drop-shadow-[0_0_40px_rgba(249,115,22,0.2)] origin-left flex">
              <span className="transition-all duration-700">I</span>
              <span className="transition-all duration-700 group-hover:tracking-[0.08em] tracking-tighter">MPULSO</span>
            </span>
          </h1>
        </Reveal>
        
        <Reveal delay={500}>
          <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
            Contenido estratégico para potenciar las ventas de <span className="text-white font-black decoration-orange-500 decoration-2 underline-offset-4 underline">tu negocio</span>.
          </p>
        </Reveal>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center sm:items-stretch mb-20">
          <Reveal delay={700} direction="up" className="w-full sm:w-auto">
            <a href="mailto:pixel@pixelyellow.com" className="gradient-bg btn-shine w-full sm:w-auto px-12 py-5 rounded-[1.2rem] font-black text-lg flex items-center justify-center gap-3 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/40 transition-all active:scale-95 group text-white text-center">
              Reservar Auditoría <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={900} direction="none" className="w-full">
          <AnimatedSeparator />
        </Reveal>
      </div>
    </section>
  );
};

const DemoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionTitle title={<>Impacto visual que <span className="gradient-text">genera resultados</span></>} />
        <Reveal delay={300} direction="none">
          <div className="glass-card rounded-[3rem] overflow-hidden relative group border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.4)] hover:border-orange-500/40 transition-all duration-1000 aspect-video">
            {!isPlaying ? (
              <div 
                className="w-full h-full relative cursor-pointer" 
                onClick={() => setIsPlaying(true)}
              >
                <img 
                  src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=90" 
                  alt="Impact Preview" 
                  className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-60 group-hover:scale-105 transition-all duration-[2000ms]"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="gradient-bg w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(249,115,22,0.4)] group-hover:scale-110 group-hover:rotate-[360deg] transition-all duration-1000">
                    <Play className="w-10 h-10 md:w-16 md:h-16 text-white fill-current translate-x-1" />
                  </div>
                </div>
                <div className="absolute bottom-10 left-10 text-left z-20">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-2">Caso de éxito</p>
                  <h3 className="text-2xl font-black text-white">Escalado Exponencial 2024</h3>
                </div>
              </div>
            ) : (
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/lRTtMcx6HXY?autoplay=1&mute=1&controls=1&rel=0" 
                title="Suite Impulso Impact Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            )}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent pointer-events-none"></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { title: "Producción de Video", desc: "Reels y contenido vertical de alto impacto que domina el algoritmo.", icon: <Video className="w-6 h-6" /> },
    { title: "Diseño Estratégico", desc: "Identidad visual y piezas de contenido que proyectan autoridad.", icon: <PenTool className="w-6 h-6" /> },
    { title: "Growth Marketing", desc: "Estrategias de crecimiento acelerado basadas en datos reales.", icon: <TrendingUp className="w-6 h-6" /> },
    { title: "Content Funnels", desc: "Embudos de contenido diseñados para convertir extraños en clientes.", icon: <Target className="w-6 h-6" /> },
    { title: "Automatización", desc: "Sistemas inteligentes que mantienen tu negocio activo 24/7.", icon: <Zap className="w-6 h-6" /> },
    { title: "Community Building", desc: "Convertimos seguidores en una comunidad fiel y apasionada.", icon: <Users className="w-6 h-6" /> }
  ];

  return (
    <section id="servicios" className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle 
          subtitle="Capacidades"
          title={<>Servicios diseñados para <span className="gradient-text">escalar</span></>}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Reveal key={i} delay={i * 100} direction="up">
              <div className="glass-card p-10 h-full rounded-[2.5rem] group relative overflow-hidden border-white/5">
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl group-hover:bg-orange-500/15 transition-all duration-700" />
                <div className="bg-orange-500/10 w-16 h-16 rounded-[1.2rem] flex items-center justify-center mb-6 text-orange-500 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500 shadow-xl shadow-orange-500/0 group-hover:shadow-orange-500/20 border border-orange-500/10">
                  {s.icon}
                </div>
                <h3 className="text-2xl font-black mb-3 group-hover:text-orange-400 transition-colors tracking-tight">{s.title}</h3>
                <p className="text-gray-400 text-base leading-relaxed font-medium group-hover:text-gray-300 transition-colors">{s.desc}</p>
                <a href="mailto:pixel@pixelyellow.com" className="mt-6 inline-flex items-center gap-2 text-[10px] font-black text-orange-500/50 uppercase tracking-widest group-hover:text-orange-500 transition-colors cursor-pointer">
                  Saber más <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { id: "01", title: "Auditoría", desc: "Analizamos tu situación actual y detectamos fugas de ventas.", icon: <MessageSquare /> },
    { id: "02", title: "Estrategia", desc: "Diseñamos un plan de acción a medida de tus objetivos.", icon: <Lightbulb /> },
    { id: "03", title: "Creación", desc: "Producimos contenido premium listo para impactar.", icon: <Rocket /> },
    { id: "04", title: "Escalado", desc: "Optimizamos resultados para multiplicar tu facturación.", icon: <BarChart3 /> }
  ];

  return (
    <section id="proceso" className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle 
          subtitle="Metodología"
          title={<>Nuestro camino al <span className="gradient-text">éxito</span></>}
        />
        <div className="relative mt-16">
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((s, i) => (
              <Reveal key={i} delay={i * 200} direction="up">
                <div className="relative text-center flex flex-col items-center group">
                  <div className="relative mb-8">
                    <div className="w-28 h-28 rounded-[2rem] bg-white/[0.03] border border-white/10 flex items-center justify-center z-10 relative group-hover:scale-110 group-hover:border-orange-500/50 group-hover:rotate-6 transition-all duration-700 shadow-2xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      {React.cloneElement(s.icon as React.ReactElement, { className: "w-10 h-10 text-orange-500 transition-transform group-hover:scale-110" })}
                    </div>
                    <span className="absolute -top-3 -right-3 bg-gradient-to-br from-orange-500 to-purple-600 text-white text-[10px] font-black w-8 h-8 rounded-2xl flex items-center justify-center z-20 shadow-xl group-hover:scale-125 transition-transform duration-700">
                      {s.id}
                    </span>
                  </div>
                  <h3 className="text-xl font-black mb-3 group-hover:text-orange-400 transition-colors tracking-tight">{s.title}</h3>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-[240px] group-hover:text-gray-400 transition-colors">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { name: "Lucía Fernández", role: "CEO, GlowBeauty", content: "Incrementamos un 400% nuestras ventas orgánicas en solo 2 meses gracias a Suite Impulso.", img: "https://i.pravatar.cc/150?u=lucia" },
    { name: "Andrés Costa", role: "Socio, LegalTech", content: "El contenido no solo es impecable, sino que capta exactamente la esencia de nuestra marca.", img: "https://i.pravatar.cc/150?u=andres" },
    { name: "Sofía Méndez", role: "Influencer de Negocios", content: "Delegar mi contenido en ellos ha sido la mejor decisión para mi marca personal.", img: "https://i.pravatar.cc/150?u=sofia" }
  ];

  return (
    <section id="testimonios" className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle 
          subtitle="Resultados"
          title={<>Lo que dicen de <span className="gradient-text">nosotros</span></>}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <Reveal key={i} delay={i * 200} direction="up">
              <div className="glass-card p-10 h-full rounded-[3rem] relative border-white/5 flex flex-col group">
                <div className="flex gap-2 mb-8">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 text-orange-500 fill-orange-500 group-hover:scale-125 transition-transform" style={{ transitionDelay: `${idx * 50}ms` }} />
                  ))}
                </div>
                <p className="text-gray-300 font-medium italic mb-10 leading-relaxed text-lg flex-grow">"{r.content}"</p>
                <div className="flex items-center gap-5 mt-auto border-t border-white/5 pt-6">
                  <img src={r.img} alt={r.name} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-orange-500/20 group-hover:ring-orange-500 transition-all duration-700 shadow-2xl" />
                  <div>
                    <h4 className="font-black text-white text-lg tracking-tight">{r.name}</h4>
                    <p className="text-[10px] text-orange-500 font-black uppercase tracking-[0.2em]">{r.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section id="contacto" className="py-20 px-6 relative">
      <div className="max-w-5xl mx-auto relative z-10">
        <Reveal direction="up" delay={100}>
          <div className="glass-card rounded-[4rem] p-10 md:p-20 text-center relative z-10 border-white/10 overflow-hidden shadow-2xl group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.05] to-purple-500/[0.1] opacity-80 transition-opacity duration-1000" />
            <div className="relative z-10">
              <Reveal delay={300}>
                <h2 className="text-4xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter">
                  ¿Listo para el <br /> <span className="gradient-text transform -rotate-1 inline-block">IMPULSO</span>?
                </h2>
              </Reveal>
              <Reveal delay={450}>
                <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-xl md:text-2xl font-medium leading-relaxed">
                  Agenda hoy tu auditoría estratégica gratuita y descubre tu potencial real.
                </p>
              </Reveal>
              <Reveal delay={600} direction="up" className="flex justify-center">
                <a href="mailto:pixel@pixelyellow.com" className="gradient-bg btn-shine px-14 py-6 rounded-[1.5rem] font-extrabold text-xl flex items-center justify-center gap-4 mx-auto hover:scale-105 transition-all shadow-2xl shadow-orange-500/30 active:scale-95 group text-white text-center">
                  Reservar Auditoría <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
                </a>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Footer = () => {
  const scrollY = useScrollY();
  const showScroll = scrollY > 400;
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="pt-20 pb-12 px-8 border-t border-white/5 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-16 relative z-10">
        <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
          <Reveal direction="right" delay={100}>
            <div className="flex items-center gap-4 mb-3 group cursor-pointer justify-center md:justify-start">
              <div className="gradient-bg p-2.5 rounded-xl group-hover:rotate-12 transition-transform duration-500 shadow-xl shadow-orange-500/10">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-black tracking-tighter">SUITE <span className="gradient-text">IMPULSO</span></span>
            </div>
          </Reveal>
          
          <Reveal direction="right" delay={150}>
            <a 
              href="https://www.pixelyellow.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-10 flex items-center gap-2 hover:text-yellow-400 transition-colors group/foot"
            >
              Creado por <span className="text-white group-hover/foot:text-white transition-colors">Pixel</span> <span className="text-yellow-400">Yellow</span>
              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-[1px] shadow-[0_0_8px_rgba(250,204,21,0.6)] animate-pulse"></div>
            </a>
          </Reveal>

          <Reveal direction="right" delay={200}>
            <p className="text-gray-500 max-md mb-10 leading-relaxed text-xl font-medium">
              Contenido estratégico para ventas de alto impacto
            </p>
          </Reveal>
        </div>
        
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Reveal direction="up" delay={200}>
            <h4 className="font-black text-white text-sm mb-8 uppercase tracking-[0.3em] opacity-50">Navegación</h4>
          </Reveal>
          <ul className="space-y-4 text-gray-400 font-bold text-base">
            {["Servicios", "Proceso", "Testimonios"].map((item, idx) => (
              <Reveal key={item} delay={300 + (idx * 100)} direction="right">
                <li><a href={`#${item.toLowerCase()}`} className="hover:text-orange-500 transition-colors flex items-center gap-4 group justify-center md:justify-start"><span className="hidden md:block w-0 group-hover:w-6 h-[2px] bg-orange-500 transition-all"></span>{item}</a></li>
              </Reveal>
            ))}
          </ul>
        </div>
        
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Reveal direction="up" delay={200}>
            <h4 className="font-black text-white text-sm mb-8 uppercase tracking-[0.3em] opacity-50">Contacto</h4>
          </Reveal>
          <Reveal direction="left" delay={300}>
            <a href="mailto:pixel@pixelyellow.com" className="flex items-center gap-4 text-gray-400 hover:text-white transition-all group mb-8 justify-center md:justify-start">
              <div className="bg-white/[0.03] border border-white/5 p-4 rounded-2xl group-hover:bg-orange-500/20 group-hover:border-orange-500/30 transition-all">
                <Mail className="w-6 h-6 text-orange-500" />
              </div>
              <span className="font-black text-lg">pixel@pixelyellow.com</span>
            </a>
          </Reveal>
          <Reveal direction="left" delay={400}>
            <p className="text-gray-600 text-[11px] font-black uppercase tracking-[0.2em] leading-relaxed">
              Estrategia y Creatividad.
            </p>
          </Reveal>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:row items-center justify-between gap-8 text-gray-500 text-xs font-bold text-center md:text-left">
        <Reveal delay={100} direction="up">
          <p className="opacity-50">© 2026 Suite Impulso. Todos los derechos reservados.</p>
        </Reveal>
        <div className="flex gap-10 opacity-50 justify-center">
          {["Privacidad", "Términos", "Cookies"].map((item, idx) => (
            <Reveal key={item} delay={200 + (idx * 100)} direction="up">
              <a href="#" className="hover:text-white transition-colors">{item}</a>
            </Reveal>
          ))}
        </div>
      </div>

      <button 
        onClick={scrollToTop}
        className={`fixed bottom-12 right-12 z-50 gradient-bg btn-shine p-5 rounded-2xl shadow-2xl transition-all duration-700 ${showScroll ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-50 pointer-events-none'}`}
      >
        <ChevronUp className="w-6 h-6 text-white" />
      </button>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen selection:bg-orange-500/30 selection:text-orange-200">
      <BackgroundDecor />
      <Navbar />
      <div className="relative z-10">
        <Hero />
        <DemoSection />
        <Services />
        <Process />
        <Testimonials />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
};

export default App;
