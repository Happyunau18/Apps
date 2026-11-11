import { TextExcerpt, CharacterProfile, DilemmaCase, QuizQuestion } from '../types/learning';

export const NOVEL_CONTEXT = {
  author: "Morton Rhue (Todd Strasser)",
  realExperimenter: "Ron Jones (Geschichtslehrer in Palo Alto, Kalifornien, 1967)",
  bookPublication: "1981 (deutsch 1984)",
  setting: "Gordon High School, Raum 102 (Geschichtsklasse von Ben Ross)",
  triggerEvent: "Nach einem Film über den Nationalsozialismus fragen die Schüler schockiert: 'Warum hat sich damals niemand gewehrt? Warum haben alle einfach mitgemacht?'",
  centralMotto1: "Macht durch Disziplin",
  mottoOverview: [
    { title: "Macht durch Disziplin", day: "Tag 1 (Dienstag)", focus: "Gerade sitzen, still sein, auf die Sekunde genau reagieren, feste Sprechregeln." },
    { title: "Macht durch Gemeinschaft", day: "Tag 2 (Mittwoch)", focus: "Der Welle-Gruß, Mitgliedskarten, das Gefühl, dass alle gleich sind." },
    { title: "Macht durch Handeln", day: "Tag 3-5 (Donnerstag/Freitag)", focus: "Werbung für die Gruppe, Aufpasser, Drohungen gegen Schüler mit eigener Meinung." }
  ],
  disciplineRules: [
    {
      nr: "01",
      title: "Die Sitzhaltung (Gerade sitzen)",
      rule: "Füße flach auf den Boden, Rücken kerzengerade, Hände ruhig auf den Tisch, Blick nach vorne zur Tafel.",
      rationale: "Herr Ross erklärt: Wer gerade sitzt, bekommt besser Luft und kann sich besser konzentrieren. Der eigentliche Effekt: Die Schüler geben ihre gemütliche Haltung auf und gewöhnen sich daran, Anweisungen sofort auszuführen."
    },
    {
      nr: "02",
      title: "Die Stehregel beim Sprechen",
      rule: "Wer eine Frage beantworten will, muss zügig rechts neben seinen Tisch treten, strammstehen und warten, bis er aufgerufen wird.",
      rationale: "Niemand darf mehr gemütlich im Sitzen reinrufen. Wer aufstehen muss, steht im Mittelpunkt der ganzen Klasse und vor den Augen des Lehrers."
    },
    {
      nr: "03",
      title: "Die feste Antwortformel",
      rule: "Jede Antwort MUSS mit den Worten 'Mr. Ross, ...' beginnen. Die Antwort muss kurz, laut und ohne langes Nachdenken kommen.",
      rationale: "Kein langes Diskutieren oder Zweifeln mehr. Mit den ersten beiden Worten erkennen alle Schüler Herrn Ross jedes Mal aufs Neue als unangefochtenen Chef an."
    }
  ]
};

