# Detaljerat spelflöde — IKEA Escape Room: Överlev barnavdelningen

## Spelinställningar

- **Rörelse:** Klicka på zoner direkt
- **Straff:** Åker tillbaka till ENTRÉ (gäller både fel väg och fel argument)
- **Mål:** Ta dig till hjärtlampan utan att köpa något på vägen

---

## 1. Spelstart

- Kartan visas med pappan placerad vid **ENTRÉ**
- En informationsruta dyker upp med uppdraget:
  > _"Din dotter vill ha en hjärtlampa till sitt rum. Ta dig till lampan så smidigt som möjligt och undvik att köpa något mer på vägen — trots dotterns tjat. Börja med att välja rätt väg: klicka på gosedjuret eller kudden."_
- Spelaren stänger rutan och spelet börjar
- Endast **zone-pillow** och **zone-teddybear** är klickbara i detta steg _(övriga zoner är inaktiva och ej klickbara)_

---

## 2. Steg 1 — Välj första zon

```
Spelaren klickar på zone-pillow ELLER zone-teddybear
  → pappan flyttas till vald zon
  → div-popup öppnas (se sektion 3)
```

---

## 3. div-popup — möte med dottern

Popup-rutan innehåller:

- Dotterns "vill ha"-argument (överst)
- Pappans tre motargument som radioknappar (under)
- En "Svara"-knapp

```
Spelaren väljer ett argument via radioknapp och klickar "Svara"
  → RÄTT argument:
        Byt ut texten i popupen mot: "Bra argument! Dottern ger upp 😤"
        → Visa "Fortsätt"-knapp
        → Stäng popup när spelaren klickar fortsätt
        → Lås upp nästa steg (se sektion 4)

  → FEL argument:
        Byt ut texten i popupen mot: "Dottern tjatar ännu mer! Du åker tillbaka till början! 😤"
        → Visa "Försök igen"-knapp
        → När spelaren klickar: stäng popup, flytta pappan till ENTRÉ
        → Lås alla zoner utom zone-pillow och zone-teddybear
        → Spelaren börjar om från steg 1
```

---

## 4. Steg 2 — Välj andra zon

Efter godkänt argument i steg 1 låses två nya zoner upp:

- **zone-carpet** (mattan)
- **zone-bedsheets** (lakanen)

```
Spelaren klickar på zone-carpet ELLER zone-bedsheets
  → pappan flyttas till vald zon
  → div-popup öppnas med dotterns argument + pappans motargument
  → samma logik som sektion 3
```

Efter godkänt argument i steg 2 låses två nya zoner upp:

- **zone-lamp** (hjärtlampan) ✅ rätt väg
- **exit** (utgången) ❌ fel väg — se sektion 6

---

## 5. Steg 3 — Lampan (mål-zonen)

```
Spelaren klickar på zone-lamp
  → pappan flyttas till lampan
  → div-popup öppnas:
        "Bra jobbat! Nu tar vi lampan och går hem 😅"
        → Lås upp exit
        → Stäng popup

```

---

## 6. Exit — vinst eller förlust

```
Spelaren klickar på exit
  → Har spelaren klarat zone-lamp?
      JA  → 🎉 Vinst-skärm: "Du tog dig ut med lampan och utan att köpa något annat. Hjälte!"
            → Visa knapp: "Spela igen"
      NEJ → 😬 Förlust-skärm: "Du gick ut utan lampan... uppdraget misslyckat!"
            → Visa knapp: "Försök igen"
```

---

## 7. Argumentationsalternativ per zon

### 🛏️ Zone-pillow (hjärtakudde)

> _"Pappa, jag MÅSTE ha den kudden, mitt liv är inte komplett!"_

| #   | Argument                                                                  | Utfall                       |
| --- | ------------------------------------------------------------------------- | ---------------------------- |
| A   | "Du har redan 47 kuddar hemma, vi kan knappt öppna dörren till ditt rum." | ✅ Rätt                      |
| B   | "Den är för dyr."                                                         | ❌ Fel — tillbaka till ENTRÉ |
| C   | "Kanske till jul?"                                                        | ❌ Fel — tillbaka till ENTRÉ |

---

### 🧸 Zone-teddybear (grisknoa)

> _"Pappa, den där grisen är SÅ söt, han ser ut som mig!"_

| #   | Argument                                                                              | Utfall                       |
| --- | ------------------------------------------------------------------------------------- | ---------------------------- |
| A   | "Precis, och din nalle hemma gråter sig till sömns varje kväll för att han är ensam." | ✅ Rätt                      |
| B   | "Nej."                                                                                | ❌ Fel — tillbaka till ENTRÉ |
| C   | "Du ser inte alls ut som en gris."                                                    | ❌ Fel — tillbaka till ENTRÉ |

---

### 🪆 Zone-carpet (hoppmattan)

> _"Pappa, den mattan är ju helt magisk, tänk om man STUDSAR på den!"_

| #   | Argument                                                                       | Utfall                       |
| --- | ------------------------------------------------------------------------------ | ---------------------------- |
| A   | "Vi bor i lägenhet. Grannarna under oss heter Svensson och de är inte roliga." | ✅ Rätt                      |
| B   | "Vi har redan en matta."                                                       | ❌ Fel — tillbaka till ENTRÉ |
| C   | "Du är för gammal för att studsa."                                             | ❌ Fel — tillbaka till ENTRÉ |

---

### 🛏️ Zone-bedsheets (hjärtalakan)

> _"Pappa, de där lakanen skulle göra mitt rum PERFEKT!"_

| #   | Argument                                                             | Utfall                       |
| --- | -------------------------------------------------------------------- | ---------------------------- |
| A   | "Vi bytte lakan förra månaden. De håller tills du flyttar hemifrån." | ✅ Rätt                      |
| B   | "Vi har inte råd."                                                   | ❌ Fel — tillbaka till ENTRÉ |
| C   | "Hjärtan är överskattade."                                           | ❌ Fel — tillbaka till ENTRÉ |

---

### 💡 Zone-lamp (hjärtlampa) — mål-zonen

> _"Pappa, den lampan är ju helt magisk, mitt liv är inte komplett utan den!"_

| #   | Argument                                                                                   | Utfall                       |
| --- | ------------------------------------------------------------------------------------------ | ---------------------------- |
| A   | "Din gamla lampa lyser utmärkt. Den har belyst tre generationers läxor och vägrar ge upp." | ✅ Rätt                      |
| B   | "Det är för dyrt."                                                                         | ❌ Fel — tillbaka till ENTRÉ |
| C   | "Du behöver inte se när du sover."                                                         | ❌ Fel — tillbaka till ENTRÉ |

---

## 8. Zonernas låsstatus — översikt

| Steg         | Upplåsta zoner              |
| ------------ | --------------------------- |
| Start        | zone-pillow, zone-teddybear |
| Efter steg 1 | zone-carpet, zone-bedsheets |
| Efter steg 2 | zone-lamp, exit             |
| Efter steg 3 | exit (vinst-exit)           |
