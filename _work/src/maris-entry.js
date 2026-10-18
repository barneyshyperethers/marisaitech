// Functional summaries only; source: MARIS.AI guide, 04.10.2026, sections 2.1–2.4.
// All artwork is illustrative. No deployment, live data or certification is implied.
const MARIS_PLUGINS = [
  {
    id:'soar', name:'Maritime SOAR Content Pack', role:'ODPOWIEDŹ / PLAYBOOKI',
    lines:['Maritime SOAR','Content Pack'], image:'grafiki/plugin-soar.png',
    alt:'Ilustracja centrum cyberbezpieczeństwa floty: analitycy, schemat obsługi incydentu i kontenerowiec w porcie.',
    summary:'Pakiet morskich playbooków automatyzacji i parserów zdarzeń dla platformy SIEM/SOAR, którą klient już posiada. Łączy kontekst żeglugi z uporządkowaną obsługą incydentów.',
    features:[
      'Koreluje anomalie kursu, prędkości i przerwy transmisji AIS z danymi OSINT oraz kontekstem inspekcji PSC.',
      'Porządkuje eskalację zdarzeń GMDSS Distress/Urgency, powiadomienia i archiwizację komunikacji.',
      'Obsługuje scenariusze podejrzenia spoofingu AIS oraz raportowania incydentów środowiskowych MARPOL.'
    ],
    location:'Działa w środowisku SIEM/SOAR klienta, np. Cortex XSOAR, Microsoft Sentinel lub Splunk ES. Korzysta ze standardów CACAO 2.0, OCSF i STIX 2.1.',
    pages:'s. 3, rozdz. 2.1',
    paths:['M48 9 L80 22 L80 48 C80 67 65 80 48 88 C31 80 16 67 16 48 L16 22 Z','M31 48 L43 60 L66 35','M28 14 L28 4 M68 14 L68 4 M5 38 L16 38 M80 38 L91 38']
  },
  {
    id:'fusion', name:'SDR-AIS Fusion Edge Appliance', role:'DETEKCJA / RADIO + DANE',
    lines:['SDR-AIS Fusion','Edge Appliance'], image:'grafiki/plugin-fusion.png',
    alt:'Ilustracja lokalnej stacji obserwacji ruchu morskiego: komputer brzegowy z odbiornikami SDR, anteny VHF, radar i statek.',
    summary:'Urządzenie brzegowe korelujące lokalnie ślady AIS z sygnałami VHF DSC. Pomaga oceniać wiarygodność obrazu sytuacji morskiej w porcie, terminalu lub wariancie pokładowym.',
    features:[
      'Dekoduje AIS i cyfrowe wywołania selektywne DSC z kanału 70.',
      'Wskazuje sprzeczne pozycje, podejrzenia podszywania się pod tożsamość AIS i ciszę nadawczą typu dark ship.',
      'Przekazuje alerty i uzasadnienie do kolejnych warstw przez MQTT/REST oraz STIX 2.1; może współpracować z PNT-Trust.'
    ],
    location:'Przetwarzanie odbywa się na brzegu sieci. To monitor integralności danych, a nie źródło nawigacyjne dla ECDIS. PNT-Trust jest warstwą wspólną, nie osobnym piątym pluginem.',
    pages:'s. 4, rozdz. 2.2; PNT-Trust: s. 7',
    paths:['M48 9 A39 39 0 1 0 87 48','M48 24 A24 24 0 1 0 72 48','M48 38 A10 10 0 1 0 58 48','M48 48 L79 17','M48 9 L48 18 M9 48 L18 48 M48 78 L48 87','M23 65 L30 60 L35 68 Z M61 35 L67 31 L72 39 Z']
  },
  {
    id:'triage', name:'LLM-SOC Maritime Alert Triage API', role:'KLASYFIKACJA / PRIORYTET',
    lines:['LLM-SOC Maritime','Alert Triage API'], image:'grafiki/plugin-triage.png',
    alt:'Ilustracja stanowiska analityka morskiego SOC: ślady jednostek, lista alertów i wyróżniona karta wymagająca oceny.',
    summary:'Mikroserwis REST do wstępnej oceny alertów morskich. Przyjmuje np. anomalię AIS, wywołanie DSC lub zdarzenie IDS i zwraca klasyfikację z poziomem pewności oraz priorytetem eskalacji.',
    features:[
      'Łączy surowy alert z morskim kontekstem domenowym i porządkuje jego znaczenie dla operatora.',
      'Przekazuje rekomendowane działanie i ustrukturyzowany wynik w standardzie STIX 2.1.',
      'Współpracuje z SDR-AIS jako odbiorca sygnału detekcji i zasila dalszą automatyzację SOAR.'
    ],
    location:'Może działać w Docker/Kubernetes, w chmurze lub on-premise u klienta, zależnie od wymogów dotyczących danych. Wizualizacja nie przedstawia rzeczywistego wyniku modelu ani gwarantowanej jakości klasyfikacji.',
    pages:'s. 4–5, rozdz. 2.3',
    paths:['M23 13 L61 13 L76 28 L76 83 L23 83 Z','M61 13 L61 29 L76 29','M34 41 L64 41 M34 53 L53 53 M34 65 L48 65','M66 52 L86 82 L46 82 Z','M66 62 L66 70 M66 75 L66 77','M10 26 L10 53 M4 32 L16 32 M4 45 L16 45']
  },
  {
    id:'voice', name:'Maritime Voice Intelligence Layer', role:'GŁOS / WSPARCIE OPERATORA',
    lines:['Maritime Voice','Intelligence Layer'], image:'grafiki/plugin-voice.png',
    alt:'Ilustracja mostka statku: radiotelefon VHF, mikrofon w dłoni oficera i ekran z przebiegiem dźwięku.',
    summary:'Warstwa rozpoznawania i syntezy mowy dla łączności VHF i GMDSS. Łączy transkrypcję, wsparcie operatora AI Assist oraz archiwizację komunikacji.',
    features:[
      'Zamienia komunikację głosową w transkrypt i ustrukturyzowane zdarzenie dla wspólnego łańcucha analizy.',
      'Wspiera pracę operatora oraz przegląd i archiwizację rozmów.',
      'Rozróżnia rozmówców funkcjonalnie jako Speaker_1, Speaker_2; nie oznacza to ustalania ich tożsamości.'
    ],
    location:'Koncepcja obejmuje przetwarzanie audio na edge i wariant on-premise/air-gapped. Integracja OEM jest przewidziana w cyklu projektowym urządzeń; ilustracja nie oznacza gotowego ani certyfikowanego wyposażenia.',
    pages:'s. 5–6, rozdz. 2.4; przepływ danych: s. 2',
    paths:['M36 17 C36 1 60 1 60 17 L60 48 C60 64 36 64 36 48 Z','M25 42 L25 48 C25 79 71 79 71 48 L71 42','M48 72 L48 88 M34 88 L62 88','M9 28 L9 58 M18 35 L18 51 M78 35 L78 51 M87 28 L87 58']
  }
];

