#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "..", "data", "pauli-sol-planner.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

function plan(subject, index, area, text, sourceUrl) {
  const isMath = subject === "Matematik";
  const profile = (isMath ? mathProfiles : swedishProfiles)[index];
  if (!profile) throw new Error(`Saknar unik plan för ${subject}, punkt ${index + 1}`);
  return {
    id: `${isMath ? "mate1c" : "sven1"}-${String(index + 1).padStart(2, "0")}`,
    area,
    text,
    goal: profile.goal,
    lesson: {
      title: profile.title,
      duration: profile.duration || "2 × 70 minuter",
      steps: profile.steps,
      check: profile.check,
      delayedCheck: profile.delayed
    },
    solMethods: profile.methods,
    sources: sourceUrl ? [sourceUrl] : []
  };
}

const mathProfiles = [
  {title:"Algebraverkstaden: uttryck som byggs om",goal:"Eleven kan multiplicera och faktorisera uttryck samt kontrollera att formerna är ekvivalenta.",steps:["Återkalla distributiva lagen med tal.","Bygg samma rektangelarea med två algebraiska former.","Jämför typfel som 3(x+2)=3x+2 med korrekta lösningar.","Eleverna växlar mellan utvecklad och faktoriserad form och verifierar med insatta värden."],check:"Faktorisera ett nytt uttryck och bevisa ekvivalensen på två sätt.",delayed:"Blanda faktorisering med ekvationslösning efter fyra dagar.",methods:["Dual coding","Kontrasterande exempel","Felanalys","Aktiv återkallning"]},
  {title:"En funktion – fyra representationer",goal:"Eleven kan översätta mellan ord, uttryck, tabell och graf samt ange definitions- och värdemängd.",steps:["Sortera exempel och icke-exempel på funktioner.","Modellera en taxiresa i fyra representationer.","Låt grupper fylla den saknade representationen i olika kortset.","Eleverna skapar en funktion med begränsad definitionsmängd åt en annan grupp."],check:"Ge en graf; eleverna skriver uttryck, situation och rimlig definitionsmängd.",delayed:"Återkom med en diskret funktion där sammanhängande graf är olämplig.",methods:["Kontrasterande exempel","Dual coding","Självförklaring","Överföring"]},
  {title:"När är f(x) lika med ett bestämt värde?",goal:"Eleven kan bestämma funktionsvärden och lösa f(x)=a grafiskt och digitalt.",steps:["Skilj frågorna f(3) och f(x)=3.","Modellera avläsning med projektion mot båda axlarna.","Jämför grafiskt svar med digital lösning.","Eleverna konstruerar en graf där f(x)=a har noll, en respektive flera lösningar."],check:"Förklara varför en horisontell linje kan ge flera x-värden.",delayed:"Blanda f(a), nollställe och f(x)=a i nästa startuppgift.",methods:["Kontrasterande exempel","Genomarbetat exempel","Aktiv återkallning","Variation"]},
  {title:"Bestäm den linjära modellen",goal:"Eleven kan tolka och bestämma k- och m-värde från situation, tabell och graf.",steps:["Återkalla förändring och startvärde.","Modellera hur två punkter bestämmer k.","Jämför parallella linjer och linjer med samma skärning.","Eleverna väljer linjär modell för uppmätta teknikdata."],check:"Ge två punkter och en kontext; eleven anger modell och tolkar parametrarnas enheter.",delayed:"Jämför modellen med en exponentialfunktion efter en vecka.",methods:["Aktiv återkallning","Dual coding","Kontrasterande exempel","Tillämpning"]},
  {title:"Ekvationen som balans",goal:"Eleven kan lösa linjära ekvationer och motivera operationerna med bevarad likhet.",steps:["Visualisera likhet med en balansmodell.","Modellera samma operation i båda leden.","Analysera lösningar där termer har flyttats utan förklaring.","Eleverna löser och kontrollerar genom insättning."],check:"Rätta en felaktig lösning och ange exakt när likheten upphör att bevaras.",delayed:"Infoga ekvationer bland funktions- och formeluppgifter.",methods:["Konkret representation","Modellering","Felanalys","Aktiv återkallning"]},
  {title:"Intervall på tallinje och i algebra",goal:"Eleven kan lösa linjära olikheter och uttrycka lösningen med symboler och intervall.",steps:["Jämför ekvationens punktlösning med olikhetens mängd.","Modellera öppna och slutna ändpunkter på tallinje.","Visa varför tecknet vänds vid multiplikation med negativt tal.","Eleverna översätter mellan textvillkor, olikhet och tallinje."],check:"Lös en olikhet och ge ett värde som fungerar samt ett som inte fungerar.",delayed:"Återanvänd intervall som definitionsmängd.",methods:["Dual coding","Kontrasterande exempel","Härledning","Självförklaring"]},
  {title:"Linjärt eller exponentiellt?",goal:"Eleven kan skilja linjär från exponentiell förändring genom differens, kvot, graf och situation.",steps:["Sortera tabeller efter konstant differens eller kvot.","Modellera två förlopp med samma startvärde.","Låt eleverna para ihop berättelser, tabeller och grafer.","Undersök när modellerna korsar varandra digitalt."],check:"Motivera modellval för en ny tabell utan att bara hänvisa till grafens form.",delayed:"Blanda modelltyper med förändringsfaktor efter fem dagar.",methods:["Kontrasterande exempel","Interleaving","Dual coding","Aktiv återkallning"]},
  {title:"Varför potensreglerna fungerar",goal:"Eleven kan motivera potensregler och lösa potensekvationer utan att blanda ihop reglerna.",steps:["Expandera potenser som upprepad multiplikation.","Härled produkt- och kvotregeln från exempel.","Jämför vanliga fel med korrekta härledningar.","Eleverna väljer metod för potensekvationer med olika exponenter."],check:"Förklara varför x²+x² inte är x⁴ och lös därefter en ny potensekvation.",delayed:"Hämta tillbaka potensreglerna före exponentialfunktioner.",methods:["Härledning","Felanalys","Aktiv återkallning","Blandad övning"]},
  {title:"Potensfunktionens familjer",goal:"Eleven kan känna igen och jämföra potensfunktioner med olika exponenter.",steps:["Förutsäg grafer för x, x², x³ och x⁻¹.","Rita digitalt och jämför med förutsägelserna.","Identifiera symmetri, tecken och tillväxt.","Eleverna matchar nya tillämpningar med rimlig potensmodell."],check:"Skissa en potensfunktion och motivera två kännetecken utan digitalt verktyg.",delayed:"Jämför potens- och exponentialfunktion i ett nytt modelleringsfall.",methods:["Förutsägelse","Dual coding","Kontrasterande exempel","Utspridd övning"]},
  {title:"Förändringsfaktor genom flera steg",goal:"Eleven kan översätta procentuell förändring till faktor och beräkna upprepade förändringar.",steps:["Sortera procenttal och motsvarande faktorer.","Modellera två på varandra följande förändringar.","Kontrastera +10 % följt av −10 % med oförändrat värde.","Eleverna bygger en generell modell för n perioder."],check:"Förklara utan full beräkning varför motsatta procenttal inte tar ut varandra.",delayed:"Återkom i ränta, amortering och exponentialmodell.",methods:["Aktiv återkallning","Kontrasterande exempel","Worked example","Generalisering"]},
  {title:"Mät en otillgänglig sträcka",goal:"Eleven kan välja sinus, cosinus eller tangens och använda invers funktion för att bestämma vinklar.",steps:["Återkalla sidornas namn relativt vald vinkel.","Modellera metodval före insättning.","Mät höjd eller avstånd i skolmiljön.","Jämför beräknat värde med rimlig uppskattning och mätosäkerhet."],check:"Ge tre trianglar; eleven väljer kvot utan att räkna och motiverar.",delayed:"Blanda vinkel- och längdproblem med koordinatgeometri.",methods:["Aktiv återkallning","Metodval","Praktisk tillämpning","Rimlighetskontroll"]},
  {title:"Vektorer som riktad förflyttning",goal:"Eleven kan representera och beräkna med vektorer geometriskt och i koordinatform.",steps:["Gå en fysisk förflyttning och rita motsvarande vektor.","Modellera addition med spets-mot-svans.","Översätt till koordinatform och absolutbelopp.","Lös en navigeringsuppgift med skalärmultiplikation och differens."],check:"Rita och beräkna resultanten av två nya vektorer samt tolka den.",delayed:"Använd vektorer i kraft- eller rörelseproblem.",methods:["Kroppslig representation","Dual coding","Modellering","Överföring"]},
  {title:"Sannolikhetsträd för beroende händelser",goal:"Eleven kan skilja beroende, oberoende och komplementhändelser samt beräkna flerstegssannolikhet.",steps:["Jämför dragning med och utan återläggning.","Modellera träddiagram med villkorade grenar.","Låt eleverna simulera och jämföra frekvens med teori.","Analysera en riskbedömning med komplementmetoden."],check:"Välj mellan multiplikation, addition och komplement i tre nya fall.",delayed:"Återkom utan rubrik som avslöjar sannolikhetsmetoden.",methods:["Kontrasterande exempel","Dual coding","Simulering","Interleaving"]},
  {title:"Korrelation är inte automatiskt orsak",goal:"Eleven kan granska statistiska påståenden utifrån urval, felkällor, korrelation och kausalitet.",steps:["Rösta om tre uppmärksammade samband verkar kausala.","Modellera alternativa förklaringar och störfaktorer.","Granska ett diagram och dess urvalsmetod.","Eleverna skriver en mer försiktig slutsats som matchar beläggen."],check:"Identifiera två möjliga felkällor och en otillåten kausal slutsats i ett nytt påstående.",delayed:"Använd granskningsramen på statistik från ett annat ämne.",methods:["Förutsägelse","Exempel och icke-exempel","Självförklaring","Överföring"]},
  {title:"Bygg en amorteringsplan i kalkylblad",goal:"Eleven kan använda relativa och absoluta cellreferenser för ränta och amortering.",steps:["Rita först betalningsflödet utan kalkylblad.","Modellera första raden och skillnaden mellan cellreferenser.","Eleverna fyller en delvis färdig plan.","Ändra ränta och amorteringsmodell och tolka konsekvensen."],check:"Eleven förklarar en vald formel och förutsäger effekten av ändrad ränta.",delayed:"Återskapa kärnformeln i ett tomt kalkylblad senare.",methods:["Segmentering","Completion problem","Förutsägelse","Aktiv återkallning"]},
  {title:"Verktyget ska kontrollera – inte ersätta metoden",goal:"Eleven kan välja när ett digitalt verktyg effektiviserar beräkningen och verifiera resultatet.",steps:["Lös ett enkelt fall för hand som referens.","Modellera samma problem digitalt och jämför representationer.","Analysera felaktiga fönsterinställningar och avrundningar.","Eleverna väljer verktyg för tre problem och motiverar."],check:"Ge ett digitalt svar; eleven gör oberoende rimlighetskontroll.",delayed:"Kräv verktygsval i en blandad problemlösningsuppgift.",methods:["Förkunskapskontroll","Kontrasterande exempel","Felanalys","Metakognition"]},
  {title:"Programmera en numerisk undersökning",goal:"Eleven kan skriva ett enkelt program som bearbetar data eller prövar en matematisk modell.",steps:["Spåra ett kort program rad för rad utan att köra.","Modellera indata, beräkning, repetition och utdata.","Eleverna kompletterar kod som testar många värden.","Jämför programmets resultat med analytisk eller grafisk metod."],check:"Förutsäg utdata och lokalisera ett logiskt fel i ny kod.",delayed:"Modifiera programmet för en ny datamängd eller modell.",methods:["Kodspårning","Completion problem","Felanalys","Överföring"]},
  {title:"Från mönster till generell regel",goal:"Eleven kan upptäcka, formulera och pröva ett generellt samband.",steps:["Visa tre fall i en figurserie.","Samla olika elevhypoteser utan att värdera direkt.","Modellera hur en regel prövas mot fler fall och förklaras.","Eleverna skapar egen figurserie och granskar en kamrats regel."],check:"Formulera regeln för fall n och visa varför den fungerar.",delayed:"Återkom med ett icke-linjärt mönster.",methods:["Generalisering","Variation","Självförklaring","Kamratgranskning"]},
  {title:"Granska ett hållbarhetspåstående med matematik",goal:"Eleven kan välja beräkningar som prövar ett samhälls- eller hållbarhetspåstående.",steps:["Presentera ett påstående med ofullständiga siffror.","Lista vilken information som krävs.","Modellera en enhets- och storleksordningsanalys.","Eleverna beräknar, redovisar antaganden och skriver en avgränsad slutsats."],check:"Ange om beläggen räcker och vilket antagande som påverkar slutsatsen mest.",delayed:"Granska ett nytt påstående med annan kontext och samma ram.",methods:["Problemlösning","Rimlighetsbedömning","Självförklaring","Överföring"]},
  {title:"Bygg och kritisera en matematisk modell",goal:"Eleven kan formulera en modell, tolka parametrar och ange modellens begränsningar.",steps:["Jämför data med två möjliga modeller.","Modellera val av variabler och antaganden.","Anpassa en modell digitalt och analysera residualer.","Låt en annan grupp utsätta modellen för ett gränsfall."],check:"Eleven anger ett användningsområde och ett fall där modellen blir missvisande.",delayed:"Återanvänd modellkritiken på en modell från fysik eller teknik.",methods:["Kontrasterande modeller","Modellering","Kamratgranskning","Överföring"]},
  {title:"Ett matematiskt begrepps resa",goal:"Eleven kan förklara hur ett matematiskt begrepp eller problem utvecklats i sitt historiska sammanhang.",steps:["Placera källfragment på en preliminär tidslinje.","Modellera skillnaden mellan upptäckt, notation och spridning.","Eleverna följer ett begrepp genom två kulturer eller tider.","Presentera vad som förändrades och vilket problem utvecklingen löste."],check:"Skriv en orsak–förändring–konsekvenskedja med historiskt belägg.",delayed:"Återkalla begreppets historia när det matematiska innehållet återkommer.",methods:["Tidslinje","Dual coding","Elaborering","Aktiv återkallning"]}
];

