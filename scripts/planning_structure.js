const phaseForPrinciple = {
  "Aktiv återkallning": "Moment 1 – start och individuell återkallning",
  "Aktivering av förkunskaper": "Moment 1 – start och synliggörande av förkunskaper",
  "Segmentering": "Hela lektionsgången – innehållet delas i fyra avgränsade moment",
  "Dubbelkodning": "Moment 2 – lärarens modell kombinerar ord med relevant representation",
  "Genomarbetade exempel": "Moment 2 – läraren visar ett fullständigt exempel och sina beslut",
  "Gradvis minskat stöd": "Moment 2–4 – modell följs av guidad och sedan självständig tillämpning",
  "Exempel och icke-exempel": "Moment 2–3 – relevanta fall jämförs med tydliga gränsfall",
  "Kontrasterande exempel": "Moment 3 – eleverna jämför fall som kräver olika slutsatser eller val",
  "Självförklaring": "Moment 3–4 – eleverna motiverar steg, val och slutsatser",
  "Blandad övning": "Moment 3–4 – närliggande problem blandas så att metod måste väljas",
  "Variation": "Moment 3–4 – samma struktur prövas med förändrade ytdrag eller villkor",
  "Kontroll av förståelse": "Moment 4 – alla lämnar ett individuellt belägg före nästa beslut",
  "Återkoppling": "Moment 3–4 – responsen riktas mot nästa konkreta förbättring",
  "Utspridd övning": "Efter lektionen – innehållet återkallas efter ett tidsmellanrum"
};

function materialsFor(subject, item) {
  const haystack = `${item.area} ${item.text} ${item.lesson.title}`.toLowerCase();
  const materials = ["Projektor eller skrivtavla", "Individuella svarsblad eller digital avslutningsfråga"];
  if (subject.id === "matematik") materials.push("Räknare eller relevant digitalt matematikverktyg", "Förberedda uppgiftskort med lösningsutrymme");
  if (subject.id === "svenska") materials.push("Korta numrerade textutdrag", "Antecknings- och responsmall");
  if (subject.id === "teknik") materials.push("Krav-, test- eller dokumentationsmall", "Skissmaterial eller relevant digitalt teknikverktyg");
  if (/programmer|kod|algoritm/.test(haystack)) materials.push("Dator med kodmiljö och färdiga testdata");
  if (/ritning|cad|modell/.test(haystack)) materials.push("Exempelmodell eller ritning med avsiktliga tolkningsproblem");
  if (/statistik|regression|normalfördel|data/.test(haystack)) materials.push("Förberedd datamängd i kalkylblad");
  if (/litter|skönlitter|sakprosa|text/.test(haystack)) materials.push("Ett fungerande och ett problematiskt textexempel");
  if (/prototyp|material|konstruk|bro|sensor/.test(haystack)) materials.push("Materialprov, prototypdelar eller simulerade mätvärden");
  return [...new Set(materials)];
}

function actionText(step) {
  return step.replace(/^(Starta med att |Starta med en individuell återkallning: |Aktivera förkunskaper genom att |Läraren tänker högt i ett genomarbetat exempel: |Läraren |Eleverna arbetar parvis med stöd: |Eleverna |Varje elev genomför självständigt: |Låt par |Låt grupper )/i, "");
}

function scheduleFor(duration) {
  if (duration === "2 × 70 minuter") return ["15 minuter", "30 minuter", "45 minuter", "50 minuter"];
  if (duration === "70 minuter") return ["10 minuter", "15 minuter", "25 minuter", "20 minuter"];
  if (duration === "4–6 lektioner") return ["20 minuter", "1 lektion", "2–3 lektioner", "1–2 lektioner"];
  if (duration === "2–3 lektioner") return ["15 minuter", "30 minuter", "1 lektion", "1 lektion"];
  return ["10 minuter", "20 minuter", "30 minuter", "20 minuter"];
}

function buildImplementation(subject, level, item) {
  const steps = item.lesson.steps;
  const schedule = scheduleFor(item.lesson.duration);
  const titles = ["Start och förkunskaper", "Lärarens modell", "Guidad bearbetning", "Självständig tillämpning"];
  const teacherActions = [
    `Visa startuppgiften utan facit. Ge tyst betänketid och samla svar från samtliga innan diskussionen börjar. Uppgiften är: ${actionText(steps[0])}`,
    `Genomför exemplet stegvis och tänk högt om vad som uppmärksammas, vilket val som görs och hur valet kontrolleras: ${actionText(steps[1] || steps[0])}`,
    `Fördela den guidade uppgiften, stanna vid den kritiska skillnaden och begär motivering före besked om rätt svar: ${actionText(steps[2] || steps[1])}`,
    `Ta bort stödmallen och ge den självständiga uppgiften. Samla ett svar från varje elev: ${actionText(steps[3] || steps.at(-1))}`
  ];
  const studentActions = [
    `Arbeta individuellt utan stöd och lämna ett första svar: ${actionText(steps[0])}`,
    `Följ modellen, markera det avgörande beslutet och skriv en fråga om ett steg som ännu inte är tydligt.`,
    `Lös uppgiften parvis, jämför lösningarna och formulera en gemensam motivering: ${actionText(steps[2] || steps[1])}`,
    `Genomför och lämna den avslutande prestationen individuellt: ${actionText(steps[3] || steps.at(-1))}`
  ];
  const evidence = [
    "Ett individuellt startsvar som visar vilka förkunskaper som kan återkallas utan hjälp.",
    "En markering och kort förklaring av det avgörande valet i lärarens exempel.",
    `En gemensam lösning där paret kan förklara varför den fungerar trots den sannolika svårigheten: ${item.likelyDifficulty}`,
    item.lesson.check
  ];
  return {
    preparation: `Förbered ett lärarvisat exempel och en ny självständig uppgift för ”${item.lesson.title}”. Numrera materialet så att inget facit eller senare stöd syns under startuppgiften.`,
    materials: materialsFor(subject, item),
    sequence: steps.map((_, index) => ({
      title: titles[index] || `Moment ${index + 1}`,
      time: schedule[index] || "20 minuter",
      teacherAction: teacherActions[index] || `Ge instruktionen: ${actionText(steps[index])}`,
      studentAction: studentActions[index] || actionText(steps[index]),
      evidence: evidence[index] || item.lesson.check
    })),
    teacherQuestions: [
      item.lesson.check,
      `Vilket val eller textställe är avgörande för att nå målet: ${item.goal}`,
      `Hur kan du kontrollera att ditt svar inte bygger på följande vanliga svårighet: ${item.likelyDifficulty}`
    ],
    expectedEvidence: `Ett godtagbart individuellt svar visar med relevanta steg, belägg eller representationer att ${item.goal.replace(/^Eleven kan /, "eleven kan ")}`,
    commonDifficulty: item.likelyDifficulty,
    adjustment: item.decisionRule,
    delayedFollowUp: item.lesson.delayedCheck
  };
}

function buildSolAnalysis(item) {
  return item.methodRationale.map(entry => ({
    principle: entry.method,
    chapter: item.solPrincipleReferences.find(reference => reference.method === entry.method)?.chapter,
    usedIn: phaseForPrinciple[entry.method] || "I den konkreta lektionsgången",
    rationale: entry.rationale
  }));
}

function applyPlanningStructure(subject, level, item) {
  item.implementation = buildImplementation(subject, level, item);
  item.solAnalysis = buildSolAnalysis(item);
  return item;
}

module.exports = { applyPlanningStructure };
