// NusaData page renderers. Each function returns the HTML for one route;
// main.js wires the controls each page declares (data attributes and ids
// are the contract between the two files).
import {
  HEADLINES, POPULATION_SERIES, GROWTH_SERIES, PER_CAPITA_SERIES,
  INFLATION_SERIES, INFLATION_GROUPS, POVERTY_SERIES, SECTOR_SHARES,
  AGE_PYRAMID, WELFARE_FACTS, TRADE_FACTS, PROVINCES, SOURCES,
} from './data.js';
import { lineChart, barChart, hbarChart, donutChart, pyramidChart } from './charts.js';

function kpiCards(facts) {
  return `<div class="kpi-grid">${facts.map((f) => `
    <article class="kpi"><p class="kpi-label">${f.label}</p><p class="kpi-value">${f.value}</p>
    <p class="kpi-note">${f.note}</p><p class="kpi-src">${f.source}</p></article>`).join('')}</div>`;
}

function figure(title, chart, caption) {
  return `<figure class="panel"><figcaption class="panel-head"><h3>${title}</h3></figcaption>${chart}<p class="caption">${caption}</p></figure>`;
}

export function overviewPage() {
  const top5 = [...PROVINCES].sort((a, b) => b.population - a.population).slice(0, 5)
    .map((p) => ({ name: p.name, population: p.population }));
  return `
  <section class="hero">
    <p class="eyebrow">Republic of Indonesia · Official statistics, one atlas</p>
    <h2>Indonesia in numbers: 281.6 million people, one economy growing at 5.03%</h2>
    <p class="lede">NusaData gathers the figures Indonesians look up most — population, prices,
    jobs, poverty and the size of the economy — from Badan Pusat Statistik (BPS), the national
    statistics office. Every number names its source and year. Pick a topic above, or start
    with the headline board.</p>
  </section>
  ${kpiCards(HEADLINES)}
  <div class="cols">
    ${figure('Population keeps climbing — 237.6M in 2010 to 281.6M in 2024',
      lineChart(POPULATION_SERIES, 'millions', { title: 'population of Indonesia', unit: 'M', includeZero: false, digits: 1, labelEvery: 2 }),
      'Mid-year population, millions. 2010 and 2020 are census counts; other years are BPS estimates and projections. Source: BPS.')}
    ${figure('The five most populous provinces hold 158.7 million people',
      hbarChart(top5, 'population', { label: 'name', unit: 'M', digits: 2, title: 'largest provinces' }),
      'Mid-2024 estimates, millions. Three of the five are on Java, which holds about 56% of all Indonesians. Source: BPS, 2024.')}
  </div>
  ${figure('Growth snapped back after 2020 and has held near 5% since',
    barChart(GROWTH_SERIES, 'pct', { title: 'real GDP growth', unit: '%', digits: 2 }),
    'Real GDP growth, percent a year. The 2020 contraction (−2.07%) is the only negative year in the series. Source: BPS national accounts.')}
  <section class="panel prose">
    <h3>How to read this atlas</h3>
    <p><strong>People</strong> covers the census, the age pyramid and where Indonesians live.
    <strong>Economy</strong> covers GDP, what each sector contributes and trade.
    <strong>Prices</strong> follows inflation month by month and group by group.
    <strong>Welfare</strong> tracks poverty, jobs, inequality, health and schooling.
    <strong>Provinces</strong> is a searchable table you can sort by population, poverty or
    development. <strong>Method &amp; sources</strong> lists every publication behind the
    figures, so nothing here asks to be taken on trust.</p>
  </section>`;
}

