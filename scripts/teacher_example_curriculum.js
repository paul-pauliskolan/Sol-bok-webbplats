// Kontrollerade styrdokumentskopplingar för samtliga exempel i lärarens exempelbank.
// Formuleringarna är korta sammanfattningar av relevant centralt innehåll, inte citat.

const lgrUrls = {
  svenska: "https://syllabuswebb.skolverket.se/syllabuscw/jsp/subject.htm?subjectCode=GRGRSVE01&tos=gr",
  matematik: "https://syllabuswebb.skolverket.se/syllabuscw/jsp/subject.htm?subjectCode=GRGRMAT01&tos=gr",
  engelska: "https://syllabuswebb.skolverket.se/syllabuscw/jsp/subject.htm?subjectCode=GRGRENG01&tos=gr",
  biologi: "https://syllabuswebb.skolverket.se/syllabuscw/jsp/subject.htm?subjectCode=GRGRBIO01&tos=gr",
  fysik: "https://syllabuswebb.skolverket.se/syllabuscw/jsp/subject.htm?subjectCode=GRGRFYS01&tos=gr",
  kemi: "https://syllabuswebb.skolverket.se/syllabuscw/jsp/subject.htm?subjectCode=GRGRKEM01&tos=gr",
  historia: "https://syllabuswebb.skolverket.se/syllabuscw/jsp/subject.htm?subjectCode=GRGRHIS01&tos=gr",
  samhällskunskap: "https://syllabuswebb.skolverket.se/syllabuscw/jsp/subject.htm?subjectCode=GRGRSAM01&tos=gr",
  geografi: "https://syllabuswebb.skolverket.se/syllabuscw/jsp/subject.htm?subjectCode=GRGRGEO01&tos=gr",
  religionskunskap: "https://syllabuswebb.skolverket.se/syllabuscw/jsp/subject.htm?subjectCode=GRGRREL01&tos=gr",
};

const gyUrls = {
  svenska: "https://syllabuswebb.skolverket.se/syllabuscw/jsp/subject.htm?subjectCode=SVEN&tos=gy",
  matematik: "https://syllabuswebb.skolverket.se/syllabuscw/jsp/subject.htm?subjectCode=MATE&tos=gy",
  matematikFortsattning: "https://syllabuswebb.skolverket.se/syllabuscw/jsp/subject.htm?subjectCode=MATO&tos=gy",
  engelska: "https://syllabuswebb.skolverket.se/syllabuscw/jsp/subject.htm?subjectCode=ENGE&tos=gy",
  biologi: "https://syllabuswebb.skolverket.se/syllabuscw/jsp/subject.htm?subjectCode=BIOG&tos=gy",
  fysik: "https://syllabuswebb.skolverket.se/syllabuscw/jsp/subject.htm?subjectCode=FYSK&tos=gy",
  kemi: "https://syllabuswebb.skolverket.se/syllabuscw/jsp/subject.htm?subjectCode=KEMI&tos=gy",
  historia: "https://syllabuswebb.skolverket.se/syllabuscw/jsp/subject.htm?subjectCode=HIST&tos=gy",
  samhällskunskap: "https://syllabuswebb.skolverket.se/syllabuscw/jsp/subject.htm?subjectCode=SAMH&tos=gy",
  geografi: "https://syllabuswebb.skolverket.se/syllabuscw/jsp/subject.htm?subjectCode=GEOG&tos=gy",
  religionskunskap: "https://syllabuswebb.skolverket.se/syllabuscw/jsp/subject.htm?subjectCode=RELI&tos=gy",
};

const subjectLabels = {
  svenska: "Svenska",
  matematik: "Matematik",
  engelska: "Engelska",
  biologi: "Biologi",
  fysik: "Fysik",
  kemi: "Kemi",
  historia: "Historia",
  samhällskunskap: "Samhällskunskap",
  geografi: "Geografi",
  religionskunskap: "Religionskunskap",
};

const stageLabels = {
  "f-3": "förskoleklassens del 3 och centralt innehåll för årskurs 1–3",
  "4-6": "centralt innehåll för årskurs 4–6",
  "7-9": "centralt innehåll för årskurs 7–9",
};

