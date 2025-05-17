import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
import os

# Load dataset
df = pd.read_csv("framingham.csv")

# Drop NaN values
df.dropna(inplace=True)

# Features & Target
X = df.drop("TenYearCHD", axis=1)  # Features
y = df["TenYearCHD"]  # Target variable

# Load existing scaler from Logistic Regression model
scaler = joblib.load("model/scaler.pkl")  # Reusing existing scaler

# Scale data
X_scaled = scaler.transform(X)

# Split data
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Train Decision Tree Model
dt_model = DecisionTreeClassifier(max_depth=5, random_state=42)
dt_model.fit(X_train, y_train)

# Save Decision Tree Model
joblib.dump(dt_model, "model/decision_tree_model.pkl")

print("✅ Decision Tree Model Trained & Saved! (Reused existing scaler)")
