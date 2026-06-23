const fs = require("fs");
const axios = require("axios");
const Scan = require("../models/Scan");

const detectPlantDisease = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload image",
      });
    }

    const imageBuffer = fs.readFileSync(req.file.path);
    const base64Image = imageBuffer.toString("base64");

    const plantResponse = await axios.post(
      "https://plant.id/api/v3/identification",
      { images: [base64Image] },
      {
        headers: {
          "Api-Key": process.env.PLANT_ID_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const plantSuggestion =
      plantResponse.data?.result?.classification?.suggestions?.[0];

    const plantName = plantSuggestion?.name || "Unknown Plant";

    const response = await axios.post(
      "https://plant.id/api/v3/health_assessment",
      { images: [base64Image] },
      {
        headers: {
          "Api-Key": process.env.PLANT_ID_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const isHealthy = response.data.result.is_healthy.binary;

    const healthConfidence = Math.round(
      response.data.result.is_healthy.probability * 100
    );

    const disease =
      response.data.result.disease.suggestions?.[0];

    const diseaseName = disease?.name || "No Disease Found";

    const diseaseDatabase = {
      Botrytis: {
        treatment:
          "Remove infected leaves and flowers. Apply fungicide and improve ventilation.",
        watering:
          "Avoid overhead watering. Water directly at soil level.",
        fertilizer: "Balanced NPK fertilizer.",
        prevention:
          "Reduce humidity and improve air circulation.",
      },

      Erysiphaceae: {
        treatment:
          "Apply sulfur fungicide and remove infected leaves.",
        watering:
          "Avoid overwatering and keep leaves dry.",
        fertilizer: "Balanced NPK fertilizer.",
        prevention:
          "Keep proper spacing between plants.",
      },
    };

    const diseaseConfidence = disease
      ? Math.round(disease.probability * 100)
      : 0;

    const diseaseData = diseaseDatabase[diseaseName];

    let treatment =
      diseaseData?.treatment || "Consult agricultural expert";

    let watering =
      diseaseData?.watering || "Regular watering";

    let fertilizer =
      diseaseData?.fertilizer || "Organic Compost";

    let prevention =
      diseaseData?.prevention || "Maintain proper plant care";

    // optional override
    if (diseaseName === "Erysiphaceae") {
      treatment =
        "Apply fungicide and improve air circulation";
      watering =
        "Avoid overwatering and keep leaves dry";
      fertilizer =
        "Balanced NPK fertilizer";
    }

    const scan = await Scan.create({
      image: req.file.filename,
      plantName,
      disease: diseaseName,
      confidence: diseaseConfidence,
      treatment,
      watering,
      fertilizer,
      prevention, // ✅ IMPORTANT FIX
      isHealthy,
      healthConfidence,
    });

    return res.status(200).json({
      success: true,
     imageUrl: `https://plant-doctor-k8wa.onrender.com/uploads/${req.file.filename}`,
      plantName: scan.plantName,
      disease: scan.disease,
      confidence: scan.confidence,
      treatment: scan.treatment,
      watering: scan.watering,
      fertilizer: scan.fertilizer,
      prevention: scan.prevention, // now works
      isHealthy: scan.isHealthy,
      healthConfidence: scan.healthConfidence,
    });
  } catch (error) {
    console.log(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "Plant.id API Error",
    });
  }
};

module.exports = {
  detectPlantDisease,
};