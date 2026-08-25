#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "..", "data", "chapters.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

const implementationChapterIndex = data.chapters.findIndex(
  (chapter) => chapter.title === "Implementering på skolnivå",
);
if (implementationChapterIndex !== -1) {
  data.chapters.splice(implementationChapterIndex, 1);
}

const applicationChapter = data.chapters.find(
  (chapter) => chapter.title === "Visa det som passar din undervisning",
);
if (applicationChapter) {
  applicationChapter.id = 11;
  applicationChapter.number = 11;
}

const expanded = {
  3: `
<h2>Mål</h2>
<p>Efter kapitlet ska du kunna identifiera när undervisning riskerar att överbelasta arbetsminnet, skilja innehållets svårighet från onödig belastning och planera tydliga förklaringar i hanterbara steg.</p>

<h2>Ett vanligt lärarproblem</h2>
<p>Du har förberett en korrekt och innehållsrik genomgång. Ändå tappar några elever tråden, börjar kopiera utan att förstå eller frågar vad de ska göra direkt efter instruktionen. Det är frestande att tolka detta som låg motivation. En annan möjlighet är att uppgiften kräver att eleverna håller för många nya delar aktiva samtidigt.</p>
<p>Kognitiv belastningsteori ger inte ett exakt mått för varje lektion. Den ger ett sätt att analysera samspelet mellan uppgift, elevens förkunskaper och presentationen. Samma förklaring kan vara hanterbar för en erfaren elev men överväldigande för en nybörjare.</p>

<h2>Vad forskningen hjälper oss att se</h2>
<p>Arbetsminnet har begränsad kapacitet när information är ny. Långtidsminnet kan däremot organisera många delar i sammanhängande scheman. När en erfaren läsare tolkar en text eller en van matematiker löser en ekvation behandlas flera detaljer som meningsfulla helheter. Nybörjaren måste ofta hantera varje del separat.</p>
<p><strong>Inneboende belastning</strong> hänger samman med hur många delar som måste förstås tillsammans och med elevens förkunskaper. <strong>Extern belastning</strong> uppstår genom sådant i presentationen som tar resurser utan att hjälpa målet: splittrade informationskällor, oklara instruktioner, onödiga detaljer eller ett tempo som inte medger bearbetning. Läraren kan sällan göra ett komplext ämne enkelt, men kan göra vägen in i det tydligare.</p>

<h2>Fyra sätt att göra innehållet hanterbart</h2>
<ol>
<li><strong>Aktivera nödvändiga förkunskaper.</strong> Repetera de begrepp eller procedurer som det nya bygger på.</li>
<li><strong>Segmentera.</strong> Presentera en sammanhängande del, kontrollera förståelsen och lägg sedan till nästa.</li>
<li><strong>Samordna information.</strong> Placera förklaring nära den bild eller tabell den hör till och undvik att elever ska leta mellan flera källor.</li>
<li><strong>Styr uppmärksamheten.</strong> Tala om vad eleverna ska titta efter och när de ska lyssna, anteckna eller lösa.</li>
</ol>

<h2>Exempel från undervisning</h2>
<h3>Matematik</h3>
<p>Vid ekvationslösning visar läraren först syftet med likhetstecknet och modellerar ett steg i taget. En färgmarkering följer samma term på båda sidor. Eleverna får därefter en nästan identisk uppgift innan fler operationer kombineras.</p>
<h3>NO</h3>
<p>Vid fotosyntesen introduceras först vad växten tar in och avger. Därefter kopplas delarna till en enkel modell och sist till den kemiska reaktionsformeln. Om alla begrepp, pilar och symboler visas samtidigt kan eleverna lägga sin kraft på att avkoda bilden i stället för sambandet.</p>
<h3>Svenska och SO</h3>
<p>Inför en källanalys separerar läraren först frågorna avsändare, tid, beroende och tendens. Klassen analyserar en fråga i taget på samma källa. Först när kriterierna är begripliga kombineras de i en helhetsbedömning.</p>

<h2>Vanliga missförstånd och fallgropar</h2>
<ul>
<li><strong>”Elever ska aldrig anstränga sig.”</strong> Målet är inte friktionsfri undervisning. Relevant tänkande behövs; onödigt brus ska minska.</li>
<li><strong>”Allt måste delas upp i småbitar.”</strong> Delarna måste också fogas samman. Annars missar eleverna helheten.</li>
<li><strong>”Färre ord är alltid tydligare.”</strong> En kort instruktion kan vara oklar. Tydlighet handlar om urval, ordning och exempel.</li>
<li><strong>Att läsa bildspel högt.</strong> Elever kan få svårt att läsa en lång text och lyssna på en annan formulering samtidigt.</li>
<li><strong>Att behålla stödet för länge.</strong> När kunskapen växer behöver eleverna möta mer självständiga och komplexa uppgifter.</li>
</ul>

<h2>Praktisk planering</h2>
<p>Markera lektionens viktigaste nya idé. Lista vilka förkunskaper den kräver. Dela förklaringen i två till fyra meningsfulla steg och skriv en kontrollfråga efter varje steg. Granska sedan materialet: hjälper varje bild, instruktion och exempel eleverna att tänka på målet?</p>

<h2>Reflektion och arbetsuppgift</h2>
<p>Välj en genomgång som ofta blir svår. Rita upp vad eleven samtidigt måste minnas, läsa, lyssna på och göra. Ring in en möjlig källa till onödig belastning. Planera en förändring och en kort kontroll som visar om fler elever följer resonemanget.</p>
`,
  4: `
<h2>Mål</h2>
<p>Efter kapitlet ska du kunna planera lågtröskliga övningar i minnesåterkallning, välja frågor som speglar målet och använda svaren för repetition och feedback.</p>

<h2>Ett vanligt lärarproblem</h2>
<p>Eleverna har arbetat med innehållet, men när det återkommer säger de att de har glömt allt. Ofta har de läst om, markerat eller följt lösningar. Dessa aktiviteter kan skapa igenkänning, men de kräver inte alltid att kunskapen plockas fram ur minnet.</p>
<p>Retrieval practice, eller minnesåterkallning, innebär att eleven försöker hämta fram relevant kunskap utan att först se svaret. Syftet är lärande och information till läraren, inte betygsättning.</p>

<h2>Varför återkallning kan stärka lärandet</h2>
<p>Att försöka återkalla tränar tillgängligheten till kunskapen och kan göra senare återkallning lättare. Övningen visar också luckor som omläsning lätt döljer. Effekten beror på hur uppgiften utformas, vad eleverna redan kan, om rätt svar klargörs och om innehållet återkommer över tid.</p>
<p>Återkallning behöver omfatta mer än isolerade fakta. Elever kan återkalla en definition, ordna en process, skissa en modell, välja metod, jämföra begrepp eller förklara ett orsakssamband. Formen ska följa det kunnande läraren vill bygga.</p>

<h2>En användbar lektionsrutin</h2>
<ol>
<li>Välj tre till fem viktiga frågor från gårdagen, förra veckan och ett äldre område.</li>
<li>Låt alla tänka och svara enskilt utan bok eller anteckningar.</li>
<li>Gör försöket låginsats: svaren används inte för betyg.</li>
<li>Visa och förklara korrekta svar. Låt eleverna rätta med en annan färg eller komplettera.</li>
<li>Använd mönstret i svaren: gå vidare, repetera eller undervisa om en del på nytt.</li>
</ol>

<h2>Exempel från undervisning</h2>
<h3>Språk</h3>
<p>Elever skriver tre meningar där veckans ord används i nya sammanhang. Därefter jämför de med exempel och korrigerar form eller betydelse. Det prövar mer än att känna igen ordet i en lista.</p>
<h3>Historia</h3>
<p>Elever fyller en tom tidslinje och skriver en orsak och en konsekvens till två händelser. Läraren ser både vad som kan återkallas och om sambanden har organiserats.</p>
<h3>Matematik</h3>
<p>Startuppgifterna innehåller en procedur, en begreppsfråga och en uppgift där eleverna först måste välja metod. Efteråt modellerar läraren de felsvar som avslöjar en gemensam missuppfattning.</p>
<h3>Praktisk-estetiska ämnen</h3>
<p>Elever kan ur minnet ordna säkerhetssteg, namnge tekniker eller skissa arbetsprocessen innan det praktiska momentet börjar.</p>

<h2>Vanliga missförstånd och fallgropar</h2>
<ul>
<li><strong>Att göra varje quiz till ett prov.</strong> Hög insats kan förändra aktiviteten och skapa onödig oro.</li>
<li><strong>Att bara fråga det som är lätt att mäta.</strong> Om målet är förklaring eller metodval måste frågorna också pröva det.</li>
<li><strong>Att hoppa över korrigering.</strong> Elever behöver få veta vad som var korrekt och reparera fel.</li>
<li><strong>Att kräva återkallning innan undervisning.</strong> Övningen kan inte ersätta en första tydlig förklaring och guidad övning.</li>
<li><strong>Att tolka svagt svar som ovilja.</strong> Det kan signalera otillräcklig undervisning, för lång tidslucka eller en alltför svår fråga.</li>
</ul>

<h2>Praktisk planering</h2>
<p>Bygg en liten frågebank kopplad till kärninnehållet. Märk frågorna med när innehållet undervisades och vilken typ av kunnande de prövar. Återanvänd frågor med ökande tidsintervall och blanda korta faktafrågor med frågor om samband och tillämpning.</p>

<h2>Reflektion och arbetsuppgift</h2>
<p>Skapa en femminutersstart för nästa lektion: en fråga från föregående lektion, en från förra veckan och en som kräver att ett äldre begrepp används. Skriv i förväg vad du gör om färre än hälften svarar rätt.</p>
`,
  5: `
<h2>Mål</h2>
<p>Efter kapitlet ska du kunna sprida övning över tid, avgöra när blockvis respektive blandad övning passar och använda variation utan att förlora den gemensamma principen.</p>

<h2>Ett vanligt lärarproblem</h2>
<p>Under ett sammanhållet arbetsområde blir eleverna snabbt säkrare. När området är avslutat försvinner det ur undervisningen och mycket är borta vid terminens slut. Den höga prestationen under träningspasset gav en alltför optimistisk bild av hållbarheten.</p>

<h2>Spacing: återkomst med mellanrum</h2>
<p>Spacing innebär att möten med innehållet fördelas över tid. Mellanrummet skapar viss glömska, vilket gör nästa återkallning mer krävande. En välplanerad återkomst kan därför stärka långtidslärandet mer än samma sammanlagda övning i ett enda block.</p>
<p>Det finns inget universellt perfekt intervall. Läraren behöver väga innehållets svårighet, elevernas kunskaper och när kunskapen ska användas. En praktisk start är återkomst efter en dag, en vecka och några veckor, med justering utifrån elevernas svar.</p>

<h2>Interleaving: att välja, inte bara utföra</h2>
<p>Blockvis övning samlar likadana uppgifter och hjälper nybörjaren att få grepp om en ny procedur. Interleaving blandar närliggande problem eller kategorier. Då måste eleven avgöra vad slags problem det är och vilken kunskap som passar.</p>
<p>Den blandade övningen känns ofta svårare och kan ge fler fel under passet. Det är inte automatiskt ett problem. Men blandning hjälper först när eleverna har tillräcklig grund för att jämföra. Att blanda sådant de ännu inte förstår skapar bara förvirring.</p>

<h2>Variation: samma princip i nya ytor</h2>
<p>Variation hjälper elever att se vad som är stabilt och vad som kan förändras. Exemplen ska variera på ett genomtänkt sätt: nya tal, texter, material eller situationer, men med en tydlig koppling till den princip som tränas.</p>

<h2>Exempel från undervisning</h2>
<h3>Matematik</h3>
<p>Efter introduktion och blockvis övning av proportionalitet blandas proportionella problem med problem om procent och linjära samband. Eleverna skriver först vilken modell de väljer och vilket kännetecken i uppgiften som styr valet.</p>
<h3>Språk</h3>
<p>Nya ord återkommer i kort läsning, muntlig återkallning och en senare skrivuppgift. Grammatiska konstruktioner blandas först när eleverna kan använda varje konstruktion med stöd.</p>
<h3>NO och SO</h3>
<p>Ett orsakssamband återkommer i en skiss nästa dag, en jämförelse veckan därpå och en ny fallstudie senare. Variationen prövar om eleverna kan känna igen strukturen utanför ursprungsexemplet.</p>

<h2>Vanliga missförstånd och fallgropar</h2>
<ul>
<li><strong>”Ju längre mellanrum, desto bättre.”</strong> Om nästan inget kan återkallas kan uppgiften behöva mer stöd eller ett kortare intervall.</li>
<li><strong>Att blanda för tidigt.</strong> Nybörjare behöver ofta tydlig modellering och viss blockvis träning först.</li>
<li><strong>Att blanda slumpmässigt.</strong> Välj kategorier där jämförelsen lär eleverna att urskilja relevanta drag.</li>
<li><strong>Att lägga all repetition före provet.</strong> Då tränas främst kortsiktig tillgänglighet.</li>
<li><strong>Att variera ytan utan att synliggöra principen.</strong> Eleverna behöver hjälp att se vad exemplen har gemensamt.</li>
</ul>

<h2>Praktisk planering</h2>
<p>Välj tre kärnidéer som eleverna ska kunna om två månader. Lägg in korta återkomster i planeringen redan nu. Bestäm när övningen går från blockvis till blandad och vilka kontraster som gör metod- eller begreppsvalet synligt.</p>

<h2>Reflektion och arbetsuppgift</h2>
<p>Ta ett avslutat arbetsområde. Skapa tre återkomster på högst tio minuter vardera: återkallning, jämförelse och tillämpning i ett nytt sammanhang. Ange vilken information varje återkomst ska ge dig.</p>
`,
  6: `
<h2>Mål</h2>
<p>Efter kapitlet ska du kunna kartlägga nödvändiga förkunskaper, undervisa begrepp med definitioner och kontraster samt hjälpa elever bygga organiserade kunskapsstrukturer.</p>

<h2>Ett vanligt lärarproblem</h2>
<p>Två elever läser samma text. Den ena ser samband, drar slutsatser och minns huvuddragen. Den andra fastnar i enskilda ord. Skillnaden kan bero på vilka relevanta kunskaper som redan finns och hur de är organiserade, inte bara på en generell ”läsförmåga”.</p>

<h2>Scheman och förkunskaper</h2>
<p>Ett schema är en organiserad struktur i långtidsminnet som binder samman fakta, begrepp, exempel och relationer. Scheman hjälper oss att tolka ny information och minskar antalet separata delar som arbetsminnet behöver hantera.</p>
<p>Förkunskaper är därför en resurs, men de kan också vara ofullständiga eller felaktiga. Att bara fråga ”vad vet ni?” ger ofta en osystematisk bild. Läraren behöver identifiera de specifika byggstenar som det nya innehållet kräver och kontrollera dem.</p>

<h2>Att undervisa ett begrepp</h2>
<ol>
<li>Ge en kort, ämnesmässigt korrekt definition.</li>
<li>Visa flera tydliga exempel och peka ut varför de tillhör begreppet.</li>
<li>Visa icke-exempel och närliggande begrepp.</li>
<li>Låt elever sortera, jämföra och motivera gränsfall.</li>
<li>Låt begreppet återkomma i förklaringar, texter och nya problem.</li>
</ol>
<p>Definitionen och exemplen fyller olika funktioner. Definitionen anger de avgörande egenskaperna; exemplen hjälper eleverna att se hur egenskaperna framträder i verkliga fall.</p>

<h2>Exempel från undervisning</h2>
<h3>Samhällskunskap</h3>
<p>Begreppet demokrati jämförs med majoritetsstyre och diktatur. Eleverna granskar fall där val hålls men rättigheter eller maktdelning saknas. Gränsfallen gör att de inte reducerar demokrati till ”att rösta”.</p>
<h3>NO</h3>
<p>Atom, molekyl, grundämne och kemisk förening organiseras med definitioner, partikelbilder och exempel. Eleverna sorterar nya bilder och måste motivera vilket kännetecken de använder.</p>
<h3>Svenska</h3>
<p>Inför argumenterande text repeteras tes, argument och belägg. Klassen jämför ett argument med en förklaring och en personlig åsikt, så att funktionerna blir tydliga innan eleverna skriver.</p>
<h3>Matematik</h3>
<p>Elever möter exempel och icke-exempel på proportionalitet. De jämför tabeller som ser lika ut men där kvoten inte är konstant och formulerar ett test för nya fall.</p>

<h2>Vanliga missförstånd och fallgropar</h2>
<ul>
<li><strong>Att aktivering skapar kunskap.</strong> En tankekarta kan synliggöra det elever redan vet, men ersätter inte undervisning om det som saknas.</li>
<li><strong>Att ge ordlistor utan relationer.</strong> Begrepp blir användbara när de kopplas till varandra och till exempel.</li>
<li><strong>Att bara använda typiska exempel.</strong> Då kan elever fastna i ytliga kännetecken.</li>
<li><strong>Att rätta en missuppfattning med ett påstående.</strong> Elever behöver ofta jämföra sin modell med evidens och en bättre förklaring.</li>
<li><strong>Att förundervisa allt.</strong> Välj bara de förkunskaper som är nödvändiga för nästa steg.</li>
</ul>

<h2>Praktisk planering</h2>
<p>Gör en förkunskapskedja bakåt från målet: vilka tre till fem saker måste eleverna förstå för att lyckas? Skriv en snabb diagnostisk fråga för varje. Planera sedan definition, exempel, icke-exempel och en uppgift där eleverna använder begreppen i ett nytt fall.</p>

<h2>Reflektion och arbetsuppgift</h2>
<p>Välj ett centralt begrepp som elever ofta använder ytligt. Skriv en elevvänlig definition, två tydliga exempel, två icke-exempel och ett gränsfall. Formulera en fråga som kräver att eleverna motiverar sin sortering.</p>
`,
  7: `
<h2>Mål</h2>
<p>Efter kapitlet ska du kunna välja och förklara genomarbetade exempel, modellera expertens beslut och gradvis flytta ansvar från lärare till elev.</p>

<h2>Ett vanligt lärarproblem</h2>
<p>Läraren har förklarat uppgiften och eleverna ska ”pröva själva”. Några kommer igång, men många gissar, kopierar en kamrat eller fastnar i första steget. Fri problemlösning kräver att eleverna redan kan urskilja relevanta drag och välja en rimlig väg. För nybörjaren är just dessa val det som måste undervisas.</p>

<h2>Worked examples och modellering</h2>
<p>Ett worked example visar en fullständig lösning eller produkt och kopplar varje steg till ett skäl. Modellering gör det annars osynliga tänkandet hörbart: vad läraren lägger märke till, vilket mål som styr, vilka alternativ som väljs bort och hur resultatet kontrolleras.</p>
<p>Exemplet ska inte bli en mall som kopieras utan förståelse. Läraren behöver rikta frågor mot principerna: Varför kommer detta steg nu? Vad skulle förändras om villkoret var annorlunda? Hur vet vi att lösningen är rimlig?</p>

<h2>Från fullt stöd till självständighet</h2>
<ol>
<li><strong>Modellera.</strong> Visa ett genomarbetat exempel och tänk högt.</li>
<li><strong>Jämför.</strong> Visa ett andra exempel där någon viktig egenskap varierar.</li>
<li><strong>Komplettera.</strong> Låt elever fylla i saknade steg och förklara dem.</li>
<li><strong>Öva guidat.</strong> Elever arbetar medan läraren kontrollerar och ger korta ledtrådar.</li>
<li><strong>Öva självständigt.</strong> Stödet tas bort när svaren visar att eleverna är redo.</li>
<li><strong>Blanda och överför.</strong> Eleverna väljer metod eller struktur i nya fall.</li>
</ol>

<h2>Exempel från undervisning</h2>
<h3>Matematik</h3>
<p>Läraren löser ett procentproblem och tänker högt om valet mellan andel, del och helhet. Nästa uppgift är delvis löst. I den tredje väljer eleverna själva metod och motiverar valet innan de räknar.</p>
<h3>Skrivundervisning</h3>
<p>Klassen analyserar en modelltext, läraren skriver ett stycke under tänk-högt-modellering och gruppen konstruerar nästa tillsammans. Skrivramen kortas sedan när elevernas texter visar säkrare struktur.</p>
<h3>Praktiska ämnen</h3>
<p>Läraren visar både handgrepp och beslutspunkter: hur materialet bedöms, vad som kan gå fel och hur kvalitet kontrolleras. Eleverna får först en checklista som senare ersätts av egenkontroll.</p>

<h2>Vanliga missförstånd och fallgropar</h2>
<ul>
<li><strong>Att bara visa proceduren.</strong> Modellera också vad som styr valen.</li>
<li><strong>Att välja ett perfekt men ogenomskinligt exempel.</strong> Exemplet ska göra centrala drag synliga.</li>
<li><strong>Att gå direkt från demonstration till fri uppgift.</strong> Mellansteg behövs ofta.</li>
<li><strong>Att avveckla stöd efter kalendern.</strong> Använd elevernas svar, inte en fast tidsplan.</li>
<li><strong>Att behålla stöd som blivit krycka.</strong> Stöd som aldrig minskar kan dölja vad eleverna kan.</li>
</ul>

<h2>Praktisk planering</h2>
<p>Välj en uppgift som representerar målet. Kommentera varje steg med vad, varför och kontroll. Skapa sedan en andra version med färre ledtrådar och bestäm vilket elevsvar som visar att nästa stöd kan tas bort.</p>

<h2>Reflektion och arbetsuppgift</h2>
<p>Spela in eller skriv ned en tvåminuters tänk-högt-modellering. Granska den: synliggör du verkliga beslut eller beskriver du bara det som redan syns? Lägg till två frågor som får eleverna att självförklara principen.</p>
`,
  8: `
<h2>Mål</h2>
<p>Efter kapitlet ska du kunna samordna bild, text och tal, signalera det centrala och granska undervisningsmaterial utifrån vad elevernas uppmärksamhet behöver riktas mot.</p>

<h2>Ett vanligt lärarproblem</h2>
<p>Ett bildspel kan vara estetiskt och innehållsrikt men ändå svårt att lära från. Eleverna läser text, tolkar diagram, lyssnar och antecknar samtidigt. När allt betonas blir inget tydligt. Frågan är därför inte hur många uttrycksformer som används, utan vilket tänkande de stödjer.</p>

<h2>Uppmärksamhet och multimedia</h2>
<p>Elever bearbetar inte automatiskt allt de ser. Bild och ord kan komplettera varandra när de beskriver samma relation och är lätta att samordna. De kan också konkurrera när en lång text visas samtidigt som läraren ger en annan muntlig förklaring.</p>
<p>Signalering innebär att markera struktur och relevans: rubriker, pilar, färg eller muntliga pekningar. Signaleringen fungerar bara om den används sparsamt och konsekvent. Dekoration som inte hjälper målet kan dra uppmärksamhet till fel sak.</p>

<h2>En granskningsrutin för material</h2>
<ol>
<li>Formulera vad eleven ska förstå efter bilden eller exemplet.</li>
<li>Ta bort element som inte stödjer detta mål.</li>
<li>Placera etiketter och förklaringar nära den del de beskriver.</li>
<li>Bygg komplexa figurer stegvis när relationerna är nya.</li>
<li>Bestäm när eleverna ska titta, lyssna, läsa och anteckna.</li>
<li>Följ presentationen med en uppgift där eleverna använder representationen.</li>
</ol>

<h2>Exempel från undervisning</h2>
<h3>Biologi</h3>
<p>En cell byggs upp del för del. Läraren markerar den aktuella organellen, beskriver funktionen och låter eleverna återkalla sambandet innan nästa del läggs till. Den fulla modellen visas sist.</p>
<h3>Geografi</h3>
<p>På en karta signaleras först höjdskalan och sedan sambandet mellan topografi och nederbörd. Eleverna får peka ut var förutsägelsen gäller i stället för att bara betrakta kartan.</p>
<h3>Svenska</h3>
<p>I en modelltext markeras tes, argument och belägg med tre konsekventa markeringar. När eleverna förstått strukturen tas färgerna bort så att de själva måste identifiera delarna.</p>
<h3>Matematik</h3>
<p>Graf, tabell och formel visas i en samordnad layout. Läraren pekar ut hur samma förändring uttrycks i varje representation och låter eleverna översätta mellan dem.</p>

<h2>Vanliga missförstånd och fallgropar</h2>
<ul>
<li><strong>”Bild plus ord ger alltid dubbel effekt.”</strong> Representationerna måste hjälpa samma förståelse.</li>
<li><strong>Att använda dekoration som motivation.</strong> En intressant bild kan konkurrera med det centrala innehållet.</li>
<li><strong>Att signalera allt.</strong> För många färger och markeringar skapar ett nytt tolkningsproblem.</li>
<li><strong>Att kräva kopiering under förklaring.</strong> Planera pauser för anteckning och bearbetning.</li>
<li><strong>Att förväxla exponering med förståelse.</strong> En figur behöver följas av frågor och användning.</li>
</ul>

<h2>Praktisk planering</h2>
<p>Välj ett befintligt bildspel eller arbetsblad. Skriv målet högst upp i ditt arbetsdokument. Markera varje element som nödvändigt, stödjande eller dekorativt. Förenkla en sida, samordna etiketter med bilden och lägg till en kontrollfråga.</p>

<h2>Reflektion och arbetsuppgift</h2>
<p>Lägg undan ett material en stund och granska det sedan utan din muntliga förklaring. Notera vad ögat dras till först och vad eleverna förväntas förstå. Om det visuella fokuset inte motsvarar lärandemålet behöver designen eller signaleringen justeras.</p>
`,
  9: `
<h2>Mål</h2>
<p>Efter kapitlet ska du kunna samla svar från hela gruppen, konstruera diagnostiska frågor och ge feedback som leder till en konkret nästa handling.</p>

<h2>Ett vanligt lärarproblem</h2>
<p>Läraren frågar ”förstår ni?” och möts av nickningar. Under den självständiga uppgiften visar det sig att flera elever har tolkat kärnidén fel. Problemet var inte brist på frågor, utan att frågorna inte gjorde elevernas tänkande synligt.</p>

<h2>Checks for understanding</h2>
<p>En kontroll av förståelse är en planerad fråga eller uppgift som ger information om nästa undervisningsbeslut. Den bör ligga nära målet, kräva ett tydligt svar och omfatta fler än de frivilliga elever som räcker upp handen.</p>
<p>Miniwhiteboards, kortsvar, digitala omröstningar och strukturerad väntetid kan ge en bredare bild. Metoden är mindre viktig än kvaliteten på frågan och vad läraren gör med svaren.</p>

<h2>Diagnostiska frågor</h2>
<p>En diagnostisk flervalsfråga har felsvar som motsvarar vanliga tankefel. Om många väljer samma alternativ får läraren en hypotes om vad som behöver förklaras. Bra frågor kan skilja mellan att minnas en term, förstå en relation och kunna använda den.</p>
<p>Planera beslutströsklar: Vad gör du om nästan alla svarar rätt? Om gruppen är delad? Om ett specifikt felsvar dominerar? Då blir kontrollen en del av undervisningen och inte ett avbrott.</p>

<h2>Feedback som går att använda</h2>
<p>Feedback är värdefull när den minskar avståndet mellan nuvarande prestation och målet. Den behöver vara begriplig, avgränsad och möjlig att agera på. ”Utveckla” är svagt om eleven inte vet hur. ”Lägg till ett belägg som stödjer ditt andra argument” pekar mot en handling.</p>
<p>Mer feedback är inte alltid bättre. Prioritera det som ger störst förbättring och ge tid att använda återkopplingen. Annars blir den bara information som eleven tar emot.</p>

<h2>Exempel från undervisning</h2>
<h3>Matematik</h3>
<p>Alla elever visar samtidigt vilken metod de skulle välja för ett problem och skriver ett skäl. Läraren grupperar svaren efter tankesätt och modellerar skillnaden innan beräkningen börjar.</p>
<h3>Samhällskunskap</h3>
<p>Elever klassificerar påståenden som fakta, värdering eller kausal förklaring. Felsvaren visar vilken distinktion som behöver ett nytt kontrasterande exempel.</p>
<h3>Skrivundervisning</h3>
<p>Återkopplingen fokuserar först på textens resonemangsstruktur. Eleven bearbetar ett stycke under lektionen och markerar vilken förändring som gjordes och varför.</p>
<h3>NO</h3>
<p>Efter en demonstration förutsäger alla vad som händer om en variabel ändras. Motiveringarna avslöjar om eleverna förstått mekanismen eller bara minns resultatet.</p>

<h2>Vanliga missförstånd och fallgropar</h2>
<ul>
<li><strong>Att fråga bara de snabba.</strong> Då får läraren ett skevt urval.</li>
<li><strong>Att avslöja svaret för tidigt.</strong> Ge väntetid och låt alla formulera ett svar.</li>
<li><strong>Att samla data utan att agera.</strong> Formativt blir det först när informationen påverkar nästa steg.</li>
<li><strong>Att ge feedback på allt.</strong> Eleven kan sakna möjlighet att prioritera.</li>
<li><strong>Att blanda feedback och betyg.</strong> Uppmärksamheten kan hamna på omdömet i stället för förbättringen.</li>
</ul>

<h2>Praktisk planering</h2>
<p>Skriv två kontrollfrågor till nästa genomgång: en efter ett tidigt delsteg och en som prövar helheten. Ange vanliga felsvar och planera tre möjliga beslut: gå vidare, ge ett nytt exempel eller undervisa delen på nytt.</p>

<h2>Reflektion och arbetsuppgift</h2>
<p>Granska den senaste återkoppling du gav. Kan eleven förstå målet, se den viktigaste skillnaden och genomföra nästa handling under lektionstid? Skriv om en generell kommentar till en konkret uppmaning och planera tid för bearbetning.</p>
`,
  10: `
<h2>Mål</h2>
<p>Efter kapitlet ska du kunna granska forskningspåståenden, skilja korrelation från orsak, identifiera gränsvillkor och pröva nya idéer med professionellt omdöme.</p>

<h2>Ett vanligt lärarproblem</h2>
<p>En metod presenteras som ”forskningsbaserad” och sprids snabbt. Några lärare förväntas använda den i alla ämnen och elevgrupper. Men en studie visar sällan att en metod fungerar överallt. För att fatta rimliga beslut behöver lärare fråga vad som undersöktes, med vem, jämfört med vad och hur resultatet mättes.</p>

<h2>Från slogan till prövbar fråga</h2>
<p>Påståendet ”forskning visar att quiz fungerar” är för grovt. En mer användbar fråga är: Hjälper låginsatsquiz med korrigerande feedback dessa elever att behålla detta innehåll bättre än den nuvarande repetitionsrutinen? Precisionen gör både evidensen och klassrumsuppföljningen mer relevanta.</p>
<p>Skilj också prestation direkt efter undervisning från kvarstående lärande. Fråga om studien mätte minne, förståelse eller överföring och hur lång tid som gick före mätningen.</p>

<h2>Korrelation, kausalitet och jämförelse</h2>
<p>Om elever som använder en viss strategi får högre resultat betyder det inte automatiskt att strategin orsakade resultatet. Eleverna kan skilja sig i förkunskaper, motivation eller stöd. Kausala slutsatser kräver en trovärdig jämförelse och kontroll av alternativa förklaringar.</p>
<p>Även experiment behöver tolkas. Vad var jämförelsealternativet? En ny metod kan slå ingen undervisning men inte en väl genomförd befintlig metod. Hur stor och utbildningsmässigt betydelsefull var effekten? Kan den genomföras utan att tränga undan viktigare innehåll?</p>

<h2>Gränsvillkor och vanliga myter</h2>
<p>Gränsvillkor beskriver när en princip sannolikt fungerar bättre eller sämre. Interleaving kräver något att jämföra. Minimal vägledning kan vara olämplig för nybörjare men större självständighet rimlig när kunskapen vuxit. Återkallning kräver att något först har undervisats.</p>
<p>Lärstilsidén är ett exempel på en lockande förenkling: att elever lär sig bättre om undervisningen matchas till en fast visuell, auditiv eller kinestetisk stil. Stöd saknas för denna matchningshypotes som generell undervisningsprincip. Det hindrar inte att lärare använder bilder, tal eller handling när representationen passar innehållet.</p>

<h2>En rutin för professionell forskningsläsning</h2>
<ol>
<li>Formulera exakt vilket påstående som görs.</li>
<li>Identifiera deltagare, ämne, undervisningstid och jämförelse.</li>
<li>Kontrollera vad som mättes och när.</li>
<li>Leta efter sammanvägd forskning, replikationer och relevanta begränsningar.</li>
<li>Översätt principen till en liten, tydlig förändring i din kontext.</li>
<li>Bestäm i förväg vilka elevsvar som skulle tala för justering eller fortsatt användning.</li>
</ol>

<h2>Exempel från skolans vardag</h2>
<h3>En digital plattform</h3>
<p>Leverantören visar hög aktivitet och nöjda användare. Skolan frågar om elevernas lärande jämförts med ordinarie undervisning, om effekten kvarstår och vilka undervisningsmoment verktyget ersätter.</p>
<h3>En ny lektionsrutin</h3>
<p>Läraren prövar återkallningsstarter i ett avgränsat område. Frågorna, tidsåtgången och ett fördröjt kunskapsmått bestäms i förväg. Resultatet används för förbättring, inte för att bevisa en favoritteori.</p>
<h3>Ett uppmärksammat forskningsresultat</h3>
<p>Läraren söker originalkällan eller en systematisk översikt, granskar population och utfall och skiljer forskarnas slutsats från rubrikens mer långtgående påstående.</p>

<h2>Vanliga missförstånd och fallgropar</h2>
<ul>
<li><strong>Att kräva perfekt säkerhet.</strong> Beslut måste ofta fattas under osäkerhet; målet är bättre grundade och uppföljningsbara val.</li>
<li><strong>Att använda en enskild studie som facit.</strong> Sök mönster i ett bredare kunskapsläge.</li>
<li><strong>Att avfärda forskning som inte passar exakt.</strong> Den kan fortfarande ge mekanismer och frågor att pröva försiktigt.</li>
<li><strong>Att göra evidens till recept.</strong> Genomförande, ämnesinnehåll och elevgrupp påverkar resultatet.</li>
<li><strong>Att bara mäta upplevelse.</strong> Engagemang är viktigt men är inte samma sak som lärande.</li>
</ul>

<h2>Reflektion och arbetsuppgift</h2>
<p>Välj ett undervisningspåstående du nyligen mött. Skriv om det till en prövbar fråga. Notera vilken evidens du behöver, ett viktigt gränsvillkor, kostnaden för att pröva och vilket elevnära mått som kan följas upp efter en rimlig tidsperiod.</p>
`,
};