const swedishProfiles = [
  {title:"Talverkstaden: samma budskap, ny mottagare",goal:"Eleven kan planera och framföra ett kort tal med medveten mottagaranpassning.",steps:["Lyssna på två versioner av samma budskap.","Identifiera syfte, mottagare och retoriska val.","Modellera disposition och stödmanus.","Framför, ta emot situationsanpassad respons och revidera."],check:"Eleven ändrar inledning och exempel för en ny mottagare och motiverar ändringarna.",delayed:"Genomför ett nytt tvåminuterstal utan den ursprungliga mallen.",methods:["Kontrasterande exempel","Modellering","Övning med återkoppling","Utspridd övning"]},
  {title:"Argument eller berättelse? Skriv för syftet",goal:"Eleven kan välja struktur och språk för argumenterande respektive kreativ text.",steps:["Sortera korta textutdrag efter kommunikativt syfte.","Härled genretypiska drag.","Skriv samma idé som argument och kreativ scen.","Revidera en version utifrån vald effekt."],check:"Eleven markerar tre textval och kopplar dem till syftet.",delayed:"Byt genre på ett nytt innehåll efter en vecka.",methods:["Kontrasterande exempel","Genreväxling","Självförklaring","Utspridd övning"]},
  {title:"Kirurgisk textrespons",goal:"Eleven kan förbättra struktur, språkriktighet och källhantering med riktad respons.",steps:["Jämför ett fungerande och ett svagt stycke.","Modellera en revision med fokus på en dimension i taget.","Granska citat, referatmarkörer och sambandsord i färgkodning.","Bearbeta egen text och dokumentera tre beslut."],check:"Eleven förklarar varför en ändring förbättrar textens funktion, inte bara korrekthet.",delayed:"Gör en kallrevision av ett nytt stycke utan checklista.",methods:["Exempel och icke-exempel","Segmentering","Dual coding","Metakognitiv reflektion"]},
  {title:"Läs sakprosa med frågestyrd anteckning",goal:"Eleven kan urskilja huvudtes, stöd och disposition samt använda läsningen i egen text.",steps:["Förutsäg textens innehåll från rubrik och ingress.","Modellera marginalanteckningar för tes, belägg och fråga.","Jämför anteckningar och lös oenighet med textbelägg.","Skriv en kort respons som bygger på texten."],check:"Sammanfatta huvudtesen och välj det starkaste belägget med motivering.",delayed:"Återkalla tes och struktur innan texten återbesöks.",methods:["Förutsägelse","Modellering","Aktiv läsning","Aktiv återkallning"]},
  {title:"Källtriangeln: relevans, trovärdighet, oberoende",goal:"Eleven kan söka, sammanfatta och kritiskt värdera information från flera källor.",steps:["Jämför tre sökresultat om samma fråga.","Modellera lateral läsning och kontroll av avsändare.","Skapa en källmatris med påstående och belägg.","Skriv en syntes där osäkerhet synliggörs."],check:"Välj den mest användbara källan för en bestämd fråga och motivera avgränsat.",delayed:"Granska en ny källa utan den färdiga matrisen.",methods:["Kontrasterande exempel","Modellering","Strukturerad jämförelse","Överföring"]},
  {title:"Tre genrer, tre läsarter",goal:"Eleven kan analysera epik, lyrik och dramatik med relevanta frågor och textbelägg.",steps:["Läs korta utdrag ur tre genrer.","Modellera hur genre påverkar vad läsaren observerar.","Arbeta i expertgrupper med berättare, bildspråk eller scenanvisning.","Jämför hur ett gemensamt tema gestaltas."],check:"Analysera ett nytt utdrag och använd ett genrespecifikt begrepp med belägg.",delayed:"Återkom till samma tema i en annan genre.",methods:["Kontrasterande exempel","Begreppsmodellering","Textbelägg","Interleaving"]},
  {title:"Litterära epoker som nätverk",goal:"Eleven kan ordna epoker och förklara samband mellan idéer, samhälle och litterära uttryck.",steps:["Återkalla epoker på en tom tidslinje.","Koppla representativa utdrag till idéströmningar.","Bygg ett nätverk av påverkan och reaktion mellan epoker.","Motivera placeringen av ett okänt utdrag."],check:"Placera ett nytt utdrag och ange två belägg samt en osäkerhet.",delayed:"Gör en kumulativ tidslinje med tidigare epoker varje vecka.",methods:["Aktiv återkallning","Dual coding","Elaborering","Utspridd övning"]},
  {title:"Motiv, berättarteknik och stil i närbild",goal:"Eleven kan förklara hur motiv och berättartekniska eller stilistiska val skapar effekt.",steps:["Jämför två versioner av samma scen med olika perspektiv.","Modellera kedjan textdrag–belägg–effekt–tolkning.","Annotera motiv och stildrag i ett kort utdrag.","Skriv en analys som prövar en alternativ tolkning."],check:"Förklara effekten av ett valt textdrag med exakt textbelägg.",delayed:"Analysera samma textdrag i ett nytt utdrag efter fem dagar.",methods:["Kontrasterande texter","Modellering","Närläsning","Utspridd övning"]},
  {title:"Bygg meningar med språkvetenskapliga verktyg",goal:"Eleven kan använda grundläggande språkvetenskapliga begrepp för att analysera och förbättra språk.",steps:["Manipulera ord, fraser och satser på kort.","Modellera analys från hel mening till beståndsdelar.","Jämför grammatiskt möjliga och omöjliga konstruktioner.","Revidera en oklar text och namnge de språkliga ändringarna."],check:"Analysera en ny mening och visa hur en förändring påverkar funktion eller tydlighet.",delayed:"Återkalla begreppen i samband med kommande textrespons.",methods:["Konkret manipulation","Exempel och icke-exempel","Modellering","Aktiv återkallning"]},
  {title:"Språkvariation utan stereotyper",goal:"Eleven kan analysera språklig variation i relation till situation, identitet, norm och makt.",steps:["Lyssna på eller läs autentiska kontrasterande språkprov.","Skilj observation från värdering och stereotyp.","Modellera analys av situation, variabel och möjlig funktion.","Undersök hur samma talare anpassar språk mellan sammanhang."],check:"Beskriv ett språkdrag, ge två möjliga förklaringar och undvik att dra slutsats om individen.",delayed:"Tillämpa analysramen på ett nytt språkprov senare.",methods:["Kontrasterande exempel","Begreppslig precision","Perspektivvariation","Överföring"]}
];

