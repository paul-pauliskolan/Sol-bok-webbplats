#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "..", "data", "pauli-sol-planner.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

function compact(text) {
  return text.replace(/[.!?]+$/, "").replace(/^Eleven kan\s+/i, "");
}

function variant(item, kind) {
  const goal = compact(item.goal);
  const difficulty = compact(item.likelyDifficulty);
  if (kind === "inquiry") {
    return {
      id: `${item.id}-undersokande`,
      approach: "Undersökande verkstad",
      title: `Undersök, jämför och dra slutsats: ${item.lesson.title}`,
      duration: "70 minuter",
      goal: item.goal,
      materials: ["Två kontrasterande fall eller datamängder", "Observationsblad", "Gemensam resultattavla"],
      sequence: [
        { title: "Förutsäg", time: "10 minuter", teacherAction: `Visa två fall kopplade till ”${item.text}” utan att förklara skillnaden.`, studentAction: "Gör en individuell förutsägelse och ange vilket tidigare kunnande den bygger på.", evidence: "En individuell förutsägelse med motivering." },
        { title: "Undersök", time: "25 minuter", teacherAction: `Ge grupperna ett avgränsat test som kan synliggöra om ${difficulty.toLowerCase()}.`, studentAction: "Samla observationer eller lösningar, ändra en faktor i taget och dokumentera avvikelser.", evidence: "En gemensam tabell med observationer och en markerad avvikelse." },
        { title: "Jämför", time: "20 minuter", teacherAction: `Samla gruppernas resultat och styr jämförelsen mot målet att ${goal}.`, studentAction: "Jämför sitt resultat med ett kontrasterande fall och revidera den första förutsägelsen.", evidence: "En reviderad förklaring som hänvisar till ett resultat." },
        { title: "Dra egen slutsats", time: "15 minuter", teacherAction: "Ge ett nytt närliggande fall utan gruppstöd.", studentAction: "Gör en individuell tillämpning och anger vad som skulle kunna kullkasta slutsatsen.", evidence: item.lesson.check },
      ],
      teacherQuestions: ["Vilket resultat skiljer fallen åt?", "Vilken slutsats stöds – och vilken stöds inte?", item.lesson.check],
      expectedEvidence: `Eleven använder observation, beräkning eller textbelägg för att visa att eleven kan ${goal}.`,
      commonDifficulty: item.likelyDifficulty,
      adjustment: `Om resultaten är korrekta men slutsatsen saknar belägg, jämför två elevsvar och modellera länken resultat–slutsats. Om själva resultaten är osäkra, gör om ett mindre test gemensamt.`,
      delayedFollowUp: item.lesson.delayedCheck,
      transferTask: item.transferTask,
      solMethods: ["Aktivering av förkunskaper", "Kontrasterande exempel", "Självförklaring", "Kontroll av förståelse"],
    };
  }
  return {
    id: `${item.id}-fall`,
    approach: "Fallstudie och beslut",
    title: `Fatta ett välgrundat beslut: ${item.lesson.title}`,
    duration: "70 minuter",
    goal: item.goal,
    materials: ["Ett autentiskt eller realistiskt fall", "Beslutsunderlag i korta delar", "Individuell beslutsmall"],
    sequence: [
      { title: "Ta ställning", time: "10 minuter", teacherAction: `Presentera ett konkret dilemma där ”${item.text}” behövs för ett beslut.`, studentAction: "Väljer preliminärt handlingsalternativ och skriver ett skäl utan hjälpmedel.", evidence: "Ett första individuellt beslut som synliggör förkunskaper." },
      { title: "Granska underlag", time: "20 minuter", teacherAction: "Dela ut underlaget i två omgångar och stanna efter varje del för en ny bedömning.", studentAction: "Markerar vilka uppgifter som är relevanta, osäkra eller saknas och uppdaterar beslutet.", evidence: "En spårbar ändring mellan första och andra beslutet." },
      { title: "Pröva motargument", time: "20 minuter", teacherAction: `Tilldela ett motargument som bygger på risken att ${difficulty.toLowerCase()}.`, studentAction: "Försvarar eller ändrar beslutet med ett specifikt belägg och bemöter motargumentet.", evidence: "En belägg–invändning–slutsats-kedja." },
      { title: "Individuell rekommendation", time: "20 minuter", teacherAction: "Tar bort gruppstödet och ger en förändrad förutsättning i fallet.", studentAction: "Skriver en villkorad rekommendation och anger vilket nytt belägg som skulle ändra den.", evidence: item.lesson.check },
    ],
    teacherQuestions: ["Vilken uppgift är avgörande för beslutet?", "Vad skulle få dig att ändra ståndpunkt?", item.lesson.check],
    expectedEvidence: `Eleven väljer, motiverar och omprövar ett beslut på ett sätt som visar att eleven kan ${goal}.`,
    commonDifficulty: item.likelyDifficulty,
    adjustment: "Om ståndpunkter saknar belägg, begränsa underlaget och modellera en enda beläggskedja. Om beläggen används väl, lägg till en målkonflikt eller osäker uppgift.",
    delayedFollowUp: item.lesson.delayedCheck,
    transferTask: item.transferTask,
    solMethods: ["Aktiv återkallning", "Variation", "Självförklaring", "Överföring"],
  };
}

let count = 0;
for (const subject of data.subjects) {
  for (const level of subject.levels) {
    for (const item of level.centralContent) {
      item.lessonVariants = [variant(item, "inquiry"), variant(item, "case")];
      count += 2;
    }
  }
}

data.metadata.updated = new Date().toISOString().slice(0, 10);
fs.writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Skapade ${count} alternativa lektionsupplägg.`);
