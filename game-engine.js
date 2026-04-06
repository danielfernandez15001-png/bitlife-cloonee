/* ═══════════════════════════════════════════════════════════════
   TEXT-LIFE ENGINE  ·  Core Simulation Engine v2
   — Strict life-stage logic, event memory, family stat
   ═══════════════════════════════════════════════════════════════ */

class GameEngine {
    constructor() {
        this.state = null;
        this.pendingDilemma = null;
        this.inPrison = 0;
        this.hasStudied = false;
        this.hasGym = false;
        this.education = 'none';       // none → primary → secondary → university → graduated
        this.yearsStudied = 0;
        this.crimeRecord = 0;
        this.usedEvents = new Set();   // event-memory: prevents repeats
        this.usedDilemmas = new Set();
        this.lastEvent = '';
    }

    /* ─── Helpers ─────────────────────────────────────────────── */
    rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
    pick(arr) { return arr[this.rand(0, arr.length - 1)]; }
    clamp(v, lo = 0, hi = 100) { return Math.max(lo, Math.min(hi, v)); }

    /** Pick from array WITHOUT repeating recent events (memory system) */
    pickUnique(arr, memoryKey) {
        const available = arr.filter(e => !this.usedEvents.has(e));
        if (available.length === 0) {
            // Reset memory for this pool when exhausted
            arr.forEach(e => this.usedEvents.delete(e));
            return this.pick(arr);
        }
        const chosen = this.pick(available);
        this.usedEvents.add(chosen);
        return chosen;
    }

    formatMoney(n) {
        const c = this.state.country;
        const absN = Math.abs(n);
        let formatted;
        if (absN >= 1_000_000) formatted = (absN / 1_000_000).toFixed(1) + 'M';
        else if (absN >= 1_000) formatted = (absN / 1_000).toFixed(1) + 'K';
        else formatted = absN.toFixed(0);
        return (n < 0 ? '-' : '') + c.symbol + formatted;
    }

    /* ─── Stage detection (strict) ────────────────────────────── */
    getStage() {
        const a = this.state.age;
        if (a <= 3) return 'baby';
        if (a <= 12) return 'child';
        if (a <= 17) return 'teen';
        if (a <= 25) return 'youngAdult';
        if (a <= 45) return 'adult';
        if (a <= 64) return 'middleAge';
        return 'elder';
    }

    getStageName() {
        const map = {
            baby: 'Bebé 👶', child: 'Niñez 👦', teen: 'Adolescencia 🧑',
            youngAdult: 'Adulto Joven 👤', adult: 'Adultez 🧔',
            middleAge: 'Edad Media 👴', elder: 'Vejez 🧓'
        };
        return map[this.getStage()];
    }

    getStageEmoji() {
        const map = { baby:'👶', child:'👦', teen:'🧑', youngAdult:'👤', adult:'🧔', middleAge:'👴', elder:'🧓' };
        return map[this.getStage()];
    }

    /* ─── Strict occupation by stage ──────────────────────────── */
    getStrictOccupation() {
        const stage = this.getStage();
        const s = this.state;
        if (this.inPrison > 0) return 'Preso';
        switch (stage) {
            case 'baby': return 'Bebé';
            case 'child': return 'Estudiante de Primaria';
            case 'teen':  return 'Estudiante de Secundaria';
            default:
                if (this.education === 'university' && s.age < 22) return 'Estudiante Universitario';
                return s.job || 'Desempleado';
        }
    }

    /* ─── Strict money enforcement ────────────────────────────── */
    enforceAgeMoney() {
        const stage = this.getStage();
        if (stage === 'baby') {
            this.state.money = 0;
            this.state.salary = 0;
        }
        // Children can only have small allowance
        if (stage === 'child' && this.state.money > 500) {
            this.state.money = this.rand(0, 200);
        }
    }

