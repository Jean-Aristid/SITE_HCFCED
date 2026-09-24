"""Vérification sans dépendance des chemins et ancres du site statique."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import re

ROOT = Path(__file__).resolve().parents[1] / 'site'


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.ids = set()
        self.refs = []
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.add(attrs['id'])
        for attr in ('href', 'src'):
            if attrs.get(attr):
                self.refs.append(attrs[attr])


pages = {p: Page(p.read_text(encoding='utf-8')) for p in ROOT.rglob('*.html')}
errors = []
for path, page in pages.items():
    refs = page.refs + re.findall(r'url\([\'"]?([^\)\'" ]+)', path.read_text(encoding='utf-8'))
    for ref in refs:
        url = urlsplit(ref)
        if url.scheme or url.netloc:
            continue
        if url.path.startswith('/'):
            errors.append(f'{path.name}: chemin absolu incompatible avec un sous-dossier Pages: {ref}')
            continue
        target = (path.parent / unquote(url.path)).resolve() if url.path else path
        if not target.is_relative_to(ROOT):
            errors.append(f'{path.name}: chemin hors du site: {ref}')
        elif not target.exists():
            errors.append(f'{path.name}: fichier absent: {ref}')
        elif url.fragment and target in pages and unquote(url.fragment) not in pages[target].ids:
            errors.append(f'{path.name}: ancre absente: {ref}')
assert not errors, '\n'.join(errors)
assert len(pages) == 3, 'Les trois pages principales sont attendues.'
print(f'OK : {len(pages)} pages, chemins locaux, images et ancres vérifiés.')