const mathAreas = {
  "Aritmetik, algebra och funktioner": [
    "Hantering av formler och algebraiska uttryck, däribland faktorisering och multiplicering av uttryck.",
    "Begreppen funktion, definitionsmängd och värdemängd. Representationer av funktioner i form av ord, funktionsuttryck, tabeller och grafer. Digitala metoder för att skapa funktionsgrafer.",
    "Metoder för att bestämma funktionsvärden. Digitala och grafiska metoder för att lösa ekvationer av typen f(x) = a.",
    "Begreppet linjär funktion och egenskaper hos linjära funktioner. Räta linjens ekvation. Metoder för att bestämma linjära funktioner.",
    "Metoder för att lösa linjära ekvationer.",
    "Begreppen intervall och linjär olikhet. Metoder för att lösa linjära olikheter.",
    "Begreppet exponentialfunktion och egenskaper hos exponentialfunktioner. Skillnader och likheter med linjära funktioner.",
    "Motivering och hantering av räkneregler för potenser. Metoder för att lösa potensekvationer.",
    "Begreppet potensfunktion.",
    "Begreppet förändringsfaktor och beräkning av förändringar i flera steg."
  ],
  "Trigonometri och vektorer": [
    "Begreppen sinus, cosinus och tangens. Begreppet invers funktion i samband med arcusfunktioner. Metoder för att beräkna sträckor och vinklar i koordinatsystem och i rätvinkliga trianglar.",
    "Begreppet vektor. Representationer av vektorer i koordinatsystem och skrivna i koordinatform. Metoder för beräkningar med vektorer, däribland addition, subtraktion, beräkning av absolutbelopp och multiplikation med skalär."
  ],
  "Sannolikhet och statistik": [
    "Begreppen oberoende och beroende händelse samt komplementhändelse. Metoder för att beräkna sannolikheter i flera steg. Tillämpningar inom spel samt risk- och säkerhetsbedömningar.",
    "Exempel på hur några statistiska begrepp används i samhälle och inom vetenskap, däribland signifikans, korrelation, kausalitet, urvalsmetoder och felkällor."
  ],
  "Digitala verktyg": [
    "Användning av kalkylprogram för beräkning av ränta och amortering.",
    "Användning av digitala verktyg för att effektivisera beräkningar och komplettera metoder, till exempel vid ekvationslösning och problemlösning.",
    "Exempel på hur programmering kan användas som verktyg vid problemlösning, databearbetning eller tillämpning av numeriska metoder."
  ],
  "Problemlösning och tillämpningsområden": [
    "Problemlösning som omfattar att upptäcka och uttrycka generella samband.",
    "Problemlösning med särskild utgångspunkt i utbildningens karaktär, privatekonomi och samhällsliv, däribland frågeställningar som berör hållbar utveckling och hur matematik kan användas för kritisk granskning av fakta och påståenden.",
    "Tillämpning och formulering av matematiska modeller i realistiska situationer. Utvärdering av matematiska modellers egenskaper och begränsningar.",
    "Orientering om något ur matematikens historia, till exempel hur ett matematiskt begrepp utvecklats, matematikens roll i något historiskt skeende, en betydande person inom matematiken eller ett historiskt matematiskt problem."
  ]
};