    /* ─── Job tier from intelligence ──────────────────────────── */
    getJobTier() {
        const intel = this.state.intelligence;
        if (this.education === 'graduated' && intel >= 70) return 'highEducation';
        if (intel >= 55) return 'mediumEducation';
        if (intel >= 35) return 'lowEducation';
        return 'noEducation';
    }

    /* ═══════════════════════════════════════════════════════════
       CHARACTER GENERATION
       ═══════════════════════════════════════════════════════════ */
    generateCharacter() {
        const country = this.pick(GAME_DATA.countries);
        const gender = Math.random() < 0.5 ? 'male' : 'female';
        const firstName = this.pick(gender === 'male' ? GAME_DATA.maleNames : GAME_DATA.femaleNames);
        const lastName = this.pick(GAME_DATA.lastNames);
        const family = this.pick(GAME_DATA.familySituations);

        this.state = {
            name: `${firstName} ${lastName}`,
            gender,
            country,
            family,
            age: 0,
            birthYear: new Date().getFullYear(),
            health: family.health,
            happiness: family.happiness,
            intelligence: family.intelligence,
            appearance: family.appearance,
            familyRel: family.familyRel || this.rand(55, 85),
            money: 0,          // ALWAYS $0 at birth
            job: 'Bebé',
            salary: 0,
            alive: true
        };

        // Reset engine state
        this.pendingDilemma = null;
        this.inPrison = 0;
        this.hasStudied = false;
        this.hasGym = false;
        this.education = 'none';
        this.yearsStudied = 0;
        this.crimeRecord = 0;
        this.usedEvents = new Set();
        this.usedDilemmas = new Set();
        this.lastEvent = '';

        return {
            narrative: this.buildBirthNarrative(),
            changes: {},
            stage: 'baby',
            dilemma: null
        };
    }

    buildBirthNarrative() {
        const s = this.state;
        const g = s.gender === 'male' ? 'niño' : 'niña';
        return `<strong>${s.name}</strong> nació en <strong>${s.country.name}</strong> ${s.country.flag}. ` +
            `Un ${g} que llega al mundo. ` +
            `<em>${s.family.desc}</em> ${s.family.detail}`;
    }

    /* ═══════════════════════════════════════════════════════════
       ADVANCE YEAR  (main loop)
       ═══════════════════════════════════════════════════════════ */
    advanceYear() {
        if (!this.state.alive) return null;

        this.state.age++;
        this.hasStudied = false;
        this.hasGym = false;
        const changes = {};
        const narrativeParts = [];
        const stage = this.getStage();

        // ── Enforce strict occupation ────────────────────────
        this.state.job = this.getStrictOccupation();

        // ── Prison check ─────────────────────────────────────
        if (this.inPrison > 0) {
            this.inPrison--;
            this.modStat(changes, 'happiness', -8);
            this.modStat(changes, 'health', -3);
            this.modStat(changes, 'familyRel', -5);
            if (this.inPrison === 0) {
                narrativeParts.push('Cumpliste tu condena y sales de prisión. La libertad nunca se sintió tan bien.');
                this.state.job = 'Desempleado';
            } else {
                narrativeParts.push(`Otro año en prisión. Te quedan ${this.inPrison} año(s) de condena.`);
            }
            this.applyChanges(changes);
            this.enforceAgeMoney();
            this.state.job = this.getStrictOccupation();
            return this.buildResult(narrativeParts.join(' '), changes, stage, null);
        }

        // ── Year event (age-appropriate, no repeats) ─────────
        const eventPool = GAME_DATA.yearEvents[stage] || GAME_DATA.yearEvents.adult;
        const yearEvent = this.pickUnique(eventPool);
        narrativeParts.push(yearEvent);

        // ── Country random event (≥50% chance) ───────────────
        if (Math.random() < 0.55) {
            const countryEvent = this.pickUnique(this.state.country.events);
            narrativeParts.push(countryEvent);
            const rStat = this.pick(['health', 'happiness', 'familyRel']);
            const rVal = this.rand(-5, 5);
            this.modStat(changes, rStat, rVal);
        }

        // ── Age effects ──────────────────────────────────────
        this.applyAgeEffects(changes, stage);

        // ── Salary income (only adults with jobs) ────────────
        if (stage !== 'baby' && stage !== 'child' && this.state.salary > 0) {
            const income = Math.round(this.state.salary * this.state.country.costMult);
            this.modStat(changes, 'money', income);
        }

        // ── Education auto-progression ───────────────────────
        this.progressEducation(narrativeParts, changes, stage);

        // ── Enforce strict rules ─────────────────────────────
        this.applyChanges(changes);
        this.enforceAgeMoney();
        this.state.job = this.getStrictOccupation();

        // ── Health risk → death check ────────────────────────
        const deathResult = this.checkDeath();
        if (deathResult) {
            return { ...this.buildResult(narrativeParts.join(' '), changes, stage, null), death: deathResult };
        }

        // ── Dilemma? (~40%, age ≥ 6) ─────────────────────────
        let dilemma = null;
        if (this.state.age >= 6 && Math.random() < 0.40) {
            dilemma = this.generateDilemma(stage);
        }

        return this.buildResult(narrativeParts.join(' '), changes, stage, dilemma);
    }

