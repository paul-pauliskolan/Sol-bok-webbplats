const principles = {
  "Aktiv återkallning": { chapter: 4, rationale: "stärker framplockning och visar vad eleven kan återkalla utan stöd" },
  "Utspridd övning": { chapter: 5, rationale: "fördelar övningen över tid så att kunnandet behöver återhämtas på nytt" },
  "Blandad övning": { chapter: 5, rationale: "kräver att eleven urskiljer problemtypen och väljer strategi" },
  "Variation": { chapter: 5, rationale: "varierar relevanta ytdrag så att den bärande strukturen blir tydligare" },
  "Aktivering av förkunskaper": { chapter: 6, rationale: "gör relevanta förkunskaper tillgängliga och synliggör luckor före nytt innehåll" },
  "Exempel och icke-exempel": { chapter: 6, rationale: "avgränsar ett begrepp genom relevanta fall och tydliga gränsfall" },
  "Kontrasterande exempel": { chapter: 6, rationale: "synliggör den avgörande skillnaden mellan närliggande fall" },
  "Genomarbetade exempel": { chapter: 7, rationale: "minskar onödig sökning medan eleven bygger en användbar problemlösningsstruktur" },
  "Gradvis minskat stöd": { chapter: 7, rationale: "flyttar ansvaret stegvis från lärarens modell till elevens självständiga arbete" },
  "Självförklaring": { chapter: 7, rationale: "låter eleven förklara hur ett steg eller textdrag hänger ihop med en princip" },
  "Segmentering": { chapter: 3, rationale: "delar upp komplext innehåll i hanterbara delar utan att tappa helheten" },
  "Dubbelkodning": { chapter: 8, rationale: "samordnar ord med en relevant visuell representation" },
  "Kontroll av förståelse": { chapter: 9, rationale: "samlar belägg från alla elever för nästa undervisningsbeslut" },
  "Återkoppling": { chapter: 9, rationale: "ger information som eleven kan använda för att minska avståndet till målet" }
};

