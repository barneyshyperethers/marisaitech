import terms from './glossary-data.json';
import {svgIcon,termVisual,topicGroups} from './icons.js';
import {createKnowledgeScene} from './glossary-scene.js';

export function initGlossary(){
 const $=id=>document.getElementById(id),dialog=$('term-dialog'),cards=new Map();
 let selectedCategory='',active=0,opener=null,sceneApi=null,shown=new Set(terms.map(t=>t.id));
 const norm=s=>s.toLocaleLowerCase('pl').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ł/g,'l');
 function showTerm(index,button){
  if(index<0||index>=terms.length)return;
  active=index;const term=terms[index],visual=termVisual(term);
  if(!dialog.open)opener=button||cards.get(term.id);
  $('term-title').textContent=term.name;$('term-category').textContent=term.category;
  $('term-icon').innerHTML=svgIcon(visual.icon);$('term-definition').textContent=term.definition;
  $('term-image').src='../grafiki/'+visual.image;$('term-image').alt=visual.alt;
  $('term-image-caption').textContent='Ilustracja koncepcyjna AI · '+visual.group.short+'. Wspólna ilustracja tematyczna dla powiązanych pojęć.';
  $('term-position').textContent=(index+1)+' / '+terms.length;
  $('term-prev').disabled=index===0;$('term-next').disabled=index===terms.length-1;
  if(!dialog.open)dialog.showModal();dialog.scrollTop=0;sceneApi?.select(term.id);
 }
 $('term-close').onclick=()=>dialog.close();$('term-prev').onclick=()=>showTerm(active-1);$('term-next').onclick=()=>showTerm(active+1);
 dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const b=dialog.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)dialog.close();});
 dialog.addEventListener('close',()=>{sceneApi?.select(null);opener?.focus({preventScroll:true});});
 $('term-readable').onclick=e=>{const readable=dialog.classList.toggle('solid-type');e.currentTarget.setAttribute('aria-pressed',String(readable));e.currentTarget.textContent=readable?'Włącz czcionkę LED':'Czytelniejszy tekst';};
 terms.forEach((term,i)=>{const b=document.createElement('button');b.type='button';b.className='term-card';b.id=term.id;b.setAttribute('aria-haspopup','dialog');b.setAttribute('aria-controls','term-dialog');b.innerHTML='<span class="icon">'+svgIcon(termVisual(term).icon)+'</span><span><strong></strong><small></small></span>';b.querySelector('strong').textContent=term.name;b.querySelector('small').textContent='POJĘCIE '+String(i+1).padStart(2,'0');b.onclick=()=>showTerm(i,b);cards.set(term.id,b);$('term-list').append(b);});
 const filters=[{name:'',short:'Wszystkie'},...topicGroups];
 filters.forEach(group=>{const b=document.createElement('button');b.type='button';b.className='filter';b.dataset.category=group.name;b.setAttribute('aria-pressed',String(!group.name));b.textContent=group.short;const count=document.createElement('span');count.textContent=String(group.name?terms.filter(t=>t.category===group.name).length:terms.length);b.append(count);b.onclick=()=>{selectedCategory=group.name;for(const f of $('topic-filters').children)f.setAttribute('aria-pressed',String(f.dataset.category===selectedCategory));filter();};$('topic-filters').append(b);});
 function filter(){const q=norm($('term-search').value.trim());shown=new Set();for(const term of terms){const yes=(!selectedCategory||term.category===selectedCategory)&&(!q||norm(term.name+' '+term.definition).includes(q));cards.get(term.id).hidden=!yes;if(yes)shown.add(term.id);} $('term-count').textContent='Wyświetlono '+shown.size+' z '+terms.length+' pojęć';$('no-terms').hidden=shown.size>0;sceneApi?.filter(shown);}
 $('term-search').addEventListener('input',filter);
 function openHash(){const id=location.hash.slice(1),i=terms.findIndex(t=>t.id===id);if(i>=0)showTerm(i);}
 window.addEventListener('hashchange',openHash);openHash();
 try{sceneApi=createKnowledgeScene(index=>showTerm(index));sceneApi.filter(shown);if(dialog.open)sceneApi.select(terms[active].id);}
 catch(error){console.error('MARIS knowledge scene:',error);$('knowledge-scene').innerHTML='<div class="scene-error"><h2>Scena 3D jest niedostępna</h2><p>Włącz WebGL 2 i akcelerację sprzętową w przeglądarce. Wszystkie pojęcia i definicje znajdziesz w katalogu poniżej.</p></div>';$('scene-status').textContent='Możesz korzystać z pełnego katalogu pojęć poniżej.';for(const id of ['view-overview','view-ship','view-wall','view-rotate','wall-section-prev','wall-section-next','wall-section','wall-section-go'])$(id).disabled=true;}
 $('view-fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await $('knowledge-viewer').requestFullscreen();}catch{$('scene-status').textContent='Pełny ekran nie jest dostępny w tej przeglądarce. Przybliżaj kółkiem lub gestem.';}};
 document.addEventListener('fullscreenchange',()=>{$('view-fullscreen').textContent=document.fullscreenElement?'Zamknij pełny ekran':'Pełny ekran';});
}
