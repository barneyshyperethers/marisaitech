import {quizQuestions} from './quiz-data.js';
import terms from './glossary-data.json';
export function initQuiz(){
 const $=id=>document.getElementById(id),form=$('quiz-form'),total=quizQuestions.length,fields=[];
 const letters=['A','B','C','D'];let graded=false;
 quizQuestions.forEach((q,i)=>{
  const field=document.createElement('fieldset');field.className='quiz-field';field.id=q.id;
  const legend=document.createElement('legend'),number=document.createElement('span');number.className='question-number';number.textContent='PYTANIE '+String(i+1).padStart(2,'0')+' / '+total;legend.append(number,document.createTextNode(q.question));field.append(legend);
  const group=document.createElement('div');group.className='options';
  q.options.forEach((text,j)=>{const label=document.createElement('label');label.className='option';const radio=document.createElement('input');radio.type='radio';radio.name=q.id;radio.value=String(j);radio.id=q.id+'-'+j;const letter=document.createElement('span');letter.className='letter';letter.textContent=letters[j];const copy=document.createElement('span');copy.textContent=text;label.append(radio,letter,copy);group.append(label);});
  const note=document.createElement('div');note.className='answer-note';note.hidden=true;field.append(group,note);$('quiz-questions').append(field);fields.push({field,note});
 });
 function progress(){const answered=quizQuestions.filter(q=>form.querySelector('input[name="'+q.id+'"]:checked')).length;$('quiz-progress-text').textContent='Zaznaczone odpowiedzi: '+answered+'/'+total;$('quiz-progress-bar').style.width=(answered/total*100)+'%';}
 function clearResult(){graded=false;$('quiz-result').hidden=true;fields.forEach(({field,note})=>{note.hidden=true;for(const label of field.querySelectorAll('.option'))label.classList.remove('correct','wrong');});}
 form.addEventListener('change',()=>{if(graded)clearResult();progress();});
 form.addEventListener('submit',event=>{
  event.preventDefault();let score=0,missing=0;
  quizQuestions.forEach((q,i)=>{const {field,note}=fields[i],chosen=field.querySelector('input:checked'),selected=chosen?Number(chosen.value):null,correct=selected===q.answerIndex;if(correct)score++;if(selected===null)missing++;
   field.querySelectorAll('.option').forEach((label,j)=>{label.classList.toggle('correct',j===q.answerIndex);label.classList.toggle('wrong',selected===j&&!correct);});
   const source=terms.find(t=>t.id===q.sourceTermId);note.replaceChildren();const heading=document.createElement('strong');heading.textContent=(selected===null?'Brak odpowiedzi. ':correct?'Poprawnie. ':'Niepoprawnie. ')+'Prawidłowa odpowiedź: '+letters[q.answerIndex]+'. ';note.append(heading,document.createTextNode(source.definition),document.createElement('br'));const link=document.createElement('a');link.href='slowniczek.html#'+source.id;link.textContent=source.name+' — zobacz w słowniczku (PDF s. '+source.sourcePage+')';note.append(link);note.hidden=false;
  });
  graded=true;$('quiz-score').textContent=score+'/'+total;const percent=Math.round(score/total*100);let message=score===total?'Wszystkie odpowiedzi są poprawne.':score>=28?'Bardzo dobry wynik. Wróć do wyjaśnień przy pytaniach, które sprawiły trudność.':score>=18?'Masz już podstawy. Sprawdź wyjaśnienia i uzupełnij wiedzę w słowniczku.':'Wróć do słowniczka i spróbuj ponownie — wszystkie wyjaśnienia są przy pytaniach.';
  $('quiz-summary').textContent=percent+'% poprawnych odpowiedzi. '+(missing?'Bez odpowiedzi: '+missing+'. ':'')+message;$('quiz-result').hidden=false;$('quiz-result').focus({preventScroll:true});$('quiz-result').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});
 });
 form.addEventListener('reset',()=>{clearResult();setTimeout(progress,0);});
}
