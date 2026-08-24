# NOTES — BXYZ principer för Contra

Källor: `~/.cursor/rules/` (AM, HM, CM, FR, JM, arkitekturstyrning, completion DoD). Inga principer i denna tomma repo-mapp före bygget.

## Gällande principer (kort)

- **AM01–15**: HTML = struktur, CSS = presentation, JS = beteende. Tillstånd via `data-tillstand`. En dispatcher (`data-atgard`). Inga `style.*` för färg/layout.
- **HM01–15**: landmärken, native `button`, rubrikordning, ARIA endast när native inte räcker.
- **CM01–15**: tokens enda visuella sanningen; `@layer`; state-driven CSS; `prefers-reduced-motion`; logical properties; `:focus-visible`.
- **FR01–15**: BXYZ-header; lower svenska i klasser/`data-*`/id där säkert; inga inline-kommentarer; namn = avsikt.
- **JM01–05**: JS äger inte presentation; `data-atgard` + tabell; state-ägare entydig.
- **TG**: tokens i `:root`, semantiska namn.

## Konflikter (prompt vs BXYZ) — BXYZ vinner

| Prompt | BXYZ | Val |
|---|---|---|
| `data-state` | `data-tillstand` (AM04, HM13) | `data-tillstand` |
| `collapsed` / `expanded` | avsikt på svenska (AM02, FR02) | `hopfalld` / `expanderar` / `expanderad` / `kollapsar` |
| Engelska klasser (`Bar`, `MenuList`) | FR02 lower svenska | `nod`, `meny-lista`, `black`, `fot` |
| Dotted-leader priser | Figma visar två kolumner utan prickar | två kolumner (pixel = Figma) |
| JS mäter höjd | AM01: JS sätter inte presentation | CSS `grid-template-rows: 0fr / 1fr` |
| `idx/accordion.js` engelskt filnamn | FR02 svenska filnamn | **behålls** — promptens arkitekturkontrakt för IDX-sökväg |

## Antaganden (flaggade)

- **Program** är andra toppnod. Hem-nav är Restaurant / Program / About. Events och Bar är borttagna.
- **9:101** är kök-foto på Restaurant (8:55) och Staff-galleri under About.
- **10:1759** About-intro: röd copy, mörk splat, halv list, spelare. Staff och Vacancies är barn under About.
- Hem-bläck fylls med `--yta-mork`, inte `--yta-panel`, så SVG inte delar textfärg.
- Program-bläck fylls med `--yta-accent`, inte `--text-vald`.
- Vald accent-rubrik (`data-blad` expanderad) är `--text-vald`; grupp-noder behåller grått.
- **Tebi, inte WeTicket.** WeTicket har ingen portal. Två kassor skulle dela “en upplevelse”. Agenda och CTA stannar på Contra; Tebi tar reservation / dinner ticket / music ticket som tre tjänster. WeTicket lämnas tills de har kod.
- **Tebi-widgeten går inte att skina** utöver accentfärg i Back Office. Därför: dölj default-knappen, öppna Tebi från Contra-CTA via custom link / share URL. Tills URL:er finns simulerar `dialog.tebi` samma steg i Contra-chrome.
