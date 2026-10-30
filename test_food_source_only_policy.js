const fs=require('node:fs');
const assert=require('node:assert/strict');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
const start=html.indexOf('const QFS_LOCALIZED={');
const end=html.indexOf('function buildQuickFoodSwap()',start);
assert.ok(start>=0&&end>start,'quick food swap localization block must exist');
const block=html.slice(start,end);
for(const phrase of ['Poha/upma with a suitable protein side','Khichdi with vegetables','Roti with pulse curry and vegetables','Roasted chana with a fruit','Dal or another cooked pulse with rice/roti']){
 assert.ok(!block.includes(phrase),'active localized food options must not contain dish/combo suggestion: '+phrase);
}
for(const phrase of ['Lentils / dal','Seasonal vegetables','Seasonal whole fruit','Lentils, chickpeas or beans','Soybeans or tofu']){
 assert.ok(block.includes(phrase),'individual food source should be localized: '+phrase);
}
assert.ok(html.includes('does not prescribe dishes or recipes'),'main guidance should explicitly preserve patient choice');
console.log('PASS: active food-source suggestions avoid recipes/dishes and localize individual food items.');
