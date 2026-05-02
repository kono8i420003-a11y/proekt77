import { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Bot, Send } from 'lucide-react';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY ?? '' });

export default function AIAssistant() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const result = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: input,
      });
      setResponse(result.text ?? '');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass rounded-3xl p-8 max-w-2xl mx-auto flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Bot className="w-6 h-6 text-neon-cyan" />
        <h3 className="font-display font-bold text-xl">AI-ассистент</h3>
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) ask(); }}
        placeholder="Задай вопрос... (Ctrl+Enter для отправки)"
        className="bg-white/5 rounded-2xl p-4 text-white placeholder-white/30 resize-none outline-none border border-white/10 focus:border-neon-cyan/50 transition-colors"
        rows={3}
      />
      <button
        onClick={ask}
        disabled={loading || !input.trim()}
        className="self-end flex items-center gap-2 px-6 py-3 rounded-xl bg-neon-blue text-white font-bold hover:bg-neon-blue/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <Send className="w-4 h-4" />
        {loading ? 'Думаю...' : 'Спросить'}
      </button>
      {response && (
        <p className="text-white/70 leading-relaxed border-t border-white/10 pt-4 whitespace-pre-wrap">
          {response}
        </p>
      )}
    </div>
  );
}
