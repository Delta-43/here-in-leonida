---
name: add-location
description: Add a new location or fix an existing one in content/locations (position, name, category, sources, spoilers). Use when the user reports a place, a collectible position or a correction.
---

# Add or fix a location

1. **Find out if it exists.** Search `content/locations/` for the name and for positions within about 25 m (`rg -n "x: <first digits>"` or compare with the coordinates given). Fixing an existing file is better than adding a duplicate.
2. **Get the facts.** You need: category (must exist in `content/categories.yaml`), name, position in game metres or `null`, region and district if known, and the source (in-game by whom, or upstream project with its id, licence and URL). If a fact is missing, ask; never guess a position.
3. **Choose the id.** Lowercase words with hyphens, for example `flamingo-042` or `vice-regal`. It must be unique and never changes later.
4. **Write the file** at `content/locations/<region>/<id>.md`:

   ```markdown
   ---
   id: flamingo-042
   category: cocaine-flamingo
   name: Flamingo on the pier roof
   position: { x: 1412.5, y: 2790.0 }
   region: vice-city
   district: washington-beach
   spoiler: location
   confidence: unverified
   sources:
     - type: in-game
       by: contributor-handle
   ---
   One or two sentences in our own words on how to reach it.

   :::spoiler{level=solution}
   How to get the reward, if it is not obvious.
   :::
   ```

5. **Confidence:** `confirmed` only when someone checked it in game (then set `verified_in`), otherwise `unverified`.
6. Run `bun run validate` and fix every reported problem.
7. Summarise the change: file, id, position, source, confidence.
