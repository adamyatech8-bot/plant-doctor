import { useState } from "react";

// 🌟 डेटा को और अधिक सटीक और डिटेल्ड किया गया है ताकि यूज़र को सही गाइड मिले
const problems = [
  {
    title: "Yellow Leaves",
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800",
    symptom: "Leaves turning yellow",
    solution: "Reduce watering and improve drainage.",
    details: {
      watering: "मिट्टी की ऊपरी 2 इंच परत पूरी तरह सूखने पर ही पानी दें। गमले के नीचे ड्रेनेज होल खुला रखें ताकि पानी रुके नहीं। हफ्ते में 1-2 बार से ज्यादा पानी न दें।",
      sunlight: "पौधे को ऐसी जगह रखें जहाँ ब्राइट इनडायरेक्ट (अप्रत्यक्ष) धूप मिले। सीधी तेज धूप से बचें।",
      prevention: "गमले की मिट्टी में कोकोपीट मिलाएं ताकि एयर सर्कुलेशन अच्छा रहे और जड़ें न सड़ें।"
    }
  },
  {
    title: "Brown Spots",
    image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=800",
    symptom: "Brown or black spots on leaves",
    solution: "Apply fungicide and remove infected leaves.",
    details: {
      watering: "पानी हमेशा सीधे मिट्टी में दें, पत्तियों पर ऊपर से पानी छिड़कने से बचें। नमी की वजह से फंगस तेजी से फैलती है।",
      sunlight: "संक्रमित पौधे को कम से कम 3-4 घंटे की सुबह की हल्की धूप दिखाएं ताकि नमी सूखे।",
      prevention: "संक्रमित पत्तियों को तुरंत काटकर अलग करें। नीम ऑयल या ऑर्गेनिक फंगिसाइड का स्प्रे हर 10 दिन में करें।"
    }
  },
  {
    title: "Pest Attack",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800",
    symptom: "Small insects on plant",
    solution: "Use neem oil spray every 7 days.",
    details: {
      watering: "नॉर्मल शेडयूल रखें, लेकिन स्प्रे करते समय ध्यान रखें कि मिट्टी दलदली न हो।",
      sunlight: "कीटों के हमले के दौरान पौधे को अच्छी हवादार और सेमी-शेड (हल्की धूप) वाली जगह पर रखें।",
      prevention: "5ml नीम ऑयल को 1 लीटर गुनगुने पानी और लिक्विड सोप के साथ मिलाकर हर 7 दिन में शाम के समय पत्तियों के नीचे स्प्रे करें।"
    }
  },
  {
    title: "Overwatering",
    image: "https://images.unsplash.com/photo-1483794344563-d27a8d18014e?w=800",
    symptom: "Drooping yellow leaves",
    solution: "Allow soil to dry before watering again.",
    details: {
      watering: "अगले 5-7 दिनों के लिए पानी देना पूरी तरह बंद कर दें। जब तक मिट्टी पूरी तरह सूखी न लगे, पानी न छुएं।",
      sunlight: "पौधे को तुरंत किसी अच्छी धूप या ब्राइट लाइट वाली जगह पर शिफ्ट करें ताकि मिट्टी जल्दी सूखे।",
      prevention: "मिट्टी में परलाइट या रेत मिलाएं ताकि एक्स्ट्रा पानी तुरंत नीचे से बह जाए।"
    }
  },
  {
    title: "Slow Growth",
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800",
    symptom: "Plant not growing properly",
    solution: "Use balanced fertilizer and more sunlight.",
    details: {
      watering: "मिट्टी को हल्का नम रखें, लेकिन पानी का भराव न होने दें। गर्मियों में 2 दिन में एक बार और सर्दियों में हफ्ते में एक बार पानी दें।",
      sunlight: "इस पौधे को रोजाना 4-6 घंटे की सीधी या अच्छी छनकर आने वाली धूप की सख्त जरूरत है।",
      prevention: "ग्रोथ पीरियड (जैसे स्प्रिंग या मॉनसून) में हर 25-30 दिन में वर्मीकंपोस्ट या बैलेंस्ड NPK लिक्विड फर्टिलाइजर दें।"
    }
  },
  {
    title: "Wilting Leaves",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800",
    symptom: "Leaves hanging down",
    solution: "Check water level and root condition.",
    details: {
      watering: "अगर मिट्टी सूखी है, तो तुरंत भरपूर पानी दें (Deep Watering)। अगर मिट्टी गीली है फिर भी पत्तियां लटकी हैं, तो यह रूट रॉट (जड़ सड़ना) हो सकता है।",
      sunlight: "जब तक पौधा रिकवर न हो जाए, इसे तेज जलती धूप से हटाकर ठंडी और छांव वाली जगह पर रखें।",
      prevention: "समय-समय पर मिट्टी की गुड़ाई करते रहें ताकि जड़ों तक ऑक्सीजन पहुंचती रहे।"
    }
  }
];

