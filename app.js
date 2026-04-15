const archetypes = [
  { name: 'Hyper Offense', goals: 'Fast pressure, hazards, and sweepers.' },
  { name: 'Balanced', goals: 'Solid defensive core with flexible offense.' },
  { name: 'Bulky Offense', goals: 'Trade efficiently with resilient breakers.' },
  { name: 'Stall', goals: 'Hazard chip, healing loops, and denial.' },
  { name: 'Rain', goals: 'Weather abuse with swift attackers and pivots.' }
];

const pokemonPool = [
  { name: 'Great Tusk', types: ['Ground', 'Fighting'], role: 'Physical wall / spinner / rocker', tierScore: 91, archetypes: ['Balanced', 'Bulky Offense', 'Hyper Offense'], baseStats: { hp: 115, atk: 131, def: 131, spa: 53, spd: 53, spe: 87 } },
  { name: 'Kingambit', types: ['Dark', 'Steel'], role: 'Late-game cleaner', tierScore: 94, archetypes: ['Hyper Offense', 'Balanced', 'Bulky Offense'], baseStats: { hp: 100, atk: 135, def: 120, spa: 60, spd: 85, spe: 50 } },
  { name: 'Gholdengo', types: ['Steel', 'Ghost'], role: 'Hazard control denial / special breaker', tierScore: 95, archetypes: ['Hyper Offense', 'Balanced', 'Stall'], baseStats: { hp: 87, atk: 60, def: 95, spa: 133, spd: 91, spe: 84 } },
  { name: 'Toxapex', types: ['Water', 'Poison'], role: 'Defensive pivot', tierScore: 83, archetypes: ['Balanced', 'Stall'], baseStats: { hp: 50, atk: 63, def: 152, spa: 53, spd: 142, spe: 35 } },
  { name: 'Dragapult', types: ['Dragon', 'Ghost'], role: 'Fast mixed attacker', tierScore: 92, archetypes: ['Hyper Offense', 'Balanced', 'Rain'], baseStats: { hp: 88, atk: 120, def: 75, spa: 100, spd: 75, spe: 142 } },
  { name: 'Raging Bolt', types: ['Electric', 'Dragon'], role: 'Bulky setup sweeper', tierScore: 90, archetypes: ['Bulky Offense', 'Balanced', 'Rain'], baseStats: { hp: 125, atk: 73, def: 91, spa: 137, spd: 89, spe: 75 } },
  { name: 'Ogerpon-Wellspring', types: ['Grass', 'Water'], role: 'Wallbreaker / speed control', tierScore: 89, archetypes: ['Balanced', 'Bulky Offense', 'Rain'], baseStats: { hp: 80, atk: 120, def: 84, spa: 60, spd: 96, spe: 110 } },
  { name: 'Skarmory', types: ['Steel', 'Flying'], role: 'Physical wall / spikes', tierScore: 80, archetypes: ['Stall', 'Balanced'], baseStats: { hp: 65, atk: 80, def: 140, spa: 40, spd: 70, spe: 70 } },
  { name: 'Pelipper', types: ['Water', 'Flying'], role: 'Rain setter / pivot', tierScore: 77, archetypes: ['Rain', 'Balanced'], baseStats: { hp: 60, atk: 50, def: 100, spa: 95, spd: 70, spe: 65 } },
  { name: 'Barraskewda', types: ['Water'], role: 'Rain cleaner', tierScore: 81, archetypes: ['Rain', 'Hyper Offense'], baseStats: { hp: 61, atk: 123, def: 60, spa: 60, spd: 50, spe: 136 } },
  { name: 'Garganacl', types: ['Rock'], role: 'Fat win condition', tierScore: 84, archetypes: ['Stall', 'Balanced', 'Bulky Offense'], baseStats: { hp: 100, atk: 100, def: 130, spa: 45, spd: 90, spe: 35 } },
  { name: 'Iron Valiant', types: ['Fairy', 'Fighting'], role: 'Mixed breaker / cleaner', tierScore: 90, archetypes: ['Hyper Offense', 'Balanced'], baseStats: { hp: 74, atk: 130, def: 90, spa: 120, spd: 60, spe: 116 } }
];