const quizAdditions = {
  3: [
    ["Vilken förändring minskar främst extern kognitiv belastning?", ["Fler dekorativa bilder", "Samordna etiketter med den figur de förklarar", "Flera nya mål samtidigt", "Högre arbetstempo"], 1, "Samordnad information minskar behovet av att söka och växla mellan källor."],
    ["Varför kan samma uppgift belasta två elever olika mycket?", ["Arbetsminnet saknar alltid gränser", "Förkunskaper organiserar delar i större helheter", "Alla elever tolkar information identiskt", "Belastning beror bara på uppgiftens längd"], 1, "Relevanta scheman i långtidsminnet avlastar arbetsminnet."],
    ["Vad är ett rimligt syfte med segmentering?", ["Att ta bort ämnets komplexitet", "Att undvika all ansträngning", "Att ordna nytt innehåll i hanterbara, sammanhängande steg", "Att hålla varje del permanent åtskild"], 2, "Segmentering ger utrymme att bearbeta delar som senare fogas samman."],
  ],
  4: [
    ["Vad skiljer återkallning från omläsning?", ["Eleven försöker plocka fram kunskap innan svaret visas", "Eleven ser svaret fler gånger", "Eleven får alltid betyg", "Eleven arbetar bara med fakta"], 0, "Vid återkallning hämtar eleven aktivt fram kunskap ur minnet."],
    ["Vilken rutin passar bäst för ett låginsatsquiz?", ["Betygsätt varje svar", "Låt bara frivilliga svara", "Låt alla försöka och ge möjlighet att korrigera", "Visa svaren före frågorna"], 2, "Alla bör försöka, och tydlig korrigering hjälper elever att reparera fel."],
    ["Vad bör läraren göra när ett gemensamt felsvar dominerar?", ["Tolka det som ovilja", "Använd mönstret för att undervisa den delen på nytt", "Gå vidare utan kommentar", "Ta bort ämnesinnehållet"], 1, "Svarsmönstret ger information om vad undervisningen behöver återvända till."],
  ],
  5: [
    ["Vad innebär spacing?", ["Att samla all övning före provet", "Att fördela möten med innehållet över tid", "Att alltid byta ämne", "Att undvika repetition"], 1, "Spacing fördelar övning och återkomst över tid."],
    ["När är blockvis övning ofta särskilt användbar?", ["När nybörjare först lär sig en ny procedur", "När elever alltid ska välja mellan flera metoder", "Endast efter avslutad kurs", "När inget exempel har visats"], 0, "En viss blockvis övning kan hjälpa nybörjaren att etablera en ny procedur."],
    ["Vad är huvudsyftet med interleaving?", ["Att göra planeringen slumpmässig", "Att träna urskiljning och val mellan närliggande kategorier", "Att minska all svårighet", "Att ersätta tydlig undervisning"], 1, "Blandningen gör att elever måste urskilja problemtyp och välja relevant kunskap."],
  ],
  6: [
    ["Vad är ett schema i detta sammanhang?", ["En lektionskalender", "Organiserad kunskap i långtidsminnet", "En lista utan relationer", "En medfödd lärstil"], 1, "Scheman binder samman kunskapsdelar och hjälper tolkning av ny information."],
    ["Varför används icke-exempel i begreppsundervisning?", ["För att undvika definitioner", "För att synliggöra begreppets gränser och avgörande egenskaper", "För att göra alla svar fel", "För att ersätta övning"], 1, "Kontraster hjälper elever urskilja vad som räknas och varför."],
    ["Vad är en bra första fråga inför ett nytt område?", ["Vilka specifika förkunskaper kräver målet?", "Vilken aktivitet ser roligast ut?", "Hur kan alla fakta förundervisas?", "Hur undviker vi elevsvar?"], 0, "En precis förkunskapsanalys hjälper läraren välja vad som behöver repeteras eller undervisas."],
  ],
  7: [
    ["Vad bör ett genomarbetat exempel synliggöra?", ["Bara slutsvaret", "Stegen och skälen bakom viktiga val", "Så många specialfall som möjligt", "Enbart elevens arbetsmängd"], 1, "Worked examples blir lärorika när de kopplar steg till principer och beslut."],
    ["Vilken sekvens flyttar gradvis ansvar till eleven?", ["Fri uppgift, föreläsning, prov", "Modellering, komplettering, guidad och självständig övning", "Betyg, exempel, kopiering", "Självständig övning utan återkoppling"], 1, "Sekvensen minskar stödet i takt med att elevernas kunnande växer."],
    ["När bör stöd i första hand avvecklas?", ["På ett fast datum", "När elevsvaren visar ökad säkerhet", "Omedelbart efter första exemplet", "Aldrig"], 1, "Avveckling bör styras av belägg för vad eleverna kan med mindre hjälp."],
  ],
  8: [
    ["När stödjer bild och ord varandra bäst?", ["När de konkurrerar om uppmärksamheten", "När de förklarar samma relation och är lätta att samordna", "När bilden bara dekorerar", "När all text läses högt samtidigt"], 1, "Samordnade representationer kan hjälpa eleven bygga en gemensam förståelse."],
    ["Vad innebär signalering?", ["Att markera struktur och relevant information", "Att använda så många färger som möjligt", "Att ta bort alla bilder", "Att låta eleven gissa fokus"], 0, "Signalering riktar uppmärksamheten mot det centrala."],
    ["Vilket är ett bra steg efter att en figur har förklarats?", ["Byt direkt ämne", "Låt eleverna använda eller förklara representationen", "Lägg till dekoration", "Visa samma figur utan fråga"], 1, "En användningsuppgift ger information om hur figuren har förståtts."],
  ],
  9: [
    ["När blir bedömningsinformation formativ?", ["När den samlas in", "När den används för att påverka nästa undervisnings- eller elevhandling", "När den alltid ger betyg", "När bara läraren ser den"], 1, "Informationen blir formativ genom den efterföljande handlingen."],
    ["Vad kännetecknar ett diagnostiskt felsvar?", ["Det är slumpmässigt", "Det motsvarar ett vanligt tankefel", "Det är uppenbart orimligt", "Det avslöjar rätt svar"], 1, "Ett genomtänkt felsvar hjälper läraren tolka hur eleven tänker."],
    ["Vilken feedback är mest handlingsbar?", ["Utveckla", "Bra jobbat", "Lägg till ett belägg som stödjer ditt andra argument", "Försök mer"], 2, "Den pekar ut en specifik förändring som eleven kan genomföra."],
  ],
  10: [
    ["Vilken fråga gör ett forskningspåstående mer användbart?", ["Är metoden populär?", "För vilka elever, jämfört med vad och med vilket utfall?", "Har den ett kort namn?", "Kan den användas överallt?"], 1, "Deltagare, jämförelse och utfall är centrala för tolkningen."],
    ["Vad betyder korrelation?", ["Att den ena faktorn säkert orsakar den andra", "Att två faktorer samvarierar utan att orsaken därmed är fastställd", "Att studien saknar data", "Att resultatet gäller alla"], 1, "Samvariation räcker inte för att fastställa ett orsakssamband."],
    ["Vad är ett gränsvillkor?", ["Ett villkor som påverkar när en princip sannolikt fungerar", "Ett förbud mot professionellt omdöme", "Ett bevis för att forskning är oanvändbar", "Ett mått på elevnöjdhet"], 0, "Gränsvillkor hjälper lärare bedöma var och hur en princip är relevant."],
  ],
};