export const TEXT_EXCERPTS: TextExcerpt[] = [
  {
    id: "posture-intro",
    chapter: "Kapitel 5",
    title: "Die neue Sitzhaltung",
    context: "Herr Ross betritt den Raum und schreibt vier Worte groß an die Tafel: MACHT DURCH DISZIPLIN.",
    germanText: "Ross wandte sich an die Klasse: 'Heute sprechen wir über Disziplin.' Er zeigte auf die Tafel. 'Disziplin beginnt mit der Haltung. Wie ihr sitzt, beeinflusst, wie ihr denkt. Eine schlaffe Haltung erzeugt schlaffes Denken.' Er zeigte, wie man richtig sitzt: Beide Füße flach auf den Boden, der Rücken gerade, die Hände auf dem Tisch. 'Versucht es!' Zuerst kicherten einige Schüler, doch als Ross von Tisch zu Tisch ging und Haltungen korrigierte, hörte das Lachen auf. Ein Ruck ging durch das Zimmer.",
    annotations: [
      {
        phrase: "Disziplin beginnt mit der Haltung. Wie ihr sitzt, beeinflusst, wie ihr denkt.",
        analysis: "Herr Ross nutzt einen einfachen Trick: Er erklärt die strenge Haltung mit Gesundheit und Konzentration. So wirkt der Zwang zuerst ganz vernünftig.",
        pedagogicalCategory: "Körperhaltung"
      },
      {
        phrase: "Zuerst kicherten einige Schüler, doch als Ross von Tisch zu Tisch ging",
        analysis: "Typisch für den Einstieg: Was zuerst wie ein lustiges Spiel wirkt, wird durch die Ernsthaftigkeit des Lehrers plötzlich todernst.",
        pedagogicalCategory: "Manipulation"
      },
      {
        phrase: "Ein Ruck ging durch das Zimmer",
        analysis: "Das Gefühl der Gruppe: Wenn alle gleichzeitig still werden und dasselbe tun, empfinden Schüler das Chaos oft als gelöst und die Ordnung als angenehm.",
        pedagogicalCategory: "Gruppenzwang"
      }
    ],
    keyTakeaway: "Disziplin wird nicht als Strafe eingeführt, sondern als 'Geheimnis für mehr Erfolg'. Deshalb machen alle Schüler sofort begeistert mit."
  },
  {
    id: "stopwatch-drill",
    chapter: "Kapitel 5",
    title: "Der Wettlauf gegen die Stoppuhr",
    context: "Herr Ross schickt die Klasse auf den Flur und stoppt die Zeit, wie schnell alle an ihren Plätzen sitzen.",
    germanText: "'Ich will sehen, wie schnell ihr alle in perfekter Haltung an euren Plätzen sitzen könnt', rief Ross und zog seine Stoppuhr hervor. Beim ersten Versuch brauchten sie 46 Sekunden. 'Viel zu langsam! Noch einmal!' Die Klasse stürmte hinaus und rannte wieder hinein. Ross trieb sie an: 'Schneller! Keine Gespräche! Nur bewegen!' Beim dritten Versuch saßen alle 30 Schüler in genau 16 Sekunden mucksmäuschenstill an ihren Tischen. Keiner lachte mehr. Die Schüler schauten sich stolz an – stolz auf ihre gemeinsame Schnelligkeit.",
    annotations: [
      {
        phrase: "zog seine Stoppuhr hervor",
        analysis: "Die Stoppuhr macht aus dem Gehorchen ein Spiel: Die Klasse kämpft nicht gegen den Lehrer, sondern gemeinsam gegen die Zeit.",
        pedagogicalCategory: "Manipulation"
      },
      {
        phrase: "Keiner lachte mehr. Die Schüler schauten sich stolz an – stolz auf ihre gemeinsame Schnelligkeit.",
        analysis: "Der Wendepunkt: Der Stolz auf das Team verdrängt das Nachdenken. Alle wollen gewinnen und vergessen dabei zu fragen, warum sie das tun.",
        pedagogicalCategory: "Gruppenzwang"
      }
    ],
    keyTakeaway: "Geschwindigkeit und Wettkampf lassen keine Zeit zum Nachdenken: Wer schnell reagieren muss, stellt keine kritischen Fragen."
  },
  {
    id: "speech-protocol",
    chapter: "Kapitel 5 / 6",
    title: "Die Antwort-Regel: 'Mr. Ross, ...'",
    context: "Herr Ross legt fest, wie ab jetzt im Unterricht geantwortet werden muss.",
    germanText: "Ross schlug mit der Handfläche auf das Pult: 'Ab sofort gelten drei Regeln: Erstens – jeder muss aufstehen und neben seinem Tisch stehen, wenn er antwortet. Zweitens – die ersten beiden Worte jeder Antwort lauten immer: Mr. Ross. Drittens – Antworten müssen kurz, klar und zackig sein!' Er zeigte auf Brad: 'Wer war der Premierminister von Großbritannien zu Beginn des Zweiten Weltkriegs?' Brad sprang auf: 'Chamberlain!' Ross schüttelte energisch den Kopf: 'Falsch! Regel beachten!' Brad korrigierte sich sofort, stand stramm und rief: 'Mr. Ross, es war Neville Chamberlain!' Ross nickte zufrieden: 'Sehr gut, Brad. Schnell und auf den Punkt.'",
    annotations: [
      {
        phrase: "die ersten beiden Worte jeder Antwort lauten immer: Mr. Ross",
        analysis: "Macht-Gewohnheit: Wer vor jedem Satz zuerst den Namen des Lehrers rufen muss, gewöhnt sich daran, ihn als unangefochtenen Anführer zu sehen.",
        pedagogicalCategory: "Sprachregelung"
      },
      {
        phrase: "Antworten müssen kurz, klar und zackig sein",
        analysis: "Kein Platz für eigene Meinungen: Wer nur noch kurze Stichworte rufen darf, kann keine Zweifel oder eigenen Gedanken äußern.",
        pedagogicalCategory: "Sprachregelung"
      }
    ],
    keyTakeaway: "Feste Sprachregeln lenken das Denken: Wer nur noch kurze Formeln nachspricht, verlernt das eigene Nachdenken."
  },
  {
    id: "robert-transformation",
    chapter: "Kapitel 6",
    title: "Wie Robert Billings sich verändert",
    context: "Robert war der Klassenverlierer, der immer ausgelacht wurde. Durch die neuen Regeln verändert er sich komplett.",
    germanText: "Ross beobachtete Robert Billings. Früher hatte Robert immer zusammengesunken in der hintersten Ecke gesessen, unordentlich angezogen, die ständige Zielscheibe für Spott. Nun saß er kerzengerade in der zweiten Reihe. Sein Hemd war sauber eingesteckt, sein Blick fest nach vorne gerichtet. Als Ross eine Frage stellte, sprang Robert als Erster auf: 'Mr. Ross!' Seine Antwort kam wie aus der Pistole geschossen. Die Mitschüler blickten ihn mit neuem Respekt an. Robert lächelte stolz. Endlich war er kein Außenseiter mehr – er war der Musterschüler der Disziplin.",
    annotations: [
      {
        phrase: "Endlich war er kein Außenseiter mehr – er war der Musterschüler der Disziplin",
        analysis: "Schutz durch gleiche Regeln: Wer sich schwach oder ungeliebt fühlt, findet in strengen Regeln Halt. Robert wird nicht mehr gehänselt, weil alle dasselbe tun müssen.",
        pedagogicalCategory: "Gruppenzwang"
      },
      {
        phrase: "Die Mitschüler blickten ihn mit neuem Respekt an.",
        analysis: "Belohnung für Anpassung: Wer am besten gehorcht, bekommt in solchen Gruppen plötzlich das meiste Lob.",
        pedagogicalCategory: "Gruppenzwang"
      }
    ],
    keyTakeaway: "Strenge Regeln sind besonders für Außenseiter verlockend: Weil alle gleichgeschaltet werden, fällt niemand mehr negativ auf."
  }
];