const moveOptions = [
  { name: 'Earthquake', category: 'Physical', power: 100, type: 'Ground' },
  { name: 'Thunderbolt', category: 'Special', power: 90, type: 'Electric' },
  { name: 'Shadow Ball', category: 'Special', power: 80, type: 'Ghost' },
  { name: 'Hydro Pump', category: 'Special', power: 110, type: 'Water' },
  { name: 'Close Combat', category: 'Physical', power: 120, type: 'Fighting' },
  { name: 'Moonblast', category: 'Special', power: 95, type: 'Fairy' }
];

const typeChart = {
  Ground: { Electric: 2, Steel: 2, Flying: 0, Grass: 0.5, Bug: 0.5 },
  Electric: { Water: 2, Flying: 2, Ground: 0, Grass: 0.5, Dragon: 0.5 },
  Ghost: { Ghost: 2, Psychic: 2, Dark: 0.5, Normal: 0 },
  Water: { Fire: 2, Ground: 2, Rock: 2, Water: 0.5, Dragon: 0.5, Grass: 0.5 },
  Fighting: { Dark: 2, Steel: 2, Normal: 2, Ghost: 0, Fairy: 0.5, Poison: 0.5, Flying: 0.5 },
  Fairy: { Dragon: 2, Fighting: 2, Dark: 2, Fire: 0.5, Steel: 0.5 }
};

function getNatureModifier(natureName, statKey) {
  const nature = NATURES[natureName] ?? { mod: 'Neutral' };
  return nature[statKey] ?? 1;
}

const NATURES = {
  Hardy: { mod: 'Neutral' },
  Docile: { mod: 'Neutral' },
  Serious: { mod: 'Neutral' },
  Bashful: { mod: 'Neutral' },
  Quirky: { mod: 'Neutral' },
  Adamant: { mod: '+Atk, -SpA', atk: 1.1, spa: 0.9 },
  Brave: { mod: '+Atk, -Spe', atk: 1.1, spe: 0.9 },
  Lonely: { mod: '+Atk, -Def', atk: 1.1, def: 0.9 },
  Naughty: { mod: '+Atk, -SpD', atk: 1.1, spd: 0.9 },
  Bold: { mod: '+Def, -Atk', def: 1.1, atk: 0.9 },
  Relaxed: { mod: '+Def, -Spe', def: 1.1, spe: 0.9 },
  Impish: { mod: '+Def, -SpA', def: 1.1, spa: 0.9 },
  Lax: { mod: '+Def, -SpD', def: 1.1, spd: 0.9 },
  Modest: { mod: '+SpA, -Atk', spa: 1.1, atk: 0.9 },
  Quiet: { mod: '+SpA, -Spe', spa: 1.1, spe: 0.9 },
  Mild: { mod: '+SpA, -Def', spa: 1.1, def: 0.9 },
  Rash: { mod: '+SpA, -SpD', spa: 1.1, spd: 0.9 },
  Calm: { mod: '+SpD, -Atk', spd: 1.1, atk: 0.9 },
  Sassy: { mod: '+SpD, -Spe', spd: 1.1, spe: 0.9 },
  Gentle: { mod: '+SpD, -Def', spd: 1.1, def: 0.9 },
  Careful: { mod: '+SpD, -SpA', spd: 1.1, spa: 0.9 },
  Timid: { mod: '+Spe, -Atk', spe: 1.1, atk: 0.9 },
  Jolly: { mod: '+Spe, -SpA', spe: 1.1, spa: 0.9 },
  Hasty: { mod: '+Spe, -Def', spe: 1.1, def: 0.9 },
  Naive: { mod: '+Spe, -SpD', spe: 1.1, spd: 0.9 }
};

const POKECOUNTER_RAW_BASE = 'https://raw.githubusercontent.com/J4PN/PokeCounter.app/main/src/data';

