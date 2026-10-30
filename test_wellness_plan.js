const fs=require('fs');const assert=require('assert');
const html=fs.readFileSync('index.html','utf8');
const checks=[
 ['daily plan navigation',html.includes('data-page="wellness"')],
 ['short patient onboarding',html.includes('id="wellnessSetup"')],
 ['goal choices',html.includes('id="wellGoal"')],
 ['food preference choices',html.includes('id="wellDiet"')],
 ['activity safety choice',html.includes('value="restricted"')],
 ['health risk guardrail',html.includes('id="wellLimit"')],
 ['multiple choice reminder categories',html.includes('name="wellTask"')],
 ['daily check-in storage',html.includes('wellnessCheckins')],
 ['notification permission flow',html.includes('Notification.requestPermission()')],
 ['notification delivery limitation disclosed',html.includes('cannot guarantee notifications while the app is closed')],
 ['profile extended fields',html.includes('id="profileBirthYear"')&&html.includes('id="profileEmail"')&&html.includes('id="profilePhone"')],
 ['snooze and skip actions',html.includes('data-well-snooze')&&html.includes('data-well-skip')],
 ['reset today action',html.includes('wellnessResetToday')],
 ['no diagnosis claim',html.includes('not a clinical prescription')]
];
for(const [name,ok] of checks){console.log((ok?'PASS':'FAIL')+' '+name);if(!ok)process.exitCode=1}
console.log(`${checks.filter(x=>x[1]).length}/${checks.length} wellness integration checks passed`);
