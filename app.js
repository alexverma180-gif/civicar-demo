const video = document.getElementById('camera');
const fallback = document.getElementById('fallback');
const canvas = document.getElementById('overlay');
const ctx = canvas.getContext('2d');

const btnStart = document.getElementById('btnStartCamera');
const btnToggle = document.getElementById('btnToggleOverlays');
const btnReport = document.getElementById('btnReport');

const panel = document.getElementById('reportPanel');
const btnClosePanel = document.getElementById('btnClosePanel');
const btnRunAI = document.getElementById('btnRunAI');
const btnSubmit = document.getElementById('btnSubmit');
const issueType = document.getElementById('issueType');
const aiResult = document.getElementById('aiResult');
const ticketList = document.getElementById('ticketList');

let overlaysVisible = true;
let overlayData = null;

function resizeCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

async function loadOverlays() {
  const res = await fetch('./data/projects.json');
  overlayData = await res.json();
  drawOverlays();
}

function drawOverlays() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!overlaysVisible || !overlayData) return;

  // Blue lines — pipelines
  ctx.lineWidth = 4;
  ctx.globalAlpha = 0.9;
  overlayData.pipelines.forEach(seg => {
    ctx.beginPath();
    ctx.moveTo(seg[0][0]*canvas.width, seg[0][1]*canvas.height);
    ctx.lineTo(seg[1][0]*canvas.width, seg[1][1]*canvas.height);
    ctx.strokeStyle = 'rgba(52,152,219,0.9)';
    ctx.stroke();
  });

  // Yellow polygons — road widening
  overlayData.roadWidening.forEach(poly => {
    ctx.beginPath();
    poly.forEach((pt, i) => {
      const x = pt[0]*canvas.width, y = pt[1]*canvas.height;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(241,196,15,0.35)';
    ctx.fill();
  });

  // Green points — streetlights
  overlayData.lights.forEach(pt => {
    const x = pt[0]*canvas.width, y = pt[1]*canvas.height;
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(46,204,113,0.9)';
    ctx.fill();
  });
}

btnToggle?.addEventListener('click', () => {
  overlaysVisible = !overlaysVisible;
  drawOverlays();
});

btnStart?.addEventListener('click', async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
    video.srcObject = stream;
    fallback.style.display = 'none';
  } catch (e) {
    alert('Camera not available. Using fallback image.');
  }
});

btnReport?.addEventListener('click', () => {
  panel.classList.remove('hidden');
  aiResult.textContent = '';
  btnSubmit.disabled = true;
});

btnClosePanel?.addEventListener('click', () => {
  panel.classList.add('hidden');
});

btnRunAI?.addEventListener('click', () => {
  // Simulate AI confidence by issue type
  const base = issueType.value === 'pothole' ? 0.92 : issueType.value === 'garbage' ? 0.87 : 0.84;
  const jitter = (Math.random() * 0.06) - 0.03;
  const conf = Math.min(0.99, Math.max(0.6, base + jitter));
  aiResult.textContent = `AI validation: ${issueType.value} detected with ${(conf*100).toFixed(0)}% confidence.`;
  aiResult.dataset.confidence = conf.toString();
  btnSubmit.disabled = false;
});

btnSubmit?.addEventListener('click', () => {
  const conf = parseFloat(aiResult.dataset.confidence || '0.75');
  const id = 'CIV-' + Math.random().toString(36).slice(2, 8).toUpperCase();
  const payload = {
    id,
    type: issueType.value,
    aiConfidence: conf,
    status: 'Submitted',
    createdAt: new Date().toISOString()
  };
  const existing = JSON.parse(localStorage.getItem('civicar_tickets') || '[]');
  existing.push(payload);
  localStorage.setItem('civicar_tickets', JSON.stringify(existing));
  renderTickets();
  panel.classList.add('hidden');
});

function renderTickets() {
  const tickets = JSON.parse(localStorage.getItem('civicar_tickets') || '[]').slice(-8).reverse();
  ticketList.innerHTML = '';
  tickets.forEach(t => {
    const li = document.createElement('li');
    li.className = 'ticket';
    li.innerHTML = `<strong>${t.id}</strong> — ${t.type} — ${(t.aiConfidence*100).toFixed(0)}% — <em>${t.status}</em><br><small>${new Date(t.createdAt).toLocaleString()}</small>`;
    ticketList.appendChild(li);
  });
}

renderTickets();
loadOverlays();
