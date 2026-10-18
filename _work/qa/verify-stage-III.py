"""Static navigation and preservation checks. Does not launch a browser."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse
from zipfile import ZipFile
import json
import re

ROOT = Path(__file__).resolve().parents[2]

class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = []
        self.links = []
        self.scripts = []
        self.body = {}
        self.lang = None
    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if 'id' in attrs: self.ids.append(attrs['id'])
        if tag == 'a': self.links.append(attrs)
        if tag == 'script': self.scripts.append(attrs)
        if tag == 'html': self.lang = attrs.get('lang')
        if tag == 'body': self.body = attrs

checks = []
pages = {}
for relative in ['index.html', 'bazaWiedzy/slowniczek.html']:
    path = ROOT / relative
    text = path.read_text()
    page = Page()
    page.feed(text)
    assert len(page.ids) == len(set(page.ids)), relative
    for link in page.links:
        href = link.get('href', '')
        assert href and not href.startswith('javascript:'), relative
        parsed = urlparse(href)
        assert not parsed.scheme and not parsed.netloc, href
        assert (path.parent / parsed.path).resolve().is_file(), href
    for resource in re.findall(r"url\(['\"]?([^'\")]+)", text):
        if not urlparse(resource).scheme:
            assert (path.parent / resource).is_file(), resource
    pages[relative] = page
checks.append('Both HTML files parse; IDs are unique; all relative links and CSS resources resolve.')

home = pages['index.html']
knowledge = next(link for link in home.links if link.get('id') == 'knowledge-link')
assert knowledge['href'] == 'bazaWiedzy/slowniczek.html'
html = (ROOT / 'index.html').read_text()
header = html[html.index('<header>'):html.index('</header>')]
assert 'id="knowledge-link"' in header
assert 'chcę wiedzieć więcej' in header
assert 'header-actions' in header and 'justify-content:flex-end' in html
assert home.scripts == [{'type': 'module', 'src': 'skryptymariswww.js'}]
assert home.body.get('data-page') == 'home'
checks.append('Top header contains the requested native link; existing single application script is retained.')

glossary = pages['bazaWiedzy/slowniczek.html']
back = next(link for link in glossary.links if link.get('id') == 'home-link')
assert back['href'] == '../index.html'
assert glossary.lang == 'pl' and glossary.body.get('data-page') == 'glossary'
assert not glossary.scripts
assert 'Strona w przygotowaniu.' in (ROOT / 'bazaWiedzy/slowniczek.html').read_text()
checks.append('Glossary skeleton has a valid return link, Polish metadata, and no premature scene initialization.')

source_zip = ROOT.parent / 'download/MARIS_AI_projekt_roboczy.zip'
changed = []
with ZipFile(source_zip) as previous:
    for name in previous.namelist():
        if previous.read(name) != (ROOT / name).read_bytes():
            changed.append(name)
assert set(changed).issubset({'index.html', 'README.txt', '_work/state.json'}), changed
checks.append('All pre-existing source documents, graphics, JavaScript and internal tests remain byte-identical.')

result = {
    'checks': checks,
    'changed_existing_files': changed,
    'limits': ['Static checks only. No browser navigation, layout, keyboard or WebGL visual test.']
}
(ROOT / '_work/qa/stage-III-results.json').write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n')
print(json.dumps(result, ensure_ascii=False, indent=2))
