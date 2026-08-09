#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const stages = {
  "f-3": {
    label: "F–3",
    planning: "Arbeta i korta steg med muntlig modellering, konkreta exempel och gemensam övning.",
    check: "Låt alla elever visa, peka, rita eller säga ett kort svar innan du går vidare.",
    next: "Ge ett nytt närliggande exempel med samma stöd om svaren är osäkra; minska stödet om de flesta kan förklara.",
  },
  "4-6": {
    label: "4–6",
    planning: "Modellera först, låt eleverna jämföra två exempel och gå sedan över till en kort självständig tillämpning.",
    check: "Samla svar från hela gruppen och be eleverna motivera vilket kännetecken eller steg de använde.",
    next: "Återvänd till ett kontrasterande exempel vid en gemensam missuppfattning; gå vidare till variation om valet är säkert.",
  },
  "7-9": {
    label: "7–9",
    planning: "Synliggör ämnesspråk och beslutspunkter, jämför närliggande fall och avveckla stödet under lektionen.",
    check: "Låt eleverna först svara enskilt och sedan använda kunskapen i ett nytt fall utan att metoden anges.",
    next: "Sortera svaren efter tankesätt och rikta nästa förklaring mot det vanligaste hindret.",
  },
  gymnasiet: {
    label: "Gymnasiet",
    planning: "Knyt modellen till ämnets disciplinära arbetssätt och låt eleverna pröva den på ett mer komplext eller autentiskt material.",
    check: "Begär en självständig motivering där begrepp, metod och evidens kopplas samman i ett nytt sammanhang.",
    next: "Ge precis återkoppling (<em>feedback</em>) på den viktigaste kvalitetsdimensionen och låt eleven bearbeta svaret direkt.",
  },
};

