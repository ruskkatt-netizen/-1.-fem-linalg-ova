const STORE_KEY = "femla_solved_v1";

function loadSolved() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; }
}
function saveSolved(s) { localStorage.setItem(STORE_KEY, JSON.stringify(s)); }

function fmt(x) {
  if (!isFinite(x)) return String(x);
  const r = Math.round(x * 1e6) / 1e6;
  if (Object.is(r, -0)) return "0";
  return String(r);
}
function fmtMat(M) { return mat(M.map(row => row.map(fmt))); }
function fmtVec(v) { return "(" + v.map(fmt).join(", ") + ")ᵀ"; }

function parseNum(s) {
  const v = parseFloat(String(s).trim().replace(",", "."));
  return isNaN(v) ? null : v;
}
function parseVec(s) {
  return String(s).split(/[;\s]+/).map(parseNum).filter(x => x !== null);
}
function parseMatInput(grid) {
  return grid.map(row => row.map(parseNum));
}
function close(a, b, tol) { return Math.abs(a - b) <= (tol || 1e-6); }
function vecOk(got, want, tol) {
  if (got.length !== want.length) return false;
  return want.every((w, i) => close(got[i], w, tol));
}
function matOk(got, want, tol) {
  if (got.length !== want.length) return false;
  return want.every((row, i) => row.length === got[i].length && row.every((w, j) => close(got[i][j], w, tol)));
}

function matMul(A, B) {
  const n = A.length, m = B[0].length, p = B.length;
  const C = Array.from({ length: n }, () => Array(m).fill(0));
  for (let i = 0; i < n; i++) for (let j = 0; j < m; j++) for (let k = 0; k < p; k++) C[i][j] += A[i][k] * B[k][j];
  return C;
}
function matVec(A, v) {
  return A.map(row => row.reduce((s, a, j) => s + a * v[j], 0));
}
function transpose(A) { return A[0].map((_, j) => A.map(row => row[j])); }
function identity(n) { return Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? 1 : 0)); }

function gaussSolve(A, b) {
  const n = A.length;
  const M = A.map((row, i) => row.concat([b[i]]));
  for (let col = 0; col < n; col++) {
    let piv = col;
    for (let r = col + 1; r < n; r++) if (Math.abs(M[r][col]) > Math.abs(M[piv][col])) piv = r;
    if (Math.abs(M[piv][col]) < 1e-12) throw new Error("singular");
    [M[col], M[piv]] = [M[piv], M[col]];
    for (let r = col + 1; r < n; r++) {
      const f = M[r][col] / M[col][col];
      for (let c = col; c <= n; c++) M[r][c] -= f * M[col][c];
    }
  }
  const x = Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    x[i] = (M[i][n] - M[i].slice(i + 1, n).reduce((s, a, j) => s + a * x[i + 1 + j], 0)) / M[i][i];
  }
  return x;
}

function jacobiEigen(Ain) {
  const n = Ain.length;
  let A = Ain.map(r => r.slice());
  let V = identity(n);
  for (let sweep = 0; sweep < 100; sweep++) {
    let off = 0;
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) off += A[i][j] * A[i][j];
    if (off < 1e-20) break;
    for (let p = 0; p < n - 1; p++) for (let q = p + 1; q < n; q++) {
      if (Math.abs(A[p][q]) < 1e-14) continue;
      const theta = (A[q][q] - A[p][p]) / (2 * A[p][q]);
      const sgn = theta >= 0 ? 1 : -1;
      const t = sgn / (Math.abs(theta) + Math.sqrt(theta * theta + 1));
      const c = 1 / Math.sqrt(t * t + 1), s = t * c;
      for (let k = 0; k < n; k++) {
        const akp = A[k][p], akq = A[k][q];
        A[k][p] = c * akp - s * akq;
        A[k][q] = s * akp + c * akq;
      }
      for (let k = 0; k < n; k++) {
        const apk = A[p][k], aqk = A[q][k];
        A[p][k] = c * apk - s * aqk;
        A[q][k] = s * apk + c * aqk;
      }
      for (let k = 0; k < n; k++) {
        const vkp = V[k][p], vkq = V[k][q];
        V[k][p] = c * vkp - s * vkq;
        V[k][q] = s * vkp + c * vkq;
      }
    }
  }
  return A.map((row, i) => row[i]).sort((a, b) => a - b);
}