const factCheckAdditions = {
  1: `
<h2>Forskningsläge och viktiga avgränsningar</h2>
<p>Definitionen av lärande som en relativt varaktig förändring är en användbar arbetsdefinition, men lärande kan inte observeras direkt. Det måste <em>slutas till</em> från prestation vid flera tillfällen och i relevanta uppgifter. Ett enstaka lyckat eller misslyckat svar är därför osäkert som mått på vad som finns i långtidsminnet.</p>
<p>Lagringsstyrka och framplockningsstyrka är teoretiska begrepp som hjälper oss att förklara varför tillgänglighet just nu och hållbarhet över tid kan skilja sig. De är inte separata ”mätare” i hjärnan som läraren kan avläsa. Fördröjd kontroll, varierade uppgifter och minskat stöd ger tillsammans bättre belägg än någon enskild kontroll.</p>
<p>Glömska betyder inte alltid att undervisningen saknade effekt. Kunskap kan vara svår att plocka fram men lättare att återlära. Lärarens fråga bör därför vara både vad eleven kan återkalla nu och hur snabbt kunskapen återetableras med begränsat stöd.</p>`,
  2: `
<h2>Forskningsläge och viktiga avgränsningar</h2>
<p>Modellen mål, hinder, val, sortering och kontroll är bokens egen praktiska syntes. Den ska inte presenteras som ett färdigt program som i just denna femstegsform har visats ge en bestämd effekt. Delarna stöds av bredare forskning om tydliga mål, förkunskaper, undervisningsdesign, kontroll av förståelse och formativ användning av elevsvar.</p>
<p>Ett identifierat hinder är alltid en arbetshypotes. Samma felsvar kan bero på olika saker: saknad kunskap, missförstådd instruktion, språk, uppmärksamhet eller en felaktig begreppsmodell. Därför måste kontrollen kunna bekräfta eller förändra lärarens första tolkning.</p>
<p>Modellen avgör inte automatiskt vilken metod som är bäst. Ämnesinnehåll, elevgrupp, mål och genomförandekvalitet påverkar. Dess styrka ligger i att göra lärarens motivering prövbar: om elevsvaren inte förändras behöver hypotesen eller undervisningsvalet omprövas.</p>`,
  3: `
<h2>Forskningsläge och viktiga avgränsningar</h2>
<p>Kognitiv belastningsteori utgår från begränsningar i arbetsminnet när informationen är ny och relationsrik. Belastningen kan inte bestämmas enbart genom att räkna bilder, ord eller steg. Den beror på hur många delar eleven måste samordna och på vilka scheman som redan finns i långtidsminnet.</p>
<p>Terminologin har förändrats över tid. Äldre framställningar talar ofta om inneboende, extern och inlärningsfrämjande belastning som tre separata kategorier. I senare formuleringar behandlas den inlärningsfrämjande aktiviteten snarare som de arbetsminnesresurser som ägnas åt att hantera den inneboende belastningen, inte som en helt fristående belastning.</p>
<p>En viktig gräns är expertisomvändning: stöd som hjälper en nybörjare kan bli redundant och störande när eleven kan mer. Segmentering, signalering och exempel ska därför anpassas och avvecklas utifrån elevsvar. Målet är inte minimal belastning, utan att så mycket som möjligt av elevens ansträngning riktas mot det som ska läras.</p>`,
  4: `
<h2>Forskningsläge och viktiga avgränsningar</h2>
<p>Minnesåterkallning har ett starkt forskningsstöd för senare minne jämfört med enbart omläsning, men effekten är inte identisk för alla frågor och situationer. Eleven måste först ha haft en rimlig möjlighet att lära sig innehållet, och försöket behöver vara tillräckligt svårt för att kräva återkallning men inte så svårt att det bara blir upprepat misslyckande.</p>
<p>Återkoppling är särskilt viktig när svaren är felaktiga eller osäkra. Den hindrar att fel lämnas okorrigerade och ger en ny möjlighet att lagra det korrekta svaret. Samtidigt kan även återkallning utan omedelbar återkoppling gynna minnet när återkallningen lyckas.</p>
<p>Frågeformat och slutmål spelar roll. En kortsvarsfråga kräver ofta mer självständig framplockning än igenkänning i ett flervalsalternativ, men välkonstruerade flervalsfrågor kan pröva viktiga distinktioner. Överföring till nya uppgifter är inte automatisk; återkallningen behöver ibland följas av förklaring, jämförelse och tillämpning.</p>`,
  5: `
<h2>Forskningsläge och viktiga avgränsningar</h2>
<p>Stödet för utspridd övning är omfattande, men det finns inget enda optimalt mellanrum för all undervisning. Ett längre önskat bevarande talar vanligen för längre mellanrum, samtidigt som eleverna måste kunna återkalla tillräckligt för att återkomsten ska bli meningsfull. Praktiskt behöver intervallen justeras med hjälp av elevsvar.</p>
<p>Blandad övning har i metaanalyser en positiv genomsnittlig effekt, men resultaten varierar tydligt med materialet. För kategorier som är lätta att blanda ihop kan kontrasten vara värdefull. För ordmaterial och vissa texter har effekten varit liten, oklar eller ibland gynnat blockvis övning. Blandning ska därför lösa ett urskiljnings- eller metodvalsproblem, inte användas som en allmän regel.</p>
<p>Utspridd och blandad övning sammanfaller ofta: när uppgiftstyper blandas sprids också varje typ över tid. Läraren bör därför vara försiktig med att tillskriva en förbättring en enda mekanism. Nybörjaren behöver dessutom tillräcklig initial modellering innan svårigheten ökas.</p>`,
  6: `
<h2>Forskningsläge och viktiga avgränsningar</h2>
<p>Förkunskaper är ämnes- och uppgiftsspecifika. En elev kan ha omfattande vardagskunskap men sakna just de relationer som krävs för en vetenskaplig förklaring. En allmän aktivitet för att ”aktivera förkunskaper” är därför inte tillräcklig; läraren behöver kontrollera de byggstenar som det nya innehållet faktiskt förutsätter.</p>
<p>Ett schema är en teoretisk beskrivning av organiserad kunskap, inte en bokstavlig mapp i minnet. Scheman blir användbara när fakta och begrepp binds samman genom förklaringar, jämförelser och upprepad användning. En begreppskarta kan synliggöra relationer men är inte i sig bevis på att eleven kan återkalla eller använda dem.</p>
<p>Felaktiga förkunskaper försvinner inte alltid när det korrekta svaret sägs. Elever kan behöva göra en förutsägelse, se att den inte håller, möta en bättre modell och använda den i flera fall. Samtidigt bör läraren undvika att låta felaktiga alternativ dominera innan eleverna har en stabil korrekt grund.</p>`,
  7: `
<h2>Forskningsläge och viktiga avgränsningar</h2>
<p>Fördelen med genomarbetade exempel är tydligast när elever är nybörjare i den aktuella uppgiftstypen. När deras kunskap växer kan fullständiga exempel bli överflödiga, och självständig problemlösning kan ge mer. Detta kallas expertisomvändning och innebär att stöd måste anpassas efter kunnande inom just området, inte efter en allmän etikett på eleven.</p>
<p>Att visa en lösning räcker inte alltid. Elever kan läsa exemplet ytligt eller kopiera steg utan att förstå vad som styr dem. Frågor för självförklaring, jämförelser mellan exempel och delvis lösta problem kan rikta uppmärksamheten mot principerna. Frågorna bör dock vara få och fokuserade så att de inte skapar ny onödig belastning.</p>
<p>Avveckling bör styras av belägg: korrekta steg, rimliga motiveringar och framgång i närliggande uppgifter. En gradvis övergång är ofta bättre än ett hopp från full modell till helt fri problemlösning.</p>`,
  8: `
<h2>Forskningsläge och viktiga avgränsningar</h2>
<p>Ord och bild kan stödja lärande när de hjälper eleven att bygga samma ämnesmässiga modell. Detta är inte ett argument för att varje elev ska få material i en föredragen ”visuell” eller ”auditiv” lärstil. Representationen ska väljas efter innehållet: en karta lämpar sig för rumsliga relationer, uttal kräver ljud och en rörelse kan behöva visas.</p>
<p>Mer media innebär inte automatiskt mer lärande. En bild som upprepar text utan funktion, en animation som går för snabbt eller uppläst text som konkurrerar med läsning kan öka onödig belastning. Signalering hjälper främst när den pekar ut relevant struktur; om nästan allt markeras förlorar den sin funktion.</p>
<p>Tillgänglighet måste också vägas in. Färg får inte vara den enda informationsbäraren, bilder behöver begripliga förklaringar och elever ska kunna pausa eller återvända till komplex information. En förenklad bild är värdefull endast om den fortfarande representerar den centrala idén korrekt.</p>`,
  9: `
<h2>Forskningsläge och viktiga avgränsningar</h2>
<p>Återkoppling har mycket varierande effekter. Den kan hjälpa, vara neutral eller försämra prestationen beroende på vad den riktas mot och hur eleven kan använda den. Kommentarer om den aktuella uppgiften, processen eller nästa strategi är oftast mer handlingsbara än allmänt beröm eller omdömen om personen.</p>
<p>Information blir inte formativ bara för att den samlas in ofta. Den blir formativ när läraren eller eleven använder den för att ändra nästa handling. En kontroll som inte kan påverka undervisningen är i första hand dokumentation. Därför bör läraren planera möjliga beslut samtidigt som frågan planeras.</p>
<p>Alla-elever-svar ger bredare information än frivillig handuppräckning, men svaret är fortfarande ett stickprov. En korrekt bokstav på en skrivtavla visar inte säkert resonemanget bakom. Följ vid behov upp med motivering, ett kontrasterande fall eller en ny fråga. Återkoppling kräver också tid för bearbetning; annars blir den lätt information som aldrig omsätts.</p>`,
  10: `
<h2>Forskningsläge och viktiga avgränsningar</h2>
<p>Kritiken mot lärstilar gäller framför allt matchningshypotesen: påståendet att en elev lär sig bättre när undervisningsformen matchas till en diagnostiserad visuell, auditiv eller kinestetisk stil. Människor har preferenser och olika förmågeprofiler, men det är inte samma sak som stöd för denna matchning. Undervisningsformen bör i första hand följa innehållets struktur och tillgänglighetsbehov.</p>
<p>Evidens är graderad, inte binär. En enskild studie kan vara välgjord men ändå ge ett osäkert eller snävt resultat. Större tilltro kräver samstämmighet mellan flera studier, relevanta jämförelser, rimliga mätningar och helst sammanvägda översikter. Även en metaanalys beror på kvaliteten, variationen och publiceringen av de studier som ingår.</p>
<p>När en metod införs lokalt bör uppföljningen inte användas som ett enkelt bevis på orsak. Förbättring kan sammanfalla med andra förändringar. Använd därför resultatet som beslutsunderlag: dokumentera vad som ändrades, kontrollera lärande efter tid och leta aktivt efter alternativa förklaringar.</p>`,
};

