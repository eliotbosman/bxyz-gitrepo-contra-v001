// BXYZ:..:eliot@bosmanxyz.xyz:..:.www.bosmanxyz.xyz

const tillstand = Object.freeze({
  hopfalld: 'hopfalld',
  expanderar: 'expanderar',
  expanderad: 'expanderad',
  kollapsar: 'kollapsar',
});

const reduceradRorelse = window.matchMedia('(prefers-reduced-motion: reduce)');
const skrivbordFraga = window.matchMedia('(min-width: 64rem)');

const atgarder = {
  'ackordion/vaxla': vaxlaNod,
  'galleri/fore': (event, knapp) => stegaGalleri(knapp, -1),
  'galleri/nasta': (event, knapp) => stegaGalleri(knapp, 1),
  'spelare/vaxla': vaxlaSpelning,
  'spelare/nasta': nastaSpar,
  'bokning/oppna': oppnaBokning,
  'tebi/tjanst': valjTjanst,
  'tebi/tid': valjTid,
  'tebi/tillbaka': tebiTillbaka,
};

const SPAR = Object.freeze([
  { titel: 'Casette', kalla: 'assets/ljud/casette.mp3' },
  { titel: 'Flipside', kalla: 'assets/ljud/flipside.mp3' },
  { titel: 'Occult', kalla: 'assets/ljud/occult.mp3' },
]);

const PULS = '.:.:.:.:.:.';

function arOppen(nod) {
  const t = nod.dataset.tillstand;
  return t === tillstand.expanderad || t === tillstand.expanderar;
}

function knappFor(nod) {
  return nod.querySelector(
    ':scope > .nod__reglage, :scope > :is(h2, h3) > .nod__reglage'
  );
}

function panelFor(nod) {
  return nod.querySelector(':scope > .nod__panel');
}

function syskon(nod) {
  return [...nod.parentElement.children].filter(
    (el) => el.classList.contains('nod') && el !== nod
  );
}

function vantaOvergang(nod, done) {
  const panel = panelFor(nod);
  if (!panel || reduceradRorelse.matches) {
    done();
    return;
  }
  let klar = false;
  const avsluta = (event) => {
    if (event && event.target !== panel) return;
    if (klar) return;
    klar = true;
    done();
  };
  panel.addEventListener('transitionend', avsluta);
  window.setTimeout(() => avsluta(), 400);
}

function markera(nod, nasta, expanderad) {
  nod.dataset.tillstand = nasta;
  const knapp = knappFor(nod);
  if (knapp) {
    knapp.setAttribute('aria-expanded', expanderad ? 'true' : 'false');
  }
  const panel = panelFor(nod);
  if (panel) {
    panel.inert = !expanderad;
  }
}

function arSkrivbord() {
  return skrivbordFraga.matches;
}

function arTopp(nod) {
  return nod.dataset.niva === '0';
}

function korMedOvergang(fn) {
  if (
    !arSkrivbord() ||
    reduceradRorelse.matches ||
    typeof document.startViewTransition !== 'function'
  ) {
    fn();
    return;
  }
  document.startViewTransition(fn);
}

function stangNod(nod) {
  if (!arOppen(nod) && nod.dataset.tillstand !== tillstand.kollapsar) {
    return;
  }
  nod.querySelectorAll(':scope .nod').forEach((barn) => {
    if (barn === nod) return;
    if (arOppen(barn) || barn.dataset.tillstand === tillstand.kollapsar) {
      markera(barn, tillstand.hopfalld, false);
    }
  });
  if (reduceradRorelse.matches || (arSkrivbord() && arTopp(nod))) {
    markera(nod, tillstand.hopfalld, false);
    return;
  }
  markera(nod, tillstand.kollapsar, false);
  vantaOvergang(nod, () => {
    if (nod.dataset.tillstand === tillstand.kollapsar) {
      markera(nod, tillstand.hopfalld, false);
    }
  });
}

function oppnaNod(nod) {
  syskon(nod).forEach((s) => stangNod(s));
  if (reduceradRorelse.matches || (arSkrivbord() && arTopp(nod))) {
    markera(nod, tillstand.expanderad, true);
    return;
  }
  markera(nod, tillstand.expanderar, true);
  vantaOvergang(nod, () => {
    if (nod.dataset.tillstand === tillstand.expanderar) {
      markera(nod, tillstand.expanderad, true);
    }
  });
}