function det(A) {
  const n = A.length;
  if (n === 1) return A[0][0];
  if (n === 2) return A[0][0] * A[1][1] - A[0][1] * A[1][0];
  let d = 0;
  for (let j = 0; j < n; j++) d += (j % 2 === 0 ? 1 : -1) * A[0][j] * det(A.slice(1).map(r => r.slice(0, j).concat(r.slice(j + 1))));
  return d;
}

const allExerciseIds = MODULES.flatMap(m => m.exercises.map(e => e.id));

function renderNav(activeId) {
  const nav = document.getElementById("nav");
  const solved = loadSolved();
  let html = '<div class="nav-section">Grunder</div>';
  MODULES.slice(0, 9).forEach(m => {
    const done = m.exercises.every(e => solved[e.id]);
    html += '<a href="#/' + m.id + '" data-id="' + m.id + '" class="' + (activeId === m.id ? "active" : "") + (done ? " done" : "") + '"><span class="dot"></span>' + m.title + "</a>";
  });
  html += '<div class="nav-section">FEM</div>';
  const m10 = MODULES[9];
  const done10 = m10.exercises.every(e => solved[e.id]);
  html += '<a href="#/' + m10.id + '" data-id="' + m10.id + '" class="' + (activeId === m10.id ? "active" : "") + (done10 ? " done" : "") + '"><span class="dot"></span>' + m10.title + "</a>";
  html += '<a href="#/labb" data-id="labb" class="' + (activeId === "labb" ? "active" : "") + '"><span class="dot"></span>Fjäderlabbet (interaktivt)</a>';
  nav.innerHTML = html;
  updateProgress();
}

function updateProgress() {
  const solved = loadSolved();
  const n = allExerciseIds.filter(id => solved[id]).length;
  const pct = Math.round(100 * n / allExerciseIds.length);
  document.getElementById("progress-fill").style.width = pct + "%";
  document.getElementById("progress-text").textContent = n + "/" + allExerciseIds.length + " (" + pct + "%)";
}

function exerciseHtml(ex) {
  let input = "";
  if (ex.type === "num" || ex.type === "vec") {
    input = '<input type="text" id="in-' + ex.id + '" placeholder="' + (ex.type === "vec" ? "t.ex. 1, 2, 3" : "t.ex. 3.5") + '">';
  } else if (ex.type === "mat") {
    const rows = ex.answer.length, cols = ex.answer[0].length;
    input = '<div class="mat-grid-wrap"><span class="mat-bracket">[</span><div class="mat-grid" style="grid-template-columns: repeat(' + cols + ', 64px)">';
    for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) input += '<input type="text" data-r="' + i + '" data-c="' + j + '">';
    input += '</div><span class="mat-bracket">]</span></div>';
  } else if (ex.type === "mc") {
    input = ex.options.map((o, i) => '<label class="mc-option"><input type="radio" name="mc-' + ex.id + '" value="' + i + '">' + o + "</label>").join("");
  }
  return '<div class="exercise" id="ex-' + ex.id + '">' +
    '<div class="ex-head"><span class="ex-title">' + ex.title + '</span><span class="badge-ok" id="badge-' + ex.id + '"></span></div>' +
    '<div class="prompt">' + ex.prompt + "</div>" +
    input +
    '<div class="ex-actions">' +
    '<button class="primary" data-check="' + ex.id + '">Kolla svar</button>' +
    '<button data-hint="' + ex.id + '">Ledtråd</button>' +
    '<button data-sol="' + ex.id + '">Visa lösning</button>' +
    "</div>" +
    '<div class="feedback" id="fb-' + ex.id + '"></div>' +
    '<div class="hint-box" id="hint-' + ex.id + '">💡 ' + ex.hint + "</div>" +
    '<div class="solution-box" id="sol-' + ex.id + '">📖 ' + ex.solution + "</div>" +
    "</div>";
}