const state = {
  archetype: 'Balanced',
  team: [],
  external: {
    loaded: false,
    loading: false,
    sourceUrl: 'https://github.com/J4PN/PokeCounter.app/tree/main',
    pokemonById: {},
    metaTeams: [],
    tiers: {}
  }
};

function byId(id) { return document.getElementById(id); }

function effectiveness(moveType, defTypes) {
  return defTypes.reduce((total, type) => total * (typeChart[moveType]?.[type] ?? 1), 1);
}

function synergyScore(mon, team) {
  const existingTypes = new Set(team.flatMap((p) => p.types));
  const typeBonus = mon.types.reduce((acc, type) => acc + (!existingTypes.has(type) ? 4 : 0), 0);
  const duplicatePenalty = team.some((p) => p.name === mon.name) ? -999 : 0;
  return mon.tierScore + typeBonus + duplicatePenalty;
}

function renderArchetype() {
  const select = byId('archetype');
  select.innerHTML = '';
  archetypes.forEach((a) => {
    const option = document.createElement('option');
    option.value = a.name;
    option.textContent = a.name;
    select.appendChild(option);
  });
  select.value = state.archetype;
  byId('archetypeGoal').textContent = archetypes.find((a) => a.name === state.archetype)?.goals || '';
}

function renderTeam() {
  byId('teamCount').textContent = `(${state.team.length}/6)`;
  const teamList = byId('teamList');
  teamList.innerHTML = '';

  if (!state.team.length) {
    const empty = document.createElement('li');
    empty.className = 'muted';
    empty.textContent = 'No team members yet.';
    teamList.appendChild(empty);
  }

  state.team.forEach((mon) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${mon.name}</strong> <span class="muted">(${mon.role})</span>`;
    const button = document.createElement('button');
    button.className = 'inline-btn';
    button.textContent = 'Remove';
    button.onclick = () => {
      state.team = state.team.filter((member) => member.name !== mon.name);
      renderAll();
    };
    li.appendChild(button);
    teamList.appendChild(li);
  });
}

function renderRecommendations() {
  const list = byId('recommendList');
  list.innerHTML = '';

  const recommendations = pokemonPool
    .filter((mon) => mon.archetypes.includes(state.archetype))
    .sort((a, b) => synergyScore(b, state.team) - synergyScore(a, state.team))
    .slice(0, 10);

  recommendations.forEach((mon) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${mon.name}</strong> <span class="muted">(${mon.role})</span>`;
    const button = document.createElement('button');
    button.className = 'inline-btn';
    button.textContent = 'Add';
    button.disabled = state.team.length >= 6 || state.team.some((m) => m.name === mon.name);
    button.onclick = () => {
      if (state.team.length < 6 && !state.team.some((m) => m.name === mon.name)) {
        state.team = [...state.team, mon];
        renderAll();
      }
    };
    li.appendChild(button);
    list.appendChild(li);
  });
}

function teamStrength(team) {
  const totalTier = team.reduce((sum, mon) => sum + mon.tierScore, 0);
  const speedCoverage = team.filter((mon) => mon.baseStats.spe >= 100).length * 3;
  const bulkCoverage = team.filter((mon) => mon.baseStats.hp + mon.baseStats.def + mon.baseStats.spd >= 260).length * 2;
  return totalTier + speedCoverage + bulkCoverage;
}

function renderExternalMetaTeams() {
  const wrapper = byId('externalMetaWrap');
  const list = byId('externalMetaList');
  if (!state.external.loaded || !state.external.metaTeams.length) {
    wrapper.classList.add('hidden');
    list.innerHTML = '';
    return;
  }

  wrapper.classList.remove('hidden');
  list.innerHTML = '';

  state.external.metaTeams.slice(0, 10).forEach((team) => {
    const li = document.createElement('li');
    const mons = team.pokemonIds
      .map((id) => state.external.pokemonById[id]?.name || `#${id}`)
      .slice(0, 6)
      .join(', ');
    li.innerHTML = `<strong>${team.name}</strong><br><span class="muted">${team.description}</span><br>${mons}`;
    list.appendChild(li);
  });
}

