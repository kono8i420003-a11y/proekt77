/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Zap,
  Sparkles,
  BrainCircuit,
  Code2,
  Rocket,
  Github,
  Youtube,
  Send,
  ArrowRight,
  Layers,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, ReactNode } from 'react';

// --- Types ---

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
}

interface CurriculumItem {
  id: number;
  title: string;
  details: string;
}

interface SocialLink {
  platform: string;
  url: string;
  icon: ReactNode;
  label: string;
}

// --- Data ---

const FEATURES: FeatureItem[] = [
  {
    id: 'speed',
    title: 'Скорость',
    description: 'Быстрее переходи от идеи к рабочему прототипу. ИИ берет на себя написание кода, а ты — управление результатом.',
    icon: <Zap className="w-6 h-6 text-neon-cyan" />
  },
  {
    id: 'no-routine',
    title: 'Без рутины',
    description: 'Передавай повторяющиеся задачи ИИ. Забудь про шаблонный код и настройку конфигураций вручную.',
    icon: <Sparkles className="w-6 h-6 text-neon-purple" />
  },
  {
    id: 'architecture',
    title: 'Фокус на архитектуре',
    description: 'Концентрируйся на логике, структуре и ценности продукта. Стань дирижером технологий, а не исполнителем.',
    icon: <BrainCircuit className="w-6 h-6 text-neon-blue" />
  }
];

const CURRICULUM: CurriculumItem[] = [
  { id: 1, title: 'Старт и база вайбкодинга', details: 'Философия работы с ИИ, настройка окружения и первый промпт.' },
  { id: 2, title: 'Создание сайтов', details: 'Быстрая верстка и деплой современных лендингов за считанные минуты.' },
  { id: 3, title: 'Первый AI-проект', details: 'Интеграция LLM в твое приложение и создание умных функций.' },
  { id: 4, title: 'Lovable AI и проекты сложности MID', details: 'Работа с продвинутыми библиотеками и сложной логикой интерфейсов.' },
  { id: 5, title: 'Боты и интеграции', details: 'Автоматизация бизнес-процессов и создание Telegram-ботов с ИИ.' },
  { id: 6, title: 'Монетизация и упаковка', details: 'Как превратить свой проект в продукт и начать на нем зарабатывать.' },
  { id: 7, title: 'Claude Code', details: 'Мастерство работы с новейшими инструментами автономного кодинга.' }
];

const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'Telegram', url: 'https://t.me/vibecoding', icon: <Send className="w-5 h-5" />, label: 'Наш Telegram канал' },
  { platform: 'YouTube', url: 'https://youtube.com/@vibecoding', icon: <Youtube className="w-5 h-5" />, label: 'Уроки на YouTube' },
  { platform: 'GitHub', url: 'https://github.com/vibecoding', icon: <Github className="w-5 h-5" />, label: 'Наш репозиторий' }
];