    /* ─── Age-based stat drift ────────────────────────────────── */
    applyAgeEffects(changes, stage) {
        switch (stage) {
            case 'baby':
                this.modStat(changes, 'appearance', this.rand(0, 2));
                this.modStat(changes, 'familyRel', this.rand(0, 4));
                break;
            case 'child':
                this.modStat(changes, 'intelligence', this.rand(-1, 4));
                this.modStat(changes, 'happiness', this.rand(-2, 4));
                this.modStat(changes, 'familyRel', this.rand(-2, 3));
                break;
            case 'teen':
                this.modStat(changes, 'appearance', this.rand(-2, 5));
                this.modStat(changes, 'intelligence', this.rand(-1, 3));
                this.modStat(changes, 'happiness', this.rand(-5, 4));
                this.modStat(changes, 'familyRel', this.rand(-6, 2)); // teen rebellion
                break;
            case 'youngAdult':
                this.modStat(changes, 'health', this.rand(-2, 2));
                this.modStat(changes, 'happiness', this.rand(-3, 3));
                this.modStat(changes, 'familyRel', this.rand(-3, 3));
                break;
            case 'adult':
                this.modStat(changes, 'health', this.rand(-4, 1));
                this.modStat(changes, 'appearance', this.rand(-3, 1));
                this.modStat(changes, 'familyRel', this.rand(-2, 2));
                break;
            case 'middleAge':
                this.modStat(changes, 'health', this.rand(-6, 0));
                this.modStat(changes, 'appearance', this.rand(-4, 0));
                this.modStat(changes, 'familyRel', this.rand(-2, 3));
                break;
            case 'elder':
                this.modStat(changes, 'health', this.rand(-10, -1));
                this.modStat(changes, 'appearance', this.rand(-5, -1));
                this.modStat(changes, 'intelligence', this.rand(-4, 0));
                this.modStat(changes, 'familyRel', this.rand(-1, 4));
                break;
        }
    }

