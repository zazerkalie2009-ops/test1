const state = { crystals: 2480, energy: 7, ready: { Элори: 140, Фонея: 80 }, spinning: false };
const $ = (s) => document.querySelector(s);
const format = (n) => n.toLocaleString('ru-RU');
function update() { $('#crystalValue').textContent = format(state.crystals); $('#energyValue').textContent = state.energy; $('#readyTotal').textContent = Object.values(state.ready).reduce((a,b)=>a+b,0); }
function toast(message) { const el=$('#toast'); el.textContent=message; el.classList.add('show'); clearTimeout(toast.timer); toast.timer=setTimeout(()=>el.classList.remove('show'),2200); }
function collect(moon) { const amount=state.ready[moon]; if(!amount) return toast('Эта луна ещё заряжается'); state.crystals+=amount; delete state.ready[moon]; const button=[...document.querySelectorAll('[data-moon]')].find(x=>x.dataset.moon===moon); button.classList.remove('moon-ready'); button.classList.add('moon-charging'); button.querySelector('small').textContent='08:24'; $('#naviText').textContent='Отлично! Заряди луну, чтобы вырастить ещё кристаллы.'; update(); toast(`+${amount} кристаллов · ${moon}`); }
document.querySelectorAll('.moon').forEach(b=>b.addEventListener('click',()=>collect(b.dataset.moon)));
$('#collectAll').addEventListener('click',()=>{const total=Object.values(state.ready).reduce((a,b)=>a+b,0); if(!total)return toast('Пока нечего собирать'); Object.keys({...state.ready}).forEach(collect);});
$('#chargeAll').addEventListener('click',()=>{if(state.energy<1)return toast('Нужно больше энергии'); state.energy--; $('#naviText').textContent='Луны заряжены. Кристаллы вырастут совсем скоро!'; update(); toast('Луны заряжены · −1 энергия');});
const sheets={tasks:'#tasksSheet',wheel:'#wheelSheet',draws:'#drawsSheet'};
function closeSheets(){document.querySelectorAll('.sheet').forEach(x=>x.classList.add('hidden'));}
document.querySelectorAll('.nav-item').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.nav-item').forEach(x=>x.classList.remove('active'));b.classList.add('active');closeSheets();if(sheets[b.dataset.view])$(sheets[b.dataset.view]).classList.remove('hidden');}));
document.querySelectorAll('.close-sheet').forEach(b=>b.addEventListener('click',()=>{closeSheets();document.querySelector('[data-view=home]').click();}));
$('#planetButton').addEventListener('click',()=>toast('Магазин планеты появится в следующей версии'));
$('#spinWheel').addEventListener('click',()=>{if(state.spinning)return;state.spinning=true;const w=$('.wheel');w.style.transition='transform 2s cubic-bezier(.16,.75,.18,1)';w.style.transform='rotate(1080deg)';setTimeout(()=>{state.crystals+=250;update();toast('Приз колеса: +250 кристаллов!');w.style.transition='none';w.style.transform='rotate(0)';state.spinning=false;},2100);});
document.querySelectorAll('.task-go,.prize-card button').forEach(b=>b.addEventListener('click',()=>toast('Механика доступна в полном продукте')));
update();
