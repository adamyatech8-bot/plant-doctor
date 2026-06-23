import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PLANT_DATA } from "../data/plantsData";

function LibraryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // पेज लोड होते ही सबसे ऊपर स्क्रॉल करने के लिए
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredPlants = PLANT_DATA.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plant.scientific.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-24 bg-[#020e0d] min-h-screen selection:bg-emerald-500 selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Top Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 uppercase tracking-widest border border-emerald-500/20 bg-[#061e1b]/40 px-4 py-2 rounded-xl transition duration-300"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-black tracking-wide text-white uppercase leading-tight">
            Botanical <span className="text-emerald-400">Library</span>
          </h1>
          <p className="text-slate-400 text-sm mt-3 tracking-wide leading-relaxed">
            35+ सामान्य भारतीय पौधों, फलों और फूलों की विस्तृत डायरेक्टरी। यहाँ उनकी सामान्य बीमारियाँ और उनके 100% प्राकृतिक ऑर्गेनिक समाधान उपलब्ध हैं।
          </p>

          {/* 🔍 Dynamic Live Search Bar */}
          <div className="mt-8 relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-400/60 text-lg">
              🔍
            </div>
            <input
              type="text"
              placeholder="Search plants (e.g., Rose, आम, Tomato)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#031513] border border-emerald-500/20 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 shadow-[0_0_25px_rgba(16,185,129,0.05)] transition-all"
            />
          </div>
        </div>

        {/* 🎴 Responsive Cards Grid */}
        {filteredPlants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlants.map((plant) => (
              <div
                key={plant.id}
                className="bg-[#061e1b]/60 border border-emerald-500/10 rounded-[2rem] overflow-hidden group hover:border-emerald-500/30 shadow-[0_15px_40px_-15px_rgba(2,15,13,0.8)] transition-all duration-300 flex flex-col"
              >
                {/* Fixed Working Image Box */}
                <div className="h-52 w-full overflow-hidden relative bg-[#031513]">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      // अगर कोई इमेज फेल होती है तो बैकअप लीफ इमेज लोड हो जाएगी
                      e.target.src = "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?auto=format&fit=crop&w=600&q=80";
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-[#031513]/90 backdrop-blur-md border border-emerald-500/20 px-3 py-1 rounded-full text-[10px] tracking-wider text-emerald-400 font-medium">
                    {plant.care}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-wide group-hover:text-emerald-400 transition duration-300">
                      {plant.name}
                    </h3>
                    <p className="text-xs text-emerald-500/60 italic font-mono mt-0.5">
                      {plant.scientific}
                    </p>

                    <div className="mt-4 pt-4 border-t border-emerald-500/5">
                      <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                        ⚠️ सामान्य समस्या:
                      </h4>
                      <p className="text-xs text-slate-300 font-medium mt-1">
                        {plant.problem}
                      </p>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        🌿 प्राकृतिक समाधान:
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed mt-1">
                        {plant.solution}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">🍂</div>
            <p className="text-slate-500 text-sm">इस नाम का कोई पौधा हमारी लाइब्रेरी में नहीं मिला।</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default LibraryPage;