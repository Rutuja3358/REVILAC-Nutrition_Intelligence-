'use strict';
const assert=require('assert');
const api=require('./fooddata-central-client.js');
assert.strictEqual(api.version,'1.0.0');
const sample={foodNutrients:[
 {nutrientName:'Energy',unitName:'KCAL',value:120},
 {nutrientName:'Protein',unitName:'G',value:3.2},
 {nutrientName:'Carbohydrate, by difference',unitName:'G',value:22},
 {nutrientName:'Sugars, Total',unitName:'G',value:8},
 {nutrientName:'Fiber, total dietary',unitName:'G',value:4},
 {nutrientName:'Total lipid (fat)',unitName:'G',value:1.1},
 {nutrientName:'Fatty acids, total saturated',unitName:'G',value:0.2},
 {nutrientName:'Sodium, Na',unitName:'MG',value:6},
 {nutrientName:'Potassium, K',unitName:'MG',value:220},
 {nutrientName:'Calcium, Ca',unitName:'MG',value:18},
 {nutrientName:'Iron, Fe',unitName:'MG',value:0.3},
 {nutrientName:'Magnesium, Mg',unitName:'MG',value:20},
 {nutrientName:'Zinc, Zn',unitName:'MG',value:0.4},
 {nutrientName:'Vitamin C, total ascorbic acid',unitName:'MG',value:32},
 {nutrientName:'Vitamin D (D2 + D3)',unitName:'UG',value:0.7},
 {nutrientName:'Vitamin B-12',unitName:'UG',value:0.1},
 {nutrientName:'Folate, DFE',unitName:'UG',value:25},
 {nutrientName:'Unknown nutrient',unitName:'IU',value:999}
]};
const mapped=api.mapFoodNutrients(sample);
for(const k of ['energy','protein','carbs','sugars','fiber','fat','satfat','sodium','potassium','calcium','iron','magnesium','zinc','vitc','vitd','b12','folate']) assert(Number.isFinite(mapped[k]),`maps ${k}`);
assert.strictEqual(mapped.energy,120);assert.strictEqual(mapped.protein,3.2);assert.strictEqual(mapped.vitd,0.7);assert.strictEqual(mapped.b12,0.1);assert(!('unknown' in mapped),'unknown nutrient is ignored');
assert(Math.abs(api.convertValue(4.184,'kJ','energy')-1)<1e-10,'kJ converts to kcal');
assert.strictEqual(api.convertValue(1,'g','iron'),1000,'g converts to mg for mineral field');
assert.strictEqual(api.convertValue(1,'mg','vitd'),1000,'mg converts to micrograms for vitamin field');
assert.strictEqual(api.convertValue(1,'IU','vitd'),null,'unsupported unit remains unknown');
assert.strictEqual(api.mapFoodNutrients({foodNutrients:[]}) && Object.keys(api.mapFoodNutrients({foodNutrients:[]})).length,0,'missing data remains missing, not zero');
console.log('PASS FoodData Central nutrient-name mapping');
console.log('PASS unit conversion and unknown-unit safety');
console.log('PASS missing nutrient values remain absent, not fabricated');