const deepeningAdditions = {
  3: `
<h2>Diagnostisera belastning i en verklig lektion</h2>
<p>Att en elev säger ”det är för mycket” kan vara viktig information, men visar inte vilken belastning som orsakar problemet. Börja med en uppgiftsanalys. Vilka nya begrepp, symboler, relationer och handlingar måste hållas aktiva samtidigt? Vilka av dem borde redan vara automatiserade? Var behöver eleven växla mellan tavla, text, tabell och muntlig instruktion?</p>
<p>Tre mönster kan vägleda nästa beslut:</p>
<ul>
<li><strong>Många fastnar på samma punkt.</strong> Granska förklaringen, ordningsföljden och nödvändiga förkunskaper.</li>
<li><strong>Nybörjare fastnar men kunniga elever lyckas.</strong> Lägg till stöd för den första gruppen utan att göra det obligatoriskt för alla.</li>
<li><strong>Elever kan återge steg men inte använda dem.</strong> Problemet är kanske inte mängden information utan att relationerna och beslutspunkterna inte blivit synliga.</li>
</ul>

<h2>Från tydlig förklaring till självständig användning</h2>
<ol>
<li><strong>Förbered.</strong> Kontrollera två eller tre nödvändiga förkunskaper.</li>
<li><strong>Orientera.</strong> Ange vad eleverna ska förstå och vad de ska bortse från just nu.</li>
<li><strong>Modellera i sammanhängande steg.</strong> Visa både vad du gör och varför.</li>
<li><strong>Kontrollera mellan stegen.</strong> Be alla svara på en fråga som visar om relationen har förståtts.</li>
<li><strong>Foga samman och avveckla.</strong> Visa helheten och låt eleverna använda den med mindre stöd.</li>
</ol>
<p>Små steg är alltså ett medel, inte målet. Om undervisningen aldrig återgår till helheten kan eleverna lära isolerade procedurer utan att förstå när och varför de ska användas.</p>

<h2>Ytterligare ämnesexempel</h2>
<h3>Engelska</h3>
<p>Vid hörförståelse får eleverna först två frågor som riktar uppmärksamheten mot huvudidé och talare. Först vid en andra lyssning tillkommer detaljer. Att läsa tio frågor samtidigt som ljudet spelas kan annars flytta resurser från lyssnandet till sökandet i frågebladet.</p>
<h3>Historia</h3>
<p>En komplex orsaksmodell byggs i lager: bakgrundsvillkor, utlösande händelse och aktörers beslut. När varje lager har förklarats fogas de samman och eleverna får pröva vilken typ av orsak ett nytt exempel representerar.</p>`,
  4: `
<h2>Välj vad eleverna ska återkalla</h2>
<p>En frågebank bör spegla ämnets kunskapsstruktur. Om frågorna nästan bara gäller termer kan eleverna förbättra faktaminnet utan att träna relationer, procedurval eller förklaringar. Fördela därför frågorna mellan minst fyra typer:</p>
<ul>
<li><strong>Fakta och begrepp:</strong> Vad betyder erosion?</li>
<li><strong>Relationer:</strong> Hur hänger erosion och transport ihop?</li>
<li><strong>Procedurer och beslut:</strong> Vilken metod passar och varför?</li>
<li><strong>Organisation:</strong> Rita processen eller ordna delarna i en struktur.</li>
</ul>
<p>Frågan ska ligga nära det framtida användningsmålet. Om eleven senare ska skriva en förklaring bör åtminstone några återkallningar kräva att relationerna uttrycks, inte bara att rätt alternativ känns igen.</p>

<h2>En återkallningscykel över flera veckor</h2>
<p>Planera återkallning på kursnivå, inte bara som en spontan startaktivitet. Efter första undervisningen kan en idé återkomma nästa lektion, följande vecka och senare i ett blandat sammanhang. Varje återkomst kan förändras från enkel framplockning till jämförelse och tillämpning.</p>
<ol>
<li>Första återkomsten: återge kärnan med kort svar.</li>
<li>Andra återkomsten: förklara sambandet eller rekonstruera en modell.</li>
<li>Tredje återkomsten: skilj idén från ett närliggande begrepp.</li>
<li>Senare återkomst: använd kunskapen i en ny uppgift.</li>
</ol>

<h2>Använd svarsmönstret som undervisningsdata</h2>
<p>Räkna inte bara rätt och fel. Sortera orsaken till felen. Om nästan alla saknar samma del behövs sannolikt ny undervisning. Om svaren är splittrade kan två kontrasterande exempel vara bättre. Om eleverna kan svaret men inte motivera det behöver nästa aktivitet rikta sig mot relationen. Om kunskapen återkommer efter en liten ledtråd kan ett kortare mellanrum eller mer självständig återkallning vara nästa steg.</p>
<p>Återkallning är inte ett neutralt tillägg till en full kurs. Den tar tid. Prioritera därför generativ kunskap som behövs för senare förståelse och använd hellre några väl valda frågor återkommande än en stor mängd perifera fakta.</p>`,
  5: `
<h2>Planera återkomst i läroplanen</h2>
<p>Utspridd övning fungerar bäst när återkomsten byggs in redan vid långtidsplaneringen. Gör en enkel återkomstkarta: välj fem till åtta kärnidéer, ange när de först undervisas och reservera korta tillfällen för återkallning, jämförelse och senare tillämpning. Då blir repetition inte något som läggs in först när provet närmar sig.</p>
<p>En återkomst behöver inte vara en kopia av den första lektionen. Den kan vara en enda startfråga, ett exempel i en ny text, ett metodval eller en kort förklaring. Det avgörande är att eleven åter behöver aktivera och använda samma kunskapsstruktur.</p>

<h2>Så väljer du vad som ska blandas</h2>
<p>Blanda kategorier som elever behöver kunna skilja åt. Bra kandidater är metoder som har liknande yta men olika villkor, begrepp som ofta förväxlas eller texttyper där elever måste urskilja funktion. Undvik att blanda enbart för variationens skull.</p>
<ol>
<li>Undervisa och modellera varje kategori till en grundläggande nivå.</li>
<li>Välj två eller tre kategorier med en meningsfull kontrast.</li>
<li>Låt eleven ange kategori eller metod före själva lösningen.</li>
<li>Be om kännetecknet som styr valet.</li>
<li>Lägg senare till fler kategorier och mindre typiska exempel.</li>
</ol>

<h2>Skilj önskvärd svårighet från dålig design</h2>
<p>Att prestationen sjunker under blandad eller utspridd övning kan vara väntat, men varje svårighet är inte önskvärd. Svårigheten är produktiv när den får eleven att återkalla, urskilja eller välja relevant kunskap och när återkoppling gör en korrigering möjlig. Den är mindre produktiv när instruktionen är oklar, förkunskaper saknas eller uppgiften kräver flera nya saker samtidigt.</p>

<h2>Ytterligare ämnesexempel</h2>
<p>I språk kan ord återkomma i läsning, muntligt samtal och senare skrivande, men blockvis träning kan fortfarande behövas när en ny böjningsform introduceras. I kemi kan reaktionstyper blandas först när eleverna har en grundmodell för varje typ. I historia kan olika orsaksförklaringar jämföras över arbetsområden så att eleverna övar på att välja förklaringsnivå, inte bara minnas en tidsperiod.</p>`,
  6: `
<h2>Bygg en kunskapsarkitektur före arbetsområdet</h2>
<p>Innan material och aktiviteter väljs kan läraren rita en enkel ämneskarta. Börja med slutmålet och arbeta bakåt: vilka begrepp, fakta, procedurer och relationer måste finnas för att eleven ska kunna resonera? Markera vad som är nödvändigt, vad som kan undervisas parallellt och vad som bör vänta.</p>
<p>En användbar karta skiljer mellan att känna till en term och att förstå dess relationer. För fotosyntes räcker det exempelvis inte att känna igen koldioxid och syre. Eleven behöver koppla materia, energi, växtens massa och cellernas processer. Den kartan hjälper läraren att formulera frågor som prövar mer än ordkunskap.</p>

<h2>En fullständig sekvens för begreppsundervisning</h2>
<ol>
<li><strong>Diagnos:</strong> Ge ett fall som avslöjar hur eleverna redan kategoriserar.</li>
<li><strong>Definition:</strong> Formulera de avgörande egenskaperna med ämnesmässig precision.</li>
<li><strong>Typiska exempel:</strong> Gör kärnan lätt att se.</li>
<li><strong>Icke-exempel:</strong> Visa vad som saknas och varför fallet inte tillhör kategorin.</li>
<li><strong>Gränsfall:</strong> Pröva om eleverna använder egenskaperna i stället för ytliga kännetecken.</li>
<li><strong>Relationer:</strong> Placera begreppet i ett nät av över-, under- och sidobegrepp.</li>
<li><strong>Återkomst:</strong> Låt eleverna använda begreppet i förklaring och nytt sammanhang.</li>
</ol>

<h2>Förkunskaper och läsförståelse</h2>
<p>Strategier som att sammanfatta och ställa frågor är användbara, men förståelsen av en ämnestext beror också på kunskap om textens ord, referenser och innehåll. Inför svår läsning kan läraren därför förundervisa ett begränsat antal generativa begrepp, ge en orienterande modell och sedan låta eleverna läsa med en tydlig ämnesfråga.</p>
<p>Det betyder inte att varje detalj ska berättas före läsningen. För mycket förundervisning kan göra texten överflödig och ta bort elevens meningsskapande. Välj sådant som annars skulle blockera förståelsen.</p>

<h2>Ytterligare ämnesexempel</h2>
<p>I matematik kan funktion organiseras genom relationerna representation, förändring och beroende, inte som en samling separata formler. I religionskunskap kan ritual, symbol och berättelse jämföras utan att alla traditioner framställs som likadana. I svenska kan berättarperspektiv kopplas till vilken information läsaren får och vilken effekt det skapar.</p>`,
  7: `
<h2>Vad läraren behöver modellera</h2>
<p>Modellering bör omfatta tre lager. Det första är handlingen: vad gör jag? Det andra är beslutet: varför väljer jag just detta steg? Det tredje är kontrollen: hur vet jag att resultatet håller? Om bara handlingen visas kan eleverna imitera proceduren men sakna grund för att välja den självständigt.</p>
<p>Ett tänk-högt behöver vara förberett. Expertens verkliga tänkande är ofta snabbt och komprimerat. Läraren behöver därför sakta ned, välja de beslut som är undervisningsbara och undvika långa sidospår som belastar mer än de förklarar.</p>

<h2>Designa en serie av exempel</h2>
<p>Ett enda exempel kan göra att eleverna kopplar principen till oviktiga ytdrag. Planera i stället exempelpar:</p>
<ul>
<li><strong>Samma princip, olika yta:</strong> visar vad som är stabilt.</li>
<li><strong>Liknande yta, olika princip:</strong> tränar urskiljning och metodval.</li>
<li><strong>Korrekt och bristfälligt exempel:</strong> synliggör kvalitetskriterier.</li>
<li><strong>Fullständigt och delvis löst exempel:</strong> skapar en bro till eget arbete.</li>
</ul>
<p>Be eleverna jämföra exemplen innan de producerar en generell regel. Läraren behöver sedan precisera regeln så att en tillfällig elevformulering inte blir den slutliga ämnesdefinitionen.</p>

<h2>Beslutspunkter för avvecklat stöd</h2>
<p>Planera stödet som nivåer: full modell, markerade beslut, delvis lösning, kontrollista och självständig uppgift. Bestäm vilket belägg som krävs för nästa nivå. Det kan vara två korrekta lösningar med motivering eller att eleven upptäcker och rättar ett fel.</p>
<p>Om elever misslyckas efter att stödet minskat behöver läraren avgöra om de saknar principen eller bara behöver en mindre ledtråd för att återkalla den. Att direkt ge hela modellen igen kan göra elever passiva; att lämna dem utan stöd kan befästa gissning.</p>

<h2>Ytterligare ämnesexempel</h2>
<p>I bild kan läraren modellera hur komposition bedöms, inte bara hur ett verktyg används. I samhällskunskap kan en modellanalys visa hur ett påstående kopplas till belägg och ett perspektiv. I programmering kan ett kodexempel kommenteras utifrån problemuppdelning, villkor och kontroll, följt av en version där strategiska rader saknas.</p>`,
  8: `
<h2>Bestäm representationens funktion</h2>
<p>Varje representation bör ha ett tydligt jobb. En bild kan visa rumslig relation, en tidslinje ordning, en graf förändring, en tabell jämförelse och en animation en process över tid. Om läraren inte kan formulera vad representationen tillför bör den tas bort eller omarbetas.</p>
<p>Olika representationer av samma innehåll behöver översättas explicit. Elever ser inte alltid att en kemisk formel, en partikelbild och en observation beskriver samma förlopp. Peka ut motsvarigheter och låt eleverna själva gå från en form till en annan.</p>

<h2>Granska ett bildspel sida för sida</h2>
<ol>
<li>Vilken enda idé ska sidan hjälpa eleven att förstå?</li>
<li>Vad drar blicken till sig först, och är det rätt sak?</li>
<li>Måste eleven samtidigt läsa och lyssna på konkurrerande formuleringar?</li>
<li>Finns etiketter och förklaringar nära den del de beskriver?</li>
<li>Behöver figuren byggas stegvis eller kunna pausas?</li>
<li>Vilken fråga får eleven att använda informationen?</li>
</ol>
<p>En presentationsbild är inte en lärobokssida. Lång text kan ibland behövas för självständig läsning, men då bör läraren ge lästid och inte samtidigt hålla en annan muntlig förklaring.</p>

<h2>Anteckningar som bearbetning</h2>
<p>Att kopiera en färdig bild kan ge ett dokument utan att skapa förståelse. Ge i stället korta pauser där eleverna rekonstruerar en modell, skriver en relation eller kompletterar en delvis färdig figur. Därefter behöver de jämföra med en korrekt version så att fel inte lämnas okorrigerade.</p>

<h2>Ytterligare ämnesexempel</h2>
<p>I geografi kan lager i en karta visas ett i taget innan eleverna kombinerar höjd, nederbörd och markanvändning. I matematik kan samma lutning markeras i graf, tabell och formel. I musik kan notbild, ljud och handrörelse samordnas vid den punkt där relationen ska uppmärksammas. I alla fallen ska kombinationen följa ämnet, inte en påstådd lärstil.</p>

<h2>När rörelse och animation tillför något</h2>
<p>Animation är särskilt motiverad när själva förändringen över tid är innehållet, exempelvis blodets väg, en geometrisk transformation eller hur en mekanism rör sig. Men informationen försvinner medan eleven tittar. Ge därför kontroll över tempo och paus, markera den aktuella delen och komplettera vid behov med en beständig översiktsbild. Om en serie stillbilder visar samma relation tydligare och gör jämförelse lättare kan de vara ett bättre val.</p>`,
  9: `
<h2>Konstruera frågor bakifrån från felsvaret</h2>
<p>Börja inte bara med rätt svar. Lista två eller tre sätt som elever rimligen kan tänka fel på och bygg alternativ eller följdfrågor som skiljer dem åt. En fråga är diagnostisk när olika svar leder till olika tolkningar och undervisningsbeslut.</p>
<p>Frågor kan fylla olika funktioner: kontrollera en nödvändig förkunskap, följa ett steg i en förklaring, skilja närliggande begrepp eller pröva överföring. Märk frågorna i planeringen så att inte alla råkar ligga på igenkänningsnivå.</p>

<h2>Planera beslutströsklar</h2>
<ul>
<li><strong>Nästan alla korrekta med rimlig motivering:</strong> minska stödet eller gå vidare.</li>
<li><strong>Gruppen är delad mellan två tankesätt:</strong> jämför svaren och använd ett avgörande exempel.</li>
<li><strong>Ett felsvar dominerar:</strong> undervisa om relationen på nytt i stället för att bara upprepa facit.</li>
<li><strong>Svaren är slumpmässiga:</strong> kontrollera instruktion, språk och nödvändiga förkunskaper.</li>
</ul>
<p>Procentsatserna är inte universella. En säkerhetsregel i kemi kan kräva full behärskning, medan en tidig hypotesfråga främst kartlägger variationen i tänkandet.</p>

<h2>En återkopplingscykel som leder till arbete</h2>
<ol>
<li>Påminn om målet eller kvalitetskriteriet.</li>
<li>Peka ut den viktigaste skillnaden mellan nuvarande svar och målet.</li>
<li>Ge en konkret nästa handling, fråga eller ledtråd.</li>
<li>Låt eleven bearbeta medan stödet fortfarande är tillgängligt.</li>
<li>Kontrollera en ny version eller närliggande uppgift.</li>
</ol>
<p>Kamratåterkoppling kräver också undervisning. Elever behöver se exempel på användbara kommentarer, arbeta med en begränsad kvalitetsdimension och ha ansvar för att förbättra sin egen produkt. Att bara byta texter skapar inte automatiskt god återkoppling.</p>

<h2>Ytterligare ämnesexempel</h2>
<p>I fysik kan alla först rita kraftpilar och därefter motivera en vald pil. I engelska kan läraren samla tre anonyma meningar och fråga vilket register de signalerar. I historia kan samma källa bedömas mot två olika frågor för att visa att användbarhet beror på syftet.</p>`,
  10: `
<h2>En trappa för evidensstyrka</h2>
<p>Olika källor kan besvara olika frågor. En teori föreslår en mekanism. Ett kontrollerat experiment kan stärka ett orsakspåstående under avgränsade villkor. En klassrumsstudie prövar genomförbarhet i en mer autentisk miljö. En systematisk översikt sammanväger ett område men är beroende av de ingående studierna. Ingen nivå gör de andra överflödiga.</p>
<p>När du läser en sammanfattning, försök hitta kedjan tillbaka: originalstudie, jämförelse, deltagare, uppgift, utfall och tidsintervall. Ett påstående om ”bättre lärande” kan annars bygga på snabbare prestation direkt efter aktiviteten.</p>

<h2>Granska ett påstående i sex steg</h2>
<ol>
<li><strong>Precisera:</strong> Vad påstås fungera, för vem och till vilket mål?</li>
<li><strong>Jämför:</strong> Vad fick kontrollgruppen eller den alternativa undervisningen?</li>
<li><strong>Mät:</strong> Var utfallet minne, förståelse, överföring, motivation eller upplevelse?</li>
<li><strong>Tid:</strong> Mättes effekten direkt eller efter ett relevant intervall?</li>
<li><strong>Variation:</strong> Hur säkert och hur enhetligt var resultatet?</li>
<li><strong>Kostnad:</strong> Vad tränger metoden undan och vilka elever riskerar att missgynnas?</li>
</ol>

<h2>Från forskning till lokalt beslut</h2>
<p>Översätt inte en princip direkt till ett skolövergripande krav. Formulera först vilket lokalt problem den ska lösa. Bestäm en liten förändring, vad som ska vara oförändrat och vilket elevnära utfall som följs. Använd både korta processmått och ett fördröjt lärandemått.</p>
<p>Ett lokalt före- och efterresultat kan ge viktig information men bevisar sällan ensam orsak. Elevgrupp, innehåll, bedömning och andra förändringar kan skilja sig. Ställ därför frågan ”är detta tillräckligt lovande för att fortsätta och förbättra?” snarare än ”har vi bevisat att metoden fungerar?”.</p>

<h2>Vanliga varningssignaler</h2>
<ul>
<li>Metoden sägs fungera för alla mål, ämnen och åldrar.</li>
<li>Endast nöjdhet eller aktivitet redovisas som lärande.</li>
<li>Jämförelsealternativet är oklart eller uppenbart svagt.</li>
<li>En liten studie presenteras som slutgiltig.</li>
<li>Begränsningar försvinner när resultatet återges i sociala medier eller marknadsföring.</li>
</ul>`,
};