const subjects = {
  svenska: {
    label: "Svenska",
    examples: {
      "f-3": [
        ["Bygg ordförråd inför en faktatext", "Eleverna känner igen nya ord under högläsningen men kan inte förklara dem efteråt.", "Eleverna ska kunna förklara och använda tre centrala ord om djurs livsmiljö."],
        ["Modellera en berättelses början", "Eleverna börjar skriva direkt men saknar en tydlig situation, person och händelse.", "Eleverna ska kunna skapa en inledning som presenterar vem, var och vad som händer."],
      ],
      "4-6": [
        ["Skilj huvudidé från detalj", "Eleverna återberättar många detaljer men har svårt att formulera textens huvudidé.", "Eleverna ska kunna formulera huvudidén och välja två detaljer som stödjer den."],
        ["Bygg ett argumenterande stycke", "Eleverna uttrycker en åsikt men utvecklar inte argumentet med skäl och belägg.", "Eleverna ska kunna skriva ett stycke med tes, argument och ett relevant belägg."],
      ],
      "7-9": [
        ["Jämför berättarperspektiv", "Eleverna kan namnge perspektiv men har svårt att se hur perspektivet påverkar läsarens förståelse.", "Eleverna ska kunna jämföra två berättarperspektiv och förklara en effekt på läsaren."],
        ["Modellera ett utvecklat resonemang", "Elevernas litterära resonemang stannar vid påståenden utan textbelägg och förklaring.", "Eleverna ska kunna koppla påstående, textbelägg och tolkning i ett sammanhängande stycke."],
      ],
      gymnasiet: [
        ["Analysera retoriska val", "Eleverna hittar stilfigurer men kopplar dem inte till talets syfte, situation och publik.", "Eleverna ska kunna förklara hur två retoriska val bidrar till talets avsedda verkan."],
        ["Skriv en utredande syntes", "Eleverna sammanfattar källor en i taget men för inte samman dem kring en gemensam fråga.", "Eleverna ska kunna ordna flera källor tematiskt och formulera en underbyggd syntes."],
      ],
    },
  },
  matematik: {
    label: "Matematik",
    examples: {
      "f-3": [
        ["Förstå tiotalsövergång", "Eleverna räknar vidare ett steg i taget och tappar strukturen när summan passerar ett tiotal.", "Eleverna ska kunna dela upp ett tal för att först bilda ett helt tiotal."],
        ["Välj räknesätt i textproblem", "Eleverna väljer räknesätt efter enstaka signalord i stället för problemets relation.", "Eleverna ska kunna avgöra om en situation beskriver att lägga ihop, ta bort eller jämföra."],
      ],
      "4-6": [
        ["Jämför bråk med olika nämnare", "Eleverna jämför nämnarna som heltal och tror exempelvis att en åttondel är större än en fjärdedel.", "Eleverna ska kunna jämföra bråk genom en gemensam representation eller referenspunkt."],
        ["Välj metod för procentproblem", "Eleverna kan en procedur i taget men fastnar när del, andel och helhet blandas.", "Eleverna ska kunna identifiera vad som är känt och välja en passande beräkning."],
      ],
      "7-9": [
        ["Modellera ekvationslösning", "Eleverna flyttar termer mekaniskt och tappar innebörden av likhet.", "Eleverna ska kunna motivera varje operation med att likheten bevaras."],
        ["Skilj linjära och proportionella samband", "Eleverna ser en rät linje och antar att sambandet alltid är proportionellt.", "Eleverna ska kunna avgöra sambandstyp med hjälp av graf, tabell och formel."],
      ],
      gymnasiet: [
        ["Välj modell för förändring", "Eleverna använder linjär eller exponentiell modell utifrån ytliga ord i uppgiften.", "Eleverna ska kunna motivera modellvalet genom att analysera differens, kvot och antaganden."],
        ["Analysera en derivatas betydelse", "Eleverna deriverar korrekt men kopplar inte resultatet till förändringshastighet i situationen.", "Eleverna ska kunna tolka derivatans värde och enhet i ett givet sammanhang."],
      ],
    },
  },
  engelska: {
    label: "Engelska",
    examples: {
      "f-3": [
        ["Återkalla ord i ett nytt sammanhang", "Eleverna känner igen bildkort men kan inte själva plocka fram orden i tal.", "Eleverna ska kunna benämna och använda sex vardagsord i korta muntliga fraser."],
        ["Modellera en enkel muntlig dialog", "Eleverna kan enskilda fraser men behöver stöd för att turas om i ett samtal.", "Eleverna ska kunna hälsa, ställa en enkel fråga och ge ett relevant svar."],
      ],
      "4-6": [
        ["Befäst högfrekventa ord", "Eleverna har mött orden många gånger men stavning och användning är fortfarande osäkra.", "Eleverna ska kunna återkalla och använda åtta högfrekventa ord i egna meningar."],
        ["Bygg en beskrivande text", "Eleverna staplar korta meningar utan tydlig ordning eller sambandsord.", "Eleverna ska kunna ordna en beskrivning och binda samman meningar med relevanta sambandsord."],
      ],
      "7-9": [
        ["Variera verbtempus i berättande", "Eleverna känner igen tempus i övningar men växlar omotiverat i egen text.", "Eleverna ska kunna välja och hålla ett berättande tempus samt motivera avsiktliga skiften."],
        ["Utveckla muntliga resonemang", "Eleverna ger korta åsikter men saknar skäl, exempel och sätt att bygga vidare.", "Eleverna ska kunna uttrycka en ståndpunkt, ge ett skäl och bemöta en följdfråga."],
      ],
      gymnasiet: [
        ["Anpassa stil och register", "Eleverna skriver grammatiskt korrekt men använder samma register oavsett mottagare och syfte.", "Eleverna ska kunna jämföra och välja språkliga drag för ett formellt respektive informellt sammanhang."],
        ["Syntetisera källor i en argumentation", "Eleverna refererar källor separat utan att använda dem för att bygga ett eget resonemang.", "Eleverna ska kunna föra samman två engelskspråkiga källor som stöd och motargument."],
      ],
    },
  },
  no: {
    label: "NO",
    examples: {
      "f-3": [
        ["Förklara vad ett frö behöver", "Eleverna minns enstaka fakta men blandar ihop vad fröet behöver för att gro och växten för att växa.", "Eleverna ska kunna förutsäga och förklara hur vatten, temperatur och ljus påverkar olika steg."],
        ["Sortera material efter egenskaper", "Eleverna sorterar efter färg eller tycke i stället för den egenskap som undersöks.", "Eleverna ska kunna sortera material efter en angiven egenskap och motivera gränsfall."],
      ],
      "4-6": [
        ["Bygg en partikelmodell", "Eleverna beskriver fasövergångar som att partiklar försvinner eller själva blir större.", "Eleverna ska kunna använda en partikelmodell för att förklara smältning och avdunstning."],
        ["Planera en rättvis undersökning", "Eleverna ändrar flera faktorer samtidigt och kan därför inte tolka resultatet.", "Eleverna ska kunna välja en variabel att ändra, hålla andra konstanta och ange vad som mäts."],
      ],
      "7-9": [
        ["Förklara fotosyntes som system", "Eleverna kan reaktionsformeln men kopplar inte ämnesomvandlingen till energi och växtens massa.", "Eleverna ska kunna förklara fotosyntesen med både partikel- och energiperspektiv."],
        ["Skilj kraft från rörelse", "Eleverna antar att ett föremål i rörelse alltid måste ha en kraft i rörelsens riktning.", "Eleverna ska kunna analysera krafter och förutsäga förändring av rörelse i kontrasterande fall."],
      ],
      gymnasiet: [
        ["Koppla representationer i kemi", "Eleverna kan räkna men tappar sambandet mellan observerbart fenomen, partikelnivå och symbolisk notation.", "Eleverna ska kunna förklara samma kemiska förlopp på makro-, partikel- och symbolnivå."],
        ["Tolka osäkerhet i laborationsdata", "Eleverna redovisar mätvärden men behandlar avvikelse som slarv utan att analysera osäkerhet.", "Eleverna ska kunna skilja slumpmässiga och systematiska fel samt bedöma slutsatsens styrka."],
      ],
    },
  },
  so: {
    label: "SO",
    examples: {
      "f-3": [
        ["Bygg en enkel tidslinje", "Eleverna känner till händelser men blandar ordning, tidsavstånd och dåtid med nutid.", "Eleverna ska kunna ordna händelser och använda före, efter och samtidigt."],
        ["Jämför regler och demokratiska beslut", "Eleverna ser regler som något vuxna bestämmer men urskiljer inte hur gemensamma beslut kan fattas.", "Eleverna ska kunna jämföra ett ensidigt beslut med ett gemensamt demokratiskt beslut."],
      ],
      "4-6": [
        ["Förklara orsak och konsekvens", "Eleverna radar upp historiska fakta utan att visa hur händelser hänger samman.", "Eleverna ska kunna koppla två orsaker till en konsekvens och förklara sambanden."],
        ["Läsa kartan som modell", "Eleverna hittar platser men tolkar inte skala, symboler och höjdkurvor som representationer.", "Eleverna ska kunna använda kartans tecken för att dra en slutsats om ett område."],
      ],
      "7-9": [
        ["Pröva en källas användbarhet", "Eleverna bedömer en källa som helt trovärdig eller helt opålitlig utan koppling till frågan.", "Eleverna ska kunna bedöma en källas användbarhet utifrån syfte, närhet, beroende och tendens."],
        ["Jämför ekonomiska perspektiv", "Eleverna minns definitioner men använder inte modellerna för att tolka samma samhällsproblem.", "Eleverna ska kunna jämföra hur två ekonomiska perspektiv förklarar och hanterar ett problem."],
      ],
      gymnasiet: [
        ["Analysera en historisk förklaring", "Eleverna nämner många orsaker men värderar inte deras betydelse eller samspel.", "Eleverna ska kunna väga strukturella och aktörsbaserade orsaker i en sammanhängande förklaring."],
        ["Granska ett samhällsvetenskapligt påstående", "Eleverna tolkar korrelation som orsak och bortser från urval, mätning och alternativa förklaringar.", "Eleverna ska kunna granska belägg och formulera en rimligt avgränsad slutsats."],
      ],
    },
  },
};

