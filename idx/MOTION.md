# MOTION

Durations/easings: `--rorelse-snabb`, `--rorelse-standard`, `--ease-standard` i `styles/tokens.css`.
JS byter bara `data-tillstand`. Höjd animeras med CSS grid (`0fr` → `1fr`), inte `style.height`.

`prefers-reduced-motion: reduce`: `--rorelse-standard` och `--rorelse-snabb` = `0ms`. Inga transform/opacity-övergångar.

## 1. Öppna nod

| | |
|---|---|
| Trigger | `data-atgard="ackordion/vaxla"` på hopfälld nod (klick / Enter / Space) |
| State | `hopfalld` → `expanderar` → `expanderad` |
| Animated | `grid-template-rows` 0fr → 1fr; panel `opacity` 0 → 1 |
| Duration | `--rorelse-standard` |
| Easing | `--ease-standard` |
| Sidoföljd | öppna syskon stängs (se 2); `data-yta` / `data-black` byts utan egen motion |

## 2. Stänga nod

| | |
|---|---|
| Trigger | samma atgärd på öppen nod, eller syskon öppnas |
| State | `expanderad` → `kollapsar` → `hopfalld` |
| Animated | `grid-template-rows` 1fr → 0fr; opacity 1 → 0 |
| Duration | `--rorelse-standard` |
| Easing | `--ease-standard` |
| Barn | stängs rekursivt till `hopfalld` före förälderns kollaps |

## 3. Skal-yta (accent / panel / mörk)

| | |
|---|---|
| Trigger | härledd från öppnad sökväg |
| State | `.ram[data-yta]` |
| Animated | `background-color`, `color` |
| Duration | `--rorelse-snabb` |
| Easing | `--ease-standard` |

## 4. Bläck-lager

| | |
|---|---|
| Trigger | `.ram[data-black]` |
| State | `.black__lager` opacity 0 eller 1 |
| Animated | `opacity` |
| Duration | `--rorelse-standard` |
| Easing | `--ease-standard` |

## 5. Hash / deep-link

Load och `hashchange` sätter samma tillstånd som manuell öppning. Vid `prefers-reduced-motion` hoppar `expanderar`/`kollapsar` över — direkt `expanderad` / `hopfalld`.

## 6. Galleri

| | |
|---|---|
| Trigger | `data-atgard="galleri/fore"` / `galleri/nasta`, eller piltangent i `.galleri` |
| State | `.galleri[data-index]`, bild `data-aktiv`, caption-text |
| Animated | `transform: translateX` på `.galleri__bana` |
| Duration | `--rorelse-standard` |
| Easing | `--ease-standard` |

## 7. Skrivbord nav (10:1821 → 10:1911)

| | |
|---|---|
| Trigger | `ackordion/vaxla` på toppnod, skrivbord, utan `prefers-reduced-motion` |
| State | hem (`data-black="hem"`) → vald; logotyp-hörn; `data-yta` / `data-black` |
| Animated | View Transitions på `titel-*`, `linje-*`, `logotyp` (`--rorelse-standard`). Toppnod hoppar till `expanderad` / `hopfalld` (ingen 0fr→1fr på toppanel). Saknad API = omedelbart layoutbyte |
| Sidoföljd | bläck och yta följer `uppdateraSkal` inne i transition-callback |

## 8. Spelare

| | |
|---|---|
| Trigger | `data-atgard="spelare/vaxla"` / `spelare/nasta` |
| State | `.spelare[data-spelar][data-spar]`, tid- och pulstext |
| Animated | pulsmönstret `.:.:.:.:.:.` roterar med `currentTime` under spelning; stilla vid paus och vid `prefers-reduced-motion` |
| Sidoföljd | dold när Restaurant eller Staff/Vacancies är öppna på mobil; synlig på hem, Program och About-intro; på skrivbord alltid synlig; pågående spelning pausas |

## 9. Tebi-väljare

| | |
|---|---|
| Trigger | `bokning/oppna` på `.cta`; sedan `tebi/tjanst` / `tebi/tid` / `tebi/tillbaka` |
| State | `dialog.tebi[data-steg][data-tjanst][data-kalla]` |
| Animated | ingen — native `showModal` / `close`, Escape stänger |

## 10. Restaurant kök → meny

| | |
|---|---|
| Trigger | scroll till slutet av `.kok` (endast under `--bryt-skarm`), eller `ackordion/vaxla` på Menu |
| State | `.nod[data-nod="restaurant"][data-vy="kok"|"meny"]` |
| Animated | samma som öppna/stänga nod; yta/bläck följer `uppdateraSkal` |

