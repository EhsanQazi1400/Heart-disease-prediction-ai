import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const navigate = useNavigate();
  const carouselRef = useRef(null); // Reference for the scrollable carousel

  const models = [
    { name: "Logistic Regression", desc: "Predict heart disease risk using statistical relationships.", path: "/predict" },
    { name: "Decision Tree", desc: "Tree-based decision-making for risk prediction.", path: "/decision-tree" },
    { name: "Random Forest", desc: "An ensemble of decision trees for accuracy.", path: "/random-forest" },
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

  // Function to scroll the carousel left
  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -350, behavior: "smooth" });
  };

  // Function to scroll the carousel right
  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 350, behavior: "smooth" });
  };

  return (
    <div className="home-container">
      <h1 className="title">Heart Disease Model Predictor</h1>

      {/* Left Scroll Button */}
      <button className="scroll-btn left" onClick={scrollLeft}>←</button>

      <div className="model-carousel" ref={carouselRef}>
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

      {/* Right Scroll Button */}
      <button className="scroll-btn right" onClick={scrollRight}>→</button>
    </div>
  );
}

export default Home;
