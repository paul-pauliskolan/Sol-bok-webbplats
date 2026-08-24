#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { applyClassification } = require("./sol_taxonomy");
const dataPath = path.join(__dirname, "..", "data", "pauli-sol-planner.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

for (const subject of data.subjects) {
  for (const level of subject.levels) {
    for (const item of level.centralContent) applyClassification(item, true);
  }
}

fs.writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`);
console.log("Klassificerade SoL-principer, undervisningsmetoder och elevaktiviteter.");
