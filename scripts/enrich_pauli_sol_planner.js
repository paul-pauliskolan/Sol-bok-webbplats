#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "..", "data", "pauli-sol-planner.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

const P = (pre, difficulty, contrast, transfer) => ({ pre, difficulty, contrast, transfer });

const profiles = {
  teknik: [
    P(["behov, krav och begränsning","modell och prototyp","produktens livscykel"],"Processen uppfattas som linjär och elever hoppar direkt från idé till tillverkning.","Jämför en linjär processkarta med en iterativ karta där testdata leder tillbaka till krav och modell.","Planera processen för en digital tjänst i stället för en fysisk produkt."),
    P(["hållfasthet, densitet och ledningsförmåga","livscykelperspektiv","kravspecifikation"],"Material väljs efter en enda synlig egenskap i stället för en avvägning mellan funktion, kostnad och hållbarhet.","Jämför två material som båda uppfyller huvudkravet men ger olika sekundära konsekvenser.","Välj material till samma komponent när användningsmiljön ändras."),
    P(["komponent och system","in- och utdata","enkla nätverk"],"Elever kan namnge komponenter men ser inte dataflöden, beroenden eller återkoppling.","Jämför ett komponentlager med ett systemdiagram som visar relationer och riktning.","Modellera ett bokningssystem och identifiera nya kritiska beroenden."),
    P(["problemformulering","krav och begränsningar","testkriterium"],"Elever börjar bygga innan problemet avgränsats och väljer favoritstrategi oavsett villkor.","Jämför två problem med liknande yta men olika villkor och därmed olika strategi.","Välj strategi för ett problem inom en annan teknikinriktning."),
    P(["projektmål och milstolpe","roll och ansvar","enkel dokumentation"],"Gruppaktivitet döljer individuella kunskapsluckor och projektet blir produktion utan lärande.","Jämför en aktivitetslista med en projektplan som kopplar delmål till kunskap och kontrollpunkt.","Planera ett kort individuellt projekt med samma beslutspunkter."),
    P(["sekvens, villkor och repetition","variabel","sensor och utdata"],"Elever kodar på måfå utan att först bryta ned det tekniska problemet.","Jämför kod-först med en lösning som först beskriver tillstånd, indata och beslut.","Flytta lösningen från simulerad till fysisk sensor eller omvänt."),
    P(["variabel och funktion","kontrollflöde","kodläsning"],"Fungerande kod likställs med begriplig och underhållbar kod.","Jämför två program med samma utdata men olika namngivning, upprepning och funktionsindelning.","Refaktorera ett större program skrivet av någon annan."),
    P(["krav och mätbarhet","variabel och mätosäkerhet","hållbarhetens dimensioner"],"Elever värderar lösningen med allmänna omdömen efter testet i stället för förbestämda kriterier.","Jämför 'den fungerar bra' med en slutsats som hänvisar till tröskelvärde och testdata.","Skapa testmatris för en digital lösning där användbarhet vägs mot energi och integritet."),
    P(["kraft, belastning och jämvikt","hållfasthet","skissläsning"],"Fackbegrepp återges som definitioner utan att användas för att förutsäga konstruktionens funktion.","Jämför två konstruktioner som ser olika ut men överför laster enligt samma princip.","Analysera en okänd vardagskonstruktion med samma begrepp."),
    P(["enheter och storheter","formelhantering","skala och proportionalitet"],"Elever utför symbolmanipulation men upptäcker inte orimlig enhet eller storleksordning.","Jämför ett numeriskt korrekt räknesteg med ett dimensionsmässigt orimligt svar.","Gör en överslagsdimensionering med ofullständiga verkliga data."),
    P(["modell, prototyp och simulering","oberoende och beroende variabel","mätdata"],"Modellen behandlas som verkligheten och dess förenklingar eller giltighetsområde anges inte.","Jämför fysisk prototyp och simulering av samma system och lista vad respektive metod missar.","Välj modelltyp för ett nytt system där fullskaletest är dyrt eller riskfyllt."),
    P(["ekologisk, social och ekonomisk hållbarhet","risk och sannolikhet","källkritik"],"Framtidsteknik beskrivs som entydigt god eller farlig utan berörda grupper, målkonflikter och osäkerhet.","Jämför två analyser av samma teknik: teknikoptimism och villkorad konsekvensanalys.","Analysera en ny AI- eller energiteknik med samma beslutsram."),
    P(["orsak och konsekvens","tekniskt system","samhällsförändring"],"Samtidighet eller tidsföljd tas som bevis för att tekniken ensam orsakade samhällsförändringen.","Jämför en enkel hjälteberättelse med en flernivåförklaring av aktörer, resurser och institutioner.","Bygg en omvänd kedja som visar hur samhället drev fram en teknisk förändring."),
    P(["användare och krav","tillgänglighet","norm och etik"],"Den egna användarerfarenheten antas representera alla och exkluderande standardval förblir osynliga.","Jämför samma produkt testad av två användarprofiler med olika förutsättningar.","Gör en tillgänglighetsgranskning av ett offentligt digitalt gränssnitt."),
    P(["krav, process och testresultat","mottagaranpassning","käll- och versionshantering"],"Dokumentation blir en efterhandsberättelse utan spår mellan krav, beslut, data och ändring.","Jämför en kronologisk dagbok med en beslutslogg som gör lösningen reproducerbar.","Skriv om samma underlag för teknisk kollega och icke-teknisk beställare."),
    P(["skala och måttsättning","projektion","digitala och manuella ritverktyg"],"Elever väljer den snyggaste representationen i stället för den som kommunicerar rätt information.","Jämför idéskiss, måttsatt ritning och fysisk modell av samma lösning.","Välj representationskombination för tillverkare, kund och underhållstekniker.")
  ],
  matematik: [
    P(["räkneordning","distributiva lagen","negativa tal"],"Faktorisering och utveckling används som regler utan förståelse för ekvivalens.","Jämför 3(x+2)=3x+6 med det typiska felet 3x+2.","Förenkla en geometrisk areaformel och tolka båda formerna."),
    P(["koordinatsystem","variabel","tabell och graf"],"Elever ser representationerna som separata uppgifter och blandar definitionsmängd med värdemängd.","Jämför samma funktion som ord, tabell, graf och uttryck.","Skapa fyra representationer för en diskret teknisk situation."),
    P(["funktionsnotation","x- och y-axel","ekvation"],"f(3) och f(x)=3 förväxlas.","Jämför vertikal avläsning för f(3) med horisontell avläsning för f(x)=3.","Analysera en funktion där f(x)=a har flera lösningar."),
    P(["förändring per steg","koordinater","proportionalitet"],"k och m identifieras mekaniskt utan enhet eller betydelse.","Jämför två linjer med samma k respektive samma m.","Bestäm och tolka en linjär modell från mätdata."),
    P(["likhetstecknets betydelse","negativa tal","förenkling"],"Termer 'flyttas' utan att samma operation görs i båda leden.","Jämför balansmetoden med en felaktig flyttregel.","Lös en formel för en annan variabel och kontrollera genom insättning."),
    P(["tallinje","negativa tal","likhet och olikhet"],"Elever ger ett enskilt tal i stället för en lösningsmängd och glömmer vända tecknet.","Jämför lösning av ekvation och olikhet med samma vänsterled.","Formulera säkerhetsvillkor som olikhet och intervall."),
    P(["kvot och differens","procent","grafavläsning"],"Alla stigande grafer beskrivs som exponentiella eller alla raka som proportionella.","Jämför konstant differens med konstant kvot.","Välj modell för två verkliga dataserier med liknande start."),
    P(["multiplikation och division","negativa exponenter","rotbegrepp"],"Potensregler övergeneraliseras till addition.","Jämför x²·x² med x²+x².","Härled och använd en potensregel i en fysikalisk formel."),
    P(["funktionsbegrepp","potenser","grafisk symmetri"],"Potensfunktion och exponentialfunktion blandas ihop.","Jämför x³ och 3ˣ med tabell och graf.","Välj potensmodell för area, volym eller invers proportionalitet."),
    P(["procent och decimalform","multiplikation","potenser"],"+p procent följt av -p procent antas ta ut varandra.","Jämför additiv förändring med multiplikativa faktorer.","Modellera upprepad effektivisering eller värdeminskning."),
    P(["rätvinklig triangel","Pythagoras sats","vinkelmått"],"Sinus, cosinus och tangens väljs efter minnesregel utan hänsyn till kända sidor.","Jämför tre trianglar som kräver olika kvoter.","Mät en otillgänglig höjd med uppskattad mätosäkerhet."),
    P(["koordinater","Pythagoras sats","riktning och längd"],"Vektor förväxlas med punkt eller endast längd.","Jämför punkten (2,3) med vektorn (2,3) i en förflyttning.","Summera krafter eller förflyttningar i en teknisk kontext."),
    P(["bråk","multiplikationsprincipen","enkel sannolikhet"],"Beroende händelser behandlas som oberoende och grenarnas sannolikheter uppdateras inte.","Jämför dragning med och utan återläggning.","Gör riskbedömning genom komplementhändelse."),
    P(["procent och diagram","medelvärde","urval"],"Korrelation tolkas som orsak och urvalets betydelse förbises.","Jämför ett observerat samband med ett randomiserat orsakstest.","Granska ett statistiskt påstående från media eller teknikrapport."),
    P(["procent","förändringsfaktor","cellreferens"],"Formler kopieras utan förståelse för relativa och absoluta referenser.","Jämför två kalkylblad där samma ränta hanteras med olika cellreferenser.","Ändra amorteringsmodell och förklara konsekvensen."),
    P(["ekvationslösning","grafavläsning","rimlighetsbedömning"],"Digitalt svar accepteras utan kontroll av inställning, domän eller avrundning.","Jämför korrekt algebra med missvisande graffönster.","Välj och motivera digitalt eller manuellt verktyg för ett nytt problem."),
    P(["variabel, villkor och loop","funktionsvärde","tabell"],"Kod producerar tal men elever kan inte förklara den matematiska modellen.","Jämför kodspårning för korrekt och logiskt felaktig loop.","Modifiera programmet för en ny numerisk metod eller datamängd."),
    P(["tal- och figurserier","variabel","algebraiska uttryck"],"En regel prövas bara mot visade fall och ytmönster tas för generell struktur.","Jämför två regler som passar de tre första fallen men skiljer sig senare.","Generalisera ett nytt geometriskt mönster till fall n."),
    P(["enheter","procent","storleksordning"],"Siffror används utan att antaganden, basvärde eller enhet granskas.","Jämför ett övertygande påstående med och utan relevant nämnare.","Pröva ett nytt energi- eller klimatpåstående matematiskt."),
    P(["variabler och parametrar","funktionsmodeller","data"],"Modellen behandlas som sann och extrapoleras utanför giltigt område.","Jämför två modeller som passar befintliga data men ger olika extrapolation.","Kritisera en modell från fysik eller samhällskunskap."),
    P(["tidslinje","matematiskt begrepp","orsak och konsekvens"],"Historien reduceras till namn och år utan koppling mellan problem, notation och idéutveckling.","Jämför samma begrepp före och efter en ny notation eller metod.","Spåra ett annat matematiskt verktyg mellan kulturer och användningar.")
  ],
  svenska: [
    P(["syfte och mottagare","enkel disposition","muntlig respons"],"Eleven fokuserar på innehåll men inte hur mottagare och situation förändrar språk, exempel och framförande.","Jämför samma budskap framfört till klasskamrater och beslutsfattare.","Anpassa talet till en ny formell situation utan samma manus."),
    P(["tes och berättande händelse","styckeindelning","grundläggande textbindning"],"Genre väljs efter ämne i stället för kommunikationssyfte.","Jämför samma idé som argumenterande stycke och fiktiv scen.","Byt genre och behåll kärninnehållet för en ny mottagare."),
    P(["mening och stycke","citat och referat","responsbegrepp"],"Respons blir korrekturläsning eller allmänt beröm utan koppling till textens funktion.","Jämför responsen 'bra språk' med en specifik, handlingsbar kommentar.","Revidera en ny text utan checklista och motivera ändringarna."),
    P(["huvudidé och detalj","tes och belägg","sammanfattning"],"Anteckningar kopierar texten och produktionen saknar tydlig anknytning till det lästa.","Jämför kopierade meningar med frågestyrda anteckningar.","Använd samma läsmodell på en teknisk sakprosatext."),
    P(["avsändare, syfte och belägg","sökord","skillnaden fakta/värdering"],"Första sökträffen eller professionell design likställs med tillförlitlighet.","Jämför primärkälla, partsinlaga och återpublicerad sammanfattning.","Genomför lateral granskning av en ny källa i ett annat ämne."),
    P(["epik, lyrik och dramatik","textbelägg","grundläggande analys"],"Samma analysfrågor används oavsett genre och analys blir referat.","Jämför berättarperspektiv, lyriskt bildspråk och dramatisk scenanvisning.","Analysera ett gemensamt tema i en ny genre."),
    P(["kronologi","historiskt sammanhang","genre"],"Epoker memoreras som listor utan samband mellan idéer, samhälle och litterära uttryck.","Jämför två epoker som reagerar olika på samhällsförändring.","Placera ett okänt utdrag med belägg och uttryckt osäkerhet."),
    P(["motiv och tema","berättarperspektiv","stilfigur"],"Textdrag namnges men deras effekt och betydelse för tolkningen förklaras inte.","Jämför samma scen berättad ur två perspektiv.","Pröva samma analyskedja på ett nytt utdrag med alternativ tolkning."),
    P(["ordklass","fras och sats","meningsbyggnad"],"Begrepp identifieras mekaniskt utan att kopplas till språkets funktion eller textförbättring.","Jämför grammatiskt korrekt men oklar mening med en tydligare ombyggnad.","Använd begreppen för att revidera en egen sakprosatext."),
    P(["dialekt, sociolekt och register","norm och identitet","observation och värdering"],"Språkdrag kopplas stereotypt till en person eller grupp och situationsvariation förbises.","Jämför samma talares språk i två situationer.","Analysera ett nytt språkprov och ge flera möjliga förklaringar utan personslutsats.")
  ]
};

