// NusaData chart builders: every chart is a hand-drawn inline SVG string.
// No library, no canvas, no network — the same markup renders identically
// on a desktop and on a phone, and each chart carries its own axis labels
// and value labels so a screenshot of it stands alone.

const NS = (s) => s;

function fmt(n, digits = 0) {
  return n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

// A line/area chart for a yearly series. Points are {year, value} under the
// key the caller names; the y axis always includes zero unless told not to.
export function lineChart(points, key, opts = {}) {
  const w = 640, h = 300, padL = 52, padR = 16, padT = 18, padB = 34;
  const values = points.map((p) => p[key]);
  let min = Math.min(...values, opts.includeZero === false ? Infinity : 0);
  let max = Math.max(...values);
  if (opts.includeZero === false) { const span = max - min || 1; min -= span * 0.15; max += span * 0.1; }
  if (min === max) max = min + 1;
  const x = (i) => padL + (i / (points.length - 1)) * (w - padL - padR);
  const y = (v) => padT + (1 - (v - min) / (max - min)) * (h - padT - padB);
  const ticks = 4;
  let grid = '';
  for (let t = 0; t <= ticks; t++) {
    const v = min + ((max - min) * t) / ticks;
    grid += `<line x1="${padL}" y1="${y(v)}" x2="${w - padR}" y2="${y(v)}" class="grid"/>`
      + `<text x="${padL - 8}" y="${y(v) + 4}" class="axis end">${fmt(v, opts.digits ?? 0)}</text>`;
  }
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p[key]).toFixed(1)}`).join(' ');
  const area = `${path} L${x(points.length - 1).toFixed(1)},${y(Math.max(min, 0))} L${x(0).toFixed(1)},${y(Math.max(min, 0))} Z`;
  const dots = points.map((p, i) => `<circle cx="${x(i)}" cy="${y(p[key])}" r="3.5" class="dot"><title>${p.year}: ${fmt(p[key], opts.digits ?? 0)}${opts.unit ?? ''}</title></circle>`).join('');
  const labels = points.filter((_, i) => i % (opts.labelEvery ?? 2) === 0 || i === points.length - 1)
    .map((p) => `<text x="${x(points.indexOf(p))}" y="${h - 12}" class="axis mid">${p.year}</text>`).join('');
  const last = points[points.length - 1];
  const callout = `<text x="${x(points.length - 1)}" y="${y(last[key]) - 12}" class="callout end">${fmt(last[key], opts.digits ?? 0)}${opts.unit ?? ''}</text>`;
  return NS(`<svg viewBox="0 0 ${w} ${h}" class="chart" role="img" aria-label="${opts.title ?? 'line chart'}">${grid}<path d="${area}" class="area"/><path d="${path}" class="line"/>${dots}${labels}${callout}</svg>`);
}

// Vertical bars for a yearly series; negative values drop below the axis.
export function barChart(points, key, opts = {}) {
  const w = 640, h = 300, padL = 46, padR = 12, padT = 22, padB = 34;
  const values = points.map((p) => p[key]);
  const min = Math.min(...values, 0), max = Math.max(...values);
  const span = max - min || 1;
  const y = (v) => padT + (1 - (v - min) / span) * (h - padT - padB);
  const bw = (w - padL - padR) / points.length;
  const bars = points.map((p, i) => {
    const v = p[key];
    const top = y(Math.max(v, 0)), bottom = y(Math.min(v, 0));
    const cls = v < 0 ? 'bar neg' : 'bar';
    return `<rect x="${(padL + i * bw + bw * 0.18).toFixed(1)}" y="${top.toFixed(1)}" width="${(bw * 0.64).toFixed(1)}" height="${Math.max(bottom - top, 1).toFixed(1)}" class="${cls}"><title>${p.year}: ${fmt(v, opts.digits ?? 2)}${opts.unit ?? ''}</title></rect>`
      + `<text x="${(padL + i * bw + bw / 2).toFixed(1)}" y="${(v < 0 ? bottom + 14 : top - 6).toFixed(1)}" class="barval mid">${fmt(v, opts.digits ?? 2)}</text>`
      + `<text x="${(padL + i * bw + bw / 2).toFixed(1)}" y="${h - 12}" class="axis mid">${p.year}</text>`;
  }).join('');
  const zero = `<line x1="${padL}" y1="${y(0)}" x2="${w - padR}" y2="${y(0)}" class="zero"/>`;
  return NS(`<svg viewBox="0 0 ${w} ${h}" class="chart" role="img" aria-label="${opts.title ?? 'bar chart'}">${zero}${bars}</svg>`);
}

// Horizontal bars for ranked categories, widest first.
export function hbarChart(rows, key, opts = {}) {
  const rowH = 30, w = 640, padL = 168, padR = 58, padT = 6;
  const h = padT * 2 + rows.length * rowH;
  const max = Math.max(...rows.map((r) => Math.abs(r[key])), 1);
  const bars = rows.map((r, i) => {
    const v = r[key];
    const width = (Math.abs(v) / max) * (w - padL - padR);
    const yTop = padT + i * rowH;
    return `<text x="${padL - 10}" y="${yTop + rowH / 2 + 4}" class="axis end">${r[opts.label ?? 'name']}</text>`
      + `<rect x="${padL}" y="${yTop + 5}" width="${width.toFixed(1)}" height="${rowH - 11}" class="${v < 0 ? 'bar neg' : 'bar'}"/>`
      + `<text x="${padL + width + 8}" y="${yTop + rowH / 2 + 4}" class="barval">${fmt(v, opts.digits ?? 1)}${opts.unit ?? ''}</text>`;
  }).join('');
  return NS(`<svg viewBox="0 0 ${w} ${h}" class="chart" role="img" aria-label="${opts.title ?? 'horizontal bar chart'}">${bars}</svg>`);
}

// A donut of shares that already sum to about 100.
export function donutChart(rows, key, opts = {}) {
  const size = 300, cx = size / 2, cy = size / 2, rO = 128, rI = 78;
  let angle = -Math.PI / 2;
  const palette = ['#0e5e4a', '#c8102e', '#e8a33d', '#2e6fb7', '#6a4fa3', '#3f8f5f', '#8a6d3b', '#4d7c8a', '#b0562f', '#7a7f85'];
  const arcs = rows.map((row, i) => {
    const frac = row[key] / 100;
    const a0 = angle, a1 = angle + frac * Math.PI * 2;
    angle = a1;
    const large = frac > 0.5 ? 1 : 0;
    const p = (a, r) => `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
    return `<path d="M${p(a0, rO)} A${rO},${rO} 0 ${large} 1 ${p(a1, rO)} L${p(a1, rI)} A${rI},${rI} 0 ${large} 0 ${p(a0, rI)} Z" fill="${palette[i % palette.length]}"><title>${row[opts.label ?? 'name']}: ${row[key]}%</title></path>`;
  }).join('');
  const legend = rows.map((row, i) => `<li><span class="swatch" style="background:${palette[i % palette.length]}"></span>${row[opts.label ?? 'name']} — <strong>${row[key]}%</strong></li>`).join('');
  return `<div class="donut-wrap"><svg viewBox="0 0 ${size} ${size}" class="chart donut" role="img" aria-label="${opts.title ?? 'donut chart'}">${arcs}<text x="${cx}" y="${cy - 4}" class="donut-mid mid">${opts.centerTop ?? ''}</text><text x="${cx}" y="${cy + 20}" class="donut-sub mid">${opts.centerBottom ?? ''}</text></svg><ul class="legend">${legend}</ul></div>`;
}

