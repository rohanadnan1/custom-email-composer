'use client';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MessageCircle, X, Send, ChevronDown } from 'lucide-react';

export default function ChatBot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: string, text: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // Chat animation on open/close
  useEffect(() => {
    if (!chatContainerRef.current) return;

    if (isOpen) {
      gsap.to(chatContainerRef.current, {
        opacity: 1,
        scale: 1,
        pointerEvents: 'auto',
        duration: 0.4,
        ease: 'back.out',
      });
    } else {
      gsap.to(chatContainerRef.current, {
        opacity: 0,
        scale: 0.8,
        pointerEvents: 'none',
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  }, [isOpen]);

  // Scroll to latest message
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      setShowScrollButton(false);
    }
  }, [messages]);

  // Handle scroll detection
  const handleScroll = () => {
    if (!chatBoxRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = chatBoxRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
    setShowScrollButton(!isAtBottom);
  };

  // Scroll to bottom smoothly
  const scrollToBottom = () => {
    if (!chatBoxRef.current) return;
    
    gsap.to(chatBoxRef.current, {
      scrollTop: chatBoxRef.current.scrollHeight,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
    } catch (err) {
      console.error("Chat error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        ref={toggleButtonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 left-8 w-14 h-14 rounded-full btn-primary text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-40 flex items-center justify-center group"
        style={{padding:"0.15rem 1rem"}}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-10 h-10 group-hover:scale-110 transition-transform" />
        )}
      </button>

      {/* Chat Container */}
      <div
        ref={chatContainerRef}
        className="fixed bottom-24 left-8 w-96 bg-card-bg border border-card-border rounded-2xl shadow-2xl flex flex-col h-[500px] opacity-0 scale-75 pointer-events-none z-40"
        style={{ transformOrigin: 'bottom left' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-card-border px-6 py-4 rounded-t-2xl">
          <h3 className="text-lg font-semibold text-foreground">Chat Assistant</h3>
          <p className="text-sm text-muted-foreground">Ask me anything!</p>
        </div>

        {/* Messages Container - Relative for scroll button positioning */}
        <div className="flex-1 relative">
          <div
            ref={chatBoxRef}
            className="absolute inset-0 overflow-y-auto px-6 py-4 space-y-4 scroll-smooth"
            onScroll={handleScroll}
          >
            {messages.length === 0 && !loading && (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p className="text-center text-sm">Start a conversation...</p>
              </div>
            )}
            
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                    m.role === 'user'
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-secondary text-foreground rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-secondary text-foreground px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Scroll Down Button */}
          {showScrollButton && (
            <button
              onClick={scrollToBottom}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary hover:bg-primary/90 text-white rounded-full p-2 shadow-lg transition-all animate-bounce z-10"
              aria-label="Scroll to latest messages"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-card-border px-6 py-4 bg-card-bg rounded-b-2xl">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 bg-secondary border border-card-border rounded-lg px-4 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white p-2 rounded-lg transition-colors flex items-center justify-center"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}