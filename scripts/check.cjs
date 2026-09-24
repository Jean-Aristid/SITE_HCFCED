const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.join(__dirname, '..');

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
const adhesion = fs.readFileSync(path.join(root, 'assets/js/adhesion.js'), 'utf8');
for (const [url, visible] of [['', false], ['https://forms.gle/exemple', true],
  ['https://docs.google.com/forms/d/e/exemple/viewform', true], ['https://example.com', false],
  ['javascript:alert(1)', false], ['invalid', false]]) {
  const env = environment();
  env.context.window.HCFCED_CONFIG = {adhesionFormUrl: url};
  vm.runInContext(adhesion, env.context);
  assert.equal(!env.document.querySelector('#adhesion-link').hidden, visible);
}
console.log('OK: activation du formulaire et validation de son URL.');