export function peoplePage() {
  return `
  <section class="hero"><p class="eyebrow">People</p>
  <h2>281.6 million people, a median age near 30, and a demographic window still open</h2>
  <p class="lede">Indonesia is the world's fourth most populous country. The 2020 census counted
  270.2 million people; BPS projections put the mid-2024 total at 281.6 million, growing about
  0.82% a year. The pyramid below is the 2020 census age structure — wide working-age bands are
  the demographic dividend the economy is now living through.</p></section>
  ${figure('Population pyramid, 2020 census — share of the population by age band and sex',
    pyramidChart(AGE_PYRAMID),
    'Percent of the total population in each five-year band. Bands narrow sharply after age 50; the 75+ band holds more women than men. Source: BPS Population Census 2020.')}
  <div class="cols">
    ${figure('Sixty years of growth compressed into one line: +44 million since 2010',
      lineChart(POPULATION_SERIES, 'millions', { title: 'population', unit: 'M', includeZero: false, digits: 1 }),
      'Mid-year population, millions. Source: BPS censuses and projections.')}
    <section class="panel prose">
      <h3>People facts worth knowing</h3>
      <ul class="facts">
        <li><strong>56%</strong> of Indonesians live on Java, an island with 7% of the land area.</li>
        <li><strong>58.6%</strong> live in urban areas (BPS, 2024) — up from 49.8% at the 2010 census.</li>
        <li><strong>2.1</strong> children per woman (total fertility, BPS 2024 projection) — close to replacement level.</li>
        <li><strong>38 provinces</strong> since Papua's 2022 split; West Java alone holds 50.35 million people.</li>
        <li><strong>1,340+</strong> ethnic groups were recorded by the 2010 census, speaking 700+ living languages.</li>
      </ul>
      <p>See the <a href="#/provinces">Provinces explorer</a> for population, poverty and
      development side by side, or <a href="#/welfare">Welfare</a> for health and schooling.</p>
    </section>
  </div>`;
}

export function economyPage() {
  return `
  <section class="hero"><p class="eyebrow">Economy</p>
  <h2>A Rp 22,139 trillion economy that has grown near 5% for a decade</h2>
  <p class="lede">Gross domestic product at current prices reached Rp 22,139 trillion in 2024
  (about US$ 1,396 billion). Growth of 5.03% kept the post-pandemic pattern: every year since
  2021 has landed between 3.7% and 5.3%. Use the switch on the first chart to compare growth
  with GDP per person.</p></section>
  <figure class="panel"><figcaption class="panel-head"><h3 id="econ-chart-title">Real GDP growth, % a year</h3>
    <div class="switch" role="group" aria-label="choose series">
      <button type="button" class="switch-btn active" data-econ="growth">Growth %</button>
      <button type="button" class="switch-btn" data-econ="percapita">GDP per capita, US$</button>
    </div></figcaption>
    <div id="econ-chart">${barChart(GROWTH_SERIES, 'pct', { title: 'real GDP growth', unit: '%', digits: 2 })}</div>
    <p class="caption" id="econ-caption">Real GDP growth by year. Source: BPS national accounts, 2024 release.</p></figure>
  <div class="cols">
    ${figure('What the economy is made of — share of GDP by sector, 2024',
      donutChart(SECTOR_SHARES, 'pct', { label: 'sector', title: 'GDP by sector', centerTop: 'GDP 2024', centerBottom: 'by sector' }),
      'Shares of GDP at current prices. Manufacturing is the largest single sector at 19.0%. Source: BPS national accounts, 2024.')}
    <section class="panel prose"><h3>Trade in goods, 2024</h3>${kpiCards(TRADE_FACTS)}
      <p>Indonesia has run a goods trade surplus every year since 2020. Coal, palm oil and
      iron-and-steel products lead exports; machinery and fuel lead imports. Full figures are
      listed under <a href="#/method">Method &amp; sources</a>.</p></section>
  </div>`;
}

export function pricesPage() {
  const rows = INFLATION_GROUPS.map((g) => ({ name: g.group, pct: g.pct }));
  return `
  <section class="hero"><p class="eyebrow">Prices</p>
  <h2>Inflation ended 2024 at 1.57% — the calmest year in this series</h2>
  <p class="lede">Consumer prices rose 1.57% in the year to December 2024, inside Bank
  Indonesia's 2.5% ± 1% target band and far below the 5.51% spike of 2022, when fuel-price
  adjustments fed through the basket. Personal care — driven by gold jewellery — rose fastest;
  transport prices actually fell.</p></section>
  ${figure('Inflation, December on December, % a year',
    lineChart(INFLATION_SERIES, 'pct', { title: 'inflation', unit: '%', digits: 2, labelEvery: 1 }),
    'Year-on-year consumer price inflation each December. Source: BPS consumer price index.')}
  ${figure('Where prices moved in 2024 — inflation by expenditure group, Dec 2024',
    hbarChart(rows, 'pct', { label: 'name', unit: '%', digits: 2, title: 'inflation by group' }),
    'Year-on-year change by COICOP group. Negative transport reflects cheaper air fares and fuel base effects. Source: BPS, January 2025 release.')}`;
}

