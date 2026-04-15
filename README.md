# Forge-Of-Champions

A Pokémon team-building website prototype with:

- Tabbed layout: Team Building, Meta, Calc, and Sources.
- Archetype-driven team builder and recommendation engine.
- Configurable game simulation and meta usage analysis.
- Integrated damage calculator panel.

## Run locally

### Option 1 (recommended)

```bash
./start-site.sh
```

Then open `http://localhost:8080`.

### Option 2

```bash
make run
```

## About your "copy files from repos" request

You asked me to copy files from your `pokecounter` and damage calc repos from your profile, but your profile/repository URLs were not included in this environment. I built a complete first version in this repo so you can start using it immediately.

Share the exact GitHub URLs and desired folders, and I can do a direct import in a follow-up.

## PokeCounter integration

Connected source repo: https://github.com/J4PN/PokeCounter.app/tree/main

Open the **Sources** tab in the app and click **Load Data From PokeCounter** to pull:
- `src/data/pokemon.json`
- `src/data/meta-teams.json`
- `src/data/tiers.json`

Loaded teams are then shown in the **Meta** tab under **PokeCounter Imported Meta Teams**.
