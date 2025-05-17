import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// 🔹 Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function RandomForestPredict() {
  const [formData, setFormData] = useState({
    male: "0",
    age: 50,
    education: 2,
    currentSmoker: "0",
    cigsPerDay: 0,
    BPMeds: "0",
    prevalentStroke: "0",
    prevalentHyp: "0",
    diabetes: "0",
    totChol: 200,
    sysBP: "120",
    diaBP: 80,
    BMI: 25,
    heartRate: 75,
    glucose: 90,
    model_type: "random_forest",
  });

  const [result, setResult] = useState(null);
  const [featureImportance, setFeatureImportance] = useState(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({ ...formData, [name]: type === "number" ? Number(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/predict", formData);
      setResult(response.data);
      setFeatureImportance(response.data.feature_importance);
    } catch (error) {
      console.error("Error making prediction:", error);
      setResult({ error: "Prediction failed. Check backend connection." });
    }
  };

  // 🔹 **Define Feature Labels First**
  const featureLabels = {
    male: "Gender (Male)",
    age: "Age",
    education: "Education Level",
    currentSmoker: "Smoker Status",
    cigsPerDay: "Cigarettes per Day",
    BPMeds: "Blood Pressure Medication",
    prevalentStroke: "Previous Stroke",
    prevalentHyp: "Hypertension",
    diabetes: "Diabetes",
    totChol: "Total Cholesterol",
    sysBP: "Systolic Blood Pressure",
    diaBP: "Diastolic Blood Pressure",
    BMI: "Body Mass Index (BMI)",
    heartRate: "Heart Rate (BPM)",
    glucose: "Glucose Level",
  };

  // 🔹 **Sort Feature Importance After Defining Labels**
  const sortedFeatureImportance = featureImportance
    ? Object.entries(featureImportance)
      .map(([key, value]) => ({
        name: featureLabels[key] || key, // Use user-friendly labels
        importance: value,
      }))
      .sort((a, b) => b.importance - a.importance) // Sort descending
    : [];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white p-8">
      <motion.div
        className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-6xl w-full flex space-x-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Side: Questions */}
        <div className="w-1/2">
          <h2 className="text-3xl font-bold text-center text-yellow-400 mb-6">Random Forest Prediction</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Age Slider */}
            <div>
              <label className="block text-sm">Age: {formData.age} years</label>
              <input type="range" name="age" min="18" max="80" value={formData.age} onChange={handleChange} className="w-full" />
            </div>

            {/* Yes/No Questions with Styled Radio Buttons */}
            {[
              { label: "Are you male?", name: "male" },
              { label: "Do you currently smoke?", name: "currentSmoker" },
              { label: "Are you on blood pressure medication?", name: "BPMeds" },
              { label: "Have you ever had a stroke?", name: "prevalentStroke" },
              { label: "Do you have hypertension?", name: "prevalentHyp" },
              { label: "Do you have diabetes?", name: "diabetes" },
            ].map(({ label, name }) => (
              <div className="flex items-center justify-between p-3 bg-gray-700 rounded-md" key={name}>
                <span>{label}</span>
                <div className="flex space-x-4">
                  <label className={`px-4 py-2 rounded-full cursor-pointer ${formData[name] === "1" ? "bg-yellow-500 text-black" : "bg-gray-600 text-gray-300"}`}>
                    <input type="radio" name={name} value="1" checked={formData[name] === "1"} onChange={handleChange} className="hidden" />
                    Yes
                  </label>
                  <label className={`px-4 py-2 rounded-full cursor-pointer ${formData[name] === "0" ? "bg-yellow-500 text-black" : "bg-gray-600 text-gray-300"}`}>
                    <input type="radio" name={name} value="0" checked={formData[name] === "0"} onChange={handleChange} className="hidden" />
                    No
                  </label>
                </div>
              </div>
            ))}

            {/* Numeric Inputs */}
            {[
              { label: "How many cigarettes do you smoke per day?", name: "cigsPerDay", min: 0, max: 50 },
              { label: "Systolic Blood Pressure (mmHg)", name: "sysBP", min: 90, max: 180 },
              { label: "Diastolic Blood Pressure (mmHg)", name: "diaBP", min: 60, max: 120 },
              { label: "Body Mass Index (BMI)", name: "BMI", min: 15, max: 40 },
              { label: "Heart Rate (BPM)", name: "heartRate", min: 40, max: 150 },
              { label: "Glucose Level (mg/dL)", name: "glucose", min: 50, max: 300 },
            ].map(({ label, name, min, max }) => (
              <div key={name}>
                <label className="block text-sm">{label}: {formData[name]}</label>
                <input type="range" name={name} min={min} max={max} value={formData[name]} onChange={handleChange} className="w-full" />
              </div>
            ))}

            <motion.button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Predict
            </motion.button>
          </form>
        </div>

        {/* Right Side: Prediction & Feature Importance Bar Chart */}
        <div className="w-1/3 flex flex-col items-center">
          {result && (
            <motion.div className="p-6 rounded-lg shadow-lg border-2 text-white">
              <h3 className="text-xl font-bold">Prediction Result</h3>
              <p><strong>Probability:</strong> {Math.round(result.probability * 100)}%</p>
              <p><strong>Diagnosis:</strong> {result.prediction === 1 ? "Likely Heart Disease" : "No Heart Disease"}</p>
            </motion.div>
          )}

          {/* Feature Importance Chart */}
          {featureImportance && <Bar data={{ labels: sortedFeatureImportance.map(d => d.name), datasets: [{ label: "Feature Importance", data: sortedFeatureImportance.map(d => d.importance), backgroundColor: "rgba(255, 215, 0, 0.8)" }] }} />}
        </div>
      </motion.div>
    </div>
  );
}

export default RandomForestPredict;
