import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
const read=(name)=>fs.readFileSync(new URL("../"+name,import.meta.url),"utf8");
const html=read("index.html"),js=read("script.js"),css=read("styles.css"),jokesSource=read("jokes.js");
const dataContext={window:{}};vm.runInNewContext(jokesSource,dataContext);const jokes=dataContext.window.JESTBOX_JOKES;
const locales=["en-US","es-PE","ru-RU","es-ES","en-IN","hi-IN"];
const categories=["everyday","work","tech","food","wordplay"];

test("all app script selectors exist in the page",()=>{for(const [,id] of js.matchAll(/\$\("#([a-z0-9-]+)"\)/g))assert.ok(html.includes('id="'+id+'"'),"Missing HTML id "+id)});
test("English is the default locale and all six requested locale choices are searchable",()=>{assert.match(html,/<html lang="en-US">/);for(const label of ["American English (en-US)","Peruvian Spanish (es-PE)","Russian (ru-RU)","Spanish (es-ES)","Indian English (en-IN)","Indian Hindi (hi-IN)"])assert.ok(js.includes(label),label);for(const code of locales)assert.ok(js.includes('"'+code+'"')||js.includes('["'+code+'"'))});
test("every locale has 100 regionally authored jokes with twenty per category in the current batch",()=>{assert.deepEqual(Object.keys(jokes).sort(),[...locales].sort());for(const locale of locales){assert.equal(jokes[locale].length,100,locale);const counts=Object.fromEntries(categories.map(c=>[c,jokes[locale].filter(j=>j[0]===c).length]));for(const c of categories)assert.equal(counts[c],20,locale+" "+c);const normalized=jokes[locale].map(j=>j[1].normalize("NFKC").toLocaleLowerCase().replace(/\s+/g," ").trim());assert.equal(new Set(normalized).size,normalized.length,locale+" duplicate joke") }});
test("every joke uses the writing system of its selected language locale",()=>{for(const locale of locales){const text=jokes[locale].map(j=>j[1]).join(" ");if(locale==="ru-RU"){assert.match(text,/\p{Script=Cyrillic}/u);assert.doesNotMatch(text,/\p{Script=Latin}/u,"Latin-script intrusion in "+locale)}else if(locale==="hi-IN"){assert.match(text,/\p{Script=Devanagari}/u);assert.doesNotMatch(text,/\p{Script=Latin}/u,"Latin-script intrusion in "+locale)}else{assert.doesNotMatch(text,/\p{Script=Cyrillic}|\p{Script=Devanagari}/u,"non-Latin script intrusion in "+locale)}}});
test("ten named themes define full-page color tokens",()=>{const start=js.indexOf("const THEMES=")+"const THEMES=".length;const end=js.indexOf("];",start)+1;const palettes=Function("return "+js.slice(start,end))();assert.equal(palettes.length,10);for(const token of ["--page","--surface","--text","--muted","--border","--accent"])assert.ok(css.includes(token))});
test("only the Settings gear remains in the header and the theme picker lives below Accessibility",()=>{const header=html.match(/<header class="site-header">([\s\S]*?)<\/header>/)?.[1]||"";assert.match(header,/id="settings-button"/);assert.doesNotMatch(header,/theme-button|theme-dialog/);assert.match(html,/id="settings-title">Settings &amp; Superpowers/);assert.ok(html.indexOf('id="accessibility-title"')<html.indexOf('id="themes-title"'));assert.match(html,/id="theme-options"/);assert.match(html,/id="large-text" type="range" min="50" max="200" step="5" value="85"/);for(const id of ["high-contrast","reduce-motion","underline-links","larger-targets","line-spacing","focus-outline"])assert.ok(html.includes('id="'+id+'"'))});
test("language and category controls are searchable combobox inputs",()=>{assert.match(html,/id="locale-search" role="combobox"[^>]*aria-controls="locale-options"/);assert.match(html,/id="category-search" role="combobox"[^>]*aria-controls="category-options"/);for(const name of ["All Jokes","Everyday Life","Work & Study","Tech & Internet","Food & Drink"])assert.ok(js.includes(name));for(const country of ["United States of America","Republic of Peru","Russian Federation","Kingdom of Spain","Republic of India"])assert.ok(js.includes(country))});
test("share opens a dialog and invokes the native device share API without the old unavailable message",()=>{assert.match(html,/<dialog id="share-dialog"/);assert.match(html,/id="native-share-button"/);assert.match(js,/navigator\.share\(/);assert.match(js,/window\.JestBoxNativeShare/);assert.match(html,/share-bridge\.bundle\.js/);assert.match(read("package.json"),/"@capacitor\/share": "8\.0\.3"/);assert.doesNotMatch(js,/Sharing isn't available/);assert.match(js,/shareError/)});
test("launch screen is skippable and auto-dismisses after five seconds",()=>{assert.match(html,/id="launch-screen"/);assert.match(js,/timer=setTimeout\(dismiss,5000\)/);assert.match(js,/addEventListener\("click",dismiss\)/)});
test("footer exposes privacy and an Accessibility Statement button plus the bundled WCAG mark",()=>{assert.match(html,/id="privacy-link"/);assert.match(html,/id="accessibility-link" class="footer-button"/);assert.match(html,/assets\/wcag22aa-blue\.svg/)});
test("app remains local-first and stores only display/accessibility preferences locally",()=>{assert.doesNotMatch(js,/\b(?:fetch|XMLHttpRequest|WebSocket|EventSource|sendBeacon)\s*\(/);assert.match(js,/localStorage\.getItem\(PREF_KEY/);assert.match(js,/localStorage\.setItem\(PREF_KEY/);assert.match(js,/const PREF_KEY="jestbox\.preferences\.v1"/);assert.doesNotMatch(js,/\b(?:sessionStorage|indexedDB)\b|document\.cookie/)});
test("keyboard focus, reduced motion, forced-colors, and text resizing remain implemented",()=>{assert.match(html,/class="skip-link"/);assert.match(css,/:focus-visible/);assert.match(css,/@media\s*\(prefers-reduced-motion:\s*reduce\)/);assert.match(css,/@media\s*\(forced-colors:\s*active\)/);assert.match(css,/body\.large-text/)});
test("the splash and app use the same locally bundled JestBox mascot",()=>{assert.match(html,/launch-card[\s\S]*assets\/jestbox-mark\.svg/);assert.match(html,/id="home-link"[\s\S]*assets\/jestbox-mark\.svg/);assert.match(read("assets/jestbox-mark.svg"),/<svg/)});

test("every theme meets WCAG AA text contrast and 3:1 component-boundary contrast",()=>{
 const start=js.indexOf("const THEMES=")+"const THEMES=".length;const end=js.indexOf("];",start)+1;assert.ok(start>0&&end>start,"Theme palette source must be present");
 const box={};vm.runInNewContext("globalThis.palettes="+js.slice(start,end),box);
 const lum=h=>{const v=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return .2126*v[0]+.7152*v[1]+.0722*v[2]};
 const ratio=(a,b)=>{const [x,y]=[lum(a),lum(b)].sort((m,n)=>n-m);return (x+.05)/(y+.05)};
 assert.equal(box.palettes.length,10);
 box.palettes.forEach((p,i)=>{const ink=i===8?"#ffffff":i===9?"#000000":"#061a1b";for(const surface of [p[1],p[2]]){assert.ok(ratio(p[3],surface)>=4.5,p[0]+" primary text");assert.ok(ratio(p[4],surface)>=4.5,p[0]+" muted text");assert.ok(ratio(p[5],surface)>=3,p[0]+" boundaries");assert.ok(ratio(p[6],surface)>=4.5,p[0]+" accent");}assert.ok(ratio(ink,p[6])>=4.5,p[0]+" button text")});
});
test("six locale policy and accessibility documents include the required contact routes",()=>{
 for(const locale of ["es-PE","es-ES","en-IN","hi-IN"]){const policy=read("PRIVACY-POLICY."+locale+".md");const statement=read("ACCESSIBILITY-STATEMENT."+locale+".md");assert.match(policy,/cyber\.litigation\.advisor@gmail\.com/);assert.match(policy,/ertapanjatakia@yandex\.com/);assert.match(policy,/tapan_ditu_17\.20@outlook\.com/);assert.match(statement,/cyber\.litigation\.advisor@gmail\.com/);assert.equal(statement.split("assets/wcag22aa-blue.svg").length-1,2);}
});

test("launch screen uses a prominent brand and short sentence-per-line localised copy",()=>{assert.match(html,/class="launch-brand">JESTBOX/);assert.match(html,/id="launch-tagline" class="launch-tagline"/);assert.match(css,/white-space:pre-line/);assert.match(css,/orientation:landscape/);assert.match(js,/\["#launch-tagline","launch"\]/);for(const phrase of ["Local laughs. Offline fun.","Risas de aquí. Sin conexión.","Местный юмор. Без интернета.","देसी हँसी। ऑफ़लाइन मज़ा।"])assert.ok(js.includes(phrase),phrase)});
test("theme names are localised for all six selected locales",()=>{assert.match(js,/const THEME_NAMES=/);for(const locale of ["en-US","es-PE","ru-RU","es-ES","en-IN","hi-IN"])assert.ok(js.includes('"'+locale+'":['),"Missing theme translations: "+locale)});

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

test("dashboard omits launch-only marketing copy and starts with the two primary panels",()=>{assert.doesNotMatch(html,/<section class="hero compact"/);assert.match(html,/class="locale-picker panel"[\s\S]*class="joke-panel panel"/);assert.doesNotMatch(html,/Pocket-sized local laughs|Local laughs, zero signal drama/)});
test("locale and category menus sort alphabetically and open the complete option list on tap",()=>{assert.match(js,/label\.localeCompare\(b\.label,locale/);assert.match(js,/addEventListener\("click",\(\)=>renderLocaleOptions/);assert.match(js,/addEventListener\("click",\(\)=>renderCategoryOptions/)});
test("accessibility preferences persist locally with a readable default text scale",()=>{assert.match(js,/textScale:85/);assert.match(html,/min="50" max="200"/);assert.match(js,/savePrefs\(\)/);assert.match(js,/applyPrefs\(\)/);assert.match(css,/body\.underline-links/);assert.match(css,/body\.larger-targets/);assert.match(css,/body\.more-line-spacing/);assert.match(css,/body\.enhanced-focus/)});
test("all six privacy policies and accessibility statements are localized",()=>{for(const locale of locales){const suffix=locale==="en-US"?"":"."+locale;const policy=read("PRIVACY-POLICY"+suffix+".md");const statement=read("ACCESSIBILITY-STATEMENT"+suffix+".md");assert.match(policy,/19|noviembre|November|ноября|नवंबर/);assert.match(statement,/WCAG 2\.2/);assert.equal(statement.split("assets/wcag22aa-blue.svg").length-1,2);assert.match(statement,/cyber\.litigation\.advisor@gmail\.com/)}});