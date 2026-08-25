#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const literaturePath = path.join(root, "litteratur.html");
const chaptersPath = path.join(root, "data", "chapters.json");

const literatureHtml = fs.readFileSync(literaturePath, "utf8");
const match = literatureHtml.match(/<section id="chapter-content">([\s\S]*?)<\/section>/);

if (!match) {
  throw new Error("Kunde inte hitta litteraturinnehållet i litteratur.html.");
}

const contentHtml = match[1]
  .trim()
  .replace(/<h4>/g, "<h3>")
  .replace(/<\/h4>/g, "</h3>");

const data = JSON.parse(fs.readFileSync(chaptersPath, "utf8"));
const chapter = {
  id: 12,
  number: 12,
  title: "Litteratur och resurser",
  titleHtml: "Litteratur och resurser",
  description: "Komplett litteratur- och resurslista för kapitel 1–10 med originalkällor, svenska innehållsbeskrivningar och läsmotiveringar.",
  sections: [
    "Forskningsrapporter, artiklar och böcker",
    "Komplett litteratur- och resurslista för kapitel 1–10",
    "Hur du använder dessa resurser",
  ],
  contentHtml,
  summary: "Välj först en översikt och gå sedan vidare till den bok, artikel, rapport eller webbresurs som bäst motsvarar ditt undervisningsproblem.",
  keyTopics: [
    "Böcker",
    "Forskningsartiklar",
    "Forskningsrapporter",
    "Webbresurser",
    "Originalkällor",
  ],
  resources: [],
  quiz: [],
};

const existingIndex = data.chapters.findIndex((entry) => entry.number === 12);
if (existingIndex === -1) {
  data.chapters.push(chapter);
} else {
  data.chapters[existingIndex] = chapter;
}
data.chapters.sort((a, b) => a.number - b.number);

fs.writeFileSync(chaptersPath, `${JSON.stringify(data, null, 2)}\n`);
console.log("Kapitel 12 synkroniserat med den kompletta litteratur- och resurslistan.");
