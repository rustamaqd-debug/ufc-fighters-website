// --- UFC PORTAL APPLICATION LOGIC (V2.5 ENHANCED) ---

document.addEventListener('DOMContentLoaded', () => {
    // Application State
    const state = {
        activeTab: 'section-fighters',
        searchQuery: '',
        weightFilter: 'all',
        rankFilter: 'all', // 'all', 'C', 'top5', 'top15'
        selectedFighters: [null, null], // [Fighter 1, Fighter 2]
    };

    // DOM Elements
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.content-section');
    const searchInput = document.getElementById('fighter-search');
    const weightChips = document.querySelectorAll('#weight-filters .chip');
    const rankChips = document.querySelectorAll('#rank-filters .chip');
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
                
                navButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                sections.forEach(sec => {
                    sec.classList.remove('active');
                    if (sec.id === targetSectionId) {
                        sec.classList.add('active');
                    }
                });

                state.activeTab = targetSectionId;

                if (targetSectionId !== 'section-fighters') {
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                }
            });
        });

        // Hero actions linking
        const primaryHeroBtn = document.querySelector('.hero-actions .btn-primary');
        if (primaryHeroBtn) {
            primaryHeroBtn.addEventListener('click', (e) => {
                e.preventDefault();
                document.getElementById('btn-fighters').click();
            });
        }
        const secondaryHeroBtn = document.querySelector('.hero-actions .btn-secondary');
        if (secondaryHeroBtn) {
            secondaryHeroBtn.addEventListener('click', (e) => {
                e.preventDefault();
                document.getElementById('btn-matchup').click();
            });
        }
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

        rankChips.forEach(chip => {
            chip.addEventListener('click', () => {
                rankChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                state.rankFilter = chip.getAttribute('data-rank');
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
                                  f.division.toLowerCase().includes(state.searchQuery) ||
                                  f.nationality.toLowerCase().includes(state.searchQuery);
            
            const matchesWeight = state.weightFilter === 'all' || f.division === state.weightFilter;
            
            let matchesRank = true;
            if (state.rankFilter === 'C') {
                matchesRank = f.rank === 'C';
            } else if (state.rankFilter === 'top5') {
                matchesRank = f.rank === 'C' || (typeof f.rank === 'number' && f.rank <= 5);
            } else if (state.rankFilter === 'top15') {
                matchesRank = f.rank === 'C' || (typeof f.rank === 'number' && f.rank <= 15);
            }

            return matchesSearch && matchesWeight && matchesRank;
        });

        if (filtered.length === 0) {
            fightersGrid.innerHTML = `
                <div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                    <i class="fa-solid fa-face-frown" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>Бойцы не найдены. Попробуйте изменить параметры поиска или фильтров.</p>
                </div>
            `;
            return;
        }

        filtered.forEach(fighter => {
            const isChamp = fighter.rank === 'C';
            const card = createFighterCard(fighter, isChamp);
            fightersGrid.appendChild(card);
        });
    }

    // --- RENDER CHAMPIONS ---
    function renderChampions() {
        championsGrid.innerHTML = '';
        
        const champs = fighters.filter(f => f.rank === 'C');
        
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

        let rankBadgeHtml = '';
        if (fighter.rank === 'C') {
            rankBadgeHtml = `<div class="card-rank-badge rank-c"><i class="fa-solid fa-crown"></i> CHIP</div>`;
        } else if (typeof fighter.rank === 'number' && fighter.rank <= 5) {
            rankBadgeHtml = `<div class="card-rank-badge rank-top5">#${fighter.rank}</div>`;
        } else if (typeof fighter.rank === 'number') {
            rankBadgeHtml = `<div class="card-rank-badge">#${fighter.rank}</div>`;
        }

        const athleteImg = fighter.image || 'assets/fighter_card_bg.png';

        card.innerHTML = `
            <div class="card-img-container" style="background-image: linear-gradient(rgba(20, 20, 25, 0.1), rgba(20, 20, 25, 0.9)), url('${athleteImg}');">
                ${rankBadgeHtml}
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
            'Flyweight': 'Наилегчайший вес',
            'Strawweight': 'Женский минимальный вес',
            'Women\'s Flyweight': 'Женский наилегчайший вес',
            'Women\'s Bantamweight': 'Женский легчайший вес'
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

        // Image with fallback
        const modalImg = document.getElementById('modal-img');
        modalImg.src = fighter.image || 'assets/fighter_card_bg.png';
        modalImg.onerror = function() {
            this.onerror = null;
            this.src = 'assets/fighter_card_bg.png';
        };

        // Rank tag
        const rankTag = document.getElementById('modal-rank-tag');
        if (fighter.rank === 'C') {
            rankTag.innerText = '🏆 ЧЕМПИОН';
            rankTag.style.background = 'linear-gradient(135deg, #D4AF37 0%, #AA7C11 100%)';
            rankTag.style.color = '#000';
        } else {
            rankTag.innerText = `#${fighter.rank} В РЕЙТИНГЕ`;
            rankTag.style.background = 'var(--accent-red)';
            rankTag.style.color = '#FFF';
        }

        document.getElementById('modal-name').innerText = fighter.name;
        document.getElementById('modal-nickname').innerText = fighter.nickname !== '—' ? `"${fighter.nickname}"` : '';
        document.getElementById('modal-verdict-elo').innerText = `${fighter.verdictRating || 900} Elo`;
        document.getElementById('modal-country').innerText = `${fighter.nationality} ${fighter.flag}`;
        document.getElementById('modal-record').innerText = fighter.record;
        document.getElementById('modal-height').innerText = fighter.height;
        document.getElementById('modal-reach').innerText = fighter.reach;
        document.getElementById('modal-stance').innerText = translateStance(fighter.stance);
        document.getElementById('modal-age').innerText = `${fighter.age} лет`;
        document.getElementById('modal-bio').innerText = fighter.bio;

        // Sherdog Breakdown
        if (fighter.sherdog) {
            const totalWins = fighter.sherdog.ko + fighter.sherdog.sub + fighter.sherdog.dec || 1;
            const koPct = Math.round((fighter.sherdog.ko / totalWins) * 100);
            const subPct = Math.round((fighter.sherdog.sub / totalWins) * 100);
            const decPct = 100 - koPct - subPct;

            document.getElementById('sherdog-ko-bar').style.width = `${koPct}%`;
            document.getElementById('sherdog-sub-bar').style.width = `${subPct}%`;
            document.getElementById('sherdog-dec-bar').style.width = `${decPct}%`;

            document.getElementById('sherdog-ko-val').innerText = `${fighter.sherdog.ko} (${koPct}%)`;
            document.getElementById('sherdog-sub-val').innerText = `${fighter.sherdog.sub} (${subPct}%)`;
            document.getElementById('sherdog-dec-val').innerText = `${fighter.sherdog.dec} (${decPct}%)`;
        }

        // UFC Advanced Stats
        if (fighter.ufcStats) {
            document.getElementById('ufc-slpm').innerText = fighter.ufcStats.slpm.toFixed(2);
            document.getElementById('ufc-str-acc').innerText = `${fighter.ufcStats.strAcc}%`;
            document.getElementById('ufc-sapm').innerText = fighter.ufcStats.sapm.toFixed(2);
            document.getElementById('ufc-td-def').innerText = `${fighter.ufcStats.tdDef}%`;
        }

        detailModal.classList.add('open');

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
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const width = canvas.width;
        const center = width / 2;
        const radius = width * 0.35;
        
        const labels = ['Ударка', 'Борьба', 'Грэпплинг', 'Кардио', 'Сила', 'Защита'];
        const keys = ['striking', 'wrestling', 'grappling', 'cardio', 'power', 'defense'];
        const numAxes = labels.length;
        
        // Grid
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        for (let level = 1; level <= 5; level++) {
            const levelRadius = radius * (level / 5);
            ctx.beginPath();
            for (let i = 0; i < numAxes; i++) {
                const angle = (i * 2 * Math.PI / numAxes) - Math.PI / 2;
                const x = center + levelRadius * Math.cos(angle);
                const y = center + levelRadius * Math.sin(angle);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.stroke();
        }

        // Axes
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

        // Labels
        ctx.fillStyle = '#9FA2B2';
        ctx.font = '700 11px "Oxanium", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        for (let i = 0; i < numAxes; i++) {
            const angle = (i * 2 * Math.PI / numAxes) - Math.PI / 2;
            const labelX = center + (radius + 20) * Math.cos(angle);
            const labelY = center + (radius + 12) * Math.sin(angle);
            ctx.fillText(labels[i], labelX, labelY);
        }

        // Polygon
        const points = [];
        ctx.beginPath();
        for (let i = 0; i < numAxes; i++) {
            const statValue = stats[keys[i]];
            const valueRadius = radius * (statValue / 100);
            const angle = (i * 2 * Math.PI / numAxes) - Math.PI / 2;
            const x = center + valueRadius * Math.cos(angle);
            const y = center + valueRadius * Math.sin(angle);
            points.push({x, y, val: statValue});
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        
        ctx.fillStyle = 'rgba(226, 27, 44, 0.35)';
        ctx.fill();
        ctx.strokeStyle = '#E21B2C';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Handles
        points.forEach(pt => {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 4, 0, 2 * Math.PI);
            ctx.fillStyle = '#D4AF37';
            ctx.fill();
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 9px "Outfit", sans-serif';
            const textOffset = 10;
            const angleFromCenter = Math.atan2(pt.y - center, pt.x - center);
            const textX = pt.x + textOffset * Math.cos(angleFromCenter);
            const textY = pt.y + textOffset * Math.sin(angleFromCenter);
            ctx.fillText(pt.val, textX, textY);
        });
    }

    // --- MATCHUP SIMULATOR ---
    function setupSimulatorEvents() {
        selectBox1.addEventListener('click', () => openSelectModal(1));
        selectBox2.addEventListener('click', () => openSelectModal(2));

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
            const otherSlot = slot === 1 ? 1 : 0;
            const otherSelected = state.selectedFighters[otherSlot];
            if (otherSelected && otherSelected.id === fighter.id) return;

            const item = document.createElement('div');
            item.className = 'select-item';
            const itemImg = fighter.image || 'assets/fighter_card_bg.png';

            item.innerHTML = `
                <div class="select-item-img" style="background-image: url('${itemImg}');"></div>
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

        const container = slot === 1 ? selectBox1 : selectBox2;
        const athleteImg = fighter.image || 'assets/fighter_card_bg.png';

        container.innerHTML = `
            <div class="selected-fighter-profile">
                <button class="arena-remove-btn" data-slot="${slot}"><i class="fa-solid fa-xmark"></i></button>
                <div class="selected-fighter-img" style="background-image: linear-gradient(rgba(20, 20, 25, 0.1), rgba(20, 20, 25, 0.9)), url('${athleteImg}');"></div>
                <div class="selected-fighter-info">
                    <div class="card-nickname" style="color: ${fighter.rank === 'C' ? 'var(--accent-gold)' : 'var(--accent-red)'}">
                        ${fighter.nickname !== '—' ? `"${fighter.nickname}"` : '&nbsp;'}
                    </div>
                    <h3>${fighter.name}</h3>
                    <p>${translateDivision(fighter.division)} (${fighter.record})</p>
                </div>
            </div>
        `;

        container.querySelector('.arena-remove-btn').addEventListener('click', (e) => {
            e.stopPropagation();
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
            startSimBtn.classList.add('active');
            simTip.innerText = 'ГОТОВЫ К БОЮ! НАЖМИТЕ VS ДЛЯ СИМУЛЯЦИИ';
            renderComparisonStats();
        } else {
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
            { label: 'Verdict Elo Rating', val1: f1.verdictRating || 900, val2: f2.verdictRating || 900 },
            { label: 'Ударов в мин (SLpM)', val1: f1.ufcStats?.slpm || 4.0, val2: f2.ufcStats?.slpm || 4.0 },
            { label: 'Точность ударов %', val1: f1.ufcStats?.strAcc || 50, val2: f2.ufcStats?.strAcc || 50 },
            { label: 'Защита от тейкдаунов %', val1: f1.ufcStats?.tdDef || 70, val2: f2.ufcStats?.tdDef || 70 },
            { label: 'Ударка (Skill)', val1: f1.stats.striking, val2: f2.stats.striking },
            { label: 'Борьба / Грэпплинг', val1: f1.stats.wrestling, val2: f2.stats.wrestling }
        ];

        metrics.forEach(m => {
            const sum = m.val1 + m.val2 || 1;
            const pct1 = Math.round((m.val1 / sum) * 100);
            const pct2 = 100 - pct1;

            const row = document.createElement('div');
            row.className = 'comparison-row';
            row.innerHTML = `
                <div class="comparison-label-row">
                    <span class="value-left">${m.val1}</span>
                    <span>${m.label}</span>
                    <span class="value-right">${m.val2}</span>
                </div>
                <div class="comparison-bar-bg">
                    <div class="bar-left" style="width: 0%"></div>
                    <div class="bar-divider"></div>
                    <div class="bar-right" style="width: 0%"></div>
                </div>
            `;
            comparisonBars.appendChild(row);

            setTimeout(() => {
                row.querySelector('.bar-left').style.width = `${pct1}%`;
                row.querySelector('.bar-right').style.width = `${pct2}%`;
            }, 100);
        });
    }

    // --- SIMULATION ENGINE ---
    function runMatchupSimulation() {
        const [f1, f2] = state.selectedFighters;
        simConsole.classList.remove('hidden');
        consoleOutput.innerHTML = '';
        
        simConsole.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        const score1 = calculateCombatScore(f1, f2);
        const score2 = calculateCombatScore(f2, f1);
        
        const logs = [];
        logs.push({ text: `[SYSTEM] Инициализация боя: ${f1.name.toUpperCase()} (Verdict ${f1.verdictRating || 900} Elo) vs ${f2.name.toUpperCase()} (Verdict ${f2.verdictRating || 900} Elo)`, type: 'info' });
        logs.push({ text: `[UFC STATS] Активность: ${f1.name} (${f1.ufcStats?.slpm || 4.0} SLpM) | ${f2.name} (${f2.ufcStats?.slpm || 4.0} SLpM)`, type: 'info' });
        logs.push({ text: `[OCTAGON] Звучит гонг! Поединок начался!`, type: 'warning' });

        let f1Damage = 0;
        let f2Damage = 0;
        
        for (let round = 1; round <= 3; round++) {
            logs.push({ text: `=== РАУНД ${round} ===`, type: 'round' });
            
            const actions = generateRoundActions(f1, f2, round);
            actions.forEach(act => {
                logs.push({ text: act.text, type: 'action' });
                f1Damage += act.f1dmg;
                f2Damage += act.f2dmg;
            });
            
            logs.push({ text: `[OCTAGON] Конец раунда ${round}.`, type: 'warning' });
        }

        logs.push({ text: `=== РЕШЕНИЕ СУДЕЙ ===`, type: 'round' });
        logs.push({ text: `[SYSTEM] Подсчет карточек...`, type: 'info' });

        const finalScore1 = score1 - f1Damage + f2Damage;
        const finalScore2 = score2 - f2Damage + f1Damage;
        
        let winner, loser, method;
        const roll = Math.random();

        if (Math.abs(score1 - score2) > 10 && roll > 0.5) {
            winner = score1 > score2 ? f1 : f2;
            loser = score1 > score2 ? f2 : f1;
            
            const useKo = winner.sherdog && (winner.sherdog.ko > winner.sherdog.sub);
            method = useKo ? 'нокаутом (KO/TKO)' : 'удушающим/болевым приемом (Submission)';
            
            logs.push({ text: `[OCTAGON] БОЙ ОСТАНОВЛЕН!`, type: 'warning' });
            if (useKo) {
                logs.push({ text: `[COMBAT] ${winner.name} пробивает серии точных ударов (SLpM ${winner.ufcStats?.slpm || 4.5})! ${loser.name} падает на настил! Рефери останавливает бой!`, type: 'action' });
            } else {
                logs.push({ text: `[COMBAT] ${winner.name} забирает спину в партере и проводит плотный захват! ${loser.name} сдается!`, type: 'action' });
            }
            logs.push({ text: `Победитель боя: ${winner.name} ${method}!`, type: 'outcome' });
        } else {
            winner = finalScore1 > finalScore2 ? f1 : f2;
            loser = finalScore1 > finalScore2 ? f2 : f1;
            method = Math.abs(finalScore1 - finalScore2) < 3 ? 'разделенным решением судей (Split Decision)' : 'единогласным решением судей (Unanimous Decision)';
            
            logs.push({ text: `Победитель боя: ${winner.name} побеждает ${method}!`, type: 'outcome' });
        }

        let logIndex = 0;
        function printNextLog() {
            if (logIndex < logs.length) {
                const log = logs[logIndex];
                const line = document.createElement('div');
                line.className = `console-line ${getLineClass(log.type)}`;
                line.innerText = log.text;
                consoleOutput.appendChild(line);
                consoleOutput.scrollTop = consoleOutput.scrollHeight;
                logIndex++;
                setTimeout(printNextLog, 600);
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
        let score = (fighter.stats.striking * 0.20) + 
                    (fighter.stats.wrestling * 0.20) + 
                    (fighter.stats.grappling * 0.20) + 
                    (fighter.stats.cardio * 0.15) + 
                    (fighter.stats.power * 0.10) + 
                    (fighter.stats.defense * 0.15);

        // Add UFC Advanced stats factor
        if (fighter.ufcStats) {
            score += (fighter.ufcStats.slpm * 0.5);
            score += (fighter.ufcStats.tdDef * 0.05);
        }

        if (fighter.verdictRating) {
            score += (fighter.verdictRating / 100);
        }

        return score;
    }

    function generateRoundActions(f1, f2, round) {
        const actions = [];
        const f1Striker = f1.stats.striking > f1.stats.wrestling;

        actions.push({
            text: `[COMBAT] ${f1.name} выбрасывает комбинации (активность ${f1.ufcStats?.slpm || 4.0} SLpM), а ${f2.name} отвечает контратаками.`,
            f1dmg: Math.floor(Math.random() * 4) + 1,
            f2dmg: Math.floor(Math.random() * 4) + 1
        });

        if (!f1Striker && f2.ufcStats) {
            if (f1.stats.wrestling > f2.ufcStats.tdDef) {
                actions.push({
                    text: `[COMBAT] ${f1.name} преодолевает защиту от тейкдаунов (${f2.ufcStats.tdDef}%) и переводит ${f2.name} на канвас!`,
                    f1dmg: 1,
                    f2dmg: 5
                });
            } else {
                actions.push({
                    text: `[COMBAT] ${f2.name} демонстрирует отличную защиту от тейкдаунов (${f2.ufcStats.tdDef}%) и сбрасывает захват.`,
                    f1dmg: 3,
                    f2dmg: 1
                });
            }
        }

        return actions;
    }

    init();
});