    /* ─── Education progression ────────────────────────────────── */
    progressEducation(parts, changes, stage) {
        if (stage === 'child' && this.education === 'none' && this.state.age >= 6) {
            this.education = 'primary';
            parts.push('Comenzaste la escuela primaria.');
            this.modStat(changes, 'intelligence', 3);
        }
        if (stage === 'teen' && this.education === 'primary' && this.state.age >= 13) {
            this.education = 'secondary';
            parts.push('Entraste a la escuela secundaria.');
            this.modStat(changes, 'intelligence', 3);
        }
        if (stage === 'youngAdult' && this.education === 'secondary' && this.state.age === 18) {
            if (this.state.intelligence >= 50) {
                this.education = 'university';
                parts.push('¡Fuiste aceptado en la universidad!');
                this.modStat(changes, 'intelligence', 5);
                this.modStat(changes, 'happiness', 5);
                this.modStat(changes, 'familyRel', 8);
            } else {
                parts.push('No alcanzaste los requisitos para la universidad. Tendrás que buscar otro camino.');
                this.modStat(changes, 'happiness', -8);
                this.modStat(changes, 'familyRel', -5);
            }
        }
        if (this.education === 'university' && this.state.age === 22) {
            this.education = 'graduated';
            parts.push('¡Te graduaste de la universidad! El futuro se ve brillante.');
            this.modStat(changes, 'intelligence', 8);
            this.modStat(changes, 'happiness', 10);
            this.modStat(changes, 'familyRel', 10);
        }
    }

    /* ─── Death check ─────────────────────────────────────────── */
    checkDeath() {
        const h = this.state.health;
        const a = this.state.age;
        let prob = 0;

        if (h <= 0) { prob = 0.95; }
        else if (h <= 10) prob = 0.50;
        else if (h <= 20) prob = 0.20;
        else if (h <= 30) prob = 0.08;
        else if (h <= 50) prob = 0.015;
        else prob = 0.003;

        if (a >= 90) prob += 0.35;
        else if (a >= 80) prob += 0.20;
        else if (a >= 70) prob += 0.10;
        else if (a >= 60) prob += 0.04;
        else if (a >= 40) prob += 0.008;

        // Baby/child: very rare accidental death
        if (a <= 12) prob = Math.min(prob, 0.005);

        if (a >= 100) prob = 0.55;
        if (a >= 110) prob = 0.90;

        prob = Math.min(prob, 0.95);

        if (Math.random() < prob) {
            this.state.alive = false;
            let cause;
            if (a >= 70) cause = this.pick(GAME_DATA.deathCauses.oldAge);
            else if (h <= 20) cause = this.pick(GAME_DATA.deathCauses.disease);
            else cause = this.pick([...GAME_DATA.deathCauses.disease, ...GAME_DATA.deathCauses.accident]);
            return `Falleciste a los ${a} años por ${cause}.`;
        }
        return null;
    }

    /* ─── Dilemma generation (with memory) ────────────────────── */
    generateDilemma(stage) {
        let pool;
        if (stage === 'child') pool = GAME_DATA.dilemmas.child;
        else if (stage === 'teen') pool = GAME_DATA.dilemmas.teen;
        else if (stage === 'youngAdult') pool = GAME_DATA.dilemmas.youngAdult;
        else if (stage === 'adult') pool = GAME_DATA.dilemmas.adult;
        else if (stage === 'middleAge') pool = GAME_DATA.dilemmas.middleAge;
        else if (stage === 'elder') pool = GAME_DATA.dilemmas.elder;
        else return null;

        if (!pool || pool.length === 0) return null;

        // Filter out already-used dilemmas
        const available = pool.filter(d => !this.usedDilemmas.has(d.text));
        if (available.length === 0) {
            // Reset dilemma memory for this stage
            pool.forEach(d => this.usedDilemmas.delete(d.text));
            return this.generateDilemma(stage);
        }

        const d = this.pick(available);
        this.usedDilemmas.add(d.text);
        this.pendingDilemma = d;
        return d;
    }

    /* ─── Resolve dilemma choice ──────────────────────────────── */
    resolveDilemma(optionIndex) {
        if (!this.pendingDilemma) return null;
        const opt = this.pendingDilemma.options[optionIndex];
        if (!opt) return null;

        const changes = {};
        for (const [key, val] of Object.entries(opt.effects)) {
            if (key === 'money') {
                if (typeof val === 'string') this.resolveSpecialMoney(val, changes);
                else this.modStat(changes, 'money', val);
            } else {
                this.modStat(changes, key, val);
            }
        }

        this.applyChanges(changes);
        this.enforceAgeMoney();
        this.state.job = this.getStrictOccupation();
        this.pendingDilemma = null;

        return { text: opt.text, changes };
    }

