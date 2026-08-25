#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "..", "data", "chapters.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

const additions = {
  1: `<section class="book-expansion" data-books-expansion="1">
<h2>När synlig aktivitet lurar oss</h2>
<p><em>Instructional Illusions</em> skiljer mellan beteendemässigt, emotionellt och kognitivt engagemang. En elev kan skriva mycket, samarbeta livligt eller känna sig motiverad utan att tänka på det som målet kräver. Omvänt kan tyst och mödosamt arbete se svagt ut trots att eleven bygger hållbar kunskap. Därför behöver läraren komplettera observationer med uppgifter som kräver återkallning, förklaring eller självständig användning.</p>
<h2>Minnet är inte en passiv behållare</h2>
<p><em>Why Don’t Students Like School?</em> beskriver minnet som nära kopplat till tänkandet: det elever riktar uppmärksamheten mot och bearbetar meningsfullt har större chans att bli kvar. Det räcker alltså inte att ett viktigt påstående visas eller upprepas. Planeringen behöver styra vilket samband, problem eller exempel eleverna faktiskt tänker på.</p>
<h2>Tre kontrollfrågor efter en lektion</h2>
<ol><li>Vilken tanke fick mest av elevernas uppmärksamhet?</li><li>Vilket individuellt belägg visar mer än deltagande och igenkänning?</li><li>När ska samma kunskap återkallas igen med mindre stöd?</li></ol>
</section>`,
  2: `<section class="book-expansion" data-books-expansion="1">
<h2>Planera från den avsedda förändringen</h2>
<p><em>Developing Curriculum for Deep Thinking</em> skiljer mellan avsedd, genomförd och uppnådd läroplan. Det läraren planerade är inte automatiskt det eleverna mötte, och det genomförda är inte automatiskt det som lärdes. Planeringsmodellen blir därför en återkopplingsslinga: formulera önskat kunnande, genomför ett val, samla belägg och justera nästa steg.</p>
<h2>Mål behöver både innehåll och handling</h2>
<p>Ett mål som bara anger ett verb, exempelvis ”analysera”, säger för lite. Generella tankeprocesser är beroende av ämneskunskap. Ange därför både vad eleven ska göra och vilket innehåll, vilka begrepp eller relationer som ska användas. ”Analysera en källa” blir skarpare när målet också anger vilka kriterier och historiska kunskaper analysen kräver.</p>
<h2>Planera även för variation</h2>
<p><em>How Teaching Happens</em> framhåller att undervisning behöver vara adaptiv. Skriv före lektionen vad olika svar kan betyda och vilket nästa steg de leder till. Då blir kontrollen ett beslutstillfälle, inte bara en avslutande aktivitet.</p>
</section>`,
  3: `<section class="book-expansion" data-books-expansion="1">
<h2>Elementinteraktivitet: när delarna måste hållas ihop</h2>
<p><em>Cognitive Load Theory</em> betonar att svårigheten inte bara beror på mängden information utan på hur många nya delar som måste bearbetas i relation till varandra. En lista med tio välkända ord kan vara lättare än tre nya storheter som måste samordnas i en formel. Kartlägg därför relationerna i uppgiften, inte bara antalet steg.</p>
<h2>Fyra designproblem att leta efter</h2>
<ul><li><strong>Splittrad uppmärksamhet:</strong> eleven måste växla mellan bild, text och instruktion.</li><li><strong>Redundans:</strong> samma fullständiga information läses och sägs samtidigt utan funktion.</li><li><strong>Flyktig information:</strong> en muntlig förklaring eller animation försvinner innan den hunnit bearbetas.</li><li><strong>Expertise reversal:</strong> stöd som hjälper nybörjaren blir onödigt eller störande för den kunnigare eleven.</li></ul>
<h2>Tydlig förklaring är mer än få ord</h2>
<p><em>Just Tell Them</em> rekommenderar att ta bort vaghet, utvikningar och ovidkommande detaljer, men samtidigt göra länkar och beslut explicita. En bra förklaring är ekonomisk utan att bli underförklarad: centrala termer definieras, stegen binds samman och läraren visar hur svaret kontrolleras.</p>
</section>`,
  4: `<section class="book-expansion" data-books-expansion="1">
<h2>Återkallning måste följas av korrigering</h2>
<p><em>The Science of Learning</em> beskriver återkallning som både övning och information. Ett försök kan stärka minnet, men felaktiga svar får inte lämnas oklara. Ge ett tydligt facit eller en förklaring, låt eleven jämföra och kräva en korrigerad version. Återkopplingen bör komma medan frågan och elevens resonemang fortfarande är aktiva.</p>
<h2>Från fakta till organiserad kunskap</h2>
<p>En frågebank bör innehålla flera svarstyper: återge, ordna, rita, jämföra, välja och förklara. Faktafrågor kan bygga nödvändiga byggstenar, medan frågor om relationer visar om eleverna kan organisera dem. Blanda inte ihop högre språklig komplexitet med djupare tänkande; en kort skiss kan ibland pröva modellen bättre än en lång text.</p>
<h2>Metakognition behöver kalibrering</h2>
<p>Elever kan uppskatta sitt kunnande före återkallningen och sedan jämföra bedömningen med resultatet. Skillnaden hjälper dem att upptäcka att flyt vid omläsning inte är samma sak som självständig tillgänglighet. Använd detta lågmält och återkommande, inte som en värdering av elevens person.</p>
</section>`,
  5: `<section class="book-expansion" data-books-expansion="1">
<h2>Önskvärd svårighet kräver en fungerande grund</h2>
<p>Materialet i <em>The Science of Learning</em> och <em>Why Don’t Students Like School?</em> stödjer en viktig avgränsning: en svårare övning är inte automatiskt bättre. Svårigheten är produktiv när eleven behöver återkalla, urskilja eller välja och har tillräckliga förkunskaper för att lyckas efter ansträngning och återkoppling.</p>
<h2>Bygg en kumulativ återkomstkarta</h2>
<p>Markera fem till åtta idéer som ska leva vidare genom kursen. För varje idé planeras en första tydlig undervisning, en tidig återkallning, en senare jämförelse och en tillämpning i nytt sammanhang. Återkomsten ska vara kort men innehållsligt precis. Detta gör att kursen utvecklas kumulativt i stället för att bestå av isolerade arbetsområden.</p>
<h2>Skilj blandning från slump</h2>
<p>Blanda sådant elever behöver lära sig att skilja åt: närliggande texttyper, problem med olika metodvillkor eller begrepp med gemensamma ytdrag. Be eleven ange kategori eller metod före lösningen. Då tränas själva valet, inte bara genomförandet.</p>
</section>`,
  6: `<section class="book-expansion" data-books-expansion="1">
<h2>Kunskap som rättvise- och demokratifråga</h2>
<p><em>Developing Curriculum for Deep Thinking</em> behandlar kunskap ur kognitivt, sociologiskt och demokratiskt perspektiv. Bakgrundskunskap gör det lättare att förstå texter, delta i samtal och lära vidare. Om skolan lämnar viktig kunskap åt hem och slump förstärks skillnader mellan elever. Ett kunskapsrikt innehåll är därför inte motsatsen till tänkande eller elevinflytande, utan en förutsättning för mer självständigt deltagande.</p>
<h2>Läsförståelse är ämnesspecifik</h2>
<p><em>The Science of Reading</em> lyfter flyt, ordförråd och bakgrundskunskap som centrala även efter den första läsinlärningen. Strategier som att förutsäga och sammanfatta kan hjälpa, men de ersätter inte kunskap om textens ämne. Ämneslärare behöver därför undervisa de ord, referenser och orsakssamband som deras texter förutsätter.</p>
<h2>Gör en förkunskapskedja</h2>
<p>Utgå från slutmålet och skriv tre kolumner: nödvändiga fakta, nödvändiga begreppsrelationer och nödvändiga procedurer. Kontrollera dem med korta uppgifter. Fyll bara de luckor som faktiskt hindrar nästa steg och återkom senare så att kedjan blir tillgänglig utan stöd.</p>
</section>`,
  7: `<section class="book-expansion" data-books-expansion="1">
<h2>Från exempel till självständig problemlösning</h2>
<p><em>Cognitive Load Theory</em> beskriver en progression från fullständigt genomarbetat exempel till kompletteringsuppgift och därefter självständig lösning. I en kompletteringsuppgift är några strategiskt valda steg borttagna. Eleven behöver då generera delar av lösningen utan att bära hela problemlösningsbördan på en gång.</p>
<h2>Självförklaring gör exemplet aktivt</h2>
<p>Att visa en korrekt modell räcker inte alltid. Stanna vid beslutspunkter och fråga vilken princip som motiverar steget, vad som skulle förändras i ett kontrasterande fall och hur resultatet kan kontrolleras. Självförklaringen ska riktas mot den underliggande strukturen, inte mot att återberätta det läraren nyss gjorde.</p>
<h2>Stöd ska förändras med kunnandet</h2>
<p>Avveckla först markeringar och frågor, därefter delar av proceduren och sist valet av metod. Kontrollera individuellt mellan stegen. Stöd som tas bort för snabbt skapar sökande utan lärande; stöd som ligger kvar för länge kan bli redundant och hindra eleverna från att fatta egna beslut.</p>
</section>`,
  8: `<section class="book-expansion" data-books-expansion="1">
<h2>Teknik är inte pedagogik</h2>
<p><em>The Digital Delusion</em> varnar för att behandla digitalisering som en undervisningsmetod i sig. Frågan är inte om materialet är digitalt utan vilket tänkande verktyget framkallar, vilket stöd det ger och vad det tränger undan. Ett digitalt verktyg kan vara värdefullt för simulering, återkoppling eller tillgänglighet, men animation, valfrihet och tempo kan också splittra uppmärksamheten.</p>
<h2>Bild och text ska ha olika jobb</h2>
<p>Använd en bild när den visar relationer, rumslig struktur, förändring eller ett konkret exempel som orden inte visar lika väl. Använd ord för namn, orsaker, villkor och förklaringar. Signalera var eleven ska titta och synkronisera förklaringen med den relevanta delen. Dekoration som konkurrerar om uppmärksamheten bör tas bort.</p>
<h2>Pröva materialet före lektionen</h2>
<p>Gör ett treminuterstest: visa materialet utan muntlig förklaring och fråga vad ögat dras till, vilken relation som blir tydlig och vad som kan misstolkas. Lägg sedan till lärarens tal. Om eleven samtidigt måste läsa en annan fullständig formulering, korta texten eller ge den vid ett annat tillfälle.</p>
</section>`,
  9: `<section class="book-expansion" data-books-expansion="1">
<h2>Formativt är ett användningssätt</h2>
<p><em>Embedded Formative Assessment</em> betonar att en uppgift inte är formativ i sig. Informationen blir formativ först när läraren, eleven eller kamraten använder den för att fatta ett bättre beslut om nästa steg. En avslutningsfråga som samlas in men inte påverkar något är dokumentation, inte en fungerande formativ process.</p>
<h2>Börja med beslutet</h2>
<p>Planera baklänges: vilket beslut behöver du kunna fatta, vilket elevsvar skulle skilja alternativen åt och vilken fråga kan framkalla det svaret? Ett gemensamt felsvar kan kräva ny modellering. Spridda svar kan tyda på oklara instruktioner eller olika förkunskapsluckor. Korrekta svar utan motivering kan kräva en följdfråga innan stödet minskas.</p>
<h2>Aktivera elever som resurser utan att abdikera</h2>
<p>Kamratrespons fungerar bättre när eleverna granskar en avgränsad kvalitetsdimension, jämför med exempel och sedan förbättrar sitt eget arbete. Självbedömning behöver konkreta kriterier och belägg. Läraren behåller ansvaret för att tolka mönster och säkerställa att fel inte sprids.</p>
</section>`,
  10: `<section class="book-expansion" data-books-expansion="1">
<h2>Varför undervisningsillusioner överlever</h2>
<p><em>Instructional Illusions</em> visar hur synliga och omedelbara signaler kan få större vikt än långsiktigt lärande. Engagemang, flyt, självförtroende och en snygg produkt är lättare att se än förändringar i långtidsminnet. En metod kan därför upplevas framgångsrik trots att eleverna senare inte kan återkalla eller överföra kunnandet.</p>
<h2>En femstegsgranskning av påståenden</h2>
<ol><li>Precisera påståendet: för vem, vilket utfall och jämfört med vad?</li><li>Skilj mekanism från effekt: en rimlig förklaring är inte ett resultat.</li><li>Granska beläggets design, urval och möjliga alternativa förklaringar.</li><li>Leta efter replikation, sammanvägningar och gränsvillkor.</li><li>Översätt försiktigt till klassrummet och planera hur utfallet ska följas upp.</li></ol>
<h2>Digitala och psykologiska påståenden</h2>
<p><em>The Psychology of Great Teaching</em> påminner om skillnaden mellan korrelation och orsak samt om validitet och reliabilitet. <em>The Digital Delusion</em> tillför frågor om alternativkostnad och kommersiella intressen. Fråga därför inte bara om ett verktyg ”fungerar”, utan vilket lärande det mäter, på vilken tidsskala, för vilka elever och vad samma tid och resurser annars kunde ha använts till.</p>
</section>`,
};

