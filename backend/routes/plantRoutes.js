const express = require("express");
const multer = require("multer");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { detectPlantDisease } = require("../controllers/plantController");

const router = express.Router();

// Gemini AI कॉन्फ़िगरेशन
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
  },
});

const upload = multer({ storage });

// 📸 स्कैन रूट
router.post("/scan", upload.single("image"), detectPlantDisease);

// 🤖 AI चैट रूट
// 🤖 AI चैट रूट
router.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "कृपया अपना मैसेज भेजें।" });
  }

  try {
    // 🌟 यहाँ केवल "gemini-2.5-flash" रखें और दूसरा ऑब्जेक्ट (apiVersion वाला) पूरी तरह हटा दें
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // AI को बॉटनिस्ट की तरह बिहेव कराने के लिए प्रॉम्प्ट गाइडेंस
    const systemPrompt = "You are an expert AI Botanist and Plant Doctor. Answer the user's query precisely, keeping the language simple, clean, and highly actionable. Keep answers short and focused on watering, sunlight, soil, or prevention. Query: ";

    const result = await model.generateContent(systemPrompt + message);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ reply: "सॉरी, मैं अभी आपके अनुरोध को प्रोसेस नहीं कर पा रहा हूँ।" });
  }
});

module.exports = router;