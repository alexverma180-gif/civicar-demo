# AI Model Integration (Stub)

This demo simulates AI confidence. To plug in a real model:

1. Train a TensorFlow (or TF Lite) classifier for **pothole / garbage / overflow** on mobile-friendly inputs.
2. Export to TF Lite for on-device (Android/iOS) or serve via API for server-side inference.
3. Replace `btnRunAI` handler in `web-demo/app.js` to call your model and return `confidence`.

**Input**: image/frame + optional GPS/AR anchor  
**Output**: `{ type: 'pothole' | 'garbage' | 'overflow', confidence: 0..1 }`
