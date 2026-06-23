import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";

function ScanHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedLogs = JSON.parse(localStorage.getItem("scanHistory")) || [];
    setHistory(savedLogs);
  }, []);

  const handleRemoveLog = (id) => {
    const updatedLogs = history.filter((log) => log.id !== id);
    setHistory(updatedLogs);
    localStorage.setItem("scanHistory", JSON.stringify(updatedLogs));
  };

  // 🌟 इमेज को Base64 में कन्वर्ट करने का हेल्पर फ़ंक्शन ताकि jsPDF उसे लोड कर सके
  const convertImageToBase64 = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/jpeg"));
      };
      img.onerror = () => {
        resolve(null); // अगर इमेज लोड न हो तो बिना इमेज के पीडीएफ बन जाए, क्रैश न हो
      };
    });
  };

  // 📄 अपग्रेडेड PDF जेनरेटर फ़ंक्शन (इमेज और एक्स्ट्रा केयर मैट्रिक्स के साथ)
  const handleExportPDF = async (item) => {
    const doc = new jsPDF();
    
    // 1. Header Block & Branding
    doc.setFillColor(3, 21, 19); // Deep Teal Banner Background
    doc.rect(0, 0, 210, 40, "F");
    
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(16, 185, 129); // Neon Emerald
    doc.text("AI PLANT DOCTOR", 14, 26);
    
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184);
    doc.setFont("Helvetica", "normal");
    doc.text(`HEALTH DIAGNOSIS REPORT  |  LOG_ID: #${item.id.toString().slice(-6)}`, 14, 34);
    doc.text(`Generated: ${item.date}`, 150, 34);

    // 2. Image Integration (अगर उपलब्ध हो)
    let yPos = 55;
    if (item.imageUrl) {
      const base64Img = await convertImageToBase64(item.imageUrl);
      if (base64Img) {
        // (image_data, format, x, y, width, height)
        doc.addImage(base64Img, "JPEG", 14, yPos, 45, 45);
        
        // अगर इमेज आ रही है, तो टेक्स्ट की शुरुआत उसके बाजू (X: 68) से करेंगे
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(30, 41, 59);
        doc.text(item.plantName, 68, yPos + 6);
        
        doc.setFontSize(11);
        doc.setTextColor(100, 116, 139);
        doc.text(`Condition: ${item.isHealthy ? "Healthy / Stable" : "Infected / Action Required"}`, 68, yPos + 14);
        doc.text(`AI Confidence Match: ${item.confidence || 100}%`, 68, yPos + 22);
        doc.text(`Primary Issue: ${item.disease}`, 68, yPos + 30);
        
        yPos += 55; // वर्टिकल पोजीशन को नीचे खिसकाएं
      }
    } else {
      // बिना इमेज का पुराना टेक्स्ट फ़ॉलकैक (X: 14)
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(30, 41, 59);
      doc.text(item.plantName, 14, yPos);
      yPos += 15;
    }

    // 3. Separate Sections with Card Framework
    const addSectionBlock = (title, content, x, y, width) => {
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(4, 120, 87); // Green Section Title
      doc.text(title, x, y);
      
      doc.setLineWidth(0.2);
      doc.setDrawColor(209, 213, 219);
      doc.line(x, y + 2, x + width, y + 2);
      
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(51, 65, 85);
      
      const splitLines = doc.splitTextToSize(content || "No custom criteria provided.", width);
      doc.text(splitLines, x, y + 8);
      
      return y + 12 + (splitLines.length * 4); // डायनेमिक हाइट कैलकुलेशन
    };

    // 4. Adding Enhanced Care Related Details Dynamically
    yPos = addSectionBlock("1. Prescribed Treatment & Action Plan", item.treatment, 14, yPos, 182);
    yPos = addSectionBlock("2. Smart Hydration & Watering Matrix", item.watering, 14, yPos + 4, 182);
    yPos = addSectionBlock("3. Soil Nutrition & Fertilizer Optimization", item.fertilizer || "Apply balanced organic NPK fertilizer to rebuild cellular defense protocols.", 14, yPos + 4, 182);
    yPos = addSectionBlock("4. Long-term Prevention & Quarantine Guide", item.prevention || "Quarantine infected samples instantly. Ensure zero canopy moisture exposure overnight.", 14, yPos + 4, 182);

    // 5. Footer Disclaimer Notice
    doc.setLineWidth(0.3);
    doc.setDrawColor(16, 185, 129);
    doc.line(14, 275, 196, 275);
    
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text("Disclaimer: This AI diagnosis report is generated using neural-network pattern recognition. Cross-verify with a botanist if needed.", 14, 281);

    const fileName = `${item.plantName.replace(/\s+/g, "_")}_Advanced_Report.pdf`;
    doc.save(fileName);
  };

  return (
    <section id="history" className="py-20 bg-[#031513] text-white border-t border-emerald-500/5 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        <div className="mb-12">
          <span className="inline-block px-3 py-1 bg-emerald-950/60 border border-emerald-500/20 text-emerald-400 rounded-full text-xs uppercase tracking-widest font-bold mb-3">
            📋 Local Cache Logs
          </span>
          <h2 className="text-3xl font-black uppercase tracking-tight">
            Diagnosis <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">History Tracker</span>
          </h2>
        </div>

        {history.length === 0 ? (
          <div className="p-12 text-center bg-[#061e1b]/20 border border-emerald-500/10 rounded-[2rem] max-w-md">
            <p className="text-xs text-slate-400 font-light">No records found. Scanned plants will dynamically log here inside your browser storage.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((log) => (
              <div 
                key={log.id} 
                className="bg-[#061e1b]/40 backdrop-blur-md border border-emerald-500/10 rounded-2xl p-5 flex flex-col justify-between hover:border-emerald-500/20 transition-all duration-300"
              >
                <div className="flex gap-4">
                  <img 
                    src={log.imageUrl} 
                    alt={log.plantName}
                    className="w-14 h-14 rounded-xl object-cover border border-emerald-500/10"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=100"; }}
                  />
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <h4 className="text-sm font-bold tracking-wide text-white truncate">{log.plantName}</h4>
                    <p className="text-[11px] text-slate-400 truncate">Diagnosis: {log.disease}</p>
                    <span className={`inline-block text-[9px] px-1.5 py-0.5 rounded font-medium mt-1 ${log.isHealthy ? "bg-emerald-950/80 text-emerald-400" : "bg-red-950/80 text-red-400"}`}>
                      {log.isHealthy ? "Healthy" : "Infected"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-emerald-500/5">
                  <span className="text-[10px] text-slate-500">{log.date}</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleExportPDF(log)}
                      className="px-3 py-1.5 bg-[#041715] border border-emerald-500/20 hover:border-emerald-400 text-emerald-400 rounded-lg text-xs font-semibold transition"
                    >
                      📄 Save PDF
                    </button>
                    <button 
                      onClick={() => handleRemoveLog(log.id)}
                      className="px-2.5 py-1.5 bg-red-950/10 border border-red-900/20 text-red-400/80 hover:text-red-400 hover:bg-red-950/30 rounded-lg text-xs transition"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default ScanHistory;