import { StudentJournal } from '../types/learning';
import { CHARACTER_PROFILES, TEXT_EXCERPTS, DILEMMA_CASES, QUIZ_QUESTIONS, NOVEL_CONTEXT, RULE_CLOZE_ITEMS } from '../data/novelData';

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function generateStandaloneHtml(journal?: StudentJournal): string {
  const currentJournal: StudentJournal = journal || {
    reflection1: '',
    reflection2: '',
    reflection3: '',
    drillReactionExperience: '',
    personalObservation: '',
    textNotes: {},
    characterRoleplayNotes: {},
    dilemmaOwnSolutions: {},
    everydayExampleNote: '',
    clozeAnswers: {},
    lastUpdated: new Date().toISOString()
  };

  const initialJson = JSON.stringify(currentJournal).replace(/</g, '\\u003c');

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Die Welle – Macht durch Disziplin | Vollständige Offline-Lernumgebung</title>
  <meta name="description" content="Interaktive Offline-Lernumgebung zum Roman Die Welle von Morton Rhue und dem Leitmotiv Macht durch Disziplin.">
  <style>
    /* CSS Reset & Editorial Theme */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; font-size: 16px; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #f5f5f4;
      color: #1c1917;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    .serif { font-family: Georgia, Cambria, "Times New Roman", Times, serif; }
    .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }

    /* Layout */
    .container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
    header {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(245, 245, 244, 0.95);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid #e7e5e4;
      padding: 0.85rem 1.5rem;
    }
    .header-inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
    .brand { font-weight: 800; font-size: 1.15rem; color: #1c1917; text-decoration: none; }
    .nav-links { display: flex; gap: 1.25rem; align-items: center; }
    .nav-links a { color: #57534e; text-decoration: none; font-size: 0.875rem; font-weight: 500; transition: color 0.15s; }
    .nav-links a:hover { color: #92400e; }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      font-size: 0.85rem;
      font-weight: 600;
      border-radius: 0.5rem;
      border: 1px solid transparent;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.15s ease;
    }
    .btn-primary { background: #92400e; color: #ffffff; }
    .btn-primary:hover { background: #78350f; }
    .btn-secondary { background: #ffffff; color: #1c1917; border-color: #d6d3d1; }
    .btn-secondary:hover { background: #f5f5f4; }
    .btn-dark { background: #1c1917; color: #ffffff; }
    .btn-dark:hover { background: #292524; }
    .btn-success { background: #15803d; color: #ffffff; }

    section { padding: 3rem 0; border-bottom: 1px solid #e7e5e4; }
    .section-kicker { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #92400e; margin-bottom: 0.25rem; }
    .section-title { font-size: 1.85rem; font-weight: 800; color: #1c1917; margin-bottom: 0.75rem; letter-spacing: -0.02em; }
    .section-desc { font-size: 0.95rem; color: #44403c; max-width: 800px; line-height: 1.6; margin-bottom: 2rem; }

    .card {
      background: #ffffff;
      border: 1px solid #e7e5e4;
      border-radius: 0.75rem;
      padding: 1.5rem;
      box-shadow: 0 1px 2px rgba(0,0,0,0.03);
    }
    .card-stone { background: #fafaf9; border: 1px solid #e7e5e4; border-radius: 0.75rem; padding: 1.25rem; }
    .card-accent { background: #ffffff; border: 1px solid rgba(146,64,14,0.3); border-radius: 0.75rem; padding: 1.5rem; }

    .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
    .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; }
    .grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; }

    /* Interactive components */
    textarea {
      width: 100%;
      padding: 0.85rem;
      border-radius: 0.5rem;
      border: 1px solid #d6d3d1;
      background: #fafaf9;
      color: #1c1917;
      font-size: 0.875rem;
      font-family: inherit;
      line-height: 1.5;
      resize: vertical;
      margin-top: 0.5rem;
      transition: all 0.15s;
    }
    textarea:focus { outline: none; background: #ffffff; border-color: #92400e; box-shadow: 0 0 0 2px rgba(146, 64, 14, 0.15); }
    
    .badge {
      display: inline-block;
      font-size: 0.7rem;
      font-weight: 700;
      padding: 0.2rem 0.5rem;
      border-radius: 0.35rem;
      text-transform: uppercase;
    }
    .badge-amber { background: #fef3c7; color: #92400e; }
    .badge-emerald { background: #dcfce7; color: #166534; }
    .badge-sky { background: #e0f2fe; color: #075985; }
    .badge-red { background: #fee2e2; color: #991b1b; }
    .badge-stone { background: #e7e5e4; color: #44403c; }

    /* Stopwatch Drill */
    .timer-display {
      font-size: 3.5rem;
      font-weight: 800;
      color: #1c1917;
      text-align: center;
      padding: 1.5rem;
      background: #fafaf9;
      border-radius: 0.75rem;
      border: 2px dashed #d6d3d1;
      margin: 1.5rem 0;
    }

    /* Print styling */
    @media print {
      body { background: #ffffff; color: #000000; font-size: 12pt; }
      header, .no-print { display: none !important; }
      section { padding: 1.5rem 0; border: none; page-break-inside: avoid; }
      .card { border: 1px solid #666666; box-shadow: none; break-inside: avoid; }
      textarea { border: 1px solid #666666; background: #ffffff; min-height: 80px; }
      .print-only { display: block !important; }
    }
    .print-only { display: none; }
  </style>
</head>
<body>

  <!-- Top Header Navigation -->
  <header class="no-print">
    <div class="header-inner">
      <a href="#hero" class="brand">Die Welle · Macht durch Disziplin</a>
      <nav class="nav-links">
        <a href="#drill">Drill</a>
        <a href="#psychologie">Psychologie</a>
        <a href="#texte">Textstellen</a>
        <a href="#charaktere">Charaktere</a>
        <a href="#dilemmas">Dilemma</a>
        <a href="#reflexion">Lernjournal</a>
      </nav>
      <div style="display:flex; gap:0.5rem;">
        <button onclick="window.print()" class="btn btn-secondary">🖨️ Drucken / PDF</button>
        <button onclick="downloadSelfHtml()" class="btn btn-primary">💾 Als HTML speichern</button>
      </div>
    </div>
  </header>

  <main class="container">
    
    <!-- Hero Section -->
    <section id="hero">
      <div class="section-kicker">Morton Rhue · The Third Wave (1967/1981)</div>
      <h1 class="section-title">„Macht durch Disziplin“ – Das Fundament der Verführung</h1>
      <p class="section-desc serif">
        Alles begann mit einer einfachen Frage einer Geschichtsklasse nach einem Film über den Holocaust: 
        <em>„Warum hat niemand eingegriffen? Wie konnte ein ganzes Volk blind gehorchen?“</em><br>
        Geschichtslehrer Ben Ross demonstriert die Antwort am eigenen Leib: Er beginnt nicht mit Politik, 
        sondern mit einfachen Haltungs- und Disziplinübungen.
      </p>

      <!-- 3 Discipline Rules -->
      <h2 style="font-size:1.15rem; font-weight:700; margin-bottom:1rem;">Die 3 Grundregeln von Herrn Ross am ersten Tag:</h2>
      <div class="grid-3" style="margin-bottom:2rem;">
        ${NOVEL_CONTEXT.disciplineRules.map(r => `
          <div class="card">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
              <span class="badge badge-amber">Regel ${r.nr}</span>
            </div>
            <h3 style="font-size:1rem; font-weight:700; margin-bottom:0.5rem;">${escapeHtml(r.title)}</h3>
            <p style="background:#fafaf9; padding:0.5rem; border-radius:0.35rem; font-size:0.85rem; font-weight:600; margin-bottom:0.5rem;">
              „${escapeHtml(r.rule)}“
            </p>
            <p style="font-size:0.8rem; color:#57534e;">
              <strong>Absicht von Herrn Ross:</strong> ${escapeHtml(r.rationale)}
            </p>
          </div>
        `).join('')}
      </div>

      <!-- Rule Cloze Puzzle -->
      <div class="card-accent" id="cloze-wrapper">
        <h3 style="font-size:1rem; font-weight:800; margin-bottom:0.5rem;">🧩 Mitmach-Rätsel: Baue die Regeln selbst zusammen</h3>
        <p style="font-size:0.85rem; color:#57534e; margin-bottom:1rem;">
          Wähle die passenden Wörter, um die Regeln von Ben Ross wortgetreu zu vervollständigen:
        </p>

        <div style="display:flex; flex-direction:column; gap:1rem;">
          <!-- Rule 1 Puzzle -->
          <div class="card-stone">
            <strong>Regel 1:</strong> Disziplin beginnt mit der 
            <select id="cloze_rule1_0" onchange="checkCloze()">
              <option value="">(Wort wählen)</option>
              <option value="Haltung">Haltung</option>
              <option value="Kleidung">Kleidung</option>
              <option value="Stimmung">Stimmung</option>
            </select>. Beide Füße flach auf den Boden, der Rücken 
            <select id="cloze_rule1_1" onchange="checkCloze()">
              <option value="">(Wort wählen)</option>
              <option value="kerzengerade">kerzengerade</option>
              <option value="bequem angelehnt">bequem angelehnt</option>
              <option value="gekrümmt">gekrümmt</option>
            </select>!
            <span id="cloze_status_1" style="margin-left:0.5rem; font-size:0.8rem; font-weight:700;"></span>
          </div>

          <!-- Rule 2 Puzzle -->
          <div class="card-stone">
            <strong>Regel 2:</strong> Wer sprechen will, muss zügig 
            <select id="cloze_rule2_0" onchange="checkCloze()">
              <option value="">(Wort wählen)</option>
              <option value="rechts">rechts</option>
              <option value="links">links</option>
              <option value="hinter">hinter</option>
            </select> neben seinem Tisch aufstehen und 
            <select id="cloze_rule2_1" onchange="checkCloze()">
              <option value="">(Wort wählen)</option>
              <option value="strammstehen">strammstehen</option>
              <option value="sich verbeugen">sich verbeugen</option>
              <option value="lächeln">lächeln</option>
            </select>!
            <span id="cloze_status_2" style="margin-left:0.5rem; font-size:0.8rem; font-weight:700;"></span>
          </div>

          <!-- Rule 3 Puzzle -->
          <div class="card-stone">
            <strong>Regel 3:</strong> Jede Antwort MUSS mit den Worten 
            <select id="cloze_rule3_0" onchange="checkCloze()">
              <option value="">(Wort wählen)</option>
              <option value="Mr. Ross">Mr. Ross</option>
              <option value="Die Welle">Die Welle</option>
              <option value="Herr Lehrer">Herr Lehrer</option>
            </select> beginnen und 
            <select id="cloze_rule3_1" onchange="checkCloze()">
              <option value="">(Wort wählen)</option>
              <option value="kurz und zackig">kurz und zackig</option>
              <option value="ausführlich">ausführlich</option>
              <option value="leise">leise</option>
            </select> formuliert sein!
            <span id="cloze_status_3" style="margin-left:0.5rem; font-size:0.8rem; font-weight:700;"></span>
          </div>
        </div>
      </div>
    </section>

    <!-- Modul 1: Stopwatch Drill Simulation -->
    <section id="drill">
      <div class="section-kicker">Modul 01 · Selbst ausprobieren</div>
      <h2 class="section-title">Die Stoppuhr-Simulation: Gehorsam im Sekundentakt</h2>
      <p class="section-desc serif">
        Ross steigerte das Tempo so extrem, dass niemand mehr Zeit hatte nachzudenken. 
        Teste selbst: Starte die Stoppuhr und stoppe sie so schnell wie möglich nach der Aufforderung!
      </p>

      <div class="card" style="text-align:center; max-width:600px; margin:0 auto 2rem auto;">
        <div class="badge badge-amber" id="drill-state-badge">Bereit zum Drill</div>
        <div class="timer-display mono" id="timer">00.00 s</div>
        
        <div style="display:flex; justify-content:center; gap:1rem; margin-bottom:1rem;">
          <button id="btn-start" onclick="startDrillTimer()" class="btn btn-primary">Starten (Auf Kommando)</button>
          <button id="btn-stop" onclick="stopDrillTimer()" class="btn btn-dark" disabled>Stoppen!</button>
          <button onclick="resetDrillTimer()" class="btn btn-secondary">Zurücksetzen</button>
        </div>
        <p id="drill-feedback" style="font-size:0.85rem; font-weight:700; color:#92400e; min-height:1.2rem;"></p>
      </div>

      <!-- Student active reflection on drill -->
      <div class="card-accent">
        <h3 style="font-size:1rem; font-weight:700; margin-bottom:0.5rem;">
          ✍️ Mitmach-Aufgabe: Deine Beobachtung zum Drill
        </h3>
        <p style="font-size:0.85rem; color:#57534e;">
          Wie wirkt Hektik und Zeitdruck auf eine Schulklasse? Warum traut man sich bei schnellen Befehlen seltener, Fragen zu stellen?
        </p>
        <textarea id="drillReactionExperience" rows="3" oninput="saveField('drillReactionExperience', this.value)" placeholder="Schreibe hier deine persönliche Beobachtung auf...">${escapeHtml(currentJournal.drillReactionExperience)}</textarea>
      </div>
    </section>

    <!-- Modul 2: Psychology & Spectrum Slider -->
    <section id="psychologie">
      <div class="section-kicker">Modul 02 · Psychologische Mechanismen</div>
      <h2 class="section-title">Wann kippt gesunde Disziplin in Zwang?</h2>
      <p class="section-desc serif">
        Bewege den Schieberegler, um zu sehen, wie der Übergang von freiwilliger Selbstdisziplin zu blindem Gehorsam funktioniert:
      </p>

      <div class="card" style="margin-bottom:2rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
          <label for="psychologySlider" style="font-weight:700; font-size:0.95rem;">Disziplin-Skala:</label>
          <span id="slider-stage-badge" class="badge badge-amber">Stufe 3: Zwang von oben</span>
        </div>
        <input type="range" id="psychologySlider" min="0" max="100" value="65" style="width:100%; height:8px; accent-color:#92400e; cursor:pointer;" oninput="updatePsychologySlider(this.value)">
        <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:#78716c; margin-top:0.5rem;">
          <span>0% · Freiwillig für dich</span>
          <span>50% · Fairplay im Team</span>
          <span>75% · Die Welle</span>
          <span>100% · Blinder Zwang</span>
        </div>

        <div id="slider-content" style="margin-top:1.5rem; padding:1rem; background:#fafaf9; border-radius:0.5rem; border:1px solid #e7e5e4;">
          <!-- Dynamically populated via JS -->
        </div>
      </div>

      <!-- Student active reflection on everyday life -->
      <div class="card-accent">
        <h3 style="font-size:1rem; font-weight:700; margin-bottom:0.5rem;">
          ✍️ Mitmach-Aufgabe: Dein eigenes Beispiel aus dem Alltag
        </h3>
        <p style="font-size:0.85rem; color:#57534e;">
          Kennst du Situationen aus deinem Leben (Sportverein, WhatsApp-Gruppe, Clique, Schule), in denen feste Regeln geholfen haben – oder wo Gruppenzwang plötzlich bedrückend wurde?
        </p>
        <textarea id="everydayExampleNote" rows="3" oninput="saveField('everydayExampleNote', this.value)" placeholder="Beschreibe kurz deine eigene Erfahrung...">${escapeHtml(currentJournal.everydayExampleNote || '')}</textarea>
      </div>
    </section>

    <!-- Modul 3: Text Excerpts -->
    <section id="texte">
      <div class="section-kicker">Modul 03 · Textarbeit am Roman</div>
      <h2 class="section-title">Die entscheidenden Buchstellen analysieren</h2>
      <p class="section-desc serif">
        Lies die vier Schlüsselstellen aus dem Buch und halte deine eigenen Textnotizen fest:
      </p>

      <div class="grid-2">
        ${TEXT_EXCERPTS.map(exc => `
          <div class="card" style="display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
                <span class="badge badge-amber">${escapeHtml(exc.chapter)}</span>
                <span style="font-size:0.75rem; color:#78716c;">Morton Rhue</span>
              </div>
              <h3 style="font-size:1.05rem; font-weight:700; margin-bottom:0.5rem;">${escapeHtml(exc.title)}</h3>
              <p style="font-size:0.8rem; font-style:italic; color:#57534e; margin-bottom:0.75rem; background:#fafaf9; padding:0.5rem; border-radius:0.35rem;">
                ${escapeHtml(exc.context)}
              </p>
              <p class="serif" style="font-size:0.9rem; line-height:1.6; margin-bottom:1rem;">
                ${escapeHtml(exc.germanText)}
              </p>
              <div style="padding:0.6rem; background:#f5f5f4; border-radius:0.35rem; font-size:0.8rem; color:#292524; margin-bottom:1rem;">
                <strong>Kern-Erkenntnis:</strong> ${escapeHtml(exc.keyTakeaway)}
              </div>
            </div>

            <!-- Student Note -->
            <div>
              <label style="font-size:0.75rem; font-weight:700; text-transform:uppercase; color:#78716c;">
                ✍️ Deine Notiz zu dieser Szene:
              </label>
              <textarea id="textNote_${exc.id}" rows="2" oninput="saveTextNote('${exc.id}', this.value)" placeholder="Was fällt dir an dieser Szene auf?">${escapeHtml(currentJournal.textNotes?.[exc.id] || '')}</textarea>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Modul 4: Character Mirror & Roleplay -->
    <section id="charaktere">
      <div class="section-kicker">Modul 04 · Figuren & Perspektiven</div>
      <h2 class="section-title">Der Charakter-Spiegel: Vier Wege in die Welle</h2>
      <p class="section-desc serif">
        Warum machten Robert, Laurie, David und Ben Ross mit? Schlüpfe in ihre Rolle und verfasse jeweils einen kurzen Tagebucheintrag:
      </p>

      <div class="grid-2">
        ${CHARACTER_PROFILES.map(char => `
          <div class="card">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
              <span class="badge badge-stone">${escapeHtml(char.role)}</span>
              <span style="font-size:0.85rem; font-weight:700; color:#1c1917;">${escapeHtml(char.name)}</span>
            </div>
            <p class="serif" style="font-style:italic; font-size:0.9rem; color:#92400e; margin-bottom:0.75rem;">
              ${escapeHtml(char.quote)}
            </p>
            <p style="font-size:0.825rem; color:#44403c; margin-bottom:0.75rem;">
              <strong>Reaktion:</strong> ${escapeHtml(char.reactionToDiscipline)}
            </p>
            <div style="background:#fafaf9; padding:0.6rem; border-radius:0.35rem; font-size:0.8rem; color:#57534e; margin-bottom:1rem;">
              <strong>Warum er/sie so handelte:</strong> ${escapeHtml(char.vulnerabilityFactor)}
            </div>

            <!-- Roleplay Prompt & Input -->
            <div style="padding:0.75rem; background:#fffbeb; border:1px solid #fde68a; border-radius:0.5rem;">
              <label style="font-size:0.8rem; font-weight:700; color:#92400e; display:block; margin-bottom:0.25rem;">
                🎭 Schreibaufgabe (${escapeHtml(char.name)}):
              </label>
              <p style="font-size:0.785rem; color:#78350f; margin-bottom:0.5rem;">
                ${escapeHtml(char.roleplayPrompt || '')}
              </p>
              <textarea id="roleplay_${char.id}" rows="3" oninput="saveRoleplayNote('${char.id}', this.value)" placeholder="Schreibe aus der Ich-Perspektive von ${escapeHtml(char.name)}...">${escapeHtml(currentJournal.characterRoleplayNotes?.[char.id] || '')}</textarea>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Modul 5: Dilemma Cases -->
    <section id="dilemmas">
      <div class="section-kicker">Modul 05 · Heutige Situationen</div>
      <h2 class="section-title">Entscheide selbst: Wo lauert Gruppenzwang heute?</h2>
      <p class="section-desc serif">
        Wie würdest du in diesen Situationen reagieren? Trage für jeden Fall deine eigene faire Lösungsidee ein:
      </p>

      <div class="grid-3">
        ${DILEMMA_CASES.map(dil => `
          <div class="card" style="display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <span class="badge badge-amber" style="margin-bottom:0.5rem;">${escapeHtml(dil.setting)}</span>
              <h3 style="font-size:1rem; font-weight:700; margin-bottom:0.5rem;">${escapeHtml(dil.title)}</h3>
              <p style="font-size:0.85rem; color:#44403c; line-height:1.5; margin-bottom:1rem;">
                ${escapeHtml(dil.description)}
              </p>
            </div>

            <!-- Student Own Solution -->
            <div>
              <label style="font-size:0.75rem; font-weight:700; text-transform:uppercase; color:#78716c;">
                ⚖️ Deine eigene Lösung für diesen Fall:
              </label>
              <textarea id="dilemma_${dil.id}" rows="3" oninput="saveDilemmaSolution('${dil.id}', this.value)" placeholder="Wie hättest du entschieden, ohne jemanden auszuschließen?">${escapeHtml(currentJournal.dilemmaOwnSolutions?.[dil.id] || '')}</textarea>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Modul 6: Quiz & Student Learning Journal -->
    <section id="reflexion">
      <div class="section-kicker">Modul 06 · Wissen & Reflexion</div>
      <h2 class="section-title">Wissens-Check & Dein persönliches Lernjournal</h2>

      <!-- Quiz questions -->
      <div class="card" style="margin-bottom:2rem;">
        <h3 style="font-size:1.15rem; font-weight:700; margin-bottom:1.5rem;">Kurz-Quiz: Hast du die Mechanismen verstanden?</h3>
        ${QUIZ_QUESTIONS.map((q, idx) => `
          <div style="margin-bottom:1.5rem; padding-bottom:1rem; border-bottom:1px solid #f5f5f4;">
            <p style="font-weight:700; font-size:0.9rem; margin-bottom:0.75rem;">
              Frage ${idx + 1}: ${escapeHtml(q.question)}
            </p>
            <div style="display:flex; flex-direction:column; gap:0.4rem;">
              ${q.options.map((opt, optIdx) => `
                <label style="display:flex; align-items:center; gap:0.5rem; font-size:0.85rem; cursor:pointer;">
                  <input type="radio" name="quiz_${q.id}" value="${optIdx}" onchange="checkQuizAnswer('${q.id}', ${optIdx}, ${q.correctIndex})">
                  <span>${escapeHtml(opt)}</span>
                </label>
              `).join('')}
            </div>
            <div id="quiz_feedback_${q.id}" style="margin-top:0.5rem; font-size:0.8rem; font-weight:600;"></div>
          </div>
        `).join('')}
      </div>

      <!-- 3 Key Reflection Questions -->
      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
          <h3 style="font-size:1.15rem; font-weight:700;">Die 3 didaktischen Leitfragen</h3>
          <span style="font-size:0.75rem; color:#78716c;">Wird automatisch im Browser gespeichert</span>
        </div>

        <!-- Question 1 -->
        <div style="margin-bottom:1.5rem;">
          <label style="font-weight:700; font-size:0.9rem; color:#1c1917; display:block; margin-bottom:0.25rem;">
            1. Die Tarnung der Manipulation:
          </label>
          <p style="font-size:0.8rem; color:#57534e; margin-bottom:0.5rem;">
            Warum fiel den Schülern am ersten Tag nicht auf, dass sie manipuliert werden? Welche Rolle spielten Haltung und Stoppuhr?
          </p>
          <textarea id="reflection1" rows="4" oninput="saveField('reflection1', this.value)" placeholder="Formuliere hier deine eigene Begründung...">${escapeHtml(currentJournal.reflection1)}</textarea>
        </div>

        <!-- Question 2 -->
        <div style="margin-bottom:1.5rem;">
          <label style="font-weight:700; font-size:0.9rem; color:#1c1917; display:block; margin-bottom:0.25rem;">
            2. Robert Billings als Schlüsselfigur:
          </label>
          <p style="font-size:0.8rem; color:#57534e; margin-bottom:0.5rem;">
            Warum blühte ausgerechnet der gemobbte Robert unter den neuen Regeln auf? Was sagt das über autoritäre Gruppen aus?
          </p>
          <textarea id="reflection2" rows="4" oninput="saveField('reflection2', this.value)" placeholder="Formuliere hier deine Analyse zu Robert...">${escapeHtml(currentJournal.reflection2)}</textarea>
        </div>

        <!-- Question 3 -->
        <div style="margin-bottom:1.5rem;">
          <label style="font-weight:700; font-size:0.9rem; color:#1c1917; display:block; margin-bottom:0.25rem;">
            3. Der persönliche Grenzverlauf:
          </label>
          <p style="font-size:0.8rem; color:#57534e; margin-bottom:0.5rem;">
            Wo liegt für dich persönlich die Grenze zwischen guter Selbstdisziplin und gefährlicher Fremdbestimmung im Alltag?
          </p>
          <textarea id="reflection3" rows="4" oninput="saveField('reflection3', this.value)" placeholder="Formuliere hier deinen persönlichen Standpunkt...">${escapeHtml(currentJournal.reflection3)}</textarea>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; pt-4 border-top:1px solid #e7e5e4;">
          <button onclick="clearAllEntries()" class="btn btn-secondary" style="color:#ef4444;">Einträge leeren</button>
          <div style="display:flex; gap:0.5rem;">
            <button onclick="window.print()" class="btn btn-secondary">🖨️ Arbeitsblatt drucken</button>
            <button onclick="downloadSelfHtml()" class="btn btn-primary">💾 Als vollständige HTML speichern</button>
          </div>
        </div>
      </div>
    </section>

  </main>

  <footer style="background:#1c1917; color:#a8a29e; padding:2rem 0; margin-top:4rem; text-align:center; font-size:0.85rem;" class="no-print">
    <div class="container">
      <p style="font-weight:700; color:#ffffff; margin-bottom:0.5rem;">Die Welle – Didaktische Lernumgebung zum Motto „Macht durch Disziplin“</p>
      <p style="font-size:0.75rem; color:#78716c;">
        Morton Rhue (1981) · Ron Jones (Cubberley High School 1967) · Vollständig offline-fähige HTML-Datei
      </p>
    </div>
  </footer>

  <!-- STANDALONE JAVASCRIPT CONTROLLER -->
  <script>
    // Initial State & LocalStorage
    const STORAGE_KEY = 'diewelle_offline_journal_v2';
    let appState = ${initialJson};

    // Load from LocalStorage if present
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        appState = { ...appState, ...parsed };
      }
    } catch(e) {}

    // Populate all fields on load
    window.addEventListener('DOMContentLoaded', () => {
      // populate reflections
      ['reflection1', 'reflection2', 'reflection3', 'drillReactionExperience', 'everydayExampleNote'].forEach(k => {
        const el = document.getElementById(k);
        if (el && appState[k]) el.value = appState[k];
      });

      // populate text notes
      if (appState.textNotes) {
        Object.keys(appState.textNotes).forEach(id => {
          const el = document.getElementById('textNote_' + id);
          if (el) el.value = appState.textNotes[id];
        });
      }

      // populate roleplay
      if (appState.characterRoleplayNotes) {
        Object.keys(appState.characterRoleplayNotes).forEach(id => {
          const el = document.getElementById('roleplay_' + id);
          if (el) el.value = appState.characterRoleplayNotes[id];
        });
      }

      // populate dilemma
      if (appState.dilemmaOwnSolutions) {
        Object.keys(appState.dilemmaOwnSolutions).forEach(id => {
          const el = document.getElementById('dilemma_' + id);
          if (el) el.value = appState.dilemmaOwnSolutions[id];
        });
      }

      // Init psychology slider
      updatePsychologySlider(65);
    });

    function saveState() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
      } catch(e) {}
    }

    function saveField(key, val) {
      appState[key] = val;
      saveState();
    }

    function saveTextNote(id, val) {
      if (!appState.textNotes) appState.textNotes = {};
      appState.textNotes[id] = val;
      saveState();
    }

    function saveRoleplayNote(id, val) {
      if (!appState.characterRoleplayNotes) appState.characterRoleplayNotes = {};
      appState.characterRoleplayNotes[id] = val;
      saveState();
    }

    function saveDilemmaSolution(id, val) {
      if (!appState.dilemmaOwnSolutions) appState.dilemmaOwnSolutions = {};
      appState.dilemmaOwnSolutions[id] = val;
      saveState();
    }

    function clearAllEntries() {
      if (confirm('Möchtest du wirklich alle eingetragenen Notizen leeren?')) {
        appState = {
          reflection1: '',
          reflection2: '',
          reflection3: '',
          drillReactionExperience: '',
          textNotes: {},
          characterRoleplayNotes: {},
          dilemmaOwnSolutions: {},
          everydayExampleNote: ''
        };
        saveState();
        location.reload();
      }
    }

    // Stopwatch Drill Implementation
    let drillInterval = null;
    let drillStartMs = 0;

    function startDrillTimer() {
      const btnStart = document.getElementById('btn-start');
      const btnStop = document.getElementById('btn-stop');
      const timerDisplay = document.getElementById('timer');
      const badge = document.getElementById('drill-state-badge');
      const feedback = document.getElementById('drill-feedback');

      btnStart.disabled = true;
      btnStop.disabled = false;
      badge.textContent = 'Achtung... Strammstehen!';
      badge.className = 'badge badge-red';
      feedback.textContent = 'Bereitmachen zum schnellen Stoppen auf Befehl!';

      drillStartMs = Date.now();
      clearInterval(drillInterval);
      drillInterval = setInterval(() => {
        const elapsed = (Date.now() - drillStartMs) / 1000;
        timerDisplay.textContent = elapsed.toFixed(2) + ' s';
      }, 30);
    }

    function stopDrillTimer() {
      clearInterval(drillInterval);
      const btnStart = document.getElementById('btn-start');
      const btnStop = document.getElementById('btn-stop');
      const timerDisplay = document.getElementById('timer');
      const badge = document.getElementById('drill-state-badge');
      const feedback = document.getElementById('drill-feedback');

      btnStart.disabled = false;
      btnStop.disabled = true;

      const elapsed = parseFloat(timerDisplay.textContent);
      badge.textContent = 'Gehalten!';
      badge.className = 'badge badge-emerald';

      if (elapsed < 1.0) {
        feedback.textContent = '⚡ Unglaublich schnell: ' + elapsed + 's! Wie ein perfekt funktionierendes Rädchen im Getriebe.';
      } else if (elapsed < 2.5) {
        feedback.textContent = '✓ Diszipliniert: ' + elapsed + 's. Im Buch brauchte die Klasse 16 Sekunden für 30 Schüler!';
      } else {
        feedback.textContent = 'Herr Ross würde rufen: „Zu langsam! Noch einmal von vorn!“ (' + elapsed + 's)';
      }
    }

    function resetDrillTimer() {
      clearInterval(drillInterval);
      document.getElementById('timer').textContent = '00.00 s';
      document.getElementById('btn-start').disabled = false;
      document.getElementById('btn-stop').disabled = true;
      document.getElementById('drill-state-badge').textContent = 'Bereit zum Drill';
      document.getElementById('drill-state-badge').className = 'badge badge-amber';
      document.getElementById('drill-feedback').textContent = '';
    }

    // Rule Cloze Check
    function checkCloze() {
      const r1_0 = document.getElementById('cloze_rule1_0').value;
      const r1_1 = document.getElementById('cloze_rule1_1').value;
      const s1 = document.getElementById('cloze_status_1');
      if (r1_0 === 'Haltung' && r1_1 === 'kerzengerade') {
        s1.textContent = '✓ Richtig!';
        s1.style.color = '#15803d';
      } else if (r1_0 || r1_1) {
        s1.textContent = 'Prüfen...';
        s1.style.color = '#b45309';
      }

      const r2_0 = document.getElementById('cloze_rule2_0').value;
      const r2_1 = document.getElementById('cloze_rule2_1').value;
      const s2 = document.getElementById('cloze_status_2');
      if (r2_0 === 'rechts' && r2_1 === 'strammstehen') {
        s2.textContent = '✓ Richtig!';
        s2.style.color = '#15803d';
      } else if (r2_0 || r2_1) {
        s2.textContent = 'Prüfen...';
        s2.style.color = '#b45309';
      }

      const r3_0 = document.getElementById('cloze_rule3_0').value;
      const r3_1 = document.getElementById('cloze_rule3_1').value;
      const s3 = document.getElementById('cloze_status_3');
      if (r3_0 === 'Mr. Ross' && r3_1 === 'kurz und zackig') {
        s3.textContent = '✓ Richtig!';
        s3.style.color = '#15803d';
      } else if (r3_0 || r3_1) {
        s3.textContent = 'Prüfen...';
        s3.style.color = '#b45309';
      }
    }

    // Psychology Slider Implementation
    function updatePsychologySlider(val) {
      val = parseInt(val);
      const badge = document.getElementById('slider-stage-badge');
      const box = document.getElementById('slider-content');

      if (val <= 25) {
        badge.textContent = 'Stufe 1: Eigene Disziplin (Freiwillig)';
        badge.className = 'badge badge-emerald';
        box.innerHTML = '<strong>Freiwillig für eigene Ziele:</strong> Du übst ein Instrument oder trainierst fürs Sportabzeichen. Niemand zwingt dich dazu. Du bleibst frei.<br><span style="font-size:0.8rem; color:#57534e;">Im Buch: Laurie Saunders lernt fleißig, denkt aber immer selbstständig nach.</span>';
      } else if (val <= 50) {
        badge.textContent = 'Stufe 2: Feste Regeln im Team (Fairplay)';
        badge.className = 'badge badge-sky';
        box.innerHTML = '<strong>Verlässlichkeit für alle:</strong> Verkehrsregeln oder Schiedsrichter beim Fußball. Regeln schützen die Schwachen und sorgen für Ordnung.<br><span style="font-size:0.8rem; color:#57534e;">Im Buch: David hofft auf mehr Pünktlichkeit beim Football-Training.</span>';
      } else if (val <= 75) {
        badge.textContent = 'Stufe 3: Zwang von oben (Die Welle beginnt)';
        badge.className = 'badge badge-amber';
        box.innerHTML = '<strong>Hier kippt es:</strong> Der Lehrer schreibt Haltung, Wörter und Tempo vor. Eigene Meinungen stören plötzlich die Gruppe.<br><span style="font-size:0.8rem; color:#92400e; font-weight:600;">Gefahr: Wer aufhört Fragen zu stellen, gibt seinen Verstand an die Gruppe ab.</span>';
      } else {
        badge.textContent = 'Stufe 4: Blinder Gehorsam & Drohungen (Gefahr)';
        badge.className = 'badge badge-red';
        box.innerHTML = '<strong>Totale Unterwerfung:</strong> Wer nicht mitmacht, wird bedroht oder verprügelt. Niemand darf mehr widersprechen.<br><span style="font-size:0.8rem; color:#b91c1c; font-weight:700;">Höchste Gefahr: Das eigene Gewissen wird komplett ausgeschaltet.</span>';
      }
    }

    // Quiz Check
    function checkQuizAnswer(questionId, chosenIndex, correctIndex) {
      const fb = document.getElementById('quiz_feedback_' + questionId);
      if (chosenIndex === correctIndex) {
        fb.innerHTML = '<span style="color:#15803d;">✓ Richtig! Sehr gut erkannt.</span>';
      } else {
        fb.innerHTML = '<span style="color:#b91c1c;">✗ Nicht ganz richtig. Lies noch einmal im Textabschnitt nach!</span>';
      }
    }

    // Dynamic Self-Download: Generates an updated HTML file containing current student values in source
    function downloadSelfHtml() {
      // Clone document to update values directly into HTML source
      const docClone = document.documentElement.cloneNode(true);

      // sync all textareas into their innerText in the clone
      const textareas = docClone.querySelectorAll('textarea');
      textareas.forEach(ta => {
        const liveEl = document.getElementById(ta.id);
        if (liveEl) {
          ta.textContent = liveEl.value;
        }
      });

      const fullSource = '<!DOCTYPE html>\\n<html lang="de">\\n' + docClone.innerHTML + '\\n</html>';
      const blob = new Blob([fullSource], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Die_Welle_Lernumgebung_vollstaendig.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  </script>
</body>
</html>`;
}

export function downloadStandaloneHtmlFile(journal?: StudentJournal) {
  const htmlContent = generateStandaloneHtml(journal);
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Die_Welle_Lernumgebung_Macht_durch_Disziplin.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