export function welfarePage() {
  return `
  <section class="hero"><p class="eyebrow">Welfare</p>
  <h2>Poverty below 9%, unemployment below 5% — and a stunting fight half won</h2>
  <p class="lede">The poverty rate fell to 8.57% in September 2024 (24.06 million people), the
  lowest in this series, after a pandemic interruption. Open unemployment was 4.76% in
  February 2025. The harder problems are quieter: nearly three in five workers are informal,
  and one in five young children is stunted.</p></section>
  ${kpiCards(WELFARE_FACTS)}
  ${figure('Poverty rate, March each year — a decade of progress, one pandemic step back',
    lineChart(POVERTY_SERIES, 'pct', { title: 'poverty rate', unit: '%', digits: 2, labelEvery: 1 }),
    'Share of the population below the national poverty line, March Susenas. September 2024 read 8.57%. Source: BPS Susenas.')}`;
}

export function provinceRow(p, rank) {
  return `<tr data-name="${p.name.toLowerCase()} ${p.capital.toLowerCase()}" data-island="${p.island}">
    <td>${rank}</td><td><strong>${p.name}</strong><br><span class="muted">capital ${p.capital}</span></td>
    <td>${p.island}</td><td class="num">${p.population.toFixed(2)}</td>
    <td class="num">${p.poverty.toFixed(2)}%</td><td class="num">${p.hdi.toFixed(1)}</td></tr>`;
}

export function provincesPage() {
  return `
  <section class="hero"><p class="eyebrow">Provinces</p>
  <h2>The fourteen most populous provinces, searchable and sortable</h2>
  <p class="lede">Together these fourteen provinces hold about 221 million people — 79% of the
  country. Search by name or capital, filter by island, or click a column heading to sort.
  Jakarta pairs the smallest poverty rate of the big capitals with the highest HDI; Bali has
  the lowest poverty of all at 3.80%.</p></section>
  <section class="panel">
    <div class="controls">
      <label>Search <input type="search" id="prov-search" placeholder="e.g. Java, Medan, Bali"></label>
      <label>Island <select id="prov-island">
        <option value="">All islands</option><option>Java</option><option>Sumatra</option>
        <option>Sulawesi</option><option>Bali</option><option>Kalimantan</option></select></label>
      <p class="muted" id="prov-count"></p>
    </div>
    <div class="table-scroll"><table id="prov-table">
      <thead><tr><th>#</th>
        <th><button type="button" class="th-sort" data-sort="name">Province</button></th>
        <th>Island</th>
        <th class="num"><button type="button" class="th-sort" data-sort="population">Population, M</button></th>
        <th class="num"><button type="button" class="th-sort" data-sort="poverty">Poverty %</button></th>
        <th class="num"><button type="button" class="th-sort" data-sort="hdi">HDI</button></th></tr></thead>
      <tbody id="prov-body"></tbody>
    </table></div>
    <p class="caption">Population: BPS mid-2024 estimates. Poverty: BPS Susenas, March 2024. HDI: BPS, 2024.
    The full country has 38 provinces; this table shows the fourteen most populous.</p>
  </section>`;
}

export function methodPage() {
  const rows = SOURCES.map((s) => `<tr><td>${s.name}</td><td>${s.publisher}</td><td>${s.usedFor}</td></tr>`).join('');
  return `
  <section class="hero"><p class="eyebrow">Method &amp; sources</p>
  <h2>Where every figure comes from, and how this site is built</h2>
  <p class="lede">NusaData republishes official statistics; it does not estimate its own.
  Where a figure is rounded or an estimate, the page says so. If a number here disagrees with
  the BPS release it cites, the release wins — tell the statistics office, not us.</p></section>
  <section class="panel"><h3>Publications behind this site</h3>
    <div class="table-scroll"><table><thead><tr><th>Publication</th><th>Publisher</th><th>Used for</th></tr></thead>
    <tbody>${rows}</tbody></table></div></section>
  <section class="panel prose"><h3>Definitions that matter</h3>
    <ul class="facts">
      <li><strong>Poverty rate</strong> — share of people whose monthly per-capita expenditure falls below the BPS poverty line (food + non-food basic needs).</li>
      <li><strong>Open unemployment</strong> — share of the labour force without work but available for and seeking it (Sakernas survey).</li>
      <li><strong>HDI</strong> — BPS composite of life expectancy, schooling and adjusted per-capita expenditure; 70–79.9 counts as "high".</li>
      <li><strong>Inflation</strong> — year-on-year change in the consumer price index across 150+ surveyed cities, base 2022 = 100.</li>
    </ul>
    <h3>How the site is built</h3>
    <p>Plain static files: one HTML shell, one stylesheet, and small JavaScript modules —
    data, chart builders, page renderers and the router — with hand-drawn SVG charts and no
    framework, no build step and no network request. It works from a phone or a desktop,
    online or off.</p></section>`;
}
