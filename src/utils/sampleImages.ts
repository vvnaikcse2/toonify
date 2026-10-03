/**
 * High-quality preset photographic sample images generated via canvas
 * so users can test cartoon conversion immediately without needing to hunt for files.
 */

export interface SampleImage {
  id: string;
  title: string;
  category: string;
  description: string;
  badge: string;
  createDataUrl: () => string;
}

function createPortraitCanvas(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 640;
  const ctx = canvas.getContext('2d')!;

  // Warm studio background with radial gradient
  const bgGrad = ctx.createRadialGradient(320, 260, 50, 320, 320, 420);
  bgGrad.addColorStop(0, '#fef3c7');
  bgGrad.addColorStop(0.5, '#f59e0b');
  bgGrad.addColorStop(1, '#78350f');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 640, 640);

  // Soft bokeh circles
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.beginPath();
  ctx.arc(120, 140, 60, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(520, 180, 85, 0, Math.PI * 2);
  ctx.fill();

  // Shoulders and stylish jacket
  const jacketGrad = ctx.createLinearGradient(160, 420, 480, 640);
  jacketGrad.addColorStop(0, '#1e293b');
  jacketGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = jacketGrad;
  ctx.beginPath();
  ctx.moveTo(140, 640);
  ctx.lineTo(200, 440);
  ctx.quadraticCurveTo(320, 470, 440, 440);
  ctx.lineTo(500, 640);
  ctx.closePath();
  ctx.fill();

  // Vibrant inner collar
  ctx.fillStyle = '#f43f5e';
  ctx.beginPath();
  ctx.moveTo(270, 460);
  ctx.lineTo(320, 530);
  ctx.lineTo(370, 460);
  ctx.closePath();
  ctx.fill();

  // Neck
  ctx.fillStyle = '#e0a980';
  ctx.beginPath();
  ctx.moveTo(280, 380);
  ctx.lineTo(280, 465);
  ctx.quadraticCurveTo(320, 480, 360, 465);
  ctx.lineTo(360, 380);
  ctx.fill();

  // Neck shadow
  ctx.fillStyle = 'rgba(120, 60, 20, 0.25)';
  ctx.beginPath();
  ctx.moveTo(280, 380);
  ctx.quadraticCurveTo(320, 410, 360, 380);
  ctx.lineTo(360, 410);
  ctx.quadraticCurveTo(320, 430, 280, 410);
  ctx.fill();

  // Face head oval
  const faceGrad = ctx.createLinearGradient(230, 180, 410, 400);
  faceGrad.addColorStop(0, '#ffd8b5');
  faceGrad.addColorStop(0.6, '#f7be94');
  faceGrad.addColorStop(1, '#e29b68');
  ctx.fillStyle = faceGrad;
  ctx.beginPath();
  ctx.ellipse(320, 300, 105, 135, 0, 0, Math.PI * 2);
  ctx.fill();

  // Cheek blush
  const blush = ctx.createRadialGradient(265, 330, 5, 265, 330, 35);
  blush.addColorStop(0, 'rgba(244, 63, 94, 0.35)');
  blush.addColorStop(1, 'rgba(244, 63, 94, 0)');
  ctx.fillStyle = blush;
  ctx.beginPath();
  ctx.arc(265, 330, 35, 0, Math.PI * 2);
  ctx.fill();

  const blushR = ctx.createRadialGradient(375, 330, 5, 375, 330, 35);
  blushR.addColorStop(0, 'rgba(244, 63, 94, 0.35)');
  blushR.addColorStop(1, 'rgba(244, 63, 94, 0)');
  ctx.fillStyle = blushR;
  ctx.beginPath();
  ctx.arc(375, 330, 35, 0, Math.PI * 2);
  ctx.fill();

  // Eyebrows
  ctx.strokeStyle = '#451a03';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(260, 255);
  ctx.quadraticCurveTo(285, 245, 305, 258);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(335, 258);
  ctx.quadraticCurveTo(355, 245, 380, 255);
  ctx.stroke();

  // Eyes
  // Left eye
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(282, 280, 18, 11, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#2563eb'; // Deep blue iris
  ctx.beginPath();
  ctx.arc(283, 280, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(283, 280, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(280, 277, 3, 0, Math.PI * 2);
  ctx.fill();

  // Right eye
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(358, 280, 18, 11, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#2563eb';
  ctx.beginPath();
  ctx.arc(357, 280, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(357, 280, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(354, 277, 3, 0, Math.PI * 2);
  ctx.fill();

  // Nose
  ctx.strokeStyle = '#c27d4c';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(320, 280);
  ctx.lineTo(316, 325);
  ctx.quadraticCurveTo(320, 335, 330, 327);
  ctx.stroke();

  // Gentle smiling mouth
  ctx.fillStyle = '#be123c';
  ctx.beginPath();
  ctx.moveTo(285, 360);
  ctx.quadraticCurveTo(320, 395, 355, 360);
  ctx.quadraticCurveTo(320, 372, 285, 360);
  ctx.fill();

  // Teeth highlight
  ctx.fillStyle = '#fffbeb';
  ctx.beginPath();
  ctx.moveTo(295, 364);
  ctx.quadraticCurveTo(320, 375, 345, 364);
  ctx.quadraticCurveTo(320, 369, 295, 364);
  ctx.fill();

  // Voluminous curly hair
  ctx.fillStyle = '#3b1c09';
  const curls = [
    [320, 170, 75],
    [260, 185, 65],
    [380, 185, 65],
    [210, 230, 55],
    [430, 230, 55],
    [195, 290, 50],
    [445, 290, 50],
    [200, 350, 48],
    [440, 350, 48],
  ];
  for (const [x, y, r] of curls) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Hair highlights
  ctx.fillStyle = '#92400e';
  ctx.beginPath();
  ctx.arc(300, 160, 40, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(350, 165, 45, 0, Math.PI * 2);
  ctx.fill();

  return canvas.toDataURL('image/jpeg', 0.95);
}

function createDogCanvas(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 640;
  const ctx = canvas.getContext('2d')!;

  // Lush green outdoor park background
  const bg = ctx.createLinearGradient(0, 0, 0, 640);
  bg.addColorStop(0, '#38bdf8'); // Sunny sky
  bg.addColorStop(0.55, '#86efac');
  bg.addColorStop(1, '#15803d'); // Deep grass
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 640, 640);

  // Soft sun flares
  ctx.fillStyle = 'rgba(254, 240, 138, 0.4)';
  ctx.beginPath();
  ctx.arc(100, 90, 80, 0, Math.PI * 2);
  ctx.fill();

  // Golden retriever dog body
  const bodyGrad = ctx.createLinearGradient(200, 350, 440, 600);
  bodyGrad.addColorStop(0, '#fcd34d');
  bodyGrad.addColorStop(1, '#d97706');
  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.ellipse(320, 510, 170, 140, 0, 0, Math.PI * 2);
  ctx.fill();

  // Dog red collar
  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.ellipse(320, 430, 95, 28, 0, 0, Math.PI * 2);
  ctx.fill();
  // Gold tag
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.arc(320, 455, 16, 0, Math.PI * 2);
  ctx.fill();

  // Ears (floppy golden ears)
  ctx.fillStyle = '#b45309';
  // Left ear
  ctx.beginPath();
  ctx.ellipse(200, 290, 45, 85, -0.25, 0, Math.PI * 2);
  ctx.fill();
  // Right ear
  ctx.beginPath();
  ctx.ellipse(440, 290, 45, 85, 0.25, 0, Math.PI * 2);
  ctx.fill();

  // Dog Head
  const headGrad = ctx.createRadialGradient(320, 260, 40, 320, 270, 130);
  headGrad.addColorStop(0, '#fef08a');
  headGrad.addColorStop(0.7, '#f59e0b');
  headGrad.addColorStop(1, '#b45309');
  ctx.fillStyle = headGrad;
  ctx.beginPath();
  ctx.ellipse(320, 275, 120, 115, 0, 0, Math.PI * 2);
  ctx.fill();

  // Dog Muzzle
  const muzzleGrad = ctx.createLinearGradient(270, 290, 370, 380);
  muzzleGrad.addColorStop(0, '#fde68a');
  muzzleGrad.addColorStop(1, '#d97706');
  ctx.fillStyle = muzzleGrad;
  ctx.beginPath();
  ctx.ellipse(320, 335, 65, 52, 0, 0, Math.PI * 2);
  ctx.fill();

  // Dog Nose
  ctx.fillStyle = '#1c1917';
  ctx.beginPath();
  ctx.ellipse(320, 315, 24, 18, 0, 0, Math.PI * 2);
  ctx.fill();
  // Nose shine
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.beginPath();
  ctx.arc(315, 311, 4, 0, Math.PI * 2);
  ctx.fill();

  // Happy Tongue
  ctx.fillStyle = '#f43f5e';
  ctx.beginPath();
  ctx.ellipse(320, 370, 20, 32, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#be123c';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(320, 355);
  ctx.lineTo(320, 385);
  ctx.stroke();

  // Dog big dark eyes
  const drawDogEye = (cx: number, cy: number) => {
    ctx.fillStyle = '#291807';
    ctx.beginPath();
    ctx.arc(cx, cy, 18, 0, Math.PI * 2);
    ctx.fill();

    // Warm amber ring
    ctx.fillStyle = '#92400e';
    ctx.beginPath();
    ctx.arc(cx, cy, 13, 0, Math.PI * 2);
    ctx.fill();

    // Pupil
    ctx.fillStyle = '#0a0a0a';
    ctx.beginPath();
    ctx.arc(cx, cy, 9, 0, Math.PI * 2);
    ctx.fill();

    // Catchlights
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx - 4, cy - 4, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + 4, cy + 3, 2.5, 0, Math.PI * 2);
    ctx.fill();
  };

  drawDogEye(268, 250);
  drawDogEye(372, 250);

  return canvas.toDataURL('image/jpeg', 0.95);
}

function createCafeCanvas(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 640;
  const ctx = canvas.getContext('2d')!;

  // Sunset European street scene
  const sky = ctx.createLinearGradient(0, 0, 0, 360);
  sky.addColorStop(0, '#f97316');
  sky.addColorStop(0.5, '#ec4899');
  sky.addColorStop(1, '#8b5cf6');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, 640, 640);

  // Distant buildings
  ctx.fillStyle = '#475569';
  ctx.fillRect(40, 160, 120, 280);
  ctx.fillRect(180, 120, 150, 320);
  ctx.fillRect(340, 150, 130, 290);
  ctx.fillRect(480, 180, 130, 260);

  // Cobblestone ground
  const ground = ctx.createLinearGradient(0, 420, 0, 640);
  ground.addColorStop(0, '#334155');
  ground.addColorStop(1, '#0f172a');
  ctx.fillStyle = ground;
  ctx.fillRect(0, 420, 640, 220);

  // Cafe striped awning
  const awningW = 380;
  const awningH = 70;
  const startX = 130;
  const startY = 320;
  for (let i = 0; i < 10; i++) {
    ctx.fillStyle = i % 2 === 0 ? '#ef4444' : '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(startX + (i * awningW) / 10, startY);
    ctx.lineTo(startX + ((i + 1) * awningW) / 10, startY);
    ctx.lineTo(startX + ((i + 1) * awningW) / 10 + 15, startY + awningH);
    ctx.lineTo(startX + (i * awningW) / 10 + 15, startY + awningH);
    ctx.closePath();
    ctx.fill();
  }

  // Warm cafe window glow
  ctx.fillStyle = 'rgba(254, 240, 138, 0.85)';
  ctx.fillRect(180, 395, 280, 120);

  // Bistro table & coffee
  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.ellipse(320, 520, 70, 22, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#0369a1';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(320, 540);
  ctx.lineTo(320, 610);
  ctx.stroke();

  // Coffee cup with steam
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(305, 498, 30, 22);
  ctx.fillStyle = '#78350f';
  ctx.beginPath();
  ctx.ellipse(320, 500, 14, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Potted flowering plants
  ctx.fillStyle = '#ea580c';
  ctx.beginPath();
  ctx.moveTo(120, 520);
  ctx.lineTo(160, 520);
  ctx.lineTo(150, 580);
  ctx.lineTo(130, 580);
  ctx.fill();

  // Colorful flowers
  const colors = ['#f43f5e', '#a855f7', '#fbbf24', '#38bdf8'];
  for (let i = 0; i < 18; i++) {
    ctx.fillStyle = colors[i % colors.length];
    ctx.beginPath();
    ctx.arc(125 + (i % 5) * 8, 480 + Math.floor(i / 5) * 12, 7, 0, Math.PI * 2);
    ctx.fill();
  }

  return canvas.toDataURL('image/jpeg', 0.95);
}

function createSportsCarCanvas(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 640;
  const ctx = canvas.getContext('2d')!;

  // Dynamic cyber highway gradient
  const bg = ctx.createLinearGradient(0, 0, 640, 640);
  bg.addColorStop(0, '#0f172a');
  bg.addColorStop(0.5, '#1e1b4b');
  bg.addColorStop(1, '#312e81');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 640, 640);

  // Speed lines in background
  ctx.strokeStyle = 'rgba(165, 180, 252, 0.25)';
  ctx.lineWidth = 3;
  for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    ctx.moveTo(40, 100 + i * 45);
    ctx.lineTo(600, 80 + i * 45);
    ctx.stroke();
  }

  // Asphalt road
  ctx.fillStyle = '#090d16';
  ctx.beginPath();
  ctx.moveTo(0, 480);
  ctx.lineTo(640, 440);
  ctx.lineTo(640, 640);
  ctx.lineTo(0, 640);
  ctx.fill();

  // Neon road stripe
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 6;
  ctx.setLineDash([30, 20]);
  ctx.beginPath();
  ctx.moveTo(20, 560);
  ctx.lineTo(620, 520);
  ctx.stroke();
  ctx.setLineDash([]);

  // Sports car silhouette & red body
  const carGrad = ctx.createLinearGradient(120, 280, 520, 460);
  carGrad.addColorStop(0, '#ef4444');
  carGrad.addColorStop(0.6, '#b91c1c');
  carGrad.addColorStop(1, '#7f1d1d');
  ctx.fillStyle = carGrad;

  // Car chassis
  ctx.beginPath();
  ctx.moveTo(110, 430);
  ctx.lineTo(130, 380);
  ctx.quadraticCurveTo(200, 360, 250, 310);
  ctx.lineTo(380, 310);
  ctx.quadraticCurveTo(450, 350, 510, 380);
  ctx.lineTo(530, 430);
  ctx.lineTo(460, 430);
  ctx.arc(430, 430, 45, 0, Math.PI, true);
  ctx.lineTo(250, 430);
  ctx.arc(200, 430, 45, 0, Math.PI, true);
  ctx.closePath();
  ctx.fill();

  // Windshield & windows
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.moveTo(260, 320);
  ctx.lineTo(370, 320);
  ctx.lineTo(390, 360);
  ctx.lineTo(240, 360);
  ctx.closePath();
  ctx.fill();

  // Headlight beam
  const light = ctx.createLinearGradient(510, 395, 640, 410);
  light.addColorStop(0, 'rgba(254, 240, 138, 0.9)');
  light.addColorStop(1, 'rgba(254, 240, 138, 0)');
  ctx.fillStyle = light;
  ctx.beginPath();
  ctx.moveTo(510, 390);
  ctx.lineTo(640, 360);
  ctx.lineTo(640, 480);
  ctx.lineTo(520, 415);
  ctx.closePath();
  ctx.fill();

  // Wheels
  const drawWheel = (cx: number, cy: number) => {
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(cx, cy, 40, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.arc(cx, cy, 24, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(cx, cy, 8, 0, Math.PI * 2);
    ctx.fill();
  };

  drawWheel(200, 430);
  drawWheel(430, 430);

  return canvas.toDataURL('image/jpeg', 0.95);
}

export const SAMPLE_IMAGES: SampleImage[] = [
  {
    id: 'portrait',
    title: 'Smiling Portrait',
    category: 'Person / Face',
    description: 'Great for testing comic facial expressions and stylized hair.',
    badge: 'Popular',
    createDataUrl: createPortraitCanvas,
  },
  {
    id: 'pet',
    title: 'Golden Puppy',
    category: 'Pet / Animal',
    description: 'Test furry textures, big expressive eyes, and cel-shading.',
    badge: 'Cute',
    createDataUrl: createDogCanvas,
  },
  {
    id: 'car',
    title: 'Sports Car',
    category: 'Vehicle / Object',
    description: 'Sharp lines, reflections, metallic highlights, and motion.',
    badge: 'Vibrant',
    createDataUrl: createSportsCarCanvas,
  },
  {
    id: 'cafe',
    title: 'European Cafe',
    category: 'City / Scenery',
    description: 'Bistro awning, warm lighting, flowers, and architectural details.',
    badge: 'Scenic',
    createDataUrl: createCafeCanvas,
  },
];
