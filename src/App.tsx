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
  X,
  Star,
  Check,
  Globe,
  Cpu,
  Briefcase,
  GraduationCap,
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
  learns: string[];
  result: string;
}

interface SocialLink {
  platform: string;
  url: string;
  icon: ReactNode;
  label: string;
}

interface AudienceItem {
  icon: ReactNode;
  role: string;
  description: string;
  benefit: string;
}

interface ResultCard {
  icon: ReactNode;
  title: string;
  description: string;
}

interface Testimonial {
  name: string;
  role: string;
  text: string;
  result: string;
}

// --- Data ---

const FEATURES: FeatureItem[] = [
  {
    id: 'speed',
    title: 'Скорость',
    description: 'Быстрее переходи от идеи к рабочему прототипу. ИИ берет на себя написание кода, а ты — управление результатом.',
    icon: <Zap className="w-6 h-6 text-neon-cyan" />,
  },
  {
    id: 'no-routine',
    title: 'Без рутины',
    description: 'Передавай повторяющиеся задачи ИИ. Забудь про шаблонный код и настройку конфигураций вручную.',
    icon: <Sparkles className="w-6 h-6 text-neon-purple" />,
  },
  {
    id: 'architecture',
    title: 'Фокус на архитектуре',
    description: 'Концентрируйся на логике, структуре и ценности продукта. Стань дирижером технологий, а не исполнителем.',
    icon: <BrainCircuit className="w-6 h-6 text-neon-blue" />,
  },
];

const CURRICULUM: CurriculumItem[] = [
  {
    id: 1,
    title: 'Старт и база вайбкодинга',
    learns: ['Философия работы с ИИ', 'Настройка окружения', 'Первый промпт'],
    result: 'Настроенное рабочее окружение и первый запущенный проект',
  },
  {
    id: 2,
    title: 'Создание сайтов',
    learns: ['Верстка с помощью ИИ', 'Деплой за минуты', 'Быстрые лендинги'],
    result: 'Готовый лендинг, опубликованный в интернете',
  },
  {
    id: 3,
    title: 'Первый AI-проект',
    learns: ['Интеграция LLM', 'Умные функции в приложении', 'Работа с API'],
    result: 'Приложение с встроенным искусственным интеллектом',
  },
  {
    id: 4,
    title: 'Lovable AI и проекты MID',
    learns: ['Продвинутые библиотеки', 'Сложная логика интерфейсов', 'Оптимизация промптов'],
    result: 'Полноценный веб-продукт с продвинутым UI',
  },
  {
    id: 5,
    title: 'Боты и интеграции',
    learns: ['Telegram-боты с ИИ', 'Автоматизация процессов', 'Webhook и API'],
    result: 'Работающий Telegram-бот для бизнеса или личного использования',
  },
  {
    id: 6,
    title: 'Монетизация и упаковка',
    learns: ['Упаковка продукта', 'Стратегии монетизации', 'Продвижение'],
    result: 'Готовый к продаже цифровой продукт',
  },
  {
    id: 7,
    title: 'Claude Code',
    learns: ['Автономный кодинг', 'Новейшие инструменты ИИ', 'Продвинутые промпты'],
    result: 'Мастерство работы с топовыми AI-инструментами',
  },
];

const AUDIENCE: AudienceItem[] = [
  {
    icon: <GraduationCap className="w-8 h-8 text-neon-cyan" />,
    role: 'Новичок',
    description: 'Никогда не кодил',
    benefit: 'Создашь первый сайт без знания программирования уже в первую неделю',
  },
  {
    icon: <Cpu className="w-8 h-8 text-neon-blue" />,
    role: 'Разработчик',
    description: 'Хочу ускорить работу',
    benefit: 'Делай то, что занимало день — за 1 час. ИИ берёт рутину на себя',
  },
  {
    icon: <Briefcase className="w-8 h-8 text-neon-purple" />,
    role: 'Предприниматель',
    description: 'Хочу делать продукты',
    benefit: 'Запускай MVP самостоятельно, без найма разработчиков',
  },
];