const sceneHooks = {pause:null,resume:null};
function pluginIconMarkup(plugin) {
  return `<svg viewBox="0 0 96 96" fill="none" stroke="currentColor" stroke-width="3.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${plugin.paths.map(path=>`<path d="${path}"/>`).join('')}</svg>`;
}
const pluginButtons=new Map();
const pluginDialog=document.getElementById('plugin-dialog');
let pluginOpener=null;
function openPlugin(id,opener) {
  const plugin=MARIS_PLUGINS.find(item=>item.id===id);
  if(!plugin || pluginDialog.open)return;
  pluginOpener=opener || pluginButtons.get(id);
  document.getElementById('plugin-role').textContent=plugin.role;
  document.getElementById('plugin-title').textContent=plugin.name;
  document.getElementById('plugin-dialog-icon').innerHTML=pluginIconMarkup(plugin);
  const copy=document.getElementById('plugin-copy');copy.replaceChildren();
  const summary=document.createElement('p');summary.textContent=plugin.summary;copy.append(summary);
  const heading=document.createElement('h3');heading.textContent='Co robi?';copy.append(heading);
  const list=document.createElement('ul');plugin.features.forEach(feature=>{const li=document.createElement('li');li.textContent=feature;list.append(li);});copy.append(list);
  const location=document.createElement('p');location.textContent=plugin.location;copy.append(location);
  const image=document.getElementById('plugin-image');image.src=plugin.image;image.alt=plugin.alt;
  document.getElementById('plugin-source').textContent=`Opis skrócony na podstawie: „MARIS.AI — Przewodnik po pluginach i sub-systemach”, 04.10.2026, ${plugin.pages}. Wizualizacja koncepcyjna.`;
  sceneHooks.pause?.();pluginDialog.showModal();pluginDialog.scrollTop=0;
}
MARIS_PLUGINS.forEach(plugin=>{
  const button=document.createElement('button');button.className='led-plugin';button.type='button';
  button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-controls','plugin-dialog');button.dataset.pluginId=plugin.id;
  const icon=document.createElement('span');icon.className='plugin-icon';icon.setAttribute('aria-hidden','true');icon.innerHTML=pluginIconMarkup(plugin);
  const role=document.createElement('small');role.textContent=plugin.role;
  const name=document.createElement('strong');name.textContent=plugin.name;
  button.append(icon,role,name);button.addEventListener('click',()=>openPlugin(plugin.id,button));
  document.getElementById('plugin-access').append(button);pluginButtons.set(plugin.id,button);
});
document.getElementById('plugin-close').addEventListener('click',()=>pluginDialog.close());
pluginDialog.addEventListener('click',event=>{
  if(event.target!==pluginDialog)return;
  const rect=pluginDialog.getBoundingClientRect();
  if(event.clientX<rect.left || event.clientX>rect.right || event.clientY<rect.top || event.clientY>rect.bottom)pluginDialog.close();
});
pluginDialog.addEventListener('close',()=>{sceneHooks.resume?.();pluginOpener?.focus({preventScroll:true});});
document.getElementById('plugin-type-toggle').addEventListener('click',event=>{
  const readable=pluginDialog.classList.toggle('solid-type');
  event.currentTarget.setAttribute('aria-pressed',String(readable));
  event.currentTarget.textContent=readable?'Włącz czcionkę LED':'Czytelniejszy tekst';
});



