import React, { useState } from 'react';
import { Sliders, Shield, Brain, UserCheck, AlertOctagon } from 'lucide-react';

interface PsychologyModuleProps {
  everydayExampleNote?: string;
  onUpdateEverydayExample?: (val: string) => void;
}

export const PsychologyModule: React.FC<PsychologyModuleProps> = ({
  everydayExampleNote = "",
  onUpdateEverydayExample
}) => {
  const [sliderValue, setSliderValue] = useState<number>(65);

  const getDisciplineSpectrum = (val: number) => {
    if (val <= 25) {
      return {
        stage: "Stufe 1: Eigene Disziplin (Freiwillig)",
        color: "text-emerald-800",
        badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-200",
        title: "Eigene Ziele erreichen (Freiwillig)",
        description: "Ein Musiker übt täglich Gitarre, eine Läuferin trainiert für den Wettkampf. Diese Disziplin tut dir selbst gut und niemand zwingt dich dazu.",
        novelReference: "Laurie Saunders vor dem Experiment: Sie lernt fleißig und arbeitet an der Schülerzeitung, denkt aber immer selbstständig mit.",
        philosophicalNote: "Freiheit bedeutet, sich selbst Regeln zu geben, um eigene Träume zu verwirklichen.",
        dangerLevel: "Keine Gefahr: Hilft dir, selbstständig und stark zu werden."
      };
    } else if (val <= 50) {
      return {
        stage: "Stufe 2: Feste Regeln im Team (Fairplay)",
        color: "text-sky-800",
        badgeBg: "bg-sky-50 text-sky-800 border-sky-200",
        title: "Gemeinsame Spielregeln & Verlässlichkeit",
        description: "Verkehrsregeln, Schiedsrichter beim Fußball, Absprachen bei Gruppenarbeiten. Diese Regeln machen das Leben leichter und schützen alle.",
        novelReference: "David hofft, dass das Football-Team durch Pünktlichkeit beim Training endlich besser zusammenspielt.",
        philosophicalNote: "Faire Regeln schützen die Schwachen, damit nicht einfach der Stärkere bestimmt.",
        dangerLevel: "Geringe Gefahr: Regeln können besprochen und bei Bedarf gemeinsam geändert werden."
      };
    } else if (val <= 75) {
      return {
        stage: "Stufe 3: Befohlener Drill (Die Welle beginnt)",
        color: "text-amber-800",
        badgeBg: "bg-amber-50 text-amber-900 border-amber-200",
        title: "Hier wird es brenzlig: Zwang von oben (Tag 1 & 2)",
        description: "Der Lehrer bestimmt die Sitzhaltung, die Worte ('Mr. Ross') und das Tempo. Wer Fragen stellt oder zögert, wird sofort gerügt.",
        novelReference: "Brad wird sofort unterbrochen, als er ohne 'Mr. Ross' antwortet. Die Klasse ist stolz darauf, wie lautlos alle gehorchen.",
        philosophicalNote: "Wer aufhört, Fragen zu stellen, gibt ein Stück seiner Freiheit und seines Verstandes ab.",
        dangerLevel: "Große Gefahr: Eigene Meinungen werden als störend empfunden."
      };
    } else {
      return {
        stage: "Stufe 4: Blinder Gehorsam & Drohungen (Gefahr)",
        color: "text-red-800",
        badgeBg: "bg-red-50 text-red-900 border-red-200",
        title: "Die Gruppe wird zur Waffe",
        description: "Wer nicht mitmacht, wird bedroht oder verprügelt. Niemand darf mehr widersprechen. Alle müssen dasselbe denken und tun.",
        novelReference: "Tag 4: Ein Schüler wird geschlagen; David stößt seine Freundin Laurie zu Boden; Drohbriefe an die Schülerzeitung.",
        philosophicalNote: "Wenn niemand mehr nachdenkt, sondern alle nur noch Befehle ausführen, geschehen schlimme Dinge.",
        dangerLevel: "Sehr gefährlich: Das eigene Gewissen wird komplett ausgeschaltet."
      };
    }
  };

  const currentSpectrum = getDisciplineSpectrum(sliderValue);

  return (
    <section id="psychology" className="py-12 bg-stone-100 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-semibold text-amber-800 tracking-wider uppercase mb-1">
            Modul 02 · Warum hat es funktioniert?
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 mb-3">
            Die Tricks hinter dem Motto „Macht durch Disziplin“
          </h2>
          <p className="text-sm text-stone-700 font-serif-literary leading-relaxed">
            Warum machten fast alle Schüler sofort begeistert mit? 
            Hätte Herr Ross gesagt: „Ab heute gehorcht ihr mir blind!“, hätten alle gelacht. 
            Stattdessen nutzte er vier einfache psychologische Kniffe:
          </p>
        </div>

        {/* 4 Pillars of Psychological Seduction */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center mb-3">
                <Brain className="w-5 h-5 text-amber-800" />
              </div>
              <h3 className="text-sm font-bold text-stone-900 mb-2">
                1. Der Kopf wird frei
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-serif-literary">
                Schüler haben oft Stress: Was ziehe ich an? Was denken die anderen über mich? 
                Strenge Regeln nehmen diese Sorgen ab. Man muss nicht mehr überlegen, sondern tut einfach, was gesagt wird.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-500">
              <strong className="text-stone-700">Wirkung:</strong> Die Schüler empfinden die strenge Ordnung als Erleichterung.
            </div>
          </div>

          <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center mb-3">
                <UserCheck className="w-5 h-5 text-amber-800" />
              </div>
              <h3 className="text-sm font-bold text-stone-900 mb-2">
                2. Körper steuert Kopf
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-serif-literary">
                Körper und Gedanken hängen zusammen. Wer kerzengerade sitzt und strammsteht, 
                wird automatisch ernster und konzentrierter. Wer strammsteht, traut sich viel seltener zu widersprechen.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-500">
              <strong className="text-stone-700">Wirkung:</strong> Stramme Haltung macht es schwerer, Zweifel zu äußern.
            </div>
          </div>

          <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center mb-3">
                <Shield className="w-5 h-5 text-amber-800" />
              </div>
              <h3 className="text-sm font-bold text-stone-900 mb-2">
                3. Alle sind gleich
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-serif-literary">
                Der beliebte Sportler und der gemobbte Robert müssen genau dieselben Übungen machen. 
                Niemand ist mehr cooler oder uncooler als der andere. Das fühlt sich für viele wie echte Gerechtigkeit an.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-500">
              <strong className="text-stone-700">Wirkung:</strong> Vor allem Außenseiter fühlen sich endlich beschützt.
            </div>
          </div>

          <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center mb-3">
                <AlertOctagon className="w-5 h-5 text-amber-800" />
              </div>
              <h3 className="text-sm font-bold text-stone-900 mb-2">
                4. Stolz statt Gehorsam
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-serif-literary">
                Herr Ross nannte den Drill nicht „Gehorsam“, sondern „Macht“. 
                Er redete den Schülern ein, dass sie besser und stärker seien als alle anderen Klassen, weil sie diszipliniert sind.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-500">
              <strong className="text-stone-700">Wirkung:</strong> Gehorchen fühlt sich plötzlich wie ein Sieg an.
            </div>
          </div>

        </div>

        {/* Interactive Continuum Slider */}
        <div className="bg-white border border-stone-200 rounded-xl p-6 lg:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-200 gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sliders className="w-4 h-4 text-amber-800" />
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Der Schieberegler
                </span>
              </div>
              <h3 className="text-xl font-bold text-stone-900">
                Wann wird Disziplin gefährlich?
              </h3>
            </div>
            <div className="shrink-0">
              <span className={`inline-block px-3 py-1 rounded-md text-xs font-bold border ${currentSpectrum.badgeBg}`}>
                {currentSpectrum.stage}
              </span>
            </div>
          </div>

          {/* Slider input */}
          <div className="mb-8">
            <div className="flex justify-between text-xs font-medium text-stone-500 mb-2">
              <span>0% · Freiwillig für dich</span>
              <span className="font-mono font-bold text-stone-800">{sliderValue}% Strenge</span>
              <span>100% · Blinder Zwang</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-800"
            />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1">
              <span>Eigene Ziele</span>
              <span>Fairplay im Team</span>
              <span className="text-amber-800 font-bold">Hier kippt es (Die Welle)</span>
              <span>Blinder Gehorsam</span>
            </div>
          </div>

          {/* Dynamic Analysis Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-stone-50 border border-stone-200 rounded-xl p-6">
            <div className="lg:col-span-7 space-y-4">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-stone-400 mb-1">
                  Was hier passiert:
                </div>
                <h4 className="text-lg font-bold text-stone-900">
                  {currentSpectrum.title}
                </h4>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-serif-literary mt-1">
                  {currentSpectrum.description}
                </p>
              </div>

              <div className="p-3 bg-white border border-stone-200 rounded-lg">
                <span className="text-xs font-bold text-stone-900 block mb-1">
                  Passende Szene im Buch:
                </span>
                <p className="text-xs text-stone-600 font-serif-literary leading-relaxed">
                  {currentSpectrum.novelReference}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-stone-200 pt-4 lg:pt-0 lg:pl-6">
              <div>
                <span className="text-xs font-bold text-stone-900 block mb-1">
                  Zum Nachdenken:
                </span>
                <p className="text-xs text-stone-600 font-serif-literary leading-relaxed mb-4">
                  {currentSpectrum.philosophicalNote}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-stone-100 border border-stone-200">
                <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block mb-0.5">
                  Gefahr für die Freiheit:
                </span>
                <span className="text-xs font-semibold text-stone-900">
                  {currentSpectrum.dangerLevel}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Student Active Task: Eigenes Alltagsbeispiel eintragen */}
        <div className="mt-8 bg-white border border-amber-800/30 rounded-xl p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-800" />
              <h3 className="text-base font-bold text-stone-900">
                Mitmach-Aufgabe: Dein eigenes Beispiel aus dem Alltag
              </h3>
            </div>
            <span className="text-xs font-mono text-stone-500 bg-stone-100 px-2.5 py-1 rounded">
              Wird in dein Lernjournal übernommen
            </span>
          </div>

          <p className="text-xs sm:text-sm text-stone-700 font-serif-literary leading-relaxed mb-4">
            Hast du selbst schon einmal erlebt, dass strenge Regeln geholfen haben – oder dass Gruppenzwang plötzlich unangenehm wurde? 
            (Zum Beispiel: im Sportteam, bei einer Klassenreise, in einer WhatsApp-Gruppe, beim Gaming oder im Freundeskreis).
          </p>

          <textarea
            value={everydayExampleNote}
            onChange={(e) => onUpdateEverydayExample && onUpdateEverydayExample(e.target.value)}
            placeholder="Beschreibe hier dein eigenes Erlebnis in 2-4 Sätzen: Was war die Situation? Wie hat sich die Gruppe verhalten und wie ging es dir dabei?"
            rows={4}
            className="w-full text-xs sm:text-sm font-serif-literary p-3.5 rounded-lg border border-stone-300 bg-stone-50 text-stone-900 placeholder:text-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 transition-colors"
          />

          <div className="flex items-center justify-between mt-3 text-[11px] text-stone-500">
            <span>
              {everydayExampleNote.trim() ? (
                <span className="text-emerald-700 font-medium">✓ Gespeichert für die Klassenbesprechung</span>
              ) : (
                <span>Tipp: Ein kurzes Beispiel reicht völlig aus.</span>
              )}
            </span>
            <span className="font-mono">{everydayExampleNote.length} Zeichen</span>
          </div>
        </div>

      </div>
    </section>
  );
};
