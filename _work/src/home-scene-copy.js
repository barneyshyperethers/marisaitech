// Direct copy of the approved home-page 3D scene foundation.
// Geometry and material properties retained; only the accent colors are warm.
export function makeHomeStyleScene(THREE,OrbitControls){
const root=document.getElementById('knowledge-scene'),scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x071a2b,.012);const camera=new THREE.PerspectiveCamera(42,1,.1,500);camera.position.set(19,14,22);const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;root.appendChild(renderer.domElement);const controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,3.6,0);controls.enableDamping=true;controls.minDistance=6;controls.maxDistance=320;controls.maxPolarAngle=Math.PI*.49;controls.autoRotate=false;controls.autoRotateSpeed=.5;scene.add(new THREE.HemisphereLight(0x92d9ff,0x062035,2.1));const light=new THREE.DirectionalLight(0xffe2a0,3.4);light.position.set(-8,15,9);scene.add(light);const fill=new THREE.PointLight(0xe8ca67,45,25);fill.position.set(4,7,-5);scene.add(fill);
const ship=new THREE.Group();scene.add(ship);const mat=(color,metalness=.3,roughness=.5)=>new THREE.MeshStandardMaterial({color,metalness,roughness});const hull=mat(0x60502b,.7,.35),edge=mat(0xd2bb77,.65,.32),deck=mat(0x716039),white=mat(0xddce9b,.25,.65),dark=mat(0x29291e,.5,.3),glass=mat(0x6c795e,.55,.18),cyan=new THREE.MeshBasicMaterial({color:0xffe981});function box(w,h,d,x,y,z,m,parent=ship){const a=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);a.position.set(x,y,z);parent.add(a);return a}function cylinder(r1,r2,h,x,y,z,m,parent=ship){const a=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,12),m);a.position.set(x,y,z);parent.add(a);return a}
// Ship's bow is +X. Shaped hull via custom extrusion.
const shape=new THREE.Shape();[[-7,-1.45],[4.8,-1.45],[7.2,-.7],[8,0],[7.2,.7],[4.8,1.45],[-7,1.45],[-7.5,.95],[-7.5,-.95]].forEach(([x,y],i)=>i?shape.lineTo(x,y):shape.moveTo(x,y));shape.closePath();const geo=new THREE.ExtrudeGeometry(shape,{depth:1.35,bevelEnabled:true,bevelThickness:.2,bevelSize:.18,bevelSegments:2});geo.rotateX(-Math.PI/2);const hullMesh=new THREE.Mesh(geo,hull);hullMesh.position.y=.7;ship.add(hullMesh);box(13.3,.15,2.65,-.05,2.1,0,deck);box(4.4,.25,2.7,-5.05,2.35,0,white);box(3.5,.95,2.4,-5.25,2.95,0,white);box(2.7,.65,2.2,-5.4,3.75,0,white);box(3,.34,2.3,-5.25,4.1,0,dark);for(let i=0;i<7;i++){box(.32,.24,.06,-6.4+i*.4,3.7,-1.23,glass);box(.32,.24,.06,-6.4+i*.4,3.7,1.23,glass)}cylinder(.08,.08,2,-5.7,5.1,0,edge);cylinder(.7,.7,.06,-5.7,5.9,0,cyan);cylinder(.05,.05,1.4,-4.5,4.9,.8,edge);cylinder(.38,.38,.28,-4.5,5.55,.8,white);for(let row=0;row<2;row++)for(let i=0;i<6;i++){const x=-2.1+i*1.18,z=row? .78:-.78;box(1.07,.76,1.28,x,2.55,z,mat([0x8d7540,0x93805a,0x776334,0xa18b59,0x7e6b3d,0x9b885c][(i+row)%6],.3,.7));box(1.07,.76,1.28,x,3.34,z,mat([0x9b8245,0x8d7137,0xb39c65,0x786333][(i+row)%4]));}for(let i=0;i<4;i++)box(.025,.06,2.6,-2.1+i*1.18,3.75,0,edge);for(let i=0;i<18;i++){let x=-6.6+i*.75;box(.05,.34,.05,x,2.45,-1.5,edge);box(.05,.34,.05,x,2.45,1.5,edge)}box(13.4,.035,.035,0,2.65,-1.5,edge);box(13.4,.035,.035,0,2.65,1.5,edge);
// sea grid and halo
const water=new THREE.Mesh(new THREE.PlaneGeometry(600,600),new THREE.MeshStandardMaterial({color:0x071f30,transparent:true,opacity:.8,roughness:.25,metalness:.5}));water.rotation.x=-Math.PI/2;water.position.y=-.3;scene.add(water);const grid=new THREE.GridHelper(100,80,0x1d657b,0x14374b);grid.position.y=-.25;grid.material.transparent=true;grid.material.opacity=.23;scene.add(grid);const ring=new THREE.Mesh(new THREE.RingGeometry(10,10.04,128),new THREE.MeshBasicMaterial({color:0xe1c66f,transparent:true,opacity:.23,side:THREE.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.y=-.2;scene.add(ring);

// SATELLITE: a real mesh group above the vessel, with clickable surfaces and keyboard access.
const satellite = new THREE.Group();
satellite.position.set(1.5,10.2,-.6);
satellite.rotation.set(.12,-.35,.1);
scene.add(satellite);
const foil = mat(0xd4b669,.72,.3);
const cell = new THREE.MeshStandardMaterial({color:0x123d88,metalness:.5,roughness:.28,emissive:0x07215a,emissiveIntensity:.5});
const satelliteLight = new THREE.MeshBasicMaterial({color:0xffdf8a});
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
]),new THREE.LineDashedMaterial({color:0xe7cc78,transparent:true,opacity:.4,dashSize:.2,gapSize:.2}));
signalLine.computeLineDistances();scene.add(signalLine);

return {root,scene,camera,renderer,controls,ship,hullMesh,box,satellite};
}