function runSimulation() {
  if (!state.team.length) {
    alert('Build a team first.');
    return;
  }

  const games = Math.max(10, Number(byId('gameCount').value) || 100);
  let wins = 0;
  const usage = {};

  for (let i = 0; i < games; i += 1) {
    const opponent = [...pokemonPool].sort(() => Math.random() - 0.5).slice(0, 6);
    if (teamStrength(state.team) + Math.random() * 20 > teamStrength(opponent) + Math.random() * 20) {
      wins += 1;
    }
    opponent.forEach((mon) => {
      usage[mon.name] = (usage[mon.name] || 0) + 1;
    });
  }

  byId('simResult').classList.remove('hidden');
  byId('winRate').textContent = `${((wins / games) * 100).toFixed(1)}%`;
  byId('record').textContent = `${wins} - ${games - wins}`;
  byId('gamesPlayed').textContent = `${games}`;

  const meta = Object.entries(usage)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, count]) => ({ name, usageRate: (count / (games * 6)) * 100 }));

  const metaList = byId('metaList');
  metaList.innerHTML = '';
  meta.forEach((entry) => {
    const li = document.createElement('li');
    li.textContent = `${entry.name}: ${entry.usageRate.toFixed(1)}%`;
    metaList.appendChild(li);
  });
}

function renderCalcSelectors() {
  ['attacker', 'defender'].forEach((id) => {
    const select = byId(id);
    if (!select.options.length) {
      pokemonPool.forEach((mon) => {
        const option = document.createElement('option');
        option.value = mon.name;
        option.textContent = mon.name;
        select.appendChild(option);
      });
    }
  });

  const moveSelect = byId('move');
  if (!moveSelect.options.length) {
    moveOptions.forEach((move) => {
      const option = document.createElement('option');
      option.value = move.name;
      option.textContent = `${move.name} (${move.type})`;
      moveSelect.appendChild(option);
    });
  }

  byId('attacker').value = byId('attacker').value || 'Great Tusk';
  byId('defender').value = byId('defender').value || 'Kingambit';
  byId('move').value = byId('move').value || 'Earthquake';
}

function runDamageCalc() {
  const attacker = pokemonPool.find((mon) => mon.name === byId('attacker').value);
  const defender = pokemonPool.find((mon) => mon.name === byId('defender').value);
  const move = moveOptions.find((m) => m.name === byId('move').value);
  if (!attacker || !defender || !move) {
    return;
  }
['attackerNature', 'defenderNature'].forEach((id) => {
  const select = byId(id);
  if (!select.options.length) {
    Object.entries(NATURES).forEach(([name, details]) => {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = `${name} (${details.mod})`;
      select.appendChild(option);
    });
  }
});
byId('attackerNature').value = byId('attackerNature').value || 'Hardy';
byId('defenderNature').value = byId('defenderNature').value || 'Hardy';
  const attackStat = move.category === 'Physical' ? attacker.baseStats.atk : attacker.baseStats.spa;
  const defenseStat = move.category === 'Physical' ? defender.baseStats.def : defender.baseStats.spd;
  const stab = attacker.types.includes(move.type) ? 1.5 : 1;
  const eff = effectiveness(move.type, defender.types);
  const base = (((2 * 100) / 5 + 2) * move.power * (attackStat / defenseStat)) / 50 + 2;
  const min = Math.floor(base * 0.85 * stab * eff);
  const max = Math.floor(base * stab * eff);
  const defenderHP = defender.baseStats.hp * 2 + 110;
  const minPct = ((min / defenderHP) * 100).toFixed(1);
  const maxPct = ((max / defenderHP) * 100).toFixed(1);
  const ko = max >= defenderHP ? 'Possible OHKO' : max * 2 >= defenderHP ? 'Likely 2HKO' : '3HKO or slower';
const attackerNature = byId('attackerNature').value || 'Hardy';
const defenderNature = byId('defenderNature').value || 'Hardy';

const boostedAtk = Math.floor((attacker.baseStats.atk + state.sp.atk) * getNatureModifier(attackerNature, 'atk'));
const boostedSpA = Math.floor((attacker.baseStats.spa + state.sp.spa) * getNatureModifier(attackerNature, 'spa'));
const boostedDef = Math.floor(defender.baseStats.def * getNatureModifier(defenderNature, 'def'));
const boostedSpD = Math.floor(defender.baseStats.spd * getNatureModifier(defenderNature, 'spd'));

const attackStat = move.category === 'Physical' ? boostedAtk : boostedSpA;
const defenseStat = move.category === 'Physical' ? boostedDef : boostedSpD;
  byId('damageRange').innerHTML = `<strong>Damage Range:</strong> ${min} - ${max} (${minPct}% - ${maxPct}%)`;
  byId('damageNotes').textContent = `Effectiveness: ${eff}x • ${ko}`;
  byId('damageNotes').textContent = `Effectiveness: ${eff}x • ${ko} • A:${attackerNature} / D:${defenderNature} • ${move.effect ?? 'No additional effect data.'}`;
}