function ProblemCards() {
  // 🌟 एक्टिव कार्ड को ट्रैक करने के लिए स्टेट (null मतलब कोई कार्ड ओपन नहीं है)
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null); // दोबारा क्लिक करने पर बंद हो जाएगा
    } else {
      setExpandedIndex(index); // क्लिक करने पर खुलेगा
    }
  };

  return (
    <section id="symptoms" className="py-24 bg-[#020e0d] text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-[40%] left-[-10%] w-80 h-80 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-5%] w-96 h-96 bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Heading Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block px-4 py-1.5 bg-emerald-950/60 border border-emerald-500/20 text-emerald-400 rounded-full text-xs uppercase tracking-widest font-bold backdrop-blur-sm shadow-sm">
            🌿 Plant Symptoms Guide
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase">
            What's Wrong With <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Your Plant?
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto font-light leading-relaxed">
            Select the symptom that matches your plant and get instant treatment suggestions.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center items-start">

          {problems.map((item, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <div
                key={index}
                onClick={() => toggleExpand(index)}
                className="
                  w-full
                  max-w-sm
                  bg-[#061e1b]/40
                  backdrop-blur-md
                  rounded-[2rem]
                  overflow-hidden
                  border
                  border-emerald-500/10
                  shadow-[0_15px_35px_-10px_rgba(2,14,13,0.6)]
                  hover:shadow-[0_20px_40px_-5px_rgba(16,185,129,0.1)]
                  hover:border-emerald-500/25
                  transition-all
                  duration-300
                  cursor-pointer
                  group
                  flex flex-col
                "
              >
                {/* Image Component */}
                <div className="relative h-56 w-full overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061e1b] via-transparent to-transparent opacity-80"></div>
                </div>

                {/* Content Box */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold tracking-wide text-white group-hover:text-emerald-400 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-400 font-light">
                      {item.symptom}
                    </p>
                  </div>

                  {/* Glassmorphic Solution Panel */}
                  <div className="bg-[#031513]/80 border border-emerald-500/10 rounded-2xl p-4 space-y-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <span>💡</span> Quick Solution
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      {item.solution}
                    </p>
                  </div>

                  {/* 🌟 Dynamic Expanded Details Panel (Smooth Animation Layout) */}
                  <div 
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      isExpanded ? "max-h-[350px] opacity-100 mt-2 pt-4 border-t border-emerald-500/10" : "max-h-0 opacity-0"
                    }`}
                    onClick={(e) => e.stopPropagation()} // अंदर क्लिक करने पर कार्ड बंद न हो
                  >
                    <div className="space-y-3 text-left">
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">💧 Watering Schedule</span>
                        <p className="text-[11px] text-slate-300 font-light leading-relaxed">{item.details.watering}</p>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">☀️ Sunlight & Position</span>
                        <p className="text-[11px] text-slate-300 font-light leading-relaxed">{item.details.sunlight}</p>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">🛡️ Long-term Prevention</span>
                        <p className="text-[11px] text-slate-300 font-light leading-relaxed">{item.details.prevention}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // पैरेंट onClick को ट्रिगर होने से रोकने के लिए
                      toggleExpand(index);
                    }}
                    className={`
                      w-full
                      py-2.5
                      rounded-xl
                      border
                      font-semibold
                      text-sm
                      tracking-wide
                      transition-all
                      duration-300
                      mt-2
                      ${isExpanded 
                        ? "bg-emerald-500 text-black border-emerald-500 hover:bg-emerald-600" 
                        : "bg-transparent border-emerald-500/30 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black group-hover:border-emerald-500"
                      }
                    `}
                  >
                    {isExpanded ? "Hide Details" : "View Details"}
                  </button>

                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default ProblemCards;