function createSubject(label, topics) {
  const examples = {};
  for (const [stageId, stageTopics] of Object.entries(topics)) {
    examples[stageId] = stageTopics.map(([title, goal], index) => [
      title,
      index === 0
        ? "Eleverna känner igen centrala ord och exempel under genomgången men har svårt att förklara sambandet självständigt."
        : "Eleverna kan följa en visad modell men har svårt att välja och motivera arbetssättet i ett nytt fall.",
      goal,
    ]);
  }
  return { label, examples };
}

delete subjects.no;
delete subjects.so;

Object.assign(subjects, {
  biologi: createSubject("Biologi", {
    "f-3": [
      ["Vad behöver ett frö för att gro?", "Eleverna ska kunna skilja vad ett frö behöver för att gro från vad en växt behöver för att fortsätta växa."],
      ["Jämför djurs livsmiljöer", "Eleverna ska kunna koppla två egenskaper hos ett djur till dess livsmiljö."],
    ],
    "4-6": [
      ["Bygg en enkel näringskedja", "Eleverna ska kunna förklara hur energi förs vidare mellan producent, konsument och nedbrytare."],
      ["Modellera kroppens transportsystem", "Eleverna ska kunna beskriva hur andning, blodomlopp och celler samverkar."],
    ],
    "7-9": [
      ["Förklara fotosyntes och cellandning", "Eleverna ska kunna jämföra processerna och koppla ämnesomvandling till energiflöde."],
      ["Analysera naturligt urval", "Eleverna ska kunna använda variation, ärftlighet och selektion för att förklara förändring i en population."],
    ],
    gymnasiet: [
      ["Koppla genuttryck till protein", "Eleverna ska kunna förklara informationsflödet från DNA via RNA till protein och förutsäga följder av en förändring."],
      ["Analysera reglering i ett ekosystem", "Eleverna ska kunna använda återkopplingsmekanismer och begränsande faktorer för att analysera populationsförändringar."],
    ],
  }),
  fysik: createSubject("Fysik", {
    "f-3": [
      ["Undersök ljus och skugga", "Eleverna ska kunna förutsäga hur en skugga förändras när ljuskällan eller föremålet flyttas."],
      ["Beskriv ljud som vibration", "Eleverna ska kunna koppla synliga eller kännbara vibrationer till att ljud uppstår."],
    ],
    "4-6": [
      ["Bygg en fungerande elektrisk krets", "Eleverna ska kunna förklara villkoren för en sluten krets och felsöka en enkel koppling."],
      ["Jämför krafter i vardagen", "Eleverna ska kunna identifiera kraft, riktning och förändring av rörelse i konkreta situationer."],
    ],
    "7-9": [
      ["Skilj kraft från rörelse", "Eleverna ska kunna analysera nettokraft och förutsäga hur ett föremåls rörelse förändras."],
      ["Koppla energiomvandlingar", "Eleverna ska kunna följa energi genom ett system och skilja energiform från energibärare."],
    ],
    gymnasiet: [
      ["Tolka rörelsediagram", "Eleverna ska kunna översätta mellan läge-, hastighets- och accelerationsdiagram och en fysisk rörelse."],
      ["Modellera ett elektriskt fält", "Eleverna ska kunna använda fältbegreppet för att förutsäga kraft och potential i en ny situation."],
    ],
  }),
  kemi: createSubject("Kemi", {
    "f-3": [
      ["Sortera material efter egenskaper", "Eleverna ska kunna sortera material efter en angiven egenskap och motivera ett gränsfall."],
      ["Följ en förändring av vatten", "Eleverna ska kunna beskriva smältning, frysning och avdunstning med observationer."],
    ],
    "4-6": [
      ["Bygg en partikelmodell", "Eleverna ska kunna använda en partikelmodell för att förklara skillnader mellan fast form, vätska och gas."],
      ["Skilj blandning från lösning", "Eleverna ska kunna jämföra blandning, lösning och kemisk förändring med hjälp av observationer."],
    ],
    "7-9": [
      ["Skilj atom, jon och molekyl", "Eleverna ska kunna använda partikelbilder och kemiska symboler för att klassificera olika partiklar."],
      ["Förklara en kemisk reaktion", "Eleverna ska kunna visa hur atomer omgrupperas och hur massa bevaras i en reaktion."],
    ],
    gymnasiet: [
      ["Koppla kemins tre representationsnivåer", "Eleverna ska kunna beskriva samma förlopp på makro-, partikel- och symbolnivå."],
      ["Analysera kemisk jämvikt", "Eleverna ska kunna använda reaktionshastigheter för att förutsäga hur ett jämviktssystem påverkas."],
    ],
  }),
  historia: createSubject("Historia", {
    "f-3": [
      ["Ordna händelser på en tidslinje", "Eleverna ska kunna använda före, efter och samtidigt för att beskriva kronologi."],
      ["Jämför vardagsliv förr och nu", "Eleverna ska kunna beskriva en förändring och en kontinuitet med stöd i konkreta källor."],
    ],
    "4-6": [
      ["Förklara orsak och konsekvens", "Eleverna ska kunna koppla två orsaker till en historisk förändring och beskriva en konsekvens."],
      ["Använd en historisk källa", "Eleverna ska kunna dra en avgränsad slutsats om det förflutna med stöd i en källa."],
    ],
    "7-9": [
      ["Jämför revolutioners orsaker", "Eleverna ska kunna jämföra strukturella och utlösande orsaker i två revolutioner."],
      ["Bedöm en källas användbarhet", "Eleverna ska kunna bedöma en källas användbarhet för en bestämd historisk fråga."],
    ],
    gymnasiet: [
      ["Väg historiska förklaringar", "Eleverna ska kunna värdera samspelet mellan aktörer, strukturer och utlösande händelser."],
      ["Analysera historiebruk", "Eleverna ska kunna förklara hur och varför historia används i ett samtida sammanhang."],
    ],
  }),
  samhällskunskap: createSubject("Samhällskunskap", {
    "f-3": [
      ["Jämför sätt att fatta beslut", "Eleverna ska kunna skilja ett ensidigt beslut från ett gemensamt demokratiskt beslut."],
      ["Förstå en enkel samhällsfunktion", "Eleverna ska kunna förklara varför en gemensam samhällsfunktion behövs och vem den hjälper."],
    ],
    "4-6": [
      ["Skilj rättighet från skyldighet", "Eleverna ska kunna klassificera och motivera exempel på rättigheter och skyldigheter."],
      ["Följ en vara genom ekonomin", "Eleverna ska kunna beskriva samband mellan hushåll, företag och offentlig verksamhet."],
    ],
    "7-9": [
      ["Jämför politiska perspektiv", "Eleverna ska kunna använda två politiska perspektiv för att analysera samma samhällsfråga."],
      ["Skilj fakta, värdering och förklaring", "Eleverna ska kunna klassificera påståenden och motivera vad som skiljer dem åt."],
    ],
    gymnasiet: [
      ["Granska ett samhällsvetenskapligt påstående", "Eleverna ska kunna bedöma urval, mätning, korrelation och alternativa förklaringar."],
      ["Analysera ekonomisk politik", "Eleverna ska kunna jämföra hur två ekonomiska åtgärder påverkar olika mål och grupper."],
    ],
  }),
  geografi: createSubject("Geografi", {
    "f-3": [
      ["Läs en enkel karta", "Eleverna ska kunna använda symboler, väderstreck och lägesord för att beskriva en väg."],
      ["Jämför två platser", "Eleverna ska kunna jämföra natur, bebyggelse och människors användning av två platser."],
    ],
    "4-6": [
      ["Tolka skala och karttecken", "Eleverna ska kunna använda skala, teckenförklaring och höjdmarkering för att dra en slutsats."],
      ["Förklara vattnets kretslopp geografiskt", "Eleverna ska kunna koppla kretsloppet till landskap, väder och människors vattenanvändning."],
    ],
    "7-9": [
      ["Förklara befolkningsfördelning", "Eleverna ska kunna använda naturgivna och samhälleliga faktorer för att förklara ett bosättningsmönster."],
      ["Analysera en intressekonflikt", "Eleverna ska kunna jämföra aktörers intressen och konsekvenser av olika markanvändning."],
    ],
    gymnasiet: [
      ["Analysera sårbarhet för naturhändelser", "Eleverna ska kunna skilja naturhändelse från katastrof och analysera exponering, sårbarhet och beredskap."],
      ["Bedöm en hållbarhetsstrategi", "Eleverna ska kunna väga ekologiska, ekonomiska och sociala konsekvenser på flera skalnivåer."],
    ],
  }),
  religionskunskap: createSubject("Religionskunskap", {
    "f-3": [
      ["Jämför högtider utan att generalisera", "Eleverna ska kunna beskriva likheter och skillnader mellan två högtider med respekt för variation."],
      ["Samtala om en enkel livsfråga", "Eleverna ska kunna uttrycka ett eget perspektiv och återge ett annat perspektiv rättvist."],
    ],
    "4-6": [
      ["Skilj symbol, ritual och berättelse", "Eleverna ska kunna klassificera exempel och förklara hur de kan hänga samman i en tradition."],
      ["Jämför religiös praktik", "Eleverna ska kunna jämföra två praktiker och undvika att beskriva alla troende som lika."],
    ],
    "7-9": [
      ["Analysera religionens uttryck", "Eleverna ska kunna skilja individ-, grupp- och traditionsnivå i ett konkret exempel."],
      ["Pröva ett etiskt resonemang", "Eleverna ska kunna använda två etiska modeller och jämföra deras slutsatser i ett dilemma."],
    ],
    gymnasiet: [
      ["Analysera religion och identitet", "Eleverna ska kunna förklara hur religiös identitet samspelar med andra identitetsdimensioner och sammanhang."],
      ["Jämför etiska teorier", "Eleverna ska kunna använda konsekvensetik, pliktetik och dygdetik för att analysera ett komplext fall."],
    ],
  }),
});