// MARIS AI — single application entry point. Three.js version pinned to the source demo.
// Dependencies are bundled locally into the delivered classic script.
async function bootMaris() {
const [THREE, {OrbitControls}] = await Promise.all([
  import('three'),
  import('three/examples/jsm/controls/OrbitControls.js')
]);

const systems=[
{name:'AIS / DSC Fusion',pos:[-1.4,3.4,-0.3],desc:'Radio identity and distress communication intelligence.',what:'Correlates AIS vessel broadcasts with DSC messages and other available navigation context using local edge processing.',threat:'Spoofed identities, conflicting positions, replayed messages and suspicious radio silence.',agent:'A fusion agent flags inconsistencies and routes explainable findings to the onboard security console.'},
{name:'Radar & Navigation',pos:[-0.6,4.35,-0.15],desc:'Integrity checks for bridge navigation data.',what:'Cross-checks radar and navigation inputs with reported vessel position and motion.',threat:'GNSS anomalies, contradictory tracks, unexpected route changes and sensor inconsistencies.',agent:'A navigation agent compares independent signals and escalates high-confidence discrepancies.'},
{name:'Satellite Communications',pos:[-2.7,3.4,0.55],desc:'Monitoring the vessel’s external connectivity.',what:'Observes approved satellite and shore communication paths, connection metadata and policy compliance.',threat:'Unexpected destinations, abnormal traffic patterns and suspicious remote access attempts.',agent:'A communications agent assesses traffic patterns and suggests containment actions under operator control.'},
{name:'Bridge IT & OT',pos:[-2.8,2.55,-1.25],desc:'Protection for critical bridge and operational systems.',what:'Maps relevant onboard networks and monitors events from authorized IT and OT integrations.',threat:'Lateral movement, unauthorized configuration changes and unusual device communications.',agent:'A defensive agent correlates events across systems while respecting operational safety boundaries.'},
{name:'Cargo & Containers',pos:[2.1,2.05,0.95],desc:'Security visibility around cargo operations.',what:'Combines available cargo monitoring, access logs and equipment telemetry in one view.',threat:'Unexpected access, tampering indicators and unusual environmental or equipment readings.',agent:'A cargo agent highlights anomalies and supplies contextual incident summaries.'},
{name:'Engine Room / OT',pos:[-4.4,1.3,0.85],desc:'Operational technology monitoring below deck.',what:'Observes permitted propulsion, machinery and industrial network telemetry without directly controlling equipment.',threat:'Unusual control commands, device faults, configuration drift and unauthorized connections.',agent:'An OT agent prioritizes alerts based on operational context and human-approved response policies.'},
{name:'MARIS AI Core',pos:[0.2,2.7,-0.1],desc:'Modular correlation, orchestration and agent governance.',what:'Brings findings from specialized agents into a common incident view with audit trails and configurable access controls.',threat:'Multi-system attack chains, correlated anomalies and risky agent actions.',agent:'A supervisory agent validates agent permissions, coordinates analysis and keeps response decisions auditable.'}
];
const root=document.getElementById('scene'),scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x071a2b,.012);const camera=new THREE.PerspectiveCamera(42,1,.1,500);camera.position.set(19,14,22);const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;root.appendChild(renderer.domElement);const controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,3.6,0);controls.enableDamping=true;controls.minDistance=10;controls.maxDistance=160;controls.maxPolarAngle=Math.PI*.49;controls.autoRotate=false;controls.autoRotateSpeed=.5;scene.add(new THREE.HemisphereLight(0x92d9ff,0x062035,2.1));const light=new THREE.DirectionalLight(0xb7f6ff,3.4);light.position.set(-8,15,9);scene.add(light);const fill=new THREE.PointLight(0x19d9e6,45,25);fill.position.set(4,7,-5);scene.add(fill);
const ship=new THREE.Group();scene.add(ship);const mat=(color,metalness=.3,roughness=.5)=>new THREE.MeshStandardMaterial({color,metalness,roughness});const hull=mat(0x24435b,.7,.35),edge=mat(0x9bc9d7,.65,.32),deck=mat(0x24495b),white=mat(0xbad5dc,.25,.65),dark=mat(0x0c2535,.5,.3),glass=mat(0x2f8aa3,.55,.18),cyan=new THREE.MeshBasicMaterial({color:0x42f4e7});function box(w,h,d,x,y,z,m,parent=ship){const a=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);a.position.set(x,y,z);parent.add(a);return a}function cylinder(r1,r2,h,x,y,z,m,parent=ship){const a=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,12),m);a.position.set(x,y,z);parent.add(a);return a}
// Ship's bow is +X. Shaped hull via custom extrusion.
const shape=new THREE.Shape();[[-7,-1.45],[4.8,-1.45],[7.2,-.7],[8,0],[7.2,.7],[4.8,1.45],[-7,1.45],[-7.5,.95],[-7.5,-.95]].forEach(([x,y],i)=>i?shape.lineTo(x,y):shape.moveTo(x,y));shape.closePath();const geo=new THREE.ExtrudeGeometry(shape,{depth:1.35,bevelEnabled:true,bevelThickness:.2,bevelSize:.18,bevelSegments:2});geo.rotateX(-Math.PI/2);const hullMesh=new THREE.Mesh(geo,hull);hullMesh.position.y=.7;ship.add(hullMesh);box(13.3,.15,2.65,-.05,2.1,0,deck);box(4.4,.25,2.7,-5.05,2.35,0,white);box(3.5,.95,2.4,-5.25,2.95,0,white);box(2.7,.65,2.2,-5.4,3.75,0,white);box(3,.34,2.3,-5.25,4.1,0,dark);for(let i=0;i<7;i++){box(.32,.24,.06,-6.4+i*.4,3.7,-1.23,glass);box(.32,.24,.06,-6.4+i*.4,3.7,1.23,glass)}cylinder(.08,.08,2,-5.7,5.1,0,edge);cylinder(.7,.7,.06,-5.7,5.9,0,cyan);cylinder(.05,.05,1.4,-4.5,4.9,.8,edge);cylinder(.38,.38,.28,-4.5,5.55,.8,white);for(let row=0;row<2;row++)for(let i=0;i<6;i++){const x=-2.1+i*1.18,z=row? .78:-.78;box(1.07,.76,1.28,x,2.55,z,mat([0x3d7484,0x627b84,0x326276,0x777d77,0x2b6372,0x586f7e][(i+row)%6],.3,.7));box(1.07,.76,1.28,x,3.34,z,mat([0x4d7984,0x436477,0x6d888c,0x2f5d70][(i+row)%4]));}for(let i=0;i<4;i++)box(.025,.06,2.6,-2.1+i*1.18,3.75,0,edge);for(let i=0;i<18;i++){let x=-6.6+i*.75;box(.05,.34,.05,x,2.45,-1.5,edge);box(.05,.34,.05,x,2.45,1.5,edge)}box(13.4,.035,.035,0,2.65,-1.5,edge);box(13.4,.035,.035,0,2.65,1.5,edge);
// sea grid and halo
const water=new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.MeshStandardMaterial({color:0x071f30,transparent:true,opacity:.8,roughness:.25,metalness:.5}));water.rotation.x=-Math.PI/2;water.position.y=-.3;scene.add(water);const grid=new THREE.GridHelper(100,80,0x1d657b,0x14374b);grid.position.y=-.25;grid.material.transparent=true;grid.material.opacity=.23;scene.add(grid);const ring=new THREE.Mesh(new THREE.RingGeometry(10,10.04,128),new THREE.MeshBasicMaterial({color:0x27d3df,transparent:true,opacity:.23,side:THREE.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.y=-.2;scene.add(ring);

// SATELLITE: a real mesh group above the vessel, with clickable surfaces and keyboard access.
const satellite = new THREE.Group();
satellite.position.set(1.5,10.2,-.6);
satellite.rotation.set(.12,-.35,.1);
scene.add(satellite);
const foil = mat(0xd4b669,.72,.3);
const cell = new THREE.MeshStandardMaterial({color:0x123d88,metalness:.5,roughness:.28,emissive:0x07215a,emissiveIntensity:.5});
const satelliteLight = new THREE.MeshBasicMaterial({color:0x8be9ff});
box(1.35,1.1,1.05,0,0,0,foil,satellite);
box(1.46,.1,1.15,0,.6,0,edge,satellite);
box(1.46,.1,1.15,0,-.6,0,edge,satellite);
box(6.6,.07,.09,0,0,0,edge,satellite);
for (const direction of [-1,1]) {
  box(2.25,.09,1.55,direction*2.15,0,0,edge,satellite);
  box(2.15,.1,1.45,direction*2.15,0,0,cell,satellite);
  for (let i=0;i<6;i++) box(.018,.014,1.44,direction*2.15-1.075+i*.43,.061,0,satelliteLight,satellite);
  for (let i=0;i<4;i++) box(2.15,.014,.018,direction*2.15,.061,-.725+i*.483,satelliteLight,satellite);
}
const dish = new THREE.Mesh(new THREE.SphereGeometry(.53,24,12,0,Math.PI*2,0,Math.PI*.38),white);
dish.rotation.x=Math.PI;
dish.position.set(0,-.6,0);
satellite.add(dish);
cylinder(.025,.025,.75,0,-1.02,0,edge,satellite);
const beacon=new THREE.Mesh(new THREE.SphereGeometry(.08,12,8),satelliteLight);
beacon.position.set(0,-1.4,0);satellite.add(beacon);
const signalLine=new THREE.Line(new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(1.5,8.8,-.6),new THREE.Vector3(-5.7,6,0)
]),new THREE.LineDashedMaterial({color:0x69dbff,transparent:true,opacity:.4,dashSize:.2,gapSize:.2}));
signalLine.computeLineDistances();scene.add(signalLine);
const satelliteButton=document.getElementById('satellite-select');
const satelliteDialog=document.getElementById('satellite-dialog');
let resumeRotation=false;
function openSatellite(){
  if(satelliteDialog.open)return;
  resumeRotation=controls.autoRotate;controls.autoRotate=false;updateRotationButton();
  satelliteDialog.showModal();
}
satelliteButton.addEventListener('click',openSatellite);
document.getElementById('satellite-close').addEventListener('click',()=>satelliteDialog.close());
satelliteDialog.addEventListener('click',e=>{if(e.target===satelliteDialog){const b=satelliteDialog.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)satelliteDialog.close();}});
satelliteDialog.addEventListener('close',()=>{controls.autoRotate=resumeRotation;updateRotationButton();satelliteButton.focus({preventScroll:true});});
const satelliteProjection=new THREE.Vector3();
renderer.domElement.setAttribute('aria-label','Interaktywny statek 3D z siedmioma strefami, satelitą PNT-Trust i zieloną ścianą czterech pluginów. Obracaj przeciągnięciem, przybliżaj gestem lub kółkiem. Opisy są też dostępne przyciskami pod sceną.');

