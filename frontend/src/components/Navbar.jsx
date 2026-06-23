import { Link } from "react-router-dom";

function Navbar() {
  // 🌟 स्मूथ स्क्रॉलिंग के लिए हेल्पर फ़ंक्शन
  const handleScrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 🤖 AI Chat बॉक्स को ओपन करने के लिए फंक्शन
  const handleOpenAIChat = (e) => {
    e.preventDefault();
    // कस्टम इवेंट डिस्पैच कर रहे हैं जिसे AIChatModal सुनेगा
    const event = new CustomEvent("open-ai-chat");
    window.dispatchEvent(event);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#031513]/60 backdrop-blur-md border-b border-emerald-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">

          {/* Logo Section */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-lg shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:scale-105 transition duration-300">
              🌿
            </div>

            <div>
              <h1 className="text-lg font-black tracking-wider text-white uppercase leading-none">
                AI Plant Doctor
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-emerald-400/70 font-medium mt-1">
                Virtual Expert
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-slate-300 hover:text-emerald-400 font-medium text-sm tracking-wide transition duration-300"
            >
              Home
            </a>
            <a
              href="#symptoms"
              onClick={(e) => handleScrollToSection(e, "symptoms")}
              className="text-slate-300 hover:text-emerald-400 font-medium text-sm tracking-wide transition duration-300"
            >
              Symptoms Guide
            </a>
            <a
              href="#history"
              onClick={(e) => handleScrollToSection(e, "history")}
              className="text-slate-300 hover:text-emerald-400 font-medium text-sm tracking-wide transition duration-300"
            >
              Scan History
            </a>

            <Link
              to="/library"
              className="text-slate-300 hover:text-emerald-400 font-medium text-sm tracking-wide transition duration-300"
            >
              Plant Library
            </Link>

            {/* 🤖 Now Working: AI Chat 지원 Link */}
            <a
              href="#ai-chat"
              onClick={handleOpenAIChat} // 👈 पुराना अलर्ट हटाकर फंक्शन ट्रिगर किया
              className="text-emerald-400 hover:text-emerald-300 font-bold text-sm tracking-wide transition duration-300 flex items-center gap-1.5"
            >
              <span className="animate-pulse w-2 h-2 rounded-full bg-emerald-400"></span>
              AI Chat
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">

            <button className="hidden md:block text-slate-300 hover:text-white font-medium text-sm transition duration-300">
              Sign In
            </button>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="
                hidden md:flex
                items-center
                px-5
                py-2.5
                rounded-xl
                bg-transparent
                border
                border-emerald-500/40
                text-emerald-400
                hover:bg-emerald-500/10
                hover:border-emerald-400
                font-medium
                text-sm
                tracking-wide
                shadow-[0_0_15px_rgba(52,211,153,0.1)]
                transition-all
                duration-300
              "
            >
              Get Started
            </button>

            {/* Mobile Menu Icon */}
            <button className="md:hidden w-10 h-10 rounded-xl border border-emerald-500/20 bg-[#061e1b]/60 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/10 transition duration-300">
              ☰
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}

export default Navbar;