    resolveSpecialMoney(type, changes) {
        const m = this.state.money;
        switch (type) {
            case 'crypto': {
                if (Math.random() < 0.3) {
                    this.modStat(changes, 'money', m * 3);
                    changes._specialText = '¡La criptomoneda explotó! Triplicaste tu inversión.';
                } else {
                    this.modStat(changes, 'money', -Math.round(m * 0.8));
                    changes._specialText = 'La criptomoneda se desplomó. Perdiste casi todo.';
                }
                break;
            }
            case 'halfcrypto': {
                const half = Math.round(m / 2);
                if (Math.random() < 0.4) {
                    this.modStat(changes, 'money', half * 2);
                    changes._specialText = '¡Duplicaste la mitad de tus ahorros!';
                } else {
                    this.modStat(changes, 'money', -half);
                    changes._specialText = 'Perdiste la mitad de tu inversión en cripto.';
                }
                break;
            }
            case 'smartcrypto': {
                if (Math.random() < 0.55) {
                    this.modStat(changes, 'money', Math.round(m * 0.5));
                    changes._specialText = 'Tu investigación pagó: ganancia moderada y segura.';
                } else {
                    this.modStat(changes, 'money', -Math.round(m * 0.15));
                    changes._specialText = 'Pese a investigar, tuviste una pequeña pérdida.';
                }
                break;
            }
            case 'scam': {
                if (Math.random() < 0.7) {
                    this.modStat(changes, 'money', -Math.round(m * 0.6));
                    changes._specialText = 'Era una estafa. Perdiste la mayor parte.';
                    this.modStat(changes, 'happiness', -15);
                } else {
                    this.modStat(changes, 'money', Math.round(m * 0.8));
                    changes._specialText = 'Contra todo pronóstico, el negocio dio frutos.';
                    this.modStat(changes, 'happiness', 10);
                }
                break;
            }
            case 'investigate': {
                if (Math.random() < 0.6) {
                    changes._specialText = 'Tu investigación reveló que era una estafa. Esquivaste la bala.';
                    this.modStat(changes, 'happiness', 5);
                } else {
                    this.modStat(changes, 'money', Math.round(m * 0.4));
                    changes._specialText = 'Investigaste, resultó legítimo. Inversión exitosa.';
                }
                break;
            }
        }
    }

