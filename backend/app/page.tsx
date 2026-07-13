'use client';

import { useState } from 'react';

export default function Dashboard() {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // OUR CUSTOM, UNBREAKABLE SUBMIT FUNCTION
  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput(''); // Clear input box instantly
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Talk directly to our API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'ai', content: data.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'ai', content: 'Connection Error to AI Server.' }]);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-white font-sans">
      <header className="bg-slate-900 p-6 border-b border-slate-800 shadow-md">
        <h1 className="text-3xl font-bold text-blue-400">🛡️ MedGuard Command Center</h1>
        <p className="text-slate-400 mt-1">Drug Inspector AI Dashboard & Neo4j Monitor</p>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="text-center text-slate-500 mt-20">
            <p className="text-xl">Welcome, Inspector.</p>
            <p>Ask me about the current state of the pharmaceutical supply chain.</p>
            <p className="mt-4 text-sm text-slate-600">Try asking: "What is the status of Batch B123?"</p>
          </div>
        ) : (
          messages.map((m, index) => (
            <div key={index} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-2xl p-4 rounded-xl ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-200 border border-slate-700'}`}>
                <p className="font-bold mb-1 text-sm opacity-50">
                  {m.role === 'user' ? '🧑‍💼 Inspector' : '🤖 MedGuard AI'}
                </p>
                <div className="whitespace-pre-wrap leading-relaxed">{m.content}</div>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="text-slate-500 italic">MedGuard AI is analyzing Neo4j graph...</div>
        )}
      </main>

      <footer className="p-6 bg-slate-900 border-t border-slate-800">
        <form onSubmit={sendMessage} className="flex max-w-4xl mx-auto gap-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about batch status..."
            className="flex-1 bg-slate-800 text-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-700"
          />
          <button 
            type="submit" 
            disabled={isLoading || !input}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-lg transition-colors disabled:opacity-50"
          >
            Send Request
          </button>
        </form>
      </footer>
    </div>
  );
}