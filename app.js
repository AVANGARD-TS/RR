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

/* ============ ЯЗЫКИ: RU по умолчанию / EN ============ */
var LANG='ru';
try{LANG=localStorage.getItem('ts-lang')||'ru'}catch(e){}
var __I18N={
ru:{
  docTitle:'Резервуар',docDesc:'Резервуар в Tiles Survive',
  h1:'Гайд по рейду на Резервуар · Tiles Survive',kicker:'Tiles Survive · гайд по рейду',heroTitle:'Резервуар',
  r1t:'Группа 1 · Ударная',r1s:'сбивает таймеры захвата',r2t:'Группа 2 · Защита',r2s:'держит здания',r3t:'Группа 3 · Бочки',r3s:'качает бочки',
  ppl8:'8 чел',ppl14:'14 чел',
  heroHint:'Тапай по меткам на карте — там всё расписано по объектам',
  s1h:'Карта боя',s1tag:'Тапай по меткам',mapToolbar:'Объекты и задачи',
  fAll:'Все',f1:'Ударная',f2:'Средние',f3:'Бочки',
  mapHint:'Щипок — зум · тап по метке — состав',
  mapPh:'Выбери метку на карте — здесь появится описание объекта и задачи групп.',
  mapNote:'<b>Синие метки с буквами</b> — наши здания: на них стоят группы А–Е, состав виден прямо на карте (приблизь или тапни метку). <b>Зелёные</b> — бочки, общая группа 3. <b>Красные</b> — точки противника.',
  s2h:'Группы и задачи',s2tag:'Тап — свернуть',
  g1t:'Группа 1 · Ударная',g1s:'4 основы + 4 помощника',
  g1p1:'Назначение — <b>сбивать таймер точек захвата весь ивент</b>, двигаясь <b>по часовой стрелке</b>. Летаем по карте, помогаем остальным и друг другу выбивать сильных противников.',
  g1p2:'Суммарная сила первых отрядов «основа + помощник» уравновешена: <b>самый слабый помощник идёт к самому сильному игроку</b> и т.д. Если основу жгут — помощник первым отрядом заходит к нему в гарнизон. Если помощь не нужна — помощник сбивает противников с бочек.',
  g1p3:'<b>Захват точки — 2 мин 40 сек.</b> Когда до конца вражеского захвата остаётся <b>60 сек</b> — сильный с помощником делают ТП и летят сбивать таймер.',
  g2t:'Группа 2 · Защита',g2s:'Контроль зданий',
  g2p1:'Обеспечиваем <b>контроль захваченных зданий</b>. Приоритет — <b>вертолетная площадка</b> и <b>военный завод</b>: на каждом по <b>три сильных игрока</b>.',
  g2p2:'Распределяемся по 2–3 человека, в каждой связке — <b>один защищающий</b>: он следит за гарнизоном и обновляет его релоком, если в гарнизоне <b>меньше 50%</b> — отошёл в сторону, вода качается дальше, а в гарнизон идёт уже полный отряд. Остальные 1–2 человека сжигают противника или выигрывают время на переотправку.',
  g2p3:'Если жгут: 1 и 2 дома, <b>3-й в гарнизон</b>. Если не жгут: в гарнизон 1 отряд, галочки на 2 и 3.',
  g3t:'Группа 3 · Фарм',g3s:'Качаем бочки',
  g3p1:'До появления бочек — <b>смотрим на карту и летим туда, где больше всего боёв</b>: сжигаем противников, садимся в гарнизоны, помогаем захватывать здания. Задача — набить <b>180 000 личных очков</b>: сидя на бочках, такой возможности не будет.',
  g3p2:'После появления бочек сидим <b>только на бочках</b>, отрядами 2–5.',
  g3warn:'1-й отряд всегда дома и с галочками на воротах — иначе телепорт за ленту собьёт сбор сразу с нескольких точек. Если противник сильный: качаем 3–5 отрядами, 1 и 2 дома.',
  sq1:'1 отряд',sq2:'2 отряд',sq3:'3 отряд',sqHome:'1 дома',sq25:'2–5 отряды',
  s3h:'Центральный резервуар',s3tag:'Два сценария',
  scIf1:'Если мы сильнее',sc1h:'Сценарий 1',sc1v:'Центр держим',
  sc1p:'Самый сильный игрок и его помощник <b>в состоянии самостоятельно удержать центральный резервуар</b> у противника.',
  scIf2:'Противник ровня или сильнее',sc2h:'Сценарий 2',sc2v:'Сбиваем время, не удерживаем',
  sc2p:'Самый сильный игрок и его помощник летят <b>только сбивать время захвата</b>. Дальше перемещаются на необходимые объекты — и там так же сбивают время.',
  s4h:'Распределение игроков',s4tag:'Баланс по силам',
  searchPh:'Поиск по нику…',fg1:'Группа 1',thPlayer:'Игрок',thGroup:'Группа',
  tblFoot:'I, II, III — сила отрядов · ✓ — отряд с галкой: остаётся на воротах · синяя буква — группа по точкам (А–Е)',
  s5h:'Назначение по точкам',s5tag:'Авто по силе · тапни двух — поменяются',
  as2:'Группа 2 · кто где стоит',as2hint:'Координация по буквам: завод — группа А, вертолётка — Б, дальше В–Е по два человека. Тапни двух игроков — поменяются местами.',
  as1:'Группа 1 · пары для сбития',as1hint:'Пары собраны по правилу: самый слабый помощник — к самому сильному. Летят по часовой стрелке, очередь точек решается по ходу боя.',
  asNote:'<b>Правило 60 секунд.</b> Захват точки идёт <b>2 мин 40 сек</b>. Когда до конца вражеского таймера захвата остаётся <b>60 сек</b> — сильный с помощником <b>делают ТП и летят сбивать</b>. Так цепочка не останавливается, а схема телепортации (бесплатно → 1 релокатор) не сбивается.',
  s6h:'Резерв · замены',s6tag:'Каждый выходит 1 раз',
  resHint:'Замена делается <b>один раз за ивент</b>. Каждому резервисту уже подобран <b>ближайший по силе I отряда</b> игрок — тапни «Заменить», и резервист встанет в таблицу, на точку и в пары вместо выбывшего.',
  s7h:'Схема телепортации',s7tag:'Тапай по шагам',
  tls1t:'Минута 0',tls1v:'Бесплатно',tls2t:'Через 1 мин',tls2v:'1 релокатор',tls3t:'Ещё через мин',tls3v:'Бесплатно',tls4t:'Далее',tls4v:'Повторяем',
  tl0:'<b>Переместились бесплатно</b> — начался таймер перезарядки телепорта. Дальше действуем по схеме и экономим релокаторы и алмазы.',
  tl1:'<b>Через 1 минуту</b> можно переместиться снова — цена манёвра <b>1 релокатор</b>.',
  tl2:'<b>Ещё через минуту</b> таймер прошёл — телепорт снова <b>бесплатный</b>.',
  tl3:'Цикл <b>бесконечный</b>: бесплатно → 1 релокатор → бесплатно. Так сохраняем и релокаторы, и алмазы.',
  s8h:'Перед боем',s8tag:'Чек-лист',
  ck1:'<b>Глушитель разведки включён</b> — абсолютно все игроки, стоя за лентой до начала боя.',
  ck2:'<b>Галочки на отрядах проставлены</b> — по своей группе: Гр.1 → 2 и 3; Гр.2 → 1 и 2; Гр.3 → 1-й дома с галочками на воротах.',
  ck3:'<b>Знаю свою группу и задачу</b> — сбитие таймеров / контроль зданий / бочки.',
  ck4:'<b>Чат рейда открыт</b> — читаем внимательно с момента начала резервуара.',
  ck5:'<b>Релокаторы и релок готовы</b> — для схемы телепортации и обновления гарнизона.',
  cpReady:'Готовность',cpDone:' · К бою готовы!',
  s9h:'Общие правила',s9tag:'Всё только по плану',doH:'Делаем',dontH:'Не делаем',
  rl1:'<b>Группы 2 и 3 держат свои точки</b> — бочки и точки захвата не покидаем.',
  rl2:'<b>Сбитие — только группа 1</b>, строго по часовой стрелке.',
  rl3:'<b>Читаем чат рейда</b> — он открывается в момент начала резервуара.',
  rl4:'<b>Защищающий обновляет гарнизон релоком</b>, если в нём меньше 50%.',
  rl5:'<b>Захват точки — 2 мин 40 сек</b>: за 60 сек до конца вражеского захвата сильный с помощником летят сбивать таймер.',
  rl6:'<b>Телепортируемся по таймеру</b> — бесплатно / 1 релокатор / бесплатно.',
  rn1:'<b>Никуда с точек не бежим</b> и никого не спасаем — всё только по плану.',
  rn2:'<b>Группы 2 и 3 не летят на помощь</b> — за помощь отвечает группа 1.',
  rn3:'<b>Группа 3 не ставит 1-й отряд на бочки</b> — собьётся сбор с нескольких точек.',
  rn4:'<b>Не заходим без глушителя разведки</b> — ни один игрок.',
  rn5:'<b>Не тратим алмазы на телепорты</b> — есть бесконечная схема с релокаторами.',
  ft1:'Резервуар · Tiles Survive · гайд по событию',ft2:'Вода побеждает камень',
  dkMap:'Карта',dkRoster:'Состав',dkAssign:'Точки',dkRes:'Резерв',dkRules:'Правила',
  zFull:'Во весь экран',zFit:'Вся карта',zIn:'Приблизить',zOut:'Отдалить',shClose:'Закрыть',
  grp:'Группа',grpL:'группа',
  mkStand:'Стоят сейчас:',mkShared:'Общая группа:',mkSharedTail:'рассаживаются сами по свободным бочкам.',mkBarrels:'Бочки · группа 3',
  power:'Сила',showMap:'Показать на карте',pair:'Пара',pairMain:'основа',pairHelp:'помощник',
  subFor:'вместо',subRs:'из резерва, за',subtag:'резерв',
  resMatch:'Ближайший по силе I отряда:',resBtn:'Заменить:',resOut1:'Вышел вместо',resOut2:'уже в таблице, на точке и в парах.',resUndo:'Отменить замену',resNone:'Некого заменять.',
  roles:{'Основа':'Основа','Помощник':'Помощник','Средние':'Средние','Бочки':'Бочки'},
  blds:['Военный завод','Вертолетная площадка','Комплекс разработки','Солнечная электростанция','Водоочистительный центр · верх','Водоочистительный центр · низ'],
  marks:null
},
en:{
  docTitle:'Reservoir',docDesc:'Reservoir Raid guide — Tiles Survive',
  h1:'Reservoir Raid guide · Tiles Survive',kicker:'Tiles Survive · raid guide',heroTitle:'Reservoir',
  r1t:'Group 1 · Strike',r1s:'breaks capture timers',r2t:'Group 2 · Defense',r2s:'holds the buildings',r3t:'Group 3 · Barrels',r3s:'farms the barrels',
  ppl8:'8 players',ppl14:'14 players',
  heroHint:'Tap the markers on the map — every object is explained there',
  s1h:'Battle Map',s1tag:'Tap the markers',mapToolbar:'Objects & tasks',
  fAll:'All',f1:'Strike',f2:'Mid',f3:'Barrels',
  mapHint:'Pinch to zoom · tap a marker for the squad',
  mapPh:'Pick a marker on the map — the object info and group tasks will appear here.',
  mapNote:'<b>Blue markers with letters</b> — our buildings: groups A–E hold them, squads are shown right on the map (zoom in or tap a marker). <b>Green</b> — barrels, shared group 3. <b>Red</b> — enemy points.',
  s2h:'Groups & tasks',s2tag:'Tap to collapse',
  g1t:'Group 1 · Strike',g1s:'4 mains + 4 backups',
  g1p1:'Our mission — <b>break capture timers all event long</b>, moving <b>clockwise</b>. We fly around the map, help the others and each other knock out strong enemies.',
  g1p2:'Total squad-I power of each "main + backup" pair is balanced: <b>the weakest backup goes to the strongest player</b> and so on. If a main is being burned — the backup enters his garrison with the first squad. If no help is needed — the backup knocks enemies off the barrels.',
  g1p3:'<b>Capturing a point takes 2 min 40 sec.</b> When <b>60 sec</b> remain on the enemy capture timer — the strong player and the backup teleport and fly to break it.',
  g2t:'Group 2 · Defense',g2s:'Building control',
  g2p1:'We keep <b>control of captured buildings</b>. Priority — the <b>helipad</b> and the <b>munitions factory</b>: <b>three strong players</b> on each.',
  g2p2:'We split into teams of 2–3, each with <b>one defender</b>: he watches the garrison and refreshes it with a reloc; if the garrison is <b>below 50%</b> — step aside, water keeps flowing, and a full squad marches in. The other 1–2 players burn the enemy or buy time for redeployment.',
  g2p3:'If burned: squads 1 and 2 home, <b>3rd in garrison</b>. If not: squad 1 in garrison, checkmarks on 2 and 3.',
  g3t:'Group 3 · Farm',g3s:'Farming barrels',
  g3p1:'Before barrels appear — <b>watch the map and fly where the fighting is hottest</b>: burn enemies, sit in garrisons, help capture buildings. The goal is <b>180,000 solo points</b> — sitting on barrels you will not get there.',
  g3p2:'After barrels appear we sit <b>on barrels only</b>, in squads 2–5.',
  g3warn:'Squad 1 always stays home with gate checkmarks — otherwise teleporting behind the line breaks farming on several points at once. If the enemy is strong: farm in squads 3–5, squads 1 and 2 home.',
  sq1:'Squad 1',sq2:'Squad 2',sq3:'Squad 3',sqHome:'1 at home',sq25:'Squads 2–5',
  s3h:'Central Reservoir',s3tag:'Two scenarios',
  scIf1:'If we are stronger',sc1h:'Scenario 1',sc1v:'We hold the center',
  sc1p:'The strongest player and his backup <b>can hold the central reservoir</b> against the enemy on their own.',
  scIf2:'Enemy is equal or stronger',sc2h:'Scenario 2',sc2v:'Break the timer, don\u2019t hold',
  sc2p:'The strongest player and his backup fly <b>only to break capture timers</b>. Then they move to the needed objects — and break timers there too.',
  s4h:'Player Assignments',s4tag:'Power balance',
  searchPh:'Search by nickname…',fg1:'Group 1',thPlayer:'Player',thGroup:'Group',
  tblFoot:'I, II, III — squad power · ✓ — checked squad: stays at the gates · blue letter — point group (A–E)',
  s5h:'Point Assignments',s5tag:'Auto by power · tap two to swap',
  as2:'Group 2 · positions',as2hint:'Coordination by letters: factory — group A, helipad — B, then C–E with two players each. Tap two players to swap them.',
  as1:'Group 1 · strike pairs',as1hint:'Pairs follow the rule: weakest backup goes to the strongest main. They fly clockwise; the point order is decided during the battle.',
  asNote:'<b>The 60-second rule.</b> Capturing a point takes <b>2 min 40 sec</b>. When <b>60 sec</b> remain on the enemy capture timer — the strong player and the backup <b>teleport and fly to break it</b>. The chain never stops and the teleport scheme (free → 1 relocator) stays intact.',
  s6h:'Reserve · Substitutions',s6tag:'Each subs in once',
  resHint:'Substitution happens <b>once per event</b>. Each reserve player is already matched with the <b>closest squad-I power</b> player — tap "Substitute" and the reserve takes his place in the table, on the point and in the pairs.',
  s7h:'Teleport Scheme',s7tag:'Tap the steps',
  tls1t:'Minute 0',tls1v:'Free',tls2t:'After 1 min',tls2v:'1 relocator',tls3t:'1 more min',tls3v:'Free',tls4t:'Then',tls4v:'Repeat',
  tl0:'<b>Teleported for free</b> — the teleport cooldown has started. Keep following the scheme to save relocators and gems.',
  tl1:'<b>After 1 minute</b> you can teleport again — the move costs <b>1 relocator</b>.',
  tl2:'<b>One more minute</b> and the cooldown is over — teleport is <b>free</b> again.',
  tl3:'The cycle is <b>endless</b>: free → 1 relocator → free. This way we save both relocators and gems.',
  s8h:'Before the Battle',s8tag:'Checklist',
  ck1:'<b>Scout jammer is on</b> — absolutely every player, standing behind the line before the battle starts.',
  ck2:'<b>Squad checkmarks are set</b> — by group: Gr.1 → 2 and 3; Gr.2 → 1 and 2; Gr.3 → squad 1 home with gate checkmarks.',
  ck3:'<b>I know my group and task</b> — breaking timers / holding buildings / barrels.',
  ck4:'<b>Raid chat is open</b> — read it carefully from the moment the reservoir starts.',
  ck5:'<b>Relocators and reloc are ready</b> — for the teleport scheme and garrison refresh.',
  cpReady:'Readiness',cpDone:' · Battle ready!',
  s9h:'General Rules',s9tag:'Everything by the plan',doH:'Do',dontH:'Don\u2019t',
  rl1:'<b>Groups 2 and 3 hold their points</b> — never leave barrels or capture points.',
  rl2:'<b>Breaking is group 1 only</b>, strictly clockwise.',
  rl3:'<b>Read the raid chat</b> — it opens when the reservoir starts.',
  rl4:'<b>The defender refreshes the garrison with a reloc</b> when it drops below 50%.',
  rl5:'<b>Capturing takes 2 min 40 sec</b>: 60 sec before the enemy capture ends, the strong player and the backup fly to break the timer.',
  rl6:'<b>Teleport by the timer</b> — free / 1 relocator / free.',
  rn1:'<b>We don\u2019t run anywhere from our points</b> and save no one — everything by the plan.',
  rn2:'<b>Groups 2 and 3 don\u2019t fly to help</b> — help is group 1\u2019s job.',
  rn3:'<b>Group 3 doesn\u2019t put squad 1 on barrels</b> — it breaks farming on several points.',
  rn4:'<b>No one enters without a scout jammer</b> — not a single player.',
  rn5:'<b>We don\u2019t spend gems on teleports</b> — there is an endless relocator scheme.',
  ft1:'Reservoir · Tiles Survive · event guide',ft2:'Water beats rock',
  dkMap:'Map',dkRoster:'Roster',dkAssign:'Points',dkRes:'Reserve',dkRules:'Rules',
  zFull:'Fullscreen',zFit:'Fit map',zIn:'Zoom in',zOut:'Zoom out',shClose:'Close',
  grp:'Group',grpL:'group',
  mkStand:'Stationed now:',mkShared:'Shared group:',mkSharedTail:'players seat themselves on free barrels.',mkBarrels:'Barrels · group 3',
  power:'Power',showMap:'Show on map',pair:'Pair',pairMain:'main',pairHelp:'backup',
  subFor:'replacing',subRs:'from reserve for',subtag:'reserve',
  resMatch:'Closest by squad I power:',resBtn:'Substitute:',resOut1:'Subbed in for',resOut2:'already in the table, on the point and in pairs.',resUndo:'Undo substitution',resNone:'No one to replace.',
  roles:{'Основа':'Main','Помощник':'Backup','Средние':'Mid','Бочки':'Barrels'},
  blds:['Munitions Factory','Abandoned Helipad','Dev Compound','Solar Power Station','Water Treatment Center · top','Water Treatment Center · bottom'],
  marks:[
    {t:'Central Reservoir',d:'<b>Two scenarios.</b> If we are stronger — <b>we hold the center</b>. If the enemy is equal or stronger — the strongest player and the backup <b>only break the capture timer</b> and move on to the next objects.'},
    {t:'Dev Compound · group В',d:'Our building. Held by <b>group В</b> — two mid players. We never leave our point and don\u2019t fly to help.'},
    {t:'Munitions Factory · group А',d:'<b>Group 2 priority.</b> <b>Group А — the three strongest</b> mid players stand here. The defender refreshes the garrison with a reloc when it drops <b>below 50%</b>.'},
    {t:'Abandoned Helipad · group Б',d:'<b>Group 2 priority</b> — the helipad from the plan, <b>group Б</b> (three players) stands here. Keep the garrison full: if burned — squads 1 and 2 home, 3rd in garrison.'},
    {t:'Solar Power Station · group Г',d:'Our building. Held by <b>group Г</b> — two players. We never leave our points and don\u2019t fly to help.'},
    {t:'Water Treatment Center · group Д',d:'Our building. Holding after capture — <b>group Д</b> (two players).'},
    {t:'Water Treatment Center · group Е',d:'Our building. Holding after capture — <b>group Е</b> (two players).'},
    {t:'Water Processing Plant',d:'Capture point. Follow the plan: <b>strike group</b> — timer, <b>mid players</b> — holding.'},
    {t:'Water Processing Plant',d:'Capture point. Follow the plan: <b>strike group</b> — timer, <b>mid players</b> — holding.'},
    {t:'Water Processing Plant · enemy',d:'Enemy point. The <b>strike group</b> flies here clockwise to break the capture timer and knock the enemy out.'},
    {t:'Water Processing Plant · enemy',d:'Enemy point. The <b>strike group</b> breaks the timer; everyone else holds their objects and doesn\u2019t get distracted.'},
    {t:'Barrels · group 3',d:'<b>Group 3 is shared across all barrels.</b> Barrels appear during the event: seat yourselves on free ones, in squads 2–5. Squad 1 always stays home with gate checkmarks.'},
    {t:'Barrels · group 3',d:'<b>Group 3 is shared across all barrels.</b> Barrels appear during the event: seat yourselves on free ones, in squads 2–5. Squad 1 always stays home with gate checkmarks.'},
    {t:'Barrels · group 3',d:'<b>Group 3 is shared across all barrels.</b> Barrels appear during the event: seat yourselves on free ones, in squads 2–5. Squad 1 always stays home with gate checkmarks.'},
    {t:'Barrels · group 3',d:'<b>Group 3 is shared across all barrels.</b> Barrels appear during the event: seat yourselves on free ones, in squads 2–5. Squad 1 always stays home with gate checkmarks.'}
  ]
}};
window.__I18N=__I18N;
function t(k){var L=__I18N[LANG]||__I18N.ru;return (L[k]!==undefined?L[k]:(__I18N.ru[k]!==undefined?__I18N.ru[k]:k))}
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
  {n:'Харон',g:2,role:'Средние',p:[81,65,94],gates:[],rs:'Орион'},
  {n:'Laksa',g:2,role:'Средние',p:[82,47,44],gates:[]},
  {n:"The Devil's Pet",g:2,role:'Средние',p:[87,55,52],gates:[],rs:'nEJIMEHb'},
  {n:'Alkash228',g:2,role:'Средние',p:[81,47,44],gates:[]},
  {n:'гусь.',g:2,role:'Средние',p:[80,53,46],gates:[]},
  {n:'Pop tha Molly',g:2,role:'Средние',p:[80,59,51],gates:[]},
  {n:'Олька',g:2,role:'Средние',p:[75,45,45],gates:[],rs:'Вий'},
  {n:'Madmax',g:2,role:'Средние',p:[75,53,44],gates:[]},
  {n:'EG Modo',g:2,role:'Средние',p:[75,54,50],gates:[]},
  {n:'Koalaty',g:2,role:'Средние',p:[75,55,50],gates:[]},
  {n:'Valkyrie',g:3,role:'Бочки',p:[67,47,43],gates:[1],rs:'Tatiana'},
  {n:'ANGELina',g:3,role:'Бочки',p:[72,54,49],gates:[1]},
  {n:'Milfa007',g:3,role:'Бочки',p:[65,48,44],gates:[1]},
  {n:'Annkor',g:3,role:'Бочки',p:[73,46,42],gates:[1]},
  {n:'Pilesha',g:3,role:'Бочки',p:[73,46,43],gates:[1]},
  {n:'FanixRock',g:3,role:'Бочки',p:[64,41,38],gates:[1]},
  {n:'OUNCE',g:3,role:'Бочки',p:[53,50,49],gates:[1]},
  {n:'Serega',g:3,role:'Бочки',p:[67,47,null],gates:[1]}
];
var RES=[
  {n:'WóòLF',p:[92,57,50]},
  {n:'Ана 4а',p:[70,52,49]},
  {n:'ros',p:[69,60,48]},
  {n:'Коба',p:[69,46,43]},
  {n:'DAVID.',p:[54,42,35]}
];
RES.forEach(function(r){r.used=false;r.sub=null});
var G3=[],MID=[],G1A=[],G1H=[],PAIRS=[],STAGE_PAIRS=[],P={};
function gateCell(v,g){return v==null?'—':(v+(g?' <span class="gate" title="Отряд остаётся на воротах">✓</span>':''))}
function roleT(role){var R=(window.__I18N&&__I18N[LANG].roles)||{};return R[role]||role}
function renderRoster(){
  var tb=document.getElementById('rosterBody');if(!tb)return;tb.innerHTML='';
  ROSTER.forEach(function(r){
    var tr=document.createElement('tr');
    tr.className='g'+r.g+(r.replaced||r.rs?' sub':'');tr.dataset.g=r.g;
    tr.innerHTML='<td class="name">'+r.n+(r.replaced?'<span class="subnote">'+t('subFor')+' '+r.replaced+'</span>':'')+(r.rs?'<span class="subnote">'+t('subRs')+' '+r.rs+'</span>':'')+'</td>'
      +'<td><span class="gtag">'+roleT(r.role)+'</span>'+(r.replaced||r.rs?'<span class="subtag">'+t('subtag')+'</span>':'')
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
function markT(m,i){var M=(window.__I18N&&__I18N[LANG].marks)||[];return M[i]||{t:m.t,d:m.d}}
function markHTML(m,i){
  var T=markT(m,i);
  var html='<div class="info-head">'
    + '<span class="info-icon" style="--mk:'+(m.enemy?ENEMY:G[m.g[0]])+'">'+ICONS[m.icon]+'</span>'
    + '<h3>'+T.t+'</h3></div>'
    + '<div class="info-groups">'+m.g.map(function(g){return '<span class="ig g'+g+'">'+t('grp')+' '+g+'</span>'}).join('')+'</div>'
    + '<p class="info-text">'+T.d+'</p>';
  if(m.bld!==undefined)html+='<p class="info-text">'+t('mkStand')+' <b>'+asState[m.bld].join(', ')+'</b></p>';
  if(m.g3)html+='<p class="info-text">'+t('mkShared')+' <b>'+G3.join(', ')+'</b> — '+t('mkSharedTail')+'</p>';
  return html;
}
MARKS.forEach(function(m,i){
  var b=document.createElement('button');
  b.className='mk'+(m.dashed?' dashed':'')+(m.ours?' ours':'')+(m.g3?' g3m':'');
  b.style.left=m.x+'%';b.style.top=m.y+'%';
  b.style.setProperty('--mk',m.enemy?ENEMY:G[m.g[0]]);
  b.setAttribute('aria-label',markT(m,i).t);
  b.innerHTML=m.ours?'<span class="ms">'+BLDS[m.bld].l+'</span>':ICONS[m.icon];
  if(m.ours||m.g3){
    b.innerHTML+='<span class="lbl'+(m.up?' up':'')+(m.end?' end':'')+(m.start?' start':'')+'"><b class="bt"></b><span class="nm"></span></span>';
  }
  b.dataset.g=m.g.join(',');
  b.addEventListener('click',function(){
    if(window.__panned)return;
    document.querySelectorAll('.mk.sel,.mk.open,.mk.hot').forEach(function(x){x.classList.remove('sel','open','hot')});
    b.classList.add('sel','open');
    var html=markHTML(m,i);
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
function bldT(bi){var B=(window.__I18N&&__I18N[LANG].blds)||[];return B[bi]||BLDS[bi].t}
function updateMapLabels(){
  MARKS.forEach(function(m,i){
    var el=mkEls[i];if(!el)return;
    var bt=el.querySelector('.bt'),nm=el.querySelector('.nm');
    if(!bt)return;
    if(m.bld!==undefined){
      bt.textContent=BLDS[m.bld].l+' · '+bldT(m.bld);
      nm.innerHTML=asState[m.bld].map(function(n){return '<i>'+n+'</i>'}).join('');
    }else if(m.g3){
      bt.textContent=t('mkBarrels');
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
    card.innerHTML='<div class="bld-head"><span class="bletter">'+b.l+'</span><span class="b-ico" style="--mk:#4a90c2">'+ICONS[b.icon]+'</span><b>'+bldT(bi)+'</b><span class="sum">'+t('power')+' '+sum+'</span></div>';
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
    var bm=document.createElement('button');bm.className='bmap';bm.textContent=t('showMap');
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
var asR=document.getElementById('asReset');if(asR)asR.addEventListener('click',function(){autoAssign();renderBlds()});

/* пары группы 1 */
function renderPairs(){
  var pg=document.getElementById('pairGrid');pg.innerHTML='';
  STAGE_PAIRS.forEach(function(p,i){
    var d=document.createElement('div');d.className='pair';
    d.innerHTML='<div class="ph2"><span class="stage-n">'+(i+1)+'</span><b>'+t('pair')+' '+(i+1)+'</b><span class="sum">'+t('power')+' '+p.sum+'</span></div>'
      +'<p class="who"><b>'+p.a[0]+'</b> ('+t('pairMain')+', '+p.a[1]+') + <b>'+p.h[0]+'</b> ('+t('pairHelp')+', '+p.h[1]+')</p>';
    pg.appendChild(d);
  });
}
renderPairs();

/* ============ РЕЗЕРВ: замены 1 раз ============ */
function placeOf(name){
  for(var i=0;i<BLDS.length;i++)if(asState[i]&&asState[i].indexOf(name)>-1)return BLDS[i].l;
  return null;
}
function findMatch(res){
  var best=null,bd=1e9;
  ROSTER.forEach(function(r){
    if(r.replaced||r.isRes)return;
    var d=Math.abs(r.p[0]-res.p[0]);
    if(d<bd){bd=d;best=r}
  });
  return best;
}
function doSub(i){
  var res=RES[i];if(res.used)return;
  var t=findMatch(res);if(!t)return;
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
      html+='<div class="res-match">'+t('resOut1')+' <b>'+res.sub+'</b> — '+t('resOut2')+'</div>'
        +'<button class="res-btn undo">↩ '+t('resUndo')+'</button>';
    }else{
      var m=findMatch(res);
      if(m){
        var pl=m.g===2?placeOf(m.n):null;
        html+='<div class="res-match">'+t('resMatch')+' <b>'+m.n+'</b> ('+m.p[0]+') · '+roleT(m.role)+(pl?', '+t('grpL')+' '+pl:'')+'</div>'
          +'<button class="res-btn">'+t('resBtn')+' '+m.n+' → '+res.n+'</button>';
      }else html+='<div class="res-match">'+t('resNone')+'</div>';
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

  var downMk=null;
  view.addEventListener('pointerdown',function(e){
    view.setPointerCapture(e.pointerId);
    downMk=e.target.closest?e.target.closest('.mk'):null;
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
      else if(pts.size===0&&downMk){downMk.click()}
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
  var steps=[].slice.call(document.querySelectorAll('#tlSteps .tl-step')),
      desc=document.getElementById('tlDesc');
  function cur(){var a=document.querySelector('#tlSteps .tl-step.act');return a?+a.dataset.t:0}
  window.__tlRefresh=function(){if(desc)desc.innerHTML=t('tl'+cur())};
  steps.forEach(function(s){
    s.addEventListener('click',function(){
      steps.forEach(function(x){x.classList.remove('act')});
      s.classList.add('act');
      desc.innerHTML=t('tl'+s.dataset.t);
    });
  });
})();

/* ============ ЧЕК-ЛИСТ ============ */
(function(){
  var boxes=[].slice.call(document.querySelectorAll('#checkList input[type=checkbox]')),
      txt=document.getElementById('cpText'),bar=document.getElementById('cpBar');
  function upd(){
    var n=boxes.filter(function(b){return b.checked}).length;
    txt.textContent=t('cpReady')+' '+n+' / '+boxes.length+(n===boxes.length?t('cpDone'):'');
    bar.style.width=(n/boxes.length*100)+'%';
    bar.style.background=n===boxes.length?'var(--g3)':'var(--terra)';
  }
  window.__cpUpd=upd;
  boxes.forEach(function(b){b.addEventListener('change',upd)});
})();

/* ============ ПЕРЕКЛЮЧЕНИЕ ЯЗЫКА ============ */
function applyI18n(){
  document.documentElement.lang=LANG;
  document.title=t('docTitle');
  var md=document.querySelector('meta[name="description"]');if(md)md.setAttribute('content',t('docDesc'));
  document.querySelectorAll('[data-i18n]').forEach(function(el){el.textContent=t(el.getAttribute('data-i18n'))});
  document.querySelectorAll('[data-i18n-html]').forEach(function(el){el.innerHTML=t(el.getAttribute('data-i18n-html'))});
  document.querySelectorAll('[data-i18n-ph]').forEach(function(el){el.placeholder=t(el.getAttribute('data-i18n-ph'))});
  document.querySelectorAll('[data-i18n-aria]').forEach(function(el){var v=t(el.getAttribute('data-i18n-aria'));el.setAttribute('aria-label',v);el.setAttribute('title',v)});
  renderRoster();renderBlds();renderPairs();renderRes();
  MARKS.forEach(function(m,i){if(mkEls[i])mkEls[i].setAttribute('aria-label',markT(m,i).t)});
  if(window.__tlRefresh)__tlRefresh();
  if(window.__cpUpd)__cpUpd();
  document.querySelectorAll('.lang-sw button').forEach(function(b){b.classList.toggle('act',b.dataset.lang===LANG)});
}
function setLang(l){if(l===LANG)return;LANG=l;try{localStorage.setItem('ts-lang',l)}catch(e){}applyI18n()}
(function(){
  var sw=document.querySelector('.lang-sw');if(!sw)return;
  sw.addEventListener('click',function(e){
    var b=e.target.closest('button[data-lang]');if(b)setLang(b.dataset.lang);
  });
})();
if(LANG!=='ru')applyI18n();else document.querySelectorAll('.lang-sw button').forEach(function(b){b.classList.toggle('act',b.dataset.lang==='ru')});