const mapping = {
  "Aktiv återkallning": { p: ["Aktiv återkallning"] },
  "Utspridd återkallning": { p: ["Aktiv återkallning", "Utspridd övning"] },
  "Utspridd övning": { p: ["Utspridd övning"] },
  "Blandad övning": { p: ["Blandad övning"] },
  Interleaving: { p: ["Blandad övning"] },
  Variation: { p: ["Variation"] },
  Perspektivvariation: { p: ["Variation"], a: ["Perspektivbyte"] },
  "Förkunskapsaktivering": { p: ["Aktivering av förkunskaper"] },
  "Aktivering av förkunskaper": { p: ["Aktivering av förkunskaper"] },
  "Förkunskapskontroll": { p: ["Aktivering av förkunskaper", "Kontroll av förståelse"] },
  "Exempel och icke-exempel": { p: ["Exempel och icke-exempel"] },
  "Kontrasterande exempel": { p: ["Kontrasterande exempel"] },
  "Kontrasterande modeller": { p: ["Kontrasterande exempel"], a: ["Modelljämförelse"] },
  "Kontrasterande texter": { p: ["Kontrasterande exempel"], a: ["Textjämförelse"] },
  "Genomarbetade exempel": { p: ["Genomarbetade exempel"] },
  "Genomarbetat exempel": { p: ["Genomarbetade exempel"] },
  "Worked example": { p: ["Genomarbetade exempel"] },
  "Gradvis minskat stöd": { p: ["Gradvis minskat stöd"] },
  Självförklaring: { p: ["Självförklaring"] },
  Segmentering: { p: ["Segmentering"] },
  "Dual coding": { p: ["Dubbelkodning"] },
  Dubbelkodning: { p: ["Dubbelkodning"] },
  "Kontroll av förståelse": { p: ["Kontroll av förståelse"] },
  "Övning med återkoppling": { p: ["Återkoppling"], a: ["Övning med respons"] },
  Återkoppling: { p: ["Återkoppling"] },

  Modellering: { m: ["Lärarmodellering"] },
  Lärarmodellering: { m: ["Lärarmodellering"] },
  "Tänka högt": { m: ["Tänka högt"] },
  Felanalys: { m: ["Felanalys"] },
  Felsökningsåterkoppling: { m: ["Felsökningsåterkoppling"] },
  "Completion problem": { p: ["Genomarbetade exempel"], m: ["Delvis lösta exempel"] },
  "Completion problems": { p: ["Genomarbetade exempel"], m: ["Delvis lösta exempel"] },
  "Delvis lösta exempel": { p: ["Genomarbetade exempel"], m: ["Delvis lösta exempel"] },
  Elaborering: { m: ["Elaborerande frågor"] },
  Metakognition: { m: ["Metakognitiv reflektion"] },
  "Metakognitiv kontroll": { m: ["Metakognitiv reflektion"] },
  "Metakognitiv reflektion": { m: ["Metakognitiv reflektion"] },
  Kamratförklaring: { m: ["Kamratförklaring"] },
  Kamratgranskning: { m: ["Kamratgranskning"] },
  Kamratåtergivning: { m: ["Kamratåtergivning"] },
  "Begreppsmodellering": { m: ["Begreppsmodellering"] },
  "Begreppslig precision": { m: ["Explicit begreppsundervisning"] },
  "Explicit begreppsundervisning": { m: ["Explicit begreppsundervisning"] },
  "Strukturerad jämförelse": { m: ["Strukturerad jämförelse"] },
  "Elaborerande frågor": { m: ["Elaborerande frågor"] },

  "Aktiv läsning": { a: ["Aktiv läsning"] },
  "Causal mapping": { a: ["Orsakskarta"] },
  "Förutsägelse": { a: ["Förutsägelse"] },
  "Förutsägelse före test": { a: ["Förutsägelse före test"] },
  Generalisering: { a: ["Generalisering"] },
  Genreväxling: { a: ["Genreväxling"] },
  Härledning: { a: ["Härledning"] },
  Kodspårning: { a: ["Kodspårning"] },
  "Konkret manipulation": { a: ["Konkret manipulation"] },
  "Konkret representation": { a: ["Konkret representation"] },
  "Kroppslig representation": { a: ["Kroppslig representation"] },
  Metodval: { a: ["Metodval"] },
  Närläsning: { a: ["Närläsning"] },
  "Praktisk tillämpning": { a: ["Praktisk tillämpning"] },
  Problemlösning: { a: ["Problemlösning"] },
  Rimlighetsbedömning: { a: ["Rimlighetsbedömning"] },
  Rimlighetskontroll: { a: ["Rimlighetskontroll"] },
  Simulering: { a: ["Simulering"] },
  Textbelägg: { a: ["Arbete med textbelägg"] },
  Tidslinje: { a: ["Tidslinje"] },
  Tillämpning: { a: ["Tillämpning"] },
  Överföring: { a: ["Överföringsuppgift"] },
  Överföringsövning: { a: ["Överföringsuppgift"] }
};

const unique = values => [...new Set(values)];

function classify(labels) {
  const result = { solMethods: [], teachingMethods: [], studentActivities: [] };
  for (const label of labels || []) {
    const entry = mapping[label];
    if (!entry) {
      result.studentActivities.push(label);
      continue;
    }
    result.solMethods.push(...(entry.p || []));
    result.teachingMethods.push(...(entry.m || []));
    result.studentActivities.push(...(entry.a || []));
  }
  result.solMethods = unique(result.solMethods);
  result.teachingMethods = unique(result.teachingMethods);
  result.studentActivities = unique(result.studentActivities);
  return result;
}

function applyClassification(item, force = false) {
  const alreadyClassified = Array.isArray(item.solPrincipleReferences) && Array.isArray(item.teachingMethods) && Array.isArray(item.studentActivities);
  if (!force && alreadyClassified) return item;
  const labels = alreadyClassified
    ? [...item.solMethods, ...item.teachingMethods, ...item.studentActivities]
    : item.solMethods;
  const classified = classify(labels);
  item.solMethods = classified.solMethods;
  item.teachingMethods = classified.teachingMethods;
  item.studentActivities = classified.studentActivities;
  item.solPrincipleReferences = classified.solMethods.map(method => ({ method, chapter: principles[method].chapter }));
  item.methodRationale = classified.solMethods.map(method => ({ method, rationale: principles[method].rationale }));
  return item;
}

module.exports = { principles, mapping, classify, applyClassification };