for (const chapter of data.chapters) {
  if (expanded[chapter.number]) {
    chapter.contentHtml = expanded[chapter.number].trim();
    const additions = quizAdditions[chapter.number] || [];
    if (chapter.quiz.length < 5) {
      chapter.quiz.push(...additions.map(([question, options, correctAnswer, explanation], index) => ({
        id: chapter.quiz.length + index + 1,
        type: "multiple-choice",
        question,
        options,
        correctAnswer,
        feedback: "Se förklaringen.",
        explanation,
      })));
    }
  }
}

const chapter1 = data.chapters.find((chapter) => chapter.number === 1);
if (chapter1 && !chapter1.contentHtml.includes("Reflektion och arbetsuppgift")) {
  chapter1.contentHtml = chapter1.contentHtml.replace(
    "<h2>Övergång till kapitel 2</h2>",
    `<h2>Reflektion och arbetsuppgift</h2><p>Välj ett moment där eleverna brukar lyckas under lektionen men ha svårt senare. Skriv två kontroller: en direkt och en fördröjd. Den senare ska kräva återkallning eller användning med mindre stöd. Beskriv vad skillnaden mellan svaren skulle få dig att ändra.</p>\n\n<h2>Övergång till kapitel 2</h2>`,
  );
}

const chapter2 = data.chapters.find((chapter) => chapter.number === 2);
if (chapter2 && !chapter2.contentHtml.includes("Reflektion och arbetsuppgift")) {
  chapter2.contentHtml = chapter2.contentHtml.replace(
    "<h2>Övergång till kapitel 3</h2>",
    `<h2>Reflektion och arbetsuppgift</h2><p>Planera en kommande lektion med modellens fem rubriker. Granska sedan själv om kontrollen verkligen prövar målet och om valet matchar det identifierade hindret. Ändra en del utifrån granskningen.</p>\n\n<h2>Övergång till kapitel 3</h2>`,
  );
}
for (const chapter of data.chapters.slice(0, 10)) {
  const deepening = deepeningAdditions[chapter.number];
  if (deepening && !chapter.contentHtml.includes("Diagnostisera belastning i en verklig lektion") && !chapter.contentHtml.includes("Välj vad eleverna ska återkalla") && !chapter.contentHtml.includes("Planera återkomst i läroplanen") && !chapter.contentHtml.includes("Bygg en kunskapsarkitektur före arbetsområdet") && !chapter.contentHtml.includes("Vad läraren behöver modellera") && !chapter.contentHtml.includes("Bestäm representationens funktion") && !chapter.contentHtml.includes("Konstruera frågor bakifrån från felsvaret") && !chapter.contentHtml.includes("En trappa för evidensstyrka")) {
    chapter.contentHtml = chapter.contentHtml.replace(
      "<h2>Reflektion och arbetsuppgift</h2>",
      `${deepening.trim()}\n\n<h2>Reflektion och arbetsuppgift</h2>`,
    );
  }

  const addition = factCheckAdditions[chapter.number];
  if (addition && !chapter.contentHtml.includes("Forskningsläge och viktiga avgränsningar")) {
    chapter.contentHtml = chapter.contentHtml.replace(
      "<h2>Reflektion och arbetsuppgift</h2>",
      `${addition.trim()}\n\n<h2>Reflektion och arbetsuppgift</h2>`,
    );
  }
}

