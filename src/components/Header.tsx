import React from 'react';
import { BookOpen } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenJournal: () => void;
  onOpenShareModal: () => void;
  savedJournalCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  onOpenJournal,
  onOpenShareModal,
  savedJournalCount
}) => {
  const navItems = [
    { id: 'drill', label: 'Drill-Simulation' },
    { id: 'psychology', label: 'Psychologie' },
    { id: 'texts', label: 'Textanalyse' },
    { id: 'characters', label: 'Charaktere' },
    { id: 'reflection', label: 'Reflexion' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-100/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('hero')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="text-lg font-bold tracking-tight text-stone-900 group-hover:text-amber-800 transition-colors whitespace-nowrap shrink-0">
            Die Welle · Macht durch Disziplin
          </span>
        </button>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-600">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer focus:outline-none ${
                  isActive
                    ? 'text-amber-900 font-semibold border-b-2 border-amber-800'
                    : 'hover:text-stone-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <button
            onClick={onOpenJournal}
            className="text-stone-600 hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer focus:outline-none flex items-center gap-1.5"
          >
            <span>Lernjournal</span>
            <span className="font-mono text-xs bg-stone-200 text-stone-800 px-1.5 py-0.5 rounded-full font-bold">
              {savedJournalCount}
            </span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenShareModal}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-amber-800 rounded-lg hover:bg-amber-900 active:scale-98 transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Schüler-Link & QR-Code</span>
          </button>
        </div>
      </div>
    </header>
  );
};
