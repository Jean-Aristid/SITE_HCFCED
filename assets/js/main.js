const menu = document.querySelector('.menu');
const links = document.querySelector('.links');

function setMenu(open) {
  links.classList.toggle('is-open', open);
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
}

menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
links.addEventListener('click', event => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menu.focus();
  }
});
window.matchMedia('(min-width: 1001px)').addEventListener('change', event => {
  if (event.matches) setMenu(false);
});
