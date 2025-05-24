# FemBalance- A FemTech Hormonal Health App

A web-based application designed to help users understand potential hormonal health conditions by collecting lifestyle and physiological information. It also outlines future integration with wearable devices for real-time health monitoring.

---

## 🔧 Tech Stack

* **Frontend:** React.js + Material UI (deployed via Vercel)
* **Backend:** FastAPI (Python), containerized with Docker (deployed via Render)
* **AI Logic:** Mock predictor returning risk scores and health conditions
* **Data Integration:** Placeholder for future wearable device APIs (Fitbit, Google Fit)

---

## 🚀 Features

* User-friendly form for collecting:

  * Age, weight, height, cycle details, sleep, activity, and stress
  * Symptoms input with yes/no interface
* AI prediction with:

  * Risk score
  * Suggested condition (e.g., PCOS, PMDD)
  * Personalized lifestyle recommendation
* Risk score visualized with a circular chart
* Downloadable health report (PDF)
* Smooth fade-in results & modern card UI

---

## 🐳 Dockerized Backend Setup

### Prerequisites

* Docker installed and running

### Build & Run

```bash
# Build the image
docker build -t femtech-api .

# Run the container
docker run -d -p 8000:8000 femtech-api
```

### Access API

Visit: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🌐 Deployment

### Frontend (Vercel)

* Connect to GitHub → auto-deploy from `main`
* Visit: `https://your-vercel-app.vercel.app`

### Backend (Render)

* Dockerized deploy from GitHub repo
* Set port: 8000
* Public endpoint: `https://your-backend-service.onrender.com`

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── FormSection.js
│   │   ├── ResultSection.js
│   │   ├── SymptomCard.js
│   │   └── RiskScoreCircle.js
│   └── index.js
├── public/
└── package.json

backend/
├── main.py
├── requirements.txt
└── Dockerfile
```

---

## 📷 Demo Screenshots


---

## 📡 Future Enhancements

* Real-time data from Fitbit / Google Fit APIs
* ML model integration using real health datasets
* User login + data persistence
* Admin dashboard and multi-user management

---

## 🧪 Local Development

### Frontend

```bash
cd frontend
npm install
npm start
```

### Backend

```bash
cd backend
uvicorn main:app --reload
```

---

## 📜 License

MIT License – feel free to modify and expand.
