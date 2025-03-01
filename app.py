from flask import Flask, render_template, request, jsonify
import os
import pickle
import numpy as np
from generateTrajectory import generate_trajectory 

app = Flask(__name__)

# Load XGBoost model
model_path = os.path.join("models", "xgboost.pkl")
with open(model_path, "rb") as model_file:
    model = pickle.load(model_file)

def log_risk_to_percentage(log_risk):
    return (10 ** log_risk) * 100

def extract_features(satellite1, satellite2):
    # Placeholder: Replace with actual feature extraction logic
    features = {
        "time_to_tca": np.random.uniform(1, 100),
        "max_risk_estimate": np.random.uniform(0, 1),
        "max_risk_scaling": np.random.uniform(0, 1),
        "miss_distance": np.random.uniform(100, 1000),
        "relative_speed": np.random.uniform(1, 10),
        "relative_position_r": np.random.uniform(-10, 10),
        "relative_position_t": np.random.uniform(-10, 10),
        "relative_position_n": np.random.uniform(-10, 10),
        "relative_velocity_r": np.random.uniform(-10, 10),
        "relative_velocity_t": np.random.uniform(-10, 10),
        "geocentric_latitude": np.random.uniform(-90, 90),
        "azimuth": np.random.uniform(0, 360),
        "elevation": np.random.uniform(0, 90),
        "F10": 150.0,  # Constant value
        "F3M": 3.5,  # Constant value
    }
    return list(features.values())  # Return as list for model input

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

@app.route("/generate_trajectory", methods=["POST"])
def generate():
    data = request.get_json()
    satellite_name = data.get("satellite")

    if not satellite_name:
        return jsonify({"error": "Satellite name is required"}), 400

    image_path = generate_trajectory(satellite_name)

    if image_path:
        return jsonify({"image": f"/{image_path}"})
    else:
        return jsonify({"error": "Satellite not found"}), 404

@app.route("/predict_risk", methods=["POST"])
def predict_risk():
    data = request.get_json()
    satellite1 = data.get("satellite1")
    satellite2 = data.get("satellite2")

    if not satellite1 or not satellite2:
        return jsonify({"error": "Both satellites must be selected"}), 400

    features = extract_features(satellite1, satellite2)
    log_risk = model.predict([features])[0]  # Predict risk
    risk_percentage = round(log_risk_to_percentage(log_risk),3) # Convert to percentage

    return jsonify({"risk": risk_percentage})  # Send risk percentage

if __name__ == "__main__":
    app.run(debug=True)