// LED WALL: a square in the 3D scene, one hull length behind the vessel.
// “Behind” is scene -Z (the background in the opening view), not the ship's stern.
// Gap is measured from the hull's outer side to the wall's front reference plane.
const hullBounds=new THREE.Box3().setFromObject(hullMesh);
const SHIP_LENGTH=hullBounds.max.x-hullBounds.min.x;
const wall=new THREE.Group();wall.name='MARIS_LED_PLUGIN_WALL';
wall.position.z=hullBounds.min.z-SHIP_LENGTH;
wall.userData={width:SHIP_LENGTH,height:SHIP_LENGTH,gap:SHIP_LENGTH,shipLength:SHIP_LENGTH,pluginCount:MARIS_PLUGINS.length};
scene.add(wall);
const green=new THREE.MeshBasicMaterial({color:0x58ff89,toneMapped:false,fog:false});
const greenHalo=new THREE.MeshBasicMaterial({color:0x1cf36b,transparent:true,opacity:.1,depthWrite:false,blending:THREE.AdditiveBlending,toneMapped:false,fog:false});
const blackPanel=new THREE.MeshBasicMaterial({color:0x020b08,toneMapped:false,fog:false});
box(SHIP_LENGTH,.13,.24,0,SHIP_LENGTH-.065,-.15,green,wall);
box(SHIP_LENGTH,.13,.24,0,.065,-.15,green,wall);
box(.13,SHIP_LENGTH,.24,-SHIP_LENGTH/2+.065,SHIP_LENGTH/2,-.15,green,wall);
box(.13,SHIP_LENGTH,.24,SHIP_LENGTH/2-.065,SHIP_LENGTH/2,-.15,green,wall);
box(SHIP_LENGTH-.17,SHIP_LENGTH-.17,.18,0,SHIP_LENGTH/2,-.2,blackPanel,wall);
// Diffuse frame glow; LED dots are instanced meshes to keep draw calls low.
for(const size of [.22,.35]){
  box(SHIP_LENGTH,size,.08,0,SHIP_LENGTH-.065,-.01,greenHalo,wall);
  box(SHIP_LENGTH,size,.08,0,.065,-.01,greenHalo,wall);
  box(size,SHIP_LENGTH,.08,-SHIP_LENGTH/2+.065,SHIP_LENGTH/2,-.01,greenHalo,wall);
  box(size,SHIP_LENGTH,.08,SHIP_LENGTH/2-.065,SHIP_LENGTH/2,-.01,greenHalo,wall);
}
const ledPositions=[];const ledSteps=60;
for(let i=0;i<=ledSteps;i++){
  const value=(i/ledSteps)*(SHIP_LENGTH-.13)+.065;
  ledPositions.push([-SHIP_LENGTH/2+value,.065,.035],[-SHIP_LENGTH/2+value,SHIP_LENGTH-.065,.035]);
  if(i>0&&i<ledSteps)ledPositions.push([-SHIP_LENGTH/2+.065,value,.035],[SHIP_LENGTH/2-.065,value,.035]);
}
const ledDots=new THREE.InstancedMesh(new THREE.SphereGeometry(.055,6,4),green,ledPositions.length);
const ledHalos=new THREE.InstancedMesh(new THREE.SphereGeometry(.115,6,4),greenHalo,ledPositions.length);
const ledMatrix=new THREE.Matrix4();
ledPositions.forEach((position,index)=>{ledMatrix.makeTranslation(...position);ledDots.setMatrixAt(index,ledMatrix);ledHalos.setMatrixAt(index,ledMatrix);});
wall.add(ledDots,ledHalos);

