// NusaData — every figure shown on the site lives in this file.
// All values are published Indonesian official statistics (Badan Pusat
// Statistik, BPS) unless a row names another publisher. Each indicator
// carries its source and reference year so a reader can check it.

export const HEADLINES = [
  { label: 'Population', value: '281.6 million', note: 'Mid-2024 estimate, +0.82% in a year', source: 'BPS population projection, 2024' },
  { label: 'GDP at current prices', value: 'Rp 22,139 trillion', note: 'About US$ 1,396 billion', source: 'BPS national accounts, 2024' },
  { label: 'Economic growth', value: '5.03%', note: 'Real GDP growth, 2024', source: 'BPS national accounts, 2024' },
  { label: 'GDP per capita', value: 'Rp 78.6 million', note: 'About US$ 4,981 a person', source: 'BPS national accounts, 2024' },
  { label: 'Inflation', value: '1.57%', note: 'Consumer prices, Dec 2024 on Dec 2023', source: 'BPS consumer price index, 2024' },
  { label: 'Poverty rate', value: '8.57%', note: '24.06 million people, Sep 2024', source: 'BPS Susenas, September 2024' },
  { label: 'Open unemployment', value: '4.76%', note: 'Share of the labour force, Feb 2025', source: 'BPS Sakernas, February 2025' },
  { label: 'Human Development Index', value: '75.02', note: 'High category, up from 74.39', source: 'BPS HDI release, 2024' },
];

export const POPULATION_SERIES = [
  { year: 2010, millions: 237.6 }, { year: 2015, millions: 255.5 },
  { year: 2016, millions: 258.7 }, { year: 2017, millions: 261.9 },
  { year: 2018, millions: 265.0 }, { year: 2019, millions: 266.9 },
  { year: 2020, millions: 270.2 }, { year: 2021, millions: 272.7 },
  { year: 2022, millions: 275.8 }, { year: 2023, millions: 278.7 },
  { year: 2024, millions: 281.6 },
];

export const GROWTH_SERIES = [
  { year: 2015, pct: 4.88 }, { year: 2016, pct: 5.03 }, { year: 2017, pct: 5.07 },
  { year: 2018, pct: 5.17 }, { year: 2019, pct: 5.02 }, { year: 2020, pct: -2.07 },
  { year: 2021, pct: 3.70 }, { year: 2022, pct: 5.31 }, { year: 2023, pct: 5.05 },
  { year: 2024, pct: 5.03 },
];

export const PER_CAPITA_SERIES = [
  { year: 2019, usd: 4174 }, { year: 2020, usd: 3921 }, { year: 2021, usd: 4350 },
  { year: 2022, usd: 4798 }, { year: 2023, usd: 4919 }, { year: 2024, usd: 4981 },
];

export const INFLATION_SERIES = [
  { year: 2015, pct: 3.35 }, { year: 2016, pct: 3.02 }, { year: 2017, pct: 3.61 },
  { year: 2018, pct: 3.13 }, { year: 2019, pct: 2.72 }, { year: 2020, pct: 1.68 },
  { year: 2021, pct: 1.87 }, { year: 2022, pct: 5.51 }, { year: 2023, pct: 2.61 },
  { year: 2024, pct: 1.57 },
];

export const INFLATION_GROUPS = [
  { group: 'Personal care & other services', pct: 6.83 },
  { group: 'Food, beverages & tobacco', pct: 1.90 },
  { group: 'Education services', pct: 1.89 },
  { group: 'Health', pct: 1.79 },
  { group: 'Clothing & footwear', pct: 1.31 },
  { group: 'Housing & household fuel', pct: 0.60 },
  { group: 'Transport', pct: -0.92 },
];

export const POVERTY_SERIES = [
  { year: 2015, pct: 11.22 }, { year: 2016, pct: 10.86 }, { year: 2017, pct: 10.12 },
  { year: 2018, pct: 9.82 }, { year: 2019, pct: 9.41 }, { year: 2020, pct: 9.78 },
  { year: 2021, pct: 10.14 }, { year: 2022, pct: 9.54 }, { year: 2023, pct: 9.36 },
  { year: 2024, pct: 9.03 },
];

export const SECTOR_SHARES = [
  { sector: 'Manufacturing', pct: 19.0 },
  { sector: 'Wholesale & retail trade', pct: 13.1 },
  { sector: 'Agriculture & fisheries', pct: 12.6 },
  { sector: 'Construction', pct: 10.4 },
  { sector: 'Mining & quarrying', pct: 9.2 },
  { sector: 'Transport & warehousing', pct: 6.2 },
  { sector: 'Financial services', pct: 4.2 },
  { sector: 'Information & communication', pct: 4.0 },
  { sector: 'All other sectors', pct: 21.3 },
];

// Age structure, 2020 Population Census: share of the total population in
// each five-year band, split by sex (percent, rounded).
export const AGE_PYRAMID = [
  { band: '0–4', male: 4.3, female: 4.1 }, { band: '5–9', male: 4.4, female: 4.1 },
  { band: '10–14', male: 4.3, female: 4.1 }, { band: '15–19', male: 4.2, female: 4.1 },
  { band: '20–24', male: 4.3, female: 4.1 }, { band: '25–29', male: 4.1, female: 3.9 },
  { band: '30–34', male: 3.9, female: 3.7 }, { band: '35–39', male: 3.7, female: 3.6 },
  { band: '40–44', male: 3.5, female: 3.3 }, { band: '45–49', male: 3.1, female: 2.9 },
  { band: '50–54', male: 2.6, female: 2.5 }, { band: '55–59', male: 2.1, female: 2.1 },
  { band: '60–64', male: 1.7, female: 1.7 }, { band: '65–69', male: 1.3, female: 1.3 },
  { band: '70–74', male: 0.9, female: 0.9 }, { band: '75+', male: 1.0, female: 1.3 },
];

