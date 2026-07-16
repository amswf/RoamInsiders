import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const [airportsPath, countriesPath, outputPath] = process.argv.slice(2);

if (!airportsPath || !countriesPath || !outputPath) {
  throw new Error("Usage: node scripts/build-airport-data.mjs airports.csv countries.csv output.json");
}

function parseCsv(source) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (character === '"') {
      if (quoted && source[index + 1] === '"') {
        field += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      row.push(field);
      field = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && source[index + 1] === "\n") index += 1;
      row.push(field);
      if (row.some(Boolean)) rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function records(path) {
  const [header, ...rows] = parseCsv(readFileSync(path, "utf8"));
  return rows.map((row) => Object.fromEntries(header.map((key, index) => [key, row[index] || ""])));
}

const countryNames = new Map(records(countriesPath).map((country) => [country.code, country.name]));

const airports = records(airportsPath)
  .filter((airport) => airport.iata_code && airport.scheduled_service === "yes")
  .map((airport) => [
    airport.iata_code,
    airport.municipality || airport.name,
    airport.name,
    countryNames.get(airport.iso_country) || airport.iso_country,
    Number(airport.latitude_deg),
    Number(airport.longitude_deg),
  ])
  .sort((left, right) => `${left[1]} ${left[0]}`.localeCompare(`${right[1]} ${right[0]}`, "en"));

const output = {
  meta: {
    source: "OurAirports",
    sourceUrl: "https://ourairports.com/data/",
    license: "Public Domain",
    generatedAt: new Date().toISOString().slice(0, 10),
    count: airports.length,
  },
  airports,
};

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, JSON.stringify(output));
console.log(`Wrote ${airports.length} scheduled-service airports to ${outputPath}`);
