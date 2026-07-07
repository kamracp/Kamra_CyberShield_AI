Every "Run Analysis" button in the UI sends a `POST` request to the backend,
which computes the risk score and returns a structured JSON result. No risk
logic runs in the browser.

## Prerequisites
- Python 3.10+
- Node.js 18+

## Setup & Run

### 1. Backend (start this first)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
Backend will be live at `http://localhost:8000`.
Interactive API docs: `http://localhost:8000/docs`

> If port 8000 is already in use on your machine, start on a different port
> (e.g. `--port 8010`) and update `BASE_URL` in
> `frontend/src/api/riskApi.ts` to match.

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

## API Endpoints
| Module              | Endpoint                          |
|----------------------|------------------------------------|
| Fraud Engine          | `POST /api/fraud/analyze`          |
| SIM Swap               | `POST /api/sim-swap/analyze`       |
| UPI Security           | `POST /api/upi/analyze`            |
| Velocity Risk          | `POST /api/velocity-risk/analyze`  |
| Geo Risk                | `POST /api/geo-risk/analyze`       |
| Impossible Travel       | `POST /api/impossible-travel/analyze` |
| Deepfake Shield          | `POST /api/deepfake/analyze`       |
| Device Fingerprint       | `POST /api/device-fingerprint/analyze` |

## Tech Stack
- **Frontend:** React 19, TypeScript, React Router, Vite, hand-rolled utility CSS
- **Backend:** FastAPI, Pydantic, Uvicorn
- **Communication:** REST (JSON over HTTP), CORS enabled for local dev

## Notes for Evaluation
- All risk-scoring thresholds and logic live in `backend/app/services/risk_engine.py`
  — this is the single source of truth for how each module decides SAFE / WARNING /
  CRITICAL / BLOCK.
- Frontend only handles: collecting user input, calling the API, and rendering
  the returned result. This separation is intentional so the scoring logic can
  be unit-tested, extended, or swapped independently of the UI.