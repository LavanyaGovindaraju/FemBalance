# FemBalance – A FemTech Hormonal Health App

A web-based application designed to help users understand potential hormonal health conditions by collecting lifestyle and physiological information. It also outlines future integration with wearable devices for real-time health monitoring.

---

## 🔧 Tech Stack

- **Frontend:** React.js + Material UI
- **Backend:** FastAPI (Python), containerized with Docker
- **AI Logic:** Mock predictor returning risk scores and health conditions
- **Data Integration:** Placeholder for future wearable device APIs (Fitbit, Google Fit)

---

## 🚀 Features

- User-friendly form for collecting:
  - Age, weight, height, cycle details, sleep, activity, and stress
  - Symptoms input with yes/no interface
- AI prediction with:
  - Risk score
  - Suggested condition (e.g., PCOS, PMDD)
  - Personalized lifestyle recommendation
- Risk score visualized with a circular chart
- Downloadable health report (PDF)
- Smooth fade-in results and modern card UI

---
## 📥 Getting Started

### 🛠️ Step 1: Install Node.js (includes npm)

You only need to do this **once** on your machine.

- Go to: [https://nodejs.org](https://nodejs.org)
- Download and install the **LTS version**
- After installation, verify in your terminal:

```bash
node -v
npm -v
```

### 🛠️ Step 2: Clone the repo

Clone this repository and navigate into the project directory:

```bash
git clone https://github.com/LavanyaGovindaraju/FemBalance.git
cd FemBalance
```
### ⚙️ Step 3: Install Dependencies (only once and skip it if using docker)
Navigate into the frontend directory and install packages:

```bash
cd frontend
npm install
```
---

## 🐳 Full App Setup with Docker Compose

This launches both the frontend and backend services in Docker containers.

### Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop) and Docker Compose installed

### Build & Run

```bash
docker-compose up --build
````

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## ⚙️ Local Development (Without Docker)

### Prerequisites

* [Anaconda](https://www.anaconda.com/products/distribution) or Miniconda
* Node.js v18 installed (with `npm`)
* Python 3.10

### Setup Conda Environment

```bash
conda create -n fem_env python=3.10 -y
conda activate fem_env

cd backend
pip install -r requirements.txt
cd ..
```

### Run the App (with `run.py`)

```bash
python run.py
```

This will:

* Start FastAPI backend at [http://localhost:8000](http://localhost:8000)
* Start React frontend at [http://localhost:3000](http://localhost:3000)

---

## 📷 Demo UI

![](images\health_predictor.png)

---

## 📡 Future Enhancements

* Real-time data from Fitbit / Google Fit APIs
* ML model integration using real health datasets
* User login and data persistence
* Admin dashboard with multi-user management

---

## 📜 License

MIT License
