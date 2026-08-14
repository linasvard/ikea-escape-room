# IKEA Escape Room

## Om spelet
Det som skulle bli en snabb och harmonisk tur till IKEA har förvandlats till ett prövningarnas test. Du har en lista, en plan, och en trött och mycket bestämd femåring vid din sida. Butiken är enorm – ingen genväg, ingen återvändo, bara avdelning efter avdelning. Ta dig igenom 4 avdelningar, lös pusslen och håll humöret i behåll hela vägen till kassan.

## Demo
[Live-demo 🔗](https://linasvard.github.io/ikea-escape-room/)

<img width="1470" height="840" alt="ikea-demo-comp" src="https://github.com/user-attachments/assets/db772a2c-50e8-4dee-888e-1fcd6b358a53" />


### Bakgrund
Vi är fyra studenter på Front-End Developer-utbildningen på Medieinstitutet som har skapat detta spel, som en del av ett grupprojekt inom kurserna **JavaScript** och **Agila Metoder**. Varje gruppmedlem har haft i huvudansvar att designa och koda sitt eget rum.

#### Varför detta spel?
När vi började diskutera vilket spel vi ville utveckla ville vi skapa något som både var igenkännbart och lätt att relatera till. Idén att göra ett escape room i ett IKEA-varuhus uppstod tidigt och kändes direkt som ett roligt och kreativt koncept. Samtidigt gav det oss möjlighet att arbeta med en redan etablerad visuell stil och designprofil, vilket gjorde projektet extra intressant ur ett design- och frontendperspektiv.

### Rummen
1. **Barnavdelningen**: Undvik utbrott genom att välja rätt svar när barnet försöker övertala dig att köpa saker som inte finns på listan.
2. **Lampavdelningen**: Tänd lamporna i rätt ordning för att hitta rätt lampa till korgen. För många felklick ger game over.
3. **Ta-själv-lagret**: Lös en rebus för att hitta rätt hylla och fack. Pax eller Billy? Fel möbel ger game over.
4. **Kassan**: Kom ihåg rätt kortkod inom tidsgränsen och slutför köpet. Ledtråd: en känd meme bland unga.

Vid klarat spel registreras totaltiden och sparas i highscore-listan. Misslyckas man i något av rummen är det game over, och spelet börjar om från början.

### Spelets upplägg
Spelaren loggar in med sitt namn och tar sig genom rum för rum. Varje rum introduceras med namn och beskrivning innan det startas. Men kom ihåg, om du misslyckas med ett rum raderas din progress och du måste börja om från början. 

## Funktioner
- ⏱ Timer per rum + total tid (sparas i LocalStorage)
- 📊 Progressbar som kommer ihåg vilket rum spelaren senast var i
- 🏆 Highscore-topp 3, baserat på total speltid (dolt sätt att rensa listan, se nedan)
- 🔄 Nollställ/spela om spelet
- ♿ Tangentbordsnavigerbart
- 📄 Game over-sida
- ℹ️ Om-sida med info om spel och team

## Tekniker
Byggt med **TypeScript**, **HTML**, **CSS/SASS** och **Vite** – medvetet utan ramverk (t.ex. React eller Vue), för att fördjupa förståelsen för hur moderna webbapplikationer fungerar på ett grundläggande plan.

- **HTML** strukturerar spelets vyer och interaktiva element.
- **CSS/SASS** hanterar styling och layout, med variabler för en mer 
  strukturerad kodbas.
- **TypeScript** driver spellogiken och har hjälpt oss upptäcka fel tidigt 
  i utvecklingen, extra värdefullt i grupparbete.
- **Vite** har använts som utvecklingsmiljö för snabb utvecklingsserver, 
  bundling och modulhantering.
- **JSON** används specifikt i rummet Ta-själv-lagret för att lagra rebusdata.

**Tekniska funktioner** inkluderar bl.a. interaktiva spelmoment byggda med DOM-manipulation, en progress-bar med minne av senaste rum, en LocalStorage-baserad speltimer, ett highscore-system baserat på total tid, samt modulär TypeScript-struktur med egna komponenter/logik per rum.

## Arbetsprocess
Projektet genomfördes agilt i grupp, där varje person ansvarade för sitt eget rum samtidigt som vi kontinuerligt samarbetade kring integrationen mellan funktionerna. Vi använde Git med branches och pull requests för versionshantering och kodgranskning, vilket blev en bra övning i hur utvecklingsarbete i team fungerar i praktiken.

## Vad vi har lärt oss
Genom projektet har vi bland annat utvecklat vår förståelse för:
- hur man strukturerar ett större frontend-projekt
- modulär JavaScript/TypeScript-kod
- DOM-manipulation och event-hantering
- hur man lagrar data lokalt i webbläsaren med LocalStorage
- samarbete i utvecklingsteam och versionshantering med Git
- komponenter och logik för varje spelrum

Projektet har gett oss praktisk erfarenhet av att gå från idé till en fungerande interaktiv webbapplikation.

## Gruppmedlemmar
- [Elena Holmberg](https://github.com/elenaholmberg) - Rum 1: Barnavdelningen
- [Erik Grahn](https://github.com/erik-grahn) – Rum 2: Lampavdelningen
- [Lina Svärd](https://github.com/linasvard) – Rum 3: Ta-själv-lagret 
- [Oscar Holmblad](https://github.com/oscarholmblad) – Rum 4: Kassan