const CODE_LINE_PADDINGS = Array.from({ length: 40 }, () => Math.random() * 4);

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass rounded-2xl px-6 py-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-neon-purple to-neon-blue rounded-lg flex items-center justify-center">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">Вайбкодинг</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Преимущества</a>
          <a href="#curriculum" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Программа</a>
          <button className="px-5 py-2 rounded-xl bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-colors">
            Начать творить
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-6 right-6 glass rounded-2xl p-6 flex flex-col gap-4"
          >
            <a href="#features" className="text-lg font-medium" onClick={() => setIsOpen(false)}>Преимущества</a>
            <a href="#curriculum" className="text-lg font-medium" onClick={() => setIsOpen(false)}>Программа</a>
            <button className="w-full py-4 rounded-xl bg-white text-black font-bold text-lg">
              Начать творить
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden flex flex-col items-center justify-center">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-neon-purple/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-neon-blue/20 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl w-full text-center relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan text-xs font-bold uppercase tracking-wider mb-8">
          <Sparkles className="w-3 h-3" />
          AI-powered курс
        </div>

        <h1 className="font-display font-bold text-5xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.9] mb-8">
          Вайбкодинг: <br /> 
          <span className="text-gradient">Твори с ИИ</span>
        </h1>

        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          Освой подход, в котором ИИ помогает быстрее создавать сайты, приложения, ботов и цифровые продукты. Переходи от идеи к результату за считанные часы.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-black font-extrabold text-lg hover:scale-105 active:scale-95 transition-all glow-blue group flex items-center justify-center gap-2">
            Начать творить
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <a href="#curriculum" className="w-full sm:w-auto px-8 py-4 rounded-2xl glass font-bold text-lg hover:bg-white/10 transition-colors text-center">
            Смотреть программу
          </a>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-20 relative w-full max-w-5xl aspect-video glass rounded-[2.5rem] p-4 glow-purple overflow-hidden"
      >
        <div className="w-full h-full bg-neutral-900 rounded-[2rem] flex items-center justify-center relative group overflow-hidden">
           {/* Abstract code visual placeholder */}
           <div className="absolute inset-0 opacity-20 pointer-events-none p-8 font-mono text-xs overflow-hidden leading-relaxed">
             {CODE_LINE_PADDINGS.map((pad, i) => (
                <div key={i} className="whitespace-nowrap" style={{ paddingLeft: `${pad}rem` }}>
                  {`const vibe = async () => await ai.create({ v: "concept", context: ${i % 2 === 0 ? '"creative"' : '"optimized"'} });`}
                </div>
             ))}
           </div>
           <div className="relative z-10 flex flex-col items-center gap-4 text-center">
              <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Rocket className="w-10 h-10 text-neon-blue" />
              </div>
              <p className="text-white/40 text-sm font-medium">Предпросмотр среды вайбкодинга</p>
           </div>
        </div>
      </motion.div>
    </section>
  );
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="font-display font-bold text-4xl md:text-6xl mb-6">Будущее <span className="text-neon-cyan">уже здесь</span></h2>
        <p className="text-white/50 max-w-xl">Меняем парадигму разработки. Теперь ты — архитектор смыслов, а ИИ — твой универсальный строитель.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FEATURES.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-3xl p-8 hover:border-white/20 transition-all flex flex-col gap-6 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <div>
              <h3 className="font-display font-bold text-2xl mb-3">{feature.title}</h3>
              <p className="text-white/50 leading-relaxed">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const CurriculumSection = () => {
  return (
    <section id="curriculum" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="font-display font-bold text-4xl md:text-6xl mb-6">Программа <span className="text-neon-purple">обучения</span></h2>
        <p className="text-white/50 max-w-xl">От первого промпта до полноценного продукта. Краткий, но насыщенный путь к мастерству.</p>
      </div>

      <div className="space-y-4">
        {CURRICULUM.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="group relative overflow-hidden glass rounded-2xl p-6 md:p-8 flex items-start gap-6 hover:bg-white/5 transition-all"
          >
            <div className="text-4xl font-display font-bold text-white/10 group-hover:text-neon-blue/30 transition-colors shrink-0">
              {item.id.toString().padStart(2, '0')}
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl md:text-2xl font-bold">{item.title}</h3>
              <p className="text-white/50 leading-relaxed">{item.details}</p>
            </div>
            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
              <CheckCircle2 className="w-6 h-6 text-neon-blue" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 p-8 glass rounded-3xl border-neon-cyan/20 flex flex-col md:flex-row items-center gap-8 justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-neon-cyan/20 flex items-center justify-center shrink-0">
            <Layers className="w-8 h-8 text-neon-cyan" />
          </div>
          <div>
            <h4 className="text-xl font-bold">Готов начать?</h4>
            <p className="text-white/50">Присоединяйся к сообществу творцов будущего.</p>
          </div>
        </div>
        <button className="w-full md:w-auto px-10 py-5 rounded-2xl bg-neon-blue text-white font-extrabold text-xl hover:bg-neon-blue/80 transition-all glow-blue flex items-center justify-center gap-2">
          Записаться на курс
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-white/5 bg-neutral-950/50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-neon-purple to-neon-blue rounded-xl flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight">Вайбкодинг</span>
          </div>
          <p className="text-white/50 max-w-sm">
            Обучаем людей создавать будущее своими руками. Стань частью нового поколения разработчиков.
          </p>
          <div className="text-white/30 text-sm">
            © 2026 Вайбкодинг. Все права защищены.
          </div>
        </div>

        <div className="flex flex-col md:items-end gap-8">
          <div className="flex gap-4">
            {SOCIAL_LINKS.map((link) => (
              <a 
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-white/70 hover:text-white hover:scale-110 transition-all"
              >
                {link.icon}
              </a>
            ))}
          </div>
          <div className="flex flex-col md:items-end gap-2 text-sm text-white/50">
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition-colors">Договор оферты</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="font-sans">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <CurriculumSection />
      <Footer />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-colors z-40"
          >
            <ArrowRight className="w-6 h-6 -rotate-90" />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}