const methodExplanations = {
  "Aktiv återkallning": "gör förkunskaper och senare retention synliga",
  "Utspridd övning": "motverkar att kunnandet bara fungerar direkt efter undervisningen",
  "Blandad övning": "kräver att eleven urskiljer och väljer metod",
  "Interleaving": "blandar närliggande fall så att djup struktur måste identifieras",
  "Dual coding": "samordnar verbal förklaring med relevant visuell representation",
  "Modellering": "gör expertens uppmärksamhet och beslut synliga",
  "Genomarbetade exempel": "minskar onödig sökning för nybörjaren",
  "Kontrasterande exempel": "synliggör den avgörande skillnaden mellan närliggande fall",
  "Felanalys": "gör missuppfattningen till föremål för resonemang",
  "Självförklaring": "tvingar eleven att koppla steg till princip",
  "Överföring": "prövar samma kunskap i en ny yta eller kontext"
};

const evidenceSources = [
  {title:"A Little Guide for Teachers: Cognitive Load Theory - Greg Ashman",url:"https://www.sagepub.com/shop/buy-a-book/a-little-guide-for-teachers-cognitive-load-theory-1-283309",role:"Arbetsminne, genomarbetade exempel och gradvis minskat stöd"},
  {title:"Embedded Formative Assessment, Second Edition - Dylan Wiliam",url:"https://hawkerbrownlow.com/products/embedded-formative-assessment-second-edition",role:"Kontroll av förståelse och nästa undervisningsbeslut"},
  {title:"Why Don't Students Like School?, Second Edition - Daniel T. Willingham",url:"https://www.wiley-vch.de/en/areas-interest/humanities-social-sciences/education-12ed/k-12-general-12ed1/teaching-learning-k-12-12ed13/why-don-39-t-students-like-school-978-1-119-71566-5",role:"Förkunskaper, minne, tänkande och övning"},
  {title:"The Science of Learning, Second Edition - Deans for Impact",url:"https://www.deansforimpact.org/resources/the-science-of-learning/",role:"Officiell originalresurs om förkunskaper, minne, övning och självreglering"}
];

