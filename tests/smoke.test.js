import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { webcrypto } from "node:crypto";
const read=(name)=>fs.readFileSync(new URL("../"+name,import.meta.url),"utf8");
const html=read("index.html"),js=read("script.js"),css=read("styles.css"),jokesSource=read("jokes.js");
const dataContext={window:{}};vm.runInNewContext(jokesSource,dataContext);const jokes=dataContext.window.JESTBOX_JOKES;
test("njsscan excludes only the literal joke-data bundle, which is parsed as JSON and rendered as text",()=>{
 const source=read("jokes.js");
 const prefix="window.JESTBOX_JOKES=";
 assert.ok(source.startsWith(prefix),"joke bundle must remain a single global data assignment");
 const payload=source.slice(prefix.length).trim();
 assert.ok(payload.endsWith(";"),"joke bundle must end as a single data assignment");
 const parsed=JSON.parse(payload.slice(0,-1));
 assert.deepEqual(Object.keys(parsed).sort(),[...locales].sort());
 assert.ok(js.includes('$("#joke-heading").textContent=current[1]'),"joke text must be rendered as text, not HTML");
 const config=read(".njsscan");
 const ignored=config.split("ignore-filenames:")[1]?.split("\n  ignore-paths:")[0]?.trim();
 assert.equal(ignored,"- jokes.js","jokes.js must be the only ignored filename");
 assert.equal(config.includes("ignore-rules:"),false,"no njsscan rules may be disabled");
});
const locales=["en-US","es-PE","ru-RU","es-ES","en-IN","hi-IN","ur-IN","ur-PK"];
const categories=["everyday","work","tech","food","wordplay"];

