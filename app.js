/* ============ ИНТЕРАКТИВНАЯ КАРТА ============ */
var ICONS = {
  drop:'<svg viewBox="0 0 24 24" fill="var(--mk)"><path d="M12 3C12 3 5.5 10.5 5.5 15a6.5 6.5 0 0 0 13 0C18.5 10.5 12 3 12 3Z"/></svg>',
  star:'<svg viewBox="0 0 24 24" fill="var(--mk)"><path d="m12 2 2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17l-6.1 3.6 1.4-6.8L2.2 9.1l6.9-.8L12 2Z"/></svg>',
  bolt:'<svg viewBox="0 0 24 24" fill="var(--mk)"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/></svg>',
  flask:'<svg viewBox="0 0 24 24" fill="none" stroke="var(--mk)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6M10 3v5.5L4.8 18a2.3 2.3 0 0 0 2.1 3h10.2a2.3 2.3 0 0 0 2.1-3L14 8.5V3"/><path d="M7.5 14h9"/></svg>',
  cross:'<svg viewBox="0 0 24 24" fill="none" stroke="var(--mk)" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="7"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>',
  heli:'<svg viewBox="0 0 24 24" fill="var(--mk)"><path d="M7 3h10v2.4H7zM11 8h2v9h-2z"/><path d="M12 10 5 8v6l7 2 7-2V8l-7 2Z" opacity=".55"/><path d="M10 20h4v2h-4z"/></svg>',
  barrels:'<svg viewBox="0 0 24 24" fill="none" stroke="var(--mk)" stroke-width="2"><circle cx="8" cy="8" r="3.4"/><circle cx="16" cy="8" r="3.4"/><circle cx="12" cy="16" r="3.4"/></svg>'
};
var G = {1:'#e05c2a',2:'#4a90c2',3:'#3aa17e'};
var ENEMY='#d94f30';
var ROSTER=[
  {n:'Dragon Hunter',g:1,role:'Основа',p:[112,79,69],gates:[2,3]},
  {n:'Тебе водить',g:1,role:'Основа',p:[108,70,64],gates:[2,3]},
  {n:'Elena',g:1,role:'Основа',p:[102,62,62],gates:[2,3]},
  {n:'Повелитель',g:1,role:'Основа',p:[100,63,63],gates:[2,3]},
  {n:'Golodranez',g:1,role:'Помощник',p:[95,87,80],gates:[]},
  {n:'ПринцеssaДури',g:1,role:'Помощник',p:[93,60,55],gates:[]},
  {n:'Chedrik',g:1,role:'Помощник',p:[92,65,55],gates:[]},
  {n:'КАК ТО ТАК',g:1,role:'Помощник',p:[90,64,53],gates:[]},
  {n:'luki_ink',g:2,role:'Средние',p:[89,64,54],gates:[]},
  {n:'tihiy.omut',g:2,role:'Средние',p:[87,63,53],gates:[]},
  {n:'Vantera',g:2,role:'Средние',p:[85,55,52],gates:[]},
  {n:'Athena.',g:2,role:'Средние',p:[83,57,56],gates:[]},
  {n:'Орион',g:2,role:'Средние',p:[82,57,52],gates:[]},
  {n:'Laksa',g:2,role:'Средние',p:[82,47,44],gates:[]},
  {n:'nEJIMEHb',g:2,role:'Средние',p:[82,54,48],gates:[]},
  {n:'Alkash228',g:2,role:'Средние',p:[81,47,44],gates:[]},
  {n:'гусь.',g:2,role:'Средние',p:[80,53,46],gates:[]},
  {n:'Pop tha Molly',g:2,role:'Средние',p:[80,59,51],gates:[]},
  {n:'Вий',g:2,role:'Средние',p:[79,56,51],gates:[]},
  {n:'Madmax',g:2,role:'Средние',p:[75,53,44],gates:[]},
  {n:'EG Modo',g:2,role:'Средние',p:[75,54,50],gates:[]},
  {n:'Koalaty',g:2,role:'Средние',p:[75,55,50],gates:[]},
  {n:'Tatiana',g:3,role:'Бочки',p:[67,47,42],gates:[1]},
  {n:'ANGELina',g:3,role:'Бочки',p:[72,54,49],gates:[1]},
  {n:'Milfa007',g:3,role:'Бочки',p:[65,48,44],gates:[1]},
  {n:'Annkor',g:3,role:'Бочки',p:[73,46,42],gates:[1]},
  {n:'Pilesha',g:3,role:'Бочки',p:[73,46,43],gates:[1]},
  {n:'FanixRock',g:3,role:'Бочки',p:[64,41,38],gates:[1]},
  {n:'OUNCE',g:3,role:'Бочки',p:[53,50,49],gates:[1]},
  {n:'Serega',g:3,role:'Бочки',p:[67,47,null],gates:[1]}
];
var RES=[
  {n:'ros',p:[69,60,48]},
  {n:'DAVID.',p:[54,42,35]},
  {n:'Олька',p:[75,45,45]},
  {n:'Коба',p:[69,46,43]},
  {n:'WóòLF',p:[92,57,50]},
  {n:'Valkyrie',p:[67,47,43]}
];
RES.forEach(function(r){r.used=false;r.sub=null});
var G3=[],MID=[],G1A=[],G1H=[],PAIRS=[],STAGE_PAIRS=[],P={};
function gateCell(v,g){return v==null?'—':(v+(g?' <span class="gate" title="Отряд остаётся на воротах">✓</span>':''))}
function renderRoster(){
  var tb=document.getElementById('rosterBody');if(!tb)return;tb.innerHTML='';
  ROSTER.forEach(function(r){
    var tr=document.createElement('tr');
    tr.className='g'+r.g+(r.replaced?' sub':'');tr.dataset.g=r.g;
    tr.innerHTML='<td class="name">'+r.n+(r.replaced?'<span class="subnote">вместо '+r.replaced+'</span>':'')+'</td>'
      +'<td><span class="gtag">'+r.role+'</span>'+(r.replaced?'<span class="subtag">резерв</span>':'')
      +(r.g===2?'<span class="gplace" data-p="'+r.n+'"></span>':'')+'</td>'
      +'<td class="num">'+gateCell(r.p[0],r.gates.indexOf(1)>-1)+'</td>'
      +'<td class="num">'+gateCell(r.p[1],r.gates.indexOf(2)>-1)+'</td>'
      +'<td class="num">'+gateCell(r.p[2],r.gates.indexOf(3)>-1)+'</td>';
    tb.appendChild(tr);
  });
}
function rebuildSquads(){
  MID=ROSTER.filter(function(r){return r.g===2}).map(function(r){return [r.n,r.p[0]]});
  G1A=ROSTER.filter(function(r){return r.g===1&&r.role==='Основа'}).map(function(r){return [r.n,r.p[0]]});
  G1H=ROSTER.filter(function(r){return r.g===1&&r.role==='Помощник'}).map(function(r){return [r.n,r.p[0]]});
  G3=ROSTER.filter(function(r){return r.g===3}).map(function(r){return r.n});
  P={};MID.forEach(function(m){P[m[0]]=m[1]});
  var hasc=G1H.slice().sort(function(x,y){return x[1]-y[1]});
  PAIRS=G1A.map(function(a,i){return {a:a,h:hasc[i],sum:a[1]+hasc[i][1]}});
  STAGE_PAIRS=PAIRS.slice().sort(function(x,y){return y.sum-x.sum});
}
rebuildSquads();
renderRoster();
var MARKS = [
  {x:49.5,y:45.5,icon:'star',g:[1],t:'Центральный резервуар',
   d:'<b>Два сценария.</b> Мы сильнее — <b>держим центр</b>. Противник ровня или сильнее — сильнейший с помощником <b>только сбивает время захвата</b> и летит на следующие объекты.'},
  {x:37,y:32,icon:'flask',g:[2],ours:1,bld:2,t:'Комплекс разработки · группа В',
   d:'Наше здание. Держит <b>группа В</b> — два человека из средних. Свою точку не покидаем, на помощь не летим.'},
  {x:62.7,y:65.5,icon:'cross',g:[2],ours:1,bld:0,up:1,t:'Военный завод · группа А',
   d:'<b>Приоритет группы 2.</b> Здесь стоит <b>группа А — три сильнейших</b> из средних. Защищающий обновляет гарнизон релоком, если в нём <b>меньше 50%</b>.'},
  {x:80.5,y:71,icon:'heli',g:[2],ours:1,bld:1,up:1,end:1,t:'Заброшенная вертолетная площадка · группа Б',
   d:'<b>Приоритет группы 2</b> — «вертолётка» из плана, здесь стоит <b>группа Б</b> (трое). Гарнизон держим полным: если жгут — 1 и 2 дома, 3-й в гарнизон.'},
  {x:19.5,y:24,icon:'bolt',g:[2],ours:1,bld:3,start:1,t:'Солнечная электростанция · группа Г',
   d:'Наше здание. Держит <b>группа Г</b> — два человека. Свои точки не покидаем, на помощь не летим.'},
  {x:64,y:19,icon:'drop',g:[2],ours:1,bld:4,t:'Водоочистительный центр · группа Д',
   d:'Наше здание. Удержание после захвата — <b>группа Д</b> (два человека).'},
  {x:34,y:76.5,icon:'drop',g:[2],ours:1,bld:5,up:1,t:'Водоочистительный центр · группа Е',
   d:'Наше здание. Удержание после захвата — <b>группа Е</b> (два человека).'},
  {x:32.5,y:13,icon:'drop',g:[1,2],t:'Водоперерабатывающий завод',
   d:'Точка захвата. Работаем по плану: <b>ударная группа</b> — таймер, <b>средние</b> — удержание.'},
  {x:75.5,y:15.5,icon:'drop',g:[1,2],t:'Водоперерабатывающий завод',
   d:'Точка захвата. Работаем по плану: <b>ударная группа</b> — таймер, <b>средние</b> — удержание.'},
  {x:24.5,y:82,icon:'drop',g:[1],enemy:1,t:'Водоперерабатывающий завод · противник',
   d:'Вражеская точка. <b>Ударная группа</b> летит сюда по часовой стрелке сбивать таймер захвата и выбивать противника.'},
  {x:67,y:84,icon:'drop',g:[1],enemy:1,t:'Водоперерабатывающий завод · противник',
   d:'Вражеская точка. <b>Ударная группа</b> сбивает таймер, остальные держат свои объекты и не отвлекаются.'},
  {x:14,y:55,icon:'barrels',g:[3],g3:1,dashed:1,start:1,t:'Бочки · группа 3',
   d:'<b>Группа 3 — общая на все бочки.</b> Бочки появляются по ходу ивента: рассаживаемся сами по свободным, отрядами 2–5. 1-й отряд всегда дома с галочками на воротах.'},
  {x:47,y:60,icon:'barrels',g:[3],g3:1,dashed:1,t:'Бочки · группа 3',
   d:'<b>Группа 3 — общая на все бочки.</b> Бочки появляются по ходу ивента: рассаживаемся сами по свободным, отрядами 2–5. 1-й отряд всегда дома с галочками на воротах.'},
  {x:85,y:40,icon:'barrels',g:[3],g3:1,dashed:1,end:1,t:'Бочки · группа 3',
   d:'<b>Группа 3 — общая на все бочки.</b> Бочки появляются по ходу ивента: рассаживаемся сами по свободным, отрядами 2–5. 1-й отряд всегда дома с галочками на воротах.'},
  {x:52,y:86,icon:'barrels',g:[3],g3:1,dashed:1,up:1,t:'Бочки · группа 3',
   d:'<b>Группа 3 — общая на все бочки.</b> Бочки появляются по ходу ивента: рассаживаемся сами по свободным, отрядами 2–5. 1-й отряд всегда дома с галочками на воротах.'}
];
var inner = document.getElementById('mapInner'),
    panel = document.getElementById('mapPanel'),
    sheet = document.getElementById('sheet'),
    sheetBody = document.getElementById('sheetBody'),
    scrim = document.getElementById('scrim'),
    isDesktop = function(){return window.matchMedia('(min-width:900px)').matches};