const principleEmphasis = {
  1: [
    ["Minnesåterkallning", "Eleven plockar aktivt fram kunskap utan att svaret ligger synligt. Det skiljer verklig tillgänglighet i minnet från igenkänning och prestation i stunden."],
    ["Scheman och förståelse", "Ny kunskap blir begriplig när den kopplas till organiserade strukturer i långtidsminnet. Starka scheman avlastar arbetsminnet och gör fortsatt lärande lättare."],
  ],
  2: [
    ["Kognitiv belastning", "Planera mängden ny information, antalet samtidiga steg och vilket stöd eleverna behöver för att kunna tänka på det centrala."],
    ["Feedback och metakognition", "Bestäm i förväg vilket elevsvar som ska styra nästa undervisningsbeslut och låt eleverna jämföra sin säkerhet med vad de faktiskt kan visa."],
    ["Fördelad inlärning", "Planera återbesök redan när området introduceras, så att repetitionen sprids över tid i stället för att samlas precis före provet."],
  ],
  3: [
    ["Kognitiv belastning", "Dela upp komplexa förklaringar, ta bort störande information och synliggör relationerna mellan de delar som måste förstås tillsammans."],
    ["Multimodal kodning", "Kombinera ord och bild när de kompletterar varandra. Undvik att dubblera samma fullständiga budskap eller splittra elevens uppmärksamhet."],
    ["Scheman och förståelse", "Tydliga exempel hjälper elever att ordna enskilda delar till en sammanhängande mental modell."],
  ],
  4: [
    ["Minnesåterkallning", "Låt eleverna svara, förklara, rita eller använda kunskap utan att först titta i anteckningar. Själva framplockningen stärker minnet."],
    ["Fördelad inlärning", "Återkom till frågorna efter ökande mellanrum, exempelvis efter 1, 3, 7 och 14 dagar."],
    ["Feedback och metakognition", "Ge korrigerande information efter försöket och låt eleven bedöma sin säkerhet före svaret för att kalibrera sin uppfattning om det egna kunnandet."],
  ],
  5: [
    ["Fördelad inlärning", "Sprid korta återbesök över dagar och veckor. Att lite glömska hinner uppstå gör nästa minnesåterkallning mer meningsfull."],
    ["Interfoliering", "Blanda närliggande uppgiftstyper så att eleven måste urskilja vilken princip, kategori eller metod som passar."],
    ["Minnesåterkallning", "Varje återbesök bör kräva att kunskapen plockas fram, inte bara att samma material läses om."],
  ],
  6: [
    ["Scheman och förståelse", "Aktivera relevanta förkunskaper och bygg explicita samband mellan fakta, begrepp och procedurer."],
    ["Multimodal kodning", "Använd exempelvis ord och begreppsdiagram tillsammans när diagrammet visar relationer som texten beskriver."],
    ["Interfoliering", "Kontrastera liknande begrepp och exempel så att eleverna tränar på att upptäcka avgörande skillnader."],
  ],
  7: [
    ["Kognitiv belastning", "Genomarbetade exempel minskar onödigt sökande medan eleven ännu saknar ett användbart schema."],
    ["Scheman och förståelse", "Självförklaring riktar uppmärksamheten mot principerna bakom stegen och hjälper eleverna att bygga en generell modell."],
    ["Feedback och metakognition", "Kontrollera elevens förståelse mellan stödnivåerna och låt eleven motivera när och varför en metod används."],
  ],
  8: [
    ["Multimodal kodning", "Ge ord och bild olika men samordnade funktioner. Bilden kan visa struktur eller förändring medan orden namnger och förklarar."],
    ["Kognitiv belastning", "Ta bort dekoration, redundans och splittrade informationskällor som konkurrerar om arbetsminnets begränsade kapacitet."],
    ["Scheman och förståelse", "Välj representationer som hjälper eleven att se ämnets relationer, inte bara minnas en snygg yta."],
  ],
  9: [
    ["Feedback och metakognition", "Feedback ska hjälpa eleven och läraren att välja nästa steg. Elever behöver också jämföra sin egen bedömning med konkreta belägg."],
    ["Minnesåterkallning", "Frågor utan synligt svar visar vad eleverna kan plocka fram och stärker samtidigt den kunskap som återkallas."],
    ["Fördelad inlärning", "Använd senare kontrollfrågor för att avgöra om förståelsen finns kvar, inte bara om svaret fungerade direkt efter genomgången."],
  ],
  10: [
    ["Minnesåterkallning och fördelad inlärning", "Bedöm påståenden utifrån fördröjt och självständigt lärande, inte bara aktivitet eller omedelbara resultat."],
    ["Interfoliering och scheman", "Blandning är meningsfull när den tränar relevant urskiljning och hjälper elever att organisera kunskapen."],
    ["Multimodal kodning och kognitiv belastning", "Flera uttrycksformer är inte automatiskt bättre; de ska komplettera varandra utan att överbelasta arbetsminnet."],
    ["Feedback och metakognition", "Självskattning behöver jämföras med faktiska prestationer, och feedback behöver leda till ett konkret nästa steg."],
  ],
};

