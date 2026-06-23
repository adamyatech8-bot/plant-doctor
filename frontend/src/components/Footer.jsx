import { Link } from "react-router-dom";

function Footer() {
  // 🌟 स्मूथ स्क्रॉलिंग के लिए हेल्पर फ़ंक्शन
  const handleScrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#020b0a] text-slate-400 border-t border-emerald-500/10 font-sans relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-emerald-500/5">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-base shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                🌿
              </div>
              <h2 className="text-base font-black tracking-wider text-white uppercase">
                AI Plant Doctor
              </h2>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-light">
              Your advanced virtual botanist. Empowering plant parents with instant AI-driven health diagnostics, treatment suggestions, and fast growth optimization.
            </p>
          </div>

          {/* Quick Links Column (🌟 Fully Working Navigation) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="#" 
                  onClick={(e) => handleScrollToSection(e, "top")}
                  className="hover:text-emerald-400 transition duration-200"
                >
                  Home / Top
                </a>
              </li>
              <li>
                <a 
                  href="#symptoms" 
                  onClick={(e) => handleScrollToSection(e, "symptoms")}
                  className="hover:text-emerald-400 transition duration-200"
                >
                  Symptoms Guide
                </a>
              </li>
              <li>
                <a 
                  href="#history" 
                  onClick={(e) => handleScrollToSection(e, "history")}
                  className="hover:text-emerald-400 transition duration-200"
                >
                  Scan History
                </a>
              </li>
              <li>
                <span className="cursor-not-allowed opacity-40 text-[11px]">System Status: Online</span>
              </li>
            </ul>
          </div>

          {/* 🌟 New Shortcut / Instant Action Column (Hiding the Newsletter Input) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Need Instant Expert Help?
            </h4>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              अगर आपका पौधा बीमार है, तो बिना देर किए सीधे ऊपर डैशबोर्ड पर जाकर इमेज अपलोड करें या रीयल-टाइम सुझावों के लिए हमारे असिस्टेंस पैनल का उपयोग करें।
            </p>
            
            <div className="flex flex-wrap gap-2 pt-1">
              <button 
                onClick={(e) => handleScrollToSection(e, "top")}
                className="px-4 py-2 bg-[#041715] border border-emerald-500/20 text-emerald-400 font-medium text-xs rounded-xl hover:border-emerald-400 transition-all duration-300"
              >
                📸 Scan Plant Now
              </button>
              
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  alert("AI Chat Support integration coming up next!");
                }}
                className="px-4 py-2 bg-emerald-500 text-black font-semibold text-xs rounded-xl hover:bg-emerald-400 transition-all duration-300 shadow-[0_0_15px_rgba(52,211,153,0.2)] flex items-center gap-1"
              >
                💬 Open AI Chat
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-light">
          <p>© 2026 AI Plant Doctor Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 cursor-pointer transition">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer transition">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer transition">Support Helpdesk</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;