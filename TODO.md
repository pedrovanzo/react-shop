# To-do

## Build page: blueprints (shaping now)

Terms (2026-10-08): the app stays "Skill Shop", but the e-commerce vocabulary is gone. Products are **skills**, the cart is the **build** (the skills you equipped), and "Add" is **Equip**. Routes: `/skill-shop`, `/skill/:name`, `/build` (old `/products`, `/product/:name`, `/cart` redirect).

Build icon: `GiAnvilImpact` (game-icons), used everywhere the cart icon was. Still open: the build page UI.

The role presets are **blueprints** (2026-10-08), so "build" only ever means your equipped skills.

The build page gets game-like **blueprints**:

- A blueprint is a named set of skills. Blueprints can share skills (overlaps are expected).
- Blueprints are defined in code, not created by the user.
- Blueprints reflect roles Pedro can play in a company. Only a few of them.
  - Blueprints (2026-10-08): Frontend Engineer, AI-assisted Developer, Product Engineer.
  - AI-assisted Developer: claims building with AI (Matt Pocock / aihero.dev style: specs, tickets, agent loops, human review). Building AI into products is only mentioned as studied, plus one LLM feature shipped to production at work, described generically (never name or detail the company project).
  - Product Engineer replaces "Entrepreneur": mostly product thinking inside a team (owning outcomes, deciding what to build), plus some 0-to-1 building.
  - No backend blueprint: backend work was real and reached production, but out of necessity, never the focus. Claiming a backend role is too much of a stretch.
- Each blueprint shows:
  - a title
  - a description
  - its composition: the list of skills that make it up
- The build keeps its free list of equipped skills. The build page also gets a blueprints section: each blueprint shows how much of it the build covers and can equip its missing skills.
- Blueprint layout follows the skill page header: placeholder image on the left, title and description on the right, the blueprint's requirements below.
- No coverage, ranks or choices to make: the page shows the builds that exist, based on the skills Pedro has. Skill Shop and the build page are two perspectives on the same data: Skill Shop per skill, the build page per skillset and what it aims to achieve.
- Equip stays (2026-10-08), as a nod to the original shop concept: the visitor's equipped skills (their build) act as highlighted picks across both pages. Skill Shop marks them Equipped; each blueprint card marks which of its skills the visitor equipped ("uses 3 of your picks"). No ranks or scores. Skills are equipped by topic (2026-10-08): no per-skill equip button in the list; topic headers are emphasized and carry "Equip topic"; the skill page's button is "Equip topic" too and equips the skill's whole topic ("Remove topic from build" removes it). Skill Shop opens in the By topic view by default. The build page only removes whole topics ("Remove topic") or everything ("Clear current build"), never single skills.
- First glimpse built (2026-10-08): three blueprint cards (mock content in `src/data/blueprints.ts`) and, below, "Your build" grouped by topic with compact skill rows (links), Remove topic per group and Clear current build.
- Blueprints are made of topics (2026-10-08), labeled "Skills" on the card. Card: header, a star plot of its topics (each point a topic; the topic with the most skills is the strongest point; the visitor's equipped topics drawn on top in blue, a nod to an old soccer game's stat screen), then the topics as a spec list ("React ........ 8", linking to the Skill Shop filtered by that topic), then work goals.
- Card update (2026-10-08): the list is labeled "Blueprint"; work goals are hidden (data kept in `blueprints.ts`). Each card has an Equip button (equips all its topics) that becomes Equipped (hover: Remove, click removes its topics). Equipping fills each topic line with blue, one after another, like a game life bar (shake while filling, white flash when full); removing drains them. The plot's blue shape follows the lines axis by axis.
- The build page has a compact pattern header ("Build": "Different blueprints for different roles that compose my build"), like the stuck Skill Shop header, not sticky. No "Blueprints" heading and no "Your build" list (2026-10-08); "Clear build" sits at the header's right. The final action is the contact card (2026-10-08): on a fully equipped card the plot panel shows a pointer icon and becomes clickable; clicking it merges the cards into one "Pedro Vanzo" card (profile photo, the fully equipped blueprints' plots stacked smaller, and the contact links as spec lines under "Contact"), hiding incomplete cards. Clicking the merged plot area splits it back. The transition is staggered (`src/lib/mergeTransition.ts`): merging starts the plots at 0 (0.8s) and the cards 0.3s later (0.9s, sliding into the contact card while fading); splitting starts the cards at 0 and the plots 0.3s later. Card buttons: "Equip" (becomes a disabled "Equipped" when complete) plus a trash button when any topic is equipped. The leftover space stays empty for now.
- The navbar sticks to the top on every page (trial, to get a feel for it); sticky sidebars and the Skill Shop header sit below it.
- First glimpse of the UI (not shaped yet): a card per build with its name, the skills it uses, and its work goals (what can be achieved with it). That is the "core plus bonus": skills used, plus goals.
- Replaces the `$--` price placeholders and the item count.

## Skills: add the "Also Touched" stacks

`~/Desktop/dstudy/thesaurus/scope.md` has an "Also Touched" section (Python, C#, PHP, Angular, Postgres, Docker, ...) that isn't in `src/data/skillsList.json` yet. Only the core sections were turned into skills. Add them as skills, likely in their own topic, when the skill content is revised.

Open question from scope.md: Docker may belong outside "Also Touched".

Naming rule: skills about AI tooling are always labeled "AI skills" or "LLM skills" (whichever fits), never just "skills", so they don't blur with the Skill Shop's skills (e.g. Claude Code skills are "AI skills").

Some of these were used well into production (backend work in particular), not just hello-worlds. The skills should be able to say so, e.g. a per-skill depth like "tried" vs "used in production".

## Evidence repos: make dralph and ddemo public

Both are private on GitHub and are the main evidence for the AI-assisted Developer build. Before switching them to public:

- `~/Desktop/dralph`: review contents for private information.
- `~/Desktop/ddemo`: review contents for private information. 8 tracked files mention Cloud Run URLs, service account names and GCP project IDs; remove or genericize them.
- Run a secret scanner over the full git history of both (e.g. `gitleaks detect`).
- Then link them from the build (`gamerev`, already public, exists to test dralph).