function vaxlaNod(event, knapp) {
  const nod = knapp.closest('.nod');
  if (!nod) return;
  const kora = () => {
    if (arOppen(nod)) {
      stangNod(nod);
    } else {
      oppnaNod(nod);
    }
    uppdateraSkal();
    uppdateraHash();
  };
  if (arTopp(nod)) {
    korMedOvergang(kora);
  } else {
    kora();
  }
}

function hamtaSogvag() {
  const delar = [];
  let kontext = document.querySelector('.trad');
  while (kontext) {
    const nod = [...kontext.children].find(
      (el) => el.classList.contains('nod') && arOppen(el)
    );
    if (!nod) break;
    delar.push(nod.dataset.nod);
    kontext = nod.querySelector(':scope > .nod__panel > .nod__inre');
  }
  return delar;
}

function uppdateraHash() {
  const vag = hamtaSogvag();
  const nasta = vag.length ? `#${vag.join('/')}` : '';
  const nu = location.hash === '#' ? '' : location.hash;
  if (nu !== nasta) {
    history.replaceState(null, '', nasta || location.pathname + location.search);
  }
}

function nollstallTrad() {
  document.querySelectorAll('.nod').forEach((nod) => {
    markera(nod, tillstand.hopfalld, false);
  });
}

function oppnaVag(delar) {
  let kontext = document.querySelector('.trad');
  for (const id of delar) {
    const nod = kontext?.querySelector(`:scope > .nod[data-nod="${id}"]`);
    if (!nod) break;
    oppnaNod(nod);
    kontext = nod.querySelector(':scope > .nod__panel > .nod__inre');
  }
}

function hamtaBlack(ram) {
  const idag = ram.querySelector('[data-nod="idag"]');
  const program = ram.querySelector('[data-nod="program"]');
  const staff = ram.querySelector('[data-nod="staff"]');
  const meny = ram.querySelector('[data-nod="menu"]');
  const vacancies = ram.querySelector('[data-nod="vacancies"]');
  const about = ram.querySelector('[data-nod="about"]');
  const restaurant = ram.querySelector('[data-nod="restaurant"]');
  if (idag && arOppen(idag)) return 'program';
  if (program && arOppen(program)) return 'ingen';
  if (staff && arOppen(staff)) return 'ingen';
  if (meny && arOppen(meny)) return 'meny';
  if (vacancies && arOppen(vacancies)) return 'restaurant';
  if (about && arOppen(about)) return 'om';
  if (restaurant && arOppen(restaurant)) return 'ingen';
  return 'hem';
}

function hamtaYta(ram) {
  const staff = ram.querySelector('[data-nod="staff"]');
  if (staff && arOppen(staff)) return 'mork';
  const restaurant = ram.querySelector('[data-nod="restaurant"]');
  const meny = ram.querySelector('[data-nod="menu"]');
  if (restaurant && arOppen(restaurant) && !(meny && arOppen(meny))) return 'mork';
  const topp = [...ram.querySelectorAll('.trad > .nod')].find(arOppen);
  if (topp?.dataset.ytaNod === 'panel') return 'panel';
  return 'accent';
}

function hamtaSpelare(ram) {
  if (arSkrivbord()) return 'synlig';
  const topp = [...ram.querySelectorAll('.trad > .nod')].find(arOppen);
  if (!topp) return 'synlig';
  if (topp.dataset.nod === 'program') return 'synlig';
  if (topp.dataset.nod === 'about') {
    const staff = ram.querySelector('[data-nod="staff"]');
    const vacancies = ram.querySelector('[data-nod="vacancies"]');
    if ((staff && arOppen(staff)) || (vacancies && arOppen(vacancies))) return 'dold';
    return 'synlig';
  }
  return 'dold';
}