function renderPrincipleEmphasis(chapterNumber) {
  const items = principleEmphasis[chapterNumber]
    .map(([term, explanation]) => `<li><strong>${term}</strong> – ${explanation}</li>`)
    .join("\n");
  return `<section class="sol-principles" data-sol-principles="1">
<h2>Science of Learning-begrepp att betona</h2>
<ul>
${items}
</ul>
</section>`;
}

const bookResources = {
  1: ["Instructional Illusions", "Why Don’t Students Like School?"],
  2: ["Developing Curriculum for Deep Thinking", "How Teaching Happens"],
  3: ["Cognitive Load Theory", "Just Tell Them"],
  4: ["The Science of Learning, Second Edition"],
  5: ["The Science of Learning, Second Edition", "Why Don’t Students Like School?"],
  6: ["Developing Curriculum for Deep Thinking", "The Science of Reading"],
  7: ["Cognitive Load Theory", "Just Tell Them"],
  8: ["The Digital Delusion"],
  9: ["Embedded Formative Assessment"],
  10: ["Instructional Illusions", "The Psychology of Great Teaching", "The Digital Delusion"],
};

const catalog = {
  "Instructional Illusions": ["Kirschner, P. A., Hendrick, C., & Heal, J. Instructional Illusions.", "https://www.hachette.co.uk/titles/paul-a-kirschner/instructional-illusions/9781036008918/"],
  "Why Don’t Students Like School?": ["Willingham, D. T. Why Don’t Students Like School?", "https://uat.store.wiley.com/en-us/why-don%27t-students-like-school-a-cognitive-scientist-answers-questions-about-how-the-mind-works-and-what-it-means-for-the-classroom-2nd-edition-p-9781119715801"],
  "Developing Curriculum for Deep Thinking": ["Kirschner, P. A., et al. Developing Curriculum for Deep Thinking.", "https://link.springer.com/book/10.1007/978-3-031-74661-1"],
  "How Teaching Happens": ["Kirschner, P. A., Hendrick, C., & Heal, J. How Teaching Happens.", "https://www.routledge.com/How-Teaching-Happens-Seminal-Works-in-Teaching-and-Teacher-Effectiveness-and-What-They-Mean-in-Practice/Kirschner-Hendrick-Heal/p/book/9781032132082"],
  "Cognitive Load Theory": ["Ashman, G. A Little Guide for Teachers: Cognitive Load Theory.", "https://www.sagepub.com/shop/buy-a-book/a-little-guide-for-teachers-cognitive-load-theory-1-283309"],
  "Just Tell Them": ["Groshell, Z. Just Tell Them: The Power of Explanations and Explicit Teaching.", "https://www.hachette.co.uk/titles/zach-groshell/just-tell-them-the-power-of-explanations-and-explicit-teaching/9781036003685/"],
  "The Science of Learning, Second Edition": ["Deans for Impact. The Science of Learning, Second Edition.", "https://www.deansforimpact.org/resources/the-science-of-learning/"],
  "The Science of Reading": ["Lemov, D., Driggs, C., & Woolway, E. The Teach Like a Champion Guide to the Science of Reading.", "https://www.wiley.com/en-us/shop/jossey-bass-c-JB"],
  "The Digital Delusion": ["Horvath, J. C. The Digital Delusion.", "https://www.penguinrandomhouse.com/books/838437/the-digital-delusion-by-jared-cooney-horvath-phd-med/"],
  "Embedded Formative Assessment": ["Wiliam, D. Embedded Formative Assessment, Second Edition.", "https://www.solutiontree.com/embedded-formative-assessment-second-ed.html"],
  "The Psychology of Great Teaching": ["De Bruyckere, P., Hulshof, C., & Missinne, L. The Psychology of Great Teaching.", "https://www.sagepub.com/shop/buy-a-book/the-psychology-of-great-teaching-1-274409"],
};