const pluginTileMeshes=[];
function makeLedCanvas(width=1024,height=860){
  const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;
  return {canvas,ctx:canvas.getContext('2d')};
}
function canvasTexture(canvas){
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
  texture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());return texture;
}
function paintPluginCanvas(plugin,index){
  const {canvas,ctx}=makeLedCanvas();ctx.fillStyle='#020b08';ctx.fillRect(0,0,1024,860);
  ctx.fillStyle='#10432a';
  for(let y=18;y<860;y+=18)for(let x=18;x<1024;x+=18){ctx.beginPath();ctx.arc(x,y,1.8,0,Math.PI*2);ctx.fill();}
  ctx.strokeStyle='#56ff87';ctx.shadowColor='#30ff74';ctx.shadowBlur=13;ctx.lineWidth=3;ctx.strokeRect(12,12,1000,836);
  ctx.font='800 28px Doto, monospace';ctx.fillStyle='#7dffa7';ctx.textAlign='left';ctx.fillText(`0${index+1} / MARIS AI`,55,71);
  ctx.save();ctx.translate(392,130);ctx.scale(2.5,2.5);ctx.strokeStyle='#8affae';ctx.lineWidth=2;ctx.lineCap='round';ctx.lineJoin='round';
  plugin.paths.forEach(path=>ctx.stroke(new Path2D(path)));ctx.restore();
  ctx.textAlign='center';ctx.fillStyle='#acffc5';ctx.font='850 55px Doto, monospace';
  plugin.lines.forEach((line,row)=>ctx.fillText(line,512,482+row*73,925));
  ctx.shadowBlur=3;ctx.font='700 27px Doto, monospace';ctx.fillStyle='#7feb9f';ctx.fillText(plugin.role,512,680,920);
  ctx.font='700 26px monospace';ctx.fillStyle='#64d88c';ctx.fillText('KLIKNIJ / OTWÓRZ OPIS  ↗',512,783,900);
  return canvas;
}
let refreshWallTitle=()=>{};
function addPluginTiles(){
  MARIS_PLUGINS.forEach((plugin,index)=>{
    const texture=canvasTexture(paintPluginCanvas(plugin,index));
    const material=new THREE.MeshBasicMaterial({map:texture,toneMapped:false,fog:false});
    const tile=new THREE.Mesh(new THREE.PlaneGeometry(SHIP_LENGTH*.44,SHIP_LENGTH*.37),material);
    tile.position.set(index%2?SHIP_LENGTH*.235:-SHIP_LENGTH*.235,index<2?SHIP_LENGTH*.70:SHIP_LENGTH*.29,.03);
    tile.name=`MARIS_PLUGIN_${plugin.id}`;tile.userData.pluginId=plugin.id;wall.add(tile);pluginTileMeshes.push(tile);
  });
  const {canvas,ctx}=makeLedCanvas(2048,150);ctx.clearRect(0,0,2048,150);ctx.textAlign='center';ctx.fillStyle='#a5ffbd';ctx.shadowColor='#2aff67';ctx.shadowBlur=9;ctx.font='850 76px Doto, monospace';ctx.fillText('MARIS AI / PLUGINY',1024,105,1950);
  const title=new THREE.Mesh(new THREE.PlaneGeometry(SHIP_LENGTH*.85,SHIP_LENGTH*.065),new THREE.MeshBasicMaterial({map:canvasTexture(canvas),transparent:true,toneMapped:false,fog:false}));
  title.position.set(0,SHIP_LENGTH*.955,.04);wall.add(title);
  refreshWallTitle=()=>{ctx.clearRect(0,0,2048,150);ctx.font='850 76px Doto, monospace';ctx.fillText('MARIS AI / PLUGINY',1024,105,1950);title.material.map.needsUpdate=true;};
}
addPluginTiles();
// Refresh canvas lettering after the local dot matrix font has loaded.
document.fonts?.load('800 28px Doto').then(()=>{
  pluginTileMeshes.forEach((mesh,index)=>{mesh.material.map.image=paintPluginCanvas(MARIS_PLUGINS[index],index);mesh.material.map.needsUpdate=true;});
  refreshWallTitle();
}).catch(()=>{/* Canvas keeps a readable monospace fallback if font loading is blocked. */});

