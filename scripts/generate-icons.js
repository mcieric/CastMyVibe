const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

// Créer le dossier public s'il n'existe pas
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Créer le canvas pour icon.png (1024x1024)
const canvas = createCanvas(1024, 1024);
const ctx = canvas.getContext('2d');

// Dessiner le fond violet/bleu gradient
const gradient = ctx.createLinearGradient(0, 0, 1024, 1024);
gradient.addColorStop(0, '#7209b7');
gradient.addColorStop(1, '#3a0ca3');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 1024, 1024);

// Dessiner le texte avec contour blanc
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

// Ombre blanche (simule le contour)
ctx.shadowColor = 'white';
ctx.shadowBlur = 20;
ctx.fillStyle = 'white';
ctx.font = 'bold 180px Arial, sans-serif';
ctx.fillText('CastMyVibe', 512, 450);

// Emoji dice
ctx.shadowBlur = 0;
ctx.font = '120px Arial, sans-serif';
ctx.fillText('🎲', 512, 650);

// Sauvegarder icon.png
const iconBuffer = canvas.toBuffer('image/png');
fs.writeFileSync(path.join(publicDir, 'icon.png'), iconBuffer);

// Créer splash.png (200x200) - version réduite
const splashCanvas = createCanvas(200, 200);
const splashCtx = splashCanvas.getContext('2d');

// Même fond
const splashGradient = splashCtx.createLinearGradient(0, 0, 200, 200);
splashGradient.addColorStop(0, '#7209b7');
splashGradient.addColorStop(1, '#3a0ca3');
splashCtx.fillStyle = splashGradient;
splashCtx.fillRect(0, 0, 200, 200);

// Texte plus petit
splashCtx.textAlign = 'center';
splashCtx.textBaseline = 'middle';
splashCtx.shadowColor = 'white';
splashCtx.shadowBlur = 10;
splashCtx.fillStyle = 'white';
splashCtx.font = 'bold 40px Arial, sans-serif';
splashCtx.fillText('CMV', 100, 80);

// Emoji plus petit
splashCtx.shadowBlur = 0;
splashCtx.font = '50px Arial, sans-serif';
splashCtx.fillText('🎲', 100, 140);

// Sauvegarder splash.png
const splashBuffer = splashCanvas.toBuffer('image/png');
fs.writeFileSync(path.join(publicDir, 'splash.png'), splashBuffer);

console.log('✅ Icons generated successfully!');
console.log('📁 Files created:');
console.log('   - public/icon.png (1024x1024)');
console.log('   - public/splash.png (200x200)');