const preschoolNotes = {
  svenska:
    "Förskoleklassens centrala innehåll omfattar samtal, berättande, ord och begrepp samt bokstäver och andra symboler. Exemplet kan därför användas inom området Språk och kommunikation.",
  matematik:
    "Förskoleklassens centrala innehåll omfattar matematiska resonemang, naturliga tal och enkla matematiska problem. Exemplet kan därför användas inom området Matematiska resonemang och uttrycksformer.",
  engelska:
    "Förskoleklassen har inget separat obligatoriskt centralt innehåll i engelska. För årskurs 1–3 är placeringen direkt; i förskoleklass kan exemplet endast användas som kompletterande innehåll utifrån elevernas behov och intressen.",
  biologi:
    "Förskoleklassens centrala innehåll omfattar naturen, växter och djur samt enkla undersökningar och dokumentation. Exemplet kan därför användas inom området Natur, teknik och samhälle.",
  fysik:
    "Förskoleklassens centrala innehåll omfattar fysikaliska fenomen som eleverna möter i vardagen samt enkla undersökningar. Exemplet kan därför användas inom området Natur, teknik och samhälle.",
  kemi:
    "Förskoleklassens centrala innehåll omfattar kemiska fenomen, material och ämnen som eleverna möter i vardagen samt enkla undersökningar. Exemplet kan därför användas inom området Natur, teknik och samhälle.",
  historia:
    "Förskoleklassens centrala innehåll omfattar tidsbegrepp, förändring över tid och företeelser i elevernas närmiljö. Exemplet kan därför användas inom området Natur, teknik och samhälle.",
  samhällskunskap:
    "Förskoleklassens centrala innehåll omfattar demokratiska principer, regler, rättigheter och företeelser i närmiljön. Exemplet kan därför användas inom området Natur, teknik och samhälle.",
  geografi:
    "Förskoleklassens centrala innehåll omfattar orientering i närmiljön, lägesord samt natur och samhälle i elevens omgivning. Exemplet kan därför användas inom området Natur, teknik och samhälle.",
  religionskunskap:
    "Förskoleklassens centrala innehåll omfattar livsfrågor, normer och olika sätt att tänka och leva. Exemplet kan därför användas i förskoleklassens ämnesövergripande undervisning.",
};

function lgr(subject, stage, alignment) {
  const mapping = {
    framework: "Lgr22",
    placement: stageLabels[stage],
    alignment,
    sourceTitle: `${subjectLabels[subject]} i Lgr22`,
    sourceUrl: lgrUrls[subject],
  };
  if (stage === "f-3") {
    mapping.preschoolAlignment = preschoolNotes[subject];
    mapping.additionalSourceTitle = "Skolverkets vägledning om läroplanen för förskoleklassen";
    mapping.additionalSourceUrl =
      "https://www.skolverket.se/undervisning/forskoleklass-och-fritidshem/sa-anvander-du-laroplanen-for-forskoleklassen-och-fritidshemmet";
  }
  return mapping;
}

function gy(subject, placement, levelCode, alignment, sourceKey = subject) {
  return {
    framework: "Gy25",
    placement,
    levelCode,
    alignment,
    sourceTitle: `${placement} i Gy25`,
    sourceUrl: gyUrls[sourceKey],
  };
}