// Fit a box against BOTH horizontal and vertical field of view, including depth.
// Recomputed for narrow screens, rather than reusing the original small-scene camera.
const sceneBounds=new THREE.Box3().setFromObject(ship).union(new THREE.Box3().setFromObject(satellite)).union(new THREE.Box3().setFromObject(wall));
const shipBounds=new THREE.Box3().setFromObject(ship).union(new THREE.Box3().setFromObject(satellite));
const wallBounds=new THREE.Box3().setFromObject(wall);
let viewMode='overview';
function frameBounds(bounds,direction){
  const center=bounds.getCenter(new THREE.Vector3());
  const forward=direction.clone().normalize();
  const right=new THREE.Vector3().crossVectors(new THREE.Vector3(0,1,0),forward).normalize();
  const up=new THREE.Vector3().crossVectors(forward,right).normalize();
  const tangent=Math.tan(THREE.MathUtils.degToRad(camera.fov/2));
  const vertical=tangent*.63,horizontal=tangent*.79*camera.aspect;
  let distance=0;
  for(const x of [bounds.min.x,bounds.max.x])for(const y of [bounds.min.y,bounds.max.y])for(const z of [bounds.min.z,bounds.max.z]){
    const point=new THREE.Vector3(x,y,z).sub(center);
    distance=Math.max(distance,point.dot(forward)+Math.abs(point.dot(up))/vertical,point.dot(forward)+Math.abs(point.dot(right))/horizontal);
  }
  distance=Math.max(12,distance+1.5);
  controls.target.copy(center);camera.position.copy(center).addScaledVector(forward,distance);controls.update();
}
function setView(mode){
  viewMode=mode;controls.autoRotate=false;updateRotationButton();
  if(mode==='wall')frameBounds(wallBounds,new THREE.Vector3(.035,.07,1));
  else if(mode==='ship')frameBounds(shipBounds,new THREE.Vector3(.7,.52,1));
  else frameBounds(sceneBounds,new THREE.Vector3(.25,.24,1));
}
function updateRotationButton(){
  document.getElementById('rotate').textContent='Auto rotate: '+(controls.autoRotate?'ON':'OFF');
  document.getElementById('rotate').classList.toggle('active',controls.autoRotate);
}
document.getElementById('wall-view').addEventListener('click',()=>setView('wall'));
document.getElementById('ship-view').addEventListener('click',()=>setView('ship'));
let pausedRotation=false;
sceneHooks.pause=()=>{pausedRotation=controls.autoRotate;controls.autoRotate=false;updateRotationButton();};
sceneHooks.resume=()=>{controls.autoRotate=pausedRotation;updateRotationButton();};
document.getElementById('scene-status').textContent='Ściana 3D: 4 klikalne pluginy. Tab i Enter otwierają te same opisy w przyciskach poniżej.';
document.documentElement.dataset.wallDimensions=`${SHIP_LENGTH.toFixed(2)} × ${SHIP_LENGTH.toFixed(2)}`;


