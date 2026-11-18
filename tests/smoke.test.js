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
test("English is the default locale and all six requested locale choices are searchable",()=>{assert.match(html,/<html lang="en-US">/);for(const label of ["American English (en-US)","Peruvian Spanish (es-PE)","Russian Russian (ru-RU)","Spanish Spanish (es-ES)","Indian English (en-IN)","Indian Hindi (hi-IN)"])assert.ok(js.includes(label),label);for(const code of locales)assert.ok(js.includes('"'+code+'"')||js.includes('["'+code+'"'))});
test("every locale has 20 regionally authored jokes with four per category in the starter batch",()=>{assert.deepEqual(Object.keys(jokes).sort(),[...locales].sort());for(const locale of locales){assert.equal(jokes[locale].length,20,locale);const counts=Object.fromEntries(categories.map(c=>[c,jokes[locale].filter(j=>j[0]===c).length]));for(const c of categories)assert.equal(counts[c],4,locale+" "+c);const normalized=jokes[locale].map(j=>j[1].normalize("NFKC").toLocaleLowerCase().replace(/\s+/g," ").trim());assert.equal(new Set(normalized).size,normalized.length,locale+" duplicate joke") }});
test("ten named themes define full-page color tokens",()=>{const start=js.indexOf("const THEMES=")+"const THEMES=".length;const end=js.indexOf("];",start)+1;const palettes=Function("return "+js.slice(start,end))();assert.equal(palettes.length,10);for(const token of ["--page","--surface","--text","--muted","--border","--accent"])assert.ok(css.includes(token))});
test("theme and settings controls are available in the persistent top header",()=>{assert.match(html,/<header class="site-header">[\s\S]*id="theme-button"[\s\S]*id="settings-button"/);assert.match(html,/id="large-text"/);assert.match(html,/id="high-contrast"/);assert.match(html,/id="reduce-motion"/)});
test("language and category controls are searchable combobox inputs",()=>{assert.match(html,/id="locale-search" role="combobox"[^>]*aria-controls="locale-options"/);assert.match(html,/id="category-search" role="combobox"[^>]*aria-controls="category-options"/);for(const name of ["All Jokes","Everyday Life","Work & Study","Tech & Internet","Food & Drink"])assert.ok(js.includes(name));for(const country of ["United States of America","Republic of Peru","Russian Federation","Kingdom of Spain","Republic of India"])assert.ok(js.includes(country))});
test("share opens a dialog and invokes the native device share API without the old unavailable message",()=>{assert.match(html,/<dialog id="share-dialog"/);assert.match(html,/id="native-share-button"/);assert.match(js,/navigator\.share\(/);assert.match(js,/window\.JestBoxNativeShare/);assert.match(html,/share-bridge\.bundle\.js/);assert.match(read("package.json"),/"@capacitor\/share": "8\.0\.3"/);assert.doesNotMatch(js,/Sharing isn't available/);assert.match(js,/shareError/)});
test("launch screen is skippable and auto-dismisses after five seconds",()=>{assert.match(html,/id="launch-screen"/);assert.match(js,/timer=setTimeout\(dismiss,5000\)/);assert.match(js,/addEventListener\("click",dismiss\)/)});
test("footer exposes privacy and accessibility links and a locally bundled WCAG mark",()=>{assert.match(html,/id="privacy-link"/);assert.match(html,/id="accessibility-link"/);assert.match(html,/assets\/wcag22aa-blue\.svg/)});
test("app remains local-first and does not use network or persistent browser storage",()=>{assert.doesNotMatch(js,/\b(?:fetch|XMLHttpRequest|WebSocket|EventSource|sendBeacon)\s*\(/);assert.doesNotMatch(js,/\b(?:localStorage|sessionStorage|indexedDB)\b|document\.cookie/)});
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

test("the same regionally localised privacy-aware tagline appears on launch and home",()=>{assert.match(js,/\["#headline","launch"\]/);assert.match(js,/\["#launch-tagline","launch"\]/);for(const phrase of ["Pocket-sized local laughs","Risas locales de bolsillo","Местный юмор в кармане","जेब में देसी हँसी"])assert.ok(js.includes(phrase),phrase)});
test("theme names are localised for all six selected locales",()=>{assert.match(js,/const THEME_NAMES=/);for(const locale of ["en-US","es-PE","ru-RU","es-ES","en-IN","hi-IN"])assert.ok(js.includes('"'+locale+'":['),"Missing theme translations: "+locale)});
