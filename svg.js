const SVGNS = 'xmlns="http://www.w3.org/2000/svg"';
const C = { ink: "#1c2333", accent: "#2f6fed", blue2: "#7aa5f8", good: "#178a4c", bad: "#c0392b", warn: "#9a6b00", grid: "#dfe5f0", soft: "#f2f6ff" };

function svgWrap(inner, w, h) {
  return '<svg viewBox="0 0 ' + (w || 420) + " " + (h || 260) + '" ' + SVGNS + ' role="img" style="max-width:100%;height:auto">' + inner + "</svg>";
}
function txt(x, y, s, size, fill, anchor, weight) {
  return '<text x="' + x + '" y="' + y + '" font-size="' + (size || 13) + '" fill="' + (fill || C.ink) + '" text-anchor="' + (anchor || "middle") + '"' + (weight ? ' font-weight="' + weight + '"' : "") + ' font-family="sans-serif">' + s + "</text>";
}
function line(x1, y1, x2, y2, stroke, w, dash) {
  return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + stroke + '" stroke-width="' + (w || 2) + '"' + (dash ? ' stroke-dasharray="' + dash + '"' : "") + "/>";
}
function arrow(x1, y1, x2, y2, stroke, w) {
  return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + stroke + '" stroke-width="' + (w || 3) + '" marker-end="url(#ah)"/>';
}
function rect(x, y, w, h, fill, stroke, rx) {
  return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + fill + '"' + (stroke ? ' stroke="' + stroke + '" stroke-width="1.5"' : "") + (rx ? ' rx="' + rx + '"' : "") + "/>";
}
function circle(x, y, r, fill, stroke) {
  return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + fill + '"' + (stroke ? ' stroke="' + stroke + '" stroke-width="1.5"' : "") + "/>";
}
const AH = '<defs><marker id="ah" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,3 L0,6 Z" fill="' + C.accent + '"/></marker><marker id="ahg" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,3 L0,6 Z" fill="' + C.good + '"/></marker><marker id="ahr" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,3 L0,6 Z" fill="' + C.bad + '"/></marker></defs>';

