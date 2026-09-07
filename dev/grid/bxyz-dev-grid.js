// BXYZ:..:eliot@bosmanxyz.xyz:..:.www.bosmanxyz.xyz

const ytor = Object.freeze(['accent', 'mork', 'svart', 'panel']);

const atgarder = {
  'dev-grid/vaxla': vaxlaRutnat,
  'dev-grid/dolj': doljStyr,
  'dev-yta/nasta': nastaYta,
  'dev-yta/live': aterstallYta,
};

function vaxlaRutnat() {
  const nu = document.documentElement.dataset.devGrid === 'ja';
  if (nu) {
    delete document.documentElement.dataset.devGrid;
  } else {
    document.documentElement.dataset.devGrid = 'ja';
  }
}

function doljStyr() {
  delete document.documentElement.dataset.devGrid;
  aterstallYta();
  const styr = document.querySelector('.bxyz-dev-grid-styr');
  if (styr) styr.remove();
}

function nastaYta() {
  const ram = document.querySelector('.ram');
  const nu = document.documentElement.dataset.devYta || ram?.dataset.yta || 'accent';
  const i = ytor.indexOf(nu);
  const nasta = ytor[(i + 1) % ytor.length];
  document.documentElement.dataset.devYta = nasta;
  synkaYtaEtikett();
  document.documentElement.dispatchEvent(new Event('bxyz-dev-skal'));
}

function aterstallYta() {
  delete document.documentElement.dataset.devYta;
  synkaYtaEtikett();
  document.documentElement.dispatchEvent(new Event('bxyz-dev-skal'));
}

function synkaYtaEtikett() {
  const yta = document.documentElement.dataset.devYta;
  const nasta = document.querySelector('[data-atgard="dev-yta/nasta"]');
  const live = document.querySelector('[data-atgard="dev-yta/live"]');
  if (nasta) {
    nasta.textContent = yta ? `yta ${yta}` : 'yta';
    nasta.setAttribute('aria-pressed', yta ? 'true' : 'false');
  }
  if (live) live.hidden = !yta;
}

function bygg() {
  const rutnat = document.createElement('div');
  rutnat.className = 'bxyz-dev-grid';
  rutnat.setAttribute('aria-hidden', 'true');
  rutnat.innerHTML =
    '<div class="bxyz-dev-grid__ram"></div><div class="bxyz-dev-grid__falt"></div>';

  const styr = document.createElement('div');
  styr.className = 'bxyz-dev-grid-styr';
  styr.innerHTML =
    '<div class="bxyz-dev-grid-styr__pill">' +
    '<button type="button" data-atgard="dev-grid/vaxla">grid</button>' +
    '<button type="button" data-atgard="dev-yta/nasta" aria-pressed="false">yta</button>' +
    '<button type="button" data-atgard="dev-yta/live" hidden>live</button>' +
    '<button type="button" data-atgard="dev-grid/dolj" aria-label="Hide grid">×</button>' +
    '</div>';

  document.body.append(rutnat, styr);
  styr.addEventListener('click', (event) => {
    const mal = event.target.closest('[data-atgard]');
    if (!mal) return;
    const fn = atgarder[mal.dataset.atgard];
    if (!fn) return;
    event.preventDefault();
    fn();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bygg);
} else {
  bygg();
}
