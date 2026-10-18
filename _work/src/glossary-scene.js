import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import terms from './glossary-data.json';
import {paintIcon,termVisual} from './icons.js';
import {makeHomeStyleScene} from './home-scene-copy.js';

export function createKnowledgeScene(openTerm){
 const {root,scene,camera,renderer,controls,ship,hullMesh,box,satellite}=makeHomeStyleScene(THREE,OrbitControls);
 const $=id=>document.getElementById(id),tooltip=$('term-tooltip');
 renderer.domElement.setAttribute('aria-label','Model statku w stylu strony głównej, w ciepłej żółtawej kolorystyce. Pomarańczowa ściana LED: 14 wierszy, 7 kolumn, 98 kwadratowych kafli.');

 // Wall construction follows the approved home-page wall: panel, bars,
 // diffuse glow and separate instanced LED dots. All tiles are real squares.
 const hullBounds=new THREE.Box3().setFromObject(hullMesh);
 const L=hullBounds.max.x-hullBounds.min.x,W=2*L,COLS=7,ROWS=14;
 const margin=.48,gap=.18,titleBand=1.18;
 const S=(W-2*margin-(COLS-1)*gap)/COLS;
 const H=2*margin+titleBand+ROWS*S+(ROWS-1)*gap;
 const wall=new THREE.Group();wall.name='MARIS_ORANGE_GLOSSARY_WALL';
 wall.position.z=hullBounds.min.z-L;
 // Align the wall center with the midpoint of the stern hull.
 const sternHeight=(hullBounds.min.y+hullBounds.max.y)/2;
 wall.position.y=sternHeight-H/2;
 wall.userData={width:W,height:H,shipLength:L,shipGap:L,columns:COLS,rows:ROWS,tileWidth:S,tileHeight:S,centerHeight:sternHeight};scene.add(wall);
 const orange=new THREE.MeshBasicMaterial({color:0xffa24b,toneMapped:false,fog:false});
 const halo=new THREE.MeshBasicMaterial({color:0xff8b29,transparent:true,opacity:.10,depthWrite:false,blending:THREE.AdditiveBlending,toneMapped:false,fog:false});
 const panel=new THREE.MeshBasicMaterial({color:0x0b0804,toneMapped:false,fog:false});
 box(W,.13,.24,0,H-.065,-.15,orange,wall);
 box(W,.13,.24,0,.065,-.15,orange,wall);
 box(.13,H,.24,-W/2+.065,H/2,-.15,orange,wall);
 box(.13,H,.24,W/2-.065,H/2,-.15,orange,wall);
 box(W-.17,H-.17,.18,0,H/2,-.2,panel,wall);
 for(const size of [.22,.35]){
  box(W,size,.08,0,H-.065,-.01,halo,wall);box(W,size,.08,0,.065,-.01,halo,wall);
  box(size,H,.08,-W/2+.065,H/2,-.01,halo,wall);box(size,H,.08,W/2-.065,H/2,-.01,halo,wall);
 }
 const ledPositions=[],xSteps=Math.ceil(W/.26),ySteps=Math.ceil(H/.26);
 for(let i=0;i<=xSteps;i++){const x=-W/2+.065+(W-.13)*i/xSteps;ledPositions.push([x,.065,.035],[x,H-.065,.035]);}
 for(let i=1;i<ySteps;i++){const y=.065+(H-.13)*i/ySteps;ledPositions.push([-W/2+.065,y,.035],[W/2-.065,y,.035]);}
 const dots=new THREE.InstancedMesh(new THREE.SphereGeometry(.055,6,4),orange,ledPositions.length);
 const halos=new THREE.InstancedMesh(new THREE.SphereGeometry(.115,6,4),halo,ledPositions.length),matrix=new THREE.Matrix4();
 ledPositions.forEach((p,i)=>{matrix.makeTranslation(...p);dots.setMatrixAt(i,matrix);halos.setMatrixAt(i,matrix);});wall.add(dots,halos);

 const tileMeshes=[];
 function texture(canvas){const t=new THREE.CanvasTexture(canvas);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());return t;}
 function paintTile(term,index){
  const canvas=document.createElement('canvas');canvas.width=512;canvas.height=512;const ctx=canvas.getContext('2d');
  ctx.fillStyle='#0b0804';ctx.fillRect(0,0,512,512);ctx.fillStyle='#432714';
  for(let y=9;y<512;y+=11)for(let x=9;x<512;x+=11){ctx.beginPath();ctx.arc(x,y,1.1,0,Math.PI*2);ctx.fill();}
  ctx.strokeStyle='#ffac55';ctx.shadowColor='#ff892a';ctx.shadowBlur=7;ctx.lineWidth=2;ctx.strokeRect(6,6,500,500);
  ctx.font='800 18px Doto, monospace';ctx.fillStyle='#ffc38a';ctx.textAlign='left';ctx.fillText(String(index+1).padStart(2,'0')+' / MARIS AI',27,38);
  ctx.strokeStyle='#ffc890';paintIcon(ctx,termVisual(term).icon,188,72,136);
  let fontSize=48,lines=[];
  for(;fontSize>=26;fontSize-=2){ctx.font='850 '+fontSize+'px Doto, monospace';lines=[];let line='';for(const word of term.name.split(' ')){const next=line?line+' '+word:word;if(line&&ctx.measureText(next).width>452){lines.push(line);line=word;}else line=next;}if(line)lines.push(line);if(lines.length<=3&&lines.every(l=>ctx.measureText(l).width<=452))break;}
  ctx.textAlign='center';ctx.fillStyle='#ffe0b5';ctx.shadowBlur=4;ctx.font='850 '+Math.max(26,fontSize)+'px Doto, monospace';
  const lineHeight=Math.max(26,fontSize)*1.18,startY=328-(lines.length-1)*lineHeight/2;
  lines.forEach((line,row)=>ctx.fillText(line,256,startY+row*lineHeight,455));
  ctx.shadowBlur=2;ctx.font='700 17px Doto, monospace';ctx.fillStyle='#dbad7d';ctx.fillText('MARIS AI / BAZA WIEDZY',256,435,455);
  ctx.shadowBlur=0;ctx.font='700 16px monospace';ctx.fillStyle='#dc974e';ctx.fillText('KLIKNIJ / OTWÓRZ OPIS ↗',256,470,455);
  return canvas;
 }
 terms.forEach((term,index)=>{
  const material=new THREE.MeshBasicMaterial({map:texture(paintTile(term,index)),toneMapped:false,fog:false});
  const tile=new THREE.Mesh(new THREE.PlaneGeometry(S,S),material);
  tile.position.set(-W/2+margin+S/2+(index%COLS)*(S+gap),H-margin-titleBand-S/2-Math.floor(index/COLS)*(S+gap),.03);
  tile.name='MARIS_TERM_'+term.id;tile.userData={id:term.id,index,match:true};wall.add(tile);tileMeshes.push(tile);
 });
 const titleCanvas=document.createElement('canvas');titleCanvas.width=2048;titleCanvas.height=110;const titleContext=titleCanvas.getContext('2d');
 function paintTitle(){titleContext.clearRect(0,0,2048,110);titleContext.textAlign='center';titleContext.fillStyle='#ffce98';titleContext.shadowColor='#ff8b35';titleContext.shadowBlur=8;titleContext.font='850 63px Doto, monospace';titleContext.fillText('MARIS AI / SŁOWNICZEK / 98 POJĘĆ',1024,78,1970);}
 paintTitle();const titleMesh=new THREE.Mesh(new THREE.PlaneGeometry(W*.91,.98),new THREE.MeshBasicMaterial({map:texture(titleCanvas),transparent:true,toneMapped:false,fog:false}));titleMesh.position.set(0,H-.67,.04);wall.add(titleMesh);
 document.fonts?.load('800 28px Doto').then(()=>{tileMeshes.forEach((mesh,i)=>{mesh.material.map.image=paintTile(terms[i],i);mesh.material.map.needsUpdate=true;});paintTitle();titleMesh.material.map.needsUpdate=true;}).catch(()=>{});

 // Home-page monitoring markers, recolored amber, linked to glossary entries.
 const nodes=[{pos:[-1.4,3.4,-.3],index:32},{pos:[-.6,4.35,-.15],index:29},{pos:[-2.7,3.4,.55],index:4},{pos:[-2.8,2.55,-1.25],index:82},{pos:[2.1,2.05,.95],index:97},{pos:[-4.4,1.3,.85],index:39},{pos:[.2,2.7,-.1],index:75}];
 const markers=[];
 nodes.forEach((node,i)=>{const g=new THREE.Group();g.position.set(...node.pos);ship.add(g);const orb=new THREE.Mesh(new THREE.SphereGeometry(.13,18,12),new THREE.MeshBasicMaterial({color:0xffdf77}));g.add(orb);const glow=new THREE.Mesh(new THREE.SphereGeometry(.27,18,12),new THREE.MeshBasicMaterial({color:0xffd855,transparent:true,opacity:.17,depthWrite:false}));glow.userData={index:node.index,node:true};g.add(glow);const torus=new THREE.Mesh(new THREE.TorusGeometry(.34,.017,6,32),new THREE.MeshBasicMaterial({color:0xe7bb5c,transparent:true,opacity:.8}));torus.rotation.x=Math.PI/2;g.add(torus);markers.push({g,orb,glow,torus});});
 const selection=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(S+.06,S+.06)),new THREE.LineBasicMaterial({color:0xffefc4,toneMapped:false,fog:false}));selection.visible=false;wall.add(selection);
 const shipBounds=new THREE.Box3().setFromObject(ship).union(new THREE.Box3().setFromObject(satellite));
 const wallBounds=new THREE.Box3().setFromObject(wall),allBounds=shipBounds.clone().union(wallBounds);
 const sections=[{first:0,last:3,label:'01–28 · Wiersze 1–4'},{first:4,last:7,label:'29–56 · Wiersze 5–8'},{first:8,last:11,label:'57–84 · Wiersze 9–12'},{first:12,last:13,label:'85–98 · Wiersze 13–14'}];
 let viewMode='ship',sectionIndex=0,pausedRotation=false,selectedId=null;
 sections.forEach((s,i)=>{const option=document.createElement('option');option.value=String(i);option.textContent=s.label;$('wall-section').append(option);});
 // Use the same field-of-view fitting as the original home-page scene.
 function frameBounds(bounds,direction){
  const center=bounds.getCenter(new THREE.Vector3()),forward=direction.clone().normalize();
  const right=new THREE.Vector3().crossVectors(new THREE.Vector3(0,1,0),forward).normalize(),up=new THREE.Vector3().crossVectors(forward,right).normalize();
  const tangent=Math.tan(THREE.MathUtils.degToRad(camera.fov/2)),vertical=tangent*.74,horizontal=tangent*.87*camera.aspect;let distance=0;
  for(const x of [bounds.min.x,bounds.max.x])for(const y of [bounds.min.y,bounds.max.y])for(const z of [bounds.min.z,bounds.max.z]){const p=new THREE.Vector3(x,y,z).sub(center);distance=Math.max(distance,p.dot(forward)+Math.abs(p.dot(up))/vertical,p.dot(forward)+Math.abs(p.dot(right))/horizontal);}
  distance=Math.max(9,distance+1.5);controls.target.copy(center);camera.position.copy(center).addScaledVector(forward,distance);controls.update();
 }
 function updateRotate(){$('view-rotate').textContent='Autoobrót: '+(controls.autoRotate?'wł.':'wył.');$('view-rotate').setAttribute('aria-pressed',String(controls.autoRotate));}
 function setView(mode){
  viewMode=mode;controls.autoRotate=false;updateRotate();tooltip.style.display='none';
  if(mode==='ship')frameBounds(shipBounds,new THREE.Vector3(.7,.52,1));
  else if(mode==='wall')frameBounds(wallBounds,new THREE.Vector3(.035,.035,1));
  else if(mode==='section'){
   const s=sections[sectionIndex],bounds=new THREE.Box3();scene.updateMatrixWorld(true);for(let i=s.first*COLS;i<=(s.last+1)*COLS-1;i++)bounds.union(new THREE.Box3().setFromObject(tileMeshes[i]));frameBounds(bounds,new THREE.Vector3(0,.002,1));
  }else frameBounds(allBounds,new THREE.Vector3(.25,.24,1));
  for(const [id,m] of [['view-ship','ship'],['view-wall','wall'],['view-overview','overview']])$(id).setAttribute('aria-pressed',String(mode===m));
  $('wall-section').value=String(sectionIndex);$('wall-section-prev').disabled=sectionIndex===0;$('wall-section-next').disabled=sectionIndex===sections.length-1;
  $('scene-status').textContent=mode==='ship'?'Widok statku · Wybierz „Ściana pojęć” lub fragment ściany, aby odczytać kafle.':mode==='section'?'Przybliżenie: '+sections[sectionIndex].label+'. Kliknij kwadratowy kafel, aby otworzyć opis.':'Ściana 3D: 14 wierszy × 7 kolumn. Szerokość = 2 długości statku. Wszystkie 98 kafli ma kwadratowy kształt.';
 }
 for(const [id,mode] of [['view-overview','overview'],['view-ship','ship'],['view-wall','wall']])$(id).onclick=()=>setView(mode);
 $('view-rotate').onclick=()=>{controls.autoRotate=!controls.autoRotate;updateRotate();};
 $('wall-section').onchange=()=>{sectionIndex=Number($('wall-section').value);setView('section');};
 $('wall-section-prev').onclick=()=>{sectionIndex=Math.max(0,sectionIndex-1);setView('section');};
 $('wall-section-next').onclick=()=>{sectionIndex=Math.min(sections.length-1,sectionIndex+1);setView('section');};
 $('wall-section-go').onclick=()=>setView('section');
 function resize(){const w=root.clientWidth,h=root.clientHeight;renderer.setSize(w,h);camera.aspect=w/Math.max(h,1);camera.updateProjectionMatrix();setView(viewMode);}
 new ResizeObserver(resize).observe(root);resize();
 const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let down=null,hovered=null;
 function hitAt(event){const rect=renderer.domElement.getBoundingClientRect();pointer.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);raycaster.setFromCamera(pointer,camera);return raycaster.intersectObjects([...tileMeshes,...markers.map(m=>m.glow)],false).find(h=>h.object.userData.node||h.object.userData.match)?.object;}
 renderer.domElement.addEventListener('pointerdown',e=>{down={x:e.clientX,y:e.clientY,id:e.pointerId,button:e.button};});
 renderer.domElement.addEventListener('pointercancel',()=>{down=null;});
 renderer.domElement.addEventListener('pointerup',e=>{const start=down;down=null;if(!start||start.id!==e.pointerId||start.button!==0||Math.hypot(e.clientX-start.x,e.clientY-start.y)>5)return;const hit=hitAt(e);if(hit)openTerm(hit.userData.index);});
 renderer.domElement.addEventListener('pointermove',e=>{hovered=hitAt(e);renderer.domElement.style.cursor=hovered?'pointer':'grab';if(hovered&&!down){const b=root.getBoundingClientRect();tooltip.textContent=terms[hovered.userData.index].name;tooltip.style.left=Math.max(8,Math.min(e.clientX-b.left+12,b.width-260))+'px';tooltip.style.top=Math.max(8,e.clientY-b.top-42)+'px';tooltip.style.display='block';}else tooltip.style.display='none';});
 renderer.domElement.addEventListener('pointerleave',()=>{hovered=null;tooltip.style.display='none';});
 const clock=new THREE.Clock(),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;let visible=true;
 new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;}).observe(root);
 renderer.setAnimationLoop(()=>{if(!visible||document.hidden)return;const t=clock.getElapsedTime();if(!reduced)markers.forEach((m,i)=>{m.glow.scale.setScalar(1+.2*Math.sin(t*2+i));m.torus.scale.setScalar(1+.1*Math.sin(t*1.6+i));});tileMeshes.forEach(tile=>tile.material.color.setHex(!tile.userData.match?0x25201b:tile===hovered?0xffdab0:0xffffff));controls.update();renderer.render(scene,camera);});
 return {
  filter(ids){for(const tile of tileMeshes)tile.userData.match=ids.has(tile.userData.id);},
  select(id){if(id&&!selectedId){pausedRotation=controls.autoRotate;controls.autoRotate=false;updateRotate();}else if(!id&&selectedId){controls.autoRotate=pausedRotation;updateRotate();}selectedId=id;const tile=tileMeshes.find(t=>t.userData.id===id);selection.visible=!!tile;if(tile)selection.position.copy(tile.position).add(new THREE.Vector3(0,0,.025));}
 };
}
