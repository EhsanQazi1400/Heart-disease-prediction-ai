import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Predict from "./Predict"; // Logistic Regression Page
import DecisionTreePredict from "./DecisionTreePredict"; // Decision Tree Page
import RandomForestPredict from "./RandomForestPredict"; // Random Forest Page
import { motion } from "framer-motion";
import "./styles.css"; // Import Styling
import SVMModel from "./SVMModel";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/decision-tree" element={<DecisionTreePredict />} />
        <Route path="/random-forest" element={<RandomForestPredict />} />
        <Route path="/svm-predict" element={<SVMModel />} />
      </Routes>
    </Router>
  );
}

// 🎯 **Home Page with Parallax Scrolling and Model Selection**
function Home() {
  const navigate = useNavigate();
  const models = [
    { name: "Logistic Regression", desc: "Predict heart disease risk using statistical relationships.", path: "/predict" },
    { name: "Decision Tree", desc: "Tree-based decision-making for risk prediction.", path: "/decision-tree" },
    { name: "Random Forest", desc: "Find out what factors have most contribution.", path: "/random-forest" },
    { name: "SVM", desc: "Support Vector Machines for classification.", path: "/svm-predict" },
    { name: "KNN", desc: "K-Nearest Neighbors for pattern matching.", path: "#" },
    { name: "Naive Bayes", desc: "Probabilistic model for prediction.", path: "#" },
    { name: "XGBoost", desc: "Extreme Gradient Boosting for efficiency.", path: "#" },
    { name: "LightGBM", desc: "Fast and scalable gradient boosting model.", path: "#" },
    { name: "Neural Network", desc: "Deep learning-based prediction.", path: "#" },
    { name: "Deep Learning", desc: "Multi-layered learning for complex patterns.", path: "#" },
    { name: "LSTM", desc: "Long Short-Term Memory for time series analysis.", path: "#" },
    { name: "GRU", desc: "Gated Recurrent Units for sequential learning.", path: "#" },
    { name: "Transformer Model", desc: "Advanced AI for pattern recognition.", path: "#" },
    { name: "AutoML", desc: "Automated Machine Learning for best results.", path: "#" }
  ];

  return (
    <div className="home-container">
      <h1 className="title">Heart Disease Model Predictor</h1>
      <div className="model-carousel">
        {models.map((model, index) => (
          <motion.div
            key={index}
            className={`model-card ${model.path !== "#" ? "active-card" : ""}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <h2>{model.name}</h2>
            <p>{model.desc}</p>
            <motion.button
              onClick={() => model.path !== "#" && navigate(model.path)}
              className={model.path !== "#" ? "active-btn" : "disabled-btn"}
              disabled={model.path === "#"}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {model.path !== "#" ? "Try This Model" : "Coming Soon"}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
