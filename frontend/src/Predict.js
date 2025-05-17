import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function Predict() {
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
    model_type: "logistic_regression",
  });

  const [result, setResult] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({ ...formData, [name]: type === "number" ? Number(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/predict", formData);
      setResult(response.data);
    } catch (error) {
      console.error("Error making prediction:", error);
      setResult({ error: "Prediction failed. Check backend connection." });
    }
  };

  return (
    <div className="flex flex-row justify-between items-start w-full max-w-7xl mx-auto">
    <motion.div
      className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-6xl w-full flex space-x-8"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left Side: Questions */}
      <div className="w-1/2">
        <h2 className="text-3xl font-bold text-center text-blue-400 mb-6">Heart Disease Prediction</h2>
  
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
                <label className={`px-4 py-2 rounded-full cursor-pointer ${formData[name] === "1" ? "bg-blue-500 text-white" : "bg-gray-600 text-gray-300"}`}>
                  <input type="radio" name={name} value="1" checked={formData[name] === "1"} onChange={handleChange} className="hidden" />
                  Yes
                </label>
                <label className={`px-4 py-2 rounded-full cursor-pointer ${formData[name] === "0" ? "bg-blue-500 text-white" : "bg-gray-600 text-gray-300"}`}>
                  <input type="radio" name={name} value="0" checked={formData[name] === "0"} onChange={handleChange} className="hidden" />
                  No
                </label>
              </div>
            </div>
          ))}
  
          {/* Cigarettes Per Day */}
          <div>
            <label className="block text-sm">How many cigarettes do you smoke per day? (0 if non-smoker)</label>
            <input type="number" name="cigsPerDay" min="0" max="50" value={formData.cigsPerDay} onChange={handleChange} className="w-full p-2 rounded-md bg-gray-700 border border-gray-600" />
          </div>
  
          {/* Blood Pressure Sliders */}
          <div>
            <label className="block text-sm">Systolic Blood Pressure: {formData.sysBP} mmHg (Normal: 90-120)</label>
            <input type="range" name="sysBP" min="90" max="180" value={formData.sysBP} onChange={handleChange} className="w-full" />
          </div>
  
          <div>
            <label className="block text-sm">Diastolic Blood Pressure: {formData.diaBP} mmHg (Normal: 60-80)</label>
            <input type="range" name="diaBP" min="60" max="120" value={formData.diaBP} onChange={handleChange} className="w-full" />
          </div>
  
          {/* Additional Health Sliders */}
          <div>
            <label className="block text-sm">Body Mass Index (BMI): {formData.BMI} (Normal: 18.5 - 24.9)</label>
            <input type="range" name="BMI" min="15" max="40" value={formData.BMI} onChange={handleChange} className="w-full" />
          </div>
  
          <div>
            <label className="block text-sm">Heart Rate: {formData.heartRate} bpm (Normal: 60-100)</label>
            <input type="range" name="heartRate" min="40" max="150" value={formData.heartRate} onChange={handleChange} className="w-full" />
          </div>
  
          <div>
            <label className="block text-sm">Glucose Level: {formData.glucose} mg/dL (Normal: 70-140)</label>
            <input type="range" name="glucose" min="50" max="300" value={formData.glucose} onChange={handleChange} className="w-full" />
          </div>
  
          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Predict
          </motion.button>
        </form>
      </div>
  
      {/* Right Side: Prediction Box */}
     <div className="w-1/3 flex justify-center items-start">
    {result && (
      <motion.div
        className={`p-6 rounded-lg shadow-lg transition-all duration-500 text-white border-2 ${
          result.prediction === 1 ? "border-red-500 bg-red-500/10" : "border-green-500 bg-green-500/10"
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-xl font-bold">Prediction Result</h3>
        <p className="mt-2"><strong>Probability:</strong> {Math.round(result.probability * 100)}%</p>
        <p className="mt-2"><strong>Diagnosis:</strong> {result.prediction === 1 ? "Likely Heart Disease" : "No Heart Disease"}</p>
      </motion.div>
    )}
  </div>
    </motion.div>
  </div>
  );
}

export default Predict;