const lgrAlignments = {
  svenska: {
    "f-3": [
      "Att läsa sakprosatexter och arbeta med ord och begrepp som behövs för att förstå och återge innehållet.",
      "Berättande texters uppbyggnad samt gemensamt och enskilt skrivande där en enkel berättelse får en tydlig inledning.",
    ],
    "4-6": [
      "Lässtrategier för att förstå och tolka texter samt att urskilja budskap, både sådant som uttrycks tydligt och sådant som är underförstått.",
      "Argumenterande texters struktur och språkliga drag samt eget skrivande anpassat till texttyp, syfte och mottagare.",
    ],
    "7-9": [
      "Analys av berättande texters uppbyggnad, berättarperspektiv och språkliga drag samt hur dessa påverkar textens innehåll och verkan.",
      "Läsning och analys av skönlitteratur samt eget skrivande där påståenden utvecklas med relevanta belägg och tolkningar.",
    ],
  },
  matematik: {
    "f-3": [
      "Naturliga tal, positionssystemet och metoder för beräkningar där tal delas upp och sätts samman.",
      "De fyra räknesättens innebörd i konkreta situationer samt strategier för att lösa och formulera matematiska problem.",
    ],
    "4-6": [
      "Tal i bråkform, deras användning och samband samt jämförelser med hjälp av bilder, tallinje och gemensamma referenspunkter.",
      "Samband mellan tal i bråk-, decimal- och procentform samt problemlösning i vardagliga situationer.",
    ],
    "7-9": [
      "Likheter, algebraiska uttryck och ekvationer samt metoder där likhetens innebörd bevaras och kan motiveras.",
      "Linjära och proportionella samband och hur de uttrycks med tabeller, grafer och algebraiska uttryck.",
    ],
  },
  engelska: {
    "f-3": [
      "Vardagliga ord och enkla fraser i talad engelska samt egen muntlig produktion med välbekant innehåll.",
      "Enkla samtal och dialoger om välbekanta ämnen där eleverna hälsar, frågar, svarar och turas om.",
    ],
    "4-6": [
      "Språkliga företeelser, däribland ord, fasta uttryck och stavning, i elevernas egen muntliga och skriftliga produktion.",
      "Enkla beskrivningar och meddelanden där innehållet ordnas och binds samman för att bli begripligt.",
    ],
    "7-9": [
      "Språkliga företeelser, exempelvis grammatiska strukturer och tempus, som eleverna använder för att förtydliga och variera egna texter.",
      "Samtal och diskussioner där eleverna uttrycker åsikter, argumenterar, ställer följdfrågor och använder strategier för att föra samtalet vidare.",
    ],
  },
  biologi: {
    "f-3": [
      "Årstidsväxlingar i naturen, växters livscykler och enkla undersökningar där observationer jämförs och dokumenteras.",
      "Några djurs och växters anpassningar till olika årstider och livsmiljöer.",
    ],
    "4-6": [
      "Näringskedjor och samband mellan organismer i ekosystem, inklusive producenter, konsumenter och nedbrytare.",
      "Människans organsystem och hur organ samverkar, exempelvis andning och blodomlopp.",
    ],
    "7-9": [
      "Fotosyntes och cellandning samt materiens kretslopp och energins flöden i ekosystem.",
      "Evolutionens mekanismer, däribland ärftlig variation och naturligt urval, och hur populationer förändras över tid.",
    ],
  },
  fysik: {
    "f-3": [
      "Människans upplevelser av ljus med olika sinnen samt enkla undersökningar som planeras, utförs och dokumenteras.",
      "Människans upplevelser av ljud med olika sinnen samt enkla undersökningar som planeras, utförs och dokumenteras.",
    ],
    "4-6": [
      "Elektriska kretsar med batterier och hur de kan användas i vardaglig elektrisk utrustning.",
      "Krafter och rörelser som kan observeras i vardagliga situationer och hur de kan beskrivas och undersökas.",
    ],
    "7-9": [
      "Krafter, rörelser och rörelseförändringar samt fysikaliska modeller för att beskriva och förutsäga dem.",
      "Energiformer, energiomvandlingar, energiflöden och energiprincipen i fysikaliska system.",
    ],
  },
  kemi: {
    "f-3": [
      "Material i omgivningen, hur de kan sorteras efter egenskaper och hur materialen kan undersökas och dokumenteras.",
      "Vattnets olika former samt övergångar mellan fast form, vätska och gas i vardagliga observationer.",
    ],
    "4-6": [
      "En partikelmodell för att beskriva och förklara materiens uppbyggnad och egenskaper i fast form, vätska och gas.",
      "Vanliga blandningar, lösningar och metoder för att dela upp dem i deras olika beståndsdelar.",
    ],
    "7-9": [
      "Atomer, elektroner och kärnpartiklar samt hur atomer kan bilda molekyler och joner.",
      "Kemiska reaktioner där ämnen omvandlas, atomer omgrupperas och massan bevaras.",
    ],
  },
  historia: {
    "f-3": [
      "Tidslinjer och tidsbegrepp för att ange och ordna händelser i tid.",
      "Människors levnadsvillkor förr i tiden, skildrade genom berättelser, föremål, bilder och andra konkreta källor.",
    ],
    "4-6": [
      "Orsaker till och konsekvenser av historiska förändringar i Norden samt hur händelser och utvecklingslinjer hänger samman.",
      "Historiska källor från tidsperioderna och hur de kan användas för att dra slutsatser om människors liv och villkor.",
    ],
    "7-9": [
      "Revolutioner, industrialisering och samhällsomvandlingar samt analys av bakomliggande och utlösande orsaker och följder.",
      "Tolkning och användning av historiska källor utifrån en bestämd historisk fråga och källans sammanhang.",
    ],
  },
  samhällskunskap: {
    "f-3": [
      "Normer och regler i elevens livsmiljö samt demokratiska principer och hur gemensamma beslut kan fattas.",
      "Samhällsfunktioner och yrken i närområdet samt vilken betydelse de har för människors vardag.",
    ],
    "4-6": [
      "De mänskliga rättigheterna och barnets rättigheter samt rättigheter och skyldigheter i ett demokratiskt samhälle.",
      "Privatekonomi samt relationer mellan arbete, inkomst, konsumtion, skatt och offentlig verksamhet.",
    ],
    "7-9": [
      "Politiska ideologier och hur skiljelinjer mellan politiska ståndpunkter kan uttryckas i aktuella samhällsfrågor.",
      "Granskning av information och kommunikation samt hur fakta, värderingar och olika förklaringar kan skiljas åt och värderas.",
    ],
  },
  geografi: {
    "f-3": [
      "Mentala kartor och enkla kartor över närområdet samt väderstreck, symboler och lägesord.",
      "Natur- och kulturlandskap i närområdet och hur människor använder och förändrar platser.",
    ],
    "4-6": [
      "Kartor och deras uppbyggnad med skala, symboler, färger och höjdangivelser samt geografiska informationskällor.",
      "Vattnets betydelse, fördelning och kretslopp samt hur naturprocesser och människors vattenanvändning påverkar landskap.",
    ],
    "7-9": [
      "Rumslig fördelning av befolkning och verksamheter samt naturgivna och samhälleliga orsaker till bosättningsmönster.",
      "Intressekonflikter om naturresurser och markanvändning samt konsekvenser för människor, samhälle och miljö.",
    ],
  },
  religionskunskap: {
    "f-3": [
      "Några högtider, symboler och berättelser inom kristendom, islam och judendom samt variation i hur de uppmärksammas.",
      "Samtal om moraliska frågor och livsfrågor med betydelse för eleven, där olika uppfattningar får komma fram.",
    ],
    "4-6": [
      "Ritualer, religiöst motiverade levnadsregler och heliga platser och rum samt centrala berättelser och symboler.",
      "Likheter och skillnader inom och mellan religioner samt hur religiös praktik kan variera mellan människor och grupper.",
    ],
    "7-9": [
      "Religioners och andra livsåskådningars betydelse för identitet på individ-, grupp- och samhällsnivå.",
      "Analys av etiska frågor med etiska modeller och begrepp samt jämförelser mellan möjliga handlingar och konsekvenser.",
    ],
  },
};

