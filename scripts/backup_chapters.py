#!/usr/bin/env python3
from pathlib import Path
from datetime import datetime
import shutil

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'data' / 'chapters.json'
BACKUP_DIR = ROOT / 'data' / 'backups'

def main():
    BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    if not SRC.exists():
        print(f'Source not found: {SRC}')
        return 1
    ts = datetime.now().strftime('%Y%m%d-%H%M%S')
    dst = BACKUP_DIR / f'chapters-{ts}.json'
    shutil.copy2(SRC, dst)
    print(f'Backed up {SRC} -> {dst}')
    return 0

if __name__ == '__main__':
    raise SystemExit(main())
