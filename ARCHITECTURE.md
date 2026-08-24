# ARCHITECTURE — nodträd

Sajten är ett träd av `article.nod`. En nod = list-yta (titel + 12 px linje) + valfri panel. Paneler nästlas. En IDX-controller (`idx/accordion.js`) lyssnar på `data-atgard="ackordion/vaxla"`.

## Träd

```
Contra (h1, visuellt dold)
├── Restaurant                    #restaurant          yta-nod=panel   vy=kok|meny  pinna=sista
│   ├── kök (galleri + copy)      visas när vy=kok
│   └── Menu                      #restaurant/menu     + cta (bord)
├── Program                       #program             yta-nod=accent  pinna=nasta
│   ├── Today 21 August           #program/idag
│   │   └── Galleri + CopyBlock + lankrad + cta (dag)
│   ├── Tomorrow 23 August        #program/imorgon
│   ├── Thursday 24 August        #program/torsdag
│   ├── Thursday 24 August        #program/torsdag-kvall
│   └── Booking at Contra         #program/bokning     ton=mork
└── About                         #about               yta-nod=panel   pinna=sista
    ├── om-intro (10:1759 copy)
    ├── Staff                     #about/staff         yta-nod=mork
    │   └── Galleri (lokal) + CopyBlock
    └── Vacancies                 #about/vacancies
        └── CopyBlock
```

Footer `fot` ligger utanför trädet, synlig under `--bryt-skarm` (64rem). På skrivbord döljs fot; logotyp (`.logotyp`) sitter i `.ram` (hem: övre höger; vald: nedre vänster). Spelare ligger ovanför fot på mobil (synlig på hem, Program och About-intro; dold på Restaurant, Staff och Vacancies). På skrivbord är spelaren alltid synlig, nedre höger. `dialog.tebi` ligger i `.ram` och tar över med `showModal`.

## Bokning (Tebi)

Contra äger agenda och CTA. Tebi äger checkout. WeTicket används inte förrän de har en portal.

- Menu-CTA (`data-tjanst="bord"`) öppnar tidsval 18:00–20:00.
- Program-dags-CTA (`data-tjanst="dag"`) öppnar val: reservation / dinner ticket / music ticket, sedan tid eller regular/student.
- Verkliga Tebi share-URL:er sätts i `TEBI_LANKAR` i `idx/accordion.js`. Tom sträng = simulerad handoff-text, ingen ny flik.
- Dolt Tebi-flytknapp när widgeten kopplas in; sajtens CTA är ingången.

## Exklusivitet

Syskon är **exklusiva**: öppna en nod stänger öppna syskon (och deras barn). Förälder förblir öppen. Dokumenterat här — ingen princip krävde exclusive; ramarna visar högst ett öppet barn per grupp.

## Pinna (följande syskon)

När ett barn är expanderat:

- `data-pinna="sista"` (Restaurant, About): föregående syskon syns; mellansyskon efter den öppna noden döljs; sista syskonet tar en rad i nederkant. Restaurant pinnar Menu. About pinnar Vacancies.
- `data-pinna="nasta"` (Program): nästa syskon tar en rad i nederkant; resten efter nästa döljs. Matchar 9:107 (Today + Tomorrow).

När sista barnet är expanderat (Vacancies): inget att pinna; föregående stannar.

Restaurant öppnar på kök (`data-vy="kok"`, 8:55). Scroll till slutet av `.kok` eller toggla Menu sätter `data-vy="meny"` (5:6). På skrivbord döljs Menu vid kök; scroll öppnar inte menyn.

På skrivbord (`min-width: 64rem`) döljs inte toppnivå-syskon. Hem staplar dem till vänster; vald vy lägger dem i en centrerad rad (`display: contents` på `.trad > .nod`, grid på `.trad`). Kökets innehåll sitter i `--kolumn-bredd`.

## Skal-yta (härledd)

JS sätter `data-yta` och `data-black` på `.ram` från djupaste öppna nod:

| Villkor | `data-yta` | `data-black` |
|---|---|---|
| inget öppet | `accent` | `hem` |
| Restaurant, kök | `mork` | `ingen` |
| Menu öppen | `panel` | `meny` |
| About-intro | `panel` | `om` |
| Staff öppen | `mork` | `ingen` |
| Vacancies öppen | `panel` | `restaurant` |
| Program, ej Today | `accent` | `ingen` |
| Today öppen | `accent` | `program` |

## Hash

`#restaurant/menu` öppnar menyn. `#about/staff` och `#about/vacancies` öppnar About-barn. `#restaurant/staff` omdirigeras till `#about/staff`. Tom hash = hem.

## Komponent → markup

| Prompt | Markup |
|---|---|
| Bar (borttagen) | — |
| About | `article.nod[data-nod="about"]` + `.om-intro` |
| Accordion | `article.nod[data-tillstand]` |
| AccordionGroup | `.nod__inre[data-pinna]` |
| MenuList | `.meny-lista` |
| ProgramList | program-barn med `data-justera` |
| MediaBlock | `figure.galleri__bild` inne i `.galleri` |
| Caption / controller | `.styrenhet` (`galleri/fore`, `galleri/nasta`) |
| Spelare | `.spelare` (`spelare/vaxla`, `spelare/nasta`) |
| CTA | `button.cta` (`bokning/oppna`, `data-tjanst=bord|dag`) |
| Tebi-väljare | `dialog.tebi` (`tebi/tjanst`, `tebi/tid`, `tebi/tillbaka`) |
| CopyBlock | `.brod` |
| LinkRow | `nav.lankrad` |
| Footer | `footer.fot` |
| InkOverlay | `.black` `aria-hidden` `pointer-events: none` |
