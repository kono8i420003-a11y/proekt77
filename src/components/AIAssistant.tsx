import { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Bot, Send, User, Sparkles } from 'lucide-react';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY ?? '' });

const SYSTEM_PROMPT = `Ты — AI-ассистент курса «Вайбкодинг: Твори с ИИ».
Помогаешь потенциальным студентам разобраться в курсе и вайбкодинге.
Отвечай кратко, по делу, дружелюбно. Только на русском языке.
Курс учит создавать сайты, AI-продукты, Telegram-боты и автоматизации
с помощью ИИ (ChatGPT, Claude) без глубокого программирования за 7 дней.
Модули: основы, сайты, AI-проекты, Lovable AI, боты, монетизация, Claude Code.`;

const SUGGESTIONS = [
  'Для кого подходит курс?',
  'Нужны знания программирования?',
  'Что я смогу делать после курса?',
  'Сколько времени нужно в день?',
];

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const ask = async (question?: string) => {
    const text = (question ?? input).trim();
    if (!text || loading) return;

    const userMsg: Message = { role: 'user', text };
    const history = [...messages, userMsg];

    setMessages([...history, { role: 'assistant', text: '' }]);
    setInput('');
    setLoading(true);

    try {
      const contents = history.map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      }));

      const stream = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents,
        config: { systemInstruction: SYSTEM_PROMPT },
      });

      for await (const chunk of stream) {
        const delta = chunk.text ?? '';
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: 'assistant',
            text: updated[updated.length - 1].text + delta,
          };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          text: 'Произошла ошибка. Попробуй ещё раз.',
        };
        return updated;
      });
    } finally {
      setLoading(false);
      textareaRef.current?.focus();
    }
  };

  return (
    <div
      className="glass rounded-3xl overflow-hidden flex flex-col"
      style={{ height: '520px' }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
        <div className="w-8 h-8 rounded-full bg-neon-cyan/20 flex items-center justify-center">
          <Bot className="w-4 h-4 text-neon-cyan" />
        </div>
        <div>
          <div className="font-bold text-sm">AI-ассистент курса</div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/40 text-xs">онлайн · на базе Gemini</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-5 text-center">
            <div className="w-14 h-14 rounded-full bg-neon-cyan/10 flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-neon-cyan" />
            </div>
            <p className="text-white/60 text-sm">Привет! Задай любой вопрос о курсе</p>
            <div className="flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => ask(s)}
                  className="px-3 py-1.5 rounded-xl glass text-xs text-white/70 hover:text-white hover:bg-white/10 transition-all border border-white/10"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-neon-cyan/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5 text-neon-cyan" />
                </div>
              )}
              <div
                className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-white text-black font-medium rounded-br-sm'
                    : 'bg-white/5 text-white/90 border border-white/10 rounded-bl-sm'
                }`}
              >
                {msg.text ? (
                  msg.text
                ) : loading && i === messages.length - 1 ? (
                  <span className="flex gap-1 items-center py-0.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    />
                  </span>
                ) : null}
              </div>
              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5 text-white/70" />
                </div>
              )}
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 pb-4 pt-3 border-t border-white/10">
        <div className="flex gap-2 items-end">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                ask();
              }
            }}
            placeholder="Напиши вопрос..."
            rows={1}
            className="flex-1 bg-white/5 rounded-2xl px-4 py-3 text-sm text-white placeholder-white/30 resize-none outline-none border border-white/10 focus:border-neon-cyan/50 transition-colors"
            style={{ maxHeight: '80px' }}
          />
          <button
            onClick={() => ask()}
            disabled={loading || !input.trim()}
            className="w-10 h-10 rounded-xl bg-neon-blue flex items-center justify-center hover:bg-neon-blue/80 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
        <p className="text-white/25 text-xs mt-2 text-center">
          Enter — отправить · Shift+Enter — новая строка
        </p>
      </div>
    </div>
  );
}