export const CHARACTER_PROFILES: CharacterProfile[] = [
  {
    id: "robert",
    name: "Robert Billings",
    role: "Der Außenseiter der Klasse",
    quote: "„Mr. Ross, ich bin bereit!“",
    reactionToDiscipline: "Macht begeistert mit. Robert wird zum treuesten Anhänger der neuen Regeln.",
    psychologicalMotives: [
      "Wurde früher ständig gehänselt und stand im Schatten seines klugen Bruders",
      "Endlich gleichwertig mit den beliebten Schülern und Sportlern",
      "Niemand lacht mehr über ihn, weil alle die gleichen Regeln befolgen müssen",
      "Ernennt sich selbst zum Bodyguard von Herrn Ross – fühlt sich erstmals wichtig"
    ],
    vulnerabilityFactor: "Hatte vorher kein Selbstvertrauen. Die Gruppe gibt ihm endlich Halt und Anerkennung.",
    turningPoint: "Als Herr Ross die Welle auflöst, bricht für Robert eine Welt zusammen. Er weint, weil er wieder 'nur der Außenseiter Robert' ist.",
    roleplayPrompt: "Schreibaufgabe: Schlüpfe in Roberts Rolle! Schreibe einen kurzen Tagebucheintrag nach dem ersten Schultag mit Herrn Ross: Wie fühlst du dich, jetzt wo dich plötzlich niemand mehr auslacht?"
  },
  {
    id: "laurie",
    name: "Laurie Saunders",
    role: "Die Schülerin mit eigener Meinung (Schülerzeitung)",
    quote: "„Fühlt ihr euch nicht auch ein bisschen wie Roboter?“",
    reactionToDiscipline: "Findet das Tempo anfangs spannend, merkt aber schnell, dass etwas nicht stimmt.",
    psychologicalMotives: [
      "Bemerkt, dass niemand mehr Witze macht oder eigene Ideen äußert",
      "Ihre Mutter warnt sie davor, der Masse blind hinterherzulaufen",
      "Hat den Mut, 'Nein' zu sagen, auch wenn ihre beste Freundin und ihr Freund mitmachen"
    ],
    vulnerabilityFactor: "Wird von ihren Freunden ausgeschlossen und bedroht, weil sie nicht gehorchen will.",
    turningPoint: "Sie schreibt einen mutigen Artikel in der Schülerzeitung und warnt vor der Gefahr der Bewegung.",
    roleplayPrompt: "Schreibaufgabe: Schlüpfe in Lauries Rolle! Was erzählst du heute Abend am Küchentisch deiner Mutter über die Veränderungen in deiner Klasse und dein ungutes Bauchgefühl?"
  },
  {
    id: "david",
    name: "David Collins",
    role: "Der Football-Spieler & Lauries Freund",
    quote: "„Wenn unser Football-Team diese Disziplin hätte, würden wir endlich gewinnen!“",
    reactionToDiscipline: "Findet den Drill super, weil er sich davon sportlichen Erfolg verspricht.",
    psychologicalMotives: [
      "Genervt von den ständigen Niederlagen des Schul-Football-Teams",
      "Glaubt, dass Härte und Drill jedes Problem lösen können",
      "Verwechselt Zusammenhalt im Sport mit blindem Gehorsam"
    ],
    vulnerabilityFactor: "Lässt sich von der Begeisterung mitreißen und greift sogar Laurie an, als sie Kritik übt.",
    turningPoint: "Nachdem er Laurie im Streit zu Boden stößt, erschrickt er über sich selbst und erkennt, was der Gehorsam aus ihm gemacht hat.",
    roleplayPrompt: "Schreibaufgabe: Schlüpfe in Davids Rolle! Was sagst du deinen Mitspielern in der Football-Kabine, um sie davon zu überzeugen, dass Herr Ross' Drill euer Team retten wird?"
  },
  {
    id: "ross",
    name: "Ben Ross",
    role: "Der Geschichtslehrer",
    quote: "„Disziplin ist der Schlüssel zum Erfolg. Seht ihr nicht, wie viel aufmerksamer ihr seid?“",
    reactionToDiscipline: "Fasziniert davon, wie mächtig er sich fühlt, wenn die Klasse aufs Wort gehorcht.",
    psychologicalMotives: [
      "Wollte den Schülern eigentlich nur zeigen, wie Diktaturen entstehen",
      "Genießt die plötzliche Ruhe und die Macht über die Schüler",
      "Verliert selbst fast die Kontrolle über das Experiment"
    ],
    vulnerabilityFactor: "Wird vom eigenen Erfolg berauscht und merkt zu spät, wie gefährlich das Spiel geworden ist.",
    turningPoint: "Am letzten Tag zeigt er der Schule ein riesiges Bild von Adolf Hitler und sagt: 'Ihr wärt gute Nazis gewesen.'",
    roleplayPrompt: "Schreibaufgabe: Schlüpfe in die Rolle von Herrn Ross! Notiere dir abends deine ehrlichen Gedanken: Wie hat es sich angefühlt, als 30 Schüler mucksmäuschenstill auf dein Kommando gehört haben?"
  }
];