/* данные назначений — нужны меткам карты, поэтому объявлены до создания меток */
var BLDS=[
  {t:'Военный завод',n:3,icon:'cross',prio:true,l:'А'},
  {t:'Вертолетная площадка',n:3,icon:'heli',prio:true,l:'Б'},
  {t:'Комплекс разработки',n:2,icon:'flask',l:'В'},
  {t:'Солнечная электростанция',n:2,icon:'bolt',l:'Г'},
  {t:'Водоочистительный центр · верх',n:2,icon:'drop',l:'Д'},
  {t:'Водоочистительный центр · низ',n:2,icon:'drop',l:'Е'}
];
var asState=[],asSel=null;
function autoAssign(){
  var srt=MID.slice().sort(function(a,b){return b[1]-a[1]}),i=0;
  asState=BLDS.map(function(b){var arr=srt.slice(i,i+b.n).map(function(m){return m[0]});i+=b.n;return arr});
  asSel=null;
}

var mkEls=[],bldMk={};
function markHTML(m){
  var html='<div class="info-head">'
    + '<span class="info-icon" style="--mk:'+(m.enemy?ENEMY:G[m.g[0]])+'">'+ICONS[m.icon]+'</span>'
    + '<h3>'+m.t+'</h3></div>'
    + '<div class="info-groups">'+m.g.map(function(g){return '<span class="ig g'+g+'">Группа '+g+'</span>'}).join('')+'</div>'
    + '<p class="info-text">'+m.d+'</p>';
  if(m.bld!==undefined)html+='<p class="info-text">Стоят сейчас: <b>'+asState[m.bld].join(', ')+'</b></p>';
  if(m.g3)html+='<p class="info-text">Общая группа: <b>'+G3.join(', ')+'</b> — рассаживаются сами по свободным бочкам.</p>';
  return html;
}
MARKS.forEach(function(m,i){
  var b=document.createElement('button');
  b.className='mk'+(m.dashed?' dashed':'')+(m.ours?' ours':'')+(m.g3?' g3m':'');
  b.style.left=m.x+'%';b.style.top=m.y+'%';
  b.style.setProperty('--mk',m.enemy?ENEMY:G[m.g[0]]);
  b.setAttribute('aria-label',m.t);
  b.innerHTML=m.ours?'<span class="ms">'+BLDS[m.bld].l+'</span>':ICONS[m.icon];
  if(m.ours||m.g3){
    b.innerHTML+='<span class="lbl'+(m.up?' up':'')+(m.end?' end':'')+(m.start?' start':'')+'"><b class="bt"></b><span class="nm"></span></span>';
  }
  b.dataset.g=m.g.join(',');
  b.addEventListener('click',function(){
    if(window.__panned)return;
    document.querySelectorAll('.mk.sel,.mk.open,.mk.hot').forEach(function(x){x.classList.remove('sel','open','hot')});
    b.classList.add('sel','open');
    var html=markHTML(m);
    if(isDesktop()){
      panel.innerHTML=html;
    }else{
      sheetBody.innerHTML=html;
      sheet.classList.add('open');scrim.classList.add('on');
    }
  });
  inner.appendChild(b);
  mkEls.push(b);
  if(m.bld!==undefined)bldMk[m.bld]=i;
});
function updateMapLabels(){
  MARKS.forEach(function(m,i){
    var el=mkEls[i];if(!el)return;
    var bt=el.querySelector('.bt'),nm=el.querySelector('.nm');
    if(!bt)return;
    if(m.bld!==undefined){
      bt.textContent=BLDS[m.bld].l+' · '+BLDS[m.bld].t;
      nm.innerHTML=asState[m.bld].map(function(n){return '<i>'+n+'</i>'}).join('');
    }else if(m.g3){
      bt.textContent='Бочки · группа 3';
      nm.innerHTML=G3.map(function(n){return '<i>'+n+'</i>'}).join('');
    }
  });
}
function focusMark(bi){
  var i=bldMk[bi];if(i===undefined)return;
  closeSheet();
  document.querySelectorAll('.mk.sel,.mk.open,.mk.hot').forEach(function(x){x.classList.remove('sel','open','hot')});
  var el=mkEls[i];el.classList.add('open','hot');
  document.getElementById('map').scrollIntoView({behavior:'smooth'});
  setTimeout(function(){if(window.__mapCenter)window.__mapCenter(MARKS[i].x,MARKS[i].y)},350);
  setTimeout(function(){el.classList.remove('hot')},2800);
}
function closeSheet(){sheet.classList.remove('open');scrim.classList.remove('on');
  document.querySelectorAll('.mk.sel,.mk.open,.mk.hot').forEach(function(x){x.classList.remove('sel','open','hot')})}
