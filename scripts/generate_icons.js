import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.resolve(__dirname, '../public');
const svgPath = path.resolve(publicDir, 'pwa-icon.svg');
const svgContent = fs.readFileSync(svgPath, 'utf8');

console.log('Read SVG content successfully, length:', svgContent.length);

// 1. Standard icon (any)
// 2. Maskable icon:
// A true maskable icon must have a solid background covering 100% of the canvas (512x512 with no outer rounded border or transparency)
// and the terminal badge scaled down to fit inside the safe zone (80% diameter circle).
const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="pwa-primary" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#61DAFB"/>
      <stop offset="100%" stop-color="#306998"/>
    </linearGradient>
    <linearGradient id="pwa-accent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFD43B"/>
      <stop offset="100%" stop-color="#F7DF1E"/>
    </linearGradient>
    <linearGradient id="pwa-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#181a20"/>
      <stop offset="100%" stop-color="#0d0e12"/>
    </linearGradient>
    <filter id="pwa-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-opacity="0.5" flood-color="#000000"/>
    </filter>
  </defs>

  <!-- Full bleed background covering the entire square for safe adaptive masking -->
  <rect width="512" height="512" fill="url(#pwa-bg)"/>

  <!-- Centered Terminal Badge scaled to 78% so it stays completely inside the 80% safe zone circle -->
  <g transform="translate(256, 256) scale(0.78) translate(-256, -256)" filter="url(#pwa-shadow)">
    <rect x="26" y="166" width="460" height="180" rx="24" ry="24" fill="#1E1E1E" stroke="#f97316" stroke-width="3"/>
    <circle cx="58" cy="198" r="9" fill="#FF5F56" />
    <circle cx="84" cy="198" r="9" fill="#FFBD2E" />
    <circle cx="110" cy="198" r="9" fill="#27C93F" />
    <text x="54" y="282" font-family="'Fira Code', 'Consolas', 'Courier New', monospace" font-size="54" font-weight="bold" fill="url(#pwa-primary)">&gt;_</text>
    <text x="150" y="282" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="62" font-weight="800" fill="#FFFFFF" letter-spacing="-1">tiku</text>
    <text x="278" y="282" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="62" font-weight="300" fill="url(#pwa-accent)">dev</text>
    <rect x="394" y="235" width="24" height="52" fill="#61DAFB"/>
  </g>
</svg>`;

async function run() {
  const svgBuf = Buffer.from(svgContent);
  const maskableBuf = Buffer.from(maskableSvg);

  // 1. Standard icons (purpose: any)
  await sharp(svgBuf).resize(512, 512).png().toFile(path.join(publicDir, 'pwa-icon-512.png'));
  console.log('Generated pwa-icon-512.png');

  await sharp(svgBuf).resize(192, 192).png().toFile(path.join(publicDir, 'pwa-icon-192.png'));
  console.log('Generated pwa-icon-192.png');

  // Apple touch icon (180x180)
  await sharp(svgBuf).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png');

  // Favicon PNG (64x64 and 32x32)
  await sharp(svgBuf).resize(64, 64).png().toFile(path.join(publicDir, 'favicon-64.png'));
  await sharp(svgBuf).resize(32, 32).png().toFile(path.join(publicDir, 'favicon-32.png'));

  // 2. Maskable icons (purpose: maskable)
  await sharp(maskableBuf).resize(512, 512).png().toFile(path.join(publicDir, 'pwa-icon-maskable-512.png'));
  console.log('Generated pwa-icon-maskable-512.png');

  await sharp(maskableBuf).resize(192, 192).png().toFile(path.join(publicDir, 'pwa-icon-maskable-192.png'));
  console.log('Generated pwa-icon-maskable-192.png');

  // Also save maskable SVG
  fs.writeFileSync(path.join(publicDir, 'pwa-icon-maskable.svg'), maskableSvg, 'utf8');
  console.log('Generated pwa-icon-maskable.svg');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
