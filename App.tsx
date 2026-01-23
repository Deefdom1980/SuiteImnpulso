
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
    const handleScroll = () => setScrollY(window.scrollY);
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
      rootMargin: "-30% 0% -30% 0%",
      threshold: 0 
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

// --- Legal Modal Component ---

type LegalType = 'privacy' | 'terms' | 'cookies';

const LegalModal = ({ isOpen, onClose, type }: { isOpen: boolean, onClose: () => void, type: LegalType }) => {
  if (!isOpen) return null;

  const content = {
    privacy: {
      title: 'Política de Privacidad',
      icon: <ShieldCheck className="w-6 h-6 text-orange-500" />,
      text: (
        <div className="space-y-6 text-gray-400 text-sm leading-relaxed">
          <p>En SUITE IMPULSO (by Pixel Yellow), nos tomamos muy en serio la seguridad de tu información. Cumplimos estrictamente con el Reglamento General de Protección de Datos (RGPD).</p>
          <section className="space-y-2">
            <h4 className="text-white font-black uppercase tracking-widest text-[10px]">1. Recogida de Datos</h4>
            <p>Solo solicitamos los datos necesarios para gestionar tu auditoría estratégica: nombre, email, teléfono y datos de tu empresa.</p>
          </section>
          <section className="space-y-2">
            <h4 className="text-white font-black uppercase tracking-widest text-[10px]">2. Finalidad</h4>
            <p>Tus datos se utilizan exclusivamente para contactar contigo tras la solicitud de auditoría y para enviarte comunicaciones relacionadas con el servicio de la Suite.</p>
          </section>
          <section className="space-y-2">
            <h4 className="text-white font-black uppercase tracking-widest text-[10px]">3. No compartimos tus datos</h4>
            <p>Bajo ninguna circunstancia vendemos o cedemos tus datos a terceros con fines comerciales. Tu confianza es nuestra prioridad.</p>
          </section>
          <section className="space-y-2">
            <h4 className="text-white font-black uppercase tracking-widest text-[10px]">4. Tus Derechos</h4>
            <p>Puedes solicitar el acceso, rectificación o eliminación de tus datos en cualquier momento enviando un mensaje a nuestro equipo de soporte.</p>
          </section>
        </div>
      )
    },
    terms: {
      title: 'Términos y Condiciones',
      icon: <FileText className="w-6 h-6 text-orange-500" />,
      text: (
        <div className="space-y-6 text-gray-400 text-sm leading-relaxed">
          <p>Al acceder y utilizar la web de SUITE IMPULSO, aceptas quedar vinculado por estos términos legales.</p>
          <section className="space-y-2">
            <h4 className="text-white font-black uppercase tracking-widest text-[10px]">1. Propiedad Intelectual</h4>
            <p>Todo el contenido, diseño y metodologías expuestas en esta web son propiedad exclusiva de Pixel Yellow. Queda prohibida su reproducción total o parcial sin consentimiento previo.</p>
          </section>
          <section className="space-y-2">
            <h4 className="text-white font-black uppercase tracking-widest text-[10px]">2. Disponibilidad del Servicio</h4>
            <p>La reserva de una auditoría no garantiza la ejecución inmediata del servicio, la cual queda sujeta a la disponibilidad del equipo estratégico de la Suite.</p>
          </section>
          <section className="space-y-2">
            <h4 className="text-white font-black uppercase tracking-widest text-[10px]">3. Limitación de Responsabilidad</h4>
            <p>SUITE IMPULSO no se hace responsable de las decisiones de negocio tomadas por los clientes basándose en el contenido gratuito ofrecido en esta web hasta que se formalice un contrato de consultoría.</p>
          </section>
        </div>
      )
    },
    cookies: {
      title: 'Política de Cookies',
      icon: <Cookie className="w-6 h-6 text-orange-500" />,
      text: (
        <div className="space-y-6 text-gray-400 text-sm leading-relaxed">
          <p>Este sitio web utiliza cookies para mejorar tu experiencia de navegación y analizar nuestro tráfico.</p>
          <section className="space-y-2">
            <h4 className="text-white font-black uppercase tracking-widest text-[10px]">1. Cookies Técnicas</h4>
            <p>Son esenciales para que la web funcione correctamente, permitiéndote navegar por las secciones y utilizar el sistema de reservas.</p>
          </section>
          <section className="space-y-2">
            <h4 className="text-white font-black uppercase tracking-widest text-[10px]">2. Cookies de Análisis</h4>
            <p>Utilizamos herramientas como Vercel Speed Insights para entender cómo interactúas con la Suite y así poder optimizar su rendimiento.</p>
          </section>
          <section className="space-y-2">
            <h4 className="text-white font-black uppercase tracking-widest text-[10px]">3. Gestión de Cookies</h4>
            <p>Puedes configurar tu navegador para bloquear o alertarte sobre estas cookies, pero algunas partes del sitio podrían no funcionar correctamente.</p>
          </section>
        </div>
      )
    }
  };

  const activeContent = content[type];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose}></div>
      <div className="glass-card w-full max-w-2xl max-h-[80vh] rounded-[2.5rem] border-white/10 relative z-10 overflow-hidden flex flex-col">
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {activeContent.icon}
            <h3 className="text-xl font-black uppercase tracking-tighter">{activeContent.title}</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-500 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {activeContent.text}
        </div>
      </div>
    </div>
  );
};

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
    const currentRef = ref.current;
    
    // Si ya está visible en el viewport al montar, activamos de inmediato
    if (currentRef) {
      const rect = currentRef.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        setIsVisible(true);
        return;
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { 
        setIsVisible(true); 
        if (currentRef) observer.unobserve(currentRef); 
      }
    }, { 
      threshold: 0.01, // Umbral mínimo para detectar carga inmediata
      rootMargin: "50px" 
    });

    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
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
  <div className={`mb-8 md:mb-12 ${centered ? 'text-center' : ''}`}>
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
            <SuiteLogo className="text-xl" />
          </div>
          <PixelYellowLogo />
        </div>
        <button 
          onClick={onOpenBooking}
          className={`gradient-bg px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest text-white active:scale-95 btn-shine transition-all duration-500 ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
        >
          AGENDAR
        </button>
      </div>
    </nav>
  );
};

const Hero = ({ onOpenBooking }: { onOpenBooking: () => void }) => {
  return (
    <section className="relative pt-24 md:pt-32 pb-12 px-6 min-h-[80vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden">
      <FloatingDecor icon={Sparkles} top="15%" left="15%" delay="0s" size={32} />
      <div className="max-w-7xl mx-auto text-center relative z-10 w-full">
        <Reveal delay={50}>
          <h1 className="flex flex-col items-center justify-center font-display mb-10 relative">
            <span className="text-5xl sm:text-7xl md:text-[7.5rem] font-thin text-outline tracking-[0.2em] leading-none opacity-60">
              SUITE
            </span>
            <span className="text-6xl sm:text-8xl md:text-[11rem] lg:text-[12.5rem] font-black gradient-text leading-[0.8] tracking-[-0.04em] -mt-2 md:-mt-8 drop-shadow-[0_25px_60px_rgba(249,115,22,0.4)] uppercase">
              IMPULSO
            </span>
          </h1>
        </Reveal>
        <Reveal delay={150}>
          <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium px-4">
            Contenido estratégico de alto valor para potenciar <span className="text-white font-black underline decoration-orange-500 decoration-2 underline-offset-[12px]">tu negocio</span>
          </p>
        </Reveal>
        <Reveal delay={250} direction="none">
          <button 
            onClick={onOpenBooking}
            className="gradient-bg btn-shine px-12 py-6 rounded-[2rem] font-black text-lg flex items-center gap-4 mx-auto hover:scale-105 active:scale-95 transition-all shadow-2xl text-white group"
          >
            Agendar Auditoría <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </Reveal>
        <Reveal delay={400} direction="none" className="w-full mt-12 opacity-40">
          <AnimatedSeparator />
        </Reveal>
      </div>
    </section>
  );
};

const DemoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-12 md:py-20 px-4 md:px-6 relative overflow-hidden section-highlight">
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionTitle title={<>Impacto Visual <span className="text-orange-500">Real</span></>} subtitle="Showcase" />
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
    <section id="proceso" className="py-12 md:py-24 px-6 relative bg-white/[0.01] border-y border-white/5 section-highlight">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle subtitle="Metodología" title={<>Estrategia en <span className="gradient-text">4 Pasos</span></>} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 md:mt-16">
          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 100} direction="up">
              <MobileActiveObserver>
                <div className="relative group h-full">
                  <div className="absolute -inset-[1px] rounded-[2.5rem] bg-gradient-to-br from-white/10 via-transparent to-white/5 group-hover:from-orange-500/50 group-hover:to-purple-500/50 transition-all duration-700"></div>
                  
                  <div className="relative glass-card p-8 h-full rounded-[2.5rem] bg-[#030408]/80 backdrop-blur-3xl flex flex-col items-center text-center group-hover:bg-[#05060a] transition-all duration-500">
                    <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-orange-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    <span className="text-4xl font-black mb-6 block gradient-text opacity-40 group-hover:opacity-100 transition-all duration-500 tracking-tighter">
                      {s.id}
                    </span>
                    
                    <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 text-orange-500 group-hover:scale-110 group-hover:border-orange-500/30 transition-all duration-500 relative shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                      {React.cloneElement(s.icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6 drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" })}
                    </div>
                    
                    <h3 className="text-xl font-black mb-3 tracking-tight uppercase leading-tight text-white group-hover:text-orange-500 transition-colors duration-500">
                      {s.title}
                    </h3>
                    <p className="text-gray-400 text-sm font-medium leading-relaxed group-hover:text-gray-300 transition-colors duration-500 px-2">
                      {s.desc}
                    </p>
                    
                    <div className="mt-8 w-8 h-[2px] bg-gradient-to-r from-orange-500 to-purple-500 rounded-full group-hover:w-full transition-all duration-1000"></div>
                  </div>
                </div>
              </MobileActiveObserver>
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
    <section id="servicios" className="py-12 md:py-20 px-6 relative section-highlight">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle subtitle="Servicios" title={<>Incluido en la <span className="gradient-text">Suite</span></>} />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 mt-6 md:mt-10">
          {services.map((s, i) => (
            <Reveal key={i} delay={i * 50} direction="up">
              <MobileActiveObserver>
                <div className="glass-card p-5 md:p-8 h-full rounded-[2rem] md:rounded-[2.5rem] group relative overflow-hidden border-white/5">
                  <div className={`absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br ${s.accent} to-transparent blur-[40px] md:blur-[60px] opacity-20`}></div>
                  <div className="bg-white/5 w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center mb-4 md:mb-6 border border-white/5 text-orange-500 group-hover:bg-orange-500 group-hover:text-white mobile-active-bg transition-all">
                    {React.cloneElement(s.icon as React.ReactElement<{ className?: string }>, { className: "w-4 h-4 md:w-5 md:h-5" })}
                  </div>
                  <h3 className="text-sm md:text-lg font-black mb-1 md:mb-2 tracking-tight uppercase leading-tight mobile-active-text">{s.title}</h3>
                  <p className="text-gray-400 text-[10px] md:text-xs leading-relaxed font-medium group-hover:text-gray-200 transition-colors line-clamp-2 md:line-clamp-none">{s.desc}</p>
                </div>
              </MobileActiveObserver>
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
    { name: "Sofía Méndez", role: "Marca Personal", content: "Delegar mi contenido en Suite Impulso ha sido mi mejor inversión este año.", img: "https://i.pravatar.cc/150?u=sofia" },
    { name: "Carlos Ruiz", role: "Emprendedor", content: "La mejor decisión estratégica para mi marca. Calidad visual inigualable.", img: "https://i.pravatar.cc/150?u=carlos" },
    { name: "Elena Sanz", role: "Directora Creativa", content: "Profesionalismo puro. Han elevado nuestra imagen a otro nivel.", img: "https://i.pravatar.cc/150?u=elena" }
  ];

  return (
    <section id="testimonios" className="py-12 md:py-24 relative bg-white/[0.01] border-y border-white/5 section-highlight overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-10">
        <SectionTitle subtitle="Éxito" title={<>Opiniones de <span className="text-orange-500">Impulso</span></>} />
      </div>

      <div className="flex overflow-hidden select-none group">
        <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
          {[...reviews, ...reviews].map((r, i) => (
            <div key={i} className="inline-block mx-4 min-w-[320px] md:min-w-[450px]">
              <div className="glass-card p-6 md:p-8 rounded-[2.5rem] flex flex-col h-full border-white/5 whitespace-normal">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-3 h-3 text-orange-500 fill-orange-500" />
                  ))}
                </div>
                <p className="text-gray-300 font-medium italic mb-6 leading-relaxed text-sm md:text-base flex-grow">"{r.content}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <img src={r.img} alt={r.name} className="w-10 h-10 rounded-lg object-cover ring-1 ring-orange-500/20" />
                  <div>
                    <h4 className="font-black text-white text-xs tracking-tight uppercase">{r.name}</h4>
                    <p className="text-[7px] text-orange-500 font-black uppercase tracking-[0.1em] mt-0.5">{r.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee-testimonials {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee-testimonials 40s linear infinite;
        }
      `}</style>

      {/* Fade effects for the slider edge */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030408] via-[#030408]/50 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030408] via-[#030408]/50 to-transparent z-10 pointer-events-none"></div>
    </section>
  );
};

