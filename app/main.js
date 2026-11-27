// NusaData router and control wiring. Hash routes keep every page reachable
// by a link and working from a plain static server with no rewrites.
import { overviewPage, peoplePage, economyPage, pricesPage, welfarePage, provincesPage, provinceRow, methodPage } from './views.js';
import { GROWTH_SERIES, PER_CAPITA_SERIES, PROVINCES } from './data.js';
import { barChart, lineChart } from './charts.js';

const ROUTES = {
  '/': overviewPage, '/people': peoplePage, '/economy': economyPage,
  '/prices': pricesPage, '/welfare': welfarePage, '/provinces': provincesPage,
  '/method': methodPage,
};

const app = document.getElementById('app');

function currentRoute() {
  const hash = window.location.hash.replace(/^#/, '');
  return ROUTES[hash] ? hash : '/';
}

function render() {
  const route = currentRoute();
  app.innerHTML = ROUTES[route]();
  document.querySelectorAll('.nav a').forEach((a) => {
    a.classList.toggle('active', a.getAttribute('href') === `#${route}`);
  });
  window.scrollTo(0, 0);
  if (route === '/economy') wireEconomy();
  if (route === '/provinces') wireProvinces();
}

function wireEconomy() {
  const chartBox = document.getElementById('econ-chart');
  const title = document.getElementById('econ-chart-title');
  const caption = document.getElementById('econ-caption');
  document.querySelectorAll('[data-econ]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-econ]').forEach((b) => b.classList.toggle('active', b === btn));
      if (btn.dataset.econ === 'percapita') {
        chartBox.innerHTML = lineChart(PER_CAPITA_SERIES, 'usd', { title: 'GDP per capita', unit: '', includeZero: false, digits: 0, labelEvery: 1 });
        title.textContent = 'GDP per capita, current US$';
        caption.textContent = 'GDP per person in current US dollars; the 2020 dip is the pandemic year. Source: BPS national accounts.';
      } else {
        chartBox.innerHTML = barChart(GROWTH_SERIES, 'pct', { title: 'real GDP growth', unit: '%', digits: 2 });
        title.textContent = 'Real GDP growth, % a year';
        caption.textContent = 'Real GDP growth by year. Source: BPS national accounts, 2024 release.';
      }
    });
  });
}

const provState = { query: '', island: '', sort: 'population', dir: -1 };

function drawProvinces() {
  const body = document.getElementById('prov-body');
  const count = document.getElementById('prov-count');
  if (!body) return;
  let rows = PROVINCES.filter((p) =>
    (!provState.island || p.island === provState.island) &&
    (!provState.query || `${p.name} ${p.capital}`.toLowerCase().includes(provState.query)));
  rows = [...rows].sort((a, b) => {
    const av = a[provState.sort], bv = b[provState.sort];
    return (typeof av === 'string' ? av.localeCompare(bv) : av - bv) * provState.dir;
  });
  body.innerHTML = rows.map((p, i) => provinceRow(p, i + 1)).join('') ||
    '<tr><td colspan="6">No province matches that search — try another name or clear the island filter.</td></tr>';
  count.textContent = `${rows.length} of ${PROVINCES.length} provinces shown`;
}

function wireProvinces() {
  drawProvinces();
  document.getElementById('prov-search').addEventListener('input', (e) => {
    provState.query = e.target.value.trim().toLowerCase(); drawProvinces();
  });
  document.getElementById('prov-island').addEventListener('change', (e) => {
    provState.island = e.target.value; drawProvinces();
  });
  document.querySelectorAll('.th-sort').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (provState.sort === btn.dataset.sort) provState.dir *= -1;
      else { provState.sort = btn.dataset.sort; provState.dir = btn.dataset.sort === 'name' ? 1 : -1; }
      drawProvinces();
    });
  });
}

window.addEventListener('hashchange', render);
render();