const swedishItems = [
  ["Muntlig framställning", "Muntlig framställning i och inför grupp med fokus på anpassning till sammanhang, syfte och mottagare. Manusskrivande och hjälpmedel för att stödja muntliga framställningar. Att lyssna och ge respons som är anpassad till kommunikationssituationen. Grunderna i den retoriska arbetsprocessen."],
  ["Skriftlig framställning", "Skriftlig framställning av olika typer av texter för kommunikation, lärande och reflektion, däribland argumenterande texter och kreativt skrivande."],
  ["Textstruktur och språkriktighet", "Struktur och språkliga drag i olika typer av texter. Skriftspråkets normer för språkriktighet och vilka språkliga egenskaper som gör att en text fungerar väl i sitt sammanhang. Användning av digitala verktyg för textbearbetning samt för respons på texter. Citat- och referatteknik."],
  ["Sakprosa", "Läsning av och samtal om sakprosa. Produktion av texter som anknyter till läst sakprosa."],
  ["Informationssökning och källkritik", "Informationssökning och värdering av information från olika typer av texter. Sammanfattning och kritisk läsning av texter från olika typer av källor."],
  ["Skönlitteratur", "Läsning av, samtal om och analys av skönlitterära texter ur genrerna epik, lyrik och dramatik, författade av såväl kvinnor som män, med betoning på samtida litteratur."],
  ["Litteraturhistoria", "En översikt över de litterära epokerna."],
  ["Litterär analys", "Centrala motiv, berättarteknik och stildrag i fiktivt berättande."],
  ["Språkets uppbyggnad", "Grundläggande språkvetenskapliga begrepp som behövs för att på ett strukturerat sätt tala om språkets uppbyggnad och funktion samt diskutera språkriktighetsfrågor."],
  ["Språklig variation", "Språk och språkanvändning med särskild betoning på språklig variation i talat och skrivet språk. Hur språklig variation hänger samman med geografisk och social bakgrund, ålder och kön samt hur makt, normer och identitet kan komma till uttryck i språkanvändning."]
];