const ClientsSection = () => {
  const row1 = [
    { name: "Guaguas Municipales", icon: <Bus className="w-5 h-5" /> },
    { name: "Hiperdino", icon: <ShoppingBag className="w-5 h-5" /> },
    { name: "Auditorio y Teatro LPGC", icon: <Music className="w-5 h-5" /> },
    { name: "Base:", icon: <ShoppingBag className="w-5 h-5" /> },
    { name: "Toyota", icon: <Car className="w-5 h-5" /> },
    { name: "Fundación Acuorum", icon: <Globe className="w-5 h-5" /> },
    { name: "Casa África", icon: <Globe2 className="w-5 h-5" /> }
  ];

  const row2 = [
    { name: "Gobierno de Canarias", icon: <Landmark className="w-5 h-5" /> },
    { name: "Cabildo de Gran Canaria", icon: <Landmark className="w-5 h-5" /> },
    { name: "Cabildo de Lanzarote", icon: <Landmark className="w-5 h-5" /> },
    { name: "Ayuntamiento de LPGC", icon: <Building2 className="w-5 h-5" /> },
    { name: "Ayuntamiento de Telde", icon: <Building2 className="w-5 h-5" /> },
    { name: "Ayuntamiento de Puerto del Rosario", icon: <Building2 className="w-5 h-5" /> },
    { name: "Agencias y productoras", icon: <Briefcase className="w-5 h-5" /> }
  ];

  return (
    <section className="py-12 md:py-16 relative overflow-hidden bg-[#030408] border-b border-white/5 space-y-6">
      <div className="max-w-7xl mx-auto px-6 mb-4 text-center">
        <span className="text-[9px] font-black text-gray-500 uppercase tracking-[0.4em]">confían en nosotros</span>
      </div>
      <div className="flex overflow-hidden select-none group">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...row1, ...row1, ...row1].map((client, i) => (
            <div key={i} className="flex items-center gap-4 mx-6 px-6 py-4 glass-card rounded-2xl border-white/5 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-default">
              <div className="text-orange-500">{client.icon}</div>
              <span className="text-base font-black tracking-tighter uppercase text-white">{client.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex overflow-hidden select-none group">
        <div className="flex whitespace-nowrap animate-marquee-reverse">
          {[...row2, ...row2, ...row2].map((client, i) => (
            <div key={i} className="flex items-center gap-4 mx-6 px-6 py-4 glass-card rounded-2xl border-white/5 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-default">
              <div className="text-orange-500">{client.icon}</div>
              <span className="text-base font-black tracking-tighter uppercase text-white">{client.name}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }
        @keyframes marquee-reverse { 0% { transform: translateX(-33.33%); } 100% { transform: translateX(0); } }
        .animate-marquee { animation: marquee 50s linear infinite; }
        .animate-marquee-reverse { animation: marquee-reverse 60s linear infinite; }
      `}</style>
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030408] via-[#030408]/80 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030408] via-[#030408]/80 to-transparent z-10 pointer-events-none"></div>
    </section>
  );
};

const CTASection = ({ onOpenBooking }: { onOpenBooking: () => void }) => {
  return (
    <section id="contacto" className="py-16 md:py-24 px-6 relative overflow-hidden section-highlight">
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <Reveal direction="up">
          <div className="glass-card rounded-[3rem] p-10 md:p-16 border-white/10 relative overflow-hidden group">
            <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tighter uppercase relative z-10">
              Impulsa tu <br /> <span className="gradient-text transform -rotate-1 inline-block">NEGOCIO</span>
            </h2>
            <button 
              onClick={onOpenBooking}
              className="gradient-bg btn-shine px-10 py-5 rounded-[1.5rem] font-black text-lg flex items-center gap-4 mx-auto hover:scale-105 transition-all shadow-xl text-white relative z-10"
            >
              Agendar Auditoría <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Footer = ({ onOpenLegal }: { onOpenLegal: (type: LegalType) => void }) => {
  return (
    <footer className="pt-12 md:pt-16 pb-8 px-8 border-t border-white/5 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2.5 mb-1 group cursor-default">
            <div className="gradient-bg p-1.5 rounded-lg shadow-lg shadow-orange-500/10">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <SuiteLogo className="text-xl" />
          </div>
          <PixelYellowLogo />
          <p className="text-gray-500 text-[10px] font-medium max-w-sm leading-relaxed mt-4">Gestión de contenido de alto valor para potenciar tu negocio.</p>
        </div>
        <div className="flex flex-col gap-6 text-[8px] font-black uppercase tracking-[0.3em] text-gray-500 items-center md:items-end">
          <div className="flex gap-8">
            <button onClick={() => onOpenLegal('privacy')} className="hover:text-white transition-all uppercase tracking-[0.2em]">Privacidad</button>
            <button onClick={() => onOpenLegal('terms')} className="hover:text-white transition-all uppercase tracking-[0.2em]">Términos</button>
            <button onClick={() => onOpenLegal('cookies')} className="hover:text-white transition-all uppercase tracking-[0.2em]">Cookies</button>
          </div>
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
  const [legalModal, setLegalModal] = useState<{ open: boolean, type: LegalType }>({ open: false, type: 'privacy' });
  const scrollY = useScrollY();
  const showScroll = scrollY > 600;
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const openLegal = (type: LegalType) => setLegalModal({ open: true, type });
  const closeLegal = () => setLegalModal(prev => ({ ...prev, open: false }));

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
      <Footer onOpenLegal={openLegal} />
      
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

      <LegalModal 
        isOpen={legalModal.open} 
        onClose={closeLegal} 
        type={legalModal.type} 
      />

      <SpeedInsights />
    </div>
  );
};

export default App;