const RESULTS: ResultCard[] = [
  {
    icon: <Rocket className="w-7 h-7 text-neon-cyan" />,
    title: 'Сделаешь первый AI-проект',
    description: 'Настоящее приложение с ИИ, которое ты покажешь работодателю или клиенту',
  },
  {
    icon: <Globe className="w-7 h-7 text-neon-blue" />,
    title: 'Научишься быстро делать лендинги',
    description: 'Профессиональный сайт с нуля — за часы, а не недели',
  },
  {
    icon: <Zap className="w-7 h-7 text-neon-purple" />,
    title: 'Автоматизируешь задачи',
    description: 'Освободишь часы рутинной работы, передав их ИИ',
  },
  {
    icon: <BrainCircuit className="w-7 h-7 text-neon-cyan" />,
    title: 'Поймёшь архитектуру AI-продуктов',
    description: 'Научишься думать как продакт: структура, логика, монетизация',
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Алексей М.',
    role: 'Предприниматель',
    text: 'За 5 дней сделал лендинг для своего бизнеса. Раньше платил фрилансерам 30 000 ₽',
    result: 'Сайт за 5 дней',
  },
  {
    name: 'Мария К.',
    role: 'Маркетолог',
    text: 'Думала, что программирование не для меня. Теперь сама делаю лендинги и автоматизации',
    result: '−15 ч/неделю рутины',
  },
  {
    name: 'Дмитрий С.',
    role: 'Разработчик',
    text: 'Скорость работы выросла в 3 раза. ИИ берёт на себя всю рутину, я занимаюсь архитектурой',
    result: '×3 скорость',
  },
];

const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'Telegram', url: 'https://t.me/vibecoding', icon: <Send className="w-5 h-5" />, label: 'Наш Telegram канал' },
  { platform: 'YouTube', url: 'https://youtube.com/@vibecoding', icon: <Youtube className="w-5 h-5" />, label: 'Уроки на YouTube' },
  { platform: 'GitHub', url: 'https://github.com/vibecoding', icon: <Github className="w-5 h-5" />, label: 'Наш репозиторий' },
];

const CODE_LINE_PADDINGS = Array.from({ length: 40 }, () => Math.random() * 4);

// --- Shared CTA block ---

