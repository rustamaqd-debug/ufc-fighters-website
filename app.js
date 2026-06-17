// --- UFC PORTAL APPLICATION LOGIC ---

document.addEventListener('DOMContentLoaded', () => {
    // Application State
    const state = {
        activeTab: 'section-fighters',
        searchQuery: '',
        weightFilter: 'all',
        selectedFighters: [null, null], // [Fighter 1, Fighter 2]
        championsList: ['jon_jones', 'islam_makhachev', 'alex_pereira', 'ilia_topuria', 'alexandre_pantoja']
    };

    // DOM Elements
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.content-section');
    const searchInput = document.getElementById('fighter-search');
    const weightChips = document.querySelectorAll('.chip');
    const fightersGrid = document.getElementById('fighters-grid-container');
    const championsGrid = document.getElementById('champions-grid-container');

    // Modals
    const detailModal = document.getElementById('fighter-modal');
    const detailModalClose = document.getElementById('modal-close');
    const selectModal = document.getElementById('select-modal');
    const selectModalClose = document.getElementById('select-modal-close');
    const selectGrid = document.getElementById('select-grid-container');

    // Simulator Elements
    const selectBox1 = document.getElementById('select-fighter-1');
    const selectBox2 = document.getElementById('select-fighter-2');
    const startSimBtn = document.getElementById('start-simulation-btn');
    const simTip = document.getElementById('sim-tip');
    const comparisonPanel = document.getElementById('comparison-stats-panel');
    const comparisonBars = document.getElementById('comparison-bars-container');
    const simConsole = document.getElementById('sim-console');
    const consoleOutput = document.getElementById('console-output');

    let currentSelectSlot = null; // 1 or 2 for simulation selection

    // --- INITIALIZATION ---
    function init() {
        setupNavigation();
        setupFilters();
        renderCatalog();
        renderChampions();
        setupSimulatorEvents();
        setupModals();
    }

    // --- NAVIGATION ---
    function setupNavigation() {
        navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetSectionId = btn.getAttribute('data-target');
                
                // Update buttons
                navButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Update sections
                sections.forEach(sec => {
                    sec.classList.remove('active');
                    if (sec.id === targetSectionId) {
                        sec.classList.add('active');
                    }
                });

                state.activeTab = targetSectionId;

                // Scroll to top of section for better UX
                if (targetSectionId !== 'section-fighters') {
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                }
            });
        });

        // Hero actions linking
        document.querySelector('.hero-actions .btn-primary').addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('btn-fighters').click();
        });
        document.querySelector('.hero-actions .btn-secondary').addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('btn-matchup').click();
        });
    }

    // --- FILTERS & SEARCH ---
    function setupFilters() {
        searchInput.addEventListener('input', (e) => {
            state.searchQuery = e.target.value.toLowerCase().trim();
            renderCatalog();
        });

        weightChips.forEach(chip => {
            chip.addEventListener('click', () => {
                weightChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                state.weightFilter = chip.getAttribute('data-filter');
                renderCatalog();
            });
        });
    }

    // --- RENDER CATALOG ---
    function renderCatalog() {
        fightersGrid.innerHTML = '';

        const filtered = fighters.filter(f => {
            const matchesSearch = f.name.toLowerCase().includes(state.searchQuery) || 
                                  f.nickname.toLowerCase().includes(state.searchQuery) ||
                                  f.division.toLowerCase().includes(state.searchQuery);
            const matchesWeight = state.weightFilter === 'all' || f.division === state.weightFilter;
            return matchesSearch && matchesWeight;
        });

        if (filtered.length === 0) {
            fightersGrid.innerHTML = `
                <div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                    <i class="fa-solid fa-face-frown" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>Бойцы не найдены. Попробуйте изменить параметры поиска.</p>
                </div>
            `;
            return;
        }

        filtered.forEach(fighter => {
            const isChamp = state.championsList.includes(fighter.id);
            const card = createFighterCard(fighter, isChamp);
            fightersGrid.appendChild(card);
        });
    }

    // --- RENDER CHAMPIONS ---
    function renderChampions() {
        championsGrid.innerHTML = '';
        
        const champs = fighters.filter(f => state.championsList.includes(f.id));
        
        champs.forEach(fighter => {
            const card = createFighterCard(fighter, true);
            card.classList.add('champ-card');
            championsGrid.appendChild(card);
        });
    }

    // --- CREATE CARD ELEMENT ---
    function createFighterCard(fighter, isChamp) {
        const card = document.createElement('div');
        card.className = `fighter-card ${isChamp ? 'is-champion' : ''}`;
        card.setAttribute('data-id', fighter.id);

        card.innerHTML = `
            <div class="card-img-container" style="background-image: linear-gradient(rgba(20, 20, 25, 0.1), rgba(20, 20, 25, 0.9)), url('assets/fighter_card_bg.png');">
                ${isChamp ? '<div class="champion-badge"><i class="fa-solid fa-crown"></i> Чемпион</div>' : ''}
                <div class="card-gradient"></div>
                <div class="card-flag">${fighter.flag}</div>
            </div>
            <div class="card-details">
                <div class="card-header-info">
                    <div class="card-nickname">${fighter.nickname !== '—' ? `"${fighter.nickname}"` : '&nbsp;'}</div>
                    <div class="card-name">${fighter.name}</div>
                    <div class="card-division-badge">${translateDivision(fighter.division)}</div>
                </div>
                <div class="card-footer">
                    <div class="card-record">${fighter.record}</div>
                    <div class="card-action-text">Статистика <i class="fa-solid fa-arrow-right"></i></div>
                </div>
            </div>
        `;

        card.addEventListener('click', () => {
            openFighterModal(fighter.id);
        });

        return card;
    }

    // --- TRANSLATION HELPER ---
    function translateDivision(div) {
        const divisions = {
            'Heavyweight': 'Тяжелый вес',
            'Light Heavyweight': 'Полутяжелый вес',
            'Middleweight': 'Средний вес',
            'Welterweight': 'Полусредний вес',
            'Lightweight': 'Легкий вес',
            'Featherweight': 'Полулегкий вес',
            'Bantamweight': 'Легчайший вес',
            'Flyweight': 'Наилегчайший вес'
        };
        return divisions[div] || div;
    }

    // --- DETAILED MODAL & RADAR CHART ---
    function setupModals() {
        detailModalClose.addEventListener('click', () => {
            detailModal.classList.remove('open');
        });
        
        detailModal.addEventListener('click', (e) => {
            if (e.target === detailModal) {
                detailModal.classList.remove('open');
            }
        });

        selectModalClose.addEventListener('click', () => {
            selectModal.classList.remove('open');
        });

        selectModal.addEventListener('click', (e) => {
            if (e.target === selectModal) {
                selectModal.classList.remove('open');
            }
        });
    }

    function openFighterModal(fighterId) {
        const fighter = fighters.find(f => f.id === fighterId);
        if (!fighter) return;

        // Fill data
        document.getElementById('modal-img').src = 'assets/fighter_card_bg.png'; // consistent themed placeholder style
        document.getElementById('modal-name').innerText = fighter.name;
        document.getElementById('modal-nickname').innerText = fighter.nickname !== '—' ? `"${fighter.nickname}"` : '';
        document.getElementById('modal-country').innerText = `${fighter.nationality} ${fighter.flag}`;
        document.getElementById('modal-record').innerText = fighter.record;
        document.getElementById('modal-height').innerText = fighter.height;
        document.getElementById('modal-reach').innerText = fighter.reach;
        document.getElementById('modal-stance').innerText = translateStance(fighter.stance);
        document.getElementById('modal-age').innerText = `${fighter.age} лет`;
        document.getElementById('modal-bio').innerText = fighter.bio;

        // Open modal window
        detailModal.classList.add('open');

        // Draw Canvas Radar Chart
        setTimeout(() => {
            drawRadarChart(fighter.stats);
        }, 100);
    }

    function translateStance(stance) {
        const stances = {
            'Orthodox': 'Правосторонняя (Ортодокс)',
            'Southpaw': 'Левосторонняя (Левша)',
            'Switch': 'Свитч (Меняет стойки)'
        };
        return stances[stance] || stance;
    }

    function drawRadarChart(stats) {
        const canvas = document.getElementById('radar-chart');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const width = canvas.width;
        const height = canvas.height;
        const center = width / 2;
        const radius = width * 0.35;
        
        const labels = ['Ударка', 'Борьба', 'Грэпплинг', 'Кардио', 'Сила', 'Защита'];
        const keys = ['striking', 'wrestling', 'grappling', 'cardio', 'power', 'defense'];
        const numAxes = labels.length;
        
        // 1. Draw web grids (concentric hexagons)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        const gridLevels = 5;
        
        for (let level = 1; level <= gridLevels; level++) {
            const levelRadius = radius * (level / gridLevels);
            ctx.beginPath();
            for (let i = 0; i < numAxes; i++) {
                const angle = (i * 2 * Math.PI / numAxes) - Math.PI / 2;
                const x = center + levelRadius * Math.cos(angle);
                const y = center + levelRadius * Math.sin(angle);
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.closePath();
            ctx.stroke();
        }

        // 2. Draw axes lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        for (let i = 0; i < numAxes; i++) {
            const angle = (i * 2 * Math.PI / numAxes) - Math.PI / 2;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            ctx.beginPath();
            ctx.moveTo(center, center);
            ctx.lineTo(x, y);
            ctx.stroke();
        }

        // 3. Draw Labels
        ctx.fillStyle = '#9FA2B2';
        ctx.font = '700 11px "Oxanium", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        for (let i = 0; i < numAxes; i++) {
            const angle = (i * 2 * Math.PI / numAxes) - Math.PI / 2;
            // Push labels slightly outwards from the hexagon vertices
            const labelX = center + (radius + 20) * Math.cos(angle);
            const labelY = center + (radius + 12) * Math.sin(angle);
            ctx.fillText(labels[i], labelX, labelY);
        }

        // 4. Draw Data Polygon
        const points = [];
        ctx.beginPath();
        for (let i = 0; i < numAxes; i++) {
            const statValue = stats[keys[i]]; // value 0 to 100
            const valueRadius = radius * (statValue / 100);
            const angle = (i * 2 * Math.PI / numAxes) - Math.PI / 2;
            const x = center + valueRadius * Math.cos(angle);
            const y = center + valueRadius * Math.sin(angle);
            points.push({x, y, val: statValue});
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();
        
        // Fill area
        ctx.fillStyle = 'rgba(226, 27, 44, 0.35)'; // crimson red semi-transparent
        ctx.fill();
        
        // Draw border line
        ctx.strokeStyle = '#E21B2C';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // 5. Draw data points handles and labels values
        points.forEach(pt => {
            // Circle handles
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 4, 0, 2 * Math.PI);
            ctx.fillStyle = '#D4AF37'; // gold dots
            ctx.fill();
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Value text tags
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 9px "Outfit", sans-serif';
            // Offset text slightly from point
            const textOffset = 10;
            const angleFromCenter = Math.atan2(pt.y - center, pt.x - center);
            const textX = pt.x + textOffset * Math.cos(angleFromCenter);
            const textY = pt.y + textOffset * Math.sin(angleFromCenter);
            ctx.fillText(pt.val, textX, textY);
        });
    }

    // --- MATCHUP SIMULATOR LOGIC ---
    function setupSimulatorEvents() {
        selectBox1.addEventListener('click', () => {
            openSelectModal(1);
        });

        selectBox2.addEventListener('click', () => {
            openSelectModal(2);
        });

        startSimBtn.addEventListener('click', () => {
            if (!state.selectedFighters[0] || !state.selectedFighters[1]) {
                alert('Пожалуйста, выберите обоих бойцов перед симуляцией!');
                return;
            }
            if (state.selectedFighters[0].id === state.selectedFighters[1].id) {
                alert('Нельзя симулировать бой бойца с самим собой!');
                return;
            }
            runMatchupSimulation();
        });
    }

    function openSelectModal(slot) {
        currentSelectSlot = slot;
        selectGrid.innerHTML = '';
        
        fighters.forEach(fighter => {
            // Disable selecting the already chosen fighter in the other slot
            const otherSlot = slot === 1 ? 1 : 0;
            const otherSelected = state.selectedFighters[otherSlot];
            if (otherSelected && otherSelected.id === fighter.id) return;

            const item = document.createElement('div');
            item.className = 'select-item';
            item.innerHTML = `
                <div class="select-item-img" style="background-image: url('assets/fighter_card_bg.png');"></div>
                <div class="select-item-name">${fighter.name}</div>
            `;
            item.addEventListener('click', () => {
                selectFighter(slot, fighter.id);
            });
            selectGrid.appendChild(item);
        });

        selectModal.classList.add('open');
    }

    function selectFighter(slot, fighterId) {
        const fighter = fighters.find(f => f.id === fighterId);
        if (!fighter) return;

        state.selectedFighters[slot - 1] = fighter;
        selectModal.classList.remove('open');

        // Render selected fighter block
        const container = slot === 1 ? selectBox1 : selectBox2;
        container.innerHTML = `
            <div class="selected-fighter-profile">
                <button class="arena-remove-btn" data-slot="${slot}"><i class="fa-solid fa-xmark"></i></button>
                <div class="selected-fighter-img" style="background-image: linear-gradient(rgba(20, 20, 25, 0.1), rgba(20, 20, 25, 0.9)), url('assets/fighter_card_bg.png');"></div>
                <div class="selected-fighter-info">
                    <div class="card-nickname" style="color: ${state.championsList.includes(fighter.id) ? 'var(--accent-gold)' : 'var(--accent-red)'}">
                        ${fighter.nickname !== '—' ? `"${fighter.nickname}"` : '&nbsp;'}
                    </div>
                    <h3>${fighter.name}</h3>
                    <p>${translateDivision(fighter.division)} (${fighter.record})</p>
                </div>
            </div>
        `;

        // Add event listener to remove button
        container.querySelector('.arena-remove-btn').addEventListener('click', (e) => {
            e.stopPropagation(); // prevent opening select modal again
            removeFighter(slot);
        });

        updateSimulatorView();
    }

    function removeFighter(slot) {
        state.selectedFighters[slot - 1] = null;
        
        const container = slot === 1 ? selectBox1 : selectBox2;
        container.innerHTML = `
            <div class="select-placeholder">
                <i class="fa-solid fa-plus"></i>
                <span>Выбрать бойца №${slot}</span>
            </div>
        `;

        updateSimulatorView();
    }

    function updateSimulatorView() {
        const [f1, f2] = state.selectedFighters;
        
        if (f1 && f2) {
            // Both selected
            startSimBtn.classList.add('active');
            simTip.innerText = 'ГОТОВЫ К БОЮ! НАЖМИТЕ VS ДЛЯ СИМУЛЯЦИИ';
            renderComparisonStats();
        } else {
            // One or both missing
            startSimBtn.classList.remove('active');
            simTip.innerText = 'Выберите обоих бойцов для сравнения';
            comparisonPanel.classList.add('hidden');
            simConsole.classList.add('hidden');
        }
    }

    function renderComparisonStats() {
        const [f1, f2] = state.selectedFighters;
        comparisonBars.innerHTML = '';
        comparisonPanel.classList.remove('hidden');

        const metrics = [
            { label: 'Ударная техника', key: 'striking' },
            { label: 'Борьба (Вольная/Греко)', key: 'wrestling' },
            { label: 'Грэпплинг (БЖЖ/Самбо)', key: 'grappling' },
            { label: 'Выносливость (Кардио)', key: 'cardio' },
            { label: 'Сила удара / Мощь', key: 'power' },
            { label: 'Защитные навыки', key: 'defense' }
        ];

        metrics.forEach(m => {
            const val1 = f1.stats[m.key];
            const val2 = f2.stats[m.key];
            
            // Calculate proportional widths (normalized to 100% total)
            const sum = val1 + val2;
            const pct1 = Math.round((val1 / sum) * 100);
            const pct2 = 100 - pct1;

            const row = document.createElement('div');
            row.className = 'comparison-row';
            row.innerHTML = `
                <div class="comparison-label-row">
                    <span class="value-left">${val1}</span>
                    <span>${m.label}</span>
                    <span class="value-right">${val2}</span>
                </div>
                <div class="comparison-bar-bg">
                    <div class="bar-left" style="width: 0%"></div>
                    <div class="bar-divider"></div>
                    <div class="bar-right" style="width: 0%"></div>
                </div>
            `;
            comparisonBars.appendChild(row);

            // Animate bar expansion after rendering
            setTimeout(() => {
                row.querySelector('.bar-left').style.width = `${pct1}%`;
                row.querySelector('.bar-right').style.width = `${pct2}%`;
            }, 100);
        });
    }

    // --- FIGHT MATCHUP GENERATOR SIMULATION ---
    function runMatchupSimulation() {
        const [f1, f2] = state.selectedFighters;
        simConsole.classList.remove('hidden');
        consoleOutput.innerHTML = '';
        
        // Scroll console into view
        simConsole.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Calculate scores
        const score1 = calculateCombatScore(f1, f2);
        const score2 = calculateCombatScore(f2, f1);
        
        const logs = [];
        logs.push({ text: `[SYSTEM] Инициализация симуляции поединка: ${f1.name.toUpperCase()} против ${f2.name.toUpperCase()}`, type: 'info' });
        logs.push({ text: `[SYSTEM] Класс: ${translateDivision(f1.division)}. Формат поединка: 3 раунда по 5 минут.`, type: 'info' });
        logs.push({ text: `[OCTAGON] Звучит гонг! Бойцы сходятся в центре клетки!`, type: 'warning' });

        // Simulate 3 Rounds
        let f1Damage = 0;
        let f2Damage = 0;
        
        for (let round = 1; round <= 3; round++) {
            logs.push({ text: `=== РАУНД ${round} ===`, type: 'round' });
            
            // Generate random scenarios based on stats
            const actions = generateRoundActions(f1, f2, round);
            actions.forEach(act => {
                logs.push({ text: act.text, type: 'action' });
                f1Damage += act.f1dmg;
                f2Damage += act.f2dmg;
            });
            
            logs.push({ text: `[OCTAGON] Конец раунда ${round}. Угловые выходят в октагон.`, type: 'warning' });
        }

        // Calculate Final Verdict
        logs.push({ text: `=== РЕШЕНИЕ СУДЕЙ ===`, type: 'round' });
        logs.push({ text: `[SYSTEM] Идет подсчет очков судейских записок...`, type: 'info' });

        const finalScore1 = score1 - f1Damage + f2Damage;
        const finalScore2 = score2 - f2Damage + f1Damage;
        
        let winner, loser, method;
        const roll = Math.random();

        // 10% chance of sudden finish (KO/SUB) if stats gap is significant
        if (Math.abs(score1 - score2) > 12 && roll > 0.6) {
            winner = score1 > score2 ? f1 : f2;
            loser = score1 > score2 ? f2 : f1;
            method = Math.random() > 0.5 ? 'нокаутом (KO)' : 'болевым приемом (Submission)';
            
            // Insert sudden finish log before decision
            const finishRound = Math.floor(Math.random() * 3) + 1;
            const finishTime = `${Math.floor(Math.random() * 4) + 1}:${Math.floor(Math.random() * 50) + 10}`;
            
            // Remove the final rounds and sub decision logs to replace with KO
            const truncateIndex = logs.findIndex(l => l.text.includes(`=== РАУНД ${finishRound}`));
            logs.splice(truncateIndex + 1); // delete subsequent actions
            
            logs.push({ text: `[OCTAGON] [${finishTime}] БОЙ ОСТАНОВЛЕН!`, type: 'warning' });
            if (method.includes('нокаутом')) {
                logs.push({ text: `[COMBAT] ${winner.name} ловит соперника встречным ударом! ${loser.name} падает на настил! Тяжелейший нокаут!`, type: 'action' });
            } else {
                logs.push({ text: `[COMBAT] ${winner.name} переводит бой на канвас, мгновенно забирает спину и проводит удушающий прием сзади! ${loser.name} вынужден постучать в знак сдачи!`, type: 'action' });
            }
            logs.push({ text: `Победитель боя: ${winner.name} ${method} в раунде ${finishRound}!`, type: 'outcome' });
        } else {
            // Decision verdict
            if (Math.abs(finalScore1 - finalScore2) < 2) {
                // Split decision
                winner = finalScore1 > finalScore2 ? f1 : f2;
                loser = finalScore1 > finalScore2 ? f2 : f1;
                method = 'разделенным решением судей (Split Decision)';
            } else {
                // Unanimous decision
                winner = finalScore1 > finalScore2 ? f1 : f2;
                loser = finalScore1 > finalScore2 ? f2 : f1;
                method = 'единогласным решением судей (Unanimous Decision)';
            }
            logs.push({ text: `Победитель боя: ${winner.name} побеждает ${method}!`, type: 'outcome' });
        }

        // Typewrite simulation outputs in terminal console
        let logIndex = 0;
        function printNextLog() {
            if (logIndex < logs.length) {
                const log = logs[logIndex];
                const line = document.createElement('div');
                line.className = `console-line ${getLineClass(log.type)}`;
                line.innerText = log.text;
                consoleOutput.appendChild(line);
                
                // Auto scroll console
                consoleOutput.scrollTop = consoleOutput.scrollHeight;
                
                logIndex++;
                setTimeout(printNextLog, 650); // delay between entries for dramatic effect
            }
        }
        printNextLog();
    }

    function getLineClass(type) {
        switch (type) {
            case 'info': return 'line-info';
            case 'warning': return 'line-warning';
            case 'round': return 'line-round';
            case 'action': return 'line-action';
            case 'outcome': return 'line-outcome';
            default: return '';
        }
    }

    function calculateCombatScore(fighter, opponent) {
        // Base combat rating score derived from their stats
        let score = (fighter.stats.striking * 0.25) + 
                    (fighter.stats.wrestling * 0.20) + 
                    (fighter.stats.grappling * 0.20) + 
                    (fighter.stats.cardio * 0.15) + 
                    (fighter.stats.power * 0.10) + 
                    (fighter.stats.defense * 0.10);

        // Stance adaptation advantage
        if (fighter.stance === 'Southpaw' && opponent.stance === 'Orthodox') {
            score += 1.5; // southpaw advantage against orthodox
        } else if (fighter.stance === 'Switch') {
            score += 1.0; // unpredictable switch stance
        }

        return score;
    }

    function generateRoundActions(f1, f2, round) {
        const actions = [];
        
        // Determine primary style of fighters
        const f1Striker = f1.stats.striking > f1.stats.wrestling;
        const f2Striker = f2.stats.striking > f2.stats.wrestling;

        // Choose random scenarios
        const rolls = [Math.random(), Math.random()];
        
        // Scenario 1: Striking exchanges
        if (rolls[0] > 0.4) {
            if (f1.stats.striking > f2.stats.striking) {
                actions.push({
                    text: `[COMBAT] ${f1.name} доминирует в стойке, пробивая двойку джебов. ${f2.name} защищается, но пропускает жесткий лоу-кик.`,
                    f1dmg: 2,
                    f2dmg: 6
                });
            } else {
                actions.push({
                    text: `[COMBAT] ${f2.name} демонстрирует превосходную скорость, отвечая точными апперкотами на выпады ${f1.name}.`,
                    f1dmg: 5,
                    f2dmg: 1
                });
            }
        } else {
            actions.push({
                text: `[COMBAT] Обоюдный размен ударами в центре октагона. Оба бойца обмениваются плотными боковыми.`,
                f1dmg: 4,
                f2dmg: 4
            });
        }

        // Scenario 2: Wrestling/Grappling attempt
        if (rolls[1] > 0.5) {
            // Wrestler vs Striker matchup check
            if (!f1Striker && f2Striker) {
                // Wrestler f1 attempts takedown on striker f2
                if (f1.stats.wrestling > f2.stats.defense) {
                    actions.push({
                        text: `[COMBAT] ${f1.name} совершает проход в две ноги и переводит ${f2.name} на канвас. Контроль у сетки и жесткий ground-and-pound.`,
                        f1dmg: 1,
                        f2dmg: 7
                    });
                } else {
                    actions.push({
                        text: `[COMBAT] ${f1.name} пытается пройти в клинч, но ${f2.name} успешно защищается (Sprawl) и разрывает дистанцию коленом.`,
                        f1dmg: 4,
                        f2dmg: 1
                    });
                }
            } else if (!f2Striker && f1Striker) {
                // Wrestler f2 attempts takedown on striker f1
                if (f2.stats.wrestling > f1.stats.defense) {
                    actions.push({
                        text: `[COMBAT] ${f2.name} захватывает корпус ${f1.name} и проводит зрелищный бросок прогибом. Бой переходит на землю.`,
                        f1dmg: 6,
                        f2dmg: 1
                    });
                } else {
                    actions.push({
                        text: `[COMBAT] ${f2.name} бросается в ноги сопернику, но ${f1.name} отбрасывает ноги назад и наносит несколько ударов по корпусу.`,
                        f1dmg: 1,
                        f2dmg: 3
                    });
                }
            } else {
                // Similar styles: clinch battle
                actions.push({
                    text: `[COMBAT] Вязкая борьба в клинче у сетки октагона. Судья просит бойцов быть активнее.`,
                    f1dmg: 2,
                    f2dmg: 2
                });
            }
        }

        // Scenario 3: Cardio impact in later rounds
        if (round >= 3) {
            const cardioDiff = f1.stats.cardio - f2.stats.cardio;
            if (cardioDiff > 5) {
                actions.push({
                    text: `[CARDIO] ${f2.name} заметно выдохся и опустил руки. ${f1.name} сохраняет высокий темп и легко расстреливает соперника джебами с дистанции.`,
                    f1dmg: 0,
                    f2dmg: 5
                });
            } else if (cardioDiff < -5) {
                actions.push({
                    text: `[CARDIO] ${f1.name} дышит тяжело и с трудом передвигается. ${f2.name} кружит вокруг него, выбрасывая быстрые хай-кики.`,
                    f1dmg: 5,
                    f2dmg: 0
                });
            }
        }

        return actions;
    }

    // Run app initialization
    init();
});
