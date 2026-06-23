function AboutSection() {
  const stats = [
    { value: "98.4%", label: "AI Scan Accuracy" },
    { value: "10k+", label: "Plant Species Tracked" },
    { value: "24/7", label: "Instant Digital Care" },
  ];

  return (
    <section id="about" className="py-24 bg-[#031513] text-white relative overflow-hidden">
      {/* Background Neon Spotlights */}
      <div className="absolute top-[20%] left-[-5%] w-72 h-72 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* About Info & Analytics Split Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Grid */}
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-block px-4 py-1.5 bg-emerald-950/60 border border-emerald-500/20 text-emerald-400 rounded-full text-xs uppercase tracking-widest font-bold backdrop-blur-sm">
              🛡️ Intelligent Botanical Care
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-[1.1]">
              Engineered To Save <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Your Green Assets
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-xl">
              AI Plant Doctor सिर्फ एक स्कैनर नहीं है; यह एक संपूर्ण प्लांट केयर इकोसिस्टम है। हमारा डीप लर्निंग एल्गोरिथ्म पत्तियों के पैटर्न, फंगस और कीड़ों के हमलों का विश्लेषण करता है ताकि आपको सटीक समाधान मिल सके। हम आपके पौधों को केवल जीवित नहीं रखते, बल्कि उन्हें तेज़ी से बड़ा होने में मदद करते हैं।
            </p>
          </div>

          {/* Right Metrics Display Card */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-6 bg-[#061e1b]/30 border border-emerald-500/10 p-8 rounded-[2rem] backdrop-blur-md shadow-2xl">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center sm:text-left space-y-1 p-2">
                <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 tracking-tight">
                  {stat.value}
                </h3>
                <p className="text-[11px] uppercase tracking-wider text-emerald-400/80 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Feature Highlights Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
          
          <div className="p-6 bg-[#041715]/60 border border-emerald-500/10 rounded-2xl space-y-3 hover:border-emerald-500/20 transition-all duration-300">
            <span className="text-xl">🔍</span>
            <h3 className="text-base font-bold tracking-wide">Pathology Detection</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              तस्वीर अपलोड करते ही हमारा AI तुरंत फंगस, कीट हमले (Pest Attacks), और न्यूट्रिशन की कमी को पकड़ लेता है।
            </p>
          </div>

          <div className="p-6 bg-[#041715]/60 border border-emerald-500/10 rounded-2xl space-y-3 hover:border-emerald-500/20 transition-all duration-300">
            <span className="text-xl">⚡ Fast Growth Matrix</span>
            <h3 className="text-base font-bold tracking-wide">Growth Acceleration</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              सिर्फ़ बीमारी ठीक मत करिए। अपने पौधे की वेराइटी के हिसाब से कस्टमाइज्ड फर्टिलाइजर गाइड पाकर उसकी ग्रोथ को डबल कीजिए।
            </p>
          </div>

          <div className="p-6 bg-[#041715]/60 border border-emerald-500/10 rounded-2xl space-y-3 hover:border-emerald-500/20 transition-all duration-300">
            <span className="text-xl">💧 Smart Hydration</span>
            <h3 className="text-base font-bold tracking-wide">Watering Automation</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Overwatering और Underwatering की समस्या खत्म। मौसम के हिसाब से सटीक पानी देने की गाइडलाइन्स प्राप्त करें।
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default AboutSection;