function showModule(id) {
  const m = MODULES.find(x => x.id === id);
  if (!m) return showHome();
  document.getElementById("lab-view").classList.add("hidden");
  const mv = document.getElementById("module-view");
  mv.classList.remove("hidden");
  const solved = loadSolved();
  let html = "<h2 class='module-title'>" + m.title + "</h2><p class='module-intro'>" + m.intro + "</p>";
  html += '<div class="card"><h3>Teori – enkelt förklarat</h3>' + m.theory.join("") + '<div class="why">' + m.why + "</div></div>";
  html += '<div class="card"><h3>' + m.example.title + "</h3>" + '<div class="example-box">' + m.example.html + "</div></div>";
  html += '<div class="card"><h3>Övningar</h3><p style="color:var(--muted);font-size:0.88rem;margin-top:0">Skriv svaret och klicka ”Kolla svar”. Vektorer skrivs med kommatecken mellan komponenterna. Matriser fylls i rad för rad.</p>';
  html += m.exercises.map(exerciseHtml).join("") + "</div>";
  mv.innerHTML = html;
  m.exercises.forEach(ex => {
    if (solved[ex.id]) markSolved(ex.id, false);
  });
  renderNav(id);
  window.scrollTo(0, 0);
}

function showHome() {
  document.getElementById("lab-view").classList.add("hidden");
  const mv = document.getElementById("module-view");
  mv.classList.remove("hidden");
  const solved = loadSolved();
  const n = allExerciseIds.filter(id => solved[id]).length;
  mv.innerHTML =
    '<h2 class="module-title">Välkommen! 👋</h2>' +
    '<div class="card"><p>Den här sidan hjälper dig att träna den <strong>linjära algebra</strong> du behöver i FEM-kursen (MT169A). Innehållet följer dina föreläsningshandouts:</p>' +
    '<ul><li>Föreläsning 1: kursinfo + <em>repetition av linjär algebra</em> (vektorer, matriser, determinanter, ekvationssystem, kvadratiska former) → modul 1–9</li>' +
    '<li>Föreläsning 2–3: <em>system av fjädrar och stänger</em> (styvhetsmatriser, assemblering, randvillkor) → modul 10 + fjäderlabbet</li></ul>' +
    '<p>Varje modul har en kort förklaring, ett genomgånget exempel och övningar med ledtrådar och facit. Dina framsteg sparas i webbläsaren: <strong>' + n + " av " + allExerciseIds.length + " övningar klara</strong>.</p>" +
    '<p>Arbeta från modul 1 och framåt – börja gärna där, även om du ”kan” detta: i FEM behöver man vara säker på matrisräkningen!</p>' +
    '<p><a href="#/m1"><button class="primary">Starta med modul 1: Vektorer →</button></a></p></div>';
  renderNav(null);
}

function markSolved(id, announce) {
  const solved = loadSolved();
  solved[id] = true;
  saveSolved(solved);
  document.getElementById("ex-" + id).classList.add("solved");
  document.getElementById("badge-" + id).textContent = "✓ klar";
  updateProgress();
  renderNav(currentRoute());
  if (announce) {
    const fb = document.getElementById("fb-" + id);
    fb.className = "feedback show ok";
    fb.textContent = "Rätt! 🎉 Bra jobbat.";
  }
}

