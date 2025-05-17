import joblib

# Load the models using joblib
decision_tree_model = joblib.load('C:/Users/Qazi Ehsan/Downloads/heart-disease-app/heart-disease-app/heart-disease-backend/model/decision_tree_model.pkl')
logistic_regression_model = joblib.load('C:/Users/Qazi Ehsan/Downloads/heart-disease-app/heart-disease-app/heart-disease-backend/model/logistic_regression_model.pkl')
random_forest_model = joblib.load('C:/Users/Qazi Ehsan/Downloads/heart-disease-app/heart-disease-app/heart-disease-backend/model/random_forest_model.pkl')
scaler = joblib.load('C:/Users/Qazi Ehsan/Downloads/heart-disease-app/heart-disease-app/heart-disease-backend/model/scaler.pkl')

# Load the Support Vector Machine model
svm_model = joblib.load('C:/Users/Qazi Ehsan/Downloads/heart-disease-app/heart-disease-app/heart-disease-backend/model/svm_model.pkl')

print("Models and scaler loaded successfully!")
