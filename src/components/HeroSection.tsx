import React, { useState } from 'react';
import { ArrowRight, Clock, ShieldAlert, Award, Compass, Puzzle, CheckCircle2, RotateCcw } from 'lucide-react';
import { NOVEL_CONTEXT, RULE_CLOZE_ITEMS } from '../data/novelData';

interface HeroSectionProps {
  onStartDrill: () => void;
  onExplorePsychology: () => void;
  clozeAnswers?: Record<string, string>;
  onUpdateClozeAnswer?: (key: string, val: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartDrill,
  onExplorePsychology,
  clozeAnswers = {},
  onUpdateClozeAnswer
}) => {
  const [activeClozeIndex, setActiveClozeIndex] = useState<number>(0);
  return (
    <section className="border-b border-stone-200 bg-stone-100">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        {/* Two-column Hero split with balanced heights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Context, Big Question, Mottos */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Unboxed editorial metadata */}
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-3 tracking-wide">
                <span>Morton Rhue</span>
                <span aria-hidden="true">·</span>
                <span>Die Welle (1981)</span>
                <span aria-hidden="true">·</span>
                <span>The Third Wave (1967)</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-[1.15] text-balance mb-5">
                „Macht durch Disziplin“ – Das Fundament der Verführung
              </h1>

              <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-serif-literary mb-6">
                Alles begann mit einer einfachen Frage seiner Geschichtsklasse nach einem Dokumentarfilm über den Holocaust: 
                <span className="italic block mt-1 text-stone-900">
                  „Warum hat niemand eingegriffen? Wie konnte eine ganze Bevölkerung Hitler folgen und behaupten, nichts gewusst zu haben?“
                </span>
              </p>

              <p className="text-sm text-stone-600 leading-relaxed mb-6">
                Ben Ross fand in den Büchern keine einfache Antwort. Statt lange Vorträge zu halten, 
                startete er ein Experiment mit seiner eigenen Klasse. Am ersten Tag schrieb er vier Worte an die Tafel: 
                <strong className="text-stone-900 font-semibold"> MACHT DURCH DISZIPLIN</strong>. 
                Er verlangte keine Politik, sondern einfache Dinge: gerade sitzen, still sein und schnell reagieren. 
                Genau darin lag die heimliche Falle.
              </p>
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-stone-200">
              <button
                onClick={onStartDrill}
                className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-amber-800 hover:bg-amber-900 active:scale-98 transition-all rounded-lg cursor-pointer shadow-sm"
              >
                <span>Drill-Simulation starten</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onExplorePsychology}
                className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-stone-800 bg-white border border-stone-300 hover:bg-stone-50 active:scale-98 transition-all rounded-lg cursor-pointer"
              >
                <Compass className="w-4 h-4 text-stone-600" />
                <span>Hintergründe verstehen</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual with Scrim & Context Card */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative rounded-xl overflow-hidden border border-stone-300 bg-stone-900 shadow-sm flex-1 min-h-[340px] flex flex-col justify-end">
              <img
                src="/src/assets/images/hero_die_welle_discipline_1794385122493.jpg"
                alt="Geschichtsklasse von Ben Ross mit Disziplin-Drill an der Gordon High School"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
              
              <div className="relative p-6 text-white">
                <div className="text-xs font-mono uppercase tracking-widest text-amber-300 mb-1">
                  Gordon High School · Raum 102
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Tag 1 des Experiments: Die Stunde Null der Welle
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed font-serif-literary">
                  „Ross kontrollierte jede Haltung. Was als kurioses Spiel anfing, verwandelte sich in Minuten 
                  in lautlosen, synchronen Gehorsam. Selbst die faulsten Schüler saßen kerzengerade.“
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* 3 Core Discipline Rules Strip */}
        <div className="mt-12 pt-8 border-t border-stone-200">
          <div className="mb-4">
            <div className="text-xs font-semibold text-amber-900 tracking-wider uppercase mb-1">
              Das Regelwerk von Ben Ross
            </div>
            <h2 className="text-xl font-bold text-stone-900">
              Die 3 Grundregeln des ersten Tages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NOVEL_CONTEXT.disciplineRules.map((rule) => (
              <div
                key={rule.nr}
                className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                      REGEL {rule.nr}
                    </span>
                    {rule.nr === "01" && <Award className="w-4 h-4 text-stone-400" />}
                    {rule.nr === "02" && <Clock className="w-4 h-4 text-stone-400" />}
                    {rule.nr === "03" && <ShieldAlert className="w-4 h-4 text-stone-400" />}
                  </div>
                  <h3 className="text-base font-bold text-stone-900 mb-2">
                    {rule.title}
                  </h3>
                  <p className="text-xs text-stone-700 font-medium mb-3 bg-stone-50 p-2.5 rounded border border-stone-100">
                    „{rule.rule}“
                  </p>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed pt-2 border-t border-stone-100">
                  <strong className="text-stone-700">Warum Herr Ross das tut:</strong> {rule.rationale}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Student Activity: Baue die 3 Regeln selbst zusammen */}
        <div className="mt-8 bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-2 mb-4">
            <div className="flex items-center gap-2">
              <Puzzle className="w-4 h-4 text-amber-800" />
              <h3 className="text-sm sm:text-base font-bold text-stone-900">
                Mitmach-Rätsel: Setze die 3 Regeln von Herrn Ross zusammen
              </h3>
            </div>
            <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg text-xs">
              {RULE_CLOZE_ITEMS.map((item, idx) => {
                const key1 = `${item.id}_0`;
                const key2 = `${item.id}_1`;
                const isSolved = (clozeAnswers[key1] === item.correctOptions[0]) && (clozeAnswers[key2] === item.correctOptions[1]);
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveClozeIndex(idx)}
                    className={`px-2.5 py-1 rounded cursor-pointer font-medium transition-colors ${
                      activeClozeIndex === idx
                        ? 'bg-white text-stone-900 shadow-xs font-bold'
                        : isSolved
                        ? 'text-emerald-800 bg-emerald-50'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {item.ruleNr} {isSolved ? '✓' : ''}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Cloze Exercise */}
          {(() => {
            const currentItem = RULE_CLOZE_ITEMS[activeClozeIndex];
            const answer0 = clozeAnswers[`${currentItem.id}_0`] || "";
            const answer1 = clozeAnswers[`${currentItem.id}_1`] || "";
            const isCorrect0 = answer0 === currentItem.correctOptions[0];
            const isCorrect1 = answer1 === currentItem.correctOptions[1];
            const isAllSolved = isCorrect0 && isCorrect1;

            return (
              <div>
                <p className="text-xs text-stone-600 font-serif-literary mb-4">
                  Wähle für jede Lücke das richtige Wort aus. Wie lautete der genaue Wortlaut von Herrn Ross?
                </p>

                {/* Sentence with interactive blanks */}
                <div className="p-4 sm:p-5 bg-stone-50 border border-stone-200 rounded-xl text-sm sm:text-base font-serif-literary leading-relaxed text-stone-900 mb-6 flex flex-wrap items-center gap-2">
                  <span>{currentItem.sentenceParts[0]}</span>
                  
                  {/* Blank 1 */}
                  <span className={`inline-flex items-center px-3 py-1 rounded-lg border font-sans text-xs sm:text-sm font-bold ${
                    answer0
                      ? isCorrect0
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                        : 'bg-red-50 text-red-900 border-red-300'
                      : 'bg-white text-stone-400 border-dashed border-stone-400 min-w-[90px] justify-center'
                  }`}>
                    {answer0 || "Lücke 1 wählen"}
                  </span>

                  <span>{currentItem.sentenceParts[1]}</span>

                  {/* Blank 2 */}
                  <span className={`inline-flex items-center px-3 py-1 rounded-lg border font-sans text-xs sm:text-sm font-bold ${
                    answer1
                      ? isCorrect1
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                        : 'bg-red-50 text-red-900 border-red-300'
                      : 'bg-white text-stone-400 border-dashed border-stone-400 min-w-[90px] justify-center'
                  }`}>
                    {answer1 || "Lücke 2 wählen"}
                  </span>

                  <span>{currentItem.sentenceParts[2]}</span>
                </div>

                {/* Word Pickers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Options for Blank 1 */}
                  <div className="p-3.5 bg-white border border-stone-200 rounded-lg">
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-2">
                      Auswahl für Lücke 1:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {currentItem.optionsPool[0].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => onUpdateClozeAnswer && onUpdateClozeAnswer(`${currentItem.id}_0`, opt)}
                          className={`px-3 py-1.5 text-xs rounded-lg border transition-all cursor-pointer font-medium ${
                            answer0 === opt
                              ? opt === currentItem.correctOptions[0]
                                ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                                : 'bg-red-700 text-white border-red-700 shadow-xs'
                              : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Options for Blank 2 */}
                  <div className="p-3.5 bg-white border border-stone-200 rounded-lg">
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-2">
                      Auswahl für Lücke 2:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {currentItem.optionsPool[1].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => onUpdateClozeAnswer && onUpdateClozeAnswer(`${currentItem.id}_1`, opt)}
                          className={`px-3 py-1.5 text-xs rounded-lg border transition-all cursor-pointer font-medium ${
                            answer1 === opt
                              ? opt === currentItem.correctOptions[1]
                                ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                                : 'bg-red-700 text-white border-red-700 shadow-xs'
                              : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Status Bar */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    {isAllSolved ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        Sehr gut! Regel {currentItem.ruleNr} ist exakt nach dem Roman gelöst.
                      </span>
                    ) : (
                      <span className="text-stone-500">
                        Klicke die Wörter an, bis beide Lücken grün leuchten.
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {(answer0 || answer1) && (
                      <button
                        onClick={() => {
                          if (onUpdateClozeAnswer) {
                            onUpdateClozeAnswer(`${currentItem.id}_0`, "");
                            onUpdateClozeAnswer(`${currentItem.id}_1`, "");
                          }
                        }}
                        className="text-stone-500 hover:text-stone-800 flex items-center gap-1 text-[11px] cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Zurücksetzen
                      </button>
                    )}
                    {activeClozeIndex < RULE_CLOZE_ITEMS.length - 1 && isAllSolved && (
                      <button
                        onClick={() => setActiveClozeIndex(i => i + 1)}
                        className="px-3 py-1 bg-amber-800 text-white font-semibold rounded hover:bg-amber-900 cursor-pointer text-xs"
                      >
                        Nächste Regel lösen →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

      </div>
    </section>
  );
};