test("all app script selectors exist in the page",()=>{for(const [,id] of js.matchAll(/\$\("#([a-z0-9-]+)"\)/g))assert.ok(html.includes('id="'+id+'"'),"Missing HTML id "+id)});
test("English is the default locale and all eight requested locale choices are searchable",()=>{assert.match(html,/<html lang="en-US">/);for(const label of ["American English","Peruvian Spanish","Russian","Spanish","Indian English","Indian Hindi","Indian Urdu","Pakistani Urdu"])assert.ok(js.includes(label),label);for(const code of locales)assert.ok(js.includes('"'+code+'"')||js.includes('["'+code+'"'))});
test("all locales retain their regional joke baselines while en-IN expansion grows independently",()=>{assert.deepEqual(Object.keys(jokes).sort(),[...locales].sort());for(const locale of locales){assert.equal(jokes[locale].length,locale==="en-IN"?1100:100,locale);const counts=Object.fromEntries(categories.map(c=>[c,jokes[locale].filter(j=>j[0]===c).length]));for(const c of categories)assert.equal(counts[c],20,locale+" "+c);const normalized=jokes[locale].map(j=>j[1].normalize("NFKC").toLocaleLowerCase().replace(/\s+/g," ").trim());assert.equal(new Set(normalized).size,normalized.length,locale+" duplicate joke") }});
test("three-line joke records retain their authored line breaks in the UI",()=>{assert.match(css,/\.joke-content h2\{[^}]*white-space:\s*pre-line/)});
test("every joke uses the writing system of its selected language locale",()=>{for(const locale of locales){const text=jokes[locale].map(j=>j[1]).join(" ");if(locale==="ru-RU"){assert.match(text,/\p{Script=Cyrillic}/u);assert.doesNotMatch(text,/\p{Script=Latin}/u,"Latin-script intrusion in "+locale)}else if(locale==="hi-IN"){assert.match(text,/\p{Script=Devanagari}/u);assert.doesNotMatch(text,/\p{Script=Latin}/u,"Latin-script intrusion in "+locale)}else if(locale==="ur-IN"||locale==="ur-PK"){assert.match(text,/\p{Script=Arabic}/u,"Arabic-script Urdu required in "+locale);assert.doesNotMatch(text,/\p{Script=Latin}|\p{Script=Cyrillic}|\p{Script=Devanagari}/u,"foreign-script intrusion in "+locale)}else{assert.doesNotMatch(text,/\p{Script=Cyrillic}|\p{Script=Devanagari}/u,"non-Latin script intrusion in "+locale)}}});
test("ten named themes define full-page color tokens",()=>{const start=js.indexOf("const THEMES=")+"const THEMES=".length;const end=js.indexOf("];",start)+1;const palettes=Function("return "+js.slice(start,end))();assert.equal(palettes.length,10);for(const token of ["--page","--surface","--text","--muted","--border","--accent"])assert.ok(css.includes(token))});
test("only the Settings gear remains in the header and the theme picker lives below Accessibility",()=>{const header=html.match(/<header class="site-header">([\s\S]*?)<\/header>/)?.[1]||"";assert.match(header,/id="settings-button"/);assert.doesNotMatch(header,/theme-button|theme-dialog/);assert.match(html,/id="settings-title">Settings &amp; Superpowers/);assert.ok(html.indexOf('id="accessibility-title"')<html.indexOf('id="themes-title"'));assert.match(html,/id="theme-options"/);assert.match(html,/id="large-text"[^>]*type="range"[^>]*min="50"[^>]*max="200"[^>]*step="5"[^>]*value="85"/);for(const id of ["high-contrast","reduce-motion","underline-links","larger-targets","line-spacing","focus-outline"])assert.ok(html.includes('id="'+id+'"'))});
test("language and category controls are searchable combobox inputs",()=>{assert.match(html,/id="locale-search" role="combobox"[^>]*aria-controls="locale-options"/);assert.match(html,/id="category-search" role="combobox"[^>]*aria-controls="category-options"/);for(const name of ["All Jokes","Everyday Life","Work & Study","Tech & Internet","Food & Drink"])assert.ok(js.includes(name));for(const country of ["United States of America","Republic of Peru","Russian Federation","Kingdom of Spain","Republic of India"])assert.ok(js.includes(country))});
test("share opens a dialog and invokes the native device share API without the old unavailable message",()=>{assert.match(html,/<dialog id="share-dialog"/);assert.match(html,/id="native-share-button"/);assert.match(js,/navigator\.share\(/);assert.match(js,/window\.JestBoxNativeShare/);assert.match(html,/share-bridge\.bundle\.js/);assert.match(read("package.json"),/"@capacitor\/share": "8\.0\.3"/);assert.doesNotMatch(js,/Sharing isn't available/);assert.match(js,/shareError/)});
test("launch screen is skippable and auto-dismisses after five seconds",()=>{assert.match(html,/id="launch-screen"/);assert.match(js,/timer=setTimeout\(dismiss,5000\)/);assert.match(js,/addEventListener\("click",dismiss\)/)});
test("footer exposes privacy and an Accessibility Statement button plus the bundled WCAG mark",()=>{assert.match(html,/id="privacy-link"/);assert.match(html,/id="accessibility-link" class="footer-button"/);assert.match(html,/assets\/wcag22aa-blue\.svg/)});
test("app remains local-first and stores only display/accessibility preferences locally",()=>{assert.doesNotMatch(js,/\b(?:fetch|XMLHttpRequest|WebSocket|EventSource|sendBeacon)\s*\(/);assert.match(js,/localStorage\.getItem\(PREF_KEY/);assert.match(js,/localStorage\.setItem\(PREF_KEY/);assert.match(js,/const PREF_KEY="jestbox\.preferences\.v1"/);assert.doesNotMatch(js,/\b(?:sessionStorage|indexedDB)\b|document\.cookie/)});
test("keyboard focus, reduced motion, forced-colors, and text resizing remain implemented",()=>{assert.match(html,/class="skip-link"/);assert.match(css,/:focus-visible/);assert.match(css,/@media\s*\(prefers-reduced-motion:\s*reduce\)/);assert.match(css,/@media\s*\(forced-colors:\s*active\)/);assert.match(css,/body\.large-text/)});
test("the original JestBox jester gift-box artwork is the canonical web brand",()=>{assert.ok(html.includes("assets/JestBox-Original.png"));assert.ok(fs.existsSync(new URL("../assets/JestBox-Original.png",import.meta.url)));assert.doesNotMatch(html,/assets\/jestbox-mark\.svg/)});

test("every theme meets WCAG AA text contrast and 3:1 component-boundary contrast",()=>{
 const start=js.indexOf("const THEMES=")+"const THEMES=".length;const end=js.indexOf("];",start)+1;assert.ok(start>0&&end>start,"Theme palette source must be present");
 const box={};vm.runInNewContext("globalThis.palettes="+js.slice(start,end),box);
 const lum=h=>{const v=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return .2126*v[0]+.7152*v[1]+.0722*v[2]};
 const ratio=(a,b)=>{const [x,y]=[lum(a),lum(b)].sort((m,n)=>n-m);return (x+.05)/(y+.05)};
 assert.equal(box.palettes.length,10);
 box.palettes.forEach((p,i)=>{const ink=i===8?"#ffffff":i===9?"#000000":"#061a1b";for(const surface of [p[1],p[2]]){assert.ok(ratio(p[3],surface)>=4.5,p[0]+" primary text");assert.ok(ratio(p[4],surface)>=4.5,p[0]+" muted text");assert.ok(ratio(p[5],surface)>=3,p[0]+" boundaries");assert.ok(ratio(p[6],surface)>=4.5,p[0]+" accent");}assert.ok(ratio(ink,p[6])>=4.5,p[0]+" button text")});
});
test("eight locale policy and accessibility documents include the required contact routes",()=>{
 for(const locale of ["es-PE","es-ES","en-IN","hi-IN","ur-IN","ur-PK"]){const policy=read("PRIVACY-POLICY."+locale+".md");const statement=read("ACCESSIBILITY-STATEMENT."+locale+".md");assert.match(policy,/cyber\.litigation\.advisor@gmail\.com/);assert.match(policy,/ertapanjatakia@yandex\.com/);assert.match(policy,/tapan_ditu_17\.20@outlook\.com/);assert.match(statement,/cyber\.litigation\.advisor@gmail\.com/);assert.equal(statement.split("assets/wcag22aa-blue.svg").length-1,2);}
});

test("launch screen uses a prominent brand and short sentence-per-line localised copy",()=>{assert.match(html,/class="launch-brand">JESTBOX/);assert.match(html,/id="launch-tagline" class="launch-tagline"/);assert.match(css,/white-space:pre-line/);assert.match(css,/orientation:landscape/);assert.match(js,/\["#launch-tagline","launch"\]/);for(const phrase of ["Pocket-sized local laughs.","Risas locales de bolsillo.","Местный юмор всегда под рукой.","जेब में देसी हँसी।"])assert.ok(js.includes(phrase),phrase)});
test("theme names are localised for all eight selected locales",()=>{assert.match(js,/const THEME_NAMES=/);for(const locale of ["en-US","es-PE","ru-RU","es-ES","en-IN","hi-IN","ur-IN","ur-PK"])assert.ok(js.includes('"'+locale+'":['),"Missing theme translations: "+locale)});

test("no exact joke text is reused across different locale collections",()=>{
 const owner=new Map();
 for(const locale of locales){
  for(const [,text] of jokes[locale]){
   const normalized=text.normalize("NFKC").toLocaleLowerCase().replace(/\\s+/g," ").trim();
   assert.ok(!owner.has(normalized),`Cross-locale duplicate between ${owner.get(normalized)} and ${locale}: ${text}`);
   owner.set(normalized,locale);
  }
 }
});

test("dashboard omits launch-only marketing copy and starts with the two primary panels",()=>{const main=html.match(/<main id="main"[\s\S]*?<\/main>/)?.[0]||"";assert.doesNotMatch(html,/<section class="hero compact"/);assert.match(main,/class="locale-picker panel"[\s\S]*class="joke-panel panel"/);assert.doesNotMatch(main,/Pocket-sized local laughs|Local laughs, zero signal drama/)});
test("locale and category menus sort alphabetically and open the complete option list on tap",()=>{assert.match(js,/localeDisplay\(a\.code\)\.localeCompare\(localeDisplay\(b\.code\),locale/);assert.match(js,/addEventListener\("click",\(\)=>renderLocaleOptions/);assert.match(js,/addEventListener\("click",\(\)=>renderCategoryOptions/)});
test("accessibility preferences persist locally with a readable default text scale",()=>{assert.match(js,/textScale:85/);assert.match(html,/min="50" max="200"/);assert.match(js,/savePrefs\(\)/);assert.match(js,/applyPrefs\(\)/);assert.match(css,/body\.underline-links/);assert.match(css,/body\.larger-targets/);assert.match(css,/body\.more-line-spacing/);assert.match(css,/body\.enhanced-focus/)});
test("all eight privacy policies and accessibility statements are localized",()=>{for(const locale of locales){const suffix=locale==="en-US"?"":"."+locale;const policy=read("PRIVACY-POLICY"+suffix+".md");const statement=read("ACCESSIBILITY-STATEMENT"+suffix+".md");assert.match(policy,/19|noviembre|November|ноября|नवंबर/);assert.match(statement,/WCAG 2\.2/);assert.equal(statement.split("assets/wcag22aa-blue.svg").length-1,2);assert.match(statement,/cyber\.litigation\.advisor@gmail\.com/)}});
test("generated legal pages use a translated document title for every locale",()=>{const build=read("scripts/prepare-web.mjs");for(const title of ["Política de privacidad","Declaración de accesibilidad","Политика конфиденциальности","Заявление о доступности","गोपनीयता नीति","सुगम्यता वक्तव्य","رازداری کی پالیسی","رسائی پذیری کا بیان","رسائی کی سہولتوں کا بیان"])assert.ok(build.includes(title),title);assert.match(build,/localizedTitle/)});

test("Android launcher branding is generated from the canonical original PNG",()=>{const branding=read("scripts/prepare-android-branding.mjs");assert.ok(branding.includes("assets/JestBox-Original.png"));assert.ok(branding.includes("drawable-nodpi/jestbox_icon.png"));assert.ok(branding.includes("jestbox_launcher"));const workflow=read(".github/workflows/android-debug.yml");assert.ok(workflow.includes("node scripts/prepare-android-branding.mjs"))});

test("launch screen brand and tagline typography are increased by 50 percent, including landscape",()=>{assert.ok(css.includes(".launch-card img{width:clamp(156px,28.5vh,228px);max-height:39vh}"));assert.ok(css.includes(".launch-brand{font-size:clamp(3.6rem,14.4vw,5.4rem)}"));assert.ok(css.includes(".launch-tagline{font-size:clamp(1.476rem,4.32vw,1.8rem);line-height:1.4}"));assert.ok(css.includes(".launch-card img{width:clamp(96px,27vh,156px);max-height:36vh}"));assert.ok(css.includes(".launch-brand{font-size:clamp(2.52rem,9vh,3.6rem)}"));assert.ok(css.includes(".launch-tagline{font-size:clamp(1.296rem,4.14vh,1.62rem);line-height:1.3}"));});
test("launch screen English copy uses six separate requested lines",()=>{const start=js.indexOf("const UI=")+"const UI=".length;const end=js.indexOf("\n};",start)+2;const dictionaries=Function("return "+js.slice(start,end))();assert.deepEqual(dictionaries["en-US"].launch.split("\n"),["Pocket-sized local laughs.","Offline","No Account Registration.","No Tracking.","No Data Snooping.","Your phone's funny sidekick."]);});

test("all eight interface dictionaries expose the same complete set of non-empty translations",()=>{
 const start=js.indexOf("const UI=")+ "const UI=".length;
 const end=js.indexOf("\n};",start)+2;
 const dictionaries=Function("return "+js.slice(start,end))();
 const expected=Object.keys(dictionaries["en-US"]).sort();
 assert.deepEqual(Object.keys(dictionaries).sort(),[...locales].sort());
 for(const locale of locales){
  assert.deepEqual(Object.keys(dictionaries[locale]).sort(),expected,locale+" UI key coverage");
  for(const [key,value] of Object.entries(dictionaries[locale]))if(typeof value==="string")assert.ok(value.trim(),locale+" empty "+key);
  assert.equal(dictionaries[locale].cats.length,locale==="en-IN"?16:6,locale+" category labels");
  if(locale==="en-IN")assert.deepEqual(dictionaries[locale].cats,["All Jokes","Characters","City","Culture Contrasts","Everyday Life","Food & Drink","Marriage","Middle-class Life","Relatives","Romance","Satire","Tech & Internet","Trickster Stories","Uncle / Cheesy","Work & Study","Wordplay"],"en-IN category labels are alphabetically ordered");
 }
});
test("locale and country names are translated in every searchable locale selector",()=>{
 const localeStart=js.indexOf("const LOCALE_LABELS=")+"const LOCALE_LABELS=".length;
 const localeEnd=js.indexOf("\n};",localeStart)+2;
 const countryStart=js.indexOf("const COUNTRY_LABELS=")+"const COUNTRY_LABELS=".length;
 const countryEnd=js.indexOf("\n};",countryStart)+2;
 const labels=Function("return "+js.slice(localeStart,localeEnd))();
 const countries=Function("return "+js.slice(countryStart,countryEnd))();
 for(const locale of locales){
  assert.deepEqual(Object.keys(labels[locale]).sort(),[...locales].sort(),locale+" language labels");
  assert.deepEqual(Object.keys(countries[locale]).sort(),[...locales].sort(),locale+" country labels");
  for(const code of locales){assert.ok(labels[locale][code]);assert.ok(countries[locale][code]);}
 }
 assert.ok(js.includes("COUNTRY_LABELS[locale][item.code]"));
});
test("accessibility names, fallback copy, and category heading follow the selected locale",()=>{
 for(const key of ["skipMain","close","loading","wcagTitle","wcagAlt","description"])assert.match(js,new RegExp(key+":"));
 assert.ok(js.includes('$("#category-label").textContent=x.category;'));
 assert.ok(js.includes('$("#wcag-mark-image").alt=x.wcagAlt;'));
 assert.ok(js.includes('$("#wcag-mark-link").title=x.wcagTitle;'));assert.ok(js.includes('meta[name="description"]'));
 assert.match(html,/id="wcag-mark-link"/);
 assert.match(html,/id="wcag-mark-image"/);
 assert.doesNotMatch(html,/certified giggle/i);
});

test("Urdu locales are independent, searchable, fully localized, and rendered right-to-left",()=>{
 const localeStart=js.indexOf("const LOCALES="),localeEnd=js.indexOf("];",localeStart)+2;
 const list=Function("return "+js.slice(js.indexOf("[",localeStart),localeEnd))();
 assert.deepEqual(list.filter(x=>x.code.startsWith("ur-")).map(x=>x.code),["ur-IN","ur-PK"]);
 assert.match(js,/document\.documentElement\.dir=\(locale==="ur-IN"\|\|locale==="ur-PK"\)\?"rtl":"ltr"/);
 assert.match(css,/html\[dir="rtl"\]/);
 for(const locale of ["ur-IN","ur-PK"]){
  assert.equal(jokes[locale].length,100);
  assert.equal(jokes[locale].filter(j=>j[0]==="wordplay").length,20);
  assert.match(jokes[locale].map(j=>j[1]).join(" "),/\p{Script=Arabic}/u);
  assert.match(read("PRIVACY-POLICY."+locale+".md"),/cyber\.litigation\.advisor@gmail\.com/);
  assert.match(read("ACCESSIBILITY-STATEMENT."+locale+".md"),/WCAG 2\.2/);
 }
 const build=read("scripts/prepare-web.mjs");
 assert.match(build,/locale\.startsWith\("ur-"\) \? "rtl" : "ltr"/);
});


test("random joke selection uses unbiased Web Crypto rather than Math.random",()=>{
 const helper=read("random-index.js");
 const randomIndex=vm.runInNewContext(helper+"; JestBoxRandomIndex",{crypto:webcrypto,Uint32Array,Number,Math,RangeError});
 for(let i=0;i<2000;i++){const value=randomIndex(17);assert.ok(Number.isInteger(value)&&value>=0&&value<17)}
 assert.equal(randomIndex(1),0);
 assert.throws(()=>randomIndex(0),RangeError);
 assert.throws(()=>randomIndex(0x100000001),RangeError);
 assert.match(html,/random-index\.js/);
 assert.match(js,/const secureRandomIndex=globalThis\.JestBoxRandomIndex/);
 assert.match(js,/secureRandomIndex\(a\.length\)/);
});

test("Accessibility Statement and Third-party Notices buttons share a responsive footer row",()=>{assert.match(html,/id="accessibility-link" class="footer-button"/);assert.match(html,/id="third-party-notices-link" class="footer-button"/);assert.ok(css.includes(".site-footer{grid-template-columns:repeat(2,minmax(0,1fr));column-gap:.5rem}"));assert.ok(css.includes(".site-footer>.footer-button{width:100%;min-width:0;padding-inline:.4rem}"));assert.ok(css.includes(".site-footer>#privacy-link,.site-footer>#wcag-mark-link,.site-footer>#footer-line{grid-column:1/-1}"));});

test("first launch detects a supported device locale, falls back safely, and preserves the user's choice",()=>{
 const source=read("locale-detection.js");
 const context={};
 vm.runInNewContext(source,context);
 const detect=context.JestBoxLocaleDetection.detectPreferredLocale;
 const supported=["en-US","es-PE","ru-RU","es-ES","en-IN","hi-IN","ur-IN","ur-PK"];
 assert.equal(detect(["es-PE","en-US"],supported),"es-PE");
 assert.equal(detect(["fr-FR","hi-IN"],supported),"hi-IN");
 assert.equal(detect(["en-GB"],supported),"en-US");
 assert.equal(detect(["es-MX"],supported),"es-ES");
 assert.equal(detect(["ur"],supported),"ur-PK");
 assert.equal(detect(["fr-FR","zh-CN"],supported),"en-US");
 assert.equal(detect("ru-RU",supported),"ru-RU");
 assert.match(html,/locale-detection\.js"><\/script><script src="script\.js"/);
 assert.match(js,/detectPreferredLocale\(systemLocalePreferences,LOCALES\.map/);
 assert.match(js,/isSupportedLocale\(prefs\.locale\)\?prefs\.locale/);
 assert.match(js,/prefs\.locale=code;savePrefs\(\)/);
 assert.doesNotMatch(source,/geolocation|permissions|fetch\(|XMLHttpRequest|localStorage/i);
 const prepare=read("scripts/prepare-web.mjs");
 assert.match(prepare,/requiredFiles = \[[^\]]*"locale-detection\.js"/);
});
