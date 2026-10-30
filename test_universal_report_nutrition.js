'use strict';
const assert=require('node:assert/strict');
const engine=require('./universal-report-nutrition.js');
assert.ok(engine.rules.length>=40,'must cover broad report-family starter registry');
const cases=[
 ['CBC','complete blood count haemoglobin','cbc'],
 ['Iron studies','serum ferritin transferrin saturation','iron-studies'],
 ['HbA1c','glycated hemoglobin','glucose'],
 ['Lipid profile','LDL HDL triglycerides','lipids'],
 ['Renal function','creatinine eGFR potassium','kidney'],
 ['LFT','ALT AST bilirubin','liver'],
 ['Vitamin D','25 OH vitamin D','vitamins'],
 ['TSH','free T4','thyroid'],
 ['Urinalysis','urine protein','urine'],
 ['Blood culture','microbiology culture sensitivity','infection'],
 ['CRP','C reactive protein ESR','immune'],
 ['Biopsy report','histopathology carcinoma','cancer-pathology'],
 ['MRI brain','radiology imaging report','radiology'],
 ['ECG','electrocardiogram','cardiac'],
 ['Pregnancy test','serum beta hCG','pregnancy'],
 ['Food allergy panel','specific IgE','allergy'],
 ['PT INR','prothrombin time','coagulation'],
 ['DEXA','bone mineral density','bone'],
 ['Spirometry','pulmonary function test','pulmonary'],
 ['Genetic panel','exome sequencing','genetic'],
 ['Stool diagnostics','faecal calprotectin','stool-digestive'],
 ['Endoscopy','colonoscopy report','endoscopy'],
 ['Rheumatology','HLA B27 rheumatology report','rheumatology'],
 ['Dermatology','skin scraping dermatology','dermatology'],
 ['Audiology','audiogram hearing test','audiology-ent'],
 ['Blood bank','crossmatch antibody screen','blood-bank'],
 ['Pediatric growth','growth chart height for age','pediatric-growth'],
 ['Surgical follow-up','postoperative wound assessment','surgical-postoperative'],
 ['Vascular test','ankle brachial index ABI','vascular']
];
for(const [title,txt,key] of cases){const r=engine.recognize(title,txt);assert.ok(r.matches.some(x=>x.key===key),`${title} should route to ${key}; got ${r.matches.map(x=>x.key)}`)}
const unknown=engine.recognize('XQZ unknown document','unrecognisable material');
assert.equal(unknown.status,'unknown','unknown report must not be guessed');
assert.ok(engine.generalFoodCategories.length>=8,'fallback categories available');
engine.setImportedConcepts([{code:'TEST-123',display:'Rare Specialized Biomarker',longCommonName:'Rare Specialized Biomarker',shortName:'Rare Biomarker',aliases:['RSB'],className:'Laboratory'}]);
const imported=engine.recognize('Rare Specialized Biomarker report','');
assert.equal(imported.status,'terminology-candidate','imported vocabulary should route unknown report terms as terminology candidates');
assert.equal(imported.matches[0].loincCode,'TEST-123');
assert.equal(imported.matches[0].foods.length,0,'terminology alone must not trigger food advice');
assert.ok(engine.rules.every(r=>r.caution && r.topic && Array.isArray(r.foods)),'each family has safety and nutrition fields');
assert.ok(engine.rules.filter(r=>r.risk).every(r=>r.caution.length>15),'risk families require cautions');
const ranked=engine.recognize('Combined report','complete blood count hemoglobin ferritin serum iron HbA1c fasting glucose');
assert.ok(ranked.matches.every(x=>Number.isInteger(x.relevancePercent)&&x.relevancePercent>=1&&x.relevancePercent<=100),'each match must have a bounded relevance percentage');
assert.ok(ranked.matches.every((x,i,a)=>i===0||a[i-1].relevancePercent>=x.relevancePercent),'matches must be sorted by relevance descending');
assert.ok(ranked.matches.every(x=>String(x.relevanceLabel||'').includes('not clinical severity')),'relevance score must be explicitly distinguished from clinical severity');
const mixedKidneyDiabetes=engine.recognize('Combined report','HbA1c fasting glucose creatinine eGFR potassium');
assert.ok(mixedKidneyDiabetes.matches.some(x=>x.key==='glucose')&&mixedKidneyDiabetes.matches.some(x=>x.key==='kidney'),'mixed report should retain multiple matched families');
assert.equal(engine.shouldHoldFoodGuidance(mixedKidneyDiabetes),true,'kidney markers must pause food guidance across the whole mixed report');
assert.equal(engine.shouldHoldFoodGuidance(engine.recognize('HbA1c','HbA1c fasting glucose')),false,'glucose report can show general food-source education when no hard-stop family is present');
assert.equal(engine.shouldHoldFoodGuidance(engine.recognize('Vitamin D','25 hydroxy vitamin D')),false,'vitamin source education should remain available when no hard-stop family is present');
console.log(`PASS: ${cases.length} routing examples; ${engine.rules.length} report-family profiles; unknown-report safe fallback; nutrition/safety profile structure; mixed kidney+glucose report pauses all food guidance; glucose/vitamin general source guidance remains available without hard-stop families.`);
