import React, { useState } from 'react';
import { BookMarked, Eye, History, Quote, PenLine, Check } from 'lucide-react';
import { TEXT_EXCERPTS } from '../data/novelData';

interface TextAnalysisModuleProps {
  studentTextNotes?: Record<string, string>;
  onUpdateTextNote?: (excerptId: string, note: string) => void;
}

export const TextAnalysisModule: React.FC<TextAnalysisModuleProps> = ({
  studentTextNotes = {},
  onUpdateTextNote
}) => {
  const [selectedExcerptId, setSelectedExcerptId] = useState<string>(TEXT_EXCERPTS[0].id);
  const [selectedAnnotationIndex, setSelectedAnnotationIndex] = useState<number | null>(0);

  const currentExcerpt = TEXT_EXCERPTS.find(e => e.id === selectedExcerptId) || TEXT_EXCERPTS[0];
  const activeStudentNote = studentTextNotes[selectedExcerptId] || "";

  return (
    <section id="texts" className="py-12 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold text-amber-800 tracking-wider uppercase mb-1">
              Modul 03 · Wichtige Szenen im Buch
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
              Die entscheidenden Romanstellen
            </h2>
          </div>

          {/* Excerpt Selector Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-lg shrink-0">
            {TEXT_EXCERPTS.map((excerpt) => (
              <button
                key={excerpt.id}
                onClick={() => {
                  setSelectedExcerptId(excerpt.id);
                  setSelectedAnnotationIndex(0);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  selectedExcerptId === excerpt.id
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {excerpt.chapter}
              </button>
            ))}
          </div>
        </div>

        {/* Main Work Area: 2-Zone Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Literary Reading Stage */}
          <div className="lg:col-span-7 bg-stone-50 border border-stone-200 rounded-xl p-6 lg:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-800 font-semibold">
                  {currentExcerpt.chapter}
                </span>
                <h3 className="text-xl font-bold text-stone-900 mt-0.5">
                  {currentExcerpt.title}
                </h3>
              </div>
              <span className="text-xs text-stone-500 font-medium">
                {currentExcerpt.annotations.length} didaktische Anmerkungen
              </span>
            </div>

            {/* Context kicker */}
            <p className="text-xs text-stone-600 italic mb-5 leading-relaxed bg-white/70 p-3 rounded-lg border border-stone-200/60">
              <strong className="not-italic text-stone-800">Szene:</strong> {currentExcerpt.context}
            </p>

            {/* The Text Block */}
            <div className="text-base sm:text-lg text-stone-900 leading-relaxed font-serif-literary bg-white p-6 rounded-xl border border-stone-200/80 shadow-xs space-y-4">
              <p>
                {currentExcerpt.germanText}
              </p>
            </div>

            {/* Annotation Badges / Selectors below text */}
            <div className="mt-6 pt-4 border-t border-stone-200">
              <div className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookMarked className="w-3.5 h-3.5 text-amber-800" />
                <span>Analysierte Zitate in diesem Abschnitt:</span>
              </div>
              <div className="space-y-2">
                {currentExcerpt.annotations.map((ann, idx) => {
                  const isSelected = selectedAnnotationIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedAnnotationIndex(idx)}
                      className={`w-full text-left p-3 text-xs rounded-lg border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'border-amber-700 bg-amber-50/80 text-amber-950 font-medium shadow-xs'
                          : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <span className="font-serif-literary italic line-clamp-1">
                        „{ann.phrase}“
                      </span>
                      <span className="text-[10px] font-mono shrink-0 uppercase tracking-wider text-stone-500 font-semibold">
                        {ann.pedagogicalCategory}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Key takeaway */}
            <div className="mt-6 p-4 rounded-xl bg-stone-900 text-white flex items-start gap-3">
              <Quote className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-1">
                  Wichtigste Erkenntnis:
                </span>
                <p className="text-xs text-stone-300 font-serif-literary leading-relaxed">
                  {currentExcerpt.keyTakeaway}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Detailed Commentary & Historical Reality Box */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Active Annotation Card */}
            <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
              <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                <span>Textstelle verstehen</span>
              </div>

              {selectedAnnotationIndex !== null && currentExcerpt.annotations[selectedAnnotationIndex] ? (
                <div>
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg mb-4">
                    <span className="text-xs font-bold text-stone-500 block mb-1">
                      Ausgewähltes Zitat:
                    </span>
                    <p className="text-sm font-serif-literary italic text-stone-900 font-medium leading-relaxed">
                      „{currentExcerpt.annotations[selectedAnnotationIndex].phrase}“
                    </p>
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs font-mono uppercase tracking-wider font-semibold text-stone-500">
                      Was hinter den Worten steckt:
                    </span>
                    <p className="text-xs sm:text-sm text-stone-700 font-serif-literary leading-relaxed">
                      {currentExcerpt.annotations[selectedAnnotationIndex].analysis}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-stone-500 italic">
                  Wähle links ein Zitat aus, um die Erklärung zu lesen.
                </p>
              )}
            </div>

            {/* Student Active Task: Eigene Textbeobachtung eintragen */}
            <div className="bg-white border border-amber-800/30 rounded-xl p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900 uppercase tracking-wider">
                  <PenLine className="w-3.5 h-3.5 text-amber-800" />
                  <span>Deine Text-Notiz: {currentExcerpt.chapter}</span>
                </div>
                {activeStudentNote.trim() && (
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Gespeichert
                  </span>
                )}
              </div>

              <p className="text-xs text-stone-600 font-serif-literary mb-3 leading-relaxed">
                Was fällt dir an dieser Szene (<strong>{currentExcerpt.title}</strong>) auf? Welcher Satz oder welche Reaktion der Schüler wirkt auf dich am stärksten?
              </p>

              <textarea
                value={activeStudentNote}
                onChange={(e) => onUpdateTextNote && onUpdateTextNote(selectedExcerptId, e.target.value)}
                placeholder="Halte hier deine persönliche Beobachtung zu diesem Textabschnitt fest..."
                rows={3}
                className="w-full text-xs font-serif-literary p-3 rounded-lg border border-stone-300 bg-stone-50 text-stone-900 placeholder:text-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 transition-colors"
              />

              <div className="flex items-center justify-between mt-2 text-[11px] text-stone-400">
                <span>Wird im Lernjournal gespeichert</span>
                <span className="font-mono">{activeStudentNote.length} Zeichen</span>
              </div>
            </div>

            {/* Historical Real-World Context: Ron Jones 1967 */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <History className="w-4 h-4 text-amber-800" />
                <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                  Historische Realität: Palo Alto 1967
                </h4>
              </div>
              <p className="text-xs text-stone-600 font-serif-literary leading-relaxed mb-4">
                Morton Rhues Roman basiert auf dem tatsächlichen Experiment von 
                <strong> Ron Jones</strong> an der Cubberley High School im kalifornischen Palo Alto (April 1967). 
                Jones dokumentierte später in seinem Bericht <em>„The Third Wave“</em>:
              </p>
              <div className="p-3 bg-white border border-stone-200 rounded-lg text-xs font-serif-literary italic text-stone-800 leading-relaxed">
                „Ich hatte gedacht, die Schüler würden sich nach wenigen Minuten über die Haltungsübungen lustig machen. 
                Stattdessen waren sie wie elektrisiert. Schüler kamen nach der Stunde zu mir und sagten: 
                ‚Mr. Jones, ich habe mich im Unterricht noch nie so lebendig gefühlt!‘ 
                Am zweiten Tag saßen bereits Jugendliche aus anderen Klassenräumen heimlich in meinem Zimmer, 
                um mitzumachen.“
              </div>
              <div className="mt-3 text-[11px] text-stone-500 font-mono">
                Quelle: Ron Jones, „The Third Wave“, 1976.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
