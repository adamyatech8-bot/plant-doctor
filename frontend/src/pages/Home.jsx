
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProblemCards from "./ProblemCards";

import Navbar from "../components/Navbar";
import UploadCard from "../components/UploadCard";
import Footer from "../components/Footer";
import Aboutsection from "./AboutSection";
import ScanHistory from "../components/ScanHistory"; 
import AIChatModal from "../components/AIChatModal";


function Home() {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleScan = async () => {
    if (!image) {
      alert("Please Select Image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

try {
  const res = await axios.post(
    "https://plant-doctor-k8wa.onrender.com/api/plants/scan",
    formData
  );

      // 🌟 LocalStorage में स्कैन डेटा को हिस्ट्री के लिए सेव करने का लॉजिक
      const newScanLog = {
        id: Date.now(), // यूनिक आईडी डिलीट करने के लिए
        date: new Date().toLocaleDateString(), // आज की तारीख
        plantName: res.data.plantName,
        disease: res.data.disease,
        isHealthy: res.data.isHealthy,
        confidence: res.data.confidence || res.data.healthConfidence || 100,
        treatment: res.data.treatment,
        watering: res.data.watering,
        fertilizer: res.data.fertilizer,
        prevention: res.data?.prevention || "Not available",
        imageUrl: res.data.imageUrl || "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=100" // डमी या अपलोडेड इमेज यूआरएल
      };

      const currentHistory = JSON.parse(localStorage.getItem("scanHistory")) || [];
      localStorage.setItem("scanHistory", JSON.stringify([newScanLog, ...currentHistory]));

      // पुराना ओरिजिनल नेविगेशन फ्लो
      navigate("/result", {
        state: res.data,
      });
    } catch (error) {
      console.log(error);
      alert("Scan Failed");
    }
  };

  return (
    <>
      {/* Premium dark-teal background matching the mockups exactly */}
      <div className="min-h-screen bg-[#031513] text-white font-sans relative overflow-hidden antialiased selection:bg-emerald-500 selection:text-black">
        
        {/* Neon Cyber-Glow Rings for depth */}
        <div className="absolute top-[10%] right-[-15%] w-[700px] h-[700px] rounded-full border border-emerald-500/10 pointer-events-none animate-[spin_180s_linear_infinite] hidden xl:block"></div>
        <div className="absolute top-[15%] right-[-10%] w-[550px] h-[550px] rounded-full border border-cyan-500/15 pointer-events-none animate-[spin_120s_linear_infinite_reverse] hidden xl:block"></div>
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none"></div>

        <Navbar />

        {/* Main Content Wrap with optimized padding */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-12 md:pt-24 pb-24 relative z-10">
          
          {/* Hero Section Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Heading and Text Layout */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8 text-left">
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] uppercase">
                  Welcome To <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 drop-shadow-[0_2px_20px_rgba(52,211,153,0.3)]">
                    Your AI Plant Doctor
                  </span>
                </h1>
              </div>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-light">
                Access instant plant diagnosis and tailored care plans from any device. 
                Our virtual expert is ready to detect issues and help your greens grow faster.
              </p>

              {/* Status Feature Badges: Cleaned up alignment and spacing */}
              <div className="flex flex-wrap gap-3 pt-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/20 text-xs text-emerald-300 backdrop-blur-sm shadow-sm">
                  <span className="text-emerald-400">✓</span> Instant Scanning
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/20 text-xs text-emerald-300 backdrop-blur-sm shadow-sm">
                  <span className="text-emerald-400">✓</span> Accurate Diagnosis
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/20 text-xs text-emerald-300 backdrop-blur-sm shadow-sm">
                  <span className="text-emerald-400">✓</span> Fast Treatment Plans
                </div>
              </div>
            </div>

            {/* Right Column: Premium High-Definition Glassmorphic Upload Component */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-md bg-[#09221f]/50 border border-emerald-500/20 rounded-[2rem] p-6 md:p-8 shadow-[0_25px_60px_-15px_rgba(2,15,13,0.9)] backdrop-blur-xl relative transition-all duration-300 hover:border-emerald-400/30">
                {/* Visual Glow overlay background */}
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent rounded-[2rem] pointer-events-none"></div>
                
                <div className="relative z-10">
                  <UploadCard
                    image={image}
                    setImage={setImage}
                    handleScan={handleScan}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Row Dashboard Content: Properly styled with grids and clear separation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-28">
            
            {/* Box 1: Recently Diagnosed */}
            <div className="p-6 bg-[#061e1b]/40 backdrop-blur-md border border-emerald-500/10 rounded-2xl flex flex-col justify-between group hover:border-emerald-500/20 transition-all duration-300">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-4">
                  Recently Diagnosed
                </h4>
                <div className="flex gap-3">
                  <div className="w-12 h-12 bg-[#041614] rounded-xl border border-emerald-500/10 flex items-center justify-center text-xl transition-all duration-300 group-hover:scale-105">🌿</div>
                  <div className="w-12 h-12 bg-[#041614] rounded-xl border border-emerald-500/10 flex items-center justify-center text-xl transition-all duration-300 group-hover:scale-105">🌵</div>
                  <div className="w-12 h-12 bg-[#041614] rounded-xl border border-emerald-500/10 flex items-center justify-center text-xl transition-all duration-300 group-hover:scale-105">🍂</div>
                </div>
              </div>
              <span className="text-[11px] text-slate-500 mt-4 block">Updated real-time</span>
            </div>

            {/* Box 2: Plant Care Library */}
            <div className="p-6 bg-[#061e1b]/40 backdrop-blur-md border border-emerald-500/10 rounded-2xl flex flex-col justify-between hover:border-emerald-500/20 transition-all duration-300">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-3">
                  Plant Care Library
                </h4>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search plant database..." 
                    disabled
                    className="w-full bg-[#031513] border border-emerald-500/20 rounded-xl px-4 py-2.5 text-sm text-slate-400 placeholder:text-slate-600 focus:outline-none cursor-not-allowed"
                  />
                  <span className="absolute right-3 top-3 text-xs opacity-30">🔍</span>
                </div>
              </div>
              <span className="text-[11px] text-slate-500 mt-4 block">Explore over 10,000+ species</span>
            </div>

            {/* Box 3: Getting Started Guide */}
            <div className="p-6 bg-[#061e1b]/40 backdrop-blur-md border border-emerald-500/10 rounded-2xl flex flex-col justify-between hover:border-emerald-500/20 transition-all duration-300">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-4">
                  Getting Started Guide
                </h4>
                <div className="text-xs text-slate-300 space-y-2 font-light">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-[10px]">1</span>
                    <span>Upload or snap a plant image</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-[10px]">2</span>
                    <span>Let AI run diagnostic checks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-[10px]">3</span>
                    <span>Receive curated treatment guides</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      <div className="bg-[#020e0d] border-t border-emerald-500/5">
        <ProblemCards />
        
        
        <ScanHistory />
     

        <Aboutsection />
        <Footer />
      </div>
      <AIChatModal />
    </>
  );
}

export default Home;