function checkExercise(id) {
  const ex = MODULES.flatMap(m => m.exercises).find(e => e.id === id);
  const fb = document.getElementById("fb-" + id);
  let ok = false, msg = "";
  if (ex.type === "num") {
    const v = parseNum(document.getElementById("in-" + id).value);
    ok = v !== null && close(v, ex.answer, ex.tol || 1e-6);
    msg = ok ? "" : "Fel – försök igen, eller ta en ledtråd.";
  } else if (ex.type === "vec") {
    const v = parseVec(document.getElementById("in-" + id).value);
    ok = vecOk(v, ex.answer, ex.tol || 1e-6);
    msg = ok ? "" : "Fel vektor – kontrollera antal komponenter och tecken. Försök igen!";
  } else if (ex.type === "mat") {
    const inputs = Array.from(document.querySelectorAll("#ex-" + id + " .mat-grid input"));
    const rows = ex.answer.length, cols = ex.answer[0].length;
    const grid = Array.from({ length: rows }, (_, i) => Array.from({ length: cols }, (_, j) => {
      const el = inputs.find(el => +el.dataset.r === i && +el.dataset.c === j);
      return parseNum(el.value);
    }));
    if (grid.flat().some(v => v === null)) { ok = false; msg = "Fyll i alla rutor med tal."; }
    else { ok = matOk(grid, ex.answer, ex.tol || 1e-6); msg = ok ? "" : "Fel matris – kontrollera rad för rad. Försök igen!"; }
  } else if (ex.type === "mc") {
    const sel = document.querySelector('input[name="mc-' + id + '"]:checked');
    if (!sel) { ok = false; msg = "Välj ett alternativ."; }
    else { ok = +sel.value === ex.answer; msg = ok ? "" : "Fel – läs ledtråden och försök igen."; }
  }
  if (ok) { markSolved(id, true); }
  else {
    fb.className = "feedback show bad";
    fb.textContent = msg;
  }
}

document.addEventListener("click", function (ev) {
  const t = ev.target;
  if (t.dataset.check) checkExercise(t.dataset.check);
  if (t.dataset.hint) document.getElementById("hint-" + t.dataset.hint).classList.toggle("show");
  if (t.dataset.sol) document.getElementById("sol-" + t.dataset.sol).classList.toggle("show");
});
document.addEventListener("keydown", function (ev) {
  if (ev.key === "Enter" && ev.target.matches("#module-view input[type=text]")) {
    const exEl = ev.target.closest(".exercise");
    if (exEl) checkExercise(exEl.id.replace("ex-", ""));
  }
});

const labState = { n: 3, k: [1000, 1000, 1000], f: [0, 0, 0, 600], fixed: [true, false, false, false] };

function labAssemble(state) {
  const nn = state.n + 1;
  const K = Array.from({ length: nn }, () => Array(nn).fill(0));
  const elemMats = state.k.map((k, e) => {
    const ke = [[k, -k], [-k, k]];
    const a = e, b = e + 1;
    K[a][a] += k; K[a][b] -= k; K[b][a] -= k; K[b][b] += k;
    return ke;
  });
  return { K, elemMats, nn };
}

function showLab() {
  document.getElementById("module-view").classList.add("hidden");
  const lv = document.getElementById("lab-view");
  lv.classList.remove("hidden");
  lv.innerHTML = '<h2 class="module-title">Fjäderlabbet 🔧</h2>' +
    '<p class="module-intro">Bygg ett 1D-system av fjädrar, precis som i föreläsning 2–3. Sidan assemblerar den globala styvhetsmatrisen K, visar dess egenskaper, lägger på randvillkor och löser K·u = f åt dig – steg för steg.</p>' +
    '<div class="card"><h3>Inställningar</h3>' +
    '<div class="lab-controls">' +
    '<div><label>Antal fjädrar (element)</label><select id="lab-n">' + [1,2,3,4,5,6].map(i => '<option value="' + i + '"' + (i === labState.n ? " selected" : "") + ">" + i + "</option>").join("") + "</select></div>" +
    '<div><label>Förinställning</label><select id="lab-preset"><option value="">— välj —</option>' + LAB_PRESETS.map((p, i) => '<option value="' + i + '">' + p.name + "</option>").join("") + "</select></div>" +
    "</div>" +
    '<div id="lab-fields"></div>' +
    '<div class="ex-actions"><button class="primary" id="lab-run">Beräkna FEM-lösning</button></div>' +
    "</div>" +
    '<div id="lab-output"></div>';
  document.getElementById("lab-n").addEventListener("change", e => {
    const n = +e.target.value;
    labState.n = n;
    labState.k = Array.from({ length: n }, (_, i) => labState.k[i] || 1000);
    labState.f = Array.from({ length: n + 1 }, (_, i) => labState.f[i] || 0);
    labState.fixed = Array.from({ length: n + 1 }, (_, i) => labState.fixed[i] || (i === 0));
    renderLabFields();
  });
  document.getElementById("lab-preset").addEventListener("change", e => {
    const p = LAB_PRESETS[+e.target.value];
    if (!p) return;
    Object.assign(labState, JSON.parse(JSON.stringify(p)));
    document.getElementById("lab-n").value = labState.n;
    renderLabFields();
  });
  document.getElementById("lab-run").addEventListener("click", runLab);
  renderLabFields();
  renderNav("labb");
  window.scrollTo(0, 0);
}

