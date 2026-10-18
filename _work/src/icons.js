export const icons={
 wave:['M4 24 C10 2 14 2 20 24 S30 46 36 24 S44 2 48 24'],
 frequency:['M4 36 H44 M8 32 V20 M14 32 V12 M20 32 V5 M26 32 V16 M32 32 V24 M38 32 V10 M44 32 V18'],
 antenna:['M24 13 V43 M15 43 L24 22 L33 43 M12 12 A17 17 0 0 0 12 31 M36 12 A17 17 0 0 1 36 31 M6 6 A26 26 0 0 0 6 36 M42 6 A26 26 0 0 1 42 36','M22 13 A2 2 0 1 0 26 13 A2 2 0 1 0 22 13'],
 channel:['M9 4 H39 V44 H9 Z M14 10 H34 V25 H14 Z M15 33 H22 M28 33 H33 M15 39 H22 M28 39 H33'],
 arrows:['M4 16 H42 L34 8 M42 16 L34 24 M44 34 H6 L14 26 M6 34 L14 42'],
 radar:['M24 3 A21 21 0 1 0 45 24 M24 11 A13 13 0 1 0 37 24 M24 19 A5 5 0 1 0 29 24 M24 24 L41 7 M6 24 H10 M24 38 V42','M12 30 L15 26 L18 30 Z'],
 speaker:['M6 18 H15 L26 8 V40 L15 30 H6 Z M33 16 Q42 24 33 32 M38 9 Q52 24 38 39'],
 mic:['M18 10 A6 6 0 0 1 30 10 V26 A6 6 0 0 1 18 26 Z M12 23 V26 A12 12 0 0 0 36 26 V23 M24 38 V44 M17 44 H31'],
 shield:['M24 3 L42 10 V25 Q40 38 24 45 Q8 38 6 25 V10 Z M15 24 L22 31 L34 17'],
 chip:['M12 12 H36 V36 H12 Z M18 18 H30 V30 H18 Z M18 4 V12 M30 4 V12 M18 36 V44 M30 36 V44 M4 18 H12 M4 30 H12 M36 18 H44 M36 30 H44'],
 identity:['M5 9 H43 V39 H5 Z M17 15 A5 5 0 1 0 17 25 A5 5 0 1 0 17 15 M9 33 Q17 23 25 33 M30 17 H37 M30 24 H37 M30 31 H37'],
 network:['M9 9 L39 9 L24 39 Z M9 9 L24 22 L39 9 M24 22 V39','M5 5 H13 V13 H5 Z M35 5 H43 V13 H35 Z M20 35 H28 V43 H20 Z'],
 document:['M10 4 H30 L39 13 V44 H10 Z M30 4 V14 H39 M17 22 H32 M17 29 H32 M17 36 H28'],
 chart:['M7 4 V41 H44 M11 34 L21 21 L28 28 L41 11 M33 11 H41 V19'],
 timer:['M18 3 H30 M24 3 V9 M37 12 L41 8 M24 10 A17 17 0 1 0 24 44 A17 17 0 1 0 24 10 M24 17 V27 L32 32'],
 people:['M17 8 A6 6 0 1 0 17 20 A6 6 0 1 0 17 8 M5 40 V32 Q17 20 29 32 V40 M34 9 A6 6 0 0 1 34 21 M34 28 Q43 29 43 36 V40'],
 ship:['M4 28 L24 22 L44 28 L38 40 H10 Z M12 25 V14 H36 V25 M20 14 V7 H28 V14 M24 1 V7 M4 45 Q9 41 14 45 T24 45 T34 45 T44 45'],
 warning:['M24 4 L45 42 H3 Z M24 16 V29 M24 35 V36'],
 filter:['M4 5 H44 L29 24 V40 L19 44 V24 Z'],
 samples:['M4 38 H44 M8 38 V27 H16 V12 H24 V18 H32 V6 H40 V30 H44'],
 replay:['M39 15 A17 17 0 1 0 41 30 M39 5 V15 H29 M21 16 L31 24 L21 32 Z'],
 headset:['M6 25 V22 A18 18 0 0 1 42 22 V34 H34 V23 H42 M6 23 H14 V34 H6 Z M42 34 Q42 43 27 43 H23'],
 eye:['M3 24 Q24 1 45 24 Q24 47 3 24 Z M24 16 A8 8 0 1 0 24 32 A8 8 0 1 0 24 16'],
 lock:['M10 21 H38 V44 H10 Z M16 21 V12 A8 8 0 0 1 32 12 V21 M24 30 V36']
};
export function svgIcon(key){return `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${(icons[key]||icons.wave).map(d=>`<path d="${d}"/>`).join('')}</svg>`;}
export function paintIcon(ctx,key,x,y,size){ctx.save();ctx.translate(x,y);ctx.scale(size/48,size/48);ctx.lineWidth=2;ctx.lineCap='round';ctx.lineJoin='round';for(const d of icons[key]||icons.wave)ctx.stroke(new Path2D(d));ctx.restore();}
export const topicGroups=[
 {name:'Podstawy radia i częstotliwości',short:'Radio i częstotliwości',image:'plugin-fusion.png',alt:'Antena, radar i odbiorniki przy nadbrzeżnym stanowisku obserwacji statków.'},
 {name:'Łączność morska i procedury',short:'Łączność morska',image:'plugin-voice.png',alt:'Morski radiotelefon VHF na mostku statku.'},
 {name:'Sprzęt i tor radiowy',short:'Sprzęt radiowy',image:'plugin-fusion.png',alt:'Odbiorniki radiowe i komputer brzegowy w stacji przybrzeżnej.'},
 {name:'Analiza mowy i sztuczna inteligencja',short:'Mowa i AI',image:'plugin-triage.png',alt:'Stanowisko analityka interpretującego sygnały i alerty morskie.'},
 {name:'Parametry jakości, opóźnienie i wdrożenie',short:'Jakość i wdrożenie',image:'plugin-soar.png',alt:'Operatorzy morskiego centrum bezpieczeństwa i statek w porcie.'}
];
const termIcons=['wave','frequency','frequency','frequency','antenna','channel','channel','channel','arrows','arrows','frequency','wave','wave','wave','frequency','antenna','antenna','chart','wave','wave','chart','wave','warning','ship','channel','warning','warning','warning','warning','radar','identity','identity','radar','ship','channel','headset','warning','replay','warning','chip','chip','chip','antenna','chip','samples','samples','samples','wave','wave','filter','radar','mic','mic','document','mic','chart','chart','chart','identity','identity','network','network','frequency','frequency','wave','wave','speaker','speaker','shield','shield','shield','identity','antenna','network','network','network','network','network','network','frequency','frequency','timer','chip','timer','chart','chart','warning','warning','shield','people','people','network','eye','chip','chip','chip','document','document'];
export function termVisual(term){const index=Number(term.id.slice(5))-1;const group=topicGroups.find(g=>g.name===term.category)||topicGroups[0];let image=group.image;let alt=group.alt;if(index>=51&&index<=68){image='plugin-voice.png';alt='Radiotelefon i ekran analizy dźwięku na mostku statku.';}if([29,32,50,72,82,95].includes(index)){image='plugin-fusion.png';alt=topicGroups[2].alt;}return {icon:termIcons[index]||'wave',group,image,alt};}
