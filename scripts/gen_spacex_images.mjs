/**
 * Generates static light-theme, English-labeled SVG charts for the
 * SpaceX IPO article. Mirrors the gen_montecarlo_images.R workflow but
 * in pure Node (no R/Python dependency).
 *
 * Usage: node scripts/gen_spacex_images.mjs
 * Output: public/images/spacex-ipo-*-en.svg
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../public/images');

const C = {
  bg: '#ffffff',
  ink: '#18181b',
  muted: '#52525b',
  grid: '#e4e4e7',
  axis: '#a1a1aa',
  blue: '#1d4ed8',
  blueLight: '#93c5fd',
  red: '#dc2626',
  gray: '#9ca3af',
  amber: '#f59e0b',
};

const W = 820, H = 460;
const ML = 70, MR = 30, MT = 60, MB = 78;
const PW = W - ML - MR;
const PH = H - MT - MB;
const Y0 = MT, YB = MT + PH;

const f = (n, d = 0) => Number(n).toFixed(d);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function head(title) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
<rect x="0" y="0" width="${W}" height="${H}" fill="${C.bg}"/>
<text x="${ML}" y="34" font-size="19" font-weight="600" fill="${C.ink}">${esc(title)}</text>`;
}
const foot = () => `</svg>`;

function yGrid(yMin, yMax, ticks, fmt) {
  let s = '';
  for (const t of ticks) {
    const y = YB - ((t - yMin) / (yMax - yMin)) * PH;
    s += `<line x1="${ML}" y1="${f(y,1)}" x2="${ML + PW}" y2="${f(y,1)}" stroke="${C.grid}" stroke-width="1"/>`;
    s += `<text x="${ML - 10}" y="${f(y + 4,1)}" font-size="12" fill="${C.muted}" text-anchor="end">${esc(fmt(t))}</text>`;
  }
  return s;
}

// ---- Chart 1: SPCX price path (line) ----
function chartPrice() {
  const labels = ['IPO price', 'Open', 'Day-1 close', 'Peak', 'Now'];
  const vals = [135, 150, 161, 222, 150];
  const ptCol = ['#1d4ed8', '#1d4ed8', '#1d4ed8', '#0f766e', '#dc2626'];
  const yMin = 120, yMax = 235;
  const x = (i) => ML + (i * PW) / (labels.length - 1);
  const y = (v) => YB - ((v - yMin) / (yMax - yMin)) * PH;
  let s = head('SPCX — first days of trading, $');
  s += yGrid(yMin, yMax, [140, 160, 180, 200, 220], (t) => '$' + t);
  let pts = vals.map((v, i) => `${f(x(i),1)},${f(y(v),1)}`).join(' ');
  s += `<polyline points="${pts}" fill="none" stroke="${C.blue}" stroke-width="2.5"/>`;
  vals.forEach((v, i) => {
    s += `<circle cx="${f(x(i),1)}" cy="${f(y(v),1)}" r="5" fill="${ptCol[i]}"/>`;
    s += `<text x="${f(x(i),1)}" y="${f(y(v) - 12,1)}" font-size="12" font-weight="600" fill="${C.ink}" text-anchor="middle">$${v}</text>`;
    s += `<text x="${f(x(i),1)}" y="${YB + 22}" font-size="12" fill="${C.muted}" text-anchor="middle">${esc(labels[i])}</text>`;
  });
  s += `<text x="${ML}" y="${H - 14}" font-size="11" fill="${C.muted}">Priced $135 · 1st-day close $161 (+19%) · peak ~$222 · pullback to ~$150</text>`;
  return s + foot();
}

// ---- Chart 2: revenue stacked bars ----
function chartRevenue() {
  const cats = ['2024', '2025'];
  const starlink = [7.7, 11.4];
  const rest = [5.4, 7.3];
  const yMin = 0, yMax = 20;
  const y = (v) => YB - ((v - yMin) / (yMax - yMin)) * PH;
  const bw = 150;
  const cx = (i) => ML + (PW / cats.length) * (i + 0.5);
  let s = head('SpaceX revenue, $B');
  s += yGrid(yMin, yMax, [5, 10, 15, 20], (t) => '$' + t);
  cats.forEach((c, i) => {
    const xL = cx(i) - bw / 2;
    const total = starlink[i] + rest[i];
    s += `<rect x="${f(xL,1)}" y="${f(y(starlink[i]),1)}" width="${bw}" height="${f(YB - y(starlink[i]),1)}" fill="${C.blue}"/>`;
    s += `<rect x="${f(xL,1)}" y="${f(y(total),1)}" width="${bw}" height="${f(y(starlink[i]) - y(total),1)}" fill="${C.blueLight}"/>`;
    s += `<text x="${f(cx(i),1)}" y="${f(y(total) - 8,1)}" font-size="13" font-weight="600" fill="${C.ink}" text-anchor="middle">$${f(total,1)}B</text>`;
    s += `<text x="${f(cx(i),1)}" y="${f((y(starlink[i]) + YB) / 2 + 4,1)}" font-size="12" fill="#ffffff" text-anchor="middle">$${f(starlink[i],1)}B</text>`;
    s += `<text x="${f(cx(i),1)}" y="${YB + 22}" font-size="13" fill="${C.muted}" text-anchor="middle">${c}</text>`;
  });
  // legend
  s += `<rect x="${ML + PW - 200}" y="${MT - 2}" width="12" height="12" fill="${C.blue}"/><text x="${ML + PW - 184}" y="${MT + 9}" font-size="12" fill="${C.muted}">Starlink</text>`;
  s += `<rect x="${ML + PW - 110}" y="${MT - 2}" width="12" height="12" fill="${C.blueLight}"/><text x="${ML + PW - 94}" y="${MT + 9}" font-size="12" fill="${C.muted}">Launch &amp; other</text>`;
  s += `<text x="${ML}" y="${H - 14}" font-size="11" fill="${C.muted}">Starlink = 61% of 2025 revenue and the company's only operating-profit engine</text>`;
  return s + foot();
}

// ---- Chart 3: valuation ramp (vertical bars) ----
function chartValuation() {
  const labels = ['Dec 2024', 'Jul 2025', 'Dec 2025', 'IPO Jun 2026'];
  const vals = [350, 400, 800, 2100];
  const cols = [C.blueLight, C.blueLight, C.blue, C.red];
  const yMin = 0, yMax = 2200;
  const y = (v) => YB - ((v - yMin) / (yMax - yMin)) * PH;
  const slot = PW / labels.length, bw = 90;
  const cx = (i) => ML + slot * (i + 0.5);
  const fmtV = (t) => (t >= 1000 ? '$' + f(t / 1000, 1) + 'T' : '$' + t + 'B');
  let s = head('SpaceX valuation: private rounds → IPO');
  s += yGrid(yMin, yMax, [500, 1000, 1500, 2000], fmtV);
  vals.forEach((v, i) => {
    s += `<rect x="${f(cx(i) - bw / 2,1)}" y="${f(y(v),1)}" width="${bw}" height="${f(YB - y(v),1)}" fill="${cols[i]}"/>`;
    s += `<text x="${f(cx(i),1)}" y="${f(y(v) - 8,1)}" font-size="13" font-weight="600" fill="${C.ink}" text-anchor="middle">${fmtV(v)}</text>`;
    s += `<text x="${f(cx(i),1)}" y="${YB + 22}" font-size="12" fill="${C.muted}" text-anchor="middle">${esc(labels[i])}</text>`;
  });
  s += `<text x="${ML}" y="${H - 14}" font-size="11" fill="${C.muted}">~6x in 18 months · IPO multiple ≈ 100x revenue</text>`;
  return s + foot();
}

// ---- Chart 4: sector crash (horizontal bars, negative) ----
function chartSector() {
  const labels = ['Virgin Galactic', 'AST SpaceMobile', 'Intuitive Machines', 'EchoStar', 'Rocket Lab', 'Planet Labs', 'Procure Space ETF'];
  const vals = [-31.8, -15.5, -13.1, -11, -10.8, -8.8, -7];
  const lML = 160, lPW = W - lML - MR;
  const xMin = -35, xMax = 0;
  const x = (v) => lML + ((v - xMin) / (xMax - xMin)) * lPW;
  const n = labels.length, rowH = PH / n, bh = rowH * 0.6;
  let s = head('Space stocks on SpaceX IPO day, %');
  for (const t of [-30, -20, -10, 0]) {
    const xx = x(t);
    s += `<line x1="${f(xx,1)}" y1="${Y0}" x2="${f(xx,1)}" y2="${YB}" stroke="${C.grid}" stroke-width="1"/>`;
    s += `<text x="${f(xx,1)}" y="${YB + 20}" font-size="12" fill="${C.muted}" text-anchor="middle">${t}%</text>`;
  }
  labels.forEach((lab, i) => {
    const yc = Y0 + rowH * (i + 0.5);
    const x0 = x(0), xv = x(vals[i]);
    s += `<rect x="${f(xv,1)}" y="${f(yc - bh / 2,1)}" width="${f(x0 - xv,1)}" height="${f(bh,1)}" fill="${C.red}"/>`;
    s += `<text x="${lML - 10}" y="${f(yc + 4,1)}" font-size="12" fill="${C.ink}" text-anchor="end">${esc(lab)}</text>`;
    s += `<text x="${f(xv - 6,1)}" y="${f(yc + 4,1)}" font-size="12" font-weight="600" fill="${C.red}" text-anchor="end">${f(vals[i],1)}%</text>`;
  });
  s += `<text x="${lML}" y="${H - 12}" font-size="11" fill="${C.muted}">Capital siphon: managers sold the sector to fund the headline IPO</text>`;
  return s + foot();
}

// ---- Chart 5: price/sales multiples ----
function chartMultiples() {
  const labels = ['Mature telecom', 'Anthropic', 'Tech norm', 'OpenAI', 'SpaceX'];
  const vals = [4, 20, 25, 35, 100];
  const cols = [C.gray, C.blue, C.gray, C.blue, C.red];
  const yMin = 0, yMax = 110;
  const y = (v) => YB - ((v - yMin) / (yMax - yMin)) * PH;
  const slot = PW / labels.length, bw = 78;
  const cx = (i) => ML + slot * (i + 0.5);
  let s = head('Price / sales multiple, x');
  s += yGrid(yMin, yMax, [25, 50, 75, 100], (t) => t + 'x');
  vals.forEach((v, i) => {
    s += `<rect x="${f(cx(i) - bw / 2,1)}" y="${f(y(v),1)}" width="${bw}" height="${f(YB - y(v),1)}" fill="${cols[i]}"/>`;
    s += `<text x="${f(cx(i),1)}" y="${f(y(v) - 8,1)}" font-size="13" font-weight="600" fill="${C.ink}" text-anchor="middle">${v}x</text>`;
    s += `<text x="${f(cx(i),1)}" y="${YB + 22}" font-size="12" fill="${C.muted}" text-anchor="middle">${esc(labels[i])}</text>`;
  });
  s += `<rect x="${ML + PW - 250}" y="${MT - 2}" width="12" height="12" fill="${C.gray}"/><text x="${ML + PW - 234}" y="${MT + 9}" font-size="12" fill="${C.muted}">Market reference</text>`;
  s += `<rect x="${ML + PW - 120}" y="${MT - 2}" width="12" height="12" fill="${C.blue}"/><text x="${ML + PW - 104}" y="${MT + 9}" font-size="12" fill="${C.muted}">AI / SpaceX</text>`;
  return s + foot();
}

const charts = {
  'spacex-ipo-price-en.svg': chartPrice(),
  'spacex-ipo-revenue-en.svg': chartRevenue(),
  'spacex-ipo-valuation-en.svg': chartValuation(),
  'spacex-ipo-sector-en.svg': chartSector(),
  'spacex-ipo-multiples-en.svg': chartMultiples(),
};

fs.mkdirSync(OUT, { recursive: true });
for (const [name, svg] of Object.entries(charts)) {
  fs.writeFileSync(path.join(OUT, name), svg, 'utf-8');
  console.log('wrote', name, svg.length, 'bytes');
}
console.log('done');
