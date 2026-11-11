import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { DrillSimulation } from './components/DrillSimulation';
import { PsychologyModule } from './components/PsychologyModule';
import { TextAnalysisModule } from './components/TextAnalysisModule';
import { CharacterMirror } from './components/CharacterMirror';
import { DilemmaSimulator } from './components/DilemmaSimulator';
import { QuizAndJournal } from './components/QuizAndJournal';
import { LearningDrawer } from './components/LearningDrawer';
import { ShareModal } from './components/ShareModal';
import { StudentJournal } from './types/learning';

const LOCAL_STORAGE_KEY = 'diewelle_student_journal_v2';
const SHARED_APP_URL = 'https://ais-pre-6ws3gjcroaex4ejugdfxrj-727505448237.europe-west1.run.app';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('drill');
  const [isJournalOpen, setIsJournalOpen] = useState<boolean>(false);
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);

  const shareUrl = typeof window !== 'undefined' && window.location.origin.includes('run.app')
    ? window.location.origin
    : SHARED_APP_URL;

  // Persistent student journal - start with empty strings so students formulate their own thoughts
  const [journal, setJournal] = useState<StudentJournal>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          reflection1: parsed.reflection1 || "",
          reflection2: parsed.reflection2 || "",
          reflection3: parsed.reflection3 || "",
          drillReactionExperience: parsed.drillReactionExperience || "",
          personalObservation: parsed.personalObservation || "",
          textNotes: parsed.textNotes || {},
          characterRoleplayNotes: parsed.characterRoleplayNotes || {},
          dilemmaOwnSolutions: parsed.dilemmaOwnSolutions || {},
          everydayExampleNote: parsed.everydayExampleNote || "",
          clozeAnswers: parsed.clozeAnswers || {},
          lastUpdated: parsed.lastUpdated || new Date().toISOString()
        };
      }
    } catch {
      // fallback
    }
    return {
      reflection1: "",
      reflection2: "",
      reflection3: "",
      drillReactionExperience: "",
      personalObservation: "",
      textNotes: {},
      characterRoleplayNotes: {},
      dilemmaOwnSolutions: {},
      everydayExampleNote: "",
      clozeAnswers: {},
      lastUpdated: new Date().toISOString()
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(journal));
    } catch {
      // ignore
    }
  }, [journal]);

  const handleUpdateJournal = (key: keyof StudentJournal, value: string) => {
    setJournal(prev => ({
      ...prev,
      [key]: value,
      lastUpdated: new Date().toISOString()
    }));
  };

  const handleUpdateTextNote = (excerptId: string, note: string) => {
    setJournal(prev => ({
      ...prev,
      textNotes: { ...(prev.textNotes || {}), [excerptId]: note },
      lastUpdated: new Date().toISOString()
    }));
  };

  const handleUpdateCharacterRoleplay = (charId: string, note: string) => {
    setJournal(prev => ({
      ...prev,
      characterRoleplayNotes: { ...(prev.characterRoleplayNotes || {}), [charId]: note },
      lastUpdated: new Date().toISOString()
    }));
  };

  const handleUpdateDilemmaSolution = (dilemmaId: string, solution: string) => {
    setJournal(prev => ({
      ...prev,
      dilemmaOwnSolutions: { ...(prev.dilemmaOwnSolutions || {}), [dilemmaId]: solution },
      lastUpdated: new Date().toISOString()
    }));
  };

  const handleUpdateClozeAnswer = (clozeKey: string, val: string) => {
    setJournal(prev => ({
      ...prev,
      clozeAnswers: { ...(prev.clozeAnswers || {}), [clozeKey]: val },
      lastUpdated: new Date().toISOString()
    }));
  };

  const handleLogDrillExperience = (note: string) => {
    setJournal(prev => ({
      ...prev,
      drillReactionExperience: note,
      lastUpdated: new Date().toISOString()
    }));
  };

  const handleResetJournal = () => {
    const emptyJournal: StudentJournal = {
      reflection1: "",
      reflection2: "",
      reflection3: "",
      drillReactionExperience: "",
      personalObservation: "",
      textNotes: {},
      characterRoleplayNotes: {},
      dilemmaOwnSolutions: {},
      everydayExampleNote: "",
      clozeAnswers: {},
      lastUpdated: new Date().toISOString()
    };
    setJournal(emptyJournal);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(emptyJournal));
    } catch {
      // ignore
    }
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const savedCount = [
    journal.reflection1?.trim(),
    journal.reflection2?.trim(),
    journal.reflection3?.trim(),
    journal.drillReactionExperience?.trim(),
    journal.everydayExampleNote?.trim(),
    ...Object.values(journal.textNotes || {}).filter(s => s?.trim()),
    ...Object.values(journal.characterRoleplayNotes || {}).filter(s => s?.trim()),
    ...Object.values(journal.dilemmaOwnSolutions || {}).filter(s => s?.trim())
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col font-sans selection:bg-amber-200">
      {/* Top Navigation Bar */}
      <Header
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenJournal={() => setIsJournalOpen(true)}
        onOpenShareModal={() => setIsShareOpen(true)}
        savedJournalCount={savedCount}
      />

      {/* Main Learning Sections */}
      <main className="flex-1">
        {/* Hero Context & 3 Core Rules with Rule-Cloze Puzzle */}
        <HeroSection
          onStartDrill={() => scrollToSection('drill')}
          onExplorePsychology={() => scrollToSection('psychology')}
          clozeAnswers={journal.clozeAnswers}
          onUpdateClozeAnswer={handleUpdateClozeAnswer}
        />

        {/* Modul 1: Interactive Classroom Drill & Stopwatch Simulation */}
        <DrillSimulation
          onLogDrillExperience={handleLogDrillExperience}
          drillObservation={journal.drillReactionExperience}
        />

        {/* Modul 2: Psychological Seduction & Continuum Slider */}
        <PsychologyModule
          everydayExampleNote={journal.everydayExampleNote}
          onUpdateEverydayExample={(val) => handleUpdateJournal('everydayExampleNote', val)}
        />

        {/* Modul 3: Annotated Text Excerpts & Historical Context (Ron Jones) */}
        <TextAnalysisModule
          studentTextNotes={journal.textNotes}
          onUpdateTextNote={handleUpdateTextNote}
        />

        {/* Modul 4: Character Mirror & Quotes Quiz */}
        <CharacterMirror
          roleplayNotes={journal.characterRoleplayNotes}
          onUpdateRoleplay={handleUpdateCharacterRoleplay}
        />

        {/* Modul 5: Dilemma Simulator & Contemporary Transfer */}
        <DilemmaSimulator
          ownSolutions={journal.dilemmaOwnSolutions}
          onUpdateOwnSolution={handleUpdateDilemmaSolution}
        />

        {/* Modul 6: Knowledge Quiz & Reflection Journal */}
        <QuizAndJournal
          journal={journal}
          onUpdateJournal={handleUpdateJournal}
          onResetJournal={handleResetJournal}
        />
      </main>

      {/* Slide-over Learning Journal & Printable Notes */}
      <LearningDrawer
        isOpen={isJournalOpen}
        onClose={() => setIsJournalOpen(false)}
        journal={journal}
        onUpdateJournal={handleUpdateJournal}
        onResetJournal={handleResetJournal}
      />

      {/* Share Modal for Students with Direct Link & Beamer QR Code */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        shareUrl={shareUrl}
      />

      {/* Editorial Footer (Strict anti-slop, no fake telemetry tickers) */}
      <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs">
          <div>
            <span className="font-bold text-white block mb-1">
              Die Welle · Didaktische Lernumgebung zum Motto „Macht durch Disziplin“
            </span>
            <p className="font-serif-literary text-stone-400 max-w-md leading-relaxed">
              Basierend auf dem Roman von Morton Rhue (1981) und dem Experiment von Ron Jones an der Cubberley High School (1967). 
              Konzipiert für den Deutsch-, Geschichts- und Ethikunterricht.
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-2 shrink-0">
            <div className="flex items-center gap-4 text-stone-300">
              <button
                onClick={() => scrollToSection('drill')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Drill-Simulation
              </button>
              <button
                onClick={() => scrollToSection('psychology')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Psychologie
              </button>
              <button
                onClick={() => scrollToSection('texts')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Textarbeit
              </button>
              <button
                onClick={() => setIsJournalOpen(true)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Lernjournal
              </button>
              <button
                onClick={() => setIsShareOpen(true)}
                className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer font-semibold"
              >
                Schüler-Link (QR)
              </button>
            </div>
            <span className="text-stone-500 text-[11px]">
              Erziehung zur Mündigkeit · Kein Konformismus ohne Zustimmung
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
