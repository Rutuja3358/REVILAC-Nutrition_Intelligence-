/* Safe nutrient-name/unit mapper for USDA FoodData Central search results.
 * Values are only mapped when the nutrient identity and units are recognized.
 * Caller must verify food form and per-100 g basis before using the result.
 */
(function(root){'use strict';
const nutrientFields={
 energy:['energy'],protein:['protein'],carbs:['carbohydrate by difference','carbohydrate'],sugars:['sugars total','total sugars','sugars'],fiber:['fiber total dietary','dietary fiber','dietary fibre'],fat:['total lipid fat','total fat','lipid'],satfat:['fatty acids total saturated','saturated fat'],sodium:['sodium'],potassium:['potassium'],calcium:['calcium'],iron:['iron'],magnesium:['magnesium'],zinc:['zinc'],vitc:['vitamin c total ascorbic acid','vitamin c'],vitd:['vitamin d d2 d3','vitamin d'],b12:['vitamin b 12','vitamin b12'],folate:['folate total','folate dfe','folate']
};
function normalizeName(value){return String(value||'').toLowerCase().replace(/[µμ]/g,'u').replace(/[^a-z0-9]+/g,' ').trim()}
function normalizeUnit(value){return String(value||'').toLowerCase().replace(/[µμ]/g,'u').replace(/[^a-z0-9]+/g,'').trim()}
function convertValue(value,unit,key){if(!Number.isFinite(Number(value)))return null;value=Number(value);const u=normalizeUnit(unit);if(key==='energy'){if(['kcal','kilocalorie','kilocalories'].includes(u))return value;if(['kj','kilojoule','kilojoules'].includes(u))return value/4.184;return null}
 const expected=['protein','carbs','sugars','fiber','fat','satfat'].includes(key)?'g':['vitd','b12','folate'].includes(key)?'ug':'mg';
 if(expected==='g'){if(['g','gram','grams'].includes(u))return value;if(['mg','milligram','milligrams'].includes(u))return value/1000;return null}
 if(expected==='mg'){if(['mg','milligram','milligrams'].includes(u))return value;if(['ug','mcg','microgram','micrograms'].includes(u))return value/1000;if(['g','gram','grams'].includes(u))return value*1000;return null}
 if(expected==='ug'){if(['ug','mcg','microgram','micrograms'].includes(u))return value;if(['mg','milligram','milligrams'].includes(u))return value*1000;return null}
 return null;
}
function mapFoodNutrients(food){const values={};const list=Array.isArray(food&&food.foodNutrients)?food.foodNutrients:[];for(const [key,names] of Object.entries(nutrientFields)){let chosen=null;for(const n of list){const name=normalizeName(n.nutrientName||n.name);if(!names.some(alias=>name===normalizeName(alias)||name.startsWith(normalizeName(alias)+' ')))continue;const val=convertValue(n.value,n.unitName||n.unit,key);if(val!==null){chosen=val;break}}if(chosen!==null)values[key]=chosen}return values}
const api={version:'1.0.0',normalizeName,normalizeUnit,convertValue,mapFoodNutrients};root.REVILAC_FDC_CLIENT=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