export const WELFARE_FACTS = [
  { label: 'Gini ratio of expenditure', value: '0.379', note: 'March 2024, 0 = perfect equality', source: 'BPS Susenas, 2024' },
  { label: 'Life expectancy at birth', value: '74.2 years', note: 'Up from 69.8 years in 2010', source: 'BPS HDI components, 2024' },
  { label: 'Mean years of schooling', value: '8.85 years', note: 'Adults 25+, junior-high level', source: 'BPS HDI components, 2024' },
  { label: 'Expected years of schooling', value: '13.21 years', note: 'For a child entering school now', source: 'BPS HDI components, 2024' },
  { label: 'Child stunting prevalence', value: '19.8%', note: 'Down from 21.6% in 2022', source: 'SSGI health survey, 2024' },
  { label: 'Adult literacy (15+)', value: '96.0%', note: 'Share able to read and write', source: 'BPS Susenas, 2023' },
  { label: 'Labour force', value: '152.1 million', note: '69.8% participation, Feb 2025', source: 'BPS Sakernas, 2025' },
  { label: 'Informal employment', value: '59.4%', note: 'Share of all workers, Feb 2024', source: 'BPS Sakernas, 2024' },
];

export const TRADE_FACTS = [
  { label: 'Exports of goods', value: 'US$ 264.7 billion', note: '2024, FOB', source: 'BPS foreign trade, 2024' },
  { label: 'Imports of goods', value: 'US$ 233.7 billion', note: '2024, CIF', source: 'BPS foreign trade, 2024' },
  { label: 'Trade surplus', value: 'US$ 31.0 billion', note: 'Fifth straight annual surplus', source: 'BPS foreign trade, 2024' },
  { label: 'Largest export', value: 'Coal & palm oil', note: 'Mineral fuels lead, then vegetable oils', source: 'BPS foreign trade, 2024' },
];

// The fourteen most populous provinces. Population is the BPS mid-2024
// estimate (millions), poverty the March 2024 rate, HDI the 2024 index.
export const PROVINCES = [
  { name: 'West Java', capital: 'Bandung', population: 50.35, poverty: 7.46, hdi: 74.2, island: 'Java' },
  { name: 'East Java', capital: 'Surabaya', population: 42.09, poverty: 9.79, hdi: 74.0, island: 'Java' },
  { name: 'Central Java', capital: 'Semarang', population: 38.28, poverty: 10.47, hdi: 73.4, island: 'Java' },
  { name: 'North Sumatra', capital: 'Medan', population: 15.59, poverty: 7.99, hdi: 72.9, island: 'Sumatra' },
  { name: 'Banten', capital: 'Serang', population: 12.43, poverty: 5.84, hdi: 73.9, island: 'Java' },
  { name: 'Jakarta', capital: 'Jakarta', population: 10.56, poverty: 4.30, hdi: 82.5, island: 'Java' },
  { name: 'South Sulawesi', capital: 'Makassar', population: 9.46, poverty: 8.06, hdi: 72.3, island: 'Sulawesi' },
  { name: 'Lampung', capital: 'Bandar Lampung', population: 9.42, poverty: 10.69, hdi: 70.5, island: 'Sumatra' },
  { name: 'South Sumatra', capital: 'Palembang', population: 8.90, poverty: 10.97, hdi: 71.7, island: 'Sumatra' },
  { name: 'Riau', capital: 'Pekanbaru', population: 6.73, poverty: 6.36, hdi: 74.0, island: 'Sumatra' },
  { name: 'Aceh', capital: 'Banda Aceh', population: 5.55, poverty: 14.23, hdi: 71.9, island: 'Sumatra' },
  { name: 'Bali', capital: 'Denpasar', population: 4.36, poverty: 3.80, hdi: 76.5, island: 'Bali' },
  { name: 'East Kalimantan', capital: 'Samarinda', population: 3.96, poverty: 5.51, hdi: 78.2, island: 'Kalimantan' },
  { name: 'DI Yogyakarta', capital: 'Yogyakarta', population: 3.76, poverty: 10.83, hdi: 81.0, island: 'Java' },
];

export const SOURCES = [
  { name: 'Population projection 2020–2050', publisher: 'BPS', usedFor: 'Population total and series, 2024' },
  { name: 'Population Census 2020 (SP2020)', publisher: 'BPS', usedFor: 'Age pyramid and 2020 totals' },
  { name: 'National accounts (PDB) quarterly release', publisher: 'BPS', usedFor: 'GDP, growth, per-capita GDP, sector shares, 2024' },
  { name: 'Consumer price index release, January 2025', publisher: 'BPS', usedFor: 'Inflation total and by group, Dec 2024' },
  { name: 'Susenas March & September 2024', publisher: 'BPS', usedFor: 'Poverty series, Gini ratio, literacy' },
  { name: 'Sakernas February 2025 & February 2024', publisher: 'BPS', usedFor: 'Unemployment, labour force, informality' },
  { name: 'Human Development Index 2024', publisher: 'BPS', usedFor: 'HDI, life expectancy, schooling' },
  { name: 'Foreign trade statistics 2024', publisher: 'BPS', usedFor: 'Exports, imports, trade balance' },
  { name: 'Indonesian Nutritional Status Survey (SSGI) 2024', publisher: 'Ministry of Health', usedFor: 'Stunting prevalence' },
];
