
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
  ArrowLeft
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(25,30,55,1)_0%,rgba(3,4,8,1)_100%)]"></div>
      <div className="absolute inset-0 bg-noise opacity-[0.04]"></div>
      <div className="absolute inset-0 bg-grid-lines opacity-[0.15] grid-mask"></div>
      
      <div 
        className="absolute top-[-20%] left-[-20%] w-[120%] h-[120%] bg-orange-600/10 rounded-full blur-[180px] animate-glow"
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
      ></div>
      <div 
        className="absolute bottom-[-20%] right-[-20%] w-[120%] h-[120%] bg-purple-600/8 rounded-full blur-[180px] animate-glow"
        style={{ transform: `translateY(${-scrollY * 0.05}px)`, animationDelay: '-8s' }}
      ></div>
      
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </div>
  );
};

// --- Floating Decorator Component ---

const FloatingDecor = ({ icon: Icon, top, left, delay = "0s", size = 32, opacity = 0.08 }: any) => (
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
  <div className="relative w-full py-6 flex items-center justify-center overflow-hidden">
    <div className="flex-1 h-[1px] bg-gradient-to-l from-orange-500/40 via-orange-500/5 to-transparent"></div>
    <div className="relative mx-10">
      <div className="relative bg-[#030408] border border-orange-500/30 p-5 rounded-2xl shadow-[0_0_30px_rgba(249,115,22,0.2)]">
        <Zap className="w-6 h-6 text-orange-500 fill-orange-500/10" />
      </div>
    </div>
    <div className="flex-1 h-[1px] bg-gradient-to-r from-orange-500/40 via-orange-500/5 to-transparent"></div>
  </div>
);

// --- Booking Modal Component ---

const BookingModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: ''
  });

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setIsLoading(true);
    }
  }, [isOpen]);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose}></div>
      
      <div className="glass-card w-full max-w-5xl h-[85vh] md:h-[80vh] rounded-[2.5rem] border-white/10 shadow-[0_40px_120px_rgba(0,0,0,1)] relative z-10 overflow-hidden flex flex-col">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 z-30"></div>
        
        <button 
          onClick={onClose} 
          className="absolute top-5 right-5 p-2.5 bg-white/5 hover:bg-white/10 rounded-full transition-all text-gray-300 hover:text-white z-40 border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 2 && (
          <button 
            onClick={() => setStep(1)} 
            className="absolute top-5 left-5 p-2.5 bg-white/5 hover:bg-white/10 rounded-full transition-all text-gray-300 hover:text-white z-40 border border-white/10 flex items-center gap-2 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest pr-1">Atrás</span>
          </button>
        )}

        <div className="px-8 pt-8 pb-5 border-b border-white/5 relative z-20">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-xl font-black tracking-tight flex items-center gap-3 uppercase">
              <Zap className="w-5 h-5 text-orange-500 fill-orange-500/10" />
              {step === 1 ? 'Datos Estratégicos' : 'Agenda tu Auditoría'}
            </h3>
          </div>
        </div>

        <div className="flex-1 relative overflow-y-auto custom-scrollbar">
          {step === 1 ? (
            <div className="p-6 md:p-12 max-w-2xl mx-auto h-full flex flex-col justify-center">
              <form onSubmit={handleNext} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 ml-2">Nombre Completo</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-orange-500 transition-colors" />
                      <input 
                        required
                        type="text" 
                        placeholder="Ej. Juan Pérez"
                        className="w-full bg-white/[0.05] border border-white/10 focus:border-orange-500/80 rounded-xl py-3.5 pl-12 pr-5 outline-none text-white font-semibold transition-all text-xs"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 ml-2">Email Profesional</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-orange-500 transition-colors" />
                      <input 
                        required
                        type="email" 
                        placeholder="juan@empresa.com"
                        className="w-full bg-white/[0.05] border border-white/10 focus:border-orange-500/80 rounded-xl py-3.5 pl-12 pr-5 outline-none text-white font-semibold transition-all text-xs"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 ml-2">Empresa</label>
                    <div className="relative group">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-orange-500 transition-colors" />
                      <input 
                        required
                        type="text" 
                        placeholder="Ej. Suite Corp"
                        className="w-full bg-white/[0.05] border border-white/10 focus:border-orange-500/80 rounded-xl py-3.5 pl-12 pr-5 outline-none text-white font-semibold transition-all text-xs"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 ml-2">Teléfono</label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-orange-500 transition-colors" />
                      <input 
                        required
                        type="tel" 
                        placeholder="+34 600..."
                        className="w-full bg-white/[0.05] border border-white/10 focus:border-orange-500/80 rounded-xl py-3.5 pl-12 pr-5 outline-none text-white font-semibold transition-all text-xs"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 ml-2">Web o RRSS</label>
                  <div className="relative group">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-orange-500 transition-colors" />
                    <input 
                      required
                      type="text" 
                      placeholder="www.tuempresa.com / @usuario"
                      className="w-full bg-white/[0.05] border border-white/10 focus:border-orange-500/80 rounded-xl py-3.5 pl-12 pr-5 outline-none text-white font-semibold transition-all text-xs"
                      value={formData.website}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full gradient-bg btn-shine py-4 rounded-xl font-black text-lg flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-95 transition-all text-white shadow-lg"
                  >
                    Continuar <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="h-full relative bg-black/40">
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-[#030408]/90 backdrop-blur-xl">
                  <Zap className="w-10 h-10 text-orange-500 animate-pulse" />
                  <p className="mt-3 text-[9px] font-black text-white/50 uppercase tracking-[0.4em]">Sincronizando</p>
                </div>
              )}
              <iframe 
                src={`https://cal.eu/pixelyellow?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&notes=${encodeURIComponent(`Empresa: ${formData.company} | Teléfono: ${formData.phone} | Web: ${formData.website}`)}&embed=true`}
                title="Agenda"
                className={`w-full h-full border-none transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setIsLoading(false)}
                allow="camera; microphone; autoplay; payment"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

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
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case "up": return "translateY(20px)";
        case "down": return "translateY(-20px)";
        case "left": return "translateX(20px)";
        case "right": return "translateX(-20px)";
        default: return "scale(0.99)";
      }
    }
    return "translate(0, 0) scale(1)";
  };

  return (
    <div ref={ref} className={`transition-all duration-[800ms] ease-out ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`} style={{ transitionDelay: `${delay}ms`, transform: getTransform() }}>
      {children}
    </div>
  );
};

// --- Helper Components ---

const SectionTitle = ({ subtitle, title, centered = true }: { subtitle?: string, title: React.ReactNode, centered?: boolean }) => (
  <div className={`mb-10 ${centered ? 'text-center' : ''}`}>
    {subtitle && (
      <Reveal delay={50}>
        <span className="text-orange-500 font-black text-[10px] uppercase tracking-[0.5em] block mb-2">{subtitle}</span>
      </Reveal>
    )}
    <Reveal delay={100}>
      <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tighter uppercase drop-shadow-lg">
        {title}
      </h2>
    </Reveal>
  </div>
);

const Navbar = ({ onOpenBooking }: { onOpenBooking: () => void }) => {
  const scrollY = useScrollY();
  const isScrolled = scrollY > 80;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-[#030408]/80 backdrop-blur-2xl py-3 border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex flex-col items-start cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="flex items-center gap-2.5">
            <div className="gradient-bg p-1.5 rounded-lg shadow-lg shadow-orange-500/10">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">SUITE <span className="text-orange-500">IMPULSO</span></span>
          </div>
          <span className="text-[7px] font-black text-gray-500 uppercase tracking-[0.3em] ml-10 -mt-1">by Pixel Yellow</span>
        </div>
        <button 
          onClick={onOpenBooking}
          className={`gradient-bg px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest text-white active:scale-95 btn-shine transition-all duration-500 ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
        >
          Auditoría
        </button>
      </div>
    </nav>
  );
};