function activateTab(tabId) {
  document.querySelectorAll('.tab-panel').forEach((panel) => {
    panel.classList.toggle('hidden', panel.id !== tabId);
    panel.classList.toggle('active', panel.id === tabId);
  });

  document.querySelectorAll('.tab-btn').forEach((button) => {
    const active = button.dataset.tab === tabId;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', active ? 'true' : 'false');
  });
}

function renderSourcesStatus(message, isError = false) {
  const status = byId('sourceStatus');
  status.textContent = message;
  status.classList.toggle('error-text', isError);
}

async function loadPokeCounterData() {
  if (state.external.loading) {
    return;
  }

  state.external.loading = true;
  renderSourcesStatus('Loading PokeCounter data from GitHub...');

  try {
    const [pokemonResp, metaResp, tiersResp] = await Promise.all([
      fetch(`${POKECOUNTER_RAW_BASE}/pokemon.json`),
      fetch(`${POKECOUNTER_RAW_BASE}/meta-teams.json`),
      fetch(`${POKECOUNTER_RAW_BASE}/tiers.json`)
    ]);

    if (!pokemonResp.ok || !metaResp.ok || !tiersResp.ok) {
      throw new Error('Failed to fetch one or more source files.');
    }

    const pokemon = await pokemonResp.json();
    const metaTeams = await metaResp.json();
    const tiers = await tiersResp.json();

    state.external.pokemonById = Object.fromEntries(pokemon.map((p) => [p.id, p]));
    state.external.metaTeams = metaTeams;
    state.external.tiers = tiers;
    state.external.loaded = true;

    renderExternalMetaTeams();
    renderSourcesStatus(`Loaded ${pokemon.length} Pokémon and ${metaTeams.length} meta teams from PokeCounter.`);
  } catch (error) {
    renderSourcesStatus(`Could not load PokeCounter data automatically: ${error.message}`, true);
  } finally {
    state.external.loading = false;
  }
}

function renderAll() {
  renderArchetype();
  renderTeam();
  renderRecommendations();
  renderCalcSelectors();
  runDamageCalc();
  renderExternalMetaTeams();
}

['attackerNature', 'defenderNature'].forEach((id) => {
  byId(id).addEventListener('change', runDamageCalc);
});

byId('archetype').addEventListener('change', (e) => {
  state.archetype = e.target.value;
  renderAll();
});

byId('simulateBtn').addEventListener('click', runSimulation);
['attacker', 'defender', 'move'].forEach((id) => {
  byId(id).addEventListener('change', runDamageCalc);
});

document.querySelectorAll('.tab-btn').forEach((button) => {
  button.addEventListener('click', () => activateTab(button.dataset.tab));
});

byId('loadSourceBtn').addEventListener('click', loadPokeCounterData);

renderAll();
renderSourcesStatus(`Source repo configured: ${state.external.sourceUrl}`);