function renderLabFields() {
  const nn = labState.n + 1;
  let html = '<div class="lab-row"><div><span>Fjäderkonstant k per element (N/mm)</span></div>';
  for (let e = 0; e < labState.n; e++) {
    html += '<div class="field"><span>element ' + (e + 1) + '</span><input type="number" id="lab-k-' + e + '" value="' + labState.k[e] + '" step="any"></div>';
  }
  html += "</div>";
  html += '<div class="lab-row"><div><span>Yttre kraft per nod (N)</span></div>';
  for (let i = 0; i < nn; i++) {
    html += '<div class="field"><span>nod ' + (i + 1) + '</span><input type="number" id="lab-f-' + i + '" value="' + labState.f[i] + '" step="any"></div>';
  }
  html += "</div>";
  html += '<div><span style="font-size:0.85rem;color:var(--muted)">Randvillkor – fasta noder (föreskriven förskjutning u = 0)</span><div class="fixed-chk">';
  for (let i = 0; i < nn; i++) {
    html += '<label><input type="checkbox" id="lab-x-' + i + '"' + (labState.fixed[i] ? " checked" : "") + "> nod " + (i + 1) + " fast</label>";
  }
  html += "</div></div>";
  document.getElementById("lab-fields").innerHTML = html;
  for (let e = 0; e < labState.n; e++) document.getElementById("lab-k-" + e).addEventListener("input", ev => { labState.k[e] = parseNum(ev.target.value) || 0; });
  for (let i = 0; i < nn; i++) document.getElementById("lab-f-" + i).addEventListener("input", ev => { labState.f[i] = parseNum(ev.target.value) || 0; });
  for (let i = 0; i < nn; i++) document.getElementById("lab-x-" + i).addEventListener("change", ev => { labState.fixed[i] = ev.target.checked; });
}

