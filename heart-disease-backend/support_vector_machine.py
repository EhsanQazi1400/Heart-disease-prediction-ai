import pandas as pd
import joblib
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score

# Load dataset
df = pd.read_csv("framingham.csv")

df = df.fillna(0)

X = df.drop(columns=["TenYearCHD"])
y = df["TenYearCHD"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

svm_model = SVC(kernel='linear', random_state=42, class_weight='balanced', probability=True)
svm_model.fit(X_train, y_train)

y_pred_default = svm_model.predict(X_test)

print("Accuracy:", accuracy_score(y_test, y_pred_default))
print("Classification Report:\n", classification_report(y_test, y_pred_default))

# Predict probabilities for threshold adjustment
y_probs = svm_model.predict_proba(X_test)[:, 1]

# Apply custom threshold (e.g., 0.3)
threshold = 0.3
y_pred_custom = (y_probs > threshold).astype(int)

# Evaluate with adjusted threshold
print("Accuracy:", accuracy_score(y_test, y_pred_custom))
print("Classification Report:\n", classification_report(y_test, y_pred_custom))

# Save model and features
joblib.dump(svm_model, "model/svm_model.pkl")
joblib.dump(X.columns.tolist(), "model/feature_names.pkl")

print("✅ SVM Model trained & saved")