const markers=[],glows=[];systems.forEach((s,i)=>{const g=new THREE.Group();g.position.set(...s.pos);ship.add(g);const orb=new THREE.Mesh(new THREE.SphereGeometry(.13,18,12),new THREE.MeshBasicMaterial({color:0x52f5ed}));g.add(orb);const glow=new THREE.Mesh(new THREE.SphereGeometry(.27,18,12),new THREE.MeshBasicMaterial({color:0x32e5e3,transparent:true,opacity:.17,depthWrite:false}));g.add(glow);const torus=new THREE.Mesh(new THREE.TorusGeometry(.34,.017,6,32),new THREE.MeshBasicMaterial({color:0x44d9de,transparent:true,opacity:.8}));torus.rotation.x=Math.PI/2;g.add(torus);markers.push({g,orb,glow,torus});});
let selected=0,alertNum=0;const $=id=>document.getElementById(id);function choose(i){selected=i;const s=systems[i];$('index').textContent=String(i+1).padStart(2,'0');$('title').textContent=s.name;$('desc').textContent=s.desc;$('what').textContent=s.what;$('threat').textContent=s.threat;$('agent').textContent=s.agent;$('status').textContent='● Monitoring active · Demonstration';$('status').classList.remove('alerts');document.querySelectorAll('.system').forEach((el,j)=>el.classList.toggle('selected',i===j));}systems.forEach((s,i)=>{const b=document.createElement('button');b.className='system';b.innerHTML=`<span>${String(i+1).padStart(2,'0')} &nbsp; ${s.name}</span><span>↗</span>`;b.onclick=()=>choose(i);$('systems').appendChild(b)});choose(0);
$('reset').onclick=()=>setView('overview');
$('rotate').onclick=()=>{controls.autoRotate=!controls.autoRotate;updateRotationButton();};
$('alert').onclick=()=>{alertNum++;$('alertcount').textContent=String(alertNum).padStart(2,'0');choose((selected+1)%systems.length);$('status').textContent='▲ SIMULATED ANOMALY · Review recommended';$('status').classList.add('alerts');};
const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();
function hitAt(event){
  const rect=renderer.domElement.getBoundingClientRect();
  pointer.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);
  raycaster.setFromCamera(pointer,camera);
  return raycaster.intersectObjects([...pluginTileMeshes,...markers.map(marker=>marker.glow),satellite],true)[0];
}
let down=null;
renderer.domElement.addEventListener('pointerdown',event=>{down={x:event.clientX,y:event.clientY,id:event.pointerId};});
renderer.domElement.addEventListener('pointercancel',()=>{down=null;});
renderer.domElement.addEventListener('pointerup',event=>{
  const start=down;down=null;
  if(!start || event.pointerId!==start.id || Math.hypot(event.clientX-start.x,event.clientY-start.y)>5)return;
  const hit=hitAt(event);if(!hit)return;
  if(hit.object.userData.pluginId){openPlugin(hit.object.userData.pluginId);return;}
  let object=hit.object;while(object){if(object===satellite){openSatellite();return;}object=object.parent;}
  const index=markers.findIndex(marker=>marker.glow===hit.object);if(index>=0)choose(index);
});
renderer.domElement.addEventListener('pointermove',event=>{renderer.domElement.style.cursor=hitAt(event)?'pointer':'grab';});
const clock=new THREE.Clock();function resize(){const w=root.clientWidth,h=root.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();setView(viewMode)}new ResizeObserver(resize).observe(root);resize();function animate(){requestAnimationFrame(animate);const t=clock.getElapsedTime();markers.forEach((m,i)=>{const p=i===selected?1.25:1;m.glow.scale.setScalar(p*(1+.2*Math.sin(t*2+i)));m.torus.scale.setScalar(p*(1+.1*Math.sin(t*1.6+i)));m.orb.material.color.setHex(i===selected?0xffffff:0x52f5ed)});controls.update();satelliteProjection.copy(satellite.position).add(new THREE.Vector3(0,1.45,0)).project(camera);satelliteButton.style.left=((satelliteProjection.x*.5+.5)*root.clientWidth)+'px';satelliteButton.style.top=((-satelliteProjection.y*.5+.5)*root.clientHeight)+'px';satelliteButton.style.visibility=Math.abs(satelliteProjection.x)<.92 && Math.abs(satelliteProjection.y)<.86 && satelliteProjection.z<1?'visible':'hidden';renderer.render(scene,camera)}animate();
document.getElementById('satellite-access').addEventListener('click',openSatellite);
document.getElementById('rotate').textContent='Auto rotate: '+(controls.autoRotate?'ON':'OFF');
document.getElementById('rotate').classList.toggle('active',controls.autoRotate);
document.documentElement.dataset.sceneReady='true';
}
bootMaris().catch(error=>{
  console.error('MARIS 3D initialization failed:',error);
  document.getElementById('scene').innerHTML='<div class="scene-error"><strong>Nie udało się uruchomić sceny 3D.</strong><p>Biblioteki 3D są dołączone do paczki. Sprawdź obsługę WebGL 2 i akcelerację sprzętową w przeglądarce, a następnie odśwież stronę.</p><button class="btn" id="reload-scene">Spróbuj ponownie</button></div>';
  document.getElementById('reload-scene').onclick=()=>location.reload();
  document.getElementById('scene-status').textContent='Scena 3D jest niedostępna. Cztery opisy pluginów poniżej nadal działają.';
  for(const id of ['reset','rotate','wall-view','ship-view','alert'])document.getElementById(id).disabled=true;
  const dialog=document.getElementById('satellite-dialog');
  document.getElementById('satellite-access').onclick=()=>dialog.showModal();
  document.getElementById('satellite-close').onclick=()=>dialog.close();
});