function uppdateraRestaurangVy(ram) {
  const rest = ram.querySelector('[data-nod="restaurant"]');
  const meny = ram.querySelector('[data-nod="menu"]');
  if (!rest) return;
  const nasta = meny && arOppen(meny) ? 'meny' : 'kok';
  if (rest.dataset.vy === nasta) return;
  rest.dataset.vy = nasta;
  if (nasta === 'kok') {
    const kok = rest.querySelector('.kok');
    if (kok) kok.scrollTop = 0;
  }
}

function uppdateraSkal() {
  const ram = document.querySelector('.ram');
  if (!ram) return;
  uppdateraRestaurangVy(ram);
  ram.dataset.yta = hamtaYta(ram);
  ram.dataset.black = hamtaBlack(ram);
  ram.dataset.spelare = hamtaSpelare(ram);
  const spelare = ram.querySelector('.spelare');
  if (!spelare) return;
  const synlig = ram.dataset.spelare === 'synlig';
  spelare.hidden = !synlig;
  if (!synlig && spelare.dataset.spelar === 'ja') {
    pausaSpelning(spelare);
  }
}

function lasHash() {
  const delar = location.hash.replace(/^#/, '').split('/').filter(Boolean);
  if (delar[0] === 'restaurant' && (delar[1] === 'staff' || delar[1] === 'vacancies')) {
    return ['about', delar[1]];
  }
  if (delar[0] === 'events' || delar[0] === 'bar') {
    return [];
  }
  return delar;
}

function hamtaFranHash() {
  nollstallTrad();
  const delar = lasHash();
  if (delar.length) oppnaVag(delar);
  uppdateraSkal();
  uppdateraHash();
}

function rullaKokTillMeny(flode) {
  if (arSkrivbord()) return;
  const rest = document.querySelector('[data-nod="restaurant"]');
  const meny = document.querySelector('[data-nod="menu"]');
  if (!rest || !meny || !arOppen(rest) || arOppen(meny)) return;
  if (flode.scrollTop <= 0) return;
  if (flode.scrollTop + flode.clientHeight < flode.scrollHeight - 2) return;
  oppnaNod(meny);
  uppdateraSkal();
  uppdateraHash();
}

function startaKokRull() {
  const kok = document.querySelector('.kok');
  if (!kok) return;
  kok.addEventListener('scroll', () => rullaKokTillMeny(kok), { passive: true });
}

function galleriFor(el) {
  return el.closest('.galleri');
}

function bilderI(galleri) {
  return [...galleri.querySelectorAll(':scope > .galleri__bana > .galleri__bild')];
}

function visaBild(galleri, index) {
  const bilder = bilderI(galleri);
  if (!bilder.length) return;
  const n = bilder.length;
  const i = ((index % n) + n) % n;
  galleri.dataset.index = String(i);
  bilder.forEach((bild, k) => {
    const aktiv = k === i;
    bild.dataset.aktiv = aktiv ? 'true' : 'false';
    bild.setAttribute('aria-hidden', aktiv ? 'false' : 'true');
  });
  const text = galleri.querySelector(':scope > .styrenhet .styrenhet__bildtext');
  if (text) {
    text.textContent = bilder[i].dataset.bildtext || '';
  }
}

function stegaGalleri(knapp, steg) {
  const galleri = galleriFor(knapp);
  if (!galleri) return;
  const nu = Number(galleri.dataset.index || 0);
  visaBild(galleri, nu + steg);
}

function hanteraGalleriTangent(event) {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
  const galleri = event.target.closest('.galleri');
  if (!galleri) return;
  event.preventDefault();
  const nu = Number(galleri.dataset.index || 0);
  visaBild(galleri, nu + (event.key === 'ArrowRight' ? 1 : -1));
}

function startaGalleri() {
  document.querySelectorAll('.galleri').forEach((galleri) => {
    visaBild(galleri, Number(galleri.dataset.index || 0));
  });
}

function spelareEl() {
  return document.querySelector('.spelare');
}

function ljudEl(spelare) {
  return spelare.querySelector(':scope > .spelare__ljud');
}

function formatTid(sek) {
  const n = Math.max(0, Math.floor(Number(sek) || 0));
  const m = Math.floor(n / 60);
  const r = n % 60;
  return `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`;
}

function pulsFor(tid) {
  if (reduceradRorelse.matches) return PULS;
  const n = PULS.length;
  const i = Math.floor(tid * 4) % n;
  return PULS.slice(i) + PULS.slice(0, i);
}

function ritaSpelare(spelare) {
  const i = Number(spelare.dataset.spar || 0);
  const spar = SPAR[i] || SPAR[0];
  const titel = spelare.querySelector(':scope > .spelare__titel');
  const tid = spelare.querySelector(':scope > .spelare__tid');
  const puls = spelare.querySelector(':scope > .spelare__puls');
  const vaxla = spelare.querySelector(':scope > .spelare__vaxla');
  const ljud = ljudEl(spelare);
  const spelar = spelare.dataset.spelar === 'ja';
  if (titel) titel.textContent = spar.titel;
  if (tid) tid.textContent = formatTid(ljud?.currentTime || 0);
  if (puls) puls.textContent = spelar ? pulsFor(ljud?.currentTime || 0) : PULS;
  if (vaxla) {
    vaxla.textContent = spelar ? 'Pause' : 'Play';
    vaxla.setAttribute('aria-pressed', spelar ? 'true' : 'false');
  }
}

function laddaSpar(spelare, index, spela) {
  const n = SPAR.length;
  const i = ((index % n) + n) % n;
  spelare.dataset.spar = String(i);
  const ljud = ljudEl(spelare);
  if (!ljud) return;
  const kalla = SPAR[i].kalla;
  if (ljud.getAttribute('src') !== kalla) {
    ljud.src = kalla;
  }
  ritaSpelare(spelare);
  if (spela) {
    startaSpelning(spelare);
  }
}

function startaSpelning(spelare) {
  const ljud = ljudEl(spelare);
  if (!ljud) return;
  if (!ljud.getAttribute('src')) {
    laddaSpar(spelare, Number(spelare.dataset.spar || 0), false);
  }
  const lek = ljud.play();
  if (lek && typeof lek.catch === 'function') {
    lek.catch(() => {
      spelare.dataset.spelar = 'nej';
      ritaSpelare(spelare);
    });
  }
  spelare.dataset.spelar = 'ja';
  ritaSpelare(spelare);
}

function pausaSpelning(spelare) {
  const ljud = ljudEl(spelare);
  if (ljud) ljud.pause();
  spelare.dataset.spelar = 'nej';
  ritaSpelare(spelare);
}

function vaxlaSpelning() {
  const spelare = spelareEl();
  if (!spelare) return;
  if (spelare.dataset.spelar === 'ja') {
    pausaSpelning(spelare);
  } else {
    startaSpelning(spelare);
  }
}

function nastaSpar() {
  const spelare = spelareEl();
  if (!spelare) return;
  const spela = spelare.dataset.spelar === 'ja';
  laddaSpar(spelare, Number(spelare.dataset.spar || 0) + 1, spela);
}

const TEBI_LANKAR = Object.freeze({
  bord: '',
  middag: '',
  konsert: '',
});

const TEBI_NAMN = Object.freeze({
  bord: 'Reservation',
  middag: 'Dinner ticket',
  konsert: 'Music ticket',
});

function tebiEl() {
  return document.querySelector('.tebi');
}

function dagNamn(blad) {
  const lang = blad.querySelector('.etikett--lang');
  if (lang) return lang.textContent.trim();
  const titel = blad.querySelector('.nod__titel');
  return titel ? titel.textContent.trim() : '';
}

function visaVy(dialog, namn) {
  dialog.querySelectorAll(':scope .tebi__vy').forEach((vy) => {
    vy.hidden = vy.dataset.vy !== namn;
  });
}

function ritaTebi(dialog) {
  const rubrik = dialog.querySelector('#tebi-rubrik');
  if (rubrik) {
    rubrik.textContent = dialog.dataset.kalla === 'meny'
      ? 'Reservation'
      : (dialog.dataset.dag || 'Contra');
  }
  const steg = dialog.dataset.steg;
  const tjanst = dialog.dataset.tjanst;
  const tillbaka = dialog.querySelector('[data-atgard="tebi/tillbaka"]');
  if (steg === 'val') {
    visaVy(dialog, 'val');
    if (tillbaka) tillbaka.hidden = true;
  } else if (steg === 'tid') {
    visaVy(dialog, tjanst || 'bord');
    if (tillbaka) tillbaka.hidden = false;
  } else if (steg === 'handoff') {
    visaVy(dialog, 'handoff');
    if (tillbaka) tillbaka.hidden = false;
    const status = dialog.querySelector('.tebi__status');
    const lank = dialog.querySelector('.tebi__lank');
    const url = TEBI_LANKAR[tjanst] || '';
    const namn = TEBI_NAMN[tjanst] || '';
    const tid = dialog.dataset.tid || '';
    if (status) {
      status.textContent = url
        ? `${namn} · ${tid} continues in Tebi.`
        : `${namn}${tid ? ` · ${tid}` : ''}. Tebi opens this service in a new page. The widget link is not connected yet.`;
    }
    if (lank) {
      if (url) {
        lank.hidden = false;
        lank.href = url;
      } else {
        lank.hidden = true;
        lank.removeAttribute('href');
      }
    }
  }
}

function oppnaBokning(event, knapp) {
  const dialog = tebiEl();
  if (!dialog) return;
  const blad = knapp.closest('.nod[data-blad]');
  const tjanst = knapp.dataset.tjanst;
  dialog.dataset.dag = blad ? dagNamn(blad) : '';
  dialog.dataset.tid = '';
  if (tjanst === 'bord') {
    dialog.dataset.kalla = 'meny';
    dialog.dataset.tjanst = 'bord';
    dialog.dataset.steg = 'tid';
  } else {
    dialog.dataset.kalla = 'dag';
    dialog.dataset.tjanst = '';
    dialog.dataset.steg = 'val';
  }
  ritaTebi(dialog);
  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
  }
}

