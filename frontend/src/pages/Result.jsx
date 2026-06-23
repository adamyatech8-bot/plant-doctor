import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  if (!data) {
    return (
      <div className="min-h-screen bg-[#031513] flex items-center justify-center text-white font-sans">
        <div className="text-center space-y-4">
          <span className="text-4xl">⚠️</span>
          <h1 className="text-2xl font-black uppercase tracking-wider text-slate-300">
            No Result Found
          </h1>
          <button 
            onClick={() => navigate("/")}
            className="text-xs uppercase tracking-widest text-emerald-400 underline hover:text-emerald-300 transition"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#031513] text-white font-sans relative overflow-hidden antialiased py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Visual Ambient Glow Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Back Navigation Bar Wrapper */}
      <div className="max-w-6xl mx-auto mb-8">
        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-2 px-5 py-2.5 bg-[#061e1b]/40 border border-emerald-500/10 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:border-emerald-500/30 transition-all duration-300 backdrop-blur"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span> 
          Back to Dashboard
        </button>
      </div>

      {/* Main Glassmorphic Layout Panel */}
      <div className="max-w-6xl mx-auto bg-[#061e1b]/30 border border-emerald-500/10 rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(2,15,13,0.8)] overflow-hidden backdrop-blur-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left Column: Image Section with Gradient Veil Mask */}
          <div className="lg:col-span-5 bg-[#041715]/40 border-b lg:border-b-0 lg:border-r border-emerald-500/10 p-8 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-t from-[#041715] via-transparent to-transparent opacity-60 pointer-events-none"></div>
            <img
              src={data.imageUrl}
              alt="Scanned Plant Panel"
              className="w-full max-w-sm rounded-[2rem] border border-emerald-500/20 shadow-[0_0_40px_rgba(4,23,21,0.8)] object-cover aspect-square lg:aspect-auto lg:h-[450px]"
            />
          </div>

          {/* Right Column: Information Analysis Segment */}
          <div className="lg:col-span-7 p-8 md:p-12 space-y-8">
            
            {/* Header Content Section */}
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 bg-emerald-950/60 border border-emerald-500/20 text-emerald-400 rounded-full text-xs uppercase tracking-widest font-bold">
                🌿 Analysis Report
              </span>
              <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                {data.plantName}
              </h1>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-light">
                AI-Generated Diagnosis Dashboard
              </p>
            </div>

            {/* Diagnostics Dynamic Banner State */}
            <div
              className={`p-5 rounded-2xl border backdrop-blur-sm shadow-inner transition-all duration-300 ${
                data.isHealthy
                  ? "bg-emerald-950/20 border-emerald-500/20 text-emerald-300"
                  : "bg-red-950/20 border-red-500/20 text-red-300"
              }`}
            >
              <h2 className="text-lg font-bold uppercase tracking-wide flex items-center gap-2">
                {data.isHealthy ? "✅ Status: Stable" : "⚠️ Status: Critical Condition"}
              </h2>
              <p className="mt-1 text-sm opacity-80 font-light">
                Identified Pathology: <span className="font-semibold underline decoration-dotted">{data.disease}</span>
              </p>
            </div>

            {/* Confidence Metrics Metrics Grid Layout */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#031513]/60 border border-emerald-500/5 rounded-2xl p-4 sm:p-5">
                <p className="text-[11px] uppercase tracking-widest text-slate-400 font-medium mb-1">
                  Health Confidence
                </p>
                <h3 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                  {data.healthConfidence}%
                </h3>
              </div>

              <div className="bg-[#031513]/60 border border-emerald-500/5 rounded-2xl p-4 sm:p-5">
                <p className="text-[11px] uppercase tracking-widest text-slate-400 font-medium mb-1">
                  Disease Accuracy
                </p>
                <h3 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  {data.confidence}%
                </h3>
              </div>
            </div>

            {/* Actionable Treatment Subsections */}
            <div className="space-y-4">
              
              {/* Box 1: Treatment */}
              <div className="bg-[#041715]/80 border border-emerald-500/10 p-5 rounded-2xl group hover:border-emerald-500/20 transition-all duration-300">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
                  💊 Prescribed Treatment
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  {data.treatment}
                </p>
              </div>

              {/* Box 2: Watering Guide */}
              <div className="bg-[#041715]/80 border border-cyan-500/10 p-5 rounded-2xl group hover:border-cyan-500/20 transition-all duration-300">
                <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
                  💧 Hydration Guide
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  {data.watering}
                </p>
              </div>

              {/* Box 3: Fertilizer Recommendation */}
              <div className="bg-[#041715]/80 border border-yellow-500/10 p-5 rounded-2xl group hover:border-yellow-500/20 transition-all duration-300">
                <h3 className="text-xs font-bold uppercase tracking-wider text-yellow-400 mb-2 flex items-center gap-1.5">
                  🌱 Soil & Nutrients
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  {data.fertilizer}
                </p>
              </div>

              {/* Box 4: Prevention Tips */}
              <div className="bg-[#041715]/80 border border-purple-500/10 p-5 rounded-2xl group hover:border-purple-500/20 transition-all duration-300">
                <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-2 flex items-center gap-1.5">
                  🛡️ Long-term Prevention
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  {data?.prevention || "Not available"}
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;