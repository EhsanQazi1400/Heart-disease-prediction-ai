from fastapi import FastAPI
import joblib
import numpy as np
from pydantic import BaseModel

logistic_model = joblib.load("model/logistic_regression_model.pkl")
decision_tree_model = joblib.load("model/decision_tree_model.pkl")
random_forest_model = joblib.load("model/random_forest_model.pkl")
svm_model = joblib.load("model/svm_model.pkl")  # Make sure this has probability=True
scaler = joblib.load("model/scaler.pkl")
feature_names = joblib.load("model/feature_names.pkl")

# Initialize FastAPI app
app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PatientData(BaseModel):
    male: int
    age: int
    education: int
    currentSmoker: int
    cigsPerDay: float
    BPMeds: float
    prevalentStroke: int
    prevalentHyp: int
    diabetes: int
    totChol: float
    sysBP: float
    diaBP: float
    BMI: float
    heartRate: float
    glucose: float
    model_type: str  # Model type selection (svm, logistic_regression, etc.)

# FastAPI: Adjusting threshold to return higher meaningful probability
@app.post("/predict")
def predict_heart_disease(data: PatientData):
    input_data = np.array([[ 
        data.male, data.age, data.education, data.currentSmoker, data.cigsPerDay,
        data.BPMeds, data.prevalentStroke, data.prevalentHyp, data.diabetes,
        data.totChol, data.sysBP, data.diaBP, data.BMI, data.heartRate, data.glucose
    ]])

    # Scale input data
    input_data_scaled = scaler.transform(input_data)

    # Select model based on user input
    if data.model_type == "logistic_regression":
        model = logistic_model
    elif data.model_type == "decision_tree":
        model = decision_tree_model
    elif data.model_type == "random_forest":
        model = random_forest_model
    elif data.model_type == "svm":
        model = svm_model
    else:
        return {"error": "Invalid model type. Choose 'logistic_regression', 'decision_tree', 'random_forest', or 'svm'."}

    # Make prediction and probability
    prediction = model.predict(input_data_scaled)[0]
    probability = model.predict_proba(input_data_scaled)[0][1]

    # Adjust threshold for meaningful results (for example, probability > 0.3 means positive)
    if probability < 0.3:
        diagnosis = "No Heart Disease"
    else:
        diagnosis = "Likely Heart Disease"

    # Return results with adjusted threshold
    return {
        "model": data.model_type,
        "prediction": int(prediction),
        "probability": float(probability),
        "diagnosis": diagnosis
    }
