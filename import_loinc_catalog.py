#!/usr/bin/env python3
"""Build a local REVILAC terminology index from a legitimately obtained LOINC CSV.
This imports terminology labels only; it does not invent clinical or nutrition mappings.
Check the current LOINC license and release terms before use/redistribution.
"""
import csv, json, sys
from pathlib import Path

def first(row, *keys):
    for k in keys:
        v=(row.get(k) or '').strip()
        if v: return v
    return ''

def main():
    if len(sys.argv)<2:
        print('Usage: python import_loinc_catalog.py path/to/Loinc.csv [output.json]')
        return 2
    src=Path(sys.argv[1]); out=Path(sys.argv[2]) if len(sys.argv)>2 else Path('loinc_report_registry.json')
    if not src.is_file(): print('Input CSV not found:',src); return 2
    concepts=[]; seen=set()
    with src.open('r',encoding='utf-8-sig',newline='') as f:
        reader=csv.DictReader(f)
        for row in reader:
            code=first(row,'LOINC_NUM','LOINC_NUM ')
            display=first(row,'LONG_COMMON_NAME','LONG_COMMON_NAME ')
            short=first(row,'SHORTNAME','SHORTNAME ')
            component=first(row,'COMPONENT','COMPONENT ')
            status=first(row,'STATUS','STATUS ')
            if not code or not (display or component) or (code,display) in seen: continue
            seen.add((code,display))
            aliases=[]
            for a in [component,short,first(row,'RELATEDNAMES2'),first(row,'RELATEDNAMES2 ')]:
                if a and a.lower() not in {x.lower() for x in aliases}: aliases.append(a)
            concepts.append({'code':code,'display':display,'longCommonName':display,'shortName':short,'component':component,'system':first(row,'SYSTEM'),'scale':first(row,'SCALE_TYP'),'method':first(row,'METHOD_TYP'),'className':first(row,'CLASS'),'status':status,'aliases':aliases})
    data={'catalogue':'LOINC local terminology index','sourceFile':src.name,'generatedAt':__import__('datetime').datetime.now(__import__('datetime').timezone.utc).isoformat(),'count':len(concepts),'notice':'Terminology candidates only. Check LOINC license/release terms. This file does not provide clinical interpretation or nutrition recommendations.','concepts':concepts}
    out.write_text(json.dumps(data,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
    print(f'Wrote {len(concepts):,} terminology concepts to {out}. No clinical or nutrition mappings were inferred.')
    return 0
if __name__=='__main__': raise SystemExit(main())
