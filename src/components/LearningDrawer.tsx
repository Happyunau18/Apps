import React from 'react';
import { X, Printer, BookOpen, CheckCircle, FileText } from 'lucide-react';
import { StudentJournal } from '../types/learning';

interface LearningDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  journal: StudentJournal;
  onUpdateJournal: (key: keyof StudentJournal, value: string) => void;
  onResetJournal?: () => void;
}

export const LearningDrawer: React.FC<LearningDrawerProps> = ({
  isOpen,
  onClose,
  journal,
  onUpdateJournal,
  onResetJournal
}) => {
  if (!isOpen) return null;

  const textNotesCount = Object.values(journal.textNotes || {}).filter(s => s?.trim()).length;
  const roleplayCount = Object.values(journal.characterRoleplayNotes || {}).filter(s => s?.trim()).length;
  const dilemmaCount = Object.values(journal.dilemmaOwnSolutions || {}).filter(s => s?.trim()).length;

  const filledCount = [
    journal.reflection1.trim(),
    journal.reflection2.trim(),
    journal.reflection3.trim(),
    journal.drillReactionExperience.trim(),
    journal.everydayExampleNote?.trim()
  ].filter(Boolean).length + textNotesCount + roleplayCount + dilemmaCount;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between border-l border-stone-200 animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-stone-900 text-white flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Lernjournal & Arbeitsstand
              </h3>
              <p className="text-xs text-stone-500">
                {filledCount} Einträge von dir festgehalten
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 rounded-lg cursor-pointer transition-colors"
              title="Drucken / PDF exportieren"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 rounded-lg cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Progress summary banner */}
          <div className="p-4 bg-stone-100 rounded-xl border border-stone-200 text-xs text-stone-700 leading-relaxed font-serif-literary">
            <strong className="text-stone-900 block mb-1">
              Deine Notizen zu „Macht durch Disziplin“:
            </strong>
            Hier sammelst du alle deine selbst verfassten Antworten, Rollen-Tagebücher und Alltagsbeobachtungen für den Unterricht.
          </div>

          {/* Module activities badges */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-center">
              <span className="text-[10px] text-stone-500 uppercase block">Text-Notizen</span>
              <span className="text-sm font-bold text-stone-900">{textNotesCount} / 4</span>
            </div>
            <div className="p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-center">
              <span className="text-[10px] text-stone-500 uppercase block">Rollen-Einträge</span>
              <span className="text-sm font-bold text-stone-900">{roleplayCount} / 4</span>
            </div>
            <div className="p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-center">
              <span className="text-[10px] text-stone-500 uppercase block">Dilemma-Ideen</span>
              <span className="text-sm font-bold text-stone-900">{dilemmaCount} / 3</span>
            </div>
          </div>

          {/* Stoppuhr-Simulation Observation */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-800" />
              <span>Erkenntnis aus der Stoppuhr-Simulation:</span>
            </label>
            <textarea
              value={journal.drillReactionExperience}
              onChange={(e) => onUpdateJournal('drillReactionExperience', e.target.value)}
              placeholder="Halte hier deine persönliche Erfahrung zum Zeitdruck und zur Regelbefolgung fest..."
              rows={3}
              className="w-full text-xs font-serif-literary p-3 rounded-lg border border-stone-300 bg-stone-50 text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-800/20"
            />
          </div>

          {/* Alltags-Beispiel */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-800" />
              <span>Eigenes Alltagsbeispiel (Sport, Schule, Chat):</span>
            </label>
            <textarea
              value={journal.everydayExampleNote || ""}
              onChange={(e) => onUpdateJournal('everydayExampleNote', e.target.value)}
              placeholder="Beschreibe dein Alltagsbeispiel zu Regeln und Gruppenzwang..."
              rows={3}
              className="w-full text-xs font-serif-literary p-3 rounded-lg border border-stone-300 bg-stone-50 text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-800/20"
            />
          </div>

          {/* Leitfrage 1 */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-stone-500" />
              <span>Leitfrage 1: Tarnung der Manipulation</span>
            </label>
            <textarea
              value={journal.reflection1}
              onChange={(e) => onUpdateJournal('reflection1', e.target.value)}
              placeholder="Formuliere hier deine eigene Begründung..."
              rows={3}
              className="w-full text-xs font-serif-literary p-3 rounded-lg border border-stone-300 bg-stone-50 text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-800/20"
            />
          </div>

          {/* Leitfrage 2 */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-stone-500" />
              <span>Leitfrage 2: Robert Billings</span>
            </label>
            <textarea
              value={journal.reflection2}
              onChange={(e) => onUpdateJournal('reflection2', e.target.value)}
              placeholder="Formuliere hier deine eigene Analyse..."
              rows={3}
              className="w-full text-xs font-serif-literary p-3 rounded-lg border border-stone-300 bg-stone-50 text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-800/20"
            />
          </div>

          {/* Leitfrage 3 */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-stone-500" />
              <span>Leitfrage 3: Der persönliche Grenzverlauf</span>
            </label>
            <textarea
              value={journal.reflection3}
              onChange={(e) => onUpdateJournal('reflection3', e.target.value)}
              placeholder="Formuliere hier deinen persönlichen Standpunkt..."
              rows={3}
              className="w-full text-xs font-serif-literary p-3 rounded-lg border border-stone-300 bg-stone-50 text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-800/20"
            />
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {onResetJournal && (
              <button
                onClick={onResetJournal}
                className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 rounded-md transition-colors cursor-pointer"
              >
                Einträge leeren
              </button>
            )}
            <span className="text-[11px] text-stone-500 font-mono hidden sm:inline">
              Lokal gespeichert
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-lg cursor-pointer"
          >
            Schließen & Weiterlernen
          </button>
        </div>

      </div>
    </div>
  );
};
