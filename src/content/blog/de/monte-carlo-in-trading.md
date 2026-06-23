---
title: "Die Monte-Carlo-Methode im Trading"
description: "Ein mathematisches Modell zum Bestehen eines FTMO-One-Step-Prop-Accounts per massenhafter Zufallssimulation. Profitabilitätsschwelle, Blow-up-Wahrscheinlichkeit und die echte Anzahl der Tage."
pubDate: 2026-06-23
tags: ["Mathtrading"]
heroImage: "/images/monte-carlo-trading-equity-en.png"
---

Das Ziel dieses Artikels ist es, ein mathematisches Modell zum Bestehen von Prop-Accounts zu erstellen. Als Grundlage nehme ich FTMO One-Step, aber mit dieser Methode lassen sich beliebige Wahrscheinlichkeiten durchrechnen — entscheidend ist nur, die Bedingungen korrekt zu formulieren.

## Die Monte-Carlo-Methode

Das ist die Lösung einer Aufgabe durch massenhafte Zufallssimulation statt durch das Herleiten einer Formel. Wenn ein Prozess zu viele ineinander verflochtene Zufallsschritte hat, um die Wahrscheinlichkeit analytisch zu berechnen, lassen wir den Prozess einfach tausende Male mit zufälligen Ausgängen laufen und zählen den Anteil der gewünschten Ergebnisse. Nach dem [Gesetz der großen Zahlen](https://habr.com/ru/articles/934014/) konvergiert diese empirische Häufigkeit gegen die wahre Wahrscheinlichkeit.

Die klassische Formel des [Gambler's Ruin](https://de.wikipedia.org/wiki/Ruinproblem) funktioniert nur für den einfachen symmetrischen Fall: feste Einsatzhöhe, zwei unbewegliche Wände, unabhängige gleiche Schritte. Im Prop-Trading ist all das gleichzeitig verletzt — genau deshalb nutzen wir Monte Carlo.

## Wie man die Methode auf das Modell anwendet

Ein Durchlauf ist ein Versuch, die Challenge von Anfang bis Ende zu bestehen. Jeden Tag ziehen wir Zufallszahlen, führen den Kontostand, verschieben den Trailing-Floor und prüfen die Wände und das Ziel. Danach halten wir das Ergebnis fest: pass / bust / timeout und wie viele Tage es gedauert hat.

Wichtig zu verstehen: Bei dieser Anzahl an Durchläufen schwankt die geschätzte Blow-up-Wahrscheinlichkeit von Lauf zu Lauf deutlich — das Ereignis ist selten und es gibt nur wenige Beispiele dafür. Es reicht also, sich eines zu merken: Ein Blow-up ist ein sehr seltenes Tail-Ereignis, Bruchteile eines Prozents.

![Heatmap der Bestehenswahrscheinlichkeit über das Raster Winrate × R:R](/images/monte-carlo-trading-heatmap-en.png)

Für die Simulation habe ich R gewählt. Ich habe ein Skript geschrieben und die Wahrscheinlichkeitsverteilungstabelle erhalten. Ab einer bestimmten Winrate-Schwelle wird das Trading positiv, und die Wahrscheinlichkeit, die Challenge zu bestehen, steigt nur noch.

Trading ist profitabel, wenn **Winrate > 1 / (1 + R:R)**:

- R:R 1.5 → nötig >40 %
- R:R 2.0 → >33 %
- R:R 2.5 → >29 %
- R:R 3.0 → >25 %

Es ändert sich nur die Anzahl der Tage. Jeder kann selbst wählen, welches Modell von hier zu ihm passt.

![Bestehenswahrscheinlichkeit nach R:R bei einer Winrate von 50 %](/images/monte-carlo-trading-passrate-en.png)

![Verteilung der Handelstage bis zum Bestehen](/images/monte-carlo-trading-days-en.png)

![60 zufällige Challenge-Durchläufe — Equity-Kurven](/images/monte-carlo-trading-equity-en.png)

Ich habe meine schlechteste angenommene Winrate berechnet — 50 % — und ein festes R:R von 1:2. Mit diesen Parametern ist die Wahrscheinlichkeit, den Account zu sprengen, verschwindend gering (unter 0,05 %), sofern ich die gewählten Grenzen einhalte: 1 Take pro Tag, maximal 2 Stops pro Tag.

Aber diese Charts und das Modell gehen von einem Idealszenario aus. Rechnet man alle möglichen Kosten durch — Kommission, Spread, Stop-Slippage — ergibt sich ein Median von 27 Handelstagen und eine Pass-Rate von 99,92 %.

Mein Modell habe ich gewählt — ihr könnt jedes davon nehmen. Ich hoffe, diese Analyse war für jemanden nützlich; für mich war sie es zumindest.

In ein, zwei Monaten melde ich mich wieder, wie sich das Modell unter realen Handelsbedingungen schlägt.

© Seal