for (const subject of data.subjects) {
  const subjectProfiles = profiles[subject.id];
  if (!subjectProfiles) throw new Error(`Saknar profiler för ${subject.id}`);
  let index = 0;
  for (const level of subject.levels) {
    for (const item of level.centralContent) {
      const profile = subjectProfiles[index++];
      if (!profile) throw new Error(`Saknar profil för ${item.id}`);
      item.prerequisites = profile.pre;
      item.likelyDifficulty = profile.difficulty;
      item.exampleOrModel = item.lesson.steps[1] || item.lesson.steps[0];
      item.guidedPractice = item.lesson.steps[2] || item.lesson.steps[1];
      item.independentPractice = item.lesson.steps[3] || item.lesson.steps.at(-1);
      item.contrastOrVariation = profile.contrast;
      item.decisionRule = `Om fler än en fjärdedel av eleverna visar tecken på att ${profile.difficulty.charAt(0).toLowerCase()}${profile.difficulty.slice(1)}, återgå till modell/kontrast och samla ett nytt individuellt svar. Annars går eleverna vidare till självständig tillämpning.`;
      item.transferTask = profile.transfer;
      item.methodRationale = item.solMethods.map((method) => ({method, rationale: methodExplanations[method] || `används för att möta den identifierade svårigheten i just denna innehållspunkt`}));
      item.evidenceSources = evidenceSources;
      item.reviewStatus = "Redaktionellt SoL-förslag - ej ämneslärargranskat";
    }
  }
  if (index !== subjectProfiles.length) throw new Error(`Profilantalet stämmer inte för ${subject.id}`);
}

fs.writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`);
console.log("Berikade samtliga planeringsidéer med källunderlagets kvalitetsfält.");
