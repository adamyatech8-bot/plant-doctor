import { useState, useRef, useEffect } from "react";
import axios from "axios";

function AIChatModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "हेलो! मैं आपका AI बॉट हूँ। अपने पौधों की ग्रोथ या किसी बीमारी के बारे में मुझसे कुछ भी पूछें। 🌿", isBot: true },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // ऑटो स्क्रॉल टू बॉटम
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { text: userMessage, isBot: false }]);
    setInput("");
    setLoading(true);

    try {
      // 🌟 बाद में इस यूआरएल को अपने बैकएंड एंडपॉइंट से बदलें
    const res = await axios.post(
  "https://plant-doctor-k8wa.onrender.com/api/plants/chat",
  {
    message: userMessage,
  }
);
      setMessages((prev) => [...prev, { text: res.data.reply, isBot: true }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { text: "सॉरी, कनेक्शन में कुछ दिक्कत आ रही है। कृपया बाद में प्रयास करें।", isBot: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* 🤖 Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-2xl shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:scale-110 transition-all duration-300 border border-emerald-400/20 animate-bounce"
        >
          💬
        </button>
      )}

      {/* 💻 Chat Window Panel */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[500px] bg-[#061e1b]/95 backdrop-blur-xl border border-emerald-500/20 rounded-[2rem] shadow-[0_25px_60px_-15px_rgba(2,15,13,0.9)] flex flex-col overflow-hidden transition-all duration-300">
          
          {/* Header */}
          <div className="p-4 bg-[#031513] border-b border-emerald-500/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold">
                🤖
              </div>
              <div>
                <h4 className="text-sm font-bold text-white tracking-wide">Botanist AI Assistant</h4>
                <p className="text-[10px] text-emerald-400/80 animate-pulse">Online | Ready to Help</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white text-lg font-bold p-1 transition"
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                    msg.isBot
                      ? "bg-[#031513] border border-emerald-500/10 text-slate-200 rounded-tl-none"
                      : "bg-emerald-500 text-black font-medium rounded-tr-none shadow-[0_0_15px_rgba(52,211,153,0.1)]"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Loading Spinner */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#031513] border border-emerald-500/10 text-emerald-400 px-4 py-2 rounded-2xl text-xs flex items-center gap-2">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce [animation-delay:0.2s]">●</span>
                  <span className="animate-bounce [animation-delay:0.4s]">●</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Form Box */}
          <form onSubmit={handleSendMessage} className="p-4 bg-[#031513]/50 border-t border-emerald-500/10 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about watering, sunlight, soil..."
              className="flex-1 bg-[#031513] border border-emerald-500/20 rounded-xl px-4 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 transition-all"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 text-black text-xs font-bold rounded-xl hover:bg-emerald-400 transition shadow-[0_0_15px_rgba(52,211,153,0.2)]"
            >
              Send
            </button>
          </form>

        </div>
      )}
    </div>
  );
}

export default AIChatModal;