# Linjär algebra för FEM – interaktiv övningssida

Interaktiv, fristående webbsida på svenska för att träna den linjära algebra som behövs i FEM-kursen (MT169A, föreläsningar av Johan Hektor).

## Innehåll

Baserat på föreläsningshandoutsen:

- **Föreläsning 1** (`01_kursinfo+linalg.pdf`): kursinfo + repetition av linjär algebra
- **Föreläsning 2–3** (`02-03_system_av_stänger.pdf`): fjäder-/stångsystem, styvhetsmatriser, assemblering, randvillkor, 2D-transformation
- **Svar på rekommenderade övningsuppgifter**: används som referens/facit (t.ex. en fjäder med k = 2000 N/mm och F = 400 N ger u = 0.2 mm, R = −400 N)

### Moduler

1. Vektorer och längd (norm)
2. Skalärprodukt och vinkel mellan vektorer
3. Kryssprodukt (3D)
4. Matriser: uppbyggnad och transponat
5. Matrisoperationer (matris×vektor, matris×matris, icke-kommutativitet)
6. Determinant och invers
7. Linjära ekvationssystem Ax = b och Gauss-eliminering
8. Kvadratiska former och positivt definit (töjningsenergi U = ½uᵀKu)
9. Egenvärden och egenvektorer
10. FEM-kopplingen: elementstyvhetsmatriser, assemblering, randvillkor, 2D-stång

Varje modul är uppdelad i mindre avsnitt – och **varje avsnitt avslutas med egna övningar** (ledtrådar, facit, direkt rättning), plus genomgångna exempel där det passar. Totalt 27 avsnitt och 47 övningar. Framsteg sparas i webbläsaren (localStorage).

### Fjäderlabbet

Interaktivt 1D-fjädersystem: välj antal element, fjäderkonstanter, noder, laster och fasta noder. Sidan visar steg för steg:

1. Elementstyvhetsmatriserna k⁽ᵉ⁾ = k·[[1,−1],[−1,1]]
2. Den assemblerade globala matrisen K (symmetrisk, singulär, egenvärde ≈ 0 = stelkroppsrörelse)
3. Randvillkor → reducerat system K_ff·u_f = f_f (positivt definit, positiva egenvärden)
4. Lösningen u (Gauss-eliminering)
5. Reaktionskrafter ur K·u = f + jämviktskontroll

## Kör lokalt

Öppna bara `index.html` i en webbläsare – ingen server eller internetanslutning behövs (hela sidan är fristående, ingen externa beroenden).

## Filer

- `index.html` – sidan
- `styles.css` – utseende
- `content.js` – allt innehåll (moduler, teori, exempel, övningar)
- `app.js` – motor: övningsrättning, framsteg, fjäderlabbet (assemblering, Gauss-eliminering, Jacobi-egenvärden)