const mathItems = Object.entries(mathAreas).flatMap(([area, items]) => items.map((text) => [area, text]));
const nrichSource = {
  type: "Resursbank med genomförda upplägg",
  title: "NRICH – curriculum-linked secondary mathematics problems",
  url: "https://nrich.maths.org/curriculum-linked-problems-secondary-teachers",
  assessment: "Har lärarhandledningar och genomförbara matematikuppgifter; varje uppgift behöver matchas mot Gy25-punkten."
};

const mathSubject = {
  id: "matematik",
  name: "Matematik",
  subjectCode: "MATE",
  levels: [{
    id: "mate-1c",
    name: "Nivå 1c",
    levelCode: "MATE1C00X",
    points: 100,
    status: "Komplett pilot",
    sourceUrl: "https://syllabuswebb.skolverket.se/syllabuscw/jsp/subject.htm?subjectCode=MATE&tos=gy",
    centralContent: mathItems.map(([area, text], index) => plan("Matematik", index, area, text, area === "Problemlösning och tillämpningsområden" ? nrichSource : null))
  }]
};

const swedishSubject = {
  id: "svenska",
  name: "Svenska",
  subjectCode: "SVEN",
  levels: [{
    id: "sven-1",
    name: "Nivå 1",
    levelCode: "SVEN1000X",
    points: 100,
    status: "Komplett pilot",
    sourceUrl: "https://syllabuswebb.skolverket.se/syllabuscw/jsp/subject.htm?subjectCode=SVEN&tos=gy",
    centralContent: swedishItems.map(([area, text], index) => plan("Svenska", index, area, text, null))
  }]
};

const preservedMathLevels = (data.subjects.find(subject => subject.id === "matematik")?.levels || []).filter(level => level.id !== "mate-1c");
const preservedSwedishLevels = (data.subjects.find(subject => subject.id === "svenska")?.levels || []).filter(level => level.id !== "sven-1");
mathSubject.levels.push(...preservedMathLevels);
swedishSubject.levels.push(...preservedSwedishLevels);
data.subjects = data.subjects.filter((subject) => !["matematik", "svenska"].includes(subject.id));
data.subjects.push(mathSubject, swedishSubject);
fs.writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Planeringsbanken innehåller nu ${data.subjects.length} ämnen.`);
require("./enrich_pauli_sol_planner");