const mappings = {};
for (const [subject, stages] of Object.entries(lgrAlignments)) {
  for (const [stage, alignments] of Object.entries(stages)) {
    alignments.forEach((alignment, index) => {
      mappings[`${subject}-${stage}-${index + 1}`] = lgr(subject, stage, alignment);
    });
  }
}

Object.assign(mappings, {
  "svenska-gymnasiet-1": gy(
    "svenska",
    "Svenska, nivå 3",
    "SVEN3000X",
    "Kritisk granskning av retoriken i muntliga framställningar, där retoriska val analyseras i relation till sammanhang, syfte och mottagare.",
  ),
  "svenska-gymnasiet-2": gy(
    "svenska",
    "Svenska, nivå 2",
    "SVEN2000X",
    "Utredande och argumenterande skrivande där information från flera källor sammanställs, värderas och används med fungerande referat och citat.",
  ),
  "matematik-gymnasiet-1": gy(
    "matematik",
    "Matematik, nivå 1b eller 1c",
    "MATE1B00X / MATE1C00X",
    "Linjära och exponentiella funktioner som modeller för förändring samt tolkning och värdering av modellernas antaganden och begränsningar.",
  ),
  "matematik-gymnasiet-2": gy(
    "matematik",
    "Matematik – fortsättning, nivå 1b eller 1c",
    "MATO1B00X / MATO1C00X",
    "Derivata som mått på momentan förändringshastighet samt tolkning av derivata i matematiska och tillämpade sammanhang.",
    "matematikFortsattning",
  ),
  "engelska-gymnasiet-1": gy(
    "engelska",
    "Engelska, nivå 1",
    "ENGE1000X",
    "Muntlig och skriftlig produktion där språk, stil och register anpassas till syfte, mottagare och situation.",
  ),
  "engelska-gymnasiet-2": gy(
    "engelska",
    "Engelska, nivå 2",
    "ENGE2000X",
    "Bearbetning och kritisk användning av engelskspråkiga källor i sammanhängande argumentation om komplexa ämnen.",
  ),
  "biologi-gymnasiet-1": gy(
    "biologi",
    "Biologi, nivå 1",
    "BIOG1000X",
    "Genetik, genuttryck och proteinsyntes samt hur genetisk information förs vidare och kommer till uttryck.",
  ),
  "biologi-gymnasiet-2": gy(
    "biologi",
    "Biologi, nivå 1",
    "BIOG1000X",
    "Ekosystems struktur och dynamik, energiflöden, kretslopp, bärkraft och faktorer som reglerar populationers storlek.",
  ),
  "fysik-gymnasiet-1": gy(
    "fysik",
    "Fysik, nivå 1a1 eller 1b",
    "FYSK1A10X / FYSK1B00X",
    "Likformig och accelererad rörelse samt matematisk och grafisk behandling av läge, hastighet och acceleration.",
  ),
  "fysik-gymnasiet-2": gy(
    "fysik",
    "Fysik, nivå 1a1 eller 1b",
    "FYSK1A10X / FYSK1B00X",
    "Elektrisk laddning, elektriska fält, potential och krafter samt modeller för att beskriva och beräkna elektriska fenomen.",
  ),
  "kemi-gymnasiet-1": gy(
    "kemi",
    "Kemi, nivå 1",
    "KEMI1000X",
    "Kemiska reaktioner och hur de kan beskrivas på makroskopisk nivå, partikelnivå och med kemiska formler och reaktionsformler.",
  ),
  "kemi-gymnasiet-2": gy(
    "kemi",
    "Kemi, nivå 2",
    "KEMI2000X",
    "Kemisk jämvikt, jämviktsreaktioner och reaktionshastighet samt hur ett jämviktssystem påverkas av förändrade villkor.",
  ),
  "historia-gymnasiet-1": gy(
    "historia",
    "Historia, nivå 1b",
    "HIST1B00X",
    "Historiska förklaringar där aktörer och strukturer samt orsaker och konsekvenser används för att tolka förändringsprocesser.",
  ),
  "historia-gymnasiet-2": gy(
    "historia",
    "Historia, nivå 1b",
    "HIST1B00X",
    "Hur historia används i olika sammanhang och för skilda syften samt vilka betydelser historiebruk får i nutiden.",
  ),
  "samhällskunskap-gymnasiet-1": gy(
    "samhällskunskap",
    "Samhällskunskap, nivå 1b",
    "SAMH1B00X",
    "Samhällsvetenskapliga metoder och modeller samt kritisk granskning av information, urval, samband och slutsatser.",
  ),
  "samhällskunskap-gymnasiet-2": gy(
    "samhällskunskap",
    "Samhällskunskap, nivå 1b",
    "SAMH1B00X",
    "Samhällsekonomi, ekonomisk politik och resursfördelning samt hur åtgärder påverkar samhällsmål och olika grupper.",
  ),
  "geografi-gymnasiet-1": gy(
    "geografi",
    "Geografi, nivå 1",
    "GEOG1000X",
    "Naturhändelser, samhällens sårbarhet och motståndskraft samt hur exponering och beredskap påverkar konsekvenserna.",
  ),
  "geografi-gymnasiet-2": gy(
    "geografi",
    "Geografi, nivå 1",
    "GEOG1000X",
    "Hållbar utveckling där ekologiska, sociala, ekonomiska och etiska perspektiv vägs samman på olika geografiska skalnivåer.",
  ),
  "religionskunskap-gymnasiet-1": gy(
    "religionskunskap",
    "Religionskunskap, nivå 1",
    "RELI1000X",
    "Religion och livsåskådning i relation till identitet, grupptillhörighet och människors levnadsvillkor i olika sammanhang.",
  ),
  "religionskunskap-gymnasiet-2": gy(
    "religionskunskap",
    "Religionskunskap, nivå 1",
    "RELI1000X",
    "Etiska och existentiella frågor analyserade med etiska begrepp och modeller, där olika handlingsalternativ och slutsatser jämförs.",
  ),
});

module.exports = mappings;