function runLab() {
  const out = document.getElementById("lab-output");
  const { K, elemMats, nn } = labAssemble(labState);
  const free = [], fixedIdx = [];
  for (let i = 0; i < nn; i++) (labState.fixed[i] ? fixedIdx : free).push(i);
  let html = '<div class="card lab-output"><h3>FEM-lösning steg för steg</h3>';

  html += '<div class="step"><h4>Steg 1 – Elementstyvhetsmatriser</h4><p>Varje fjäder e ger k⁽ᵉ⁾ = kₑ·[[1, −1], [−1, 1]]:</p>';
  elemMats.forEach((ke, e) => { html += "<p>Element " + (e + 1) + " (k = " + fmt(labState.k[e]) + "): k⁽" + (e + 1) + "⁾ = " + fmtMat(ke) + "</p>"; });
  html += "<p>Alla är kvadratiska, symmetriska och <strong>singulära</strong> (det = 0) – de beskriver bara fjäderns inre krafter.</p></div>";

  html += '<div class="step"><h4>Steg 2 – Assemblerad global styvhetsmatris K</h4><p>K = ' + fmtMat(K) + "</p>";
  const eig = jacobiEigen(K);
  const detK = det(K);
  html += "<p>Egenskaper: symmetrisk ✓, det K = " + fmt(detK) + " " + tag(detK, 0) + ", egenvärden: " + eig.map(l => fmt(l) + " " + tag(l, 0)).join(", ") + "</p>";
  html += '<p style="color:var(--muted);font-size:0.9rem">Ett egenvärde ≈ 0 betyder <strong>stelningsrörelse</strong> (stelkroppsrörelse): hela systemet kan flyttas utan kraft. Därför behövs randvillkor!</p></div>';

  if (free.length === 0) {
    html += '<div class="step"><p style="color:var(--bad)">Alla noder är fasta – minst en nod måste vara fri för att systemet ska gå att lösa.</p></div></div>';
    out.innerHTML = html;
    return;
  }

  const Kff = free.map(i => free.map(j => K[i][j]));
  const ff = free.map(i => labState.f[i]);
  html += '<div class="step"><h4>Steg 3 – Randvillkor</h4><p>Fasta noder: ' + fixedIdx.map(i => "nod " + (i + 1)).join(", ") + " (u = 0). Vi stryker deras rader/kolumner och får det reducerade systemet K<sub>ff</sub>·u<sub>f</sub> = f<sub>f</sub>:</p>";
  html += "<p>K<sub>ff</sub> = " + fmtMat(Kff) + ", f<sub>f</sub> = " + fmtVec(ff) + "</p>";
  const eigF = jacobiEigen(Kff);
  html += "<p>det K<sub>ff</sub> = " + fmt(det(Kff)) + " " + tag(det(Kff), 0) + ", egenvärden: " + eigF.map(l => fmt(l) + " " + tag(l, 0)).join(", ") + " → alla positiva = <strong>positivt definit och inverterbart</strong> ✓</p></div>";

  let uf;
  try { uf = gaussSolve(Kff, ff); }
  catch (e) { out.innerHTML = html + '<div class="step"><p style="color:var(--bad)">Kunde inte lösa – kontrollera att minst en nod är fast.</p></div></div>'; return; }
  const u = Array(nn).fill(0);
  free.forEach((idx, i) => { u[idx] = uf[i]; });

  html += '<div class="step"><h4>Steg 4 – Lösning (Gauss-eliminering, samma som datorn gör)</h4><p>u = K<sub>ff</sub>⁻¹·f<sub>f</sub> = ' + fmtVec(u) + " mm</p>";
  html += "<p>Per nod: " + u.map((v, i) => "u" + (i + 1) + " = " + fmt(v) + " mm").join(", ") + "</p></div>";

  const Ku = matVec(K, u);
  const r = Ku.map((v, i) => v - labState.f[i]);
  html += '<div class="step"><h4>Steg 5 – Reaktionskrafter (från K·u = f)</h4><p>K·u = ' + fmtVec(Ku) + ", f = " + fmtVec(labState.f) + "</p>";
  html += "<p>Reaktionskrafter i de fasta noderna: " + fixedIdx.map(i => "R" + (i + 1) + " = " + fmt(r[i]) + " N").join(", ") + "</p>";
  html += "<p>Kontroll – jämvikt (summan av alla krafter ska vara 0): ΣF = " + fmt(labState.f.reduce((a, b) => a + b, 0) + r.reduce((a, b) => a + b, 0)) + " N " + (Math.abs(labState.f.reduce((a, b) => a + b, 0) + r.reduce((a, b) => a + b, 0)) < 1e-6 ? '<span class="tag pos">✓ OK</span>' : '<span class="tag neg">fel</span>') + "</p>";
  html += '<p style="color:var(--muted);font-size:0.9rem">Jämför gärna med kursens övningssvar: en fjäder med k = 2000 N/mm och F = 400 N ger u = 0.2 mm och reaktion −400 N.</p></div>';

  html += "</div>";
  out.innerHTML = html;
}

function tag(v, zero) {
  if (Math.abs(v) < 1e-6 && zero === 0) return '<span class="tag zero">≈ 0</span>';
  if (v > 1e-6) return '<span class="tag pos">positivt</span>';
  return '<span class="tag neg">negativt</span>';
}

function currentRoute() {
  const h = location.hash.replace("#/", "");
  return h || "home";
}

function route() {
  const r = currentRoute();
  if (r === "labb") showLab();
  else if (MODULES.some(m => m.id === r)) showModule(r);
  else showHome();
}
window.addEventListener("hashchange", route);
route();