scrim.addEventListener('click',closeSheet);
document.getElementById('sheetClose').addEventListener('click',closeSheet);

/* ============ ПАРЫ И НАЗНАЧЕНИЕ ПО ТОЧКАМ ============ */
/* пары считаются в rebuildSquads() */

/* доска назначений группы 2 */
function renderBlds(){
  var g=document.getElementById('asGrid');g.innerHTML='';
  var place={};
  BLDS.forEach(function(b,bi){
    var names=asState[bi],
        sum=names.reduce(function(a,n){return a+P[n]},0),
        card=document.createElement('div');
    names.forEach(function(n){place[n]=b.l});
    card.className='bld'+(b.prio?' prio':'');
    card.innerHTML='<div class="bld-head"><span class="bletter">'+b.l+'</span><span class="b-ico" style="--mk:#4a90c2">'+ICONS[b.icon]+'</span><b>'+b.t+'</b><span class="sum">Сила '+sum+'</span></div>';
    var slots=document.createElement('div');slots.className='slots';
    names.forEach(function(n,pi){
      var c=document.createElement('button');c.className='pl';
      if(asSel&&asSel.b===bi&&asSel.p===pi)c.classList.add('sel');
      c.innerHTML=n+' <small>'+P[n]+'</small>';
      c.addEventListener('click',function(){
        if(!asSel){asSel={b:bi,p:pi}}
        else{
          var tmp=asState[asSel.b][asSel.p];
          asState[asSel.b][asSel.p]=asState[bi][pi];
          asState[bi][pi]=tmp;
          asSel=null;
        }
        renderBlds();
      });
      slots.appendChild(c);
    });
    card.appendChild(slots);
    var bm=document.createElement('button');bm.className='bmap';bm.textContent='Показать на карте';
    bm.addEventListener('click',function(){focusMark(bi)});
    card.appendChild(bm);
    g.appendChild(card);
  });
  /* синхронизируем буквы групп в таблице распределения и подписи на карте */
  document.querySelectorAll('.gplace').forEach(function(el){
    el.textContent=place[el.dataset.p]||'';
  });
  updateMapLabels();
}
autoAssign();renderBlds();
document.getElementById('asReset').addEventListener('click',function(){autoAssign();renderBlds()});