const principles = [
  "Begreppsundervisning, återkallningsövning (<em>retrieval practice</em>) och utspridd övning (<em>spacing</em>)",
  "Genomarbetat exempel (<em>worked example</em>), modellering (<em>modeling</em>) och avvecklat stöd",
];

const examples = [];
for (const [subjectId, subject] of Object.entries(subjects)) {
  for (const [stageId, stage] of Object.entries(stages)) {
    subject.examples[stageId].forEach(([title, problem, goal], index) => {
      examples.push({
        id: `${subjectId}-${stageId}-${index + 1}`,
        subject: subjectId,
        subjectLabel: subject.label,
        stage: stageId,
        stageLabel: stage.label,
        title,
        teacherProblem: problem,
        goal,
        principle: principles[index],
        lessonSequence: [
          stage.planning,
          index === 0
            ? "Aktivera nödvändiga förkunskaper och låt eleverna först försöka återkalla det centrala utan stöd."
            : "Visa ett tydligt exempel, tänk högt om de avgörande valen och låt eleverna förklara varför stegen fungerar.",
          index === 0
            ? "Jämför ett korrekt exempel med ett närliggande icke-exempel och låt eleverna motivera skillnaden."
            : "Gå över till ett delvis löst exempel och därefter en självständig tillämpning med mindre stöd.",
        ],
        check: stage.check,
        nextStep: stage.next,
      });
    });
  }
}

const output = {
  subjects: Object.entries(subjects).map(([id, subject]) => ({ id, label: subject.label })),
  stages: Object.entries(stages).map(([id, stage]) => ({ id, label: stage.label })),
  examples,
};

const outputPath = path.join(__dirname, "..", "data", "teacher-examples.json");
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`Skapade ${examples.length} lärar­exempel.`);
