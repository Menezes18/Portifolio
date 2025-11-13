import { useState, useRef, useEffect } from "react";
import { Send, Minimize2, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = { id: number; text: string; isBot: boolean };

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Olá! Sou o assistente virtual do Gustavo. Como posso ajudar?", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  // Auto-scroll para a última mensagem
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Envia mensagem ao backend e registra resposta
  const sendMessage = async (text: string) => {
    // Adiciona mensagem do usuário
    setMessages(prev => [...prev, { id: Date.now(), text, isBot: false }]);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const { reply } = await res.json();
      setMessages(prev => [...prev, { id: Date.now()+1, text: reply, isBot: true }]);
    } catch (e) {
      setMessages(prev => [...prev, { id: Date.now()+1, text: 'Erro no servidor.', isBot: true }]);
    }
  };

  // Submissão do form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput("");
  };

  // Abre/minimiza/fecha
  const toggleChat = () => {
    if (!isOpen) { setIsOpen(true); setIsMinimized(false); }
    else setIsMinimized(prev => !prev);
  };
  const closeChat = () => setIsOpen(false);

  return (
    <>
      {/* Botão flutuante */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary shadow-lg hover:bg-primary/90 z-50"
          aria-label="Abrir chat"
        >
          <div className="w-8 h-8 bg-vr-dark rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-neon-purple rounded-full animate-pulse" />
          </div>
        </button>
      )}

      {/* Janela de chat */}
      {isOpen && (
        <div
          className={cn(
            "fixed bottom-6 right-6 w-80 shadow-lg glass transition-all z-50",
            isMinimized ? "h-16" : "h-96"
          )}
        >
          <header className="bg-vr-dark p-3 flex justify-between border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-neon-purple rounded-full animate-pulse" />
              <h3 className="text-sm font-semibold">VR Assistant</h3>
            </div>
            <div className="flex gap-2">
              <button onClick={toggleChat} aria-label={isMinimized ? "Maximizar" : "Minimizar"}>
                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
              <button onClick={closeChat} aria-label="Fechar">×</button>
            </div>
          </header>

          {!isMinimized && (
            <>
              <div className="p-3 h-[calc(100%-108px)] overflow-y-auto">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={cn(
                      "mb-3 p-2.5 rounded-lg text-sm max-w-[85%]",
                      msg.isBot
                        ? "bg-muted text-foreground mr-auto"
                        : "bg-primary text-primary-foreground ml-auto"
                    )}
                  >
                    {msg.text}
                  </div>
                ))}
                <div ref={endRef} />
              </div>

              <form onSubmit={handleSubmit} className="p-3 border-t border-border flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-muted rounded-md p-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground rounded-md p-2 hover:bg-primary/90"
                  aria-label="Enviar"
                >
                  <Send size={16} />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;