import React, { useState } from 'react';
import { CheckCircle2, XCircle, Printer, MessageSquare, BookOpen, PenTool, PenSquare, FileText, ChevronDown, ChevronUp, Check, Award } from 'lucide-react';
import { QUIZ_QUESTIONS, CHARACTER_PROFILES, TEXT_EXCERPTS, DILEMMA_CASES } from '../data/novelData';
import { StudentJournal } from '../types/learning';

interface QuizAndJournalProps {
  journal: StudentJournal;
  onUpdateJournal: (key: keyof StudentJournal, value: string) => void;
  onResetJournal?: () => void;
  onQuizCompleted?: (score: number) => void;
}

export const QuizAndJournal: React.FC<QuizAndJournalProps> = ({
  journal,
  onUpdateJournal,
  onResetJournal
}) => {
  // Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  // Optional thinking impulse hints state
  const [showHint1, setShowHint1] = useState<boolean>(false);
  const [showHint2, setShowHint2] = useState<boolean>(false);
  const [showHint3, setShowHint3] = useState<boolean>(false);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (showResults) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const isAllAnswered = QUIZ_QUESTIONS.every(q => selectedAnswers[q.id] !== undefined);
  const score = calculateScore();

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="reflection" className="py-12 bg-stone-100 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="text-xs font-semibold text-amber-800 tracking-wider uppercase mb-1">
            Modul 06 · Quiz & Dein Lernjournal
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 mb-3">
            Kurz-Quiz & Eigene Gedanken
          </h2>
          <p className="text-sm text-stone-700 font-serif-literary leading-relaxed">
            Teste dein Wissen über das Buch und halte deine eigenen Antworten für den Unterricht fest.
          </p>
        </div>

        {/* Part 1: Interactive Knowledge Quiz */}
        <div className="bg-white border border-stone-200 rounded-xl p-6 lg:p-8 shadow-xs mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4 mb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-800 font-semibold block mb-0.5">
                Teil 1 · Textverständnis
              </span>
              <h3 className="text-xl font-bold text-stone-900">
                Wissens-Check zu „Macht durch Disziplin“
              </h3>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-stone-600 bg-stone-100 px-3 py-1.5 rounded-md">
                Beantwortet: {Object.keys(selectedAnswers).length} / {QUIZ_QUESTIONS.length}
              </span>
              {showResults && (
                <span className="text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300 px-3 py-1.5 rounded-md">
                  Ergebnis: {score} / {QUIZ_QUESTIONS.length} richtig
                </span>
              )}
            </div>
          </div>

          <div className="space-y-8">
            {QUIZ_QUESTIONS.map((q, qIndex) => {
              const userAnswer = selectedAnswers[q.id];
              const isAnswered = userAnswer !== undefined;

              return (
                <div key={q.id} className="pb-6 border-b border-stone-100 last:border-none last:pb-0">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="font-mono text-xs font-bold bg-stone-100 text-stone-700 px-2 py-1 rounded shrink-0">
                      FRAGE {qIndex + 1}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-stone-900 leading-snug">
                      {q.question}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5 ml-0 sm:ml-10">
                    {q.options.map((option, optIdx) => {
                      const isSelected = userAnswer === optIdx;
                      const isCorrect = optIdx === q.correctIndex;

                      let btnStyle = "border-stone-200 bg-white text-stone-800 hover:bg-stone-50";

                      if (showResults) {
                        if (isCorrect) {
                          btnStyle = "border-emerald-600 bg-emerald-50 text-emerald-950 font-medium";
                        } else if (isSelected && !isCorrect) {
                          btnStyle = "border-red-500 bg-red-50 text-red-900";
                        } else {
                          btnStyle = "border-stone-200 bg-stone-50 text-stone-400 opacity-60";
                        }
                      } else if (isSelected) {
                        btnStyle = "border-stone-900 bg-stone-900 text-white font-medium";
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={showResults}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm transition-all cursor-pointer flex items-start gap-3 ${btnStyle}`}
                        >
                          <span className="font-mono text-xs shrink-0 font-bold opacity-75">
                            {String.fromCharCode(65 + optIdx)})
                          </span>
                          <span className="leading-relaxed">{option}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation when results shown */}
                  {showResults && (
                    <div className="mt-4 ml-0 sm:ml-10 p-3.5 bg-stone-50 border border-stone-200 rounded-lg text-xs leading-relaxed text-stone-700 animate-in fade-in">
                      <div className="flex items-center gap-1.5 font-bold mb-1 text-stone-900">
                        {userAnswer === q.correctIndex ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                            <span>Richtig!</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-red-600" />
                            <span>Korrektur & Erklärung:</span>
                          </>
                        )}
                      </div>
                      <p className="font-serif-literary text-stone-600 mb-1">
                        {q.explanation}
                      </p>
                      <span className="text-[10px] font-mono text-stone-400 block">
                        Kontext: {q.sourceContext}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quiz Action Bar */}
          <div className="mt-8 pt-6 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-xs text-stone-500">
              {showResults
                ? "Du kannst das Quiz wiederholen, um dein Wissen zu festigen."
                : isAllAnswered
                ? "Alle Fragen beantwortet! Klicke auf 'Quiz auswerten'."
                : "Wähle für jede Frage eine Antwort aus."}
            </span>

            <div className="flex gap-2">
              {!showResults ? (
                <button
                  disabled={!isAllAnswered}
                  onClick={() => setShowResults(true)}
                  className={`px-5 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    isAllAnswered
                      ? 'bg-amber-800 hover:bg-amber-900 text-white shadow-xs active:scale-98'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  Quiz auswerten
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSelectedAnswers({});
                    setShowResults(false);
                  }}
                  className="px-5 py-2.5 text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 rounded-lg cursor-pointer"
                >
                  Quiz zurücksetzen
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Part 2: Student Learning Journal (Printable / Exportable) */}
        <div className="bg-white border border-stone-200 rounded-xl p-6 lg:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4 mb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-800 font-semibold block mb-0.5">
                Teil 2 · Deine Gedanken
              </span>
              <h3 className="text-xl font-bold text-stone-900">
                Dein persönliches Lernjournal
              </h3>
            </div>

            <div className="flex items-center gap-2">
              {onResetJournal && (
                <button
                  onClick={onResetJournal}
                  className="px-3 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg cursor-pointer transition-colors"
                  title="Alle Einträge im Journal leeren"
                >
                  Einträge leeren
                </button>
              )}
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg cursor-pointer transition-colors"
              >
                <Printer className="w-4 h-4 text-stone-600" />
                <span>Lernzettel drucken</span>
              </button>
            </div>
          </div>

          <p className="text-xs text-stone-600 mb-6 font-serif-literary leading-relaxed">
            Formuliere deine eigenen Argumente zu den 3 didaktischen Kernfragen. 
            Deine Notizen werden automatisch im Browser gespeichert und können für Hausaufgaben, 
            Referate oder Unterrichtsgespräche ausgedruckt werden.
          </p>

          <div className="space-y-6">
            
            {/* Question 1 */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-5">
              <div className="flex items-start justify-between gap-3 mb-1">
                <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                  Leitfrage 1: Die Tarnung der Manipulation
                </label>
                <button
                  type="button"
                  onClick={() => setShowHint1(!showHint1)}
                  className="text-[11px] text-amber-800 hover:text-amber-950 font-medium underline underline-offset-2 cursor-pointer shrink-0"
                >
                  {showHint1 ? 'Denkanstoß verbergen' : 'Denkanstoß einblenden'}
                </button>
              </div>
              <p className="text-xs text-stone-600 font-serif-literary mb-3">
                Warum fiel den Schülern am ersten Tag nicht auf, dass sie manipuliert werden? 
                Welche Rolle spielten die ergonomischen Erklärungen von Ben Ross?
              </p>
              {showHint1 && (
                <div className="mb-3 p-3 bg-amber-50 border border-amber-200/80 rounded-lg text-xs text-amber-950 leading-relaxed font-serif-literary">
                  <strong className="font-sans font-bold text-amber-900 block mb-0.5">Denkimpuls:</strong>
                  Achte darauf, wie Ross physische Fitness und Atmung betont hat, wie der Stoppuhr-Wettlauf die Schüler ablenkte und warum das hohe Tempo wenig Raum für Zweifel ließ.
                </div>
              )}
              <textarea
                value={journal.reflection1}
                onChange={(e) => onUpdateJournal('reflection1', e.target.value)}
                placeholder="Formuliere hier deine eigenen Gedanken und Argumente..."
                rows={4}
                className="w-full text-xs font-serif-literary p-3 rounded-lg border border-stone-300 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
              />
            </div>

            {/* Question 2 */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-5">
              <div className="flex items-start justify-between gap-3 mb-1">
                <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                  Leitfrage 2: Robert Billings als Schlüsselfigur
                </label>
                <button
                  type="button"
                  onClick={() => setShowHint2(!showHint2)}
                  className="text-[11px] text-amber-800 hover:text-amber-950 font-medium underline underline-offset-2 cursor-pointer shrink-0"
                >
                  {showHint2 ? 'Denkanstoß verbergen' : 'Denkanstoß einblenden'}
                </button>
              </div>
              <p className="text-xs text-stone-600 font-serif-literary mb-3">
                Warum blühte ausgerechnet der gemobbte Robert Billings unter den neuen Disziplin-Regeln auf? 
                Was sagt das über die Anziehungskraft autoritärer Systeme auf Benachteiligte aus?
              </p>
              {showHint2 && (
                <div className="mb-3 p-3 bg-amber-50 border border-amber-200/80 rounded-lg text-xs text-amber-950 leading-relaxed font-serif-literary">
                  <strong className="font-sans font-bold text-amber-900 block mb-0.5">Denkimpuls:</strong>
                  Berücksichtige Roberts bisherigen Außenseiter-Status vor dem Experiment, die Schutzwirkung gleicher Verhaltensregeln für alle und sein Bedürfnis nach Anerkennung.
                </div>
              )}
              <textarea
                value={journal.reflection2}
                onChange={(e) => onUpdateJournal('reflection2', e.target.value)}
                placeholder="Formuliere hier deine eigene Analyse zu Roberts Motivation..."
                rows={4}
                className="w-full text-xs font-serif-literary p-3 rounded-lg border border-stone-300 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
              />
            </div>

            {/* Question 3 */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-5">
              <div className="flex items-start justify-between gap-3 mb-1">
                <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                  Leitfrage 3: Der persönliche Grenzverlauf
                </label>
                <button
                  type="button"
                  onClick={() => setShowHint3(!showHint3)}
                  className="text-[11px] text-amber-800 hover:text-amber-950 font-medium underline underline-offset-2 cursor-pointer shrink-0"
                >
                  {showHint3 ? 'Denkanstoß verbergen' : 'Denkanstoß einblenden'}
                </button>
              </div>
              <p className="text-xs text-stone-600 font-serif-literary mb-3">
                Wo liegt für dich persönlich die Grenze zwischen nützlicher Selbstdisziplin (z.B. Sport, Lernen) 
                und gefährlicher Fremdbestimmung? Woran erkennst du den Kipppunkt im Alltag?
              </p>
              {showHint3 && (
                <div className="mb-3 p-3 bg-amber-50 border border-amber-200/80 rounded-lg text-xs text-amber-950 leading-relaxed font-serif-literary">
                  <strong className="font-sans font-bold text-amber-900 block mb-0.5">Denkimpuls:</strong>
                  Überlege, wer die Regeln bestimmt, ob Zweifel und Kritik erlaubt bleiben oder ob Andersdenkende sanktioniert und ausgegrenzt werden.
                </div>
              )}
              <textarea
                value={journal.reflection3}
                onChange={(e) => onUpdateJournal('reflection3', e.target.value)}
                placeholder="Beschreibe hier deinen persönlichen Standpunkt und eigene Kriterien..."
                rows={4}
                className="w-full text-xs font-serif-literary p-3 rounded-lg border border-stone-300 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
              />
            </div>

          </div>

          {/* Additional Student Notes from all interactive modules */}
          <div className="mt-8 pt-6 border-t border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-800" />
                <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                  Deine weiteren Einträge aus den Modulen
                </h4>
              </div>
              <span className="text-xs text-stone-500 font-mono">
                Automatisch mitgespeichert
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Drill observation */}
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-amber-800" />
                    Stoppuhr-Simulation
                  </span>
                  {journal.drillReactionExperience?.trim() && (
                    <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                      Erfasst
                    </span>
                  )}
                </div>
                <p className="text-xs font-serif-literary text-stone-700 italic leading-relaxed">
                  {journal.drillReactionExperience?.trim() || "Noch keine eigene Beobachtung in Modul 01 eingetragen."}
                </p>
              </div>

              {/* Everyday example */}
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-800" />
                    Eigenes Alltagsbeispiel
                  </span>
                  {journal.everydayExampleNote?.trim() && (
                    <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                      Erfasst
                    </span>
                  )}
                </div>
                <p className="text-xs font-serif-literary text-stone-700 italic leading-relaxed">
                  {journal.everydayExampleNote?.trim() || "Noch kein Alltagsbeispiel in Modul 02 eingetragen."}
                </p>
              </div>
            </div>

            {/* Character Roleplay entries */}
            <div className="mb-6 p-4 bg-stone-50 border border-stone-200 rounded-xl">
              <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                <PenTool className="w-3.5 h-3.5 text-amber-800" />
                <span>Rollen-Tagebucheinträge (Modul 04):</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CHARACTER_PROFILES.map((char) => {
                  const entry = journal.characterRoleplayNotes?.[char.id] || "";
                  return (
                    <div key={char.id} className="p-3 bg-white border border-stone-200 rounded-lg">
                      <span className="text-[11px] font-bold text-stone-900 block mb-1">
                        Rolle: {char.name}
                      </span>
                      <p className="text-xs font-serif-literary text-stone-700 italic line-clamp-3">
                        {entry.trim() ? entry : "Noch kein Eintrag geschrieben."}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Text Excerpts & Dilemmas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Text Notes */}
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl">
                <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
                  Notizen zu Romanstellen (Modul 03):
                </span>
                <div className="space-y-2">
                  {TEXT_EXCERPTS.map((exc) => {
                    const note = journal.textNotes?.[exc.id] || "";
                    return (
                      <div key={exc.id} className="text-xs">
                        <strong className="text-stone-800">{exc.chapter}:</strong>{" "}
                        <span className="font-serif-literary italic text-stone-600">
                          {note.trim() ? note : "Keine Notiz"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dilemma Solutions */}
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl">
                <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                  <PenSquare className="w-3.5 h-3.5 text-amber-800" />
                  Eigene Dilemma-Lösungen (Modul 05):
                </span>
                <div className="space-y-2">
                  {DILEMMA_CASES.map((dil) => {
                    const sol = journal.dilemmaOwnSolutions?.[dil.id] || "";
                    return (
                      <div key={dil.id} className="text-xs">
                        <strong className="text-stone-800">{dil.title}:</strong>{" "}
                        <span className="font-serif-literary italic text-stone-600">
                          {sol.trim() ? sol : "Keine eigene Lösung eingetragen"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Teacher / Class Debate Cards */}
          <div className="mt-8 pt-6 border-t border-stone-200">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-4 h-4 text-amber-800" />
              <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                Themen für eine Diskussion in der Klasse
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg">
                <span className="text-xs font-bold text-amber-900 block mb-1">
                  These A: „Schulen brauchen heute wieder viel strengere Regeln.“
                </span>
                <p className="text-xs text-stone-600 font-serif-literary leading-relaxed">
                  Befürworter sagen: Ohne Ruhe und gegenseitigen Respekt kann niemand lernen. 
                  Gegner sagen: Zu viel Strenge macht Angst und nimmt Schülern die Freude am Unterricht.
                </p>
              </div>

              <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg">
                <span className="text-xs font-bold text-amber-900 block mb-1">
                  These B: „Ist es einfacher mitzulaufen, als eine eigene Meinung zu haben?“
                </span>
                <p className="text-xs text-stone-600 font-serif-literary leading-relaxed">
                  Warum fällt es so vielen Menschen schwer, der Gruppe zu widersprechen, 
                  und warum wünschen sich manche Jugendliche feste Anführer, die alle Entscheidungen abnehmen?
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* PRINT-ONLY COMPILATION SHEET FOR STUDENTS AND TEACHERS */}
      <div className="hidden print:block p-8 bg-white text-black font-serif-literary text-sm">
        <div className="border-b-2 border-black pb-4 mb-6">
          <h1 className="text-2xl font-bold font-sans">Lernjournal: Die Welle – Macht durch Disziplin</h1>
          <p className="text-xs text-stone-600 mt-1">
            Schüler-Arbeitsblatt und persönliche Dokumentation · Morton Rhue / Ron Jones (1967)
          </p>
          <div className="flex justify-between text-xs mt-3 pt-2 border-t border-stone-300">
            <span>Name: ____________________________________</span>
            <span>Klasse: ____________</span>
            <span>Datum: {new Date().toLocaleDateString('de-DE')}</span>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-base font-bold font-sans uppercase mb-1">1. Leitfrage: Die Tarnung der Manipulation</h2>
            <p className="text-xs italic text-stone-600 mb-2">Warum fiel den Schülern am ersten Tag nicht auf, dass sie manipuliert werden?</p>
            <div className="p-3 border border-stone-400 min-h-[70px] whitespace-pre-wrap">
              {journal.reflection1 || "(Keine Antwort eingetragen)"}
            </div>
          </div>

          <div>
            <h2 className="text-base font-bold font-sans uppercase mb-1">2. Leitfrage: Robert Billings als Schlüsselfigur</h2>
            <p className="text-xs italic text-stone-600 mb-2">Warum blühte ausgerechnet Robert Billings unter den Regeln auf?</p>
            <div className="p-3 border border-stone-400 min-h-[70px] whitespace-pre-wrap">
              {journal.reflection2 || "(Keine Antwort eingetragen)"}
            </div>
          </div>

          <div>
            <h2 className="text-base font-bold font-sans uppercase mb-1">3. Leitfrage: Der persönliche Grenzverlauf</h2>
            <p className="text-xs italic text-stone-600 mb-2">Wo liegt deine Grenze zwischen Selbstdisziplin und Fremdbestimmung?</p>
            <div className="p-3 border border-stone-400 min-h-[70px] whitespace-pre-wrap">
              {journal.reflection3 || "(Keine Antwort eingetragen)"}
            </div>
          </div>

          <div>
            <h2 className="text-base font-bold font-sans uppercase mb-1">4. Beobachtung aus der Stoppuhr-Simulation</h2>
            <div className="p-3 border border-stone-400 min-h-[50px] whitespace-pre-wrap">
              {journal.drillReactionExperience || "(Keine Beobachtung eingetragen)"}
            </div>
          </div>

          <div>
            <h2 className="text-base font-bold font-sans uppercase mb-1">5. Eigenes Beispiel aus dem Alltag</h2>
            <div className="p-3 border border-stone-400 min-h-[50px] whitespace-pre-wrap">
              {journal.everydayExampleNote || "(Kein Beispiel eingetragen)"}
            </div>
          </div>

          <div>
            <h2 className="text-base font-bold font-sans uppercase mb-1">6. Rollen-Tagebucheinträge</h2>
            <div className="space-y-2">
              {CHARACTER_PROFILES.map(char => (
                <div key={char.id} className="p-2 border border-stone-300">
                  <strong className="block text-xs font-sans">{char.name}:</strong>
                  <div className="text-xs whitespace-pre-wrap">
                    {journal.characterRoleplayNotes?.[char.id] || "(Kein Eintrag)"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