/* пары группы 1 */
function renderPairs(){
  var pg=document.getElementById('pairGrid');pg.innerHTML='';
  STAGE_PAIRS.forEach(function(p,i){
    var d=document.createElement('div');d.className='pair';
    d.innerHTML='<div class="ph2"><span class="stage-n">'+(i+1)+'</span><b>Пара '+(i+1)+'</b><span class="sum">Сила '+p.sum+'</span></div>'
      +'<p class="who"><b>'+p.a[0]+'</b> (основа, '+p.a[1]+') + <b>'+p.h[0]+'</b> (помощник, '+p.h[1]+')</p>';
    pg.appendChild(d);
  });
}
renderPairs();

/* ============ РЕЗЕРВ: замены 1 раз ============ */
function placeOf(name){
  for(var i=0;i<BLDS.length;i++)if(asState[i]&&asState[i].indexOf(name)>-1)return BLDS[i].l;
  return null;
}
function doSub(i){
  var res=RES[i];if(res.used)return;
  var sel=document.getElementById('resSel'+i);if(!sel)return;
  var t=ROSTER[+sel.value];if(!t||t.isRes||t.replaced)return;
  asState.forEach(function(arr){var k=arr.indexOf(t.n);if(k>-1)arr[k]=res.n});
  res.used=true;res.sub=t.n;
  t.replaced=t.n;t.prevP=t.p;t.n=res.n;t.p=res.p.slice();t.isRes=true;
  rebuildSquads();renderRoster();renderBlds();renderPairs();renderRes();
}
function undoSub(i){
  var res=RES[i];if(!res.used)return;
  var t=null;
  ROSTER.forEach(function(r){if(r.isRes&&r.n===res.n&&r.replaced===res.sub)t=r});
  if(!t)return;
  asState.forEach(function(arr){var k=arr.indexOf(res.n);if(k>-1)arr[k]=t.replaced});
  t.n=t.replaced;t.p=t.prevP;t.replaced=null;t.prevP=null;t.isRes=false;
  res.used=false;res.sub=null;
  rebuildSquads();renderRoster();renderBlds();renderPairs();renderRes();
}
function renderRes(){
  var g=document.getElementById('resGrid');if(!g)return;g.innerHTML='';
  RES.forEach(function(res,i){
    var card=document.createElement('div');
    card.className='res-card'+(res.used?' done':'');
    var html='<div class="res-head"><b>'+res.n+'</b><span class="res-p">'+res.p.join(' · ')+'</span></div>';
    if(res.used){
      html+='<div class="res-match">Вышел вместо <b>'+res.sub+'</b> — уже в таблице, на точке и в парах.</div>'
        +'<button class="res-btn undo">↩ Отменить замену</button>';
    }else{
      html+='<label class="res-lbl">Кого меняет:</label><select class="res-sel" id="resSel'+i+'">';
      ROSTER.forEach(function(r,ri){
        if(r.isRes||r.replaced)return;
        var pl=r.g===2?placeOf(r.n):null;
        html+='<option value="'+ri+'">'+r.n+' ('+r.p[0]+') · '+r.role+(pl?', группа '+pl:'')+'</option>';
      });
      html+='</select><button class="res-btn">Заменить на '+res.n+'</button>';
    }
    card.innerHTML=html;
    var btn=card.querySelector('.res-btn');
    if(btn)btn.addEventListener('click',function(){res.used?undoSub(i):doSub(i)});
    g.appendChild(card);
  });
}
renderRes();

