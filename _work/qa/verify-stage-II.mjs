// Non-browser integration check. Actual Three.js geometry/camera/raycast math;
// DOM, 2D canvas drawing and WebGL renderer are mocked. This is NOT visual QA.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import * as Three from './vendor/three.module.mjs';
const root=new URL('../../',import.meta.url);
const html=fs.readFileSync(new URL('index.html',root),'utf8');
let code=fs.readFileSync(new URL('_work/src/maris-entry.js',root),'utf8');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
assert.equal(new Set(ids).size,ids.length,'HTML IDs must be unique');
assert.equal((html.match(/<script\b/g)||[]).length,1,'Only one project script');
const output={checks:[],limits:['No browser, GPU rendering, real 2D canvas text layout, CSS or visual screenshot verification.']};
function check(label,run){run();output.checks.push(label);}
async function execute(fail=false){
  const elements=new Map(),all=[];const errors=[];
  class Element {
    constructor(tag='div',id){this.tagName=tag;this.id=id;this.children=[];this.listeners={};this.dataset={};this.style={};this.attributes={};this.className='';this.clientWidth=1000;this.clientHeight=610;this.open=false;all.push(this);if(id)elements.set(id,this);}
    classList={toggle:(name,force)=>{const s=new Set(this.className.split(/\s+/).filter(Boolean));const on=force??!s.has(name);if(on)s.add(name);else s.delete(name);this.className=[...s].join(' ');return on;},add:name=>this.classList.toggle(name,true),remove:name=>this.classList.toggle(name,false)};
    set innerHTML(value){this._html=value;for(const match of value.matchAll(/\bid="([^"]+)"/g))if(!elements.has(match[1]))new Element('div',match[1]);}
    get innerHTML(){return this._html||'';}
    append(...items){this.children.push(...items);}
    appendChild(item){this.append(item);return item;}
    replaceChildren(...items){this.children=items;}
    setAttribute(key,value){this.attributes[key]=value;}
    addEventListener(type,listener){(this.listeners[type]??=[]).push(listener);}
    dispatch(type,event={}){const e={target:this,currentTarget:this,...event};for(const listener of this.listeners[type]||[])listener(e);this['on'+type]?.(e);}
    showModal(){assert.equal(this.open,false);this.open=true;}
    close(){if(this.open){this.open=false;this.dispatch('close');}}
    focus(){this.focused=true;}
    getBoundingClientRect(){return {left:0,top:0,width:this.clientWidth,height:this.clientHeight,right:this.clientWidth,bottom:this.clientHeight};}
    getContext(){return new Proxy({},{get:(target,key)=>target[key]??(()=>{}),set:(target,key,value)=>(target[key]=value,true)});}
  }
  ids.forEach(id=>new Element('div',id));
  const document={getElementById:id=>elements.get(id)||null,createElement:tag=>new Element(tag),querySelectorAll:selector=>all.filter(el=>selector==='.'+el.className||el.className.split(/\s+/).includes(selector.slice(1))),documentElement:new Element('html'),fonts:{load:()=>Promise.resolve([])}};
  class Renderer {
    constructor(){this.domElement=new Element('canvas');this.capabilities={getMaxAnisotropy:()=>16};}
    setPixelRatio(){}setSize(width,height){this.domElement.clientWidth=width;this.domElement.clientHeight=height;}
    render(scene,camera){scene.updateMatrixWorld(true);camera.updateMatrixWorld(true);}
  }
  class OrbitControls {
    constructor(camera){this.camera=camera;this.target=new Three.Vector3();}
    update(){this.camera.lookAt(this.target);this.camera.updateMatrixWorld(true);}
  }
  const context=vm.createContext({document,console:{log(){},error:(...items)=>errors.push(items)},devicePixelRatio:1,matchMedia:()=>({matches:false}),requestAnimationFrame(){},ResizeObserver:class{observe(){}},Path2D:class{constructor(path){this.path=path;}},location:{reload(){}}});
  const api={...Three,WebGLRenderer:Renderer};
  function synthetic(values){return new vm.SyntheticModule(Object.keys(values),function(){for(const [key,value] of Object.entries(values))this.setExport(key,value);},{context});}
  const three=synthetic(api),orbit=synthetic({OrbitControls});
  const exposed=code.replace("document.documentElement.dataset.sceneReady='true';", "globalThis.__qa={scene,camera,controls,pluginTileMeshes,SHIP_LENGTH,wall,hullBounds,sceneBounds,wallBounds,shipBounds,setView,resize,markers};document.documentElement.dataset.sceneReady='true';");
  const module=new vm.SourceTextModule(exposed,{context,importModuleDynamically:async specifier=>{if(fail)throw new Error('Simulated CDN failure');const result=specifier.includes('OrbitControls')?orbit:three;if(result.status==='unlinked')await result.link(()=>{});if(result.status==='linked')await result.evaluate();return result;}});
  await module.link(()=>{});await module.evaluate();
  for(let i=0;i<15;i++)await new Promise(resolve=>setImmediate(resolve));
  return {context,elements,errors,qa:context.__qa};
}
const run=await execute();
assert.equal(run.errors.length,0,'Application initialization has no JS error');
assert.ok(run.qa,'3D scene booted with mocked renderer');
const {qa,elements}=run;
output.dimensions={shipLength:qa.SHIP_LENGTH,wallWidth:qa.wall.userData.width,wallHeight:qa.wall.userData.height,gap:qa.hullBounds.min.z-qa.wall.position.z};
check('Original seven ship systems and a mesh satellite retained',()=>{
  assert.equal(qa.markers.length,7);assert.ok(qa.scene.children.some(object=>object.children.length>15&&object.position.y===10.2));
});
check('Square wall and one hull-length gap use actual hull bounds',()=>{
  assert.ok(qa.SHIP_LENGTH>15.5&&qa.SHIP_LENGTH<16.2, `Hull length ${qa.SHIP_LENGTH}`);assert.equal(qa.wall.userData.width,qa.SHIP_LENGTH);assert.equal(qa.wall.userData.height,qa.SHIP_LENGTH);
  assert.ok(Math.abs((qa.hullBounds.min.z-qa.wall.position.z)-qa.SHIP_LENGTH)<1e-8);assert.equal(qa.pluginTileMeshes.length,4);
});
check('Camera frames scene, ship and wall on desktop and phone aspect ratios',()=>{
  for(const [width,height] of [[1200,610],[1000,610],[360,510],[320,510]]){
    elements.get('scene').clientWidth=width;elements.get('scene').clientHeight=height;qa.resize();
    for(const [mode,bounds] of [['overview',qa.sceneBounds],['ship',qa.shipBounds],['wall',qa.wallBounds]]){
      qa.setView(mode);qa.scene.updateMatrixWorld(true);qa.camera.updateMatrixWorld(true);
      for(const x of [bounds.min.x,bounds.max.x])for(const y of [bounds.min.y,bounds.max.y])for(const z of [bounds.min.z,bounds.max.z]){
        const point=new Three.Vector3(x,y,z).project(qa.camera);
        assert.ok(Math.abs(point.x)<.8&&Math.abs(point.y)<.8&&point.z<1&&point.z>-1,`${width}x${height} ${mode} outside frustum ${point.toArray()}`);
      }
    }
  }
});
check('Four 3D tile centers raycast to correct dialogs, images and source notes',()=>{
  qa.setView('wall');qa.scene.updateMatrixWorld(true);qa.camera.updateMatrixWorld(true);
  const rendererCanvas=elements.get('scene').children[0];
  for(const tile of qa.pluginTileMeshes){
    const point=tile.getWorldPosition(new Three.Vector3()).project(qa.camera);
    const click={clientX:(point.x+1)/2*rendererCanvas.clientWidth,clientY:(1-point.y)/2*rendererCanvas.clientHeight,pointerId:1};
    rendererCanvas.dispatch('pointerdown',click);rendererCanvas.dispatch('pointerup',click);
    assert.ok(elements.get('plugin-dialog').open,tile.name+' opens');
    assert.ok(elements.get('plugin-image').src.endsWith(`plugin-${tile.userData.pluginId}.png`));
    assert.ok(fs.existsSync(new URL(elements.get('plugin-image').src,root)));assert.ok(elements.get('plugin-image').alt.length>30);
    assert.ok(elements.get('plugin-source').textContent.includes('04.10.2026'));
    elements.get('plugin-close').dispatch('click');assert.equal(elements.get('plugin-dialog').open,false);
  }
});
check('Keyboard-equivalent buttons, readable-font toggle and focus return',()=>{
  const buttons=elements.get('plugin-access').children;assert.equal(buttons.length,4);
  for(const button of buttons){button.dispatch('click');assert.ok(elements.get('plugin-dialog').open);elements.get('plugin-close').dispatch('click');assert.ok(button.focused);}
  elements.get('plugin-type-toggle').dispatch('click');assert.equal(elements.get('plugin-type-toggle').attributes['aria-pressed'],'true');
  elements.get('plugin-type-toggle').dispatch('click');assert.equal(elements.get('plugin-type-toggle').attributes['aria-pressed'],'false');
});
const failed=await execute(true);
check('Descriptions and satellite dialog survive simulated CDN failure',()=>{
  assert.equal(failed.elements.get('plugin-access').children.length,4);
  for(const button of failed.elements.get('plugin-access').children){button.dispatch('click');assert.ok(failed.elements.get('plugin-dialog').open);failed.elements.get('plugin-close').dispatch('click');}
  failed.elements.get('satellite-access').dispatch('click');assert.ok(failed.elements.get('satellite-dialog').open);failed.elements.get('satellite-close').dispatch('click');assert.equal(failed.elements.get('satellite-dialog').open,false);
  assert.ok(failed.elements.get('wall-view').disabled);
});
fs.writeFileSync(new URL('stage-II-results.json',import.meta.url),JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify(output,null,2));
