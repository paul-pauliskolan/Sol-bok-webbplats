#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { applyClassification } = require("./sol_taxonomy");
const { applyPlanningStructure } = require("./planning_structure");

const dataPath = path.join(__dirname, "..", "data", "pauli-sol-planner.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

const evidenceSources = [
  { title: "A Little Guide for Teachers: Cognitive Load Theory - Greg Ashman", url: "https://www.sagepub.com/shop/buy-a-book/a-little-guide-for-teachers-cognitive-load-theory-1-283309", role: "Arbetsminne, genomarbetade exempel och gradvis minskat stöd" },
  { title: "Embedded Formative Assessment, Second Edition - Dylan Wiliam", url: "https://hawkerbrownlow.com/products/embedded-formative-assessment-second-edition", role: "Kontroll av förståelse och nästa undervisningsbeslut" },
  { title: "The Science of Learning, Second Edition - Deans for Impact", url: "https://www.deansforimpact.org/resources/the-science-of-learning/", role: "Förkunskaper, minne, övning och självreglering" },
];

const methodRationale = {
  "Aktiv återkallning": "synliggör vad eleven kan hämta fram utan stöd",
  "Modellering": "gör expertens uppmärksamhet och beslut synliga",
  "Kontrasterande exempel": "synliggör skillnaden mellan närliggande fall",
  "Gradvis minskat stöd": "flyttar ansvaret stegvis till eleven",
  "Felanalys": "gör missuppfattningen till föremål för resonemang",
  "Överföring": "prövar kunskapen i en ny situation",
};

function entry(id, area, text, plan) {
  const methods = plan.methods || ["Aktiv återkallning", "Modellering", "Kontrasterande exempel", "Överföring"];
  return {
    id, area, text, goal: plan.goal,
    lesson: {
      title: plan.title,
      duration: "2 × 70 minuter",
      steps: [
        `Starta individuellt utan stöd: ${plan.recall}`,
        `Läraren modellerar och tänker högt: ${plan.model}`,
        `Eleverna arbetar parvis med stöd: ${plan.guided}`,
        `Varje elev genomför självständigt: ${plan.independent}`,
      ],
      check: plan.check,
      delayedCheck: plan.delayed,
    },
    solMethods: methods,
    sources: [],
    prerequisites: plan.pre,
    likelyDifficulty: plan.difficulty,
    exampleOrModel: plan.model,
    guidedPractice: plan.guided,
    independentPractice: plan.independent,
    contrastOrVariation: plan.contrast,
    decisionRule: `Om fler än 25 procent visar att ${plan.signal}, modellerar läraren den kritiska skillnaden igen med ett nytt exempel. Annars går gruppen vidare till överföringsuppgiften.`,
    transferTask: plan.transfer,
    methodRationale: methods.map((method) => ({ method, rationale: methodRationale[method] })),
    evidenceSources,
    reviewStatus: "Redaktionellt SoL-förslag - ej ämneslärargranskat",
  };
}

const english = [
  entry("enge1-01", "Kommunikationens innehåll", "Aktuella och bekanta ämnesområden, även med anknytning till samhälls- och arbetsliv och till elevernas utbildning.", { title: "Pitcha en teknisk lösning på engelska", goal: "Eleven kan presentera en teknisk lösning med relevant ämnesspråk och tydlig mottagaranpassning.", recall: "skriv fem engelska ord för problem, funktion, krav och nytta", model: "en kort pitch byggs från problem till lösning, belägg och nästa steg", guided: "förbättra en vag pitch genom att precisera fackord och mottagare", independent: "spela in en 90-sekunders pitch för en vald teknisk idé", check: "Kan en ny lyssnare återge problemet, lösningen och ett belägg?", delayed: "En vecka senare görs en ny pitch utan skrivmall.", pre: ["muntlig disposition", "ämnesord", "mottagare"], difficulty: "ämnesinnehållet blir allmänt och språket anpassas inte till mottagaren", signal: "eleven radar upp tekniska ord utan begriplig förklaring", contrast: "Jämför samma idé presenterad för en ingenjör och en möjlig användare.", transfer: "Förklara samma lösning i ett kort engelskt supportmeddelande." }),
  entry("enge1-02", "Reception", "Talad engelska och texter som är berättande, förklarande, diskuterande, argumenterande och rapporterande, till exempel intervjuer, reportage, manualer och enklare populärvetenskapliga texter.", { title: "Läs en populärvetenskaplig tekniktext", goal: "Eleven kan urskilja texttyp, huvudbudskap, belägg och reservationer i en engelskspråkig text.", recall: "sortera signalord för förklaring, argument och reservation", model: "ett stycke annoteras från huvudidé till belägg och försiktig slutsats", guided: "jämför en manual, ett reportage och en argumenterande text om samma teknik", independent: "skriv en källnära sammanfattning av en ny text", check: "Markera den mening som bäst bär textens huvudbudskap och motivera.", delayed: "Efter fem dagar sammanfattas en ny text utan annoteringsmall.", pre: ["huvudidé", "texttyp", "signalord"], difficulty: "eleven översätter mening för mening men rekonstruerar inte textens resonemang", signal: "sammanfattningen består av detaljer utan relation", contrast: "Jämför en korrekt detaljlista med en sammanfattning som visar relationerna.", transfer: "Använd läsmodellen på en engelskspråkig manual." }),
  entry("enge1-03", "Reception", "Sökning av innehåll i källor av olika slag och utifrån olika syften. Värdering av källornas relevans och trovärdighet.", { title: "Spåra ett tekniskt påstående", goal: "Eleven kan söka lateralt, hitta ursprungskällan och värdera relevans och trovärdighet på engelska.", recall: "skilj primärkälla, rapportering och kommentar", model: "ett viralt batteripåstående spåras tillbaka till rapportens faktiska resultat", guided: "kartlägg beroenden mellan tre engelskspråkiga webbkällor", independent: "skriv en kort source evaluation med belägg och begränsning", check: "Är källorna oberoende, och stöder originalet verkligen påståendet?", delayed: "En vecka senare granskas ett nytt AI-påstående utan källmatris.", pre: ["avsändare", "primärkälla", "relevans"], difficulty: "professionell form eller många träffar förväxlas med oberoende belägg", signal: "eleven inte kan hitta eller beskriva originalkällan", contrast: "Jämför tre återpubliceringar med två verkligt oberoende källor.", transfer: "Granska ett engelskspråkigt produktpåstående från en tillverkare.", methods: ["Aktiv återkallning", "Modellering", "Felanalys", "Överföring"] }),
  entry("enge1-04", "Produktion och interaktion", "Muntlig och skriftlig produktion och interaktion av olika slag, även i mer formella sammanhang, där eleverna instruerar, berättar, sammanfattar, förklarar, motiverar sina åsikter, värderar och diskuterar.", { title: "Tekniskt designmöte på engelska", goal: "Eleven kan föreslå, motivera, bemöta och sammanfatta beslut i ett formellt samtal.", recall: "återkalla fraser för förslag, invändning, förtydligande och sammanfattning", model: "ett designbeslut diskuteras med tydliga språkhandlingar och sakliga skäl", guided: "genomför ett rollkortssamtal med turordnings- och frasstöd", independent: "leda ett kort designmöte och skriva en beslutssammanfattning", check: "Kan eleven både utveckla eget skäl och korrekt återge någon annans?", delayed: "Nästa projektmöte genomförs med minskat frasstöd.", pre: ["samtalsstrategier", "motivering", "sammanfattning"], difficulty: "samtalet blir parallella monologer utan bemötande eller gemensamt beslut", signal: "eleven endast framför egen åsikt", contrast: "Jämför artig oenighet som utvecklar sakfrågan med en fras som bara låter formell.", transfer: "Använd strategierna i en muntlig kamratgranskning.", methods: ["Aktiv återkallning", "Modellering", "Gradvis minskat stöd", "Överföring"] }),
];

const physics = [
  entry("fysk1b-01", "Krafter och rörelse", "Likformig och likformigt accelererad rätlinjig rörelse. Krafter och impuls som orsak till förändring av hastighet och rörelsemängd.", { title: "Från rörelsediagram till kraftmodell", goal: "Eleven kan koppla position, hastighet, acceleration och resulterande kraft i flera representationer.", recall: "skissa grafer för konstant hastighet och konstant acceleration", model: "en vagnrörelse översätts mellan video, tabell, grafer och kraftdiagram", guided: "matcha rörelsefall med grafer och diagnostisera två typiska fel", independent: "analysera en ny rörelse och motivera kraftens riktning", check: "Vilken observation visar acceleration, och vad säger den om resulterande kraft?", delayed: "Efter en vecka blandas rörelsefall med och utan acceleration.", pre: ["hastighet", "acceleration", "kraft"], difficulty: "hastighet och acceleration blandas ihop och kraft antas krävas i rörelseriktningen", signal: "eleven ritar framåtriktad nettokraft vid konstant hastighet", contrast: "Jämför samma hastighet med olika acceleration och samma acceleration med olika hastighet.", transfer: "Analysera en hiss eller elcykel med samma representationskedja." }),
  entry("fysk1b-02", "Energi, energiresurser och elektromagnetism", "Energiprincipen samt begreppen arbete, effekt och verkningsgrad för att beskriva omvandling, nyttjande och lagring av energi.", { title: "Energibokföring för en elcykel", goal: "Eleven kan avgränsa ett system, beräkna energi och effekt samt förklara verkningsgrad utan att energi försvinner.", recall: "ange enheter och relationer för energi, arbete, effekt och verkningsgrad", model: "en elcykels energikedja ritas och beräknas med tydlig systemgräns", guided: "felsök energidiagram där värme felaktigt saknas", independent: "beräkna räckvidd och ange modellens antaganden", check: "Var finns den energi som inte blir önskad rörelse?", delayed: "Senare analyseras en vattenkokare med samma energibokföring.", pre: ["energi", "arbete", "procent"], difficulty: "verkningsgrad tolkas som att energi försvinner och systemgränsen förblir oklar", signal: "energisumman inte bevaras i elevens modell", contrast: "Jämför nyttig energi med total energi och visa båda i ett Sankeydiagram.", transfer: "Jämför energikedjor för batterilagring och vätgas." }),
  entry("fysk1b-03", "Energi, energiresurser och elektromagnetism", "Elektrisk laddning och elektriska fält samt spänning, ström och resistans. Elektriska kretsar och tillämpningar.", { title: "Kretsen före formeln", goal: "Eleven kan förutsäga och förklara ström och spänning i serie- och parallellkretsar.", recall: "rita en sluten krets och markera var ström respektive spänning mäts", model: "en krets analyseras kvalitativt före Ohms lag och beräkning", guided: "jämför tre nästan lika kretsar och förutsäg mätvärden före simulering", independent: "konstruera en krets som uppfyller givna krav och verifiera den", check: "Förutsäg vilket mätvärde som ändras innan komponenten kopplas om.", delayed: "Efter fem dagar felsöks en okänd krets utan kopplingsmall.", pre: ["laddning", "potentialskillnad", "sluten krets"], difficulty: "ström förbrukas av komponenter eller spänning och ström behandlas som samma storhet", signal: "eleven förutsäger mindre ström efter en seriekopplad lampa", contrast: "Jämför vattenflödesanalogins användbara delar med de delar där den blir missvisande.", transfer: "Dimensionera en enkel LED-krets med säkerhetsmotstånd.", methods: ["Aktiv återkallning", "Kontrasterande exempel", "Felanalys", "Överföring"] }),
  entry("fysk1b-04", "Fysikens arbetsmetoder", "Insamling av data från observationer, mätningar och simuleringar. Formulering av frågeställningar samt planering, riskbedömning och utförande av systematiska undersökningar. Bearbetning av data, värdering av metod och resultat samt redovisning med olika uttrycksformer.", { title: "Bestäm g och granska mätningen", goal: "Eleven kan planera en systematisk undersökning, analysera mätdata och värdera osäkerhet och metod.", recall: "skilj slumpmässigt fel, systematiskt fel och variation", model: "en fallrörelsemätning planeras från fråga till graf, regression och slutsats", guided: "jämför två datamängder och identifiera vilken metodskillnad som förklarar avvikelsen", independent: "genomför mätning, redovisa osäkerhet och föreslå en prioriterad förbättring", check: "Vilket belägg stöder slutsatsen och vilken felkälla påverkar mest?", delayed: "Två veckor senare planeras en ny undersökning utan färdig metodmall.", pre: ["variabel", "graf", "mätnoggrannhet"], difficulty: "många mätningar antas automatiskt ge ett korrekt resultat och felkällor listas utan konsekvens", signal: "eleven inte kan koppla osäkerhet till slutsatsens räckvidd", contrast: "Jämför hög precision med låg riktighet och tvärtom.", transfer: "Använd samma granskningsram på data från en simulering.", methods: ["Aktiv återkallning", "Modellering", "Felanalys", "Överföring"] }),
];

function upsertSubject(subject) {
  const existingIndex = data.subjects.findIndex((item) => item.id === subject.id);
  if (existingIndex === -1) data.subjects.push(subject);
  else data.subjects[existingIndex] = subject;
  for (const level of subject.levels) {
    for (const item of level.centralContent) {
      applyClassification(item);
      applyPlanningStructure(subject, level, item);
    }
  }
}

upsertSubject({ id: "engelska", name: "Engelska", subjectCode: "ENGE", levels: [{ id: "enge-1", name: "Nivå 1", levelCode: "ENGE1000X", points: 100, status: "Redaktionellt piloturval", sourceUrl: "https://syllabuswebb.skolverket.se/syllabuscw/jsp/subject.htm?subjectCode=ENGE&tos=gy", centralContent: english }] });
upsertSubject({ id: "fysik", name: "Fysik", subjectCode: "FYSK", levels: [{ id: "fysk-1b", name: "Nivå 1b", levelCode: "FYSK1B00X", points: 150, status: "Redaktionellt piloturval", sourceUrl: "https://syllabuswebb.skolverket.se/syllabuscw/jsp/subject.htm?subjectCode=FYSK&tos=gy", centralContent: physics }] });

data.metadata.updated = new Date().toISOString().slice(0, 10);
fs.writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`);
console.log("Lade till Engelska nivå 1 och Fysik nivå 1b med åtta planeringsidéer.");