const factCheckResources = {
  1: [{
    title: "Learning Versus Performance: An Integrative Review",
    reference: "Soderstrom, N. C., & Bjork, R. A. (2015). Learning versus performance: An integrative review. Perspectives on Psychological Science, 10(2), 176–199.",
    url: "https://doi.org/10.1177/1745691615569000",
    description: "Skiljer mellan observerad prestation under övning och mer varaktigt lärande.",
  }],
  2: [{
    title: "Assessment and Classroom Learning",
    reference: "Black, P., & Wiliam, D. (1998). Assessment and classroom learning. Assessment in Education: Principles, Policy & Practice, 5(1), 7–74.",
    url: "https://doi.org/10.1080/0969595980050102",
    description: "Grundläggande översikt om hur information från bedömning kan användas för att anpassa undervisning och lärande.",
  }],
  4: [{
    title: "Practicing Retrieval Facilitates Learning",
    reference: "McDermott, K. B. (2021). Practicing retrieval facilitates learning. Annual Review of Psychology, 72, 609–633.",
    url: "https://doi.org/10.1146/annurev-psych-010419-051019",
    description: "Översikt över effekter, mekanismer och användningsområden för minnesåterkallning.",
  }, {
    title: "Testing (Quizzing) Boosts Classroom Learning",
    reference: "Yang, C., Luo, L., Vadillo, M. A., Yu, R., & Shanks, D. R. (2021). Testing (quizzing) boosts classroom learning: A systematic and meta-analytic review. Psychological Bulletin, 147(4), 399–435.",
    url: "https://doi.org/10.1037/bul0000309",
    description: "Systematisk översikt och metaanalys av testförstärkt lärande i verkliga utbildningsmiljöer.",
  }],
  5: [
    {
      title: "Distributed Practice in Verbal Recall Tasks",
      reference: "Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T., & Rohrer, D. (2006). Distributed practice in verbal recall tasks: A review and quantitative synthesis. Psychological Bulletin, 132(3), 354–380.",
      url: "https://doi.org/10.1037/0033-2909.132.3.354",
      description: "Metaanalys av hur mellanrum och önskad bevarandetid samspelar vid utspridd övning.",
    },
    {
      title: "Similarity Matters: A Meta-analysis of Interleaved Learning and Its Moderators",
      reference: "Brunmair, M., & Richter, T. (2019). Similarity matters: A meta-analysis of interleaved learning and its moderators. Psychological Bulletin, 145(11), 1029–1052.",
      url: "https://doi.org/10.1037/bul0000209",
      description: "Visar en positiv genomsnittlig effekt av blandad övning men också tydliga skillnader mellan material och uppgifter.",
    },
  ],
  7: [{
    title: "Expertise Reversal Effect and Its Instructional Implications",
    reference: "Kalyuga, S., & Renkl, A. (2010). Expertise reversal effect and its instructional implications: Introduction to the special issue. Instructional Science, 38, 209–215.",
    url: "https://doi.org/10.1007/s11251-009-9102-0",
    description: "Förklarar varför stöd som hjälper nybörjare kan bli redundant när ämnesspecifik expertis växer.",
  }],
  6: [{
    title: "The Landscape of Research on Prior Knowledge and Learning",
    reference: "Bittermann, A., McNamara, D., Simonsmeier, B. A., & Schneider, M. (2023). The landscape of research on prior knowledge and learning: A bibliometric analysis. Educational Psychology Review, 35, 58.",
    url: "https://doi.org/10.1007/s10648-023-09775-9",
    description: "Kartlägger forskning om hur ämnesspecifika förkunskaper kan stödja, hindra eller ha liten effekt på nytt lärande.",
  }],
  8: [{
    title: "Principles for Reducing Extraneous Processing in Multimedia Learning",
    reference: "Mayer, R. E., & Fiorella, L. (2014). Principles for reducing extraneous processing in multimedia learning. In R. E. Mayer (Ed.), The Cambridge Handbook of Multimedia Learning (2nd ed., pp. 279–315). Cambridge University Press.",
    url: "https://doi.org/10.1017/CBO9781139547369.015",
    description: "Sammanfattar forskning om koherens, signalering, redundans samt rumslig och tidsmässig närhet.",
  }],
  9: [{
    title: "A Meta-analysis of Digitally Delivered Instructional Feedback",
    reference: "Brummer, L., de Boer, H., Mouw, J. M., & Strijbos, J.-W. (2024). A meta-analysis of the effects of context, content, and task factors of digitally delivered instructional feedback on learning performance. Learning Environments Research, 27, 453–476.",
    url: "https://doi.org/10.1007/s10984-024-09501-4",
    description: "Visar att återkopplingens effekt varierar med fokus, ämne, uppgift, bedömningsform och elevens möjlighet att använda informationen.",
  }],
  10: [{
    title: "Learning Styles: Concepts and Evidence",
    reference: "Pashler, H., McDaniel, M., Rohrer, D., & Bjork, R. (2008). Learning styles: Concepts and evidence. Psychological Science in the Public Interest, 9(3), 105–119.",
    url: "https://doi.org/10.1111/j.1539-6053.2009.01038.x",
    description: "Granskar matchningshypotesen bakom lärstilar och finner inte tillräckligt stöd för generell användning i undervisning.",
  }],
};

