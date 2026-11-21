function mat(rows) {
  let tds = rows.map(r => "<tr>" + r.map(c => "<td>" + c + "</td>").join("") + "</tr>").join("");
  return '<span class="mat"><table>' + tds + "</table></span>";
}
function vec(v) {
  return '<span class="vec-inline">(&nbsp;' + v.join("&nbsp;") + "&nbsp;)<sup>T</sup></span>";
}
function why(s) { return '<div class="why"><strong>Varför i FEM?</strong> ' + s + "</div>"; }
function exmp(title, html) { return '<div class="example-box"><strong>' + title + "</strong>" + html + "</div>"; }
function tips(s) { return '<div class="tip-box">💡 <strong>Tänk så här:</strong> ' + s + "</div>"; }
function mistake(s) { return '<div class="mistake-box">⚠️ <strong>Vanligt misstag:</strong> ' + s + "</div>"; }

const MODULES = [
{
  id: "m0",
  title: "0. Från allra grunden: punkter, pilar och koordinater",
  intro: "Här börjar vi från början – innan vektorer och matriser finns. Inga förkunskaper behövs.",
  sections: [
    {
      title: "0.1 Tal på en linje – och punkter i ett plan",
      img: "koordinater",
      html: "<p>Ett tal kan du tänka dig på en <strong>talinje</strong>: 0 i mitten, positiva tal åt höger, negativa åt vänster. För att beskriva en punkt i ett <strong>plan</strong> behövs <em>två</em> tal: ett för hur långt åt höger (x) och ett för hur långt upp (y). Punkten skrivs (x, y) – t.ex. (3, 4) = 3 steg åt höger och 4 steg upp från origo (0, 0).</p>" + tips("Koordinatsystemet är bara ett rutnät. (3, 4) betyder bokstavligen: gå 3 åt höger, sedan 4 upp.") + why("I FEM beskriver varje nod i strukturen en punkt (x, y) – hela geometrin byggs av koordinater."),
      exercises: [
        { id: "m0e1", type: "mc", title: "Övning 0.1", prompt: "Åt vilket håll pekar negativa x-värden i ett koordinatsystem?", options: ["Åt höger", "Åt vänster", "Uppåt", "Nedåt"], answer: 1, hint: "Titta på bilden: vilken sida om origo är minus?", solution: "Åt <strong>vänster</strong> – positiva x går åt höger, negativa åt vänster." },
        { id: "m0e2", type: "num", title: "Övning 0.2", prompt: "Vilket x-värde har punkten (5, 2)?", answer: 5, hint: "(x, y) – första talet är x.", solution: "x = <strong>5</strong>." },
        { id: "m0e3", type: "num", title: "Övning 0.3", prompt: "Vilket y-värde har punkten (−1, 7)?", answer: 7, hint: "Andra talet är y.", solution: "y = <strong>7</strong>." }
      ]
    },
    {
      title: "0.2 En pil från origo – det är en vektor",
      img: "vektor",
      html: "<p>Nu drar vi en pil från origo (0,0) till punkten (3, 2). Pilen beskriver <em>både riktning och längd</em> – och den kallas en <strong>vektor</strong>. Vi skriver vektorn som en lista med talen: v = (3, 2).</p><p>En vektor är alltså inte en punkt, utan en <strong>förflyttning</strong>: ”gå dit pilen pekar”.</p>" + tips("Tänk på en vektor som en promenad: (3, 2) = gå 3 steg österut och 2 steg norrut. Slutpunkten beror på var du började – men själva stegen är alltid samma.") + why("Förskjutningen av varje nod i en FEM-struktur är en vektor – det är bokens u."),
      exercises: [
        { id: "m0e4", type: "mc", title: "Övning 0.4", prompt: "Vektorn (2, 3) betyder: gå…", options: ["2 upp, 3 höger", "2 höger, 3 upp", "3 höger, 2 upp", "2 vänster, 3 upp"], answer: 1, hint: "(x, y): först åt höger (x), sedan upp (y).", solution: "<strong>2 steg åt höger, 3 steg upp</strong>." },
        { id: "m0e5", type: "vec", title: "Övning 0.5", prompt: "Skriv vektorn för pilen som går 5 steg åt höger och 1 steg upp. Svara som (x, y)-tal, t.ex. <em>1, 2</em>.", answer: [5,1], hint: "x = höger, y = upp.", solution: "<strong>(5, 1)</strong>." }
      ]
    },
    {
      title: "0.3 Hur lång är pilen? – Pythagoras",
      img: "pythagoras",
      html: "<p>Pilens längd får du med <strong>Pythagoras sats</strong>: gå först 3 steg åt sidan, sedan 4 rakt upp – då bildas en rätvinklig triangel där pilen är hypotenusan. 3² + 4² = 9 + 16 = 25, så längden är √25 = 5.</p><p>I allmänhet: om v = (v₁, v₂) är längden ||v|| = √(v₁² + v₂²). Detta kallas vektorns <strong>norm</strong> (||v|| läser du ”dubbelstreck v”).</p>" + tips("Normen är bara avståndet från origo till pilspetsen – precis som avståndet mellan två punkter med linjal.") + mistake("Glöm inte kvadraten! ||(3,4)|| är √25 = 5, inte 3+4 = 7."),
      exercises: [
        { id: "m0e6", type: "num", title: "Övning 0.6", prompt: "Beräkna längden av vektorn (3, 4) (dvs. ||(3,4)||).", answer: 5, hint: "3² + 4² = 25, och √25 = ?", solution: "||(3,4)|| = √(9+16) = √25 = <strong>5</strong>." },
        { id: "m0e7", type: "num", title: "Övning 0.7", prompt: "Beräkna ||(6, 8)||.", answer: 10, hint: "6² + 8² = 36 + 64 = 100.", solution: "√(36+64) = √100 = <strong>10</strong>." }
      ]
    }
  ]
},
{
  id: "m1",
  title: "1. Vektorer i flera dimensioner",
  intro: "Nu vet vi vad en vektor är i planet. Samma idé fungerar med 3 tal (i rummet) – eller 100 tal (i FEM!).",
  sections: [
    {
      title: "1.1 Vektorer med 2, 3 eller många komponenter",
      html: "<p>En vektor i planet har 2 tal: (x, y). I rummet har den 3 tal: (x, y, z). I FEM har förskjutningsvektorn u ett tal <em>per nod</em> – kanske hundratals. Skrivet som kolumn: " + vec(["u₁","u₂","u₃"]) + " (bokens notation: u = (u₁, u₂, u₃)<sup>T</sup>, där <sup>T</sup> = transponat). Antalet tal = vektorns <strong>dimension</strong>.</p>" + tips("Tänk dig en varukorg: (ägg, mjöl, mjölk) är också en vektor – tre ”ingredienser” i bestämd ordning. Ordningen är viktig: (1, 2) ≠ (2, 1).") + why("u = alla nodförskjutningar i strukturen, en komponent per frihetsgrad."),
      exercises: [
        { id: "m1e1", type: "mc", title: "Övning 1.1 – Dimension", prompt: "Vilken dimension har vektorn " + vec([1,2,3,4]) + "?", options: ["2", "3", "4", "5"], answer: 2, hint: "Räkna talen i listan.", solution: "Fyra tal → dimension <strong>4</strong>." },
        { id: "m1e2", type: "mc", title: "Övning 1.2 – Ordning", prompt: "Är (1, 2) samma vektor som (2, 1)?", options: ["Ja", "Nej"], answer: 1, hint: "Tänk på promenaden: 1 höger + 2 upp vs 2 höger + 1 upp.", solution: "<strong>Nej</strong> – komponenternas ordning spelar roll." }
      ]
    },
    {
      title: "1.2 Räkna med vektorer: addition och skalning",
      img: "addition",
      html: "<p>Två vektorer adderas genom att lägga ihop talen <strong>parvis</strong>: " + vec(["a₁","a₂"]) + " + " + vec(["b₁","b₂"]) + " = " + vec(["a₁+b₁","a₂+b₂"]) + ". Geometriskt: lägg pilen b i spetsen på pilen a – summan är pilen från start till slut (parallelogramregeln).</p><p>Skalning: c·" + vec(["a₁","a₂"]) + " = " + vec(["c·a₁","c·a₂"]) + " – pilen blir c gånger så lång, samma riktning.</p>" + tips("Addition = ”gör båda promenaderna efter varandra”. Skalning 2·v = ”gå samma promenad två gånger”.") + mistake("Du kan inte addera vektorer med olika dimension! (1,2) + (1,2,3) går inte."),
      exercises: [
        { id: "m1e3", type: "vec", title: "Övning 1.3 – Addition", prompt: "Beräkna " + vec([1,2,3]) + " + " + vec([4,"−1",2]) + ". Svara t.ex. <em>1, 2, 3</em>.", answer: [5,1,5], hint: "Parvis: 1+4, 2+(−1), 3+2.", solution: "<strong>(5, 1, 5)</strong>." },
        { id: "m1e4", type: "vec", title: "Övning 1.4 – Skalning", prompt: "Beräkna 3·" + vec([2,"−1",4]) + ".", answer: [6,-3,12], hint: "Varje tal × 3.", solution: "<strong>(6, −3, 12)</strong>." },
        { id: "m1e5", type: "vec", title: "Övning 1.5 – Subtraktion", prompt: "Beräkna " + vec([5,3]) + " − " + vec([2,4]) + ".", answer: [3,-1], hint: "Parvis: 5−2, 3−4.", solution: "<strong>(3, −1)</strong>." }
      ]
    },
    {
      title: "1.3 Normen – vektorns längd",
      html: "<p>Normen ||v|| = √(v₁² + v₂² + … + vₙ²) är pilens längd (Pythagoras i flera dimensioner).</p>" + exmp("Exempel från föreläsningen", "<p>||" + vec([1,2,0]) + "|| = √(1² + 2² + 0²) = √5 ≈ <strong>2,236</strong>.</p>") + tips("Normen svarar på frågan ”hur lång är pilen?” – oavsett riktning.") + why("||u|| kan t.ex. säga hur stor deformationen är totalt i strukturen."),
      exercises: [
        { id: "m1e6", type: "num", title: "Övning 1.6", prompt: "Beräkna ||" + vec([3,4]) + "||.", answer: 5, hint: "Se avsnitt 0.3!", solution: "<strong>5</strong>." },
        { id: "m1e7", type: "num", title: "Övning 1.7", prompt: "Beräkna ||" + vec([1,"−2",2]) + "||.", answer: 3, hint: "1 + 4 + 4 = 9 → √9.", solution: "<strong>3</strong>." },
        { id: "m1e8", type: "num", title: "Övning 1.8", prompt: "Beräkna ||" + vec([2,3,6]) + "||.", answer: 7, hint: "4 + 9 + 36 = 49 → √49.", solution: "<strong>7</strong>." }
      ]
    }
  ]
},
{
  id: "m2",
  title: "2. Skalärprodukt och vinkel mellan vektorer",
  intro: "Skalärprodukten är ett sätt att multiplicera två vektorer – resultatet blir ett enda tal som säger hur lika riktning de har.",
  sections: [
    {
      title: "2.1 Skalärprodukten v·w – ett tal",
      img: "skalar",
      html: "<p>v·w = v₁w₁ + v₂w₂ + … + vₙwₙ. Multiplicera parvis och summera. (Skrivs också v<sup>T</sup>w.) Vektorerna måste ha samma dimension.</p>" + tips("Tänk ”hur mycket pekar de åt samma håll?”: två pilar i samma riktning ger stort positivt tal, motsatta riktningar ger negativt, vinkelräta ger 0.") + why("Skalärprodukter bygger upp kvadratiska former som töjningsenergin U = ½ u<sup>T</sup>Ku."),
      exercises: [
        { id: "m2e1", type: "num", title: "Övning 2.1", prompt: "Beräkna " + vec([1,2]) + " · " + vec([3,4]) + ".", answer: 11, hint: "1·3 + 2·4.", solution: "3 + 8 = <strong>11</strong>." },
        { id: "m2e2", type: "num", title: "Övning 2.2", prompt: "Beräkna " + vec([2,0,1]) + " · " + vec([1,3,2]) + ".", answer: 4, hint: "2·1 + 0·3 + 1·2.", solution: "2 + 0 + 2 = <strong>4</strong>." },
        { id: "m2e3", type: "num", title: "Övning 2.3", prompt: "Beräkna " + vec([1,"−1"]) + " · " + vec([1,1]) + ".", answer: 0, hint: "1·1 + (−1)·1.", solution: "1 − 1 = <strong>0</strong> → vektorerna är ortogonala!" }
      ]
    },
    {
      title: "2.2 Vinkeln θ mellan två vektorer",
      html: "<p>cos θ = (v·w) / (||v||·||w||), dvs. θ = arccos( (v·w)/(||v||·||w||) ). Om v·w = 0 är vektorerna <strong>ortogonala</strong> (θ = 90°).</p>" + exmp("Genomgånget exempel", "<p>Vinkeln mellan " + vec([1,0]) + " och " + vec([1,1]) + ": v·w = 1, ||v|| = 1, ||w|| = √2 → cos θ = 1/√2 → θ = <strong>45°</strong>.</p>") + tips("Om skalärprodukten är positiv pekar de åt ”samma håll” (θ < 90°), negativ = ”åt olika håll” (θ > 90°).") + why("Ortogonala riktningar kan behandlas oberoende – praktiskt när FEM-problem delas upp."),
      exercises: [
        { id: "m2e4", type: "num", title: "Övning 2.4 – Vinkel", prompt: "Vinkeln (i grader) mellan " + vec([1,0]) + " och " + vec([0,1]) + "?", answer: 90, hint: "cos θ = 0/(1·1) = 0.", solution: "θ = <strong>90°</strong>." },
        { id: "m2e5", type: "num", title: "Övning 2.5 – Vinkel 3D", prompt: "Vinkeln (i grader) mellan " + vec([1,1,1]) + " och " + vec([1,"−1",0]) + "?", answer: 90, hint: "v·w = 1 − 1 + 0 = 0.", solution: "θ = <strong>90°</strong>." },
        { id: "m2e6", type: "mc", title: "Övning 2.6 – Ortogonalitet", prompt: "Är " + vec([1,2]) + " och " + vec([2,"−1"]) + " ortogonala?", options: ["Ja", "Nej"], answer: 0, hint: "Räkna v·w.", solution: "(1,2)·(2,−1) = 2−2 = 0 → <strong>Ja</strong>." },
        { id: "m2e7", type: "num", title: "Övning 2.7 – Vinkel 45°", prompt: "Vinkeln (i grader) mellan " + vec([1,0]) + " och " + vec([1,1]) + "?", answer: 45, hint: "cos θ = 1/√2.", solution: "θ = <strong>45°</strong>." }
      ]
    }
  ]
},
{
  id: "m3",
  title: "3. Kryssprodukt (bara i 3D)",
  intro: "Kryssprodukten tar två vektorer i rummet och ger en tredje vektor som är vinkelrät mot båda.",
  sections: [
    {
      title: "3.1 Vad är kryssprodukten?",
      img: "kryss",
      html: "<p>" + vec(["a₁","a₂","a₃"]) + " × " + vec(["b₁","b₂","b₃"]) + " = " + vec(["a₂b₃ − a₃b₂","a₃b₁ − a₁b₃","a₁b₂ − a₂b₁"]) + ". Riktningen fås med <strong>högerhandsregeln</strong>: peka fingrarna längs a, sväng mot b – tummen visar a × b.</p>" + exmp("Exempel", vec([1,0,0]) + " × " + vec([0,1,0]) + " = " + vec([0,0,1]) + " – z-axeln uppåt.)") + tips("Kryssa x-axeln med y-axeln = z-axeln. Kom ihåg: x × y = z.") + why("Ger riktningar/normaler till ytor i 2D/3D-element."),
      exercises: [
        { id: "m3e1", type: "vec", title: "Övning 3.1", prompt: "Beräkna " + vec([1,0,0]) + " × " + vec([0,1,0]) + ".", answer: [0,0,1], hint: "x × y = z.", solution: "<strong>(0, 0, 1)</strong>." },
        { id: "m3e2", type: "vec", title: "Övning 3.2", prompt: "Beräkna " + vec([1,2,3]) + " × " + vec([4,5,6]) + ".", answer: [-3,6,-3], hint: "2·6−3·5 = −3; 3·4−1·6 = 6; 1·5−2·4 = −3.", solution: "<strong>(−3, 6, −3)</strong>." },
        { id: "m3e3", type: "mc", title: "Övning 3.3", prompt: "Vad blir a × a?", options: ["a", "0-vektorn", "−a"], answer: 1, hint: "En vektor är parallell med sig själv.", solution: "a × a = <strong>0-vektorn</strong>." }
      ]
    },
    {
      title: "3.2 Arean av parallellogrammet",
      html: "<p>||a × b|| = arean som a och b spänner upp. Dessutom: a × b = −(b × a).</p>" + tips("Kryssproduktens längd = area – inte vinkel. Skalärproduktens längd handlar om vinkeln.") + why("Elementareor i 2D/3D-mesh beräknas med kryssprodukter."),
      exercises: [
        { id: "m3e4", type: "num", title: "Övning 3.4 – Area", prompt: "Arean av parallellogrammet som " + vec([2,0,0]) + " och " + vec([0,3,0]) + " spänner upp?", answer: 6, hint: "||(2,0,0) × (0,3,0)|| = ||(0,0,6)||.", solution: "Arean = <strong>6</strong>." }
      ]
    }
  ]
},
{
  id: "m4",
  title: "4. Matriser: tabeller av tal",
  intro: "En matris är bara en rektangulär tabell av tal – ett rutnät. I FEM är styvhetsmatrisen K hela metodens hjärta.",
  sections: [
    {
      title: "4.1 Uppbyggnad: rader, kolumner, element",
      img: "matris",
      html: "<p>En matris med m rader och n kolumner har element aᵢⱼ i rad i, kolumn j. Storleken kallas <strong>dimension</strong> m × n. Exempel: " + mat([[1,2,3],[4,5,6]]) + " är 2 × 3.</p>" + tips("Tänk Excel-rutnät: varje ruta har ett namn aᵢⱼ (rad först, kolumn sen).") + why("K är n×n där n = antalet frihetsgrader (noder × riktningar)."),
      exercises: [
        { id: "m4e1", type: "mc", title: "Övning 4.1 – Dimension", prompt: "Dimensionen på A = " + mat([[1,2,3,4],[5,6,7,8],[9,10,11,12]]) + "?", options: ["2 × 4", "3 × 4", "4 × 3", "3 × 3"], answer: 1, hint: "Rader × kolumner.", solution: "<strong>3 × 4</strong>." },
        { id: "m4e2", type: "mc", title: "Övning 4.2 – Element", prompt: "Vilket är a₂₃ i " + mat([[1,2,3],[4,5,6],[7,8,9]]) + "?", options: ["5", "6", "8"], answer: 2, hint: "Rad 2, kolumn 3.", solution: "<strong>6</strong>." }
      ]
    },
    {
      title: "4.2 Transponat Aᵀ – byt rader och kolumner",
      img: "transponat",
      html: "<p>A<sup>T</sup> fås genom att spegla matrisen i diagonalen: rad 1 blir kolumn 1 osv. " + mat([[1,2,3],[4,5,6]]) + "<sup>T</sup> = " + mat([[1,4],[2,5],[3,6]]) + ".</p>" + tips("En 2×3-matris transponeras till 3×2. Diagonalen ligger kvar.") + mistake("Transponat är INTE samma som minus eller invers – det är bara en spegling!") + why("Kraftvektorn f = K·u; energin skrivs u<sup>T</sup>Ku – transponatet är överallt i FEM."),
      exercises: [
        { id: "m4e3", type: "mat", title: "Övning 4.3 – Transponat", prompt: "Beräkna A<sup>T</sup> för A = " + mat([[1,2,3],[4,5,6]]) + ". Fyll i raderna uppifrån.", answer: [[1,4],[2,5],[3,6]], hint: "Rad 1 (1,2,3) blir kolumn 1.", solution: "A<sup>T</sup> = " + mat([[1,4],[2,5],[3,6]]) + "." },
        { id: "m4e4", type: "mat", title: "Övning 4.4 – Transponera igen", prompt: "Beräkna (A<sup>T</sup>)<sup>T</sup> för samma A. (Tips: vad händer när man transponerar två gånger?)", answer: [[1,2,3],[4,5,6]], hint: "Dubbeltransponat ger tillbaka originalet.", solution: "(A<sup>T</sup>)<sup>T</sup> = <strong>A</strong> = " + mat([[1,2,3],[4,5,6]]) + "." }
      ]
    },
    {
      title: "4.3 Speciella matriser",
      html: "<p><strong>Symmetrisk:</strong> A = A<sup>T</sup> (spegla i diagonalen ger samma). " + mat([[2,1],[1,3]]) + " är symmetrisk.</p><p><strong>Diagonalmatris:</strong> noll överallt utom huvuddiagonalen. <strong>Enhetsmatris I:</strong> ettor på diagonalen, noll annars: " + mat([[1,0],[0,1]]) + ". I är matriserna svaret på 1 är för talen: A·I = A.</p>" + why("Styvhetsmatrisen K är alltid symmetrisk – det halverar minnet och gör lösningen snabbare.") + tips("En symmetrisk matris är som en spegel: samma på båda sidor om diagonalen."),
      exercises: [
        { id: "m4e5", type: "mc", title: "Övning 4.5 – Symmetri", prompt: "Är A = " + mat([[2,1],[1,3]]) + " symmetrisk?", options: ["Ja, A = Aᵀ", "Nej"], answer: 0, hint: "Jämför med Aᵀ.", solution: "Aᵀ = A → <strong>Ja</strong>." },
        { id: "m4e6", type: "mat", title: "Övning 4.6 – A + Aᵀ", prompt: "Beräkna A + A<sup>T</sup> för A = " + mat([[0,1],[2,0]]) + ".", answer: [[0,3],[3,0]], hint: "Aᵀ = [[0,2],[1,0]]; addera parvis.", solution: "A + Aᵀ = " + mat([[0,3],[3,0]]) + " – alltid symmetrisk!" },
        { id: "m4e7", type: "mc", title: "Övning 4.7 – Enhetsmatrisen", prompt: "Vad blir A·I för vilken matris A som helst?", options: ["0-matrisen", "A", "I", "Aᵀ"], answer: 1, hint: "I är ”ettan” bland matriser.", solution: "A·I = <strong>A</strong>." }
      ]
    }
  ]
},
{
  id: "m5",
  title: "5. Räkna med matriser",
  intro: "Nu lär vi oss de fyra räknesätten för matriser. Kom ihåg: multiplikation är INTE som vanliga tal – ordningen spelar roll!",
  sections: [
    {
      title: "5.1 Addition och skalning (enkelt)",
      html: "<p>Addition och skalning sker precis som för vektorer – <strong>parvis, ruta för ruta</strong>: (A+B)ᵢⱼ = aᵢⱼ + bᵢⱼ, (cA)ᵢⱼ = c·aᵢⱼ. Matriserna måste ha samma dimension.</p>" + tips("Som att addera två kalkylblad cell för cell.") + mistake("(1,2) + (3,4)-matriser av olika storlek går inte – kontrollera dimensionerna först!"),
      exercises: [
        { id: "m5e1", type: "mat", title: "Övning 5.1", prompt: "A = " + mat([[1,2],[3,4]]) + ", B = " + mat([[0,1],[1,0]]) + ". Beräkna A + B.", answer: [[1,3],[4,4]], hint: "Ruta för ruta.", solution: "A + B = " + mat([[1,3],[4,4]]) + "." },
        { id: "m5e2", type: "mat", title: "Övning 5.2", prompt: "Beräkna 2·A för A = " + mat([[1,2],[3,4]]) + ".", answer: [[2,4],[6,8]], hint: "Varje ruta × 2.", solution: "2A = " + mat([[2,4],[6,8]]) + "." }
      ]
    },
    {
      title: "5.2 Matris × vektor = vektor",
      img: "matvec",
      html: "<p>Varje <strong>rad</strong> i matrisen punktas (skalärprodukt) med vektorn: rad i · v = resultatets komponent i. A = " + mat([["a₁₁","a₁₂"],["a₂₁","a₂₂"]]) + ", v = " + vec(["x₁","x₂"]) + " ger Av = " + vec(["a₁₁x₁+a₁₂x₂","a₂₁x₁+a₂₂x₂"]) + ".</p>" + exmp("Exempel", "<p>A = " + mat([[1,2],[3,4]]) + ", v = " + vec([1,1]) + ": rad 1 ger 1+2 = 3, rad 2 ger 3+4 = 7 → Av = " + vec([3,7]) + ".</p>") + why("Detta ÄR kraftberäkningen i FEM: K·u = f.") + mistake("Antalet kolumner i A måste vara lika med vektorns längd – annars går det inte ihop."),
      exercises: [
        { id: "m5e3", type: "vec", title: "Övning 5.3", prompt: "A·v för A = " + mat([[1,2],[3,4]]) + ", v = " + vec([1,1]) + ".", answer: [3,7], hint: "Rad1·v = 3, rad2·v = 7.", solution: "Av = <strong>(3, 7)</strong>." },
        { id: "m5e4", type: "vec", title: "Övning 5.4", prompt: "A·v för A = " + mat([[2,0],[1,3]]) + ", v = " + vec([2,1]) + ".", answer: [4,5], hint: "Rad1: 2·2+0·1 = 4. Rad2: 1·2+3·1 = 5.", solution: "Av = <strong>(4, 5)</strong>." }
      ]
    },
    {
      title: "5.3 Matris × matris – och varför AB ≠ BA",
      img: "matmat",
      html: "<p>(AB)ᵢⱼ = <strong>rad i i A · kolumn j i B</strong> (skalärprodukt). Kolumnerna i B måste vara lika många som raderna i A. <strong>Ordningen spelar roll: AB ≠ BA!</strong></p>" + tips("Tänk: AB betyder ”först B, sedan A” (som funktioner). Byt du ordning blir det ett annat resultat.") + mistake("AB och BA är olika – kontrollera alltid vilken ordning uppgiften vill ha!"),
      exercises: [
        { id: "m5e5", type: "mat", title: "Övning 5.5 – AB", prompt: "A = " + mat([[1,2],[3,4]]) + ", B = " + mat([[1,0],[0,2]]) + ". Beräkna A·B.", answer: [[1,4],[3,8]], hint: "(AB)₁₂ = rad1(A)·kol2(B) = 1·0+2·2 = 4.", solution: "AB = " + mat([[1,4],[3,8]]) + "." },
        { id: "m5e6", type: "mat", title: "Övning 5.6 – BA (annan ordning!)", prompt: "Samma A, B. Beräkna B·A.", answer: [[1,2],[6,8]], hint: "Nu rader i B · kolumner i A.", solution: "BA = " + mat([[1,2],[6,8]]) + " ≠ AB ✓ (icke-kommutativt)." }
      ]
    }
  ]
},
{
  id: "m6",
  title: "6. Determinant och invers",
  intro: "Determinanten är ett enda tal som beräknas ur en kvadratisk matris – och som avslöjar om matrisen går att invertera.",
  sections: [
    {
      title: "6.1 Determinant för 2×2",
      img: "det",
      html: "<p>det " + mat([["a","b"],["c","d"]]) + " = <strong>ad − bc</strong> (huvuddiagonalen minus andra diagonalen). Om det A = 0 är A <strong>singulär</strong> – då finns ingen invers.</p>" + tips("Kom ihåg: neråt-höger (a·d) minus neråt-vänster (b·c).") + why("Elementstyvhetsmatrisen har alltid det = 0 – randvillkoren gör K inverterbar först.") + mistake("det(2A) är INTE 2·det(A) för 2×2 – det blir 4·det(A)! (Faktor c från varje rad.)"),
      exercises: [
        { id: "m6e1", type: "num", title: "Övning 6.1", prompt: "det " + mat([[3,1],[2,4]]) + " = ?", answer: 10, hint: "3·4 − 1·2.", solution: "12 − 2 = <strong>10</strong>." },
        { id: "m6e2", type: "mc", title: "Övning 6.2 – Singulär?", prompt: "Är A = " + mat([[1,2],[2,4]]) + " inverterbar?", options: ["Ja", "Nej, det A = 0"], answer: 1, hint: "1·4 − 2·2 = ?", solution: "det = 0 → <strong>Nej</strong>." },
        { id: "m6e3", type: "num", title: "Övning 6.3", prompt: "det " + mat([[5,"−2"],[3,1]]) + " = ?", answer: 11, hint: "5·1 − (−2)·3 = 5 + 6.", solution: "<strong>11</strong>." }
      ]
    },
    {
      title: "6.2 Determinant för 3×3 (Sarrus regel)",
      html: "<p>det " + mat([["a","b","c"],["d","e","f"],["g","h","i"]]) + " = <strong>aei + bfg + cdh − ceg − bdi − afh</strong>. Tre diagonaler neråt (plus) minus tre uppåt (minus).</p>" + tips("Skriv de två första kolumnerna igen till höger och rita pilar: ↘↘↘ plus, ↙↙↙ minus."),
      exercises: [
        { id: "m6e4", type: "num", title: "Övning 6.4 – det 3×3", prompt: "det " + mat([[1,0,2],[0,1,0],[2,0,1]]) + " = ?", answer: -3, hint: "Utveckla längs rad 2 (innehåller två nollor): det = 1·det[[1,2],[2,1]] = 1−4.", solution: "<strong>−3</strong> ≠ 0 → inverterbar." }
      ]
    },
    {
      title: "6.3 Inversen A⁻¹",
      img: "invers",
      html: "<p>För 2×2: A⁻¹ = (1/det A)·" + mat([["d","−b"],["−c","a"]]) + ". Alltid gäller <strong>A·A⁻¹ = I</strong> (enhetsmatrisen).</p>" + exmp("Genomgånget exempel", "<p>A = " + mat([[4,2],[1,3]]) + ": det = 10 → A⁻¹ = (1/10)·" + mat([[3,"−2"],["−1",4]]) + " = " + mat([[0.3,"−0.2"],["−0.1",0.4]]) + ". Kontroll: A·A⁻¹ = I ✓</p>") + tips("Inversen är matrisernas svar på ”1 delat med”: A⁻¹ är det tal som ger I när du multiplicerar.") + mistake("Glöm inte att dela med determinanten – och byt tecken på b och c!"),
      exercises: [
        { id: "m6e5", type: "mat", title: "Övning 6.5 – Invers", prompt: "Beräkna A⁻¹ för A = " + mat([[4,2],[1,3]]) + " (decimaltal, t.ex. 0.3).", answer: [[0.3,-0.2],[-0.1,0.4]], tol: 0.001, hint: "det = 10; byt a↔d, byt tecken på b,c; dela med 10.", solution: "A⁻¹ = " + mat([[0.3,"−0.2"],["−0.1",0.4]]) + "." },
        { id: "m6e6", type: "mc", title: "Övning 6.6 – Kontroll", prompt: "Vad ska (A·A⁻¹)₁₁ bli?", options: ["0", "1", "det A"], answer: 1, hint: "A·A⁻¹ = I, och I₁₁ = 1.", solution: "<strong>1</strong> (enhetsmatrisen)." }
      ]
    }
  ]
},
{
  id: "m7",
  title: "7. Ekvationssystem: Ax = b",
  intro: "Nu sätter vi ihop allt: ett ekvationssystem skrivs kompakt som Ax = b, och löses antingen med inversen eller med Gauss-eliminering.",
  sections: [
    {
      title: "7.1 Från ekvationer till matrisform",
      img: "axb",
      html: "<p>Systemet { 2x₁ + x₂ = 5; x₁ + 3x₂ = 10 } skrivs A·x = b med A = " + mat([[2,1],[1,3]]) + ", x = " + vec(["x₁","x₂"]) + ", b = " + vec([5,10]) + ". Varje ekvation = en rad i A.</p>" + tips("Läs det som: ”matrisen A vrider/stretchar x så att resultatet blir b”.") + why("Hela FEM: K·u = f – styvhetsmatrisen, förskjutningarna, krafterna. Samma form!"),
      exercises: [
        { id: "m7e1", type: "mc", title: "Övning 7.1", prompt: "Vilken matris A hör till ekvationerna 3x + 2y = 7, x + 2y = 5?", options: ["[[3,2],[1,2]]", "[[3,1],[2,2]]", "[[7,5]]"], answer: 0, hint: "Rad 1 = första ekvationens koefficienter.", solution: "A = <strong>[[3,2],[1,2]]</strong>, b = (7,5)." }
      ]
    },
    {
      title: "7.2 Lösning med inversen: x = A⁻¹b",
      html: "<p>Om A är inverterbar (det A ≠ 0) är lösningen <strong>x = A⁻¹·b</strong>.</p>" + exmp("Exempel", "<p>A = " + mat([[2,1],[1,3]]) + ", b = " + vec([5,10]) + ". A⁻¹ = (1/5)·[[3,−1],[−1,2]] → x = (1/5)·[[3,−1],[−1,2]]·(5,10)ᵀ = (1/5)·(5,15)ᵀ = " + vec([1,3]) + ".</p>"),
      exercises: [
        { id: "m7e2", type: "vec", title: "Övning 7.2 – Lös med inversen", prompt: "Lös " + mat([[2,1],[1,3]]) + "·x = " + vec([5,10]) + " (A⁻¹ = (1/5)·[[3,−1],[−1,2]]). Svara (x₁, x₂).", answer: [1,3], hint: "x = A⁻¹b.", solution: "x = <strong>(1, 3)</strong>. Kontroll: 2+3=5 ✓, 1+9=10 ✓." }
      ]
    },
    {
      title: "7.3 Gauss-eliminering – metoden datorn använder",
      img: "gauss",
      html: "<p>Med <strong>radoperationer</strong> (byt plats på rader, gånga en rad med tal, lägg till multipler av en rad på en annan) gör man systemet till <strong>trappstegsform</strong>, sedan löser man bakifrån (bakåtsubstitution).</p>" + exmp("Exempel", "<p>Rad 2 − ½·rad 1: (0, 2.5)x₂ = 7.5 → x₂ = 3; insatt: 2x₁ + 3 = 5 → x₁ = 1.</p>") + tips("Tänk på det som att ”rensa bort” en variabel i taget nedanför diagonalen.") + why("FEM-system har tusentals ekvationer – Gauss (i variant) är exakt vad som körs då.") + mistake("Du får bara addera multiplar av rader – inte byta ut tecken på måfå. Och kontrollera alltid svaret i ursprungsekvationerna!"),
      exercises: [
        { id: "m7e3", type: "vec", title: "Övning 7.3 – Gauss 2×2", prompt: "Lös " + mat([[3,2],[1,2]]) + "·x = " + vec([7,5]) + " med Gauss. Svara (x₁, x₂).", answer: [1,2], hint: "Rad1 − 3·rad2 → −4x₂ = −8 → x₂ = 2.", solution: "x = <strong>(1, 2)</strong>. Kontroll: 3+4=7 ✓, 1+4=5 ✓." },
        { id: "m7e4", type: "vec", title: "Övning 7.4 – Gauss 3×3", prompt: "Lös " + mat([[1,1,1],[0,2,5],[2,5,"−1"]]) + "·x = " + vec([6,"−4",27]) + ". Svara (x₁, x₂, x₃).", answer: [5,3,-2], hint: "Rad3 − 2·rad1 → (0,3,−3)x = 15. Lös 2×2-delen.", solution: "x = <strong>(5, 3, −2)</strong>. Kontroll: 5+3−2=6 ✓, 6−10=−4 ✓, 10+15+2=27 ✓." },
        { id: "m7e5", type: "mc", title: "Övning 7.5 – Entydig lösning?", prompt: "A·x = b med A = " + mat([[1,2],[2,4]]) + ", b = " + vec([1,2]) + ". Vad gäller?", options: ["Exakt en lösning", "Oändligt många lösningar", "Ingen lösning"], answer: 1, hint: "det A = 0 (singulär); här ligger b i spannet.", solution: "<strong>Oändligt många lösningar</strong> (det A = 0 men b passar in)." }
      ]
    }
  ]
},
{
  id: "m8",
  title: "8. Kvadratiska former – energi i matrisform",
  intro: "Om du tar en vektor x, kör den genom matrisen A, och punktar med x igen får du talet xᵀAx – en kvadratisk form. I FEM är det töjningsenergin.",
  sections: [
    {
      title: "8.1 Kvadratisk form Q(x) = xᵀAx",
      html: "<p>Q(x) = x<sup>T</sup>Ax = Σᵢ Σⱼ aᵢⱼ xᵢxⱼ. Räkna i två steg: först y = Ax, sedan Q = x·y.</p>" + exmp("Exempel", "<p>A = " + mat([[2,1],[1,2]]) + ", x = " + vec([1,1]) + ": Ax = " + vec([3,3]) + " → Q = 1·3 + 1·3 = <strong>6</strong>.</p>") + tips("Det är som att först ”vrida” x med A, sedan mäta hur långt resultatet är i x:s riktning."),
      exercises: [
        { id: "m8e1", type: "num", title: "Övning 8.1", prompt: "Beräkna xᵀAx för A = " + mat([[2,1],[1,2]]) + ", x = " + vec([1,1]) + ".", answer: 6, hint: "Ax = (3,3); x·(Ax) = 6.", solution: "<strong>6</strong>." },
        { id: "m8e2", type: "num", title: "Övning 8.2", prompt: "Beräkna xᵀAx för A = " + mat([[1,0],[0,4]]) + ", x = " + vec([2,1]) + ".", answer: 8, hint: "Ax = (2,4); 2·2 + 1·4 = 8.", solution: "<strong>8</strong>." }
      ]
    },
    {
      title: "8.2 Positivt definit – och töjningsenergin U = ½uᵀKu",
      img: "kvadratisk",
      html: "<p>A är <strong>positivt definit</strong> om x<sup>T</sup>Ax > 0 för alla x ≠ 0 (då inverterbar, positiva egenvärden). Semi-definit: ≥ 0 (då singulär). I FEM är töjningsenergin U = ½ u<sup>T</sup>Ku – alltid ≥ 0, som en ”energiskål”.</p>" + why("Kursövning 1: elementmatrisen är semidefinit (singulär); globala K efter randvillkor är positivt definit.") + mistake("Positivt definit är INTE samma som ”alla element positiva” – ett exempel: [[1,2],[2,1]] har bara positiva element men är indefinit (egenvärde −1)."),
      exercises: [
        { id: "m8e3", type: "num", title: "Övning 8.3 – Töjningsenergi", prompt: "U = ½ uᵀKu. Beräkna U för K = " + mat([[2,"−1"],["−1",2]]) + ", u = " + vec([1,2]) + ".", answer: 3, hint: "Ku = (0,3); uᵀKu = 6; U = 3.", solution: "U = <strong>3</strong>." },
        { id: "m8e4", type: "mc", title: "Övning 8.4 – Positivt definit?", prompt: "Är A = " + mat([[2,1],[1,2]]) + " positivt definit?", options: ["Ja", "Nej"], answer: 0, hint: "Egenvärdena är 1 och 3 (modul 9).", solution: "<strong>Ja</strong> (alla egenvärden > 0)." }
      ]
    }
  ]
},
{
  id: "m9",
  title: "9. Egenvärden och egenvektorer",
  intro: "Vissa speciella vektorer v ändrar bara längd när matrisen A appliceras: Av = λv. Talet λ är ett egenvärde.",
  sections: [
    {
      title: "9.1 Definition – och fallet diagonalmatris",
      html: "<p>Av = λv med v ≠ 0. För en <strong>diagonalmatris</strong> är egenvärdena bara diagonalelementen (de tal som redan ”sträcker” axlarna).</p>" + why("Styvhetsmatrisens egenvärden beskriver strukturens ”styvhet i olika riktningar”: alla positiva = stabil.") + tips("Egenvektorn är en riktning som matrisen bara förlänger/förkortar – inte vrider."),
      exercises: [
        { id: "m9e1", type: "vec", title: "Övning 9.1", prompt: "Egenvärdena till " + mat([[2,0],[0,5]]) + "? Sorterade, t.ex. <em>1, 2</em>.", answer: [2,5], hint: "Diagonalen.", solution: "λ = <strong>2 och 5</strong>." }
      ]
    },
    {
      title: "9.2 Egenvärden för 2×2: det(A − λI) = 0",
      img: "egen",
      html: "<p>λ fås ur <strong>karakteristikekvationen</strong> det(A − λI) = 0 (ett andragradspolynom i λ). Symmetriska matriser har alltid reella egenvärden.</p>" + exmp("Exempel", "<p>A = " + mat([[2,1],[1,2]]) + ": (2−λ)² − 1 = 0 → λ = <strong>1, 3</strong>.</p>") + why("Kursövning 1c: globala K har strikt positiva egenvärden efter randvillkor = positivt definit.") + mistake("Glöm inte −λ på diagonalen i A − λI!"),
      exercises: [
        { id: "m9e2", type: "vec", title: "Övning 9.2", prompt: "Egenvärdena till " + mat([[2,1],[1,2]]) + "? Minsta först.", answer: [1,3], hint: "(2−λ)² − 1 = 0.", solution: "λ = <strong>1 och 3</strong>." },
        { id: "m9e3", type: "mc", title: "Övning 9.3", prompt: "Är A = " + mat([[1,2],[2,1]]) + " positivt definit?", options: ["Ja", "Nej"], answer: 1, hint: "(1−λ)² − 4 = 0 → λ = 3, −1.", solution: "Egenvärde −1 → <strong>Nej</strong> (indefinit)." }
      ]
    }
  ]
},
{
  id: "m10",
  title: "10. FEM: styvhetsmatriser, assemblering, randvillkor",
  intro: "Nu kopplar vi ihop allt med FEM — precis som föreläsning 2–3: fjädrar/stänger blir elementmatriser som sätts ihop till K, och sedan löses K·u = f.",
  sections: [
    {
      title: "10.0 Varför FEM? – från verklighet till ekvationer",
      img: "brans",
      html: "<p>En bro, en balk, ett verktyg – allt sådant böjs och töjs när det belastas. Hur mycket? Det styrs av differentialekvationer som är svåra att lösa för hand. FEM delar därför strukturen i små bitar (<strong>element</strong>) som är lätta att räkna på, sätter ihop dem till ett ekvationssystem – och löser det. All matrisräkning du lärt dig är verktyget.</p>" + exmp("FEM i sex steg", ILLUS.femflode()),
      exercises: [
        { id: "m10e0", type: "mc", title: "Övning 10.0 – Ordning", prompt: "I vilken ordning kommer stegen i FEM?", options: ["Element → assemblera K → randvillkor → lös K·u=f → krafter", "Lös direkt → randvillkor → element", "Randvillkor → lös → assemblera"], answer: 0, hint: "Se flödesschemat ovan.", solution: "<strong>Element → K → randvillkor → lös → krafter</strong>." }
      ]
    },
    {
      title: "10.1 Fjäderelementet – minsta byggstenen",
      img: "fjader",
      html: "<p>En fjäder med konstant k mellan nod i och j: F = k·u. På matrisform för elementet: k<sup>(e)</sup> = k·" + mat([[1,"−1"],["−1",1]]) + " och k<sup>(e)</sup>·u<sup>(e)</sup> = f<sup>(e)</sup>, u<sup>(e)</sup> = " + vec(["uᵢ","uⱼ"]) + ".</p>" + why("Elementstyvhetsmatrisen är kvadratisk, symmetrisk och singulär (det = 0) – visste du det från övning 1?") + tips("Tänk: fjädern drar lika mycket åt båda håll – därför +k och −k i matrisen.") + mistake("Elementmatrisen går aldrig att invertera ensam – det är först när hela K sätts ihop + randvillkor som systemet blir lösbart."),
      exercises: [
        { id: "m10e1", type: "mat", title: "Övning 10.1 – Elementmatris", prompt: "Skriv k⁽ᵉ⁾ = k·[[1,−1],[−1,1]] för k = 2000 N/mm.", answer: [[2000,-2000],[-2000,2000]], hint: "Alla fyra rutor × 2000.", solution: "k⁽ᵉ⁾ = " + mat([[2000,"−2000"],["−2000",2000]]) + "." },
        { id: "m10e2", type: "num", title: "Övning 10.2 – Hookes lag", prompt: "En fjäder med k = 2000 N/mm dras ut u = 0.2 mm. Vilken kraft F = k·u krävs (N)?", answer: 400, hint: "F = 2000 · 0.2.", solution: "F = <strong>400 N</strong> (jfr kursövning 2: u = 0.2 mm, R = −400 N)." }
      ]
    },
    {
      title: "10.2 Assemblering – sätt ihop elementen till K",
      img: "assemblering",
      html: "<p>Varje element bidrar med sitt 2×2-block på de rader/kolumner som dess noder har i konnektivitetsmatrisen. Delade noder adderas.</p>" + exmp("Två fjädrar i serie (nod 1–2–3), k₁ = k₂ = 1000", "<p>K = 1000·" + mat([[1,"−1",0],["−1",2,"−1"],[0,"−1",1]]) + ". Symmetrisk, och det K = 0 (stelkroppsrörelse – hela kedjan kan flyttas utan kraft).</p>") + why("Assemblering = matrisaddition – därför är K symmetrisk när elementen är det.") + tips("K₂₂ får både k₁ och k₂ eftersom nod 2 delas av båda elementen."),
      exercises: [
        { id: "m10e3", type: "mat", title: "Övning 10.3 – Assemblera K", prompt: "Två fjädrar k = 1000 mellan nod 1–2 och 2–3. Skriv globala K (3×3).", answer: [[1000,-1000,0],[-1000,2000,-1000],[0,-1000,1000]], hint: "K₂₂ = 1000+1000 = 2000.", solution: "K = 1000·" + mat([[1,"−1",0],["−1",2,"−1"],[0,"−1",1]]) + "." },
        { id: "m10e4", type: "mc", title: "Övning 10.4 – Singulär?", prompt: "Är K ovan inverterbar innan randvillkor?", options: ["Ja", "Nej, det K = 0"], answer: 1, hint: "Kan hela kedjan röra sig fritt?", solution: "det K = 0 → <strong>singulär</strong> (stelkroppsrörelse)." }
      ]
    },
    {
      title: "10.3 Randvillkor och lösning av K·u = f",
      img: "fjaderfoto",
      html: "<p>Fasta noder (t.ex. u₁ = 0) tar bort stelkroppsrörelsen: stryk deras rader/kolumner, lös det <strong>reducerade systemet</strong> K<sub>ff</sub>·u<sub>f</sub> = f<sub>f</sub> (t.ex. med Gauss). Reaktionskrafter fås sedan ur K·u = f.</p>" + tips("Randvillkor = ”veta något säkert” (t.ex. väggen sitter fast). Utan dem har systemet oändligt många lösningar.") + why("Detta är hela proceduren: element → K → randvillkor → lös → reaktionskrafter → kontroll. Prova fjäderlabbet!"),
      exercises: [
        { id: "m10e5", type: "vec", title: "Övning 10.5 – Lös fjädersystemet (jfr övning 2)", prompt: "Två fjädrar k = 1000 N/mm, nod 1–2–3, nod 1 fast. F₂ = 300 N i nod 2, ingen last i nod 3. Beräkna (u₂, u₃) i mm.", answer: [0.3,0.3], tol: 0.001, hint: "Reducerat: 1000·[[2,−1],[−1,1]]·[u₂,u₃]ᵀ = [300,0].", solution: "u₂ = u₃ = <strong>0.3 mm</strong>. R₁ = 1000·(u₁−u₂) = <strong>−300 N</strong>." },
        { id: "m10e6", type: "num", title: "Övning 10.6 – Reaktionskraft", prompt: "Samma system: vad blir R₁ i nod 1 (N)?", answer: -300, tol: 0.001, hint: "R₁ = 1000·(u₁ − u₂) − 0.", solution: "R₁ = <strong>−300 N</strong> (jämvikt: 300 − 300 = 0 ✓)." }
      ]
    },
    {
      title: "10.4 2D-fackverk: stången i ett vridet koordinatsystem",
      img: "stang2d",
      html: "<p>I 2D har varje nod förskjutning i både x- och y-led. En stång kan bara ta kraft längs sin egen riktning, så vi räknar i ett <strong>lokalt</strong> koordinatsystem (x̂ längs stången) och vrider sedan till det globala med vinkeln θ: k<sup>(e)</sup> = (EA/L)·" + mat([["c²","cs","−c²","−cs"],["cs","s²","−cs","−s²"],["−c²","−cs","c²","cs"],["−cs","−s²","cs","s²"]]) + ", c = cos θ, s = sin θ.</p>" + why("Fackverksbroar (se bilden ovan) modelleras som nät av sådana 2D-stånger.") + tips("θ är vinkeln från globala x-axeln till stången. c² och s² blir alltid positiva – styvheten i stångens egen riktning."),
      exercises: [
        { id: "m10e7", type: "mat", title: "Övning 10.7 – Vertikal stång", prompt: "EA/L = 1000, θ = 90° (c = 0, s = 1). Skriv k⁽ᵉ⁾ (4×4) i globala koordinater.", answer: [[0,0,0,0],[0,1000,0,-1000],[0,0,0,0],[0,-1000,0,1000]], tol: 0.001, hint: "Bara s²-termer lever kvar.", solution: "k⁽ᵉ⁾ = 1000·" + mat([[0,0,0,0],[0,1,0,"−1"],[0,0,0,0],[0,"−1",0,1]]) + " – bär bara kraft i y-led." }
      ]
    }
  ]
}
];

const LAB_PRESETS = [
  { name: "En fjäder (jfr övning 2: F = 400 N, k = 2000 N/mm)", n: 1, k: [2000], f: [0, 400], fixed: [true, false] },
  { name: "Tre fjädrar i serie, last i änden", n: 3, k: [1000, 1000, 1000], f: [0, 0, 0, 600], fixed: [true, false, false, false] },
  { name: "Fyra olika fjädrar, två fasta noder", n: 4, k: [2000, 1500, 2000, 1000], f: [0, 300, -100, 200, 0], fixed: [true, false, false, false, true] }
];
