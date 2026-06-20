#!/usr/bin/env python3
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'data' / 'chapters.json'

def main():
    if not SRC.exists():
        print('chapters.json not found', file=sys.stderr)
        return 2
    data = json.loads(SRC.read_text(encoding='utf-8'))
    problems = []
    chapters = data.get('chapters', [])
    if not chapters:
        problems.append('No chapters array found or empty')
    for i, c in enumerate(chapters, start=1):
        title = c.get('title','<no title>')
        content = c.get('contentHtml')
        if content is None:
            problems.append(f'Chapter {i} "{title}" missing contentHtml')
            continue
        stripped = ''.join(content.split())
        if len(stripped) < 20:
            problems.append(f'Chapter {i} "{title}" contentHtml suspiciously short')
    if problems:
        print('Validation failed:')
        for p in problems:
            print('- ' + p)
        return 1
    print('Validation OK: all chapters have non-empty contentHtml')
    return 0

if __name__ == '__main__':
    raise SystemExit(main())