function valjTjanst(event, knapp) {
  const dialog = tebiEl();
  if (!dialog) return;
  dialog.dataset.tjanst = knapp.dataset.tjanst;
  dialog.dataset.steg = 'tid';
  dialog.dataset.tid = '';
  ritaTebi(dialog);
}

function valjTid(event, knapp) {
  const dialog = tebiEl();
  if (!dialog) return;
  dialog.dataset.tid = knapp.dataset.tid || '';
  dialog.dataset.steg = 'handoff';
  ritaTebi(dialog);
  const url = TEBI_LANKAR[dialog.dataset.tjanst];
  if (url) {
    window.open(url, '_blank', 'noopener');
  }
}

function tebiTillbaka() {
  const dialog = tebiEl();
  if (!dialog) return;
  const steg = dialog.dataset.steg;
  if (steg === 'handoff') {
    dialog.dataset.steg = 'tid';
    dialog.dataset.tid = '';
    ritaTebi(dialog);
    return;
  }
  if (steg === 'tid' && dialog.dataset.kalla === 'dag') {
    dialog.dataset.steg = 'val';
    dialog.dataset.tjanst = '';
    ritaTebi(dialog);
    return;
  }
  dialog.close();
}

function startaSpelare() {
  const spelare = spelareEl();
  if (!spelare) return;
  const ljud = ljudEl(spelare);
  if (!ljud) return;
  ljud.addEventListener('timeupdate', () => ritaSpelare(spelare));
  ljud.addEventListener('ended', () => {
    laddaSpar(spelare, Number(spelare.dataset.spar || 0) + 1, true);
  });
  laddaSpar(spelare, 0, false);
}

function hanteraAtgard(event) {
  const mal = event.target.closest('[data-atgard]');
  if (!mal) return;
  const fn = atgarder[mal.dataset.atgard];
  if (!fn) return;
  event.preventDefault();
  fn(event, mal);
}

function starta() {
  const ram = document.querySelector('.ram');
  if (!ram) return;
  document.querySelectorAll('.nod__panel').forEach((panel) => {
    panel.inert = true;
  });
  ram.addEventListener('click', hanteraAtgard);
  ram.addEventListener('keydown', hanteraGalleriTangent);
  window.addEventListener('hashchange', hamtaFranHash);
  skrivbordFraga.addEventListener('change', uppdateraSkal);
  startaGalleri();
  startaSpelare();
  startaKokRull();
  hamtaFranHash();
}

starta();
