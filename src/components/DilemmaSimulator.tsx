import React, { useState } from 'react';
import { HelpCircle, AlertTriangle, ShieldCheck, Scale, Check, PenSquare } from 'lucide-react';
import { DILEMMA_CASES } from '../data/novelData';

interface DilemmaSimulatorProps {
  ownSolutions?: Record<string, string>;
  onUpdateOwnSolution?: (dilemmaId: string, text: string) => void;
}

export const DilemmaSimulator: React.FC<DilemmaSimulatorProps> = ({
  ownSolutions = {},
  onUpdateOwnSolution
}) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(DILEMMA_CASES[0].id);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const activeCase = DILEMMA_CASES.find(c => c.id === selectedCaseId) || DILEMMA_CASES[0];
  const activeOption = activeCase.options.find(o => o.id === selectedOptionId);
  const currentOwnSolution = ownSolutions[selectedCaseId] || "";

  return (
    <section className="py-12 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="text-xs font-semibold text-amber-800 tracking-wider uppercase mb-1">
            Modul 05 · Situationen aus dem Alltag heute
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 mb-3">
            Entscheide selbst: Wo lauert der Zwang heute?
          </h2>
          <p className="text-sm text-stone-700 font-serif-literary leading-relaxed">
            Strenger Gruppenzwang fängt fast nie mit bösen Absichten an. 
            Er schleicht sich im Alltag ein: beim Sport, in der Schule oder im Klassen-Chat. 
            Wie würdest du in diesen drei Situationen entscheiden?
          </p>
        </div>

        {/* Case Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {DILEMMA_CASES.map((dilemma) => {
            const isSelected = selectedCaseId === dilemma.id;
            return (
              <button
                key={dilemma.id}
                onClick={() => {
                  setSelectedCaseId(dilemma.id);
                  setSelectedOptionId(null);
                }}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                    : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-700'
                }`}
              >
                <div className={`text-xs font-mono uppercase tracking-wider mb-1 ${isSelected ? 'text-amber-400' : 'text-stone-500'}`}>
                  {dilemma.setting}
                </div>
                <div className="text-sm font-bold">
                  {dilemma.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Case Interactive Workspace */}
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Case Description & Option Buttons */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-800 font-semibold block mb-1">
                  Fallkonstellation: {activeCase.setting}
                </span>
                <h3 className="text-xl font-bold text-stone-900 mb-3">
                  {activeCase.title}
                </h3>
                <p className="text-sm text-stone-700 font-serif-literary leading-relaxed bg-white p-4 rounded-xl border border-stone-200">
                  {activeCase.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3">
                  Wie entscheidest du dich?
                </h4>
                <div className="space-y-3">
                  {activeCase.options.map((opt) => {
                    const isSelected = selectedOptionId === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setSelectedOptionId(opt.id)}
                        className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                          isSelected
                            ? 'bg-amber-800 text-white border-amber-800 shadow-xs'
                            : 'bg-white border-stone-200 text-stone-800 hover:bg-stone-100/80'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected ? 'border-white bg-white/20' : 'border-stone-300'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <div className="text-xs sm:text-sm font-medium leading-relaxed">
                          {opt.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Consequence & Ethical Analysis */}
            <div className="lg:col-span-5">
              {activeOption ? (
                <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-5 animate-in fade-in">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                    <span className="text-xs font-mono uppercase tracking-wider text-stone-500 font-semibold">
                      Was bedeutet das?
                    </span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded border ${
                      activeOption.totalitarianRiskLevel === 'Kritisch'
                        ? 'bg-red-50 text-red-800 border-red-200'
                        : activeOption.totalitarianRiskLevel === 'Mittel'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}>
                      Gefahr: {activeOption.totalitarianRiskLevel}
                    </span>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-1">
                      Die Folge für die Gruppe:
                    </h5>
                    <p className="text-xs sm:text-sm text-stone-700 font-serif-literary leading-relaxed">
                      {activeOption.consequence}
                    </p>
                  </div>

                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800 mb-1">
                      <Scale className="w-3.5 h-3.5 text-amber-800" />
                      <span>Das Problem daran:</span>
                    </div>
                    <p className="text-xs text-stone-600 font-serif-literary leading-relaxed">
                      {activeOption.criticalAnalysis}
                    </p>
                  </div>

                  <div className="pt-2 text-[11px] text-stone-500 font-serif-literary italic">
                    Tipp für den Unterricht: Diskutiert in Kleingruppen, ob Disziplin ohne Sanktionen überhaupt denkbar ist.
                  </div>
                </div>
              ) : (
                <div className="h-full bg-white/70 border border-dashed border-stone-300 rounded-xl p-8 flex flex-col items-center justify-center text-center">
                  <HelpCircle className="w-8 h-8 text-stone-400 mb-2" />
                  <h5 className="text-sm font-bold text-stone-700 mb-1">
                    Wähle eine Handlungsoption
                  </h5>
                  <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
                    Klicke links auf eine der Handlungsoptionen, um die Konsequenzen und das totalitäre Gefahrenpotenzial zu analysieren.
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Student Active Task: Eigene Lösungsidee für diesen Fall */}
          <div className="mt-8 pt-6 border-t border-stone-200">
            <div className="bg-white border border-amber-800/30 rounded-xl p-5 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-100 gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <PenSquare className="w-4 h-4 text-amber-800" />
                  <h4 className="text-xs sm:text-sm font-bold text-stone-900 uppercase tracking-wider">
                    Mitmach-Aufgabe: Deine eigene Lösung für „{activeCase.title}“
                  </h4>
                </div>
                {currentOwnSolution.trim() && (
                  <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-bold flex items-center gap-1 self-start sm:self-auto">
                    <Check className="w-3 h-3" /> Gespeichert im Lernjournal
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-stone-700 font-serif-literary mb-3 leading-relaxed">
                Gibt es eine bessere Lösung als die vorgegebenen Optionen? 
                Wie würdest <strong>DU</strong> in dieser Situation reagieren, um sowohl Fairness als auch die Gruppe zu schützen – ohne jemanden auszugrenzen?
              </p>

              <textarea
                value={currentOwnSolution}
                onChange={(e) => onUpdateOwnSolution && onUpdateOwnSolution(selectedCaseId, e.target.value)}
                placeholder="Formuliere hier deine eigene Lösungsidee oder deinen Kompromiss für diesen Fall..."
                rows={3}
                className="w-full text-xs sm:text-sm font-serif-literary p-3 rounded-lg border border-stone-300 bg-stone-50 text-stone-900 placeholder:text-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 transition-colors"
              />

              <div className="flex items-center justify-between mt-2 text-[11px] text-stone-400">
                <span>Wähle oben die anderen Fälle aus, um auch dort deine Lösungen festzuhalten.</span>
                <span className="font-mono">{currentOwnSolution.length} Zeichen</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