const ILLUS = {
  koordinater: function () {
    let s = AH;
    for (let i = 1; i <= 5; i++) { line(40 + i * 60, 30, 40 + i * 60, 220, C.grid, 1); line(40, 220 - i * 38, 340, 220 - i * 38, C.grid, 1); }
    s += arrow(40, 220, 360, 220, C.ink, 2) + arrow(40, 220, 40, 20, C.ink, 2);
    s += txt(360, 238, "x") + txt(26, 24, "y") + txt(52, 236, "0");
    s += arrow(40, 220, 40 + 3 * 60, 220 - 4 * 38, C.accent, 4);
    s += circle(40 + 3 * 60, 220 - 4 * 38, 6, C.accent);
    s += txt(40 + 3 * 60, 220 - 4 * 38 - 14, "punkten (3, 4)", 13, C.accent, "middle", 700);
    s += line(40 + 3 * 60, 220, 40 + 3 * 60, 220 - 4 * 38, C.accent, 1.5, "4 4") + line(40, 220 - 4 * 38, 40 + 3 * 60, 220 - 4 * 38, C.accent, 1.5, "4 4");
    s += txt(40 + 3 * 60 + 6, 232, "3 steg åt höger", 11, C.ink, "start") + txt(46, 220 - 2 * 38, "4 steg upp", 11, C.ink, "start");
    return svgWrap(s);
  },
  vektor: function () {
    let s = AH;
    s += rect(0, 0, 420, 260, "#ffffff");
    s += arrow(60, 200, 340, 60, C.accent, 5);
    s += circle(60, 200, 6, C.ink);
    s += txt(60, 222, "start", 12, C.ink) + txt(348, 52, "pilspets", 12, C.accent, "start", 700);
    s += txt(200, 160, "v = (3, 2)", 16, C.accent, "middle", 700);
    s += txt(210, 250, "En vektor är en pil: riktning + längd. (3, 2) = gå 3 höger, 2 upp.", 12, C.ink);
    return svgWrap(s);
  },
  pythagoras: function () {
    let s = AH;
    s += line(70, 200, 310, 200, C.ink, 2) + line(310, 200, 310, 80, C.ink, 2);
    s += arrow(70, 200, 310, 80, C.accent, 4);
    s += txt(190, 218, "3", 14, C.ink) + txt(322, 145, "4", 14, C.ink);
    s += txt(175, 120, "||v|| = 5", 15, C.accent, "middle", 700);
    s += txt(70, 232, "0", 12, C.ink);
    s += txt(210, 52, "Pythagoras: 3² + 4² = 5²  →  ||v|| = √(v₁² + v₂²)", 13, C.ink, "middle", 700);
    return svgWrap(s);
  },
  addition: function () {
    let s = AH;
    s += arrow(50, 210, 230, 210, C.good, 4) + txt(140, 230, "a = (3, 0)", 13, C.good);
    s += arrow(50, 210, 110, 90, C.bad, 4) + txt(52, 80, "b = (1, 2)", 13, C.bad);
    s += line(230, 210, 290, 90, C.good, 2, "5 4") + line(110, 90, 290, 90, C.bad, 2, "5 4");
    s += arrow(50, 210, 290, 90, C.accent, 5) + txt(300, 80, "a + b = (4, 2)", 14, C.accent, "start", 700);
    s += txt(210, 252, "Parallelogramregeln: lägg pilarna efter varandra – diagonalen blir summan.", 12, C.ink);
    return svgWrap(s);
  },
  skalar: function () {
    let s = AH;
    s += arrow(60, 200, 320, 200, C.accent, 4) + txt(330, 204, "v", 15, C.accent, "start", 700);
    s += arrow(60, 200, 260, 90, C.good, 4) + txt(268, 84, "w", 15, C.good, "start", 700);
    s += '<path d="M 130 200 A 70 70 0 0 0 116 156" fill="none" stroke="' + C.warn + '" stroke-width="2"/>';
    s += txt(140, 168, "θ", 16, C.warn, "middle", 700);
    s += txt(210, 245, "cos θ = (v·w) / (||v||·||w||)   –   v·w = v₁w₁ + v₂w₂ + …", 13, C.ink);
    s += txt(210, 40, "Skalärprodukten mäter hur mycket vektorerna ”pekar åt samma håll”.", 12.5, C.ink);
    return svgWrap(s);
  },
  kryss_steg: function () {
    let s = AH;
    s += txt(210, 26, "Varje komponent = ett litet 2×2-determinanttal (”minor”):", 13, C.ink, "middle", 700);
    function minor(x, y, label, a, b, c, d, color) {
      let g = rect(x, y, 92, 74, "#fff", C.grid, 5);
      g += line(x - 5, y, x - 5, y + 74, color, 3) + line(x + 92 + 5 - 4, y, x + 92 + 5 - 4, y + 74, color, 3);
      g += txt(x + 24, y + 30, a, 14, C.ink, "middle") + txt(x + 68, y + 30, b, 14, C.ink, "middle");
      g += txt(x + 24, y + 62, c, 14, C.ink, "middle") + txt(x + 68, y + 62, d, 14, C.ink, "middle");
      g += txt(x + 46, y - 8, label, 13, color, "middle", 700);
      return g;
    }
    s += minor(24, 60, "x-komponent: a₂b₃ − a₃b₂", "a₂","a₃","b₂","b₃", C.accent);
    s += minor(164, 60, "y-komponent: a₃b₁ − a₁b₃", "a₃","a₁","b₃","b₁", C.good);
    s += minor(304, 60, "z-komponent: a₁b₂ − a₂b₁", "a₁","a₂","b₁","b₂", C.bad);
    s += txt(210, 175, "a × b = ( a₂b₃ − a₃b₂ ,  a₃b₁ − a₁b₃ ,  a₁b₂ − a₂b₁ )", 14, C.ink, "middle", 700);
    s += txt(210, 205, "Tips: komponenten som saknas (t.ex. x) räknas ut av de ANDRA två indexen (y och z), i cirkulär ordning 1→2→3.", 11.5, C.ink);
    s += txt(210, 228, "Exempel: (1,2,3) × (4,5,6) → x: 2·6−3·5 = −3,  y: 3·4−1·6 = 6,  z: 1·5−2·4 = −3  →  (−3, 6, −3)", 11.5, C.accent);
    return svgWrap(s, 420, 240);
  },
  kryss: function () {
    let s = AH;
    s += arrow(80, 200, 340, 200, C.ink, 2) + txt(346, 204, "x", 13) + arrow(80, 200, 80, 40, C.ink, 2) + txt(74, 34, "z", 13) + line(80, 200, 200, 250, C.ink, 2) + txt(208, 256, "y", 13);
    s += arrow(80, 200, 250, 160, C.accent, 4) + txt(258, 158, "a (första)", 13, C.accent, "start", 700);
    s += arrow(80, 200, 160, 120, C.good, 4) + txt(146, 110, "b (andra)", 13, C.good);
    s += '<path d="M 215 172 A 90 90 0 0 1 172 132" fill="none" stroke="' + C.warn + '" stroke-width="2" marker-end="url(#ah)" stroke-dasharray="5 4"/>';
    s += txt(228, 140, "sväng från a till b", 10.5, C.warn, "start");
    s += arrow(80, 200, 80, 60, C.bad, 5) + txt(92, 66, "a × b (tummen!)", 13, C.bad, "start", 700);
    s += txt(210, 26, "Högerhandsregeln: fingrar längs a → sväng mot b → tummen = a × b (vinkelrät mot båda).", 11.5, C.ink);
    return svgWrap(s);
  },
  matris: function () {
    let s = AH;
    const x0 = 90, y0 = 40, cw = 55, ch = 42;
    const vals = [["a₁₁","a₁₂","a₁₃"],["a₂₁","a₂₂","a₂₃"],["a₃₁","a₃₂","a₃₃"]];
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
      s += rect(x0 + j * cw, y0 + i * ch, cw - 4, ch - 4, i === j ? C.soft : "#fff", C.grid, 4);
      s += txt(x0 + j * cw + (cw - 4) / 2, y0 + i * ch + 27, vals[i][j], 14, i === j ? C.accent : C.ink);
    }
    s += line(x0 - 6, y0, x0 - 6, y0 + 3 * ch, C.ink, 3) + line(x0 + 3 * cw - 4 + 6, y0, x0 + 3 * cw - 4 + 6, y0 + 3 * ch, C.ink, 3);
    s += arrow(x0, y0 - 14, x0 + 3 * cw - 4, y0 - 14, C.warn, 2) + txt(x0 + 80, y0 - 20, "kolumner", 12, C.warn);
    s += arrow(x0 - 24, y0, x0 - 24, y0 + 3 * ch, C.good, 2) + txt(x0 - 30, y0 + 70, "rader", 12, C.good, "middle");
    s += txt(300, 90, "3 × 3-matris", 15, C.ink, "middle", 700);
    s += txt(300, 115, "aᵢⱼ = elementet på rad i, kolumn j. Diagonalen a₁₁, a₂₂, a₃₃ är markerad.", 11.5, C.ink, "middle");
    s += txt(210, 245, "En matris är en tabell av tal – som ett rutnät där varje ruta har ett namn.", 12.5, C.ink);
    return svgWrap(s);
  },
  transponat: function () {
    let s = AH;
    function grid(x0, vals, hi) {
      let g = "";
      for (let i = 0; i < vals.length; i++) for (let j = 0; j < vals[0].length; j++) {
        g += rect(x0 + j * 46, 60 + i * 40, 42, 36, hi && hi(i, j) ? C.soft : "#fff", C.grid, 4);
        g += txt(x0 + j * 46 + 21, 60 + i * 40 + 24, vals[i][j], 13, C.ink);
      }
      g += line(x0 - 5, 60, x0 - 5, 60 + vals.length * 40, C.ink, 3) + line(x0 + vals[0].length * 46 - 4 + 5, 60, x0 + vals[0].length * 46 - 4 + 5, 60 + vals.length * 40, C.ink, 3);
      return g;
    }
    s += grid(60, [["1","2","3"],["4","5","6"]], (i, j) => true);
    s += txt(60 + 3 * 23, 40, "A", 16, C.ink, "middle", 700);
    s += grid(250, [["1","4"],["2","5"],["3","6"]], () => true);
    s += txt(250 + 23, 40, "Aᵀ", 16, C.ink, "middle", 700);
    s += '<path d="M 205 120 q 20 -30 40 0" fill="none" stroke="' + C.warn + '" stroke-width="2" marker-end="url(#ah)" transform="translate(-8,0)"/>';
    s += txt(210, 160, "rader ↔ kolumner", 12, C.warn);
    s += txt(210, 240, "Transponat: byt plats på rader och kolumner. En 2×3 blir 3×2.", 12.5, C.ink);
    return svgWrap(s);
  },
  matvec: function () {
    let s = AH;
    s += rect(50, 60, 92, 84, "#fff", C.ink, 0) + line(50, 60, 50, 144, C.ink, 3) + line(138, 60, 138, 144, C.ink, 3);
    s += txt(73, 88, "1", 14) + txt(119, 88, "2", 14) + txt(73, 128, "3", 14) + txt(119, 128, "4", 14);
    s += txt(94, 45, "A", 15, C.ink, "middle", 700);
    s += txt(165, 106, "·", 22, C.ink);
    s += line(185, 70, 185, 134, C.ink, 3) + line(225, 70, 225, 134, C.ink, 3);
    s += txt(205, 92, "1", 14) + txt(205, 124, "1", 14);
    s += txt(205, 55, "v", 15, C.ink, "middle", 700);
    s += txt(250, 106, "=", 22, C.ink);
    s += line(270, 70, 270, 134, C.accent, 3) + line(310, 70, 310, 134, C.accent, 3);
    s += txt(290, 92, "3", 14, C.accent, "middle", 700) + txt(290, 124, "7", 14, C.accent, "middle", 700);
    s += txt(290, 55, "Av", 15, C.accent, "middle", 700);
    s += txt(210, 180, "Varje rad i A punktas med v:  rad1·v = 1·1+2·1 = 3,  rad2·v = 3·1+4·1 = 7", 12.5, C.ink);
    s += txt(210, 205, "Matris × vektor = vektor. I FEM:  K·u = f  (styvhet × förskjutning = kraft).", 12.5, C.accent, "middle", 700);
    return svgWrap(s);
  },
  matmat: function () {
    let s = AH;
    s += rect(40, 70, 92, 84, "#fff", C.ink) + line(40, 70, 40, 154, C.ink, 3) + line(128, 70, 128, 154, C.ink, 3);
    s += txt(63, 98, "1", 14) + txt(109, 98, "2", 14) + txt(63, 138, "3", 14) + txt(109, 138, "4", 14);
    s += txt(84, 55, "A", 15, C.ink, "middle", 700);
    s += txt(150, 116, "·", 22);
    s += rect(170, 70, 92, 84, "#fff", C.ink) + line(170, 70, 170, 154, C.ink, 3) + line(258, 70, 258, 154, C.ink, 3);
    s += txt(193, 98, "1", 14) + txt(239, 98, "0", 14) + txt(193, 138, "0", 14) + txt(239, 138, "2", 14);
    s += txt(214, 55, "B", 15, C.ink, "middle", 700);
    s += txt(280, 116, "=", 22);
    s += rect(300, 70, 92, 84, C.soft, C.accent) + line(300, 70, 300, 154, C.accent, 3) + line(388, 70, 388, 154, C.accent, 3);
    s += txt(323, 98, "1", 14, C.accent, "middle", 700) + txt(369, 98, "4", 14, C.accent, "middle", 700) + txt(323, 138, "3", 14, C.accent, "middle", 700) + txt(369, 138, "8", 14, C.accent, "middle", 700);
    s += txt(344, 55, "AB", 15, C.accent, "middle", 700);
    s += txt(210, 185, "(AB)ᵢⱼ = rad i i A · kolumn j i B.  T.ex. (AB)₁₂ = 1·0 + 2·2 = 4.", 12.5, C.ink);
    s += txt(210, 212, "VARNING: AB ≠ BA – ordningen spelar roll! (Här blir BA = [[1,2],[6,8]].)", 12.5, C.bad, "middle", 700);
    return svgWrap(s, 420, 230);
  },
  det: function () {
    let s = AH;
    const x0 = 80, y0 = 60, cw = 60, ch = 46;
    const vals = [["a","b"],["c","d"]];
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
      s += rect(x0 + j * cw, y0 + i * ch, cw - 4, ch - 4, "#fff", C.grid, 4);
      s += txt(x0 + j * cw + (cw - 4) / 2, y0 + i * ch + 29, vals[i][j], 16, C.ink, "middle", 700);
    }
    s += line(x0 - 6, y0, x0 - 6, y0 + 2 * ch, C.ink, 3) + line(x0 + 2 * cw - 4 + 6, y0, x0 + 2 * cw - 4 + 6, y0 + 2 * ch, C.ink, 3);
    s += line(x0 + 8, y0 + 8, x0 + 2 * cw - 16, y0 + 2 * ch - 8, C.good, 3);
    s += line(x0 + 2 * cw - 16, y0 + 8, x0 + 8, y0 + 2 * ch - 8, C.bad, 3);
    s += txt(230, 100, "+ a·d", 15, C.good, "start", 700) + txt(230, 130, "− b·c", 15, C.bad, "start", 700);
    s += txt(210, 185, "det A = ad − bc", 17, C.ink, "middle", 700);
    s += txt(210, 212, "Gröna diagonalen (huvuddiagonalen) minus röda. det = 0 ⇒ singulär (ej inverterbar).", 12, C.ink);
    return svgWrap(s);
  },
  invers: function () {
    let s = AH;
    function m(x, vals, color) {
      let g = line(x, 70, x, 130, color, 3) + line(x + vals[0].length * 50 - 4, 70, x + vals[0].length * 50 - 4, 130, color, 3);
      for (let i = 0; i < vals.length; i++) for (let j = 0; j < vals[0].length; j++) {
        g += txt(x + j * 50 + 21, 100 + i * 0 + (i === 0 ? -8 : 22), vals[i][j], 14, C.ink, "middle");
      }
      return g;
    }
    s += m(50, [["4","2"],["1","3"]], C.ink) + txt(75, 55, "A", 15, C.ink, "middle", 700);
    s += txt(185, 105, "·", 22);
    s += m(205, [["0.3","−0.2"],["−0.1","0.4"]], C.ink) + txt(230, 55, "A⁻¹", 15, C.ink, "middle", 700);
    s += txt(330, 105, "=", 22);
    s += m(350, [["1","0"],["0","1"]], C.accent) + txt(375, 55, "I", 15, C.accent, "middle", 700);
    s += txt(210, 175, "A·A⁻¹ = I (enhetsmatrisen)", 15, C.ink, "middle", 700);
    s += txt(210, 205, "2×2-invers: byt plats på a och d, byt tecken på b och c, dela allt med det A.", 12, C.ink);
    s += txt(210, 228, "Om det A = 0 finns ingen invers!", 12, C.bad, "middle", 700);
    return svgWrap(s, 420, 240);
  },
  gauss: function () {
    let s = AH;
    const rows = [["2","1","|","5"],["1","3","|","10"]];
    const x0 = 40, y0 = 50, cw = 44, ch = 44;
    for (let i = 0; i < 2; i++) for (let j = 0; j < 4; j++) {
      if (rows[i][j] === "|") { s += line(x0 + j * cw + 6, y0 + i * ch, x0 + j * cw + 6, y0 + (i + 1) * ch, C.warn, 2); continue; }
      s += txt(x0 + j * cw + 20, y0 + i * ch + 29, rows[i][j], 15, C.ink, "middle");
    }
    s += txt(210, 40, "2x₁ + x₂ = 5", 13, C.ink, "middle", 700) + txt(210, 190, "x₁ + 3x₂ = 10", 13, C.ink, "middle", 700);
    s += '<path d="M 250 90 q 40 20 0 60" fill="none" stroke="' + C.accent + '" stroke-width="2.5" marker-end="url(#ah)"/>';
    s += txt(285, 125, "radoperationer", 12, C.accent, "start");
    const x1 = 320, y1 = 60;
    const rows2 = [["2","1","|","5"],["0","2.5","|","7.5"]];
    for (let i = 0; i < 2; i++) for (let j = 0; j < 4; j++) {
      if (rows2[i][j] === "|") { s += line(x1 + j * cw + 6, y1 + i * ch, x1 + j * cw + 6, y1 + (i + 1) * ch, C.warn, 2); continue; }
      s += txt(x1 + j * cw + 20, y1 + i * ch + 29, rows2[i][j], 15, i === 1 && j === 0 ? C.good : C.ink, "middle", i === 1 && j === 0 ? 700 : 400);
    }
    s += txt(210, 235, "Trappsteg! Nu bakåtsubstituerar vi: x₂ = 7.5/2.5 = 3, sedan x₁ = 1.", 12.5, C.ink);
    return svgWrap(s, 420, 250);
  },
  axb: function () {
    let s = AH;
    s += rect(60, 50, 110, 70, C.soft, C.accent, 8) + txt(115, 88, "A · x", 18, C.accent, "middle", 700);
    s += txt(195, 92, "=", 24, C.ink);
    s += rect(215, 50, 90, 70, "#e5f6ec", C.good, 8) + txt(260, 88, "b", 20, C.good, "middle", 700);
    s += txt(115, 160, "matris", 12, C.ink) + txt(260, 160, "vektor (hö­gerled)", 12, C.ink);
    s += txt(210, 200, "Ett ekvationssystem = flera linjära ekvationer samtidigt, skrivet kompakt.", 12.5, C.ink);
    s += txt(210, 225, "Om A är inverterbar:  x = A⁻¹·b", 14, C.ink, "middle", 700);
    return svgWrap(s, 420, 240);
  },
  kvadratisk: function () {
    let s = AH;
    s += '<path d="M 60 200 Q 210 20 360 200" fill="none" stroke="' + C.accent + '" stroke-width="4"/>';
    s += arrow(60, 215, 360, 215, C.ink, 2) + txt(368, 219, "x", 13);
    s += arrow(60, 215, 60, 30, C.ink, 2) + txt(52, 26, "U", 13);
    s += circle(210, 111, 5, C.bad) + txt(222, 105, "minimum vid x = 0", 11.5, C.bad, "start");
    s += txt(210, 245, "U(x) = xᵀAx är en ”energiskål”: positivt definit ⇔ U > 0 för alla x ≠ 0.", 12.5, C.ink);
    return svgWrap(s);
  },
  egen: function () {
    let s = AH;
    s += '<ellipse cx="210" cy="120" rx="150" ry="70" fill="none" stroke="' + C.grid + '" stroke-width="2" stroke-dasharray="6 5"/>';
    s += arrow(210, 120, 330, 90, C.ink, 3) + txt(338, 88, "v (egenvektor)", 12.5, C.ink, "start");
    s += arrow(210, 120, 370, 72, C.accent, 5) + txt(378, 66, "Av = λv", 14, C.accent, "start", 700);
    s += txt(210, 200, "Egenvektorn ändrar bara längd (×λ), inte riktning.", 13, C.ink, "middle", 700);
    s += txt(210, 225, "Styvhetsmatrisen K: alla egenvärden > 0 efter randvillkor = stabil struktur.", 12, C.ink);
    return svgWrap(s);
  },
  fjader: function () {
    let s = AH;
    s += rect(30, 60, 24, 140, "#c9d1e0", C.ink, 3);
    for (let i = 0; i < 6; i++) s += line(30, 70 + i * 22, 54, 70 + i * 22, C.ink, 2);
    let x = 54, y = 130;
    for (let i = 0; i < 8; i++) { const nx = x + (i % 2 === 0 ? 18 : 0), ny = y + (i % 2 === 0 ? -14 : 14); s += line(x, y, nx, ny, "#e07b00", 4); x = nx; y = ny; }
    s += line(x, y, 300, 130, "#e07b00", 4);
    s += rect(300, 100, 60, 60, C.soft, C.accent, 6);
    s += arrow(360, 130, 400, 130, C.bad, 4) + txt(398, 118, "F", 15, C.bad, "end", 700);
    s += circle(54, 130, 6, C.ink) + circle(300, 130, 6, C.ink);
    s += txt(54, 185, "nod 1 (fast)", 11.5, C.ink) + txt(300, 185, "nod 2", 11.5, C.ink);
    s += txt(190, 70, "fjäder, konstant k", 12.5, "#e07b00", "middle", 700);
    s += txt(210, 235, "Fjäder: F = k·u.  I FEM blir varje fjäder ett element med egen styvhetsmatris.", 12.5, C.ink);
    return svgWrap(s);
  },
  assemblering: function () {
    let s = AH;
    function block(x0, y0, label, color) {
      let g = rect(x0, y0, 76, 56, "#fff", color, 4);
      g += txt(x0 + 19, y0 + 24, "k", 13, C.ink) + txt(x0 + 57, y0 + 24, "−k", 13, C.ink);
      g += txt(x0 + 19, y0 + 48, "−k", 13, C.ink) + txt(x0 + 57, y0 + 48, "k", 13, C.ink);
      g += txt(x0 + 38, y0 - 8, label, 12, color, "middle", 700);
      return g;
    }
    s += block(40, 40, "element 1", C.accent) + block(40, 110, "element 2", C.good);
    s += '<path d="M 125 70 q 30 10 45 25" fill="none" stroke="' + C.accent + '" stroke-width="2" marker-end="url(#ah)"/>';
    s += '<path d="M 125 140 q 30 -10 45 -25" fill="none" stroke="' + C.good + '" stroke-width="2" marker-end="url(#ahg)"/>';
    const x0 = 200, y0 = 40, cw = 52, ch = 42;
    const K = [["k₁","−k₁","0"],["−k₁","k₁+k₂","−k₂"],["0","−k₂","k₂"]];
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
      const fill = (i === 1 && j === 1) ? "#e5f6ec" : (K[i][j] === "0" ? "#fff" : C.soft);
      s += rect(x0 + j * cw, y0 + i * ch, cw - 4, ch - 4, fill, C.grid, 4);
      s += txt(x0 + j * cw + (cw - 4) / 2, y0 + i * ch + 27, K[i][j], K[i][j] === "0" ? 12 : 12.5, K[i][j] === "0" ? "#9aa3b5" : C.ink, "middle", 700);
    }
    s += line(x0 - 6, y0, x0 - 6, y0 + 3 * ch, C.ink, 3) + line(x0 + 3 * cw + 2, y0, x0 + 3 * cw + 2, y0 + 3 * ch, C.ink, 3);
    s += txt(x0 + 78, y0 - 12, "globala K (3×3)", 13, C.ink, "middle", 700);
    s += txt(210, 220, "Assemblering: varje elements lilla block läggs in i K på rätt plats (rad/kol = nod).", 12, C.ink);
    s += txt(210, 242, "Delade noder adderas: K₂₂ = k₁ + k₂.", 12, C.accent, "middle", 700);
    return svgWrap(s);
  },
  stang2d: function () {
    let s = AH;
    s += arrow(40, 210, 380, 210, C.ink, 2) + txt(388, 214, "x", 13) + arrow(40, 210, 40, 30, C.ink, 2) + txt(34, 24, "y", 13);
    s += line(80, 180, 320, 90, "#e07b00", 8);
    s += circle(80, 180, 7, C.ink) + circle(320, 90, 7, C.ink);
    s += txt(80, 202, "nod i", 12, C.ink) + txt(320, 76, "nod j", 12, C.ink);
    s += line(80, 180, 200, 135, C.accent, 2, "5 4") + arrow(200, 135, 236, 124, C.accent, 2);
    s += txt(222, 122, "x̂ (längs stången)", 11.5, C.accent, "start");
    s += '<path d="M 130 172 A 55 55 0 0 0 118 148" fill="none" stroke="' + C.warn + '" stroke-width="2"/>';
    s += txt(142, 152, "θ", 14, C.warn, "middle", 700);
    s += txt(210, 245, "Lokalt koordinatsystem längs stången vrids med vinkeln θ mot det globala.", 12, C.ink);
    return svgWrap(s);
  },
  femflode: function () {
    let s = AH;
    const steps = ["1. Dela upp i element (mesh)", "2. Elementmatriser k⁽ᵉ⁾", "3. Assemblera → K", "4. Randvillkor", "5. Lös K·u = f", "6. Krafter & kontroll"];
    for (let i = 0; i < steps.length; i++) {
      const x = 20 + (i % 3) * 135, y = 40 + Math.floor(i / 3) * 80;
      s += rect(x, y, 120, 56, i === 4 ? "#e5f6ec" : C.soft, i === 4 ? C.good : C.accent, 8);
      s += txt(x + 60, y + 33, steps[i], 10.5, C.ink, "middle", i === 4 ? 700 : 400);
      if (i % 3 < 2) s += arrow(x + 120, y + 28, x + 133, y + 28, C.ink, 2);
    }
    s += arrow(325, 96, 325, 118, C.ink, 2) + arrow(325, 118, 80, 118, C.ink, 2);
    s += txt(210, 235, "FEM i ett nøtskal – allt bygger på matrisräkning du övat här!", 12.5, C.ink);
    return svgWrap(s);
  },
  brans: function () {
    return '<img src="https://commons.wikimedia.org/wiki/Special:FilePath/RRTrussBridgeSideView.jpg?width=640" alt="Fackverksbro i stål – ett typexempel på vad FEM analyserar" style="max-width:100%;border-radius:10px;border:1px solid var(--line)" loading="lazy"><p style="font-size:0.78rem;color:var(--muted);margin:4px 0 0">Foto: Wikimedia Commons (RRTrussBridgeSideView.jpg). En fackverksbro är uppbyggd av stänger – precis som i föreläsning 2–3.</p>';
  },
  fjaderfoto: function () {
    return '<img src="https://commons.wikimedia.org/wiki/Special:FilePath/Springs_009.jpg?width=640" alt="Spiralfjädrar" style="max-width:100%;border-radius:10px;border:1px solid var(--line)" loading="lazy"><p style="font-size:0.78rem;color:var(--muted);margin:4px 0 0">Foto: Wikimedia Commons (Springs 009.jpg, CC BY-SA). Fjädrar med fjäderkonstant k är grunden i fjäderlabbet.</p>';
  }
};
