import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, CheckCircle2, AlertTriangle, Timer, UserCheck, Sparkles, HelpCircle } from 'lucide-react';

interface DrillSimulationProps {
  drillObservation: string;
  onLogDrillExperience: (note: string) => void;
}

export const DrillSimulation: React.FC<DrillSimulationProps> = ({
  drillObservation,
  onLogDrillExperience
}) => {
  // Step in the module: 'posture-config' | 'live-drill' | 'debrief'
  const [activeTab, setActiveTab] = useState<'posture-config' | 'live-drill' | 'debrief'>('posture-config');

  // Posture Tuning State
  const [postureState, setPostureState] = useState({
    spine: 'slouched', // 'slouched' | 'erect'
    feet: 'tucked',    // 'tucked' | 'flat'
    hands: 'fidgeting',// 'fidgeting' | 'folded'
    eyes: 'wandering'  // 'wandering' | 'forward'
  });

  const isPerfectPosture =
    postureState.spine === 'erect' &&
    postureState.feet === 'flat' &&
    postureState.hands === 'folded' &&
    postureState.eyes === 'forward';

  // Live Drill State
  const [drillStage, setDrillStage] = useState<number>(0);
  const [drillRunning, setDrillRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [drillLog, setDrillLog] = useState<string[]>([]);
  const [drillError, setDrillError] = useState<string | null>(null);
  const [drillSuccess, setDrillSuccess] = useState<string | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (drillRunning) {
      const startTime = performance.now() - elapsedTime * 1000;
      timerRef.current = window.setInterval(() => {
        setElapsedTime(Number(((performance.now() - startTime) / 1000).toFixed(2)));
      }, 50);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [drillRunning]);

  const startDrill = () => {
    setDrillStage(1);
    setElapsedTime(0);
    setDrillLog(["Mr. Ross betritt den Raum mit einer Stoppuhr in der Hand."]);
    setDrillError(null);
    setDrillSuccess(null);
    setDrillRunning(true);
  };

  const resetDrill = () => {
    setDrillRunning(false);
    setDrillStage(0);
    setElapsedTime(0);
    setDrillError(null);
    setDrillSuccess(null);
  };

  // Handler for actions during drill
  const handleDrillAction = (actionKey: string) => {
    if (!drillRunning) return;

    if (drillStage === 1) {
      if (actionKey === 'stand_right') {
        setDrillSuccess("Perfekt! Rechterhand stramm aufgestanden.");
        setDrillError(null);
        setDrillLog(prev => [...prev, `[${elapsedTime}s] Befehl 'Aufstehen': Sofort ausgeführt.`]);
        setDrillStage(2);
      } else {
        setDrillError("Regelverstoß! Ross verlangt Aufstehen RECHTS neben dem Pult ohne Lärm.");
      }
    } else if (drillStage === 2) {
      if (actionKey === 'sit_erect') {
        setDrillSuccess("Hervorragend. Lautlos hingesetzt, Haltung eingenommen.");
        setDrillError(null);
        setDrillLog(prev => [...prev, `[${elapsedTime}s] Befehl 'Hinsetzen': Stramme Haltung in 2 Sekunden.`]);
        setDrillStage(3);
      } else {
        setDrillError("Zu laut oder schlaff hingesetzt! Ross schüttelt missbilligend den Kopf.");
      }
    } else if (drillStage === 3) {
      if (actionKey === 'correct_speech') {
        setDrillSuccess("Exakt! Aufgestanden, mit 'Mr. Ross' begonnen, prägnante Antwort!");
        setDrillError(null);
        setDrillLog(prev => [...prev, `[${elapsedTime}s] Ross' Frage blitzschnell beantwortet: 'Mr. Ross, Japan!'`]);
        setDrillStage(4);
      } else if (actionKey === 'no_formula') {
        setDrillError("Fehler! Du hast die wichtigste Formel vergessen: Jede Antwort beginnt mit 'Mr. Ross'!");
      } else if (actionKey === 'seated_answer') {
        setDrillError("Regelverstoß! Wer antwortet, MUSS an der Seite des Pultes stehen!");
      }
    } else if (drillStage === 4) {
      if (actionKey === 'final_sync') {
        setDrillRunning(false);
        const finalTime = elapsedTime;
        if (!bestTime || finalTime < bestTime) {
          setBestTime(finalTime);
        }
        setDrillLog(prev => [...prev, `[${finalTime}s] Vollständiger Drill in ${finalTime}s abgeschlossen. Ross notiert die Rekordzeit!`]);
        setDrillSuccess(`Gratulation! Rekordzeit: ${finalTime}s. Die Klasse applaudiert verblüfft.`);
        setDrillStage(5);
        onLogDrillExperience(`Drill in ${finalTime}s absolviert.`);
      }
    }
  };

  return (
    <section id="drill" className="py-12 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold text-amber-800 tracking-wider uppercase mb-1">
              Modul 01 · Das Experiment im Klassenzimmer
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
              Der Stoppuhr-Drill von Ben Ross
            </h2>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg shrink-0">
            <button
              onClick={() => setActiveTab('posture-config')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                activeTab === 'posture-config'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              1. Haltungs-Check
            </button>
            <button
              onClick={() => setActiveTab('live-drill')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                activeTab === 'live-drill'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              2. Stoppuhr-Simulation
            </button>
            <button
              onClick={() => setActiveTab('debrief')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                activeTab === 'debrief'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              3. Warum es funktionierte
            </button>
          </div>
        </div>

        {/* TAB 1: POSTURE CONFIG */}
        {activeTab === 'posture-config' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Visual chalk diagram container */}
            <div className="lg:col-span-5 bg-stone-900 rounded-xl overflow-hidden border border-stone-800 p-6 text-white flex flex-col justify-between min-h-[380px]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                    Tafelanschrieb · Gordon High
                  </span>
                  <span className="text-xs text-stone-400">Raum 102</span>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white mb-3">
                  „Die richtige Sitzhaltung“
                </h3>
                <p className="text-xs text-stone-300 font-serif-literary leading-relaxed mb-6">
                  Herr Ross verlangte volle Aufmerksamkeit: 
                  Beide Füße auf den Boden, der Rücken gerade, die Hände ruhig auf dem Tisch.
                </p>
              </div>

              {/* Status indicator on chalkboard */}
              <div className="p-4 rounded-lg bg-stone-800/80 border border-stone-700">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${isPerfectPosture ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-200">
                    {isPerfectPosture ? 'Perfekt: So will es Herr Ross!' : 'Noch nicht ganz: Haltung anpassen'}
                  </span>
                </div>
                <p className="text-xs text-stone-300">
                  {isPerfectPosture
                    ? '„Genau so! Jetzt seid ihr wach, bereit und hört auf jedes Wort.“ – Ben Ross'
                    : '„Brad, nimm die Füße vom Gestell! David, Rücken gerade! Schlaffes Sitzen erzeugt schlaffe Gedanken!“'}
                </p>
              </div>
            </div>

            {/* Posture Controls */}
            <div className="lg:col-span-7 bg-stone-50 border border-stone-200 rounded-xl p-6">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-stone-900 mb-1">
                  Stelle die 4 Haltungen ein
                </h3>
                <p className="text-xs text-stone-600">
                  Klicke auf die verschiedenen Optionen und beobachte, wie Herr Ross aus einer unruhigen Klasse eine gehorsame Gruppe formt.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                
                {/* 1. Rücken */}
                <div className="p-4 bg-white border border-stone-200 rounded-lg">
                  <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                    1. Wirbelsäule
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() => setPostureState(p => ({ ...p, spine: 'slouched' }))}
                      className={`w-full text-left px-3 py-2 text-xs rounded transition-all cursor-pointer ${
                        postureState.spine === 'slouched'
                          ? 'bg-stone-200 text-stone-900 font-semibold'
                          : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      Lässig zurückgelehnt (Individuell)
                    </button>
                    <button
                      onClick={() => setPostureState(p => ({ ...p, spine: 'erect' }))}
                      className={`w-full text-left px-3 py-2 text-xs rounded transition-all cursor-pointer ${
                        postureState.spine === 'erect'
                          ? 'bg-amber-800 text-white font-semibold'
                          : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      Kerzengerade aufgerichtet (Ross-Norm)
                    </button>
                  </div>
                </div>

                {/* 2. Füße */}
                <div className="p-4 bg-white border border-stone-200 rounded-lg">
                  <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                    2. Fußstellung
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() => setPostureState(p => ({ ...p, feet: 'tucked' }))}
                      className={`w-full text-left px-3 py-2 text-xs rounded transition-all cursor-pointer ${
                        postureState.feet === 'tucked'
                          ? 'bg-stone-200 text-stone-900 font-semibold'
                          : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      Beine übereinander / unter dem Stuhl
                    </button>
                    <button
                      onClick={() => setPostureState(p => ({ ...p, feet: 'flat' }))}
                      className={`w-full text-left px-3 py-2 text-xs rounded transition-all cursor-pointer ${
                        postureState.feet === 'flat'
                          ? 'bg-amber-800 text-white font-semibold'
                          : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      Beide Sohlen flach parallel am Boden
                    </button>
                  </div>
                </div>

                {/* 3. Hände */}
                <div className="p-4 bg-white border border-stone-200 rounded-lg">
                  <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                    3. Hände & Arme
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() => setPostureState(p => ({ ...p, hands: 'fidgeting' }))}
                      className={`w-full text-left px-3 py-2 text-xs rounded transition-all cursor-pointer ${
                        postureState.hands === 'fidgeting'
                          ? 'bg-stone-200 text-stone-900 font-semibold'
                          : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      Mit Bleistift tippen / Kopf aufgestützt
                    </button>
                    <button
                      onClick={() => setPostureState(p => ({ ...p, hands: 'folded' }))}
                      className={`w-full text-left px-3 py-2 text-xs rounded transition-all cursor-pointer ${
                        postureState.hands === 'folded'
                          ? 'bg-amber-800 text-white font-semibold'
                          : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      Ruhig flach auf dem Tisch
                    </button>
                  </div>
                </div>

                {/* 4. Augen */}
                <div className="p-4 bg-white border border-stone-200 rounded-lg">
                  <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                    4. Blickrichtung
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() => setPostureState(p => ({ ...p, eyes: 'wandering' }))}
                      className={`w-full text-left px-3 py-2 text-xs rounded transition-all cursor-pointer ${
                        postureState.eyes === 'wandering'
                          ? 'bg-stone-200 text-stone-900 font-semibold'
                          : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      Zum Fenster / zum Nachbarn tuscheln
                    </button>
                    <button
                      onClick={() => setPostureState(p => ({ ...p, eyes: 'forward' }))}
                      className={`w-full text-left px-3 py-2 text-xs rounded transition-all cursor-pointer ${
                        postureState.eyes === 'forward'
                          ? 'bg-amber-800 text-white font-semibold'
                          : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      Starr nach vorn zu Mr. Ross & Tafel
                    </button>
                  </div>
                </div>

              </div>

              {isPerfectPosture && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-amber-900">
                      Alle Schüler sitzen kerzengerade!
                    </div>
                    <p className="text-xs text-amber-800 leading-relaxed mt-0.5">
                      Niemand lümmelt mehr herum. Die Klasse ist mucksmäuschenstill und bereit für den nächsten Schritt: Die Stoppuhr.
                    </p>
                    <button
                      onClick={() => setActiveTab('live-drill')}
                      className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-amber-800 text-white rounded hover:bg-amber-900 cursor-pointer"
                    >
                      Weiter zur Stoppuhr-Simulation →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: LIVE DRILL SIMULATION */}
        {activeTab === 'live-drill' && (
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 lg:p-8">
            {/* Top Bar with Stopwatch & Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-stone-200 gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center font-mono text-xl font-bold border border-stone-700 shadow-inner">
                  <Timer className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Ross' Stoppuhr (Rekordjagd)
                  </div>
                  <div className="text-3xl font-mono font-bold text-stone-900 tabular-nums">
                    {elapsedTime.toFixed(2)}s
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {bestTime && (
                  <div className="text-xs font-mono text-stone-600 bg-white border border-stone-200 px-3 py-2 rounded-lg">
                    Beste Zeit: <span className="font-bold text-amber-800">{bestTime}s</span>
                  </div>
                )}
                {!drillRunning && drillStage === 0 && (
                  <button
                    onClick={startDrill}
                    className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-amber-800 hover:bg-amber-900 rounded-lg cursor-pointer shadow-xs active:scale-98 transition-all"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Drill starten</span>
                  </button>
                )}
                {(drillRunning || drillStage > 0) && (
                  <button
                    onClick={resetDrill}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 bg-white border border-stone-300 hover:bg-stone-100 rounded-lg cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Neustart</span>
                  </button>
                )}
              </div>
            </div>

            {/* Drill Interactive Arena */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left: Current Command from Ross */}
              <div className="lg:col-span-7 space-y-6">
                
                {drillStage === 0 && (
                  <div className="text-center py-12 px-6 bg-white border border-dashed border-stone-300 rounded-xl">
                    <UserCheck className="w-12 h-12 text-stone-400 mx-auto mb-3" />
                    <h4 className="text-base font-bold text-stone-900 mb-1">
                      Bereit für den Disziplin-Test?
                    </h4>
                    <p className="text-xs text-stone-600 max-w-md mx-auto mb-5 leading-relaxed">
                      Reagiere auf Ben Ross' Zurufe. Befolge die 3 goldenen Regeln: 
                      Aufstehen rechts neben dem Tisch, Haltung einnehmen und jede Antwort mit „Mr. Ross“ beginnen.
                    </p>
                    <button
                      onClick={startDrill}
                      className="px-6 py-2.5 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-lg cursor-pointer"
                    >
                      Befehl erwarten
                    </button>
                  </div>
                )}

                {drillStage === 1 && (
                  <div className="bg-white border-2 border-amber-600 rounded-xl p-6 shadow-xs animate-in fade-in">
                    <div className="text-xs font-mono font-bold text-amber-800 uppercase tracking-widest mb-1">
                      Befehl 1 von Ben Ross:
                    </div>
                    <div className="text-xl font-bold text-stone-900 mb-4">
                      „Klasse, aufstehen! Zeigt mir blitzschnelle Einsatzbereitschaft!“
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        onClick={() => handleDrillAction('stand_slow')}
                        className="p-3 text-left border border-stone-200 rounded-lg hover:bg-stone-50 text-xs font-medium text-stone-700 cursor-pointer"
                      >
                        Gemächlich aufstehen und sich strecken
                      </button>
                      <button
                        onClick={() => handleDrillAction('stand_right')}
                        className="p-3 text-left border-2 border-stone-900 bg-stone-900 text-white rounded-lg hover:bg-stone-800 text-xs font-semibold cursor-pointer shadow-xs"
                      >
                        Blitzschnell rechts neben den Schreibtisch treten und strammstehen
                      </button>
                    </div>
                  </div>
                )}

                {drillStage === 2 && (
                  <div className="bg-white border-2 border-amber-600 rounded-xl p-6 shadow-xs animate-in fade-in">
                    <div className="text-xs font-mono font-bold text-amber-800 uppercase tracking-widest mb-1">
                      Befehl 2 von Ben Ross:
                    </div>
                    <div className="text-xl font-bold text-stone-900 mb-4">
                      „Hinsetzen! Völlige Lautlosigkeit! Kein Stuhlrücken!“
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        onClick={() => handleDrillAction('sit_erect')}
                        className="p-3 text-left border-2 border-stone-900 bg-stone-900 text-white rounded-lg hover:bg-stone-800 text-xs font-semibold cursor-pointer shadow-xs"
                      >
                        Lautlos setzen, Füße flach, Wirbelsäule durchdrücken, Hände vorn
                      </button>
                      <button
                        onClick={() => handleDrillAction('sit_noisy')}
                        className="p-3 text-left border border-stone-200 rounded-lg hover:bg-stone-50 text-xs font-medium text-stone-700 cursor-pointer"
                      >
                        Auf den Stuhl plumpsen lassen und laut ausatmen
                      </button>
                    </div>
                  </div>
                )}

                {drillStage === 3 && (
                  <div className="bg-white border-2 border-amber-600 rounded-xl p-6 shadow-xs animate-in fade-in">
                    <div className="text-xs font-mono font-bold text-amber-800 uppercase tracking-widest mb-1">
                      Befehl 3 von Ben Ross (Melderegel):
                    </div>
                    <div className="text-xl font-bold text-stone-900 mb-2">
                      „Frage an die Reihe: Welches Land überfiel 1941 Pearl Harbor?“
                    </div>
                    <p className="text-xs text-stone-500 mb-4">
                      Wähle die vorschriftsmäßige Verhaltensweise nach Regel 2 & 3:
                    </p>
                    <div className="space-y-2.5">
                      <button
                        onClick={() => handleDrillAction('seated_answer')}
                        className="w-full p-3 text-left border border-stone-200 rounded-lg hover:bg-stone-50 text-xs text-stone-700 cursor-pointer"
                      >
                        A) Im Sitzen rufen: „Japan war das!“
                      </button>
                      <button
                        onClick={() => handleDrillAction('no_formula')}
                        className="w-full p-3 text-left border border-stone-200 rounded-lg hover:bg-stone-50 text-xs text-stone-700 cursor-pointer"
                      >
                        B) Aufstehen und sagen: „Das japanische Kaiserreich, Herr Ross.“
                      </button>
                      <button
                        onClick={() => handleDrillAction('correct_speech')}
                        className="w-full p-3 text-left border-2 border-stone-900 bg-stone-900 text-white rounded-lg hover:bg-stone-800 text-xs font-semibold cursor-pointer"
                      >
                        C) Aufstehen, strammstehen: „Mr. Ross, Japan!“
                      </button>
                    </div>
                  </div>
                )}

                {drillStage === 4 && (
                  <div className="bg-white border-2 border-amber-600 rounded-xl p-6 shadow-xs animate-in fade-in">
                    <div className="text-xs font-mono font-bold text-amber-800 uppercase tracking-widest mb-1">
                      Befehl 4 von Ben Ross (Kollektiver Stoppuhr-Sprint):
                    </div>
                    <div className="text-xl font-bold text-stone-900 mb-2">
                      „Die Klasse unterbietet die Rekordzeit: Alle synchronisieren!“
                    </div>
                    <p className="text-xs text-stone-600 mb-4">
                      Klicke im Bruchteil einer Sekunde auf den finalen Auslöser, um den Klassendrill zu beenden:
                    </p>
                    <button
                      onClick={() => handleDrillAction('final_sync')}
                      className="w-full py-4 text-center border-2 border-amber-800 bg-amber-800 hover:bg-amber-900 text-white font-bold text-sm rounded-xl cursor-pointer shadow-md active:scale-98 transition-all"
                    >
                      ⚡ BLITZSCHNELL HINSETZEN & STILL SEIN
                    </button>
                  </div>
                )}

                {drillStage === 5 && (
                  <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-6 text-emerald-950">
                    <div className="flex items-center gap-2 font-bold text-emerald-900 text-lg mb-2">
                      <Sparkles className="w-5 h-5 text-emerald-700" />
                      <span>Drill geschafft!</span>
                    </div>
                    <p className="text-xs text-emerald-800 leading-relaxed mb-4">
                      Du hast in {elapsedTime} Sekunden erlebt, was die Schüler im Buch fühlten: 
                      Das Adrenalin, der Stolz auf die eigene Schnelligkeit und die plötzliche Ruhe im Raum. 
                      Niemand lachte mehr – alle machten mit.
                    </p>

                    {/* Active student writing box */}
                    <div className="mb-4 p-3.5 bg-white border border-emerald-200 rounded-lg text-left">
                      <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider block mb-1">
                        ✍️ Deine eigene Beobachtung eintragen:
                      </label>
                      <p className="text-[11px] text-stone-600 mb-2">
                        Wie hat sich der Zeitdruck angefühlt? Warum macht es Spaß, auf die Sekunde genau zu reagieren?
                      </p>
                      <textarea
                        value={drillObservation}
                        onChange={(e) => onLogDrillExperience(e.target.value)}
                        placeholder="Schreibe hier, was dir beim Stoppuhr-Drill durch den Kopf gegangen ist..."
                        rows={2}
                        className="w-full text-xs p-2.5 rounded-md border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 text-stone-900"
                      />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setActiveTab('debrief')}
                        className="px-4 py-2 text-xs font-semibold bg-emerald-800 text-white rounded-lg hover:bg-emerald-900 cursor-pointer"
                      >
                        Warum hat es funktioniert? →
                      </button>
                      <button
                        onClick={startDrill}
                        className="px-4 py-2 text-xs font-medium bg-white text-emerald-900 border border-emerald-300 rounded-lg hover:bg-emerald-100 cursor-pointer"
                      >
                        Nochmal probieren (Rekord jagen)
                      </button>
                    </div>
                  </div>
                )}

                {/* Error/Warning Feedback */}
                {drillError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-lg flex items-center gap-2 animate-in fade-in">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{drillError}</span>
                  </div>
                )}

                {drillSuccess && drillStage < 5 && (
                  <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-lg flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-amber-700" />
                    <span>{drillSuccess}</span>
                  </div>
                )}

              </div>

              {/* Right: Real-Time Drill Protocol Log */}
              <div className="lg:col-span-5 bg-white border border-stone-200 rounded-xl p-5 shadow-xs">
                <div className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>Unterrichts-Protokoll</span>
                  <span className="font-mono text-stone-400 text-[10px]">KAPITEL 5</span>
                </div>
                
                <div className="font-mono text-xs text-stone-700 bg-stone-50 border border-stone-100 p-3 rounded-lg min-h-[220px] max-h-[300px] overflow-y-auto space-y-2">
                  {drillLog.length === 0 ? (
                    <div className="text-stone-400 italic">
                      Noch kein Drill gestartet. Drücke auf 'Drill starten'.
                    </div>
                  ) : (
                    drillLog.map((log, idx) => (
                      <div key={idx} className="border-b border-stone-200/50 pb-1.5 last:border-none">
                        {log}
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-500 font-serif-literary leading-relaxed">
                  <strong className="text-stone-700">Wahre Begebenheit:</strong> Beim echten Experiment 1967 schaffte es die Klasse, innerhalb von nur 5 Sekunden vollkommen lautlos an den Tischen zu sitzen.
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: DEBRIEF */}
        {activeTab === 'debrief' && (
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 lg:p-8">
            <div className="max-w-3xl mb-8">
              <div className="text-xs font-semibold text-amber-800 tracking-wider uppercase mb-1">
                Erkenntnis
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mb-3">
                Warum machte der Drill den Schülern eigentlich Spaß?
              </h3>
              <p className="text-sm text-stone-700 leading-relaxed font-serif-literary">
                Das Überraschende im Buch: Die Schüler fühlten sich nach den strengen Übungen nicht unterdrückt. 
                Sie fühlten sich fit, wach und stark. Warum gefiel ihnen der Drill so gut?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 font-bold flex items-center justify-center text-sm mb-3">
                  01
                </div>
                <h4 className="text-sm font-bold text-stone-900 mb-2">
                  Spiel & Wettbewerb
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Die Stoppuhr machte aus dem Gehorsam einen Sport. 
                  Die Schüler kämpften gemeinsam gegen die Uhr, um ihren eigenen Rekord zu brechen. 
                  Gewinnen macht Spaß – und lenkt vom Nachdenken ab.
                </p>
              </div>

              <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 font-bold flex items-center justify-center text-sm mb-3">
                  02
                </div>
                <h4 className="text-sm font-bold text-stone-900 mb-2">
                  Schluss mit dem Chaos
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Vorher war es im Unterricht oft laut und unruhig. 
                  Die festen Regeln gaben den Schülern Sicherheit: Jeder wusste sofort ganz genau, 
                  was er tun und lassen sollte.
                </p>
              </div>

              <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 font-bold flex items-center justify-center text-sm mb-3">
                  03
                </div>
                <h4 className="text-sm font-bold text-stone-900 mb-2">
                  Keine Angst vor Fehlern
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Man musste keine langen, klugen Sätze bilden. 
                  Die feste Formel „Mr. Ross, [Antwort]!“ schützte vor Versprechern. 
                  Plötzlich trauten sich auch schüchterne Schüler wie Robert zu antworten.
                </p>
              </div>

            </div>

            <div className="mt-8 p-5 bg-stone-900 text-white rounded-xl">
              <div className="flex items-start gap-4">
                <HelpCircle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    Kernfrage für die Klasse:
                  </h4>
                  <p className="text-xs text-stone-300 font-serif-literary leading-relaxed mb-3">
                    „Wenn Ordnung und feste Regeln so guttun: Ab welchem Moment wird Disziplin gefährlich? 
                    Wann kippt ein gutes Miteinander in blinden Gehorsam um?“
                  </p>
                  <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-1">
                    ✍️ Deine eigene Antwort eintragen:
                  </label>
                  <textarea
                    value={drillObservation}
                    onChange={(e) => onLogDrillExperience(e.target.value)}
                    placeholder="Schreibe hier deinen Gedanken auf: Ab wann wird Disziplin für dich gefährlich?..."
                    rows={2}
                    className="w-full text-xs p-2.5 rounded-md border border-stone-700 bg-stone-800 text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