const CTABlock = ({ className = '' }: { className?: string }) => (
  <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${className}`}>
    <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-black font-extrabold text-lg hover:scale-105 active:scale-95 transition-all glow-blue group flex items-center justify-center gap-2">
      Начать обучение за 2 минуты
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </button>
    <a
      href="#curriculum"
      className="w-full sm:w-auto px-8 py-4 rounded-2xl glass font-bold text-lg hover:bg-white/10 transition-colors text-center"
    >
      Смотреть программу
    </a>
  </div>
);

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between glass rounded-2xl px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-neon-purple to-neon-blue rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">Вайбкодинг</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#for-whom" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Для кого</a>
            <a href="#features" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Преимущества</a>
            <a href="#curriculum" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Программа</a>
            <button className="px-5 py-2 rounded-xl bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-colors">
              Начать обучение
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
              <a href="#for-whom" className="text-lg font-medium" onClick={() => setIsOpen(false)}>Для кого</a>
              <a href="#features" className="text-lg font-medium" onClick={() => setIsOpen(false)}>Преимущества</a>
              <a href="#curriculum" className="text-lg font-medium" onClick={() => setIsOpen(false)}>Программа</a>
              <button className="w-full py-4 rounded-xl bg-white text-black font-bold text-lg">
                Начать обучение
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden px-4 pb-4 pt-3 bg-gradient-to-t from-black to-transparent">
        <button className="w-full py-4 rounded-2xl bg-white text-black font-extrabold text-base flex items-center justify-center gap-2">
          Начать обучение
          <span className="text-sm font-normal text-black/50">· Старт за 2 минуты</span>
        </button>
      </div>
    </>
  );
};

const HeroSection = () => (
  <section className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden flex flex-col items-center justify-center">
    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-neon-purple/20 rounded-full blur-[120px] pointer-events-none" />
    <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-neon-blue/20 rounded-full blur-[120px] pointer-events-none" />

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="max-w-4xl w-full text-center relative z-10"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan text-xs font-bold uppercase tracking-wider mb-8">
        <Sparkles className="w-3 h-3" />
        AI-powered курс · 7 дней
      </div>

      <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] mb-6">
        Создавай сайты и AI-продукты{' '}
        <span className="text-gradient">за дни,</span>
        <br />а не месяцы
      </h1>

      <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
        Практический курс по разработке с ИИ — от идеи до готового продукта без лишнего кода
      </p>

      <ul className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
        {[
          { emoji: '🚀', text: 'Без глубокого программирования' },
          { emoji: '🤖', text: 'С использованием ChatGPT / Claude' },
          { emoji: '💼', text: 'Под реальные задачи и проекты' },
        ].map((item) => (
          <li key={item.text} className="flex items-center gap-2 text-white/90 text-sm font-medium">
            <span>{item.emoji}</span>
            {item.text}
          </li>
        ))}
      </ul>

      <CTABlock />
      <p className="mt-4 text-white/40 text-sm">Старт за 2 минуты · Без кредитной карты</p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
      className="mt-16 relative w-full max-w-5xl aspect-video rounded-[2.5rem] p-4 overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(157,80,187,0.3)' }}
    >
      <div className="w-full h-full bg-neutral-900 rounded-[2rem] flex items-center justify-center relative group overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none p-8 font-mono text-xs overflow-hidden leading-relaxed">
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
          <p className="text-white/50 text-sm font-medium">Предпросмотр среды вайбкодинга</p>
        </div>
      </div>
    </motion.div>
  </section>
);

const ForWhomSection = () => (
  <section id="for-whom" className="py-24 px-6 max-w-6xl mx-auto">
    <div className="flex flex-col items-center mb-16 text-center">
      <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
        Для <span className="text-neon-blue">кого это</span>
      </h2>
      <p className="text-white/70 max-w-xl">Узнай себя — и пойми, что ты получишь</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {AUDIENCE.map((item, index) => (
        <motion.div
          key={item.role}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="glass rounded-3xl p-8 flex flex-col gap-5 hover:border-white/20 transition-all group"
        >
          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
            {item.icon}
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">{item.description}</div>
            <h3 className="font-display font-bold text-2xl mb-3">{item.role}</h3>
            <p className="text-white/70 leading-relaxed">{item.benefit}</p>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="mt-12 flex justify-center">
      <CTABlock />
    </div>
  </section>
);

const ResultsSection = () => (
  <section className="py-24 px-6 max-w-6xl mx-auto">
    <div className="flex flex-col items-center mb-16 text-center">
      <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
        Что ты <span className="text-neon-cyan">получишь</span>
      </h2>
      <p className="text-white/70 max-w-xl">Конкретные результаты, которые ты создашь за время курса</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {RESULTS.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="glass rounded-3xl p-6 flex flex-col gap-4 hover:border-white/20 transition-all group text-center items-center"
        >
          <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
            {item.icon}
          </div>
          <h3 className="font-bold text-xl">{item.title}</h3>
          <p className="text-white/70 text-sm leading-relaxed">{item.description}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

const FeaturesSection = () => (
  <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
    <div className="flex flex-col items-center mb-16 text-center">
      <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
        Почему этот <span className="text-neon-cyan">подход работает</span>
      </h2>
      <p className="text-white/70 max-w-xl">
        Вайбкодинг — не магия. Это конкретная методология: ты управляешь результатом, ИИ пишет код.
      </p>
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
            <p className="text-white/70 leading-relaxed">{feature.description}</p>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="mt-12 flex justify-center">
      <CTABlock />
    </div>
  </section>
);

const CurriculumSection = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="curriculum" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
          Программа <span className="text-neon-purple">обучения</span>
        </h2>
        <p className="text-white/70 max-w-xl">
          7 модулей — 7 реальных результатов. От первого промпта до готового продукта.
        </p>
      </div>

      <div className="space-y-3">
        {CURRICULUM.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="glass rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => setExpanded(expanded === item.id ? null : item.id)}
              className="w-full p-6 md:p-8 flex items-center gap-6 hover:bg-white/5 transition-all text-left"
            >
              <div className="text-3xl font-display font-bold text-white/20 shrink-0 w-10">
                {item.id.toString().padStart(2, '0')}
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold">{item.title}</h3>
              </div>
              <ArrowRight
                className={`w-5 h-5 text-white/40 shrink-0 transition-transform ${expanded === item.id ? 'rotate-90' : ''}`}
              />
            </button>

            <AnimatePresence>
              {expanded === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 md:px-8 pb-6 md:pb-8 flex flex-col md:flex-row gap-6 border-t border-white/5">
                    <div className="flex-1 pt-5">
                      <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Что изучишь</p>
                      <ul className="space-y-2">
                        {item.learns.map((learn) => (
                          <li key={learn} className="flex items-start gap-2 text-white/80 text-sm">
                            <Check className="w-4 h-4 text-neon-blue shrink-0 mt-0.5" />
                            {learn}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:w-64 pt-5 md:border-l md:border-white/5 md:pl-6">
                      <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Результат</p>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-neon-cyan shrink-0 mt-0.5" />
                        <p className="text-white/90 text-sm leading-relaxed font-medium">{item.result}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div
        className="mt-16 p-8 glass rounded-3xl flex flex-col md:flex-row items-center gap-8 justify-between"
        style={{ borderColor: 'rgba(0,242,254,0.2)' }}
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-neon-cyan/20 flex items-center justify-center shrink-0">
            <Layers className="w-8 h-8 text-neon-cyan" />
          </div>
          <div>
            <h4 className="text-xl font-bold">Готов начать?</h4>
            <p className="text-white/60">7 модулей · Поддержка · Результат</p>
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

const TestimonialsSection = () => (
  <section className="py-24 px-6 max-w-6xl mx-auto">
    <div className="flex flex-col items-center mb-16 text-center">
      <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
        Что говорят <span className="text-neon-purple">ученики</span>
      </h2>
      <p className="text-white/70 max-w-xl">Реальные результаты реальных людей</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {TESTIMONIALS.map((t, index) => (
        <motion.div
          key={t.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="glass rounded-3xl p-8 flex flex-col gap-5"
        >
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-neon-cyan text-neon-cyan" />
            ))}
          </div>
          <p className="text-white/80 leading-relaxed text-sm flex-1">"{t.text}"</p>
          <div className="flex items-center justify-between border-t border-white/5 pt-4">
            <div>
              <div className="font-bold text-sm">{t.name}</div>
              <div className="text-white/40 text-xs">{t.role}</div>
            </div>
            <div className="px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-xs font-bold">
              {t.result}
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="mt-12 flex justify-center">
      <CTABlock />
    </div>
  </section>
);

const PricingSection = () => (
  <section className="py-24 px-6 max-w-3xl mx-auto">
    <div className="flex flex-col items-center mb-16 text-center">
      <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
        Начни <span className="text-neon-blue">прямо сейчас</span>
      </h2>
      <p className="text-white/70 max-w-xl">Один раз — навыки на всю жизнь</p>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-3xl p-8 md:p-12 flex flex-col gap-8"
      style={{ borderColor: 'rgba(110,122,255,0.4)' }}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-neon-blue mb-2">Полный курс</div>
          <h3 className="font-display font-bold text-3xl">Вайбкодинг: Твори с ИИ</h3>
        </div>
        <div className="text-right">
          <div className="text-4xl font-display font-bold">9 900 ₽</div>
          <div className="text-white/40 text-sm line-through">19 900 ₽</div>
        </div>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          '7 модулей с реальными проектами',
          'Поддержка куратора',
          'Доступ к закрытому чату',
          'Все обновления курса',
          'Сертификат об окончании',
          'Пожизненный доступ к материалам',
        ].map((item) => (
          <li key={item} className="flex items-center gap-3 text-white/80 text-sm">
            <Check className="w-4 h-4 text-neon-cyan shrink-0" />
            {item}
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-3">
        <button className="w-full py-5 rounded-2xl bg-white text-black font-extrabold text-xl hover:scale-[1.02] active:scale-[0.98] transition-all glow-blue flex items-center justify-center gap-2">
          Начать обучение
          <ArrowRight className="w-6 h-6" />
        </button>
        <p className="text-center text-white/40 text-sm">Старт за 2 минуты · Без скрытых платежей</p>
      </div>

      <div className="border-t border-white/5 pt-4">
        <p className="text-center text-white/50 text-sm">
          Есть вопросы? Напиши нам в{' '}
          <a href="https://t.me/vibecoding" target="_blank" rel="noreferrer" className="text-neon-cyan hover:underline">
            Telegram
          </a>
        </p>
      </div>
    </motion.div>
  </section>
);

const Footer = () => (
  <footer className="py-20 px-6 border-t border-white/5 bg-neutral-950/50">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-neon-purple to-neon-blue rounded-xl flex items-center justify-center">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <span className="font-display font-bold text-2xl tracking-tight">Вайбкодинг</span>
        </div>
        <p className="text-white/60 max-w-sm">
          Обучаем людей создавать будущее своими руками. Стань частью нового поколения разработчиков.
        </p>
        <div className="text-white/30 text-sm">© 2026 Вайбкодинг. Все права защищены.</div>
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

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="font-sans pb-20 md:pb-0">
      <Navbar />
      <HeroSection />
      <ForWhomSection />
      <ResultsSection />
      <FeaturesSection />
      <CurriculumSection />
      <TestimonialsSection />
      <PricingSection />
      <Footer />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hidden md:flex fixed bottom-8 right-8 w-12 h-12 glass rounded-full items-center justify-center hover:bg-white/10 transition-colors z-40"
          >
            <ArrowRight className="w-6 h-6 -rotate-90" />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}
