from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List
import random
import logging

app = FastAPI()

# Logging setup
logging.basicConfig(level=logging.INFO)

# Allow frontend to access the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input schema
class UserInput(BaseModel):
    age: int = Field(..., gt=10, lt=100)
    cycle_length: int = Field(..., gt=10, lt=50)
    symptoms: List[str]
    stress_level: str
    sleep_hours: float = Field(..., ge=0.0, le=24.0)
    activity_level: str

# Output schema
class PredictionOutput(BaseModel):
    risk_score: float
    condition_predicted: str
    recommendation: str

@app.post("/predict", response_model=PredictionOutput)
def predict(data: UserInput):
    logging.info(f"Received input: {data}")
    possible_conditions = ["PCOS", "Hypothyroidism", "PMDD", "Perimenopause"]
    recommendations = {
        "PCOS": "See an endocrinologist. Focus on sleep and insulin balance.",
        "Hypothyroidism": "Request thyroid tests. Watch for fatigue.",
        "PMDD": "Track moods. Consider hormonal support.",
        "Perimenopause": "Monitor cycle changes. Support hormone balance."
    }
    condition = random.choice(possible_conditions)
    return {
        "risk_score": round(random.uniform(0.7, 0.95), 2),
        "condition_predicted": condition,
        "recommendation": recommendations[condition]
    }