/* фильтр групп на карте */
document.getElementById('gfilters').addEventListener('click',function(e){
  var btn=e.target.closest('.gf');if(!btn)return;
  this.querySelectorAll('.gf').forEach(function(x){x.classList.remove('act')});
  btn.classList.add('act');
  var g=btn.dataset.g;
  document.querySelectorAll('.mk').forEach(function(mk){
    mk.classList.toggle('dim',g!=='all'&&mk.dataset.g.split(',').indexOf(g)===-1);
  });
});

/* ============ ДВИЖОК КАРТЫ: панорама + щипок-зум ============ */
(function(){
  var view=document.getElementById('mapView'),
      W=1200,H=675,
      s=1,tx=0,ty=0,minS=.15,maxS=4,
      pts=new Map(),moved=false,pinchD=0,pinchS=1,
      lastTap=0,lastX=0,lastY=0;

  function apply(){
    inner.style.transform='translate('+tx+'px,'+ty+'px) scale('+s+')';
    inner.style.setProperty('--zi',(1/s).toFixed(3));
    inner.classList.toggle('zin',s>=0.6);
  }
  function clamp(){
    var vw=view.clientWidth,vh=view.clientHeight;
    if(W*s<=vw)tx=(vw-W*s)/2;else tx=Math.min(0,Math.max(vw-W*s,tx));
    if(H*s<=vh)ty=(vh-H*s)/2;else ty=Math.min(0,Math.max(vh-H*s,ty));
  }
  function fit(){
    var vw=view.clientWidth;
    if(card.classList.contains('full')){
      var vh=view.clientHeight;
      s=Math.min(vw/W,vh/H);
      tx=(vw-W*s)/2;ty=(vh-H*s)/2;
    }else{
      s=vw/W;
      view.style.height=Math.round(H*s)+'px';
      tx=0;ty=Math.round((view.clientHeight-H*s)/2);
    }
    apply();
  }
  function zoomAt(cx,cy,f){
    var ns=Math.min(maxS,Math.max(minS,s*f)),k=ns/s;
    tx=cx-(cx-tx)*k;ty=cy-(cy-ty)*k;s=ns;
    clamp();apply();
  }
  function center(){return [view.clientWidth/2,view.clientHeight/2]}
  window.__mapCenter=function(px,py){
    var vw=view.clientWidth,vh=view.clientHeight;
    if(s<1.05)s=1.05;
    tx=vw/2-px/100*W*s;ty=vh/2-py/100*H*s;
    clamp();apply();
  };

  view.addEventListener('pointerdown',function(e){
    view.setPointerCapture(e.pointerId);
    pts.set(e.pointerId,[e.clientX,e.clientY]);
    moved=false;
    if(pts.size===2){
      var a=[...pts.values()];
      pinchD=Math.hypot(a[0][0]-a[1][0],a[0][1]-a[1][1]);
      pinchS=s;
    }
  });
  view.addEventListener('pointermove',function(e){
    if(!pts.has(e.pointerId))return;
    var prev=pts.get(e.pointerId);
    pts.set(e.pointerId,[e.clientX,e.clientY]);
    if(pts.size===1){
      var dx=e.clientX-prev[0],dy=e.clientY-prev[1];
      if(Math.abs(dx)+Math.abs(dy)>3)moved=true;
      if(moved){tx+=dx;ty+=dy;clamp();apply();}
    }else if(pts.size===2){
      moved=true;
      var a=[...pts.values()];
      var d=Math.hypot(a[0][0]-a[1][0],a[0][1]-a[1][1]);
      var rect=view.getBoundingClientRect();
      var cx=(a[0][0]+a[1][0])/2-rect.left,
          cy=(a[0][1]+a[1][1])/2-rect.top;
      if(pinchD>0){
        var ns=Math.min(maxS,Math.max(minS,pinchS*(d/pinchD))),k=ns/s;
        tx=cx-(cx-tx)*k;ty=(cy-(cy-ty)*k);s=ns;
        clamp();apply();
      }
    }
  });
  function up(e){
    if(pts.has(e.pointerId)){
      pts.delete(e.pointerId);
      if(moved){window.__panned=true;setTimeout(function(){window.__panned=false},60)}
      else if(pts.size===0){
        /* двойной тап — зум */
        var now=Date.now(),rect=view.getBoundingClientRect();
        var x=e.clientX-rect.left,y=e.clientY-rect.top;
        if(now-lastTap<320&&Math.hypot(x-lastX,y-lastY)<40){
          var c=center();
          zoomAt(s<1?c[0]:x,s<1?c[1]:y,1.8);
          lastTap=0;
          window.__panned=true;setTimeout(function(){window.__panned=false},90);
        }else{lastTap=now;lastX=x;lastY=y}
      }
    }
  }
  view.addEventListener('pointerup',up);
  view.addEventListener('pointercancel',up);
  view.addEventListener('wheel',function(e){
    e.preventDefault();
    var rect=view.getBoundingClientRect();
    zoomAt(e.clientX-rect.left,e.clientY-rect.top,e.deltaY<0?1.15:0.87);
  },{passive:false});

  document.getElementById('zoomIn').addEventListener('click',function(){var c=center();zoomAt(c[0],c[1],1.35)});
  document.getElementById('zoomOut').addEventListener('click',function(){var c=center();zoomAt(c[0],c[1],0.74)});
  document.getElementById('zoomFit').addEventListener('click',fit);
  var card=view.closest('.map-card');
  document.getElementById('zoomFull').addEventListener('click',function(){
    card.classList.toggle('full');
    document.body.style.overflow=card.classList.contains('full')?'hidden':'';
    setTimeout(fit,60);
  });

  var hint=document.getElementById('mapHint');
  view.addEventListener('pointerdown',function once(){
    if(hint)hint.style.opacity='0',setTimeout(function(){hint.style.display='none'},400);
    view.removeEventListener('pointerdown',once);
  });

  window.addEventListener('load',fit);
  window.addEventListener('resize',fit);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit);
  fit();
})();

