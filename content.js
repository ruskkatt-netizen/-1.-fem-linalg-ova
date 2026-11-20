function mat(rows) {
  let tds = rows.map(r => "<tr>" + r.map(c => "<td>" + c + "</td>").join("") + "</tr>").join("");
  return '<span class="mat"><table>' + tds + "</table></span>";
}
function vec(v) {
  return '<span class="vec-inline">(&nbsp;' + v.join("&nbsp;") + "&nbsp;)<sup>T</sup></span>";
}
function why(s) { return '<div class="why"><strong>Varför i FEM?</strong> ' + s + "</div>"; }
function exmp(title, html) { return '<div class="example-box"><strong>' + title + "</strong>" + html + "</div>"; }

const MODULES = [
{
  id: "m1",
  title: "1. Vektorer och längd (norm)",
  intro: "Allt i FEM börjar med vektorer. En vektor är helt enkelt en ordnad lista med tal. I kursen är förskjutningsvektorn u exempelvis en lista med förskjutningen i varje nod.",
  sections: [
    {
      title: "1.1 Vad är en vektor?",
      html: "<p>En vektor är en ordnad lista med tal, skriven som en kolumn: " + vec(["a₁","a₂","a₃"]) + ". I boken skrivs u = (u₁, u₂, u₃)<sup>T</sup> – <sup>T</sup> betyder transponat (rad blir kolumn). Antalet tal kallas vektorns <strong>dimension</strong>.</p>" + why("Nodförskjutningarna i en FEM-modell samlas i en förskjutningsvektor u – en komponent per frihetsgrad (nod)."),
      exercises: [
        { id: "m1e1", type: "mc", title: "Övning 1.1 – Dimension", prompt: "Vilken dimension har vektorn " + vec([1,2,3,4]) + "?", options: ["2", "3", "4", "5"], answer: 2, hint: "Räkna antalet tal i listan.", solution: "Fyra tal → dimension <strong>4</strong>." }
      ]
    },
    {
      title: "1.2 Addition och skalning av vektorer",
      html: "<p>Addition och subtraktion sker <strong>komponentvis</strong>: " + vec(["a₁","a₂"]) + " + " + vec(["b₁","b₂"]) + " = " + vec(["a₁+b₁","a₂+b₂"]) + ". Skalning: c·" + vec(["a₁","a₂"]) + " = " + vec(["c·a₁","c·a₂"]) + ".</p>" + why("När två lastfall kombineras (superpositionsprincipen i FEM) adderas deras förskjutningsvektorer."),
      exercises: [
        { id: "m1e2", type: "vec", title: "Övning 1.2 – Addition", prompt: "Beräkna " + vec([1,2,3]) + " + " + vec([4,"−1",2]) + ". Svara t.ex. <em>1, 2, 3</em>.", answer: [5,1,5], hint: "Addera komponent för komponent: 1+4, 2+(−1), 3+2.", solution: "(1,2,3) + (4,−1,2) = <strong>(5, 1, 5)</strong>." },
        { id: "m1e3", type: "vec", title: "Övning 1.3 – Skalning", prompt: "Beräkna 3·" + vec([2,"−1",4]) + ".", answer: [6,-3,12], hint: "Multiplicera varje komponent med 3.", solution: "3·(2,−1,4) = <strong>(6, −3, 12)</strong>." }
      ]
    },
    {
      title: "1.3 Längden (normen) av en vektor",
      html: "<p>Normen ||v|| = √(v·v) = √(v₁² + v₂² + … + vₙ²) är pilens längd.</p>" + exmp("Exempel från föreläsningen", "<p>Beräkna längden av " + vec([1,2,0]) + ": 1² + 2² + 0² = 5, så ||v|| = <strong>√5 ≈ 2,236</strong>.</p>") + why("||u|| kan tala om hur stor den totala deformationen är i hela strukturen."),
      exercises: [
        { id: "m1e4", type: "num", title: "Övning 1.4 – Norm 2D", prompt: "Beräkna ||" + vec([3,4]) + "||.", answer: 5, hint: "√(3²+4²) = √25.", solution: "||(3,4)|| = <strong>5</strong>." },
        { id: "m1e5", type: "num", title: "Övning 1.5 – Norm 3D", prompt: "Beräkna ||" + vec([1,"−2",2]) + "||.", answer: 3, hint: "1 + 4 + 4 = 9 → √9.", solution: "||(1,−2,2)|| = <strong>3</strong>." }
      ]
    }
  ]
},
{
  id: "m2",
  title: "2. Skalärprodukt och vinkel mellan vektorer",
  intro: "Skalärprodukten (·) mellan två vektorer ger ett tal – och används bland annat för att räkna ut vinkeln mellan dem.",
  sections: [
    {
      title: "2.1 Skalärprodukten v·w",
      html: "<p>v·w = v₁w₁ + v₂w₂ + … + vₙwₙ. Resultatet är en skalär (ett tal). Vektorerna måste ha samma dimension. Alternativ notation: v<sup>T</sup>w.</p>" + why("Kvadratiska former som töjningsenergin U = ½ u<sup>T</sup>Ku bygger på skalärprodukter."),
      exercises: [
        { id: "m2e1", type: "num", title: "Övning 2.1", prompt: "Beräkna " + vec([1,2]) + " · " + vec([3,4]) + ".", answer: 11, hint: "1·3 + 2·4.", solution: "3 + 8 = <strong>11</strong>." },
        { id: "m2e2", type: "num", title: "Övning 2.2", prompt: "Beräkna " + vec([2,0,1]) + " · " + vec([1,3,2]) + ".", answer: 4, hint: "2·1 + 0·3 + 1·2.", solution: "2 + 0 + 2 = <strong>4</strong>." }
      ]
    },
    {
      title: "2.2 Vinkeln mellan två vektorer – och ortogonalitet",
      html: "<p>cos θ = (v·w) / (||v||·||w||), dvs. θ = arccos( (v·w)/(||v||·||w||) ). Om v·w = 0 är vektorerna <strong>ortogonala</strong> (θ = 90°).</p>" + exmp("Genomgånget exempel", "<p>Vinkeln mellan " + vec([1,0]) + " och " + vec([1,1]) + ": v·w = 1, ||v|| = 1, ||w|| = √2 → cos θ = 1/√2 → θ = <strong>45°</strong>.</p>") + why("Ortogonala baser används i FEM för att dela upp problem i oberoende riktningar."),
      exercises: [
        { id: "m2e3", type: "num", title: "Övning 2.3 – Vinkel", prompt: "Beräkna vinkeln (i grader) mellan " + vec([1,0]) + " och " + vec([0,1]) + ".", answer: 90, hint: "cos θ = 0/(1·1) = 0 → θ = arccos(0).", solution: "θ = <strong>90°</strong>." },
        { id: "m2e4", type: "num", title: "Övning 2.4 – Vinkel i 3D", prompt: "Beräkna vinkeln (i grader) mellan " + vec([1,1,1]) + " och " + vec([1,"−1",0]) + ".", answer: 90, hint: "v·w = 1 − 1 + 0 = 0.", solution: "cos θ = 0 → θ = <strong>90°</strong>." },
        { id: "m2e5", type: "mc", title: "Övning 2.5 – Ortogonalitet", prompt: "Är " + vec([1,2]) + " och " + vec([2,"−1"]) + " ortogonala?", options: ["Ja", "Nej"], answer: 0, hint: "Räkna skalärprodukten – är den 0?", solution: "(1,2)·(2,−1) = 2−2 = 0 → <strong>Ja</strong>." }
      ]
    }
  ]
},
{
  id: "m3",
  title: "3. Kryssprodukt (3D)",
  intro: "Kryssprodukten mellan två vektorer i 3D ger en ny vektor som är vinkelrät mot båda – högerhandsregeln gäller.",
  sections: [
    {
      title: "3.1 Definition av kryssprodukten",
      html: "<p>" + vec(["a₁","a₂","a₃"]) + " × " + vec(["b₁","b₂","b₃"]) + " = " + vec(["a₂b₃ − a₃b₂","a₃b₁ − a₁b₃","a₁b₂ − a₂b₁"]) + ".</p>" + exmp("Exempel", vec([1,0,0]) + " × " + vec([0,1,0]) + " = " + vec([0,0,1]) + " (z-axeln, enligt högerhandsregeln).") + why("Kryssprodukten ger riktningar (normaler) när 2D/3D-element byggs i lokala koordinatsystem."),
      exercises: [
        { id: "m3e1", type: "vec", title: "Övning 3.1", prompt: "Beräkna " + vec([1,0,0]) + " × " + vec([0,1,0]) + ".", answer: [0,0,1], hint: "Komponentvis enligt formeln.", solution: "= <strong>(0, 0, 1)</strong>." },
        { id: "m3e2", type: "vec", title: "Övning 3.2", prompt: "Beräkna " + vec([1,2,3]) + " × " + vec([4,5,6]) + ".", answer: [-3,6,-3], hint: "2·6−3·5 = −3; 3·4−1·6 = 6; 1·5−2·4 = −3.", solution: "= <strong>(−3, 6, −3)</strong>." }
      ]
    },
    {
      title: "3.2 Egenskaper: area och vinkelrät",
      html: "<p>a × a = 0, a × b = −(b × a), och ||a × b|| = arean av parallellogrammet som a och b spänner upp.</p>" + why("Arean ||a×b|| används när man beräknar elementareor i 2D/3D-mesh."),
      exercises: [
        { id: "m3e3", type: "num", title: "Övning 3.3 – Area", prompt: "Beräkna arean av parallellogrammet som " + vec([2,0,0]) + " och " + vec([0,3,0]) + " spänner upp.", answer: 6, hint: "Arean = ||a × b|| = ||(0,0,6)||.", solution: "Arean = <strong>6</strong>." },
        { id: "m3e4", type: "mc", title: "Övning 3.4", prompt: "Vad blir a × a?", options: ["a", "0-vektorn", "−a"], answer: 1, hint: "En vektor är alltid parallell med sig själv.", solution: "a × a = <strong>0-vektorn</strong>." }
      ]
    }
  ]
},
{
  id: "m4",
  title: "4. Matriser: uppbyggnad och transponat",
  intro: "En matris är en rektangulär tabell av tal. I FEM är styvhetsmatrisen K själva hjärtat i hela metoden.",
  sections: [
    {
      title: "4.1 Uppbyggnad och dimension",
      html: "<p>Matris A med m rader och n kolumner har element aᵢⱼ (rad i, kolumn j): " + mat([["a₁₁","a₁₂","…","a₁ₙ"],["a₂₁","a₂₂","…","a₂ₙ"],["⋮","⋮","","⋮"],["aₘ₁","aₘ₂","…","aₘₙ"]]) + ". Dimensionen är m × n.</p>" + why("K är en n×n-matris där n = antalet frihetsgrader i modellen."),
      exercises: [
        { id: "m4e1", type: "mc", title: "Övning 4.1 – Dimension", prompt: "Vad är dimensionen på A = " + mat([[1,2,3,4],[5,6,7,8],[9,10,11,12]]) + "?", options: ["2 × 4", "3 × 4", "4 × 3", "3 × 3"], answer: 1, hint: "Räkna rader × kolumner.", solution: "3 rader, 4 kolumner → <strong>3 × 4</strong>." },
        { id: "m4e2", type: "mc", title: "Övning 4.2 – Element", prompt: "Vilket element är a₂₃ i A = " + mat([[1,2,3],[4,5,6],[7,8,9]]) + "?", options: ["5", "6", "8"], answer: 2, hint: "a₂₃ = rad 2, kolumn 3.", solution: "Rad 2 = (4,5,6), kolumn 3 → <strong>6</strong>." }
      ]
    },
    {
      title: "4.2 Transponat Aᵀ",
      html: "<p>Transponatet byter plats på rader och kolumner: " + mat([[1,2,3],[4,5,6]]) + "<sup>T</sup> = " + mat([[1,4],[2,5],[3,6]]) + ".</p>" + why("Transponatet är centralt i FEM: kraftvektorn fås som f = K·u, och energin skrivs u<sup>T</sup>Ku."),
      exercises: [
        { id: "m4e3", type: "mat", title: "Övning 4.3 – Transponat", prompt: "Beräkna A<sup>T</sup> då A = " + mat([[1,2,3],[4,5,6]]) + ". Fyll i raderna uppifrån.", answer: [[1,4],[2,5],[3,6]], hint: "Första raden (1,2,3) blir första kolumnen.", solution: "A<sup>T</sup> = " + mat([[1,4],[2,5],[3,6]]) + "." }
      ]
    },
    {
      title: "4.3 Speciella matriser: symmetrisk, diagonal, enhetsmatris",
      html: "<p><strong>Symmetrisk:</strong> A = A<sup>T</sup>. <strong>Diagonalmatris:</strong> noll överallt utom diagonalen. <strong>Enhetsmatris I:</strong> ettor på diagonalen: " + mat([[1,0],[0,1]]) + ".</p>" + why("Styvhetsmatrisen K är alltid symmetrisk – det sparar både minne och räknetid i FEM-program."),
      exercises: [
        { id: "m4e4", type: "mc", title: "Övning 4.4 – Symmetri", prompt: "Är A = " + mat([[2,1],[1,3]]) + " symmetrisk?", options: ["Ja, A = Aᵀ", "Nej"], answer: 0, hint: "Jämför A med Aᵀ.", solution: "Aᵀ = " + mat([[2,1],[1,3]]) + " = A → <strong>Ja</strong>." },
        { id: "m4e5", type: "mat", title: "Övning 4.5 – A + Aᵀ", prompt: "Beräkna A + A<sup>T</sup> då A = " + mat([[0,1],[2,0]]) + ".", answer: [[0,3],[3,0]], hint: "Aᵀ = [[0,2],[1,0]]. Addera komponentvis.", solution: "A + Aᵀ = " + mat([[0,3],[3,0]]) + " – alltid symmetrisk!" }
      ]
    }
  ]
},
{
  id: "m5",
  title: "5. Matrisoperationer",
  intro: "Addition, skalning, matris gånger vektor och matris gånger matris. Viktigaste regeln: matrismultiplikation är INTE kommutativ.",
  sections: [
    {
      title: "5.1 Addition och skalning av matriser",
      html: "<p>Komponentvis, precis som för vektorer: (A+B)ᵢⱼ = aᵢⱼ + bᵢⱼ och (cA)ᵢⱼ = c·aᵢⱼ.</p>",
      exercises: [
        { id: "m5e1", type: "mat", title: "Övning 5.1 – Matrisaddition", prompt: "A = " + mat([[1,2],[3,4]]) + ", B = " + mat([[0,1],[1,0]]) + ". Beräkna A + B.", answer: [[1,3],[4,4]], hint: "Addera komponentvis.", solution: "A + B = " + mat([[1,3],[4,4]]) + "." },
        { id: "m5e2", type: "mat", title: "Övning 5.2 – Skalning", prompt: "Beräkna 2·A då A = " + mat([[1,2],[3,4]]) + ".", answer: [[2,4],[6,8]], hint: "Multiplicera varje element med 2.", solution: "2A = " + mat([[2,4],[6,8]]) + "." }
      ]
    },
    {
      title: "5.2 Matris × vektor = vektor",
      html: "<p>Rad i A punktas med vektorn: A = " + mat([["a₁₁","a₁₂"],["a₂₁","a₂₂"]]) + ", v = " + vec(["x₁","x₂"]) + " ger Av = " + vec(["a₁₁x₁+a₁₂x₂","a₂₁x₁+a₂₂x₂"]) + ".</p>" + exmp("Genomgånget exempel", "<p>A = " + mat([[1,2],[3,4]]) + ", v = " + vec([1,1]) + ": rad 1 ger 1+2 = 3, rad 2 ger 3+4 = 7 → Av = " + vec([3,7]) + ".</p>") + why("I FEM är detta själva kraftberäkningen: K·u = f."),
      exercises: [
        { id: "m5e3", type: "vec", title: "Övning 5.3 – Matris × vektor", prompt: "Beräkna A·v då A = " + mat([[1,2],[3,4]]) + " och v = " + vec([1,1]) + ".", answer: [3,7], hint: "Rad 1: 1·1+2·1 = 3. Rad 2: 3·1+4·1 = 7.", solution: "Av = <strong>(3, 7)</strong>." },
        { id: "m5e4", type: "vec", title: "Övning 5.4 – Matris × vektor 2", prompt: "Beräkna A·v då A = " + mat([[2,0],[1,3]]) + " och v = " + vec([2,1]) + ".", answer: [4,5], hint: "Rad 1: 2·2+0·1 = 4. Rad 2: 1·2+3·1 = 5.", solution: "Av = <strong>(4, 5)</strong>." }
      ]
    },
    {
      title: "5.3 Matris × matris – och icke-kommutativitet",
      html: "<p>(AB)ᵢⱼ = rad i i A · kolumn j i B. <strong>OBS: AB ≠ BA i allmänhet!</strong></p>" + why("I FEM assembleras K genom att addera elementmatriser – ordningen på additionen spelar ingen roll, men vid multiplikation är den avgörande."),
      exercises: [
        { id: "m5e5", type: "mat", title: "Övning 5.5 – AB", prompt: "Beräkna A·B då A = " + mat([[1,2],[3,4]]) + " och B = " + mat([[1,0],[0,2]]) + ".", answer: [[1,4],[3,8]], hint: "(AB)₁₁ = 1·1+2·0 = 1; (AB)₁₂ = 1·0+2·2 = 4; (AB)₂₁ = 3·1+4·0 = 3; (AB)₂₂ = 3·0+4·2 = 8.", solution: "AB = " + mat([[1,4],[3,8]]) + "." },
        { id: "m5e6", type: "mat", title: "Övning 5.6 – BA (annan ordning!)", prompt: "Samma A och B. Beräkna nu B·A.", answer: [[1,2],[6,8]], hint: "Nu punktas rader i B med kolumner i A.", solution: "BA = " + mat([[1,2],[6,8]]) + " ≠ AB. <strong>Ej kommutativt!</strong>" }
      ]
    }
  ]
},
{
  id: "m6",
  title: "6. Determinant och invers",
  intro: "Determinanten talar om matrisen är inverterbar. Inversen används för att lösa ekvationssystem: x = A⁻¹b.",
  sections: [
    {
      title: "6.1 Determinant för 2×2",
      html: "<p>det " + mat([["a","b"],["c","d"]]) + " = ad − bc. Om det A = 0 är A <strong>singulär</strong> (ej inverterbar).</p>" + why("En elementstyvhetsmatris har alltid det = 0 – först randvillkoren gör den globala matrisen inverterbar."),
      exercises: [
        { id: "m6e1", type: "num", title: "Övning 6.1", prompt: "Beräkna det " + mat([[3,1],[2,4]]) + ".", answer: 10, hint: "ad − bc = 3·4 − 1·2.", solution: "12 − 2 = <strong>10</strong>." },
        { id: "m6e2", type: "mc", title: "Övning 6.2 – Singulär?", prompt: "Är A = " + mat([[1,2],[2,4]]) + " inverterbar?", options: ["Ja", "Nej, det A = 0"], answer: 1, hint: "Beräkna 1·4 − 2·2.", solution: "det = 4 − 4 = 0 → <strong>Nej</strong>." }
      ]
    },
    {
      title: "6.2 Determinant för 3×3 (Sarrus regel)",
      html: "<p>det " + mat([["a","b","c"],["d","e","f"],["g","h","i"]]) + " = aei + bfg + cdh − ceg − bdi − afh (diagonaler neråt minus diagonaler uppåt).</p>",
      exercises: [
        { id: "m6e3", type: "num", title: "Övning 6.3 – det 3×3", prompt: "Beräkna det " + mat([[1,0,2],[0,1,0],[2,0,1]]) + ".", answer: -3, hint: "Utveckla längs rad 2: det = 1·det[[1,2],[2,1]] = 1−4 = −3.", solution: "det = <strong>−3</strong> ≠ 0 → inverterbar." }
      ]
    },
    {
      title: "6.3 Inversen A⁻¹",
      html: "<p>För 2×2: A⁻¹ = (1/det A)·" + mat([["d","−b"],["−c","a"]]) + ". Alltid gäller A·A⁻¹ = I.</p>" + exmp("Genomgånget exempel", "<p>A = " + mat([[4,2],[1,3]]) + ": det = 10, A⁻¹ = (1/10)·" + mat([[3,"−2"],["−1",4]]) + " = " + mat([[0.3,"−0.2"],["−0.1",0.4]]) + ".</p>"),
      exercises: [
        { id: "m6e4", type: "mat", title: "Övning 6.4 – Invers", prompt: "Beräkna A⁻¹ då A = " + mat([[4,2],[1,3]]) + ". Decimaltal (t.ex. 0.3).", answer: [[0.3,-0.2],[-0.1,0.4]], tol: 0.001, hint: "det = 10; byt plats på a,d; byt tecken på b,c; dividera med 10.", solution: "A⁻¹ = " + mat([[0.3,"−0.2"],["−0.1",0.4]]) + "." },
        { id: "m6e5", type: "mc", title: "Övning 6.5 – Kontroll", prompt: "Om A⁻¹ är rätt ska A·A⁻¹ = I. Vad är (A·A⁻¹)₁₁ för A ovan?", options: ["0", "1", "10"], answer: 1, hint: "Räkna rad 1 i A · kolumn 1 i A⁻¹.", solution: "4·0.3 + 2·(−0.1) = 1.2 − 0.2 = <strong>1</strong> ✓ (enhetsmatrisen)." }
      ]
    }
  ]
},
{
  id: "m7",
  title: "7. Linjära ekvationssystem: Ax = b och Gauss-eliminering",
  intro: "FEM landar alltid i ett ekvationssystem Ku = f. Här lär du dig lösa Ax = b – med inversen, och med Gauss-eliminering som är vad datorn gör för stora system.",
  sections: [
    {
      title: "7.1 Ekvationssystem på matrisform Ax = b",
      html: "<p>Systemet a₁₁x₁ + a₁₂x₂ = b₁, a₂₁x₁ + a₂₂x₂ = b₂ skrivs A·x = b. Om A är inverterbar: x = A⁻¹b.</p>" + why("Hela FEM bygger på att lösa K·u = f. Att förstå Ax = b är kursens viktigaste mattekunskap."),
      exercises: [
        { id: "m7e1", type: "vec", title: "Övning 7.1 – Lös med inversen", prompt: "Lös " + mat([[2,1],[1,3]]) + "·x = " + vec([5,10]) + " (tips: A⁻¹ = (1/5)·[[3,−1],[−1,2]]). Svara (x₁, x₂).", answer: [1,3], hint: "x = A⁻¹b = (1/5)·[[3,−1],[−1,2]]·(5,10)ᵀ.", solution: "x = <strong>(1, 3)</strong>. Kontroll: 2·1+3 = 5 ✓, 1+9 = 10 ✓." }
      ]
    },
    {
      title: "7.2 Gauss-eliminering",
      html: "<p>Radoperationer (byt rader, multiplicera rad, addera multiplar av rader) ger trappstegsform; sedan bakåtsubstitution.</p>" + exmp("Genomgånget exempel", "<p>Lös " + mat([[2,1],[1,3]]) + "·x = " + vec([5,10]) + ": rad 2 − ½·rad 1 ger 2.5·x₂ = 7.5 → x₂ = 3; insatt: 2x₁ + 3 = 5 → x₁ = 1. Svar: x = " + vec([1,3]) + ".</p>") + why("För stora FEM-system (tusentals ekvationer) är Gauss-eliminering (eller varianter) exakt den metod som används numeriskt."),
      exercises: [
        { id: "m7e2", type: "vec", title: "Övning 7.2 – Gauss 2×2", prompt: "Lös med Gauss-eliminering: " + mat([[3,2],[1,2]]) + "·x = " + vec([7,5]) + ".", answer: [1,2], hint: "Eliminera x₁: rad 1 − 3·rad 2 → (−4)·x₂ = −8 → x₂ = 2.", solution: "x = <strong>(1, 2)</strong>. Kontroll: 3+4 = 7 ✓, 1+4 = 5 ✓." }
      ]
    },
    {
      title: "7.3 Större system och entydig lösning",
      html: "<p>För 3×3 (och större) fungerar Gauss på samma sätt. Om det A = 0 saknas entydig lösning – då måste b = 0 för att lösning ska finnas alls (jfr föreläsningen).</p>" + why("Randvillkor i FEM gör just detta: de tar bort de saknade villkoren så att K blir inverterbar och systemet får entydig lösning."),
      exercises: [
        { id: "m7e3", type: "vec", title: "Övning 7.3 – Gauss 3×3", prompt: "Lös " + mat([[1,1,1],[0,2,5],[2,5,"−1"]]) + "·x = " + vec([6,"−4",27]) + ". Svara (x₁, x₂, x₃).", answer: [5,3,-2], hint: "Rad 3 − 2·rad 1 → (0, 3, −3)·x = 15. Lös 2×2-delen för x₂, x₃, sedan x₁.", solution: "x = <strong>(5, 3, −2)</strong>. Kontroll: 5+3−2=6 ✓, 6−10=−4 ✓, 10+15+2=27 ✓." },
        { id: "m7e4", type: "mc", title: "Övning 7.4 – Entydig lösning?", prompt: "Systemet A·x = b med A = " + mat([[1,2],[2,4]]) + ", b = " + vec([1,2]) + ". Vad gäller?", options: ["Exakt en lösning", "Oändligt många lösningar", "Ingen lösning"], answer: 1, hint: "det A = 0 (singulär). Här ligger b i matrisens spann.", solution: "det A = 0 och b ligger i spannet → <strong>oändligt många lösningar</strong>." }
      ]
    }
  ]
},
{
  id: "m8",
  title: "8. Kvadratiska former och positivt definit",
  intro: "En kvadratisk form Q(x) = xᵀAx är ett tal för varje vektor x. Töjningsenergin i FEM är precis en sådan: U = ½ uᵀKu.",
  sections: [
    {
      title: "8.1 Kvadratiska former Q(x) = xᵀAx",
      html: "<p>Q(x) = x<sup>T</sup>Ax = Σᵢ Σⱼ aᵢⱼ xᵢ xⱼ.</p>" + exmp("Genomgånget exempel", "<p>A = " + mat([[2,1],[1,2]]) + ", x = " + vec([1,1]) + ": Ax = " + vec([3,3]) + ", Q = 1·3+1·3 = <strong>6</strong>.</p>"),
      exercises: [
        { id: "m8e1", type: "num", title: "Övning 8.1 – Kvadratisk form", prompt: "Beräkna x<sup>T</sup>Ax då A = " + mat([[2,1],[1,2]]) + " och x = " + vec([1,1]) + ".", answer: 6, hint: "Räkna Ax först, sedan x·(Ax).", solution: "Ax = (3,3) → xᵀAx = <strong>6</strong>." },
        { id: "m8e2", type: "num", title: "Övning 8.2 – Kvadratisk form 2", prompt: "Beräkna x<sup>T</sup>Ax då A = " + mat([[1,0],[0,4]]) + " och x = " + vec([2,1]) + ".", answer: 8, hint: "Ax = (2,4); xᵀAx = 2·2 + 1·4.", solution: "xᵀAx = 4 + 4 = <strong>8</strong>." }
      ]
    },
    {
      title: "8.2 Positivt definit och töjningsenergi",
      html: "<p>A är <strong>positivt definit</strong> om x<sup>T</sup>Ax > 0 för alla x ≠ 0 (då är A inverterbar, med positiva egenvärden). Semi-definit: ≥ 0 (då singulär). Töjningsenergi i FEM: U = ½ u<sup>T</sup>Ku.</p>" + why("Svaren till kursövning 1: elementstyvhetsmatrisen är positivt semidefinit (singulär); efter randvillkor blir K positivt definit."),
      exercises: [
        { id: "m8e3", type: "num", title: "Övning 8.3 – Töjningsenergi", prompt: "U = ½ u<sup>T</sup>Ku. Beräkna U då K = " + mat([[2,"−1"],["−1",2]]) + " och u = " + vec([1,2]) + ".", answer: 3, hint: "Ku = (0,3); uᵀKu = 6; U = 6/2.", solution: "U = <strong>3</strong>." },
        { id: "m8e4", type: "mc", title: "Övning 8.4 – Positivt definit?", prompt: "Är A = " + mat([[2,1],[1,2]]) + " positivt definit?", options: ["Ja", "Nej"], answer: 0, hint: "Egenvärdena är 1 och 3 (nästa modul), eller testa xᵀAx.", solution: "Egenvärden 1, 3 > 0 → <strong>Ja</strong>." }
      ]
    }
  ]
},
{
  id: "m9",
  title: "9. Egenvärden och egenvektorer (översikt)",
  intro: "Ett egenvärde λ med egenvektor v uppfyller Av = λv – matrisen bara sträcker vektorn, utan att vrida den.",
  sections: [
    {
      title: "9.1 Definition och diagonalmatris",
      html: "<p>Av = λv med v ≠ 0. För diagonalmatriser är egenvärdena bara diagonalelementen.</p>" + why("Styvhetsmatrisens egenvärden säger om strukturen är stabil: alla positiva = positivt definit."),
      exercises: [
        { id: "m9e1", type: "vec", title: "Övning 9.1 – Egenvärden", prompt: "Bestäm egenvärdena till " + mat([[2,0],[0,5]]) + ". Sorterade, t.ex. <em>1, 2</em>.", answer: [2,5], hint: "Diagonalelementen.", solution: "λ = <strong>2 och 5</strong>." }
      ]
    },
    {
      title: "9.2 Egenvärden för 2×2-matriser",
      html: "<p>λ fås ur karakteristikekvationen det(A − λI) = 0. Symmetriska matriser har alltid reella egenvärden.</p>" + exmp("Genomgånget exempel", "<p>A = " + mat([[2,1],[1,2]]) + ": det(A−λI) = (2−λ)² − 1 = 0 → λ = <strong>1 och 3</strong>.</p>") + why("Kursövning 1c: efter randvillkor har globala K strikt positiva egenvärden – det är samma sak som positivt definit."),
      exercises: [
        { id: "m9e2", type: "vec", title: "Övning 9.2 – Egenvärden", prompt: "Bestäm egenvärdena till " + mat([[2,1],[1,2]]) + ". Minsta först.", answer: [1,3], hint: "(2−λ)² − 1 = 0.", solution: "λ = <strong>1 och 3</strong> (båda > 0 → positivt definit)." },
        { id: "m9e3", type: "mc", title: "Övning 9.3 – Positivt definit?", prompt: "Är A = " + mat([[1,2],[2,1]]) + " positivt definit?", options: ["Ja", "Nej"], answer: 1, hint: "(1−λ)² − 4 = 0 → λ = 3, −1.", solution: "Egenvärde −1 < 0 → <strong>Nej</strong> (indefinit)." }
      ]
    }
  ]
},
{
  id: "m10",
  title: "10. FEM-kopplingen: styvhetsmatriser, assemblering, randvillkor",
  intro: "Nu använder vi linjär algebra precis som i föreläsning 2–3: fjäderelement, assemblering till en global styvhetsmatris K, randvillkor, och lösning av Ku = f.",
  sections: [
    {
      title: "10.1 Fjäderelementet",
      html: "<p>Fjäderelement mellan nod i och j med konstant k: k<sup>(e)</sup> = k·" + mat([[1,"−1"],["−1",1]]) + " och k<sup>(e)</sup>·u<sup>(e)</sup> = f<sup>(e)</sup>, där u<sup>(e)</sup> = " + vec(["uᵢ","uⱼ"]) + ".</p>" + why("Elementstyvhetsmatrisen är kvadratisk, symmetrisk och singulär (det = 0) – den kopplar frihetsgrader till interna krafter."),
      exercises: [
        { id: "m10e1", type: "mat", title: "Övning 10.1 – Elementstyvhetsmatris", prompt: "Skriv k⁽ᵉ⁾ = k·[[1,−1],[−1,1]] för en fjäder med k = 2000 N/mm.", answer: [[2000,-2000],[-2000,2000]], hint: "Multiplicera varje element med 2000.", solution: "k⁽ᵉ⁾ = " + mat([[2000,"−2000"],["−2000",2000]]) + "." }
      ]
    },
    {
      title: "10.2 Assemblering till global K",
      html: "<p>Lägg in varje elements 2×2-block i K enligt konnektiviteten (vilka noder elementet kopplar).</p>" + exmp("Två fjädrar i serie", "<p>k₁ = k₂ = 1000 mellan nod 1–2–3 ger K = 1000·" + mat([[1,"−1",0],["−1",2,"−1"],[0,"−1",1]]) + ". Symmetrisk, och det K = 0 (stelkroppsrörelse).</p>") + why("Assemblering = matrisaddition av elementbidrag – därför är K symmetrisk när elementen är det."),
      exercises: [
        { id: "m10e2", type: "mat", title: "Övning 10.2 – Assemblera K", prompt: "Två fjädrar k = 1000 mellan nod 1–2 och 2–3. Skriv globala K (3×3).", answer: [[1000,-1000,0],[-1000,2000,-1000],[0,-1000,1000]], hint: "Nod 2 diagonal: 1000+1000 = 2000.", solution: "K = 1000·" + mat([[1,"−1",0],["−1",2,"−1"],[0,"−1",1]]) + "." },
        { id: "m10e3", type: "mc", title: "Övning 10.3 – Singulär?", prompt: "Är K från 10.2 inverterbar innan randvillkor?", options: ["Ja", "Nej, det K = 0 (stelkroppsrörelse)"], answer: 1, hint: "Kan hela kedjan flyttas utan kraft?", solution: "det K = 0 → <strong>singulär</strong>. Randvillkor behövs!" }
      ]
    },
    {
      title: "10.3 Randvillkor och lösning av Ku = f",
      html: "<p>Fasta noder (t.ex. u₁ = 0) stryks ur systemet: lös K<sub>ff</sub>·u<sub>f</sub> = f<sub>f</sub>, räkna sedan reaktionskrafter ur K·u = f.</p>" + why("Detta är hela FEM-proceduren: element → assemblera → randvillkor → lös → reaktionskrafter."),
      exercises: [
        { id: "m10e4", type: "vec", title: "Övning 10.4 – Lös systemet (jfr övning 2)", prompt: "Två fjädrar k = 1000 N/mm, nod 1–2–3. Nod 1 fast. F₂ = 300 N i nod 2, ingen last i nod 3. Beräkna (u₂, u₃) i mm.", answer: [0.3,0.3], tol: 0.001, hint: "1000·[[2,−1],[−1,1]]·[u₂,u₃]ᵀ = [300,0].", solution: "u₂ = u₃ = <strong>0.3 mm</strong>. Reaktionskraft R₁ = 1000·(u₁−u₂) = <strong>−300 N</strong>." },
        { id: "m10e5", type: "num", title: "Övning 10.5 – Reaktionskraft", prompt: "I samma system som 10.4: vad blir reaktionskraften R₁ i nod 1 (N)?", answer: -300, tol: 0.001, hint: "R = K·u − f i den fasta noden: R₁ = 1000·(u₁ − u₂) − 0.", solution: "R₁ = 1000·(0 − 0.3) = <strong>−300 N</strong> (jämvikt: 300 − 300 = 0 ✓)." }
      ]
    },
    {
      title: "10.4 2D-stång: transformation till globala koordinater",
      html: "<p>I lokala koordinater samma som 1D; transformera med T(θ) (rotation). I globala koordinater: k<sup>(e)</sup> = (EA/L)·" + mat([["c²","cs","−c²","−cs"],["cs","s²","−cs","−s²"],["−c²","−cs","c²","cs"],["−cs","−s²","cs","s²"]]) + ", c = cos θ, s = sin θ.</p>" + why("2D-fackverk byggs av sådana stångelement i olika riktningar – transformen vrider varje element rätt."),
      exercises: [
        { id: "m10e6", type: "mat", title: "Övning 10.6 – Vertikal 2D-stång", prompt: "EA/L = 1000, θ = 90° (c = 0, s = 1). Skriv k⁽ᵉ⁾ (4×4).", answer: [[0,0,0,0],[0,1000,0,-1000],[0,0,0,0],[0,-1000,0,1000]], tol: 0.001, hint: "Bara s²-termer blir kvar, skalade med 1000.", solution: "k⁽ᵉ⁾ = 1000·" + mat([[0,0,0,0],[0,1,0,"−1"],[0,0,0,0],[0,"−1",0,1]]) + ". En vertikal stång bär bara kraft i y-led." }
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
