# CivicAR — AR + AI Civic Grievance Demo

A lightweight, **showable demo** of the CivicAR concept: AR overlays for planned infrastructure, AI-validated citizen reports, and transparent contractor traceability. This repo is intentionally simple so you can present the flow without a complex backend. fileciteturn0file0

---

## What this demo shows
- Open **AR view** (camera or fallback image) and see **future project overlays**.
- Report an issue (e.g., a pothole). The UI simulates **AI verification**.
- Submit and **track** the report in a local mock store.
- A simple **city dashboard** page shows aggregate status.

> Note: This is a **front-end only** demo with local storage + JSON mocks. Replace the mocks with your API later.

---

## Quick start

### 1) Run locally
Just open `web-demo/index.html` in a browser. For camera access, you must serve over **https** or `http://localhost`.

**Option A: Python**  
```bash
cd web-demo
python -m http.server 8000
# open http://localhost:8000
```

**Option B: Node (npx)**  
```bash
cd web-demo
npx http-server -p 8000
# open http://localhost:8000
```

### 2) Deploy to GitHub Pages
1. Create a new GitHub repo (e.g., `civicar-demo`).
2. Push this folder.
3. In Settings → Pages, deploy from the `main` branch, `/web-demo` folder.
4. Open the Pages URL on mobile to test camera-based AR.

---

## Repo structure
```
civicar-demo-repo/
├─ web-demo/
│  ├─ index.html          # main demo (AR view + reporting)
│  ├─ dashboard.html      # city dashboard view (mock)
│  ├─ style.css
│  ├─ app.js
│  ├─ data/
│  │  ├─ projects.json    # planned infra overlays (mock)
│  │  └─ defects.json     # seed defects (mock)
│  └─ assets/
│     └─ placeholder.svg  # fallback background
├─ ai/
│  └─ model_stub.md       # how the TF model would plug in
├─ docs/
│  └─ demo-script.md      # step-by-step pitch script
├─ LICENSE
└─ README.md
```

---

## Tech stack (demo)
- **Web**: HTML/CSS/JS (no framework), `getUserMedia` for camera
- **Mock data**: Local JSON + browser `localStorage`
- **AI placeholder**: simple confidence scores; connect your TensorFlow model on the `/ai` notes

---

## Roadmap (week-by-week)
- **W1–2**: UI/UX + data schema
- **W3–4**: AR overlays + camera plane detection (replace with real AR later)
- **W5**: Hook AI model for defect classification
- **W6**: MVP test + pilot prep

---

## Contributors
- Anmol Kumar — Lead (AR & Frontend)
- Aman Singh — UI/UX
- Alex Verma — Backend
- Bubai Mondal — Backend & DB

---

## License
[MIT](./LICENSE)
