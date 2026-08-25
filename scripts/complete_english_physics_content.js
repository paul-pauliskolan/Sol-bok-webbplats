#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { applyClassification } = require("./sol_taxonomy");
const { applyPlanningStructure } = require("./planning_structure");

const dataPath = path.join(__dirname, "..", "data", "pauli-sol-planner.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

const official = {
  engelska: {
    levelId: "enge-1",
    items: [
      ["Kommunikationens innehåll", "Aktuella och bekanta ämnesområden, även med anknytning till samhälls- och arbetsliv och till elevernas utbildning."],
      ["Kommunikationens innehåll", "Händelser och händelseförlopp."],
      ["Kommunikationens innehåll", "Åsikter, tankar och erfarenheter samt relationer och etiska frågor."],
      ["Kommunikationens innehåll", "Innehåll och form i olika typer av fiktion."],
      ["Kommunikationens innehåll", "Aktuella händelser, sociala och kulturella företeelser och förhållanden samt värderingar i olika sammanhang och områden där engelska används, även i jämförelse med egna erfarenheter och kunskaper."],
      ["Kommunikationens innehåll", "Engelska språkets ställning i världen."],
      ["Reception", "Talad engelska i varierande tempo, även med inslag av dialektal och sociolektal variation, och texter, däribland texter av mindre komplex karaktär, från olika medier."],
      ["Reception", "Talad engelska och texter som är berättande, förklarande, diskuterande, argumenterande och rapporterande, till exempel intervjuer, reportage, manualer och enklare populärvetenskapliga texter."],
      ["Reception", "Skönlitteratur och annan fiktion."],
      ["Reception", "Sånger och dikter."],
      ["Reception", "Strategier för att uppfatta detaljer och dra slutsatser om innehåll och budskap, till exempel genom att associera, återberätta, förutse innehåll och ställa sig frågor."],
      ["Reception", "Sökning av innehåll i källor av olika slag och utifrån olika syften. Värdering av källornas relevans och trovärdighet."],
      ["Reception", "Hur variation och anpassning till syfte, mottagare och sammanhang, i den engelska som eleverna möter, skapas genom meningsbyggnad, ord, fraser och kollokationer."],
      ["Reception", "Hur struktur och sammanhang, i den engelska som eleverna möter, skapas genom ord och fraser som markerar till exempel orsakssammanhang, kontrast, talarens inställning, tidsaspekt och avslutning."],
      ["Produktion och interaktion", "Språklig säkerhet i elevernas egen produktion och interaktion. Hur man kan uttrycka sig sammanhängande och med variation, tydlighet, struktur, flyt och grundläggande anpassning till syfte, mottagare och sammanhang. Uttal, vokabulär och stavning samt grammatiska strukturer, meningsbyggnad och textbindning."],
      ["Produktion och interaktion", "Muntlig och skriftlig produktion och interaktion av olika slag, i informella och något formella sammanhang, där eleverna berättar, sammanfattar, förklarar, motiverar sina åsikter, värderar och diskuterar."],
      ["Produktion och interaktion", "Hur man skiljer mellan en källas innehåll och sina egna tankar i egen produktion och interaktion."],
      ["Produktion och interaktion", "Strategier för att bidra till och aktivt medverka i diskussioner och skriftlig interaktion med anknytning till samhälls- och arbetsliv, till exempel genom att ställa följdfrågor, formulera om, förklara och bidra med nya infallsvinklar."],
      ["Produktion och interaktion", "Bearbetning av egna muntliga och skriftliga framställningar."],
    ],
  },
  fysik: {
    levelId: "fysk-1b",
    items: [
      ["Krafter och rörelse", "Likformig och likformigt accelererad rätlinjig rörelse. Krafter och impuls som orsak till förändring av hastighet och rörelsemängd."],
      ["Krafter och rörelse", "Vridmoment för att beskriva jämviktstillstånd."],
      ["Krafter och rörelse", "Jämvikt och linjär rörelse i homogena gravitationsfält och elektriska fält."],
      ["Krafter och rörelse", "Tryck, tryckvariationer och Arkimedes princip. Allmänna gaslagen."],
      ["Energi, energiresurser och elektromagnetism", "Olika energiformer, däribland mekanisk energi, elektrisk energi och kärnenergi."],
      ["Energi, energiresurser och elektromagnetism", "Energiprincipen samt begreppen arbete, effekt och verkningsgrad för att beskriva omvandling, nyttjande och lagring av energi. Hållbar energiresursanvändning."],
      ["Energi, energiresurser och elektromagnetism", "Huvuddragen inom det elektromagnetiska spektrumet."],
      ["Energi, energiresurser och elektromagnetism", "Elektrisk laddning och elektriska fält samt spänning, ström och resistans. Elektriska kretsar och tillämpningar av dessa."],
      ["Energi, energiresurser och elektromagnetism", "Termisk energi, värme, temperatur och fasomvandlingar."],
      ["Universum, materien och strålning", "Huvuddragen i standardmodellen."],
      ["Universum, materien och strålning", "Kärnreaktioner, fusion och fission, bindningsenergi och massaenergiekvivalensen."],
      ["Universum, materien och strålning", "Radioaktivt sönderfall, joniserande strålning, halveringstid, aktivitet och stråldos."],
      ["Universum, materien och strålning", "Tillämpningar av strålning inom medicin och teknik."],
      ["Fysiken i omvärlden", "Fysikens betydelse för vetenskap, individ och samhälle med exempel från historiska och aktuella händelser."],
      ["Fysiken i omvärlden", "Frågor om etik och hållbar utveckling med koppling till fysik."],
      ["Fysikens arbetsmetoder", "Laborationer och experiment. Insamling av data från observationer, mätningar och simuleringar. Formulering av frågeställningar samt planering, riskbedömning och utförande av systematiska undersökningar. Bearbetning av data, värdering av metod och resultat samt redovisning med olika uttrycksformer."],
      ["Fysikens arbetsmetoder", "Beräkningar, regressionsanalys och analys av grafer. Storleksuppskattningar, enhetsanalys och mätnoggrannhet."],
      ["Fysikens arbetsmetoder", "Fysikaliska och matematiska modeller som beskrivningar av verkligheten. Modellers och teoriers giltighet samt det experimentella arbetets betydelse för deras utveckling över tid."],
      ["Fysikens arbetsmetoder", "Granskning av information och argumentation som rör fysik. Skillnader mellan vetenskapliga och icke-vetenskapliga påståenden."],
    ],
  },
};

const evidenceSources = [
  { title: "A Little Guide for Teachers: Cognitive Load Theory - Greg Ashman", url: "https://www.sagepub.com/shop/buy-a-book/a-little-guide-for-teachers-cognitive-load-theory-1-283309", role: "Arbetsminne, genomarbetade exempel och gradvis minskat stöd" },
  { title: "Embedded Formative Assessment, Second Edition - Dylan Wiliam", url: "https://hawkerbrownlow.com/products/embedded-formative-assessment-second-edition", role: "Kontroll av förståelse och nästa undervisningsbeslut" },
  { title: "The Science of Learning, Second Edition - Deans for Impact", url: "https://www.deansforimpact.org/resources/the-science-of-learning/", role: "Förkunskaper, minne, övning och självreglering" },
];

const methodRationale = {
  "Aktiv återkallning": "synliggör vilka nödvändiga förkunskaper som kan hämtas fram utan stöd",
  "Modellering": "gör lärarens uppmärksamhet, val och kontroll synliga",
  "Kontrasterande exempel": "synliggör den avgörande skillnaden mellan närliggande fall",
  "Överföring": "prövar om kunnandet kan användas i en förändrad situation",
};

function shortTopic(text) {
  const first = text.split(/[.!?]/)[0].trim();
  return first.length > 72 ? `${first.slice(0, 69).trim()}…` : first;
}

function createItem(subject, id, area, text) {
  const english = subject.id === "engelska";
  const topic = shortTopic(text);
  const goal = english
    ? `Eleven kan förstå, använda och förklara centrala språkliga val inom området ${topic.toLowerCase()}.`
    : `Eleven kan använda relevanta fysikaliska begrepp, representationer och belägg för att förklara ${topic.toLowerCase()}.`;
  const difficulty = english
    ? "Eleven känner igen innehållet men kan inte själv välja språk, strategi eller belägg för syfte och mottagare."
    : "Eleven väljer en formel eller vardagsförklaring utan att koppla samman fysikalisk modell, enheter och observerbara belägg.";
  const methods = ["Aktiv återkallning", "Modellering", "Kontrasterande exempel", "Överföring"];
  return {
    id, area, text, goal,
    lesson: {
      title: english ? `Språkverkstad: ${topic}` : `Fysikverkstad: ${topic}`,
      duration: "2 × 70 minuter",
      steps: [
        `Starta med en individuell återkallning av tre begrepp, exempel eller strategier som behövs för ${topic.toLowerCase()}.`,
        `Läraren tänker högt genom ett fullständigt exempel och markerar de avgörande valen inom ${topic.toLowerCase()}.`,
        `Eleverna jämför ett fungerande exempel med ett närliggande icke-exempel och motiverar skillnaden.`,
        `Varje elev löser eller producerar ett nytt exempel utan stödmall och förklarar sitt val.`,
      ],
      check: `Ge ett nytt kort fall. Eleven ska själv välja relevant begrepp eller strategi för ${topic.toLowerCase()} och motivera valet.`,
      delayedCheck: `En vecka senare återkommer ${topic.toLowerCase()} i ett nytt sammanhang utan den ursprungliga stödmallen.`,
    },
    solMethods: methods,
    sources: [],
    prerequisites: english ? ["relevant basordförråd", "huvudbudskap", "syfte och mottagare"] : ["storhet och enhet", "orsak och verkan", "graf- eller modelläsning"],
    likelyDifficulty: difficulty,
    exampleOrModel: `Ett genomarbetat exempel som synliggör beslut och kontroll inom ${topic.toLowerCase()}.`,
    guidedPractice: `Ett kontrasterande exempel och icke-exempel inom ${topic.toLowerCase()}.`,
    independentPractice: `En ny individuell uppgift som kräver val och motivering inom ${topic.toLowerCase()}.`,
    contrastOrVariation: `Jämför två ytlika fall där endast det ena uppfyller de avgörande villkoren för ${topic.toLowerCase()}.`,
    decisionRule: "Om fler än 25 procent inte kan motivera valet, modellerar läraren den kritiska skillnaden igen med ett nytt exempel. Annars går gruppen vidare till överföring.",
    transferTask: english
      ? `Använd samma kunnande om ${topic.toLowerCase()} i ett nytt socialt, kulturellt, litterärt eller vardagligt sammanhang.`
      : `Använd samma kunnande om ${topic.toLowerCase()} i ett nytt naturvetenskapligt, samhälleligt eller vardagligt sammanhang.`,
    methodRationale: methods.map((method) => ({ method, rationale: methodRationale[method] })),
    evidenceSources,
    reviewStatus: "Redaktionellt SoL-förslag - ej ämneslärargranskat",
  };
}

for (const [subjectId, spec] of Object.entries(official)) {
  const subject = data.subjects.find((entry) => entry.id === subjectId);
  const level = subject?.levels.find((entry) => entry.id === spec.levelId);
  if (!subject || !level) throw new Error(`Saknar ${subjectId}/${spec.levelId}`);
  const existing = new Map(level.centralContent.map((item) => [item.text, item]));
  const prefix = subjectId === "engelska" ? "enge1" : "fysk1b";
  level.centralContent = spec.items.map(([area, text], index) => {
    const item = subjectId === "engelska"
      ? createItem(subject, `${prefix}-${String(index + 1).padStart(2, "0")}`, area, text)
      : existing.get(text) || createItem(subject, `${prefix}-${String(index + 1).padStart(2, "0")}`, area, text);
    item.id = `${prefix}-${String(index + 1).padStart(2, "0")}`;
    item.area = area;
    item.text = text;
    delete item.lessonVariants;
    applyClassification(item, true);
    applyPlanningStructure(subject, level, item);
    return item;
  });
  level.status = "Fullständigt centralt innehåll · redaktionella planeringsförslag";
}

data.metadata.updated = new Date().toISOString().slice(0, 10);
data.metadata.centralContentAudit = "Kontrollerat mot Skolverkets officiella Gy25-ämnesplaner 2026-08-25.";
fs.writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`);
console.log("Engelska nivå 1 och Fysik nivå 1b innehåller nu samtliga 19 officiella punkter vardera.");
