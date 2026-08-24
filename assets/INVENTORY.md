# INVENTORY — visuella tokens per ram

Ramar: 393 × 852 (mobil). Skrivbord 10:1821 / 10:1911 är 1512 × 982; brytpunkt `--bryt-skarm` (64rem). Figma-fil `BXYZ-Contra-Web-Frames`.

## Färger (Figma-namn → roll)

| Figma | Hex / värde | Token | Ramar |
|---|---|---|---|
| contra-red | `#E30614` | `--yta-accent` | 1:3, 9:107, 9:177; röd list på panel (1:39, 5:6) |
| contra-grey | `#CFCBDC` | `--yta-panel`, `--text-pa-accent` | alla |
| contra-brown | `#52190E` | `--yta-mork`, `--text-pa-panel`, `--text-vald` | listor, bröd på panel, vald accent-rubrik, hem-bläck |
| footer fill | `rgb(217 217 217 / 0.2)` | `--yta-fot` | alla sidor (1:29) |
| footer text | `#000000` | `--text-fot` | 1:29 |
| foto opacity | `0.85` | `--media-tathet-program` | 9:107 image 2 |
| foto opacity | `0.75` | `--media-tathet-lokal` | 9:101 / 8:55 |

Inga Figma Variables i filen (`get_variable_defs` = `{}`). Värden från code-connect / fills.

## Typ

| Roll | Familj | Vikt | Storlek | Radhöjd | Token | Ramar |
|---|---|---|---|---|---|---|
| nav / sektion / datum | Berthold Akzidenz Grotesk Medium | 500 | 24 | 42 | `--typ-nav` | alla sidramar |
| bröd, caption, länkar, meny | samma | 500 | 14.833 | 21.503 | `--typ-brod` | 1:39, 5:6, 8:55, 9:107 |
| footer | Helvetica Light | 300 | 12 | normal | `--typ-fot` | 1:29 |

## Mått

| Beslut | Värde | Token | Ramar |
|---|---|---|---|
| ram | 393 × 852 | `--ram-bredd` `--ram-hojd` | alla sidramar |
| text-insats toppnivå | 17 | `--gut-ytter` | 1:3, Program, Restaurant-titel |
| text-insats nästlad | 37 | `--gut-nasta` | Staff / Menu / Vacancies |
| copy-bredd nästlad | 340 | `--copy-bredd-nasta` | 1:39 |
| copy-bredd / caption | 361–363 | `--copy-bredd` | 8:55, 9:107 |
| rad text | 42 + 3 topp = 45 till list | `--rad-text` `--trad-start` | alla |
| list-tjocklek | 12 | `--linje-tjocklek` | alla |
| radsteg | 54 (42+12) | `--rad-hojd` `--rad-steg` | alla |
| halv list hem | 196.5 | `--linje-halv` | 1:3 |
| fot | 59 | `--fot-hojd` | 1:29 |
| program-media | 393 × 261 | `--media-program-hojd` | 9:107 |
| lokal-media | 393 × 393 | `--media-lokal-sida` | 9:101 |
| caption-rad | 22 | `--caption-hojd` `--spelare-hojd` | 8:55, 9:107, 10:1229 |
| spelare-insats | 7 | `--spelare-insats` | 10:1229 x=7 |
| meny kolumn | 157, gap till pris x=216 | `--meny-namn` `--meny-pris-start` | 5:6 |

## Grafik

| Fil | Ursprung | Användning |
|---|---|---|
| `grafik/black-hem.svg` | 1:3 Asset 4, 837×802 at (−222, −9) | hem-bläck, färg via mask → mork |
| `grafik/black-hem-skrivbord.png` | 10:1821 Asset 4, 1861×1784 at (−218, −471), 2× RGBA | skrivbord hem-bläck, mask → mork |
| `grafik/logotyp.svg` | 10:1821 / 10:1911 logoBXYZ_ABCJ, 219×66 | mask; hem `--yta-mork`, kök `--text-pa-mork` |
| `grafik/black-restaurant.svg` | 1:39 Asset 6, 347×708 at (17, 70) | Vacancies, accent-mask |
| `grafik/black-meny.svg` | 5:6 Asset 5, 337×874 at (190, −18) | Menu, accent-mask |
| `grafik/black-om.png` | 10:1759 Asset 5BXYZ_ABCJ 2, 502.69×1303.9 at (101, −369) | About-intro, mask → mork |
| `grafik/lokal.png` | 9:101 image 1 | Galleri Staff, slide 2 Program |
| `grafik/program-idag.png` | 9:107 image 2 | Galleri Program Today, slide 2 Staff |
| `grafik/list-textur.png` | listfyllning i Figma (övermålad av brown) | inte synlig som logo; listor är token-färg |
| `ljud/casette.mp3` | casette.wav (192 kHz master, transkodad) | Spelare, spår 1 |
| `ljud/flipside.mp3` | flipside.wav | Spelare, spår 2 |
| `ljud/occult.mp3` | occult.wav | Spelare, spår 3 |

## Ram för ram

| Node | Namn | Yta | Träd-läge |
|---|---|---|---|
| 1:3 | hem hopfälld | accent, halvbrun list, bläck hem | Restaurant / Program / About |
| 10:1759 | About-intro | panel, röd copy `--text-om`, mörk splat, halv list, spelare | Staff och Vacancies hopfällda nederst |
| 8:55 + 9:101 | Restaurant kök | mörk yta, foto, caption, copy; Menu nederst | vy=kok |
| 5:6 | Menu | panel, meny-lista + CTA | vy=meny, Menu expanderad |
| 9:177 | Program-lista | accent, grå lister, datum justerade R/C/L/C | alla datum hopfällda + Booking |
| 9:107 | Program / Today | accent, foto, caption, copy, länkar; Tomorrow nederst | Today expanderad (pinna nästa) |
| 1:29 | footer | 59 px, url centrerad | alla sidor |
| 1:28 | top-env-safe | chrome | ej i sajt |
| 9:101 | image 1 | 393 foto, tathet 0.75 | Staff-galleri, första slide |
| 9:122 | controller-component | 361×22, — Caption — | `.styrenhet` i båda gallerier |
| 10:1229 | frontpage-player-component | 386×22, Play / tid / titel / puls / Next | `.spelare` ovanför fot |
| 10:1821 | MacBook Pro 14" hem | accent, halvbrun list, skrivbord-bläck, logotyp övre höger, spelare nedre höger | Restaurant / Program / About |
| 10:1911 | MacBook Pro 14" kök | mörk yta, centrerad nav-rad, foto 584, copy 363, logotyp nedre vänster, inverterad spelare | vy=kok, Menu dold |
