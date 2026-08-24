# DESIGN-RULES

Varje regel mappas till token. Inga fria hex/px i komponent-CSS.

## Radhöjd (viewport)

- Enheten är `--rad-hojd` = `--rad-text` + `--linje-tjocklek` (42 + 12).
- Skalet är `100dvh`: `--trad-start` + synliga rader + expanderad panel + spelare (när synlig) + `--fot-hojd`.
- Hopfälld nod tar exakt en rad. Expanderad nod tar resten (`flex: 1`, `min-block-size: 0`).
- Överflödigt innehåll rullar i den expanderade blad-panelen (`overflow-y: auto`), inte i `.ram`.

## Yta

- Skalet är en av tre ytor: `--yta-accent`, `--yta-panel`, `--yta-mork`. Text följer `--text-pa-*`.
- Hem, Program och About-intro vilar på accent respektive panel. Restaurant-kök och Staff på mörk. Menu på panel.

## Vald rubrik

- Accent, expanderat blad (`data-blad`): titel `--text-vald` (brun). Program/Restaurant som grupp behåller `--text-pa-accent`. Hopfällda syskon behåller grått.
- Panel: titlar stannar `--text-pa-panel`. Vald signal är linjefärg, inte textfärg.
- Mörk: titlar stannar `--text-pa-mork`.

## Listor (en linje per skarv)

- Varje rad äger en list under titeln. Aldrig två lister mot varandra. Ingen `::before`-list.
- Expanderad nod med synligt följande syskon (inne i `data-pinna`): `border-block-end` på panelen = listen mot raden under.
- Hem, hopfälld toppnivå: `--linje-halv`. Sista toppnoden har ingen list.
- Panel: list `--yta-mork`, utom röd `--yta-accent` under expanderad sista nod eller under hopfälld nod precis före expanderad (1:39, 5:6).
- Mörk: list `--yta-panel`, utom röd list under expanderad panel och under pinnad sista rad (8:55 Vacancies).
- Program-datum: list `--yta-panel`. Expanderat datum och Program-titel: `--yta-mork`. Booking: `--yta-mork` text och list (`data-ton="mork"`). Rad före Booking tar samma bruna list (ingen dubbel list).

## Rubriker

- Toppnivå: `--gut-ytter` (17), vänster.
- Barn: `--gut-nasta` (37), vänster.
- Program-datum: `data-justera="hoger|mitten|vanster"` — samma token-gutter, annan `text-align`.
- Typ: `--typ-nav` / `--rad-text`, `--typsnitt-rubrik`.

## Paneler

- Innehåll i `--copy-bredd` med `--gut-ytter` eller `--copy-bredd-nasta` med `--gut-nasta`.
- Bröd: `--typ-brod` / `--typ-brod-hojd`, `--typsnitt-rubrik` (Medium, som Figma).
- Varje expanderat blad har placeholder-bröd.

## Meny

- Namn vänster `--meny-namn`; pris vid `--meny-pris-start`. Ingen dotted leader (finns inte i 5:6).
- Grupp: rubrik + tom rad + två rader. Mellanrum `--meny-grupp-gap`.

## Galleri (9:101 + 9:122)

- Horisontell bana. Vänster `—` = föregående, höger `—` = nästa. Caption i mitten uppdateras från `data-bildtext`.
- Staff: `data-format="lokal"`, första bild `lokal.png` (tathet `--media-tathet-lokal`).
- Program Today: `data-format="program"`, första bild `program-idag.png` (tathet `--media-tathet-program`).
- Styrenhet: `--caption-hojd`, `--gut-ytter`, `--typ-brod`. Native `button`, `data-atgard="galleri/fore|nasta"`.

## CTA (10:1242, 5:6, 9:107)

- Höjd `--cta-hojd` = två `--linje-tjocklek` + `--rad-text` (12 + 42 + 12).
- Text `--typ-nav` / `--rad-text`, insats `--gut-nasta`, native `button`, `data-atgard="bokning/oppna"`.
- Panel (Menu): yta `--yta-mork`, text `--text-cta-pa-panel`.
- Accent (Program-dag): yta `--yta-panel`, text `--text-cta-pa-accent` (röd).
- Sitter sist i expanderat blad, ovanför pinnad rad. CTA:ns nedersta 12 px *är* skarven — ingen extra `border-block-end` på panelen när `.cta` finns.
- Innehåll rullar i `.nod__flode`; CTA rullar inte bort.

## Spelare (10:1229)

- Rad `--spelare-hojd` (samma som caption), yta `--yta-mork`, text `--text-pa-mork`, typ `--typ-brod`.
- Fem celler: Play/Pause, `00:00`, spårtitel, `.:.:.:.:.:.`, Next. Native knappar, `data-atgard="spelare/vaxla|nasta"`.
- Synlig på hem, när Program är toppöppen, och på About-intro. Dold på Restaurant / Staff / Vacancies.
- Insats `--spelare-insats` (7). Ligger direkt ovanför `fot`.

## Bläck

- Endast dekor: `aria-hidden="true"`, `pointer-events: none`.
- Form från SVG-mask; fyllning från yta-token. Fyllning får aldrig vara samma token som texten på den ytan.
- Accent hem: `--yta-mork` (inte `--text-pa-accent`).
- Accent program: `--yta-accent` (inte `--text-vald`, inte `--text-pa-accent`; synlig mot foto).
- Panel/meny: `--yta-accent` mot brun text.
- About-intro: `--yta-mork` mot röd `--text-om`.
- Z under text och listor, över sidans bakgrund; över foto när `data-black="program"`.

## Skrivbord (`min-width: 64rem`, token `--bryt-skarm`)

Ramar 10:1821 (hem) och 10:1911 (kök). Mobilregler oförändrade under brytpunkten.

- Skalet är `100%` av viewport, inte `--ram-bredd`. `fot` döljs.
- Hem: toppnivå kvar som kolumn till vänster; halv list; sista utan list. Bläck `--black-hem-skrivbord-*`. Logotyp övre höger (`--logotyp-hem-block` / `--logotyp-hem-inline-end`), fyll `--yta-mork`.
- Vald: toppnivå i rad, tre kolumner `--linje-halv`, gruppen centrerad. Titlar `text-align: center` över sin list. Syskon döljs inte. Logotyp nedre vänster (`--logotyp-vald-*`). På mörk yta: fyll `--text-pa-mork`.
- Kök: kolumn `--kolumn-bredd` (584), foto samma sida, copy `--copy-bredd` vänsterställd i kolumnen. Menu-pinnen döljs vid `data-vy="kok"`.
- Spelare alltid synlig, `--spelare-skrivbord-bredd`, nedre höger. På mörk yta: yta `--yta-panel`, text `--yta-mork`.
- Nav-titel, nav-list och logotyp har `view-transition-name`. Öppna/stäng toppnod kör `document.startViewTransition` (hoppas över vid `prefers-reduced-motion` eller saknad API).

## Footer

- Höjd `--fot-hojd`, yta `--yta-fot`, text `--text-fot` `--typ-fot` `--typsnitt-fot`, centrerad. Dold från `--bryt-skarm`.

## Fokus

- `:focus-visible` outline `--fokus-linje` `--fokus-farg`. Aldrig `outline: none` utan ersättning.