    /* ═══════════════════════════════════════════════════════════
       QUICK ACTIONS
       ═══════════════════════════════════════════════════════════ */
    doAction(action) {
        if (!this.state.alive) return null;
        const changes = {};
        let text = '';
        const stage = this.getStage();

        switch (action) {
            case 'study': {
                if (this.hasStudied) return { text: 'Ya estudiaste este año. Descansa un poco.', changes: {} };
                this.hasStudied = true;
                const gain = this.rand(3, 8);
                this.modStat(changes, 'intelligence', gain);
                this.modStat(changes, 'happiness', this.rand(-3, 2));
                this.modStat(changes, 'familyRel', this.rand(1, 4));
                text = stage === 'child'
                    ? 'Hiciste la tarea con mucho esfuerzo. Tu cerebro crece.'
                    : stage === 'teen'
                    ? 'Estudiaste para los exámenes. Te sientes más preparado.'
                    : 'Dedicaste largas horas al estudio. Tu mente se expande.';
                break;
            }
            case 'gym': {
                if (stage === 'baby') return { text: 'Los bebés no van al gimnasio...', changes: {} };
                if (this.hasGym) return { text: 'Ya hiciste ejercicio este año.', changes: {} };
                this.hasGym = true;
                this.modStat(changes, 'health', this.rand(2, 6));
                this.modStat(changes, 'appearance', this.rand(1, 4));
                this.modStat(changes, 'happiness', this.rand(1, 4));
                text = stage === 'child'
                    ? 'Jugaste deportes con tus amigos. ¡Fue muy divertido!'
                    : stage === 'elder'
                    ? 'Hiciste ejercicio suave. A tu edad, cada movimiento cuenta.'
                    : 'Fuiste al gimnasio y te sientes más fuerte y en forma.';
                break;
            }
            case 'work': {
                if (this.state.age < 16) return { text: 'Eres demasiado joven para trabajar.', changes: {} };
                if (this.inPrison > 0) return { text: 'No puedes buscar trabajo desde la prisión.', changes: {} };

                const tier = this.getJobTier();
                const jobList = GAME_DATA.jobs[tier];
                const job = this.pick(jobList);
                const salary = Math.round(job.salary * this.state.country.costMult);

                if (this.state.job === job.title) {
                    const raise = this.rand(5, 15);
                    this.state.salary = Math.round(this.state.salary * (1 + raise / 100));
                    this.modStat(changes, 'happiness', 5);
                    text = `Negociaste un aumento del ${raise}% como ${job.title}.`;
                } else {
                    this.state.job = job.title;
                    this.state.salary = salary;
                    this.modStat(changes, 'happiness', 3);
                    text = `Conseguiste empleo como <strong>${job.title}</strong> (${this.formatMoney(salary)}/año).`;
                }
                break;
            }
            case 'crime': {
                if (this.state.age < 14) return { text: 'No tienes edad para eso...', changes: {} };
                if (this.inPrison > 0) return { text: 'Ya estás en prisión.', changes: {} };

                const crime = this.pick(GAME_DATA.crimeOutcomes);
                const caught = Math.random() < crime.risk;

                if (caught) {
                    const sentence = this.pick(GAME_DATA.prisonSentences);
                    const years = parseInt(sentence.match(/\d+/)[0]);
                    this.inPrison = years;
                    this.crimeRecord++;
                    this.modStat(changes, 'happiness', -15);
                    this.modStat(changes, 'health', -5);
                    this.modStat(changes, 'familyRel', -12);
                    text = `${crime.text} Pero... ${sentence}`;
                    this.state.job = 'Preso';
                    this.state.salary = 0;

                    if (Math.random() < 0.08) {
                        this.state.alive = false;
                        const cause = this.pick(GAME_DATA.deathCauses.crime);
                        this.applyChanges(changes);
                        return {
                            text: `Intentaste cometer un crimen y terminaste muriendo por ${cause}.`,
                            changes,
                            death: `Falleciste a los ${this.state.age} años por ${cause}.`
                        };
                    }
                } else {
                    const gain = Math.round(crime.money * this.state.country.costMult);
                    this.modStat(changes, 'money', gain);
                    this.modStat(changes, 'happiness', crime.happiness);
                    this.modStat(changes, 'health', crime.health);
                    this.modStat(changes, 'familyRel', -5);
                    text = crime.text;
                }
                break;
            }
        }

        this.applyChanges(changes);
        this.enforceAgeMoney();
        this.state.job = this.getStrictOccupation();
        return { text, changes };
    }

    /* ─── Stat modification helpers ───────────────────────────── */
    modStat(changes, stat, delta) {
        if (delta === 0) return;
        if (!changes[stat]) changes[stat] = 0;
        changes[stat] += Math.round(delta);
    }

    applyChanges(changes) {
        for (const [key, val] of Object.entries(changes)) {
            if (key.startsWith('_')) continue;
            if (key === 'money') {
                this.state.money += val;
            } else if (key in this.state) {
                this.state[key] = this.clamp(this.state[key] + val);
            }
        }
    }

    buildResult(narrative, changes, stage, dilemma) {
        return { narrative, changes, stage, dilemma };
    }
}
