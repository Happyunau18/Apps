import React, { useState } from 'react';
import { User, Quote, CheckCircle2, XCircle, Award, PenTool, Check } from 'lucide-react';
import { CHARACTER_PROFILES } from '../data/novelData';

interface CharacterMirrorProps {
  roleplayNotes?: Record<string, string>;
  onUpdateRoleplay?: (charId: string, note: string) => void;
}

export const CharacterMirror: React.FC<CharacterMirrorProps> = ({
  roleplayNotes = {},
  onUpdateRoleplay
}) => {
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>(CHARACTER_PROFILES[0].id);

  // Quote Match Mini-Game State
  const challengeQuotes = [
    {
      id: "q_robert",
      text: "„Endlich lacht mich keiner mehr aus. Wenn alle dieselben Regeln befolgen, bin ich genauso viel wert wie die Sportler.“",
      correctCharacterId: "robert",
      explanation: "Robert Billings: Sucht Schutz vor Erniedrigung in der Uniformität der Gruppe."
    },
    {
      id: "q_laurie",
      text: "„Warum regt sich denn niemand auf? Es ist, als hätten alle plötzlich ihr Gehirn an der Garderobe abgegeben!“",
      correctCharacterId: "laurie",
      explanation: "Laurie Saunders: Erschrickt über die willenlose Anpassung ihrer Mitschüler."
    },
    {
      id: "q_david",
      text: "„Das Football-Team verliert nur, weil alle faul sind. Mit dem Drill von Mr. Ross fegen wir den Gegner vom Platz!“",
      correctCharacterId: "david",
      explanation: "David Collins: Sieht Disziplin utilitaristisch als Erfolgsrezept für das Sportteam."
    },
    {
      id: "q_ross",
      text: "„Ich wollte es nur einen Tag ausprobieren. Aber als ich sah, wie sie auf mein Wort gehorchten, konnte ich nicht aufhören.“",
      correctCharacterId: "ross",
      explanation: "Ben Ross: Die Verführung des Lehrers durch die Faszination absoluter Lenkbarkeit."
    }
  ];

  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [userGuess, setUserGuess] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const activeCharacter = CHARACTER_PROFILES.find(c => c.id === selectedCharacterId) || CHARACTER_PROFILES[0];
  const activeChallenge = challengeQuotes[currentChallengeIndex];

  const handleGuess = (charId: string) => {
    if (isAnswered) return;
    setUserGuess(charId);
    setIsAnswered(true);
    if (charId === activeChallenge.correctCharacterId) {
      setScore(s => s + 1);
    }
  };

  const handleNextChallenge = () => {
    if (currentChallengeIndex < challengeQuotes.length - 1) {
      setCurrentChallengeIndex(c => c + 1);
      setUserGuess(null);
      setIsAnswered(false);
    } else {
      // restart
      setCurrentChallengeIndex(0);
      setUserGuess(null);
      setIsAnswered(false);
      setScore(0);
    }
  };

  return (
    <section id="characters" className="py-12 bg-stone-100 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="text-xs font-semibold text-amber-800 tracking-wider uppercase mb-1">
            Modul 04 · Individuum vs. Masse
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 mb-3">
            Der Charakter-Spiegel: Vier Wege in die Disziplin
          </h2>
          <p className="text-sm text-stone-700 font-serif-literary leading-relaxed">
            Niemand reagiert gleich auf Autorität. An den vier Hauptfiguren zeigt Morton Rhue präzise, 
            welche psychologischen Motive dazu führen, dass Menschen Disziplin herbeisehnen, ausnutzen oder bekämpfen.
          </p>
        </div>

        {/* Character Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {CHARACTER_PROFILES.map((char) => {
            const isSelected = selectedCharacterId === char.id;
            return (
              <button
                key={char.id}
                onClick={() => setSelectedCharacterId(char.id)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-amber-800 ring-2 ring-amber-800/20 shadow-sm'
                    : 'bg-stone-50 border-stone-200 hover:bg-white text-stone-700'
                }`}
              >
                <div className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-1">
                  {char.role}
                </div>
                <div className="text-sm sm:text-base font-bold text-stone-900">
                  {char.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Character Profile Card */}
        <div className="bg-white border border-stone-200 rounded-xl p-6 lg:p-8 shadow-xs mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Identity & Core Quote */}
            <div className="lg:col-span-5 bg-stone-50 border border-stone-200 rounded-xl p-6 flex flex-col justify-between min-h-[300px]">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-5 h-5 text-amber-800" />
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                    {activeCharacter.role}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-2">
                  {activeCharacter.name}
                </h3>
                <p className="text-xs text-stone-600 font-medium mb-4">
                  Reaktion auf „Macht durch Disziplin“: <br />
                  <span className="text-stone-900 font-semibold">{activeCharacter.reactionToDiscipline}</span>
                </p>
              </div>

              <div className="p-4 bg-white border border-stone-200 rounded-lg">
                <Quote className="w-4 h-4 text-amber-800 mb-1" />
                <p className="text-xs sm:text-sm font-serif-literary italic text-stone-900 font-medium leading-relaxed">
                  {activeCharacter.quote}
                </p>
              </div>
            </div>

            {/* Right: Motives & Turning point */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3">
                  Warum er/sie so handelt:
                </h4>
                <ul className="space-y-2">
                  {activeCharacter.psychologicalMotives.map((motive, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-700 font-serif-literary leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-800 shrink-0 mt-2" />
                      <span>{motive}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-100">
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                    Warum er/sie mitmacht:
                  </span>
                  <p className="text-xs text-stone-800 font-serif-literary leading-relaxed">
                    {activeCharacter.vulnerabilityFactor}
                  </p>
                </div>

                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                    Der Augenblick der Wahrheit:
                  </span>
                  <p className="text-xs text-stone-800 font-serif-literary leading-relaxed">
                    {activeCharacter.turningPoint}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Student Active Task: Rollen-Tagebucheintrag verfassen */}
          <div className="mt-6 pt-6 border-t border-stone-200">
            <div className="p-5 bg-stone-50 border border-amber-800/30 rounded-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-200 mb-3">
                <div className="flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-amber-800" />
                  <h4 className="text-xs sm:text-sm font-bold text-stone-900 uppercase tracking-wider">
                    Mitmach-Schreibaufgabe: Schlüpfe in die Rolle von {activeCharacter.name}
                  </h4>
                </div>
                {(roleplayNotes[selectedCharacterId] || "").trim() && (
                  <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-bold flex items-center gap-1 self-start sm:self-auto">
                    <Check className="w-3 h-3" /> Gespeichert im Lernjournal
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm font-serif-literary text-stone-800 font-medium mb-3 leading-relaxed">
                {activeCharacter.roleplayPrompt}
              </p>

              <textarea
                value={roleplayNotes[selectedCharacterId] || ""}
                onChange={(e) => onUpdateRoleplay && onUpdateRoleplay(selectedCharacterId, e.target.value)}
                placeholder={`Schreibe hier aus der Ich-Perspektive von ${activeCharacter.name} (z.B. „Heute war ein ganz seltsamer Tag in der Schule...“)...`}
                rows={4}
                className="w-full text-xs sm:text-sm font-serif-literary p-3.5 rounded-lg border border-stone-300 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 transition-colors"
              />

              <div className="flex items-center justify-between mt-2 text-[11px] text-stone-500">
                <span>Wechsle oben die Figuren, um auch aus anderen Blickwinkeln zu schreiben.</span>
                <span className="font-mono">{(roleplayNotes[selectedCharacterId] || "").length} Zeichen</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Challenge: Wer sagte oder dachte es? */}
        <div className="bg-white border border-stone-200 rounded-xl p-6 lg:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-2 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-4 h-4 text-amber-800" />
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Zitate-Quiz: Wer hat es gesagt?
                </span>
              </div>
              <h3 className="text-lg font-bold text-stone-900">
                Wer reagiert so auf Disziplin? (Frage {currentChallengeIndex + 1} von {challengeQuotes.length})
              </h3>
            </div>
            <div className="text-xs font-mono text-stone-600 bg-stone-100 px-3 py-1.5 rounded-md self-start sm:self-auto">
              Punkte: <span className="font-bold text-amber-900">{score}</span> / {challengeQuotes.length}
            </div>
          </div>

          <div className="max-w-2xl mx-auto text-center mb-6">
            <p className="text-base sm:text-lg font-serif-literary italic text-stone-900 p-6 bg-stone-50 rounded-xl border border-stone-200 leading-relaxed shadow-xs">
              {activeChallenge.text}
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-6">
            {CHARACTER_PROFILES.map((char) => {
              const isSelected = userGuess === char.id;
              const isCorrect = char.id === activeChallenge.correctCharacterId;

              let btnStyle = "border-stone-200 bg-white text-stone-700 hover:bg-stone-50";
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = "border-emerald-600 bg-emerald-50 text-emerald-950 font-bold";
                } else if (isSelected && !isCorrect) {
                  btnStyle = "border-red-500 bg-red-50 text-red-900";
                } else {
                  btnStyle = "border-stone-200 bg-stone-50 text-stone-400 opacity-60";
                }
              }

              return (
                <button
                  key={char.id}
                  disabled={isAnswered}
                  onClick={() => handleGuess(char.id)}
                  className={`p-3 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${btnStyle}`}
                >
                  {char.name}
                </button>
              );
            })}
          </div>

          {/* Feedback & Next Button */}
          {isAnswered && (
            <div className="max-w-2xl mx-auto p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in">
              <div className="flex items-start gap-2.5">
                {userGuess === activeChallenge.correctCharacterId ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                )}
                <div className="text-xs text-stone-700 leading-relaxed">
                  <strong className="text-stone-900 block mb-0.5">
                    {userGuess === activeChallenge.correctCharacterId ? "Richtig erkannt!" : "Leider nicht ganz."}
                  </strong>
                  {activeChallenge.explanation}
                </div>
              </div>

              <button
                onClick={handleNextChallenge}
                className="px-4 py-2 text-xs font-bold bg-stone-900 text-white rounded-lg hover:bg-stone-800 shrink-0 cursor-pointer"
              >
                {currentChallengeIndex < challengeQuotes.length - 1 ? "Nächstes Zitat →" : "Erneut spielen"}
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
