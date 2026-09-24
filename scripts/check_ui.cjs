const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.join(__dirname, '..', 'site');

// Exécute les scripts réels avec les seuls éléments DOM qu'ils utilisent.
// Ce contrôle vérifie les comportements ; il ne remplace pas une revue visuelle.
function environment(search = '') {
  const elements = new Map();
  const document = {querySelector(selector) {
    if (!elements.has(selector)) elements.set(selector, {
      value: '', innerHTML: '', textContent: '', hidden: true, style: {},
      classList: {add() {}, remove() {}, toggle() {}},
      add() {}, addEventListener() {}
    });
    return elements.get(selector);
  }};
  const context = vm.createContext({document, location: {search}, URLSearchParams, URL,
    Option: function(text, value) {this.text = text; this.value = value;},
    window: {}, setTimeout() {}});
  return {context, document};
}
const catalogue = fs.readFileSync(path.join(root, 'assets/catalogue.js'), 'utf8');
const html = fs.readFileSync(path.join(root, 'boutiques/index.html'), 'utf8');
const script = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');
function shop(search = '') {
  const env = environment(search);
  vm.runInContext(catalogue + '\n' + script, env.context);
  return env;
}
const all = shop();
assert.equal((all.document.querySelector('#products').innerHTML.match(/class="product"/g) || []).length, 8);
assert.equal((all.document.querySelector('#seller-list').innerHTML.match(/class="shop-link"/g) || []).length, 6);
const selected = shop('?boutique=' + encodeURIComponent('Amina Créations'));
assert.equal((selected.document.querySelector('#products').innerHTML.match(/class="product"/g) || []).length, 2);
assert(!selected.document.querySelector('#products').innerHTML.includes('Karité de Sira'));
vm.runInContext("setFilter('Beauté')", selected.context);
assert.equal(selected.document.querySelector('#empty').style.display, 'block');
vm.runInContext("setFilter('Tous'); document.querySelector('#search').value='robe'; renderProducts(); addToCart(5)", selected.context);
assert.equal((selected.document.querySelector('#products').innerHTML.match(/class="product"/g) || []).length, 1);
assert.equal(selected.document.querySelector('#count').textContent, 1);
assert(selected.document.querySelector('#cartTotal').innerHTML.includes('119'));
vm.runInContext('removeItem(0)', selected.context);
assert.equal(selected.document.querySelector('#count').textContent, 0);
const missing = shop('?boutique=inconnue');
assert.equal(missing.document.querySelector('#empty').style.display, 'block');
assert(missing.document.querySelector('#shop-status').textContent.includes('introuvable'));
const adhesion = fs.readFileSync(path.join(root, 'assets/adhesion.js'), 'utf8');
for (const [url, visible] of [['', false], ['https://forms.gle/exemple', true],
  ['https://docs.google.com/forms/d/e/exemple/viewform', true], ['https://example.com', false],
  ['javascript:alert(1)', false], ['invalid', false]]) {
  const env = environment();
  env.context.window.HCFCED_CONFIG = {adhesionFormUrl: url};
  vm.runInContext(adhesion, env.context);
  assert.equal(!env.document.querySelector('#adhesion-link').hidden, visible);
}
console.log('OK : catalogue, 6 boutiques, filtres, recherche, panier, boutique absente et lien Google Forms.');
