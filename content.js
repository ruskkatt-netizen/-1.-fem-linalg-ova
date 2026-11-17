function mat(rows) {
  let tds = rows.map(r => "<tr>" + r.map(c => "<td>" + c + "</td>").join("") + "</tr>").join("");
  return '<span class="mat"><table>' + tds + "</table></span>";
}
function vec(v) {
  return '<span class="vec-inline">(&nbsp;' + v.join("&nbsp;") + "&nbsp;)<sup>T</sup></span>";
}
function eq(s) { return '<span class="eq">' + s + "</span>"; }

const MODULES = [
{
  id: "m1",
  title: "1. Vektorer och längd (norm)",
  intro: "Allt i FEM börjar med vektorer. En vektor är helt enkelt en ordnad lista med tal. I kursen är förskjutningsvektorn u exempelvis en lista med förskjutningen i varje nod.",
  theory: [
    "<p><strong>Vektor:</strong> " + vec(["a₁","a₂","a₃"]) + " – en kolumn med tal. I boken skrivs den u = (u₁, u₂, u₃)<sup>T</sup>, där <sup>T</sup> betyder transponat (rad blir kolumn).</p>",
    "<p><strong>Addition och skalning</strong> sker komponentvis: " + vec(["a₁","a₂"]) + " + " + vec(["b₁","b₂"]) + " = " + vec(["a₁+b₁","a₂+b₂"]) + " och c·" + vec(["a₁","a₂"]) + " = " + vec(["c·a₁","c·a₂"]) + ".</p>",
    "<p><strong>Längden (normen)</strong> av en vektor: ||v|| = √(v·v) = √(v₁² + v₂² + … + vₙ²). Geometriskt är det pilens längd.</p>"
  ],
  why: "<strong>Varför i FEM?</strong> Nodförskjutningarna samlas i en vektor u, och längden ||u|| kan t.ex. tala om hur stor deformationen totalt sett är.",
  example: {
    title: "Genomgånget exempel (samma som i föreläsningen)",
    html: "<p>Beräkna längden av " + vec([1,2,0]) + ":</p><ol><li>Kvadrera komponenterna: 1² + 2² + 0² = 1 + 4 + 0 = 5</li><li>||v|| = √5 ≈ 2,236</li></ol>"
  },
  exercises: [
    { id: "m1e1", type: "num", title: "Övning 1.1 – Normen", prompt: "Beräkna ||" + vec([3,4]) + "||.", answer: 5, hint: "||v|| = √(3² + 4²) = √(9+16) = √25.", solution: "||(3,4)|| = √(9+16) = √25 = <strong>5</strong>." },
    { id: "m1e2", type: "num", title: "Övning 1.2 – Normen i 3D", prompt: "Beräkna ||" + vec([1,"−2",2]) + "||.", answer: 3, hint: "1 + 4 + 4 = 9, så svaret är √9.", solution: "||(1,−2,2)|| = √(1+4+4) = √9 = <strong>3</strong>." },
    { id: "m1e3", type: "vec", title: "Övning 1.3 – Vektoraddition", prompt: "Beräkna " + vec([1,2,3]) + " + " + vec([4,"−1",2]) + ". Svara som en vektor, t.ex. <em>1, 2, 3</em>.", answer: [5,1,5], hint: "Addera komponent för komponent: 1+4, 2+(−1), 3+2.", solution: "(1,2,3) + (4,−1,2) = <strong>(5, 1, 5)</strong>." },
    { id: "m1e4", type: "vec", title: "Övning 1.4 – Skalning av vektor", prompt: "Beräkna 3·" + vec([2,"−1",4]) + ".", answer: [6,-3,12], hint: "Multiplicera varje komponent med 3.", solution: "3·(2,−1,4) = <strong>(6, −3, 12)</strong>." }
  ]
},
{
  id: "m2",
  title: "2. Skalärprodukt och vinkel mellan vektorer",
  intro: "Skalärprodukten (·) mellan två vektorer ger ett tal – och används bland annat för att räkna ut vinkeln mellan dem.",
  theory: [
    "<p><strong>Skalärprodukt:</strong> v·w = v₁w₁ + v₂w₂ + … + vₙwₙ. Resultatet är en skalär (ett tal).</p>",
    "<p><strong>Vinkeln θ mellan v och w:</strong> cos θ = (v·w) / (||v||·||w||), dvs. θ = arccos( (v·w) / (||v||·||w||) ).</p>",
    "<p>Om v·w = 0 är vektorerna <strong>ortogonala</strong> (vinkelräta), dvs. θ = 90°.</p>"
  ],
  why: "<strong>Varför i FEM?</strong> Skalärprodukten skrivs ofta som v<sup>T</sup>w. Kvadratiska former som töjningsenergin U = ½ u<sup>T</sup>Ku bygger på just detta.",
  example: {
    title: "Genomgånget exempel",
    html: "<p>Vinkeln mellan " + vec([1,0]) + " (x-axeln) och " + vec([1,1]) + ":</p><ol><li>v·w = 1·1 + 0·1 = 1</li><li>||v|| = 1, ||w|| = √2</li><li>cos θ = 1/√2 → θ = <strong>45°</strong></li></ol>"
  },
  exercises: [
    { id: "m2e1", type: "num", title: "Övning 2.1 – Skalärprodukt", prompt: "Beräkna " + vec([1,2]) + " · " + vec([3,4]) + ".", answer: 11, hint: "1·3 + 2·4 = 3 + 8.", solution: "(1,2)·(3,4) = 3 + 8 = <strong>11</strong>." },
    { id: "m2e2", type: "num", title: "Övning 2.2 – Vinkel", prompt: "Beräkna vinkeln (i grader) mellan " + vec([1,0]) + " och " + vec([0,1]) + ".", answer: 90, hint: "cos θ = (1·0 + 0·1)/(1·1) = 0 → θ = arccos(0).", solution: "cos θ = 0/(1·1) = 0 → θ = <strong>90°</strong>. Axlarna är ortogonala." },
    { id: "m2e3", type: "mc", title: "Övning 2.3 – Ortogonalitet", prompt: "Är " + vec([1,2]) + " och " + vec([2,"−1"]) + " ortogonala?", options: ["Ja", "Nej"], answer: 0, hint: "Räkna skalärprodukten. Om den är 0 är de ortogonala.", solution: "(1,2)·(2,−1) = 2 − 2 = 0 → <strong>Ja</strong>, de är ortogonala (θ = 90°)." },
    { id: "m2e4", type: "num", title: "Övning 2.4 – Vinkel i 3D", prompt: "Beräkna vinkeln (i grader) mellan " + vec([1,1,1]) + " och " + vec([1,"−1",0]) + ".", answer: 90, hint: "Skalärprodukten är 1·1 + 1·(−1) + 1·0 = 0.", solution: "v·w = 1 − 1 + 0 = 0 → cos θ = 0 → θ = <strong>90°</strong>." }
  ]
},
{
  id: "m3",
  title: "3. Kryssprodukt (3D)",
  intro: "Kryssprodukten mellan två vektorer i 3D ger en ny vektor som är vinkelrät mot båda – högerhandsregeln gäller.",
  theory: [
    "<p>" + vec(["a₁","a₂","a₃"]) + " × " + vec(["b₁","b₂","b₃"]) + " = " + vec(["a₂b₃ − a₃b₂","a₃b₁ − a₁b₃","a₁b₂ − a₂b₁"]) + ".</p>",
    "<p>Egenskaper: a × a = 0, a × b = −(b × a), och ||a × b|| är arean av parallellogrammet som a och b spänner upp.</p>"
  ],
  why: "<strong>Varför i FEM?</strong> Kryssprodukten används för att ta fram riktningar (t.ex. normaler till ytor) när man bygger 2D/3D-element i lokala koordinatsystem.",
  example: {
    title: "Genomgånget exempel",
    html: "<p>" + vec([1,0,0]) + " × " + vec([0,1,0]) + " = " + vec(["0·0−0·1","0·0−1·0","1·1−0·0"]) + " = " + vec([0,0,1]) + " – enligt högerhandsregeln pekar z-axeln uppåt.</p>"
  },
  exercises: [
    { id: "m3e1", type: "vec", title: "Övning 3.1", prompt: "Beräkna " + vec([1,0,0]) + " × " + vec([0,1,0]) + ".", answer: [0,0,1], hint: "Använd formeln komponent för komponent.", solution: "= <strong>(0, 0, 1)</strong>." },
    { id: "m3e2", type: "vec", title: "Övning 3.2", prompt: "Beräkna " + vec([1,2,3]) + " × " + vec([4,5,6]) + ".", answer: [-3,6,-3], hint: "Komponent 1: 2·6 − 3·5 = −3. Komponent 2: 3·4 − 1·6 = 6. Komponent 3: 1·5 − 2·4 = −3.", solution: "= <strong>(−3, 6, −3)</strong>." },
    { id: "m3e3", type: "num", title: "Övning 3.3 – Area", prompt: "Beräkna arean av parallellogrammet som " + vec([2,0]) + " och " + vec([0,3]) + " spänner upp (i 3D: lägg till en nolla).", answer: 6, hint: "Arean = ||a × b||.", solution: "(2,0,0)×(0,3,0) = (0,0,6), ||(0,0,6)|| = <strong>6</strong>." }
  ]
},
{
  id: "m4",
  title: "4. Matriser: uppbyggnad och transponat",
  intro: "En matris är en rektangulär tabell av tal. I FEM är styvhetsmatrisen K själva hjärtat i hela metoden.",
  theory: [
    "<p>En matris A med m rader och n kolumner har element aᵢⱼ (rad i, kolumn j): " + mat([["a₁₁","a₁₂","…","a₁ₙ"],["a₂₁","a₂₂","…","a₂ₙ"],["⋮","⋮","","⋮"],["aₘ₁","aₘ₂","…","aₘₙ"]]) + ".</p>",
    "<p><strong>Transponat A<sup>T</sup></strong>: byt plats på rader och kolumner. " + mat([[1,2,3],[4,5,6]]) + "<sup>T</sup> = " + mat([[1,4],[2,5],[3,6]]) + ".</p>",
    "<p><strong>Symmetrisk matris:</strong> A = A<sup>T</sup>. <strong>Diagonalmatris:</strong> noll överallt utom på diagonalen. <strong>Enhetsmatris I:</strong> ettor på diagonalen, noll annars: " + mat([[1,0],[0,1]]) + ".</p>"
  ],
  why: "<strong>Varför i FEM?</strong> Elementstyvhetsmatrisen k<sup>(e)</sup> och den globala styvhetsmatrisen K är alltid <em>symmetriska</em> – det är en av de viktigaste egenskaperna hos FEM-systemet.",
  example: {
    title: "Genomgånget exempel",
    html: "<p>Transponera A = " + mat([[1,2,3],[4,5,6],[7,8,9]]) + ":</p><ol><li>Första raden (1,2,3) blir första kolumnen.</li><li>A<sup>T</sup> = " + mat([[1,4,7],[2,5,8],[3,6,9]]) + ".</li></ol>"
  },
  exercises: [
    { id: "m4e1", type: "mat", title: "Övning 4.1 – Transponat", prompt: "Beräkna A<sup>T</sup> då A = " + mat([[1,2,3],[4,5,6]]) + ". Fyll i raderna uppifrån.", answer: [[1,4],[2,5],[3,6]], hint: "Rader blir kolumner: första raden (1,2,3) blir första kolumnen i svaret.", solution: "A<sup>T</sup> = " + mat([[1,4],[2,5],[3,6]]) + "." },
    { id: "m4e2", type: "mc", title: "Övning 4.2 – Symmetri", prompt: "Är A = " + mat([[2,1],[1,3]]) + " symmetrisk?", options: ["Ja, A = Aᵀ", "Nej"], answer: 0, hint: "Jämför A med Aᵀ.", solution: "Aᵀ = " + mat([[2,1],[1,3]]) + " = A → <strong>Ja, symmetrisk</strong>." },
    { id: "m4e3", type: "mc", title: "Övning 4.3 – Dimension", prompt: "Vad är dimensionen (antal rader × kolumner) på A = " + mat([[1,2,3,4],[5,6,7,8],[9,10,11,12]]) + "?", options: ["2 × 4", "3 × 4", "4 × 3", "3 × 3"], answer: 1, hint: "Räkna rader och kolumner.", solution: "3 rader och 4 kolumner → <strong>3 × 4</strong>." }
  ]
},
{
  id: "m5",
  title: "5. Matrisoperationer",
  intro: "Addition, skalning, matris gånger vektor och matris gånger matris. Viktigaste regeln: matrismultiplikation är INTE kommutativ.",
  theory: [
    "<p><strong>Addition/skalning:</strong> komponentvis, samma som för vektorer: (A+B)ᵢⱼ = aᵢⱼ + bᵢⱼ.</p>",
    "<p><strong>Matris × vektor ger vektor:</strong> rad i A punktas med vektorn. A = " + mat([["a₁₁","a₁₂"],["a₂₁","a₂₂"]]) + ", v = " + vec(["x₁","x₂"]) + " ger Av = " + vec(["a₁₁x₁+a₁₂x₂","a₂₁x₁+a₂₂x₂"]) + ".</p>",
    "<p><strong>Matris × matris:</strong> (AB)ᵢⱼ = rad i i A · kolumn j i B.</p>",
    "<p><strong>OBS:</strong> AB ≠ BA i allmänhet! (Icke-kommutativ.)</p>"
  ],
  why: "<strong>Varför i FEM?</strong> Kraftsystemet skrivs K·u = f: styvhetsmatrisen gånger förskjutningsvektorn blir kraftvektorn.",
  example: {
    title: "Genomgånget exempel",
    html: "<p>A = " + mat([[1,2],[3,4]]) + ", v = " + vec([1,1]) + ":</p><ol><li>Rad 1 · v = 1·1 + 2·1 = 3</li><li>Rad 2 · v = 3·1 + 4·1 = 7</li><li>Av = " + vec([3,7]) + "</li></ol>"
  },
  exercises: [
    { id: "m5e1", type: "mat", title: "Övning 5.1 – Matrisaddition", prompt: "A = " + mat([[1,2],[3,4]]) + ", B = " + mat([[0,1],[1,0]]) + ". Beräkna A + B.", answer: [[1,3],[4,4]], hint: "Addera komponentvis.", solution: "A + B = " + mat([[1,3],[4,4]]) + "." },
    { id: "m5e2", type: "vec", title: "Övning 5.2 – Matris × vektor", prompt: "Beräkna A·v då A = " + mat([[1,2],[3,4]]) + " och v = " + vec([1,1]) + ".", answer: [3,7], hint: "Rad 1: 1·1+2·1. Rad 2: 3·1+4·1.", solution: "Av = <strong>(3, 7)</strong>." },
    { id: "m5e3", type: "mat", title: "Övning 5.3 – Matris × matris", prompt: "Beräkna A·B då A = " + mat([[1,2],[3,4]]) + " och B = " + mat([[1,0],[0,2]]) + ".", answer: [[1,4],[3,8]], hint: "(AB)₁₁ = rad1(A)·kol1(B) = 1·1+2·0 = 1; (AB)₁₂ = 1·0+2·2 = 4; osv.", solution: "AB = " + mat([[1,4],[3,8]]) + "." },
    { id: "m5e4", type: "mat", title: "Övning 5.4 – Icke-kommutativitet", prompt: "Samma A och B som i 5.3. Beräkna nu B·A (observera ordningen!).", answer: [[1,2],[6,8]], hint: "Nu är det rad i B som punktas med kolumn i A.", solution: "BA = " + mat([[1,2],[6,8]]) + " ≠ AB. Matrismultiplikation är <strong>inte</strong> kommutativ!" }
  ]
},
{
  id: "m6",
  title: "6. Determinant och invers",
  intro: "Determinanten talar om matrisen är inverterbar. Inversen används för att lösa ekvationssystem: x = A⁻¹b.",
  theory: [
    "<p><strong>2×2:</strong> det A = det " + mat([["a","b"],["c","d"]]) + " = ad − bc.</p>",
    "<p><strong>3×3 (Sarrus regel):</strong> det " + mat([["a","b","c"],["d","e","f"],["g","h","i"]]) + " = aei + bfg + cdh − ceg − bdi − afh.</p>",
    "<p>Om det A = 0 är A <strong>singulär</strong> – då finns ingen invers.</p>",
    "<p><strong>Invers 2×2:</strong> A⁻¹ = (1/det A) · " + mat([["d","−b"],["−c","a"]]) + ".</p>"
  ],
  why: "<strong>Varför i FEM?</strong> En elementstyvhetsmatris är alltid singulär (det = 0) tills randvillkoren lagts på – först då går den globala matrisen att invertera.",
  example: {
    title: "Genomgånget exempel",
    html: "<p>Inversen av A = " + mat([[4,2],[1,3]]) + ":</p><ol><li>det A = 4·3 − 2·1 = 10</li><li>A⁻¹ = (1/10)·" + mat([[3,"−2"],["−1",4]]) + " = " + mat([[0.3,"−0.2"],["−0.1",0.4]]) + "</li><li>Kontroll: A·A⁻¹ = I = " + mat([[1,0],[0,1]]) + " ✓</li></ol>"
  },
  exercises: [
    { id: "m6e1", type: "num", title: "Övning 6.1 – Determinant 2×2", prompt: "Beräkna det " + mat([[3,1],[2,4]]) + ".", answer: 10, hint: "ad − bc = 3·4 − 1·2.", solution: "det = 12 − 2 = <strong>10</strong>." },
    { id: "m6e2", type: "mc", title: "Övning 6.2 – Singulär?", prompt: "Är A = " + mat([[1,2],[2,4]]) + " inverterbar?", options: ["Ja", "Nej, det A = 0 (singulär)"], answer: 1, hint: "Beräkna determinanten: 1·4 − 2·2.", solution: "det A = 4 − 4 = 0 → <strong>Nej</strong>, ingen invers finns." },
    { id: "m6e3", type: "mat", title: "Övning 6.3 – Invers 2×2", prompt: "Beräkna A⁻¹ då A = " + mat([[4,2],[1,3]]) + ". Svara med decimaltal (t.ex. 0.3).", answer: [[0.3,-0.2],[-0.1,0.4]], tol: 0.001, hint: "det A = 10. Byt plats på a och d, byt tecken på b och c, dividera med 10.", solution: "A⁻¹ = " + mat([[0.3,"−0.2"],["−0.1",0.4]]) + "." },
    { id: "m6e4", type: "num", title: "Övning 6.4 – Determinant 3×3", prompt: "Beräkna det " + mat([[1,0,2],[0,1,0],[2,0,1]]) + ".", answer: -3, hint: "Utveckla längs andra raden: det = 1 · det[[1,2],[2,1]] = (1·1 − 2·2) = −3.", solution: "det = <strong>−3</strong> ≠ 0, så A är inverterbar." }
  ]
},
{
  id: "m7",
  title: "7. Linjära ekvationssystem: Ax = b och Gauss-eliminering",
  intro: "FEM landar alltid i ett ekvationssystem Ku = f. Här lär du dig lösa Ax = b – för hand med Gauss-eliminering, som är precis vad datorn gör för stora system.",
  theory: [
    "<p>Ett linjärt ekvationssystem skrivs på matrisform <strong>A·x = b</strong>. Om A är inverterbar är lösningen x = A⁻¹b.</p>",
    "<p><strong>Gauss-eliminering:</strong> använd radoperationer (byt rader, multiplicera rad med tal, addera multiplar av rader) för att få trappstegsform, bakåtsubstituera sedan.</p>",
    "<p>Randvillkor i FEM gör precis detta: vi stryker rader/kolumner för kända förskjutningar så att systemet blir lösbart.</p>"
  ],
  why: "<strong>Varför i FEM?</strong> Hela FEM bygger på att lösa det (ofta stora) systemet K·u = f. Förståelsen för Ax = b är därför kursens viktigaste mattekunskap.",
  example: {
    title: "Genomgånget exempel (Gauss-eliminering)",
    html: "<p>Lös " + mat([[2,1],[1,3]]) + "·" + vec(["x₁","x₂"]) + " = " + vec([5,10]) + ":</p><ol><li>Rad 2 − ½·rad 1: (0, 2.5)·x = 7.5 → x₂ = 3</li><li>Sätt in: 2x₁ + 3 = 5 → x₁ = 1</li><li>Svar: x = " + vec([1,3]) + ". Kontroll: 2·1+1·3 = 5 ✓, 1·1+3·3 = 10 ✓</li></ol>"
  },
  exercises: [
    { id: "m7e1", type: "vec", title: "Övning 7.1 – Lös 2×2-systemet", prompt: "Lös " + mat([[2,1],[1,3]]) + "·x = " + vec([5,10]) + ". Svara som vektor (x₁, x₂).", answer: [1,3], hint: "Eliminera x₁ ur rad 2, eller använd x = A⁻¹b.", solution: "x = <strong>(1, 3)</strong>. Kontroll: 2·1+3=5 ✓ och 1+9=10 ✓." },
    { id: "m7e2", type: "vec", title: "Övning 7.2 – Lös 3×3-systemet", prompt: "Lös med Gauss-eliminering: " + mat([[1,1,1],[0,2,5],[2,5,"−1"]]) + "·x = " + vec([6,"−4",27]) + ". Svara som (x₁, x₂, x₃).", answer: [5,3,-2], hint: "Rad 3 − 2·rad 1 ger (0, 3, −3)·x = 15. Lös sedan 2×2-systemet för x₂, x₃.", solution: "x = <strong>(5, 3, −2)</strong>. Kontroll: 5+3−2=6 ✓, 2·3+5·(−2)=−4 ✓, 2·5+5·3−(−2)=27 ✓." },
    { id: "m7e3", type: "mc", title: "Övning 7.3 – Entydig lösning?", prompt: "Systemet A·x = b med A = " + mat([[1,2],[2,4]]) + " och b = " + vec([1,2]) + ". Vad gäller?", options: ["Exakt en lösning", "Oändligt många lösningar", "Ingen lösning"], answer: 1, hint: "Beräkna det A. Om det = 0 saknas entydig lösning (jfr föreläsningen: då är b = 0 nödvändigt).", solution: "det A = 0 → matrisen är singulär. Här råkar b ligga i spannet, så det finns <strong>oändligt många lösningar</strong>." }
  ]
},
{
  id: "m8",
  title: "8. Kvadratiska former och positivt definit",
  intro: "En kvadratisk form Q(x) = xᵀAx är ett tal för varje vektor x. Töjningsenergin i FEM är precis en sådan: U = ½ uᵀKu.",
  theory: [
    "<p><strong>Kvadratisk form:</strong> Q(x) = x<sup>T</sup>Ax = Σᵢ Σⱼ aᵢⱼ xᵢ xⱼ. Exempel: töjningsenergi U = ½ u<sup>T</sup>Ku.</p>",
    "<p>A är <strong>positivt definit</strong> om x<sup>T</sup>Ax > 0 för alla x ≠ 0. Då är A inverterbar (och har positiva egenvärden).</p>",
    "<p>Positivt <em>semi</em>-definit: x<sup>T</sup>Ax ≥ 0 (kan vara 0 för vissa x ≠ 0) – då är A singulär.</p>"
  ],
  why: "<strong>Varför i FEM?</strong> Elementstyvhetsmatrisen är positivt semidefinit och singulär; efter randvillkor blir den globala K positivt definit – det är exakt vad svaren till övning 1a/1c i kursen säger.",
  example: {
    title: "Genomgånget exempel",
    html: "<p>Beräkna Q(x) = x<sup>T</sup>Ax för A = " + mat([[2,1],[1,2]]) + " och x = " + vec([1,1]) + ":</p><ol><li>Ax = " + mat([[2,1],[1,2]]) + "·" + vec([1,1]) + " = " + vec([3,3]) + "</li><li>Q = x<sup>T</sup>(Ax) = 1·3 + 1·3 = <strong>6</strong></li></ol>"
  },
  exercises: [
    { id: "m8e1", type: "num", title: "Övning 8.1 – Kvadratisk form", prompt: "Beräkna x<sup>T</sup>Ax då A = " + mat([[2,1],[1,2]]) + " och x = " + vec([1,1]) + ".", answer: 6, hint: "Räkna Ax först, sedan x·(Ax).", solution: "Ax = (3,3), x<sup>T</sup>Ax = 1·3+1·3 = <strong>6</strong>." },
    { id: "m8e2", type: "num", title: "Övning 8.2 – Töjningsenergi", prompt: "Töjningsenergin är U = ½ u<sup>T</sup>Ku. Beräkna U då K = " + mat([[2,"−1"],["−1",2]]) + " och u = " + vec([1,2]) + ".", answer: 3, hint: "Ku = (2·1−1·2, −1·1+2·2) = (0, 3). Sedan uᵀ(Ku) = 1·0 + 2·3 = 6, och U = 6/2.", solution: "U = ½·6 = <strong>3</strong>." },
    { id: "m8e3", type: "mc", title: "Övning 8.3 – Positivt definit?", prompt: "Är A = " + mat([[2,1],[1,2]]) + " positivt definit?", options: ["Ja", "Nej"], answer: 0, hint: "Kolla egenvärdena (nästa modul) eller testa xᵀAx för några x.", solution: "Egenvärdena är 1 och 3 (båda > 0), och xᵀAx > 0 för alla x ≠ 0 → <strong>Ja</strong>." }
  ]
},
{
  id: "m9",
  title: "9. Egenvärden och egenvektorer (översikt)",
  intro: "Ett egenvärde λ med egenvektor v uppfyller Av = λv – matrisen 'sträcker' bara vektorn, utan att vrida den.",
  theory: [
    "<p><strong>Definition:</strong> Av = λv, v ≠ 0.</p>",
    "<p>För 2×2 hittar man λ genom karakteristikekvationen: det(A − λI) = 0.</p>",
    "<p>Symmetriska matriser (som styvhetsmatriser) har alltid reella egenvärden, och om matrisen är positivt definit är alla egenvärden positiva.</p>"
  ],
  why: "<strong>Varför i FEM?</strong> Svaren till kursens övning 1 säger just detta: elementstyvhetsmatrisen har icke-negativa egenvärden (ett är 0 = stelkroppsrörelse), den globala efter randvillkor har strikt positiva egenvärden.",
  example: {
    title: "Genomgånget exempel",
    html: "<p>Egenvärden till A = " + mat([[2,1],[1,2]]) + ":</p><ol><li>det(A − λI) = det " + mat([["2−λ",1],[1,"2−λ"]]) + " = (2−λ)² − 1 = 0</li><li>(2−λ)² = 1 → 2−λ = ±1 → λ = <strong>1 och 3</strong></li></ol>"
  },
  exercises: [
    { id: "m9e1", type: "vec", title: "Övning 9.1 – Egenvärden, diagonal", prompt: "Bestäm egenvärdena till " + mat([[2,0],[0,5]]) + ". Svara sorterade, t.ex. <em>1, 2</em>.", answer: [2,5], hint: "det(A−λI) = (2−λ)(5−λ) = 0.", solution: "λ = <strong>2 och 5</strong> (diagonalelementen)." },
    { id: "m9e2", type: "vec", title: "Övning 9.2 – Egenvärden", prompt: "Bestäm egenvärdena till " + mat([[2,1],[1,2]]) + ". Svara sorterade, minsta först.", answer: [1,3], hint: "(2−λ)² − 1 = 0.", solution: "λ = <strong>1 och 3</strong>. Båda positiva → positivt definit." },
    { id: "m9e3", type: "mc", title: "Övning 9.3 – Positivt definit?", prompt: "Är A = " + mat([[1,2],[2,1]]) + " positivt definit?", options: ["Ja", "Nej"], answer: 1, hint: "Egenvärdena fås av (1−λ)² − 4 = 0 → λ = 3 och λ = −1.", solution: "Ett egenvärde är −1 < 0 → <strong>Nej</strong>, A är indefinit." }
  ]
},
{
  id: "m10",
  title: "10. FEM-kopplingen: styvhetsmatriser, assemblering, randvillkor",
  intro: "Nu använder vi linjär algebra precis som i föreläsning 2–3: fjäderelement, assemblering till en global styvhetsmatris K, randvillkor, och lösning av Ku = f.",
  theory: [
    "<p><strong>Fjäderelement</strong> mellan nod i och j med fjäderkonstant k: k<sup>(e)</sup> = k·" + mat([[1,"−1"],["−1",1]]) + ", och k<sup>(e)</sup>·u<sup>(e)</sup> = f<sup>(e)</sup> där u<sup>(e)</sup> = " + vec(["uᵢ","uⱼ"]) + ".</p>",
    "<p><strong>Assemblering:</strong> lägg in varje elements 2×2-block i den globala matrisen K enligt konnektiviteten (vilka noder elementet kopplar ihop).</p>",
    "<p><strong>Randvillkor:</strong> känd förskjutning (t.ex. fast inspänd nod u = 0) tar bort stelkroppsrörelse och gör K inverterbar. Lös det reducerade systemet K<sub>ff</sub>u<sub>f</sub> = f<sub>f</sub>, räkna sedan reaktionskrafter ur K·u = f.</p>",
    "<p><strong>2D-stång:</strong> i lokala koordinater samma som 1D, sedan transformeras med T(θ) (rotation med vinkeln θ). Elementstyvhetsmatrisen i globala koordinater blir k<sup>(e)</sup> = (EA/L)·" + mat([["c²","cs","−c²","−cs"],["cs","s²","−cs","−s²"],["−c²","−cs","c²","cs"],["−cs","−s²","cs","s²"]]) + " där c = cos θ, s = sin θ.</p>"
  ],
  why: "<strong>Detta är kärnan i FEM:</strong> bygg elementmatriser → sätt ihop till K → lägg på randvillkor → lös K·u = f → läs av krafter. Allt är matrisräkning du precis övat!",
  example: {
    title: "Genomgånget exempel – två fjädrar i serie",
    html: "<p>Två fjädrar k₁ = k₂ = 1000 N/mm mellan nod 1–2–3. Assemblera:</p><ol><li>Element 1 bidrar till K[1..2][1..2], element 2 till K[2..3][2..3].</li><li>K = 1000·" + mat([[1,"−1",0],["−1",2,"−1"],[0,"−1",1]]) + " (symmetrisk, och det K = 0 → singulär, stelkroppsrörelse).</li><li>Randvillkor: nod 1 fast, u₁ = 0. Reducerat system: 1000·" + mat([[2,"−1"],["−1",1]]) + "·" + vec(["u₂","u₃"]) + " = " + vec(["F₂","F₃"]) + ".</li></ol>"
  },
  exercises: [
    { id: "m10e1", type: "mat", title: "Övning 10.1 – Elementstyvhetsmatris", prompt: "Skriv elementstyvhetsmatrisen k⁽ᵉ⁾ = k·[[1,−1],[−1,1]] för en fjäder med k = 2000 N/mm.", answer: [[2000,-2000],[-2000,2000]], hint: "Multiplicera varje element med 2000.", solution: "k⁽ᵉ⁾ = " + mat([[2000,"−2000"],["−2000",2000]]) + "." },
    { id: "m10e2", type: "mat", title: "Övning 10.2 – Assemblera global K", prompt: "Två fjädrar med k = 1000 mellan nod 1–2 och 2–3. Skriv den globala styvhetsmatrisen K (3×3).", answer: [[1000,-1000,0],[-1000,2000,-1000],[0,-1000,1000]], hint: "Element 1: block på rad/kol 1–2. Element 2: block på rad/kol 2–3. Diagonalen i nod 2 får 1000+1000.", solution: "K = 1000·" + mat([[1,"−1",0],["−1",2,"−1"],[0,"−1",1]]) + "." },
    { id: "m10e3", type: "mc", title: "Övning 10.3 – Singulär före randvillkor?", prompt: "Är K från 10.2 inverterbar innan randvillkor lagts på?", options: ["Ja", "Nej, det K = 0 (stelkroppsrörelse)"], answer: 1, hint: "Räkna ut determinanten, eller tänk: kan hela kedjan röra sig fritt utan kraft?", solution: "det K = 0 → <strong>singulär</strong>. Hela fjäderkedjan kan förskjutas utan kraft = stelkroppsrörelse. Randvillkor behövs!" },
    { id: "m10e4", type: "vec", title: "Övning 10.4 – Lös fjädersystemet (jfr kursövning 2)", prompt: "Två fjädrar k = 1000 N/mm, nod 1–2–3. Nod 1 fast (u₁ = 0). Kraft F₂ = 300 N i nod 2, ingen kraft i nod 3. Beräkna u₂ och u₃ (i mm).", answer: [0.3,0.3], tol: 0.001, hint: "Reducerat system: 1000·[[2,−1],[−1,1]]·[u₂,u₃]ᵀ = [300,0]. Lös t.ex. med invers.", solution: "u₂ = u₃ = <strong>0.3 mm</strong>. (Kontroll: fjäder 2 bär ingen kraft.) Reaktionskraften i nod 1 blir R₁ = 1000·(u₁−u₂) = <strong>−300 N</strong>." },
    { id: "m10e5", type: "mat", title: "Övning 10.5 – 2D-stång, vertikal", prompt: "2D-stångelement med EA/L = 1000 och θ = 90° (c = cos 90° = 0, s = 1). Skriv k⁽ᵉ⁾ (4×4) i globala koordinater.", answer: [[0,0,0,0],[0,1000,0,-1000],[0,0,0,0],[0,-1000,0,1000]], tol: 0.001, hint: "Sätt in c = 0, s = 1 i formeln (EA/L)·[[c²,cs,−c²,−cs],[cs,s²,−cs,−s²],[−c²,−cs,c²,cs],[−cs,−s²,cs,s²]]. Endast s²-termer blir kvar.", solution: "k⁽ᵉ⁾ = 1000·" + mat([[0,0,0,0],[0,1,0,"−1"],[0,0,0,0],[0,"−1",0,1]]) + ". En vertikal stång bär bara kraft i y-led." }
  ]
}
];

const LAB_PRESETS = [
  { name: "En fjäder (jfr övning 2: F = 400 N, k = 2000 N/mm)", n: 1, k: [2000], f: [0, 400], fixed: [true, false] },
  { name: "Tre fjädrar i serie, last i änden", n: 3, k: [1000, 1000, 1000], f: [0, 0, 0, 600], fixed: [true, false, false, false] },
  { name: "Fyra olika fjädrar, två fasta noder", n: 4, k: [2000, 1500, 2000, 1000], f: [0, 300, -100, 200, 0], fixed: [true, false, false, false, true] }
];