export const DILEMMA_CASES: DilemmaCase[] = [
  {
    id: "case-team-coach",
    title: "Der strenge Basketball-Trainer",
    setting: "Sportverein / Basketball-Team",
    description: "Trainer Kramer führt harte Strafen ein: Wer 2 Minuten zu spät kommt, macht 50 Liegestütze. Und: Wenn ein Spieler einen Fehler macht, muss das GANZE Team Runden laufen. Das Team gewinnt zwar plötzlich Spiele, aber in der Kabine beschimpfen die Spieler zwei schwächere Mitspieler, die Fehler gemacht haben.",
    options: [
      {
        id: "opt-1",
        label: "Die Gruppen-Bestrafung akzeptieren – Hauptsache, wir gewinnen.",
        consequence: "Das Team gewinnt zwar, aber schwächere Spieler werden gemobbt und hören frustriert mit dem Sport auf.",
        criticalAnalysis: "Hier wird die Gruppe gegen Einzelne aufgehetzt – genau wie bei der Welle.",
        totalitarianRiskLevel: "Kritisch"
      },
      {
        id: "opt-2",
        label: "Mit dem Trainer reden: Pünktlichkeit ja, aber keine Bestrafung der ganzen Gruppe.",
        consequence: "Der Trainer muss einsehen, dass Angst und Mobbing keinen echten Teamgeist schaffen.",
        criticalAnalysis: "Gute Disziplin bedeutet Respekt und Fairplay, nicht Angst und Ausgrenzung.",
        totalitarianRiskLevel: "Niedrig"
      },
      {
        id: "opt-3",
        label: "Einfach nicht mehr zum Training gehen.",
        consequence: "Das Problem wird nicht gelöst, das Team zerfällt ohne Aussprache.",
        criticalAnalysis: "Weglaufen hilft nicht. Es braucht den Mut, offen über ungerechte Regeln zu sprechen.",
        totalitarianRiskLevel: "Mittel"
      }
    ]
  },
  {
    id: "case-school-uniform",
    title: "Schuluniform & feste Begrüßung",
    setting: "Schulkonferenz",
    description: "Die Schule überlegt, einheitliche Schulkleidung und das Aufstehen beim Eintreten des Lehrers einzuführen. Befürworter sagen: 'Niemand wird mehr wegen billiger Kleidung gehänselt!' Gegner sagen: 'Jeder soll selbst entscheiden, was er anzieht.'",
    options: [
      {
        id: "uni-1",
        label: "Strenge Uniform und starre Regeln für alle beschließen.",
        consequence: "Nach außen sieht alles ordentlich aus, aber Schüler lernen nicht mehr, mit Unterschieden und Vielfalt umzugehen.",
        criticalAnalysis: "Ähnlich wie bei Robert: Die Einheitlichkeit nimmt zwar Probleme weg, aber auch die persönliche Freiheit.",
        totalitarianRiskLevel: "Mittel"
      },
      {
        id: "uni-2",
        label: "Einfache Kleidungsregeln (z.B. keine beleidigenden Sprüche), aber freie Kleidungswahl.",
        consequence: "Schüler dürfen verschieden sein und lernen, sich gegenseitig so zu akzeptieren, wie sie sind.",
        criticalAnalysis: "Vielfalt aushalten statt alle gleichzumachen – das ist gelebte Demokratie.",
        totalitarianRiskLevel: "Niedrig"
      }
    ]
  },
  {
    id: "case-chat-rules",
    title: "Die 'Ordnungsgruppe' im Klassen-Chat",
    setting: "WhatsApp- / Discord-Gruppe",
    description: "Drei Schüler ernennen sich selbst zu Admins des Klassen-Chats. Wer Witze schickt oder den Admins widerspricht, wird für 3 Tage stummgeschaltet. Zuerst finden viele die Ruhe gut, aber bald traut sich niemand mehr, eine andere Meinung zu schreiben.",
    options: [
      {
        id: "chat-1",
        label: "Die Admins einfach machen lassen – endlich ist der Chat aufgeräumt.",
        consequence: "Ein paar Schüler bestimmen willkürlich über die anderen. Wer den Mund aufmacht, fliegt raus.",
        criticalAnalysis: "Genau so fing die Welle an: Was zuerst nützlich wirkt, wird schnell zur Herrschaft Einzelner.",
        totalitarianRiskLevel: "Kritisch"
      },
      {
        id: "chat-2",
        label: "Gemeinsam in der Klasse faire Chat-Regeln abstimmen und Admins neu wählen.",
        consequence: "Die Regeln gelten für alle gleichermaßen und niemand kann seine Macht ausnutzen.",
        criticalAnalysis: "Regeln müssen von allen gemeinsam beschlossen werden, nicht von selbsternannten Chefs.",
        totalitarianRiskLevel: "Niedrig"
      }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    question: "Warum fängt Ben Ross ausgerechnet mit dem Motto 'Macht durch Disziplin' an?",
    options: [
      "Weil er die Schüler für die Bundesjugendspiele fit machen will.",
      "Weil Disziplin einfach anfängt: Über Haltung und Aufstehen gewöhnt er die Schüler an Gehorsam, ohne dass sie es merken.",
      "Weil der Schulleiter ihm gedroht hat, ihn zu kündigen.",
      "Weil er schlechte Noten in Geschichte vergeben wollte."
    ],
    correctIndex: 1,
    explanation: "Einfache Verhaltensregeln wie aufrechtes Sitzen und schnelles Melden wirken harmlos. Die Schüler haben das Gefühl, etwas zu leisten, und merken nicht, dass sie sich unterordnen.",
    sourceContext: "Kapitel 5: Die erste Stunde der Welle"
  },
  {
    id: "q2",
    question: "Wie genau sollten die Schüler laut Herrn Ross an ihren Tischen sitzen?",
    options: [
      "Die Arme verschränkt und den Kopf auf die Brust geneigt.",
      "Beide Füße flach auf den Boden, Rücken kerzengerade, Hände auf den Tisch, Blick nach vorne.",
      "Bequem zurückgelehnt mit den Füßen auf dem Stuhlgestell.",
      "Militärisch strammstehend neben der Schulbank."
    ],
    correctIndex: 1,
    explanation: "Herr Ross begründete das mit besserem Atmen und Konzentration. In Wirklichkeit brach es die lockere Haltung der Jugendlichen.",
    sourceContext: "Kapitel 5: Die neuen Sitzregeln"
  },
  {
    id: "q3",
    question: "Warum findet ausgerechnet Robert Billings die neuen Regeln so toll?",
    options: [
      "Weil er dafür von Herrn Ross bezahlt wird.",
      "Weil plötzlich alle gleich sind: Niemand lacht mehr über ihn, und er bekommt endlich Lob von der Klasse.",
      "Weil er der beste Schüler der Schule in Geschichte wird.",
      "Weil er keine Hausaufgaben mehr machen muss."
    ],
    correctIndex: 1,
    explanation: "Vor dem Experiment war Robert der ewige Verlierer. Durch die gleichen Regeln für alle fällt er nicht mehr negativ auf und fühlt sich stark.",
    sourceContext: "Kapitel 6: Roberts Verwandlung"
  },
  {
    id: "q4",
    question: "Welche zwei Worte mussten die Schüler vor JEDER Antwort laut sagen?",
    options: [
      "„Herr Lehrer, ...“",
      "„Die Welle, ...“",
      "„Mr. Ross, ...“",
      "„Jawohl, Sir! ...“"
    ],
    correctIndex: 2,
    explanation: "Mit der Formel 'Mr. Ross, ...' erkannten die Schüler ihren Lehrer bei jedem einzigen Wortwechsel als Anführer an.",
    sourceContext: "Kapitel 5: Die Sprechregeln"
  },
  {
    id: "q5",
    question: "Warum ist David (Football-Spieler) anfangs so begeistert von der Disziplin?",
    options: [
      "Er will die Schule schwänzen.",
      "Er glaubt, dass die neue Härte seinem Football-Team hilft, endlich Spiele zu gewinnen.",
      "Er will Laurie eins auswischen.",
      "Er möchte Geschichtslehrer werden."
    ],
    correctIndex: 1,
    explanation: "David sieht Disziplin als reines Werkzeug für den Erfolg: Er glaubt, dass strammes Training sein Team unbesiegbar macht.",
    sourceContext: "Kapitel 6: David und das Football-Team"
  },
  {
    id: "q6",
    question: "Was ist der Unterschied zwischen eigener Selbstdisziplin und dem Zwang der Welle?",
    options: [
      "Eigene Disziplin wählt man freiwillig für die eigenen Ziele (z.B. Sport, Musik); bei der Welle bestimmt ein Anführer und verbietet Kritik.",
      "Eigene Disziplin macht immer schlechte Laune, Zwang macht immer Spaß.",
      "Es gibt überhaupt keinen Unterschied zwischen beiden.",
      "Disziplin ist immer verboten."
    ],
    correctIndex: 0,
    explanation: "Eigene Disziplin hilft dir, deine eigenen Träume zu verwirklichen. Der Zwang in der Welle nimmt dir das selbstständige Denken und verbietet Widerspruch.",
    sourceContext: "Zusammenfassung des Themas"
  }
];

export interface RuleClozeItem {
  id: string;
  ruleNr: string;
  ruleTitle: string;
  sentenceParts: string[]; // e.g. ["Disziplin beginnt mit der ", ". Beide Füße flach auf den Boden, der Rücken ", "!"]
  blankKey: string;
  correctOptions: string[];
  optionsPool: string[][];
}

export const RULE_CLOZE_ITEMS: RuleClozeItem[] = [
  {
    id: "rule-1",
    ruleNr: "Regel 1",
    ruleTitle: "Die Sitzhaltung",
    sentenceParts: ["Disziplin beginnt mit der ", ". Beide Füße flach auf den Boden, der Rücken ", "!"],
    blankKey: "rule_1",
    correctOptions: ["Haltung", "kerzengerade"],
    optionsPool: [
      ["Haltung", "Kleidung", "Stimmung"],
      ["kerzengerade", "bequem angelehnt", "gekrümmt"]
    ]
  },
  {
    id: "rule-2",
    ruleNr: "Regel 2",
    ruleTitle: "Die Stehregel",
    sentenceParts: ["Wer sprechen will, muss zügig ", " neben seinem Tisch aufstehen und ", "!"],
    blankKey: "rule_2",
    correctOptions: ["rechts", "strammstehen"],
    optionsPool: [
      ["rechts", "links", "hinter"],
      ["strammstehen", "sich verbeugen", "lächeln"]
    ]
  },
  {
    id: "rule-3",
    ruleNr: "Regel 3",
    ruleTitle: "Die Antwortformel",
    sentenceParts: ["Jede Antwort MUSS mit den Worten ", " beginnen und ", " formuliert sein!"],
    blankKey: "rule_3",
    correctOptions: ["Mr. Ross", "kurz und zackig"],
    optionsPool: [
      ["Mr. Ross", "Die Welle", "Herr Lehrer"],
      ["kurz und zackig", "ausführlich", "leise"]
    ]
  }
];