for (const chapter of data.chapters.filter((entry) => entry.number >= 1 && entry.number <= 10)) {
  chapter.contentHtml = chapter.contentHtml.replace(/<section class="book-expansion" data-books-expansion="1">[\s\S]*?<\/section>/g, "");
  chapter.contentHtml = chapter.contentHtml.replace(/<section class="sol-principles" data-sol-principles="1">[\s\S]*?<\/section>/g, "");
  const marker = chapter.contentHtml.lastIndexOf("<h2>Reflektion och arbetsuppgift</h2>");
  const expandedContent = `${renderPrincipleEmphasis(chapter.number)}\n${additions[chapter.number]}`;
  chapter.contentHtml = marker === -1
    ? `${chapter.contentHtml}${expandedContent}`
    : `${chapter.contentHtml.slice(0, marker)}${expandedContent}\n${chapter.contentHtml.slice(marker)}`;
  chapter.resources ||= [];
  chapter.resources = chapter.resources.filter((resource) => !["books-folder", "original-book-source"].includes(resource.sourceGroup));
  for (const title of bookResources[chapter.number]) {
    const [reference, url] = catalog[title];
    chapter.resources.push({ title, reference, url, description: "Originalverk hos förlaget eller den utgivande organisationen.", sourceGroup: "original-book-source" });
  }
}

fs.writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`);
console.log("Fördjupade kapitel 1–10 med hänvisningar till originalkällorna.");