const Hero = ({ onOpenBooking }: { onOpenBooking: () => void }) => {
  return (
    <section className="relative pt-32 pb-12 px-6 min-h-[85vh] flex items-center justify-center overflow-hidden">
      <FloatingDecor icon={Sparkles} top="15%" left="15%" delay="0s" size={32} />
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <Reveal delay={0}>
          <div className="inline-flex items-center gap-3 glass-card px-6 py-1.5 rounded-full mb-6 border-white/5">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,1)]"></div>
            <span className="text-[9px] font-black text-orange-100 tracking-[0.2em] uppercase">Contenido que Convierte</span>
          </div>
        </Reveal>
        <Reveal delay={50}>
          <h1 className="text-5xl md:text-[8rem] font-black mb-4 leading-[0.9] tracking-tighter uppercase select-none">
            <span className="opacity-15">SUITE</span> <br />
            <span className="gradient-text drop-shadow-lg inline-block mt-1">IMPULSO</span>
          </h1>
        </Reveal>
        <Reveal delay={150}>
          <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
            Ingeniería de contenido estratégica para <span className="text-white font-black underline decoration-orange-500 decoration-2 underline-offset-4">dominar tu mercado</span> y multiplicar tus ingresos exponencialmente.
          </p>
        </Reveal>
        <Reveal delay={250} direction="none">
          <button 
            onClick={onOpenBooking}
            className="gradient-bg btn-shine px-10 py-5 rounded-[1.5rem] font-black text-lg flex items-center gap-3 mx-auto hover:scale-105 transition-all shadow-xl text-white group"
          >
            Reservar Auditoría <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </Reveal>
        <Reveal delay={400} direction="none" className="w-full mt-12">
          <AnimatedSeparator />
        </Reveal>
      </div>
    </section>
  );
};

const DemoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-16 px-4 md:px-6 relative overflow-hidden section-highlight section-glow-purple">
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionTitle title={<>Impacto Visual <span className="text-orange-500">Real</span></>} />
        <Reveal delay={100} direction="none">
          <div className="glass-card rounded-[1.5rem] md:rounded-[3.5rem] p-2 md:p-5 overflow-hidden relative group border-white/10 shadow-xl aspect-video max-w-4xl mx-auto">
            <div className="relative w-full h-full rounded-[1rem] md:rounded-[2.5rem] overflow-hidden bg-black">
              {!isPlaying ? (
                <div className="w-full h-full relative cursor-pointer group" onClick={() => setIsPlaying(true)}>
                  <img 
                    src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80" 
                    alt="Preview" 
                    className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-[1s]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="gradient-bg w-14 h-14 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
                      <Play className="w-6 h-6 md:w-12 md:h-12 text-white fill-current translate-x-0.5" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                </div>
              ) : (
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0&rel=0" 
                  title="Showreel"
                  frameBorder="0"
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
    { id: "01", title: "Auditoría", desc: "Detectamos las fugas de ingresos en tu estrategia actual.", icon: <MessageSquare /> },
    { id: "02", title: "Estrategia", desc: "Diseñamos un plan táctico alineado con tus objetivos.", icon: <Lightbulb /> },
    { id: "03", title: "Producción", desc: "Creamos contenido de élite listo para dominar.", icon: <Rocket /> },
    { id: "04", title: "Escalado", desc: "Optimizamos en tiempo real para maximizar rentabilidad.", icon: <BarChart3 /> }
  ];

  return (
    <section id="proceso" className="py-16 px-6 relative bg-white/[0.01] border-y border-white/5 section-highlight section-glow-orange">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle subtitle="Metodología" title={<>Estrategia en <span className="gradient-text">4 Pasos</span></>} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 100} direction="up">
              <div className="glass-card relative p-8 h-full rounded-[2.5rem] group border-white/5">
                <div className="absolute -top-4 -left-4 text-[6rem] font-black text-white/[0.02] select-none pointer-events-none group-hover:text-orange-500/5 transition-all leading-none">{s.id}</div>
                <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/10 rounded-xl flex items-center justify-center mb-6 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  {React.cloneElement(s.icon as React.ReactElement, { className: "w-5 h-5" })}
                </div>
                <h3 className="text-lg font-black mb-2 tracking-tight uppercase leading-tight">{s.title}</h3>
                <p className="text-gray-400 text-xs font-medium leading-relaxed group-hover:text-gray-200 transition-colors">{s.desc}</p>
                <div className="h-0.5 w-0 bg-gradient-to-r from-orange-500 to-purple-600 mt-6 group-hover:w-full transition-all duration-500 rounded-full"></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = ({ onOpenBooking }: { onOpenBooking: () => void }) => {
  const services = [
    { title: "Vídeo Premium", desc: "Producción vertical diseñada para retener y convertir.", icon: <Video />, accent: "from-orange-500/10" },
    { title: "Diseño Élite", desc: "Identidad visual que proyecta autoridad y exclusividad.", icon: <PenTool />, accent: "from-purple-500/10" },
    { title: "Growth Marketing", desc: "Crecimiento agresivo basado 100% en el ROI.", icon: <TrendingUp />, accent: "from-blue-500/10" },
    { title: "Content Funnels", desc: "Embudos orgánicos que guían directamente a la compra.", icon: <Target />, accent: "from-red-500/10" },
    { title: "Automatización IA", desc: "Sistemas inteligentes para escalar sin carga operativa.", icon: <Zap />, accent: "from-yellow-500/10" },
    { title: "Personal Branding", desc: "Convertimos tu negocio en el referente del sector.", icon: <Users />, accent: "from-green-500/10" }
  ];

  return (
    <section id="servicios" className="py-16 px-6 relative section-highlight section-glow-purple">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle subtitle="Servicios" title={<>Ingeniería de <span className="gradient-text">Valor</span></>} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {services.map((s, i) => (
            <Reveal key={i} delay={i * 50} direction="up">
              <div className="glass-card p-8 h-full rounded-[2.5rem] group relative overflow-hidden border-white/5">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${s.accent} to-transparent blur-[60px] opacity-20`}></div>
                <div className="bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-white/5 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  {React.cloneElement(s.icon as React.ReactElement, { className: "w-5 h-5" })}
                </div>
                <h3 className="text-lg font-black mb-2 tracking-tight uppercase leading-tight">{s.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed font-medium group-hover:text-gray-200 transition-colors">{s.desc}</p>
                <div className="mt-5 flex items-center gap-2 text-orange-500 font-black text-[9px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
                  Saber más <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { name: "Lucía Fernández", role: "CEO, GlowBeauty", content: "Incrementamos un 400% nuestras ventas orgánicas en solo 90 días con su visión estratégica.", img: "https://i.pravatar.cc/150?u=lucia" },
    { name: "Andrés Costa", role: "Socio, LegalTech", content: "Resultados tangibles desde el primer mes. Capturaron nuestra esencia a la perfección.", img: "https://i.pravatar.cc/150?u=andres" },
    { name: "Sofía Méndez", role: "Marca Personal", content: "Delegar mi contenido en Suite Impulso ha sido mi mejor inversión este año.", img: "https://i.pravatar.cc/150?u=sofia" }
  ];

  return (
    <section id="testimonios" className="py-16 px-6 relative bg-white/[0.01] border-y border-white/5 section-highlight section-glow-orange">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle subtitle="Éxito" title={<>Opiniones de <span className="text-orange-500">Impulso</span></>} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          {reviews.map((r, i) => (
            <Reveal key={i} delay={i * 100} direction="up">
              <div className="glass-card p-8 h-full rounded-[3rem] flex flex-col group border-white/5">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                  ))}
                </div>
                <p className="text-gray-300 font-medium italic mb-8 leading-relaxed text-base flex-grow">"{r.content}"</p>
                <div className="flex items-center gap-3 mt-auto border-t border-white/5 pt-5">
                  <img src={r.img} alt={r.name} className="w-10 h-10 rounded-lg object-cover ring-1 ring-orange-500/20" />
                  <div>
                    <h4 className="font-black text-white text-sm tracking-tight uppercase">{r.name}</h4>
                    <p className="text-[8px] text-orange-500 font-black uppercase tracking-[0.1em] mt-0.5">{r.role}</p>
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

const ClientsSection = () => {
  const clients = [
    { name: "Guaguas", icon: <Bus className="w-5 h-5" /> },
    { name: "Hiperdino", icon: <ShoppingBag className="w-5 h-5" /> },
    { name: "Toyota", icon: <Car className="w-5 h-5" /> },
    { name: "Casa África", icon: <Globe2 className="w-5 h-5" /> },
    { name: "Gobierno", icon: <Landmark className="w-5 h-5" /> },
    { name: "Auditorio", icon: <Music className="w-5 h-5" /> }
  ];

  return (
    <section className="py-12 relative overflow-hidden bg-[#030408] border-b border-white/5">
      <div className="flex overflow-hidden select-none group">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...clients, ...clients, ...clients].map((client, i) => (
            <div key={i} className="flex items-center gap-4 mx-10 px-6 py-3 glass-card rounded-xl border-white/5 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-default">
              <div className="text-orange-500">{client.icon}</div>
              <span className="text-lg font-black tracking-tighter uppercase text-white">{client.name}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }
        .animate-marquee { animation: marquee 40s linear infinite; }
      `}</style>
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030408] via-[#030408]/80 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030408] via-[#030408]/80 to-transparent z-10 pointer-events-none"></div>
    </section>
  );
};

const CTASection = ({ onOpenBooking }: { onOpenBooking: () => void }) => {
  return (
    <section id="contacto" className="py-20 px-6 relative overflow-hidden section-highlight section-glow-orange">
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <Reveal direction="up">
          <div className="glass-card rounded-[3rem] p-10 md:p-16 border-white/10 relative overflow-hidden group">
            <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tighter uppercase relative z-10">
              Transforma tu <br /> <span className="gradient-text transform -rotate-1 inline-block">CONTENIDO</span>
            </h2>
            <button 
              onClick={onOpenBooking}
              className="gradient-bg btn-shine px-10 py-5 rounded-[1.5rem] font-black text-lg flex items-center gap-4 mx-auto hover:scale-105 transition-all shadow-xl text-white relative z-10"
            >
              Auditoría Gratis <ArrowRight className="w-6 h-6" />
            </button>
            <p className="mt-5 text-gray-500 font-bold uppercase tracking-[0.3em] text-[8px]">Plazas Limitadas</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="pt-16 pb-8 px-8 border-t border-white/5 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-3 mb-4 group cursor-default">
            <div className="gradient-bg p-1.5 rounded-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">SUITE <span className="text-orange-500">IMPULSO</span></span>
          </div>
          <p className="text-gray-500 text-[10px] font-medium max-w-sm leading-relaxed">Ingeniería estratégica de alto impacto. Transforma tu facturación hoy.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 text-[8px] font-black uppercase tracking-[0.3em] text-gray-500">
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-all">Privacidad</a>
            <a href="#" className="hover:text-white transition-all">Términos</a>
          </div>
          <a href="mailto:pixel@pixelyellow.com" className="bg-white/5 px-5 py-2.5 rounded-full border border-white/5 hover:text-orange-500 transition-all text-center">pixel@pixelyellow.com</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-5 border-t border-white/5 text-center text-[7px] font-bold text-gray-600 uppercase tracking-[0.2em]">
        © 2026 SUITE IMPULSO. Todos los derechos reservados.
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const scrollY = useScrollY();
  const showScroll = scrollY > 600;
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="relative min-h-screen selection:bg-orange-500/30 selection:text-white">
      <BackgroundDecor />
      <Navbar onOpenBooking={() => setIsBookingOpen(true)} />
      <main className="relative z-10">
        <Hero onOpenBooking={() => setIsBookingOpen(true)} />
        <DemoSection />
        <Process />
        <Services onOpenBooking={() => setIsBookingOpen(true)} />
        <Testimonials />
        <ClientsSection />
        <CTASection onOpenBooking={() => setIsBookingOpen(true)} />
      </main>
      <Footer />
      
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 gradient-bg p-3.5 rounded-xl shadow-lg transition-all duration-500 hover:scale-110 active:scale-90 ${showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}
      >
        <ChevronUp className="w-5 h-5 text-white" strokeWidth={3} />
      </button>

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
      <SpeedInsights />
    </div>
  );
};

export default App;