// A population pyramid: male bars to the left, female to the right.
export function pyramidChart(rows) {
  const rowH = 24, w = 640, mid = w / 2, padT = 22;
  const h = padT + rows.length * rowH + 8;
  const max = Math.max(...rows.map((r) => Math.max(r.male, r.female)), 1);
  const scale = (mid - 70) / max;
  const bars = rows.map((r, i) => {
    const yTop = padT + i * rowH;
    const mw = r.male * scale, fw = r.female * scale;
    return `<rect x="${(mid - mw).toFixed(1)}" y="${yTop + 3}" width="${mw.toFixed(1)}" height="${rowH - 7}" class="bar male"/>`
      + `<rect x="${mid}" y="${yTop + 3}" width="${fw.toFixed(1)}" height="${rowH - 7}" class="bar female"/>`
      + `<text x="${mid - mw - 7}" y="${yTop + rowH / 2 + 4}" class="barval end">${r.male.toFixed(1)}</text>`
      + `<text x="${mid + fw + 7}" y="${yTop + rowH / 2 + 4}" class="barval">${r.female.toFixed(1)}</text>`
      + `<text x="${mid}" y="${yTop - 8}" class="axis mid">${i === 0 ? r.band : ''}</text>`
      + `<text x="${mid}" y="${yTop + rowH / 2 + 4}" class="band mid">${r.band}</text>`;
  }).join('');
  const heads = `<text x="${mid - 90}" y="14" class="pyr-head mid">Male %</text><text x="${mid + 90}" y="14" class="pyr-head mid">Female %</text>`;
  return NS(`<svg viewBox="0 0 ${w} ${h}" class="chart" role="img" aria-label="population pyramid">${heads}${bars}</svg>`);
}
