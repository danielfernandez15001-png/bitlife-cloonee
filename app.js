/* ═══════════════════════════════════════════════════════════════
   TEXTLIFE  ·  App Controller — Final
   
   Public functions:
     updateUI()             — sync bars + money with state
     addLogEvent(age, text) — inject event at TOP of feed
     triggerEvent()         — random event from array
   
   Systems:
     Modal de decisiones (40% prob al pulsar EDAD+)
     Bottom Sheet (Colegio, Bienes, Relaciones, Actividades)
     NPC interactions, Asset system, updateOccupation
   ═══════════════════════════════════════════════════════════════ */
(function () {
    'use strict';

    const engine = new GameEngine();
    const $ = id => document.getElementById(id);

    /* ── Extra state ──────────────────────────────────────────── */
    let assets = [];
    let npcs = { mom: null, dad: null, teacher: null, classmates: [] };
    let schoolInfo = { name: '', type: 'Público', priv: false };
    let menuStack = [];

    /* helpers */
    function pick(a) { return a[Math.floor(Math.random() * a.length)] }
    function rand(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a }
    function clamp(v, lo = 0, hi = 100) { return Math.max(lo, Math.min(hi, v)) }

    /* NPC names */
    const FN = ['María','Ana','Carmen','Laura','Rosa','Elena','Patricia','Claudia','Sofía','Isabel'];
    const MN = ['Carlos','Juan','Pedro','Miguel','José','Antonio','Fernando','Luis','Andrés','Daniel'];
    const SP = ['Escuela N°12','Colegio Nacional','Inst. Público Juárez','Escuela Fiscal Centro'];
    const SR = ['Colegio Santa María','Inst. Británico','Liceo Americano','Academia del Sol'];
    const CE = ['👧','👦','🧒'];

    function genNPCs() {
        const ln = engine.state.name.split(' ').pop();
        npcs.mom = { nm: pick(FN) + ' ' + ln, e: '👩', role: 'Mamá', rel: engine.state.familyRel || 70 };
        npcs.dad = { nm: pick(MN) + ' ' + ln, e: '👨', role: 'Papá', rel: clamp((engine.state.familyRel || 70) + rand(-10, 10)) };
        regenSchool();
        schoolInfo.priv = Math.random() < .25;
        schoolInfo.name = pick(schoolInfo.priv ? SR : SP);
        schoolInfo.type = schoolInfo.priv ? 'Privado' : 'Público';
    }
    function regenSchool() {
        npcs.teacher = { nm: (Math.random() < .5 ? pick(FN) : pick(MN)) + ' ' + pick(GAME_DATA.lastNames), e: Math.random() < .5 ? '👩‍🏫' : '👨‍🏫', role: 'Profesor(a)', rel: rand(40, 70) };
        npcs.classmates = [];
        for (let i = 0; i < 3; i++) {
            const g = Math.random() < .5;
            npcs.classmates.push({ nm: pick(g ? FN : MN) + ' ' + pick(GAME_DATA.lastNames), e: pick(CE), role: 'Compañero(a)', rel: rand(30, 75) });
        }
    }

    /* ═══════════════════════════════════════════════════════════
       DOM REFS
       ═══════════════════════════════════════════════════════════ */
    const intro = $('intro'), game = $('game'), death = $('death');
    const btnStart = $('btn-start'), btnAge = $('btn-age'), btnRelive = $('btn-relive');
    const shBal = $('sh-bal'), pAvatar = $('p-avatar'), pName = $('p-name'),
          pOcc = $('p-occ'), pLoc = $('p-loc'), pMoney = $('p-money'), pAge = $('p-age');
    const feedEl = $('feed');
    const modalBg = $('modal-bg'), mEmoji = $('m-emoji'), mTitle = $('m-title'),
          mDesc = $('m-desc'), mOpts = $('m-opts');
    const bsOv = $('bs-overlay'), bs = $('bs'), bsBack = $('bs-back'),
          bsTitle = $('bs-title'), bsX = $('bs-x'), bsBody = $('bs-body');
    const dCause = $('d-cause'), dAge = $('d-age'), dMon = $('d-money'), dJob = $('d-job');

    /* ═══════════════════════════════════════════════════════════
       updateUI()  — Sync all bars + money with gameState
       ═══════════════════════════════════════════════════════════ */
    function updateUI() {
        const s = engine.state;
        pAvatar.textContent = ageEmoji(s.age);
        pName.textContent = s.name;
        pLoc.textContent = s.country.flag + ' ' + s.country.name;
        pAge.textContent = 'Edad: ' + s.age;
        pMoney.textContent = engine.formatMoney(s.money);
        shBal.textContent = '💰 ' + engine.formatMoney(s.money);

        updateOccupation(s.job);
        updateBar('happiness', s.happiness);
        updateBar('health', s.health);
        updateBar('intelligence', s.intelligence);
        updateBar('appearance', s.appearance);

        // Degrade assets
        assets.forEach(a => { a.cond = clamp(a.cond - rand(0, 3)) });
    }

    function updateBar(name, val) {
        const fill = $('bar-' + name), num = $('val-' + name);
        if (!fill) return;
        fill.style.width = val + '%';
        num.textContent = val;
        fill.classList.remove('c-red', 'c-mid', 'c-grn');
        if (val < 30) fill.classList.add('c-red');
        else if (val <= 80) fill.classList.add('c-mid');
        else fill.classList.add('c-grn');
    }

    /** Update the occupation/profession text */
    function updateOccupation(text) { pOcc.textContent = text }

    function ageEmoji(a) { return a <= 3 ? '👶' : a <= 12 ? '👦' : a <= 17 ? '🧑' : a <= 45 ? '🧔' : '🧓' }
    function statEmoji(k) { return { health: '❤️', happiness: '😊', intelligence: '🧠', appearance: '✨', familyRel: '👨‍👩‍👦', money: '💵' }[k] || '📊' }

    /* ═══════════════════════════════════════════════════════════
       addLogEvent(age, text)  — Inject event at TOP of feed
       ═══════════════════════════════════════════════════════════ */
    function addLogEvent(age, html, type, changes) {
        const card = document.createElement('div');
        card.className = 'ev ' + (type || '');
        const s = engine.state, yr = s.birthYear + age, stg = engine.getStageName();
        let inner = `<div class="ev-head"><span class="ev-age">Edad: ${age} años</span><span class="ev-stg">${stg}</span><span class="ev-yr">${yr}</span></div><div class="ev-txt">${html}</div>`;
        if (changes) {
            const keys = Object.keys(changes).filter(k => !k.startsWith('_'));
            if (keys.length) {
                inner += '<div class="ev-pills">';
                keys.forEach(k => {
                    const v = changes[k], sg = v > 0 ? '+' : '', cls = v > 0 ? 'up' : 'dn';
                    const lab = k === 'money' ? engine.formatMoney(v) : sg + v;
                    inner += `<span class="ev-pill ${cls}">${statEmoji(k)} ${lab}</span>`;
                });
                inner += '</div>';
            }
        }
        card.innerHTML = inner;
        feedEl.insertBefore(card, feedEl.firstChild);   // TOP of feed
        while (feedEl.children.length > 100) feedEl.removeChild(feedEl.lastChild);
    }

    /* ═══════════════════════════════════════════════════════════
       MODAL  (BitLife-style — emoji gigante, 3+ opciones)
       ═══════════════════════════════════════════════════════════ */
    function showModal(title, desc, emoji, buttons) {
        mEmoji.textContent = emoji || '❓';
        mTitle.textContent = title;
        mDesc.textContent = desc;
        mOpts.innerHTML = '';
        buttons.forEach(b => {
            const btn = document.createElement('button');
            btn.className = 'm-btn' + (b.bad ? ' bad' : '');
            btn.textContent = b.text;
            btn.addEventListener('click', () => {
                modalBg.classList.add('hide');
                btnAge.disabled = false;
                if (b.action) b.action();
            });
            mOpts.appendChild(btn);
        });
        modalBg.classList.remove('hide');
        btnAge.disabled = true;
    }

    /* ═══════════════════════════════════════════════════════════
       triggerEvent()  — Random event array, 40% chance per year
       ═══════════════════════════════════════════════════════════ */
    const EVENTS = [
        { e: '🐕', t: '¡Un perro te muerde!', d: 'Un perro callejero te ataca en la calle. ¿Qué haces?', o: [
            { text: '🏥 Ir al hospital (-$500)', action() { engine.state.money -= 500; engine.state.health = clamp(engine.state.health - 5); addLogEvent(engine.state.age, 'Fuiste al hospital por la mordida.', 'neg', { money: -500, health: -5 }); updateUI() } },
            { text: '🤷 Ignorar la herida', action() { engine.state.health = clamp(engine.state.health - 15); addLogEvent(engine.state.age, 'Ignoraste la mordida. Se infectó.', 'neg', { health: -15 }); updateUI() } },
            { text: '💊 Comprar antibiótoco (-$100)', action() { engine.state.money -= 100; engine.state.health = clamp(engine.state.health - 2); addLogEvent(engine.state.age, 'Te automedicaste. Funcionó más o menos.', 'act', { money: -100, health: -2 }); updateUI() } }
        ]},
        { e: '💸', t: '¡Dinero en la calle!', d: 'Encuentras un sobre con dinero en el suelo. ¿Qué haces?', o: [
            { text: '🤑 Quedártelo (+$500)', action() { engine.state.money += 500; engine.state.happiness = clamp(engine.state.happiness + 5); addLogEvent(engine.state.age, 'Te quedaste el dinero encontrado.', 'pos', { money: 500, happiness: 5 }); updateUI() } },
            { text: '👮 Entregarlo a policía', action() { engine.state.happiness = clamp(engine.state.happiness + 8); addLogEvent(engine.state.age, 'Lo entregaste. Te sientes bien.', 'pos', { happiness: 8 }); updateUI() } },
            { text: '🤝 Repartirlo con un amigo', action() { engine.state.money += 250; engine.state.happiness = clamp(engine.state.happiness + 3); addLogEvent(engine.state.age, 'Repartiste el dinero con un amigo.', 'pos', { money: 250, happiness: 3 }); updateUI() } }
        ]},
        { e: '🤒', t: '¡Enfermedad!', d: 'Tienes fiebre alta, dolor de cuerpo y vómitos.', o: [
            { text: '👨‍⚕️ Doctor (-$800)', action() { engine.state.money -= 800; engine.state.health = clamp(engine.state.health + 5); addLogEvent(engine.state.age, 'El doctor te recetó medicinas.', 'act', { money: -800, health: 5 }); updateUI() } },
            { text: '🛌 Descansar en casa', action() { engine.state.health = clamp(engine.state.health - 4); engine.state.happiness = clamp(engine.state.happiness - 3); addLogEvent(engine.state.age, 'Descansaste pero tardaste en sanar.', 'neg', { health: -4, happiness: -3 }); updateUI() } },
            { text: '💊 Automedicarte', action() { engine.state.health = clamp(engine.state.health - 8); addLogEvent(engine.state.age, 'Te automedicaste. Empeoró.', 'neg', { health: -8 }); updateUI() } }
        ]},
        { e: '🎰', t: '¡Lotería!', d: 'Un amigo te ofrece un boleto de lotería por $100.', o: [
            { text: '🎫 Comprar boleto (-$100)', action() { engine.state.money -= 100; if (Math.random() < .15) { const p = rand(5000, 50000); engine.state.money += p; addLogEvent(engine.state.age, `¡GANASTE ${engine.formatMoney(p)}!`, 'spc', { money: p }); } else { addLogEvent(engine.state.age, 'No ganaste nada. Mala suerte.', 'neg', { money: -100 }); } updateUI() } },
            { text: '🚫 Rechazar', action() { addLogEvent(engine.state.age, 'Decisión prudente, no compraste.', 'act', {}); updateUI() } },
            { text: '🎫🎫 Comprar 3 boletos (-$300)', action() { engine.state.money -= 300; if (Math.random() < .35) { const p = rand(1000, 20000); engine.state.money += p; addLogEvent(engine.state.age, `¡Ganaste ${engine.formatMoney(p)} con 3 boletos!`, 'spc', { money: p }); } else { addLogEvent(engine.state.age, 'Gastaste $300 sin ganar nada.', 'neg', { money: -300 }); } updateUI() } }
        ]},
        { e: '💝', t: 'Admirador(a) secreto', d: 'Alguien te dejó una carta de amor anónima.', o: [
            { text: '🔍 Investigar quién es', action() { engine.state.happiness = clamp(engine.state.happiness + 8); addLogEvent(engine.state.age, 'Descubriste quién fue. ¡Emocionante!', 'pos', { happiness: 8 }); updateUI() } },
            { text: '📥 Guardar la carta', action() { engine.state.happiness = clamp(engine.state.happiness + 3); addLogEvent(engine.state.age, 'Guardaste la carta. Sonríes.', 'pos', { happiness: 3 }); updateUI() } },
            { text: '🗑️ Tirarla a la basura', action() { addLogEvent(engine.state.age, 'Tiraste la carta. La vida sigue.', '', {}); updateUI() } }
        ]},
        { e: '🚗', t: 'Accidente de tráfico', d: 'Un coche te rozó en un cruce. Estás algo golpeado.', o: [
            { text: '🏥 Hospital (-$1200)', action() { engine.state.money -= 1200; engine.state.health = clamp(engine.state.health - 3); addLogEvent(engine.state.age, 'Fuiste al hospital. Nada grave.', 'neg', { money: -1200, health: -3 }); updateUI() } },
            { text: '💪 Caminar al dolor', action() { engine.state.health = clamp(engine.state.health - 10); addLogEvent(engine.state.age, 'Ignoraste el golpe. Te arrepentirás.', 'neg', { health: -10 }); updateUI() } },
            { text: '⚖️ Demandar al conductor', action() { if (Math.random() < .5) { const p = rand(2000, 10000); engine.state.money += p; addLogEvent(engine.state.age, `Ganaste la demanda: +${engine.formatMoney(p)}.`, 'spc', { money: p }); } else { engine.state.money -= 2000; addLogEvent(engine.state.age, 'Perdiste la demanda. Pagaste abogado.', 'neg', { money: -2000 }); } updateUI() } }
        ]}
    ];

    /** triggerEvent() — picks random event from array */
    function triggerEvent() {
        if (Math.random() < 0.40) {
            const ev = pick(EVENTS);
            showModal(ev.t, ev.d, ev.e, ev.o);
            return true;
        }
        return false;
    }

    /* ═══════════════════════════════════════════════════════════
       BOTTOM SHEET CONTROLLER
       ═══════════════════════════════════════════════════════════ */
    function openBS(title, fn) {
        menuStack = [{ title, fn }];
        bsTitle.textContent = title;
        bsBack.classList.add('hide');
        fn(bsBody);
        bsOv.classList.remove('hide');
        requestAnimationFrame(() => bs.classList.add('open'));
    }
    function pushBS(title, fn) {
        menuStack.push({ title, fn });
        bsTitle.textContent = title;
        bsBack.classList.remove('hide');
        fn(bsBody);
    }
    function popBS() {
        if (menuStack.length <= 1) return;
        menuStack.pop();
        const p = menuStack[menuStack.length - 1];
        bsTitle.textContent = p.title;
        if (menuStack.length <= 1) bsBack.classList.add('hide');
        p.fn(bsBody);
    }
    function closeBS() {
        bs.classList.remove('open');
        setTimeout(() => { bsOv.classList.add('hide'); bsBody.innerHTML = ''; menuStack = [] }, 280);
        document.querySelectorAll('.fn').forEach(b => b.classList.remove('on'));
    }
    bsX.addEventListener('click', closeBS);
    bsOv.addEventListener('click', closeBS);
    bsBack.addEventListener('click', popBS);

    function renderMenu(c, items) {
        c.innerHTML = '';
        items.forEach(it => {
            if (it.sec) { const d = document.createElement('div'); d.className = 'bs-sec'; d.textContent = it.sec; c.appendChild(d); return }
            const row = document.createElement('div'); row.className = 'mi';
            let right = '';
            if (it.cond !== undefined) {
                const cc = it.cond < 30 ? 'c-red' : it.cond < 60 ? 'c-mid' : it.cond < 80 ? 'c-mid' : '';
                right = `<div class="mi-cond"><div class="mi-ct"><div class="mi-cf ${cc}" style="width:${it.cond}%;background:${it.cond<30?'var(--red)':it.cond<60?'var(--orange)':it.cond<80?'var(--yellow)':'var(--neon)'}"></div></div><span class="mi-cp">${it.cond}%</span></div>`;
            }
            row.innerHTML = `<span class="mi-ico">${it.ico || '📌'}</span><div class="mi-info"><span class="mi-t">${it.t}</span><span class="mi-s">${it.s || ''}</span></div>${right}${it.kids || it.act ? '<span class="mi-arr">›</span>' : ''}`;
            row.addEventListener('click', () => {
                if (it.kids) pushBS(it.t, c2 => renderMenu(c2, it.kids));
                else if (it.act) it.act();
            });
            c.appendChild(row);
        });
    }

    /* ── Sheet: School / Work ──────────────────────────────────── */
    function sheetSchool(c) {
        const stg = engine.getStage(), items = [];
        if (stg === 'baby') { items.push({ ico: '👶', t: 'Sin escuela', s: 'Necesitas 4+ años' }); }
        else if (stg === 'child' || stg === 'teen') {
            items.push({ sec: 'Tu Colegio' });
            items.push({ ico: '🏫', t: schoolInfo.name, s: schoolInfo.type });
            items.push({ ico: '🔄', t: 'Pedir cambio de colegio', s: schoolInfo.priv ? '→ Público' : '→ Privado', act: doChangeSchool });
            items.push({ sec: 'Profesor(a)' });
            items.push({ ico: npcs.teacher.e, t: npcs.teacher.nm, s: `Relación: ${npcs.teacher.rel}%`, act: () => npcModal(npcs.teacher, 'teacher') });
            items.push({ sec: 'Compañeros' });
            npcs.classmates.forEach(cl => items.push({ ico: cl.e, t: cl.nm, s: `Relación: ${cl.rel}%`, act: () => npcModal(cl, 'mate') }));
        } else {
            items.push({ sec: 'Ocupación Actual' });
            items.push({ ico: '💼', t: engine.state.job, s: engine.state.salary > 0 ? engine.formatMoney(engine.state.salary) + '/año' : 'Sin sueldo' });
            items.push({ ico: '🔍', t: 'Buscar otro empleo', s: 'Nuevas oportunidades', act() { const r = engine.doAction('work'); if (r) { addLogEvent(engine.state.age, r.text, 'act', r.changes); updateUI(); closeBS() } } });
            items.push({ sec: 'Empleos Especiales' });
            items.push({ ico: '🦷', t: 'Dentista', s: 'Requiere uni, Int≥70', act: () => tryJob('Dentista', 60000, 70) });
            items.push({ ico: '🧬', t: 'Bióloga marina', s: 'Requiere uni, Int≥65', act: () => tryJob('Bióloga marina', 48000, 65) });
            items.push({ ico: '🎖️', t: 'Ejército', s: 'Salud≥60', act: () => tryJob('Soldado', 25000, 40, 60) });
            items.push({ ico: '🕵️', t: 'Cazatalentos', s: 'Licencia: $1.200', act: actCaza });
            items.push({ sec: 'Trabajos por horas' });
            items.push({ ico: '🍔', t: 'Comida rápida', s: '$6.000/año', act: () => { engine.state.job = 'Empleado comida rápida'; engine.state.salary = 6000; addLogEvent(engine.state.age, 'Empezaste a trabajar en comida rápida.', 'act', {}); updateUI(); closeBS() } });
            items.push({ ico: '📦', t: 'Repartidor', s: '$7.500/año', act: () => { engine.state.job = 'Repartidor'; engine.state.salary = 7500; addLogEvent(engine.state.age, 'Empezaste como repartidor.', 'act', {}); updateUI(); closeBS() } });
        }
        renderMenu(c, items);
    }

    function tryJob(title, sal, intR, hpR) {
        if (engine.state.intelligence < intR) return showModal('Requisitos', `Necesitas ${intR}% de inteligencia.`, '🚫', [{ text: 'Entendido' }]);
        if (hpR && engine.state.health < hpR) return showModal('Salud', `Necesitas ${hpR}% de salud.`, '🚫', [{ text: 'Entendido' }]);
        engine.state.job = title; engine.state.salary = sal;
        addLogEvent(engine.state.age, `Ahora eres <strong>${title}</strong>.`, 'pos', { happiness: 8 });
        engine.state.happiness = clamp(engine.state.happiness + 8); updateUI(); closeBS();
    }
    function actCaza() {
        showModal('Licencia Cazatalentos', 'Debes pagar $1.200 de licencia. ¿Aceptas?', '🕵️', [
            { text: 'Pagar $1.200', action() { if (engine.state.money < 1200) return addLogEvent(engine.state.age, 'No tienes dinero suficiente.', 'neg', {}); engine.state.money -= 1200; engine.state.job = 'Cazatalentos'; engine.state.salary = 40000; addLogEvent(engine.state.age, 'Pagaste la licencia. Eres <strong>Cazatalentos</strong>.', 'spc', { money: -1200 }); updateUI(); closeBS() } },
            { text: 'No, gracias', bad: true }
        ]);
    }
    function doChangeSchool() {
        if (Math.random() < .6) {
            schoolInfo.priv = !schoolInfo.priv;
            schoolInfo.name = pick(schoolInfo.priv ? SR : SP);
            schoolInfo.type = schoolInfo.priv ? 'Privado' : 'Público';
            regenSchool();
            addLogEvent(engine.state.age, `Cambiaste a <strong>${schoolInfo.name}</strong> (${schoolInfo.type}).`, 'pos', { happiness: 5 });
            engine.state.happiness = clamp(engine.state.happiness + 5);
        } else {
            addLogEvent(engine.state.age, 'Tus padres rechazaron el cambio.', 'neg', { happiness: -3 });
            engine.state.happiness = clamp(engine.state.happiness - 3);
        }
        updateUI(); sheetSchool(bsBody);
    }

    /* ── Sheet: Assets (Bienes con barra de condición) ─────────── */
    function sheetAssets(c) {
        const items = [];
        items.push({ sec: 'Tus Bienes' });
        if (!assets.length) items.push({ ico: '📦', t: 'No tienes bienes', s: 'Compra en la tienda ↓' });
        assets.forEach((a, i) => items.push({ ico: a.ico, t: a.nm, s: engine.formatMoney(a.val), cond: a.cond,
            act: () => showModal(a.nm, `Condición: ${a.cond}%. Valor: ${engine.formatMoney(Math.round(a.val * a.cond / 100))}`, a.ico, [
                { text: `🔧 Reparar (-${engine.formatMoney(Math.round(a.val * .1))})`, action() { const cost = Math.round(a.val * .1); if (engine.state.money >= cost) { engine.state.money -= cost; a.cond = clamp(a.cond + 20); addLogEvent(engine.state.age, `Reparaste tu ${a.nm}.`, 'act', { money: -cost }); updateUI() } } },
                { text: `💰 Vender (${engine.formatMoney(Math.round(a.val * a.cond / 100))})`, action() { engine.state.money += Math.round(a.val * a.cond / 100); assets.splice(i, 1); addLogEvent(engine.state.age, `Vendiste tu ${a.nm}.`, 'pos', { money: Math.round(a.val * a.cond / 100) }); updateUI() } },
                { text: 'Cerrar' }
            ]) }));
        items.push({ sec: 'Tienda' });
        [{ ico: '🚗', nm: 'Coche Deportivo', p: 35000 }, { ico: '🏠', nm: 'Apartamento', p: 120000 }, { ico: '🏍️', nm: 'Motocicleta', p: 8000 }, { ico: '⛵', nm: 'Bote', p: 25000 }, { ico: '💎', nm: 'Reloj de Lujo', p: 5000 }]
            .forEach(it => items.push({ ico: it.ico, t: it.nm, s: engine.formatMoney(it.p),
                act: () => showModal('Comprar ' + it.nm, `¿Comprar por ${engine.formatMoney(it.p)}?`, it.ico, [
                    { text: '✅ Comprar', action() { if (engine.state.money < it.p) return addLogEvent(engine.state.age, 'Dinero insuficiente.', 'neg', {}); engine.state.money -= it.p; assets.push({ ico: it.ico, nm: it.nm, val: it.p, cond: 100 }); addLogEvent(engine.state.age, `Compraste un <strong>${it.nm}</strong>.`, 'spc', { money: -it.p, happiness: 8 }); engine.state.happiness = clamp(engine.state.happiness + 8); updateUI() } },
                    { text: '❌ No', bad: true }
                ]) }));
        renderMenu(c, items);
    }

    /* ── Sheet: Relations ──────────────────────────────────────── */
    function sheetRels(c) {
        c.innerHTML = '';
        const sec = document.createElement('div'); sec.className = 'bs-sec'; sec.textContent = 'Familia'; c.appendChild(sec);
        [npcs.mom, npcs.dad].forEach(n => { if (n) c.appendChild(npcRow(n, 'fam')) });
    }
    function npcRow(n, type) {
        const row = document.createElement('div'); row.className = 'nr';
        const bc = n.rel < 25 ? 'low' : n.rel < 50 ? 'med' : n.rel < 70 ? 'ok' : '';
        row.innerHTML = `<div class="nr-av">${n.e}</div><div class="nr-info"><span class="nr-nm">${n.nm}</span><span class="nr-rl">${n.role}</span></div><div class="nr-bar"><div class="nr-bt"><div class="nr-bf ${bc}" style="width:${n.rel}%"></div></div><span class="nr-p">${n.rel}%</span></div><button class="nr-btn">Interactuar</button>`;
        row.querySelector('.nr-btn').addEventListener('click', () => npcModal(n, type));
        return row;
    }

    /* ── Sheet: Activities ─────────────────────────────────────── */
    function sheetActs(c) {
        renderMenu(c, [
            { sec: 'Acciones' },
            { ico: '📚', t: 'Estudiar', s: '+Inteligencia', act() { qa('study') } },
            { ico: '💪', t: 'Gimnasio', s: '+Salud, +Aspecto', act() { qa('gym') } },
            { ico: '💼', t: 'Buscar Trabajo', s: '+Dinero', act() { qa('work') } },
            { sec: 'Riesgoso' },
            { ico: '🔪', t: 'Crimen', s: 'Alto riesgo', act() { qa('crime') } },
            { sec: 'Ocio' },
            { ico: '🎬', t: 'Ir al cine', s: '-$50, +Felicidad', act() { if (engine.state.money < 50) return addLogEvent(engine.state.age, 'No tienes dinero.', 'neg', {}); engine.state.money -= 50; engine.state.happiness = clamp(engine.state.happiness + 5); addLogEvent(engine.state.age, 'Fuiste al cine. Gran película.', 'pos', { money: -50, happiness: 5 }); updateUI(); closeBS() } },
            { ico: '✈️', t: 'Viajar', s: '-$2000, +Felicidad', act() { if (engine.state.money < 2000) return addLogEvent(engine.state.age, 'No tienes dinero.', 'neg', {}); engine.state.money -= 2000; engine.state.happiness = clamp(engine.state.happiness + 12); addLogEvent(engine.state.age, 'Viajaste. Experiencia increíble.', 'spc', { money: -2000, happiness: 12 }); updateUI(); closeBS() } },
        ]);
    }
    function qa(action) {
        const r = engine.doAction(action); if (!r) return;
        if (r.death) { addLogEvent(engine.state.age, r.text, 'neg', r.changes); updateUI(); showDeath(r.death); closeBS(); return }
        addLogEvent(engine.state.age, r.text, action === 'crime' ? 'neg' : 'act', r.changes); updateUI(); closeBS();
    }

    /* ── NPC Interaction Modal ─────────────────────────────────── */
    function npcModal(n, type) {
        let opts = [];
        if (type === 'fam') {
            opts = [
                { text: '💬 Conversar', action() { npcFx(n, rand(3, 8), 'Buena conversación.', 'pos') } },
                { text: '🎁 Dar regalo', action() { npcFx(n, rand(5, 12), 'Le encantó el regalo.', 'pos') } },
                { text: '🤗 Abrazo', action() { npcFx(n, rand(2, 6), 'Abrazo cálido.', 'pos') } },
                { text: '😤 Discutir', bad: true, action() { npcFx(n, rand(-15, -5), 'Discusión fuerte.', 'neg') } }
            ];
        } else if (type === 'teacher') {
            opts = [
                { text: '📚 Esforzarme', action() { npcFx(n, rand(3, 8), 'Tu profesor lo notó.', 'pos'); engine.state.intelligence = clamp(engine.state.intelligence + rand(2, 4)); updateUI() } },
                { text: '🍎 Llevarle algo', action() { npcFx(n, rand(4, 10), 'Apreció el detalle.', 'pos') } },
                { text: '🤡 Broma en clase', bad: true, action() { npcFx(n, rand(-12, -4), 'No le gustó.', 'neg') } }
            ];
        } else {
            opts = [
                { text: '💬 Hablar', action() { npcFx(n, rand(2, 6), 'Charlaron en el recreo.', 'pos') } },
                { text: '📖 Estudiar juntos', action() { npcFx(n, rand(3, 7), 'Estudiaron juntos.', 'pos'); engine.state.intelligence = clamp(engine.state.intelligence + rand(1, 3)); updateUI() } },
                { text: '👊 Pelear', bad: true, action() { npcFx(n, rand(-20, -8), '¡Se pelearon!', 'neg'); engine.state.health = clamp(engine.state.health - rand(2, 5)); updateUI() } }
            ];
        }
        showModal(n.nm, `${n.role} · Relación: ${n.rel}%`, n.e, opts);
    }
    function npcFx(n, d, txt, type) {
        n.rel = clamp(n.rel + d);
        if (n.role === 'Mamá' || n.role === 'Papá') engine.state.familyRel = clamp(Math.round((npcs.mom.rel + npcs.dad.rel) / 2));
        addLogEvent(engine.state.age, `<strong>${n.nm}</strong>: ${txt}`, type, { familyRel: d }); updateUI();
    }

    /* ═══════════════════════════════════════════════════════════
       EVENT BINDING
       ═══════════════════════════════════════════════════════════ */
    btnStart.addEventListener('click', startGame);
    btnRelive.addEventListener('click', () => { death.classList.add('hide'); death.classList.remove('show'); startGame() });
    btnAge.addEventListener('click', advanceYear);

    document.querySelectorAll('.fn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.fn').forEach(b => b.classList.remove('on'));
            btn.classList.add('on');
            const tab = btn.dataset.tab;
            if (tab === 'school') openBS('🏫 Colegio / Trabajo', sheetSchool);
            if (tab === 'assets') openBS('🏠 Bienes', sheetAssets);
            if (tab === 'rels') openBS('❤️ Relaciones', sheetRels);
            if (tab === 'acts') openBS('⚡ Actividades', sheetActs);
        });
    });

    /* ═══════════════════════════════════════════════════════════
       GAME FLOW
       ═══════════════════════════════════════════════════════════ */
    function startGame() {
        engine.generateCharacter();
        genNPCs(); assets = [];
        intro.classList.remove('show');
        game.classList.add('show');
        feedEl.innerHTML = ''; modalBg.classList.add('hide');
        closeBS(); btnAge.disabled = false;
        updateUI();
        addLogEvent(0, engine.buildBirthNarrative(), 'birth', {});
    }

    function advanceYear() {
        const r = engine.advanceYear();
        if (!r) return;

        let type = '';
        const net = Object.entries(r.changes).filter(([k]) => !k.startsWith('_') && k !== 'money').reduce((s, [, v]) => s + v, 0);
        if (net > 5) type = 'pos'; else if (net < -5) type = 'neg';

        addLogEvent(engine.state.age, r.narrative, type, r.changes);
        updateUI();

        if (r.death) { setTimeout(() => showDeath(r.death), 400); return }

        // Engine dilemma → mandatory modal
        if (r.dilemma) {
            showModal(`Decisión a los ${engine.state.age} años`, r.dilemma.text, '⚡',
                r.dilemma.options.map((o, i) => ({
                    text: o.text,
                    action() {
                        const res = engine.resolveDilemma(i);
                        if (res) {
                            let t2 = `Elegiste: <strong>${res.text}</strong>`;
                            if (res.changes._specialText) t2 += ' ' + res.changes._specialText;
                            addLogEvent(engine.state.age, t2, 'spc', res.changes); updateUI();
                        }
                    }
                }))
            );
            return;
        }

        // 40% random event from triggerEvent()
        triggerEvent();
    }

    function showDeath(cause) {
        dCause.textContent = cause;
        dAge.textContent = engine.state.age + ' años';
        dMon.textContent = engine.formatMoney(engine.state.money);
        dJob.textContent = engine.state.job;
        death.classList.remove('hide'); death.classList.add('show');
    }

})();