for (const chapter of data.chapters.slice(0, 10)) {
  for (const resource of factCheckResources[chapter.number] || []) {
    if (!chapter.resources.some((existing) => existing.url === resource.url)) {
      chapter.resources.push(resource);
    }
  }
}

const swedishTerms = [
  [/checks for understanding/gi, "kontroller av förståelse"],
  [/retrieval practice/gi, "minnesåterkallning"],
  [/worked examples/gi, "genomarbetade exempel"],
  [/worked example/gi, "genomarbetat exempel"],
  [/storage strength/gi, "lagringsstyrka"],
  [/retrieval strength/gi, "framplockningsstyrka"],
  [/interleaving/gi, "blandad övning"],
  [/spacing/gi, "utspridd övning"],
  [/cramming/gi, "intensivpluggande"],
  [/scaffolding/gi, "stödstrukturer"],
  [/feedback-driven/gi, "återkopplingsbaserad"],
  [/återkoppling-driven/gi, "återkopplingsbaserad"],
  [/feedback/gi, "återkoppling"],
  [/distributed practice/gi, "utspridd övning"],
  [/embodied learning/gi, "kroppsligt lärande"],
  [/exit tickets/gi, "avslutningsfrågor"],
  [/miniwhiteboards/gi, "små skrivtavlor"],
  [/multimedia/gi, "multimedialt material"],
  [/låginsatsquiz/gi, "kunskapsfrågor med låg insats"],
  [/startquiz/gi, "startfrågor"],
  [/quizbank/gi, "frågebank"],
  [/\bquiz\b/gi, "kunskapsfrågor"],
];

function translateTerms(value) {
  return swedishTerms.reduce(
    (text, [pattern, replacement]) => text.replace(pattern, replacement),
    value,
  );
}

for (const chapter of data.chapters) {
  chapter.title = translateTerms(chapter.title);
  chapter.title = chapter.title.charAt(0).toUpperCase() + chapter.title.slice(1);
  chapter.description = translateTerms(chapter.description);
  chapter.sections = chapter.sections.map(translateTerms);
  chapter.contentHtml = translateTerms(chapter.contentHtml);
  chapter.summary = translateTerms(chapter.summary);
  chapter.keyTopics = chapter.keyTopics.map(translateTerms);
  chapter.quiz = chapter.quiz.map((question) => ({
    ...question,
    question: translateTerms(question.question),
    options: question.options?.map(translateTerms),
    feedback: translateTerms(question.feedback || ""),
    explanation: translateTerms(question.explanation || ""),
  }));
  chapter.resources = chapter.resources.map((resource) => ({
    ...resource,
    description: translateTerms(resource.description || ""),
  }));
}

const swedishChapterTitles = {
  4: "Minnesåterkallning: att stärka minnet",
  5: "Utspridd, blandad och varierad övning",
  7: "Genomarbetade exempel, modellering och avvecklat stöd",
  9: "Frågor, återkoppling och kontroll av förståelse",
};

const annotatedChapterTitles = {
  4: "Minnesåterkallning (<em>retrieval practice</em>): att stärka minnet",
  5: "Utspridd (<em>spacing</em>), blandad (<em>interleaving</em>) och varierad övning",
  7: "Genomarbetade exempel (<em>worked examples</em>), modellering (<em>modeling</em>) och avvecklat stöd",
  9: "Frågor, återkoppling (<em>feedback</em>) och kontroll av förståelse (<em>check for understanding</em>)",
};

for (const chapter of data.chapters) {
  if (swedishChapterTitles[chapter.number]) {
    chapter.title = swedishChapterTitles[chapter.number];
  }
  chapter.titleHtml = annotatedChapterTitles[chapter.number] || chapter.title;
}