/* ============ РАСПРЕДЕЛЕНИЕ: поиск + фильтр ============ */
(function(){
  var q=document.getElementById('tblSearch'),
      btns=[].slice.call(document.querySelectorAll('.tbl-tools .flt')),
      g='all';
  function apply(){
    var needle=q.value.trim().toLowerCase(),
        rows=[].slice.call(document.querySelectorAll('#rosterTbl tbody tr'));
    rows.forEach(function(r){
      var okG=(g==='all'||r.dataset.g===g),
          okQ=!needle||r.querySelector('.name').textContent.toLowerCase().indexOf(needle)>-1;
      r.style.display=(okG&&okQ)?'':'none';
    });
  }
  q.addEventListener('input',apply);
  btns.forEach(function(b){
    b.addEventListener('click',function(){
      btns.forEach(function(x){x.classList.remove('act')});
      b.classList.add('act');g=b.dataset.g;apply();
    });
  });
})();

/* ============ ТЕЛЕПОРТЫ: степпер ============ */
(function(){
  var texts=[
    '<b>Переместились бесплатно</b> — начался таймер перезарядки телепорта. Дальше действуем по схеме.',
    '<b>Через 1 минуту</b> можно переместиться снова — цена манёвра <b>1 релокатор</b>.',
    '<b>Ещё через минуту</b> таймер прошёл — телепорт снова <b>бесплатный</b>.',
    'Цикл <b>бесконечный</b>: бесплатно → 1 релокатор → бесплатно. Так сохраняем и релокаторы, и алмазы.'
  ];
  var steps=[].slice.call(document.querySelectorAll('#tlSteps .tl-step')),
      desc=document.getElementById('tlDesc');
  steps.forEach(function(s){
    s.addEventListener('click',function(){
      steps.forEach(function(x){x.classList.remove('act')});
      s.classList.add('act');
      desc.innerHTML=texts[+s.dataset.t];
    });
  });
})();

/* ============ ЧЕК-ЛИСТ ============ */
(function(){
  var boxes=[].slice.call(document.querySelectorAll('#checkList input[type=checkbox]')),
      txt=document.getElementById('cpText'),bar=document.getElementById('cpBar');
  function upd(){
    var n=boxes.filter(function(b){return b.checked}).length;
    txt.textContent='Готовность '+n+' / '+boxes.length+(n===boxes.length?' · К бою готовы!':'');
    bar.style.width=(n/boxes.length*100)+'%';
    bar.style.background=n===boxes.length?'var(--g3)':'var(--terra)';
  }
  boxes.forEach(function(b){b.addEventListener('change',upd)});
})();
