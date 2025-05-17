import pandas as pd
import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

# Load the dataset
df = pd.read_csv("framingham.csv")

# Replace NaN values with 0 instead of dropping them
df = df.fillna(0)

# Define features and target variable
X = df.drop(columns=["TenYearCHD"])  # Independent variables
y = df["TenYearCHD"]  # Dependent variable (heart disease risk)

# Load existing scaler
scaler = joblib.load("model/scaler.pkl")
X_scaled = scaler.transform(X)  # Use the existing scaler

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Train the Random Forest Model
rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
rf_model.fit(X_train, y_train)

# Save the model
joblib.dump(rf_model, "model/random_forest_model.pkl")

# Save feature names for later visualization
feature_names = X.columns.tolist()
joblib.dump(feature_names, "model/feature_names.pkl")

print("✅ Random Forest Model trained & saved using existing scaler!")
