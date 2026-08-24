#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { applyPlanningStructure } = require("./planning_structure");
const dataPath = path.join(__dirname, "..", "data", "pauli-sol-planner.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

for (const subject of data.subjects) {
  for (const level of subject.levels) {
    for (const item of level.centralContent) applyPlanningStructure(subject, level, item);
  }
}

fs.writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`);
console.log("Strukturerade 88 konkreta undervisningsförslag med separat SoL-analys.");
