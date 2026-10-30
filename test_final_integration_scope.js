'use strict';
const assert = require('node:assert/strict');
const router = require('./universal-report-nutrition.js');
const guidance = require('./revilac-final-guidance.js');
const wellness = require('./report-wellness-integration.js');
const expected = [
  ['Headache symptoms','headache migraine dizziness','symptoms-headache'],
  ['Eye report','retinal scan optical coherence tomography','eye-vision'],
  ['Dental report','periodontal chart dental examination','dental-oral'],
  ['PFT report','spirometry FEV1 FVC','respiratory-function'],
  ['ECG report','electrocardiogram ECG','cardiac-test'],
  ['Genetic report','whole exome sequencing variant report','genetic-molecular'],
  ['X-ray report','x ray radiology report','radiology'],
  ['Cancer pathology','biopsy report carcinoma','cancer-pathology']
];
for (const [title, text, key] of expected) {
  const result = router.recognize(title, text);
  assert.ok(result.matches.some(match => match.key === key), `${title} should route to ${key}`);
}
assert.ok(router.rules.length >= 30, 'expanded starter report registry should cover many report families');
assert.ok(router.rules.every(rule => wellness.profiles[rule.key]), 'each starter report family should have a nutrition/safety profile or explicit safe review profile');
assert.ok(guidance.categories.length >= 9, 'food categories should be available');
assert.ok(guidance.activityClasses.restricted, 'restricted activity must be represented');
assert.equal(guidance.compositionFor('Carrot', 50).portion_g, 50, 'portion scaling should preserve selected portion');
assert.equal(guidance.compositionFor('Amla', 100), null, 'unknown food composition must not invent numeric values');
assert.ok(guidance.compositionFor('Carrot', 50).values.energy_kcal > 0, 'known starter food should show estimated energy');
console.log('PASS: expanded report routing, food category coverage, activity safety class and starter portion calculations.');