const originalTermAnnotations = {
  1: [
    ["minnesåterkallning senare i kursen", "minnesåterkallning (<em>retrieval practice</em>) senare i kursen"],
    ["<h2>Lagringsstyrka och framplockningsstyrka</h2>", "<h2>Lagringsstyrka och framplockningsstyrka</h2><p class=\"term-note\">I den engelskspråkiga litteraturen används <em>storage strength</em> och <em>retrieval strength</em>.</p>"],
    ["varför intensivpluggande kan kännas effektivt", "varför intensivpluggande (<em>cramming</em>) kan kännas effektivt"],
  ],
  2: [
    ["minnesåterkallning, utspridd övning och korta återkomster", "minnesåterkallning (<em>retrieval practice</em>), utspridd övning (<em>spacing</em>) och korta återkomster"],
    ["genomarbetade exempel</td>", "genomarbetade exempel (<em>worked examples</em>)</td>"],
  ],
  3: [
    ["Kognitiv belastningsteori ger", "Kognitiv belastningsteori (<em>cognitive load theory</em>) ger"],
    ["<strong>Inneboende belastning</strong>", "<strong>Inneboende belastning</strong> (<em>intrinsic cognitive load</em>)"],
    ["<strong>Extern belastning</strong>", "<strong>Extern belastning</strong> (<em>extraneous cognitive load</em>)"],
  ],
  4: [
    ["Minnesåterkallning, eller minnesåterkallning, innebär", "Minnesåterkallning (<em>retrieval practice</em>) innebär"],
  ],
  5: [
    ["<h2>Utspridd övning: återkomst med mellanrum</h2>", "<h2>Utspridd övning: återkomst med mellanrum</h2><p class=\"term-note\">Den engelska termen är <em>spacing</em> eller <em>spaced practice</em>.</p>"],
    ["<h2>Blandad övning: att välja, inte bara utföra</h2>", "<h2>Blandad övning: att välja, inte bara utföra</h2><p class=\"term-note\">I forskningslitteraturen används termen <em>interleaving</em>.</p>"],
  ],
  6: [
    ["Ett schema är en organiserad struktur", "Ett schema (<em>schema</em>) är en organiserad struktur"],
    ["Förkunskaper är därför en resurs", "Förkunskaper (<em>prior knowledge</em>) är därför en resurs"],
  ],
  7: [
    ["Ett genomarbetat exempel visar", "Ett genomarbetat exempel (<em>worked example</em>) visar"],
    ["<strong>Modellera.</strong>", "<strong>Modellera (<em>modeling</em>).</strong>"],
    ["Stöd som aldrig minskar", "Stödstrukturer (<em>scaffolding</em>) som aldrig minskar"],
  ],
  8: [
    ["<h2>Uppmärksamhet och multimedialt material</h2>", "<h2>Uppmärksamhet och multimedialt material</h2><p class=\"term-note\">Det engelska forskningsområdet benämns ofta <em>multimedia learning</em>.</p>"],
    ["Signalering innebär att markera", "Signalering (<em>signaling</em>) innebär att markera"],
  ],
  9: [
    ["<h2>Kontroller av förståelse</h2>", "<h2>Kontroller av förståelse</h2><p class=\"term-note\">I engelskspråkig litteratur används <em>checks for understanding</em>.</p>"],
    ["Återkoppling är värdefull", "Återkoppling (<em>feedback</em>) är värdefull"],
  ],
  10: [
    ["Gränsvillkor beskriver", "Gränsvillkor (<em>boundary conditions</em>) beskriver"],
    ["Blandad övning kräver", "Blandad övning (<em>interleaving</em>) kräver"],
  ],
  11: [
    ["Minnesåterkallning kan vara", "Minnesåterkallning (<em>retrieval practice</em>) kan vara"],
    ["genomarbetade exempel.</li>", "genomarbetade exempel (<em>worked examples</em>).</li>"],
    ["utspridd övning.</li>", "utspridd övning (<em>spacing</em>).</li>"],
  ],
};

for (const chapter of data.chapters) {
  for (const [swedishText, annotatedText] of originalTermAnnotations[chapter.number] || []) {
    const englishTerm = annotatedText.match(/<em>(.*?)<\/em>/)?.[1];
    const escapedText = swedishText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const swedishPattern = new RegExp(escapedText, "i");
    if (swedishPattern.test(chapter.contentHtml) && (!englishTerm || !chapter.contentHtml.includes(`<em>${englishTerm}</em>`))) {
      chapter.contentHtml = chapter.contentHtml.replace(swedishPattern, annotatedText);
    }
  }

  chapter.contentHtml = chapter.contentHtml
    .replace(/<em>minnesåterkallning<\/em>/gi, "<em>retrieval practice</em>")
    .replace(/<em>utspridd övning<\/em>/gi, "<em>spacing</em>")
    .replace(/<em>blandad övning<\/em>/gi, "<em>interleaving</em>")
    .replace(/<em>genomarbetade exempel<\/em>/gi, "<em>worked examples</em>")
    .replace(/<em>genomarbetat exempel<\/em>/gi, "<em>worked example</em>")
    .replace(/<em>intensivpluggande<\/em>/gi, "<em>cramming</em>")
    .replace(/<em>återkoppling<\/em>/gi, "<em>feedback</em>")
    .replace(/<em>stödstrukturer<\/em>/gi, "<em>scaffolding</em>")
    .replace(/<em>lagringsstyrka<\/em>/gi, "<em>storage strength</em>")
    .replace(/<em>framplockningsstyrka<\/em>/gi, "<em>retrieval strength</em>");
}

const firstChapter = data.chapters.find((chapter) => chapter.number === 1);
if (firstChapter) {
  const strengthNote = '<p class="term-note">I den engelskspråkiga litteraturen används <em>storage strength</em> och <em>retrieval strength</em>.</p>';
  firstChapter.contentHtml = firstChapter.contentHtml.replace(
    new RegExp(`(?:${strengthNote.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})+`),
    strengthNote,
  );
  firstChapter.contentHtml = firstChapter.contentHtml.replace(
    "<p>Två användbara begrepp är <em>storage strength</em> och <em>retrieval strength</em>. De kan översättas ungefär som lagringsstyrka och framplockningsstyrka.</p>",
    "<p>De två begreppen beskriver olika sidor av hur kunskap bevaras och blir tillgänglig.</p>",
  );
}

const everyOccurrenceTerms = [
  [/expertisomvändning/gi, "expertise reversal"],
  [/matchningshypotesen/gi, "meshing hypothesis"],
  [/matchningshypotes/gi, "meshing hypothesis"],
  [/metaanalyser/gi, "meta-analyses"],
  [/metaanalys/gi, "meta-analysis"],
  [/kognitiv belastningsteori/gi, "cognitive load theory"],
  [/inneboende belastning/gi, "intrinsic cognitive load"],
  [/extern belastning/gi, "extraneous cognitive load"],
  [/kognitiv belastning/gi, "cognitive load"],
  [/kontroller av förståelse/gi, "checks for understanding"],
  [/kontroll av förståelse/gi, "check for understanding"],
  [/övningar i minnesåterkallning/gi, "retrieval practice"],
  [/minnesåterkallning/gi, "retrieval practice"],
  [/utspridd övning/gi, "spacing"],
  [/blandad övning/gi, "interleaving"],
  [/genomarbetade exempel/gi, "worked examples"],
  [/genomarbetat exempel/gi, "worked example"],
  [/stödstrukturer/gi, "scaffolding"],
  [/lagringsstyrka/gi, "storage strength"],
  [/framplockningsstyrka/gi, "retrieval strength"],
  [/intensivpluggande/gi, "cramming"],
  [/multimedialt material/gi, "multimedia"],
  [/multimedialt lärande/gi, "multimedia learning"],
  [/signalering/gi, "signaling"],
  [/modellering/gi, "modeling"],
  [/förkunskaper/gi, "prior knowledge"],
  [/scheman/gi, "schemas"],
  [/schema/gi, "schema"],
  [/gränsvillkor/gi, "boundary conditions"],
  [/återkoppling/gi, "feedback"],
  [/implementering/gi, "implementation"],
];

function annotateEveryOccurrence(html) {
  let cleanHtml = html
    .replace(/\s*\(<em>[^<]+<\/em>\)/g, "")
    .replace(/<p class="term-note">[\s\S]*?<\/p>/g, "");

  for (const [swedishPattern, englishTerm] of everyOccurrenceTerms) {
    cleanHtml = cleanHtml.replace(
      swedishPattern,
      (swedishTerm) => `${swedishTerm} (<em>${englishTerm}</em>)`,
    );
  }

  return cleanHtml;
}

for (const chapter of data.chapters) {
  chapter.contentHtml = annotateEveryOccurrence(chapter.contentHtml);
  chapter.summary = annotateEveryOccurrence(chapter.summary);
}

const teacherExampleChapter = data.chapters.find((chapter) => chapter.number === 11);
if (teacherExampleChapter) {
  teacherExampleChapter.contentHtml = teacherExampleChapter.contentHtml.replace(
    /<h2>Ämnesspår<\/h2><ul>[\s\S]*?<\/ul>/,
    `<h2>Ämnen i exempelbanken</h2>
<p>NO och SO är uppdelade i sina ingående skolämnen. Banken omfattar svenska, matematik, engelska, biologi, fysik, kemi, historia, samhällskunskap, geografi och religionskunskap.</p>`,
  );

  if (!teacherExampleChapter.contentHtml.includes('id="teacher-example-bank"')) {
    teacherExampleChapter.contentHtml += `
<h2>Exempelbank för din undervisning</h2>
<p>Välj ett eller flera ämnen och ett eller flera stadier. Du kan därför göra ett kombinerat urval om du undervisar i två ämnen eller flera kurser. Varje exempel anger ett konkret lärarproblem, lektionssteg, kontroll av förståelse (<em>check for understanding</em>), nästa undervisningsbeslut, fördröjd kontroll, kopplingar till kapitel 1–10 och en kontrollerad koppling till Skolverkets styrdokument.</p>
<p>Exemplen för F–3, 4–6 och 7–9 är placerade mot Lgr22. För F–3 redovisas förskoleklassens ämnesövergripande del 3 separat från ämnenas centrala innehåll för årskurs 1–3. Gymnasieexemplen är placerade mot aktuella ämnesnivåer i Gy25 och visar även nivåkod. Kopplingen visar vilket centralt innehåll exemplet kan användas för; den ersätter inte lärarens planering av ämnets hela centrala innehåll.</p>
<div id="teacher-example-bank" class="teacher-example-bank" aria-live="polite">
  <p>Exempelbanken laddas …</p>
</div>`;
  }

  teacherExampleChapter.contentHtml = teacherExampleChapter.contentHtml.replace(
    "Välj ett eller flera ämnen och ett eller flera stadier. Du kan därför göra ett gemensamt urval även om du undervisar i två ämnen eller flera kurser. Inom ämnesgruppen och stadiumgruppen kan flera alternativ kombineras.",
    "Välj ett eller flera ämnen och ett eller flera stadier. Du kan därför göra ett kombinerat urval om du undervisar i två ämnen eller flera kurser. Varje exempel anger ett konkret lärarproblem, lektionssteg, kontroll av förståelse (<em>check for understanding</em>), nästa undervisningsbeslut, fördröjd kontroll, kopplingar till kapitel 1–10 och en kontrollerad koppling till Skolverkets styrdokument. Exemplen för F–3, 4–6 och 7–9 är placerade mot Lgr22. För F–3 redovisas förskoleklassens ämnesövergripande del 3 separat från ämnenas centrala innehåll för årskurs 1–3. Gymnasieexemplen är placerade mot aktuella ämnesnivåer i Gy25 och visar även nivåkod. Kopplingen visar vilket centralt innehåll exemplet kan användas för; den ersätter inte lärarens planering av ämnets hela centrala innehåll.",
  );

  teacherExampleChapter.contentHtml = teacherExampleChapter.contentHtml.replace(
    "<p>Exemplen för F–3, 4–6 och 7–9 är placerade mot Lgr22. Gymnasieexemplen är placerade mot aktuella ämnesnivåer i Gy25 och visar även nivåkod. Kopplingen visar vilket centralt innehåll exemplet kan användas för; den ersätter inte lärarens planering av ämnets hela centrala innehåll.</p>",
    "<p>Exemplen för F–3, 4–6 och 7–9 är placerade mot Lgr22. För F–3 redovisas förskoleklassens ämnesövergripande del 3 separat från ämnenas centrala innehåll för årskurs 1–3. Gymnasieexemplen är placerade mot aktuella ämnesnivåer i Gy25 och visar även nivåkod. Kopplingen visar vilket centralt innehåll exemplet kan användas för; den ersätter inte lärarens planering av ämnets hela centrala innehåll.</p>",
  );

  teacherExampleChapter.contentHtml = teacherExampleChapter.contentHtml.replace(
    "<p>Välj ett eller flera ämnen och ett eller flera stadier. Du kan därför göra ett kombinerat urval om du undervisar i två ämnen eller flera kurser. Varje exempel anger ett konkret lärarproblem, lektionssteg, kontroll av förståelse (<em>check for understanding</em>), nästa undervisningsbeslut, fördröjd kontroll och kopplingar till kapitel 1–10.</p>",
    "<p>Välj ett eller flera ämnen och ett eller flera stadier. Du kan därför göra ett kombinerat urval om du undervisar i två ämnen eller flera kurser. Varje exempel anger ett konkret lärarproblem, lektionssteg, kontroll av förståelse (<em>check for understanding</em>), nästa undervisningsbeslut, fördröjd kontroll, kopplingar till kapitel 1–10 och en kontrollerad koppling till Skolverkets styrdokument.</p><p>Exemplen för F–3, 4–6 och 7–9 är placerade mot Lgr22. För F–3 redovisas förskoleklassens ämnesövergripande del 3 separat från ämnenas centrala innehåll för årskurs 1–3. Gymnasieexemplen är placerade mot aktuella ämnesnivåer i Gy25 och visar även nivåkod. Kopplingen visar vilket centralt innehåll exemplet kan användas för; den ersätter inte lärarens planering av ämnets hela centrala innehåll.</p>",
  );
}

fs.writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`);
console.log("Kapitel 1–10 har fördjupats.");
