from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator
from typing import List, Optional
import logging
from datetime import datetime
import math

app = FastAPI(title="FemBalance API", version="1.0.0")

logging.basicConfig(level=logging.INFO)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Enhanced input schema with better validation
class UserInput(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    age: int = Field(..., gt=10, lt=100)
    height: Optional[float] = Field(None, gt=50, lt=300)
    weight: Optional[float] = Field(None, gt=20, lt=500)
    blood_group: Optional[str] = Field(None, max_length=5)
    cycle_length: int = Field(..., gt=10, lt=50)
    symptoms: List[str]
    stress_level: str = Field(..., pattern="^(low|medium|high)$")
    sleep_hours: float = Field(..., ge=0.0, le=24.0)
    activity_level: str = Field(..., pattern="^(low|medium|high)$")
    
    @field_validator('symptoms')
    def validate_symptoms(cls, v):
        valid_symptoms = {
            'Fatigue', 'Weight gain', 'Irregular periods', 'Acne', 
            'Hair loss', 'Mood swings', 'Low sex drive (libido)', 
            'Hot flashes', 'Sleep disturbance'
        }
        for symptom in v:
            if symptom not in valid_symptoms:
                raise ValueError(f"Invalid symptom: {symptom}")
        return v

class PredictionOutput(BaseModel):
    risk_score: float = Field(..., ge=0.0, le=1.0)
    condition_predicted: str
    recommendation: str
    confidence_level: str
    risk_factors: List[str]
    next_steps: List[str]

# Enhanced AI logic with rule-based scoring
class HormonalPredictor:
    def __init__(self):
        self.conditions = {
            "PCOS": {
                "symptoms": ['Weight gain', 'Irregular periods', 'Acne', 'Hair loss'],
                "age_range": (15, 35),
                "recommendations": [
                    "Consider consulting an endocrinologist for hormone testing",
                    "Focus on insulin-balancing nutrition (low glycemic index foods)",
                    "Regular exercise can help with insulin sensitivity",
                    "Track your menstrual cycle patterns"
                ]
            },
            "Hypothyroidism": {
                "symptoms": ['Fatigue', 'Weight gain', 'Hair loss', 'Sleep disturbance'],
                "age_range": (20, 60),
                "recommendations": [
                    "Request thyroid function tests (TSH, T3, T4)",
                    "Monitor energy levels and body temperature",
                    "Consider selenium and iodine-rich foods",
                    "Prioritize quality sleep and stress management"
                ]
            },
            "PMDD": {
                "symptoms": ['Mood swings', 'Fatigue', 'Sleep disturbance'],
                "age_range": (18, 45),
                "recommendations": [
                    "Track mood changes in relation to your cycle",
                    "Consider magnesium and B6 supplementation",
                    "Practice stress-reduction techniques",
                    "Discuss hormonal support options with your doctor"
                ]
            },
            "Perimenopause": {
                "symptoms": ['Hot flashes', 'Irregular periods', 'Mood swings', 'Sleep disturbance'],
                "age_range": (40, 55),
                "recommendations": [
                    "Monitor cycle changes and symptoms",
                    "Consider hormone level testing",
                    "Focus on bone health with calcium and vitamin D",
                    "Explore natural or medical hormone support options"
                ]
            }
        }
    
    def calculate_risk_score(self, user_data: UserInput) -> dict:
        scores = {}
        risk_factors = []
        
        for condition, criteria in self.conditions.items():
            score = 0
            symptom_matches = 0
            
            # Check symptom overlap
            for symptom in user_data.symptoms:
                if symptom in criteria["symptoms"]:
                    symptom_matches += 1
            
            symptom_score = symptom_matches / len(criteria["symptoms"])
            score += symptom_score * 0.4
            
            # Age factor
            age_min, age_max = criteria["age_range"]
            if age_min <= user_data.age <= age_max:
                score += 0.3
            else:
                score += max(0, 0.3 - abs(user_data.age - age_min) * 0.01)
            
            # Lifestyle factors
            if user_data.stress_level == "high":
                score += 0.1
                if "High stress levels" not in risk_factors:
                    risk_factors.append("High stress levels")
            
            if user_data.sleep_hours < 6 or user_data.sleep_hours > 9:
                score += 0.1
                if "Poor sleep patterns" not in risk_factors:
                    risk_factors.append("Poor sleep patterns")
            
            if user_data.activity_level == "low":
                score += 0.1
                if "Low physical activity" not in risk_factors:
                    risk_factors.append("Low physical activity")
            
            scores[condition] = min(score, 1.0)
        
        # Find the condition with highest score
        top_condition = max(scores, key=scores.get)
        top_score = scores[top_condition]
        
        # Determine confidence level
        if top_score > 0.8:
            confidence = "High"
        elif top_score > 0.6:
            confidence = "Medium"
        else:
            confidence = "Low"
        
        return {
            "condition": top_condition,
            "score": round(top_score, 2),
            "confidence": confidence,
            "risk_factors": risk_factors,
            "recommendations": self.conditions[top_condition]["recommendations"]
        }

predictor = HormonalPredictor()

@app.get("/")
def read_root():
    return {"message": "FemBalance API is running", "version": "1.0.0"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.post("/predict", response_model=PredictionOutput)
def predict(data: UserInput):
    try:
        logging.info(f"Processing prediction for user: {data.name}")
        
        # Enhanced AI prediction logic
        result = predictor.calculate_risk_score(data)
        
        return PredictionOutput(
            risk_score=result["score"],
            condition_predicted=result["condition"],
            recommendation=f"Based on your symptoms and profile, consider: {result['recommendations'][0]}",
            confidence_level=result["confidence"],
            risk_factors=result["risk_factors"],
            next_steps=result["recommendations"][:3]  # Limit to top 3 recommendations
        )
        
    except Exception as e:
        logging.error(f"Prediction error: {str(e)}")
        raise HTTPException(status_code=500, detail="Prediction service temporarily unavailable")

@app.get("/conditions")
def get_supported_conditions():
    """Return information about supported conditions"""
    return {
        "supported_conditions": list(predictor.conditions.keys()),
        "total_symptoms_tracked": 9,
        "age_ranges": {k: v["age_range"] for k, v in predictor.conditions.items()}
    }