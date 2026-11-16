# To-do

## Where we are (2026-10-14)

The app's UI shape is done:

- Skill Shop, skill page and build page with blueprints (PR #12)
- Options page with color modes, the components library, and the about page (PR #13)

Next is the content, which is all still mock. Order:

1. **History** (in progress)
2. Skills
3. Blueprints
4. Home and contact

Wording rule: the app is a showcase of the topics covered over a career. Keep its copy neutral.

## 1. History (in progress)

The history page maps the years first, the big picture before the details. Each entry lists what was covered; the topics it surfaces later land in the Skill Shop list.

- One timeline entry per year, or one entry for condensed years. Exception: 2021 gets two entries (Inside Tecnologia, then the Rede Gazeta start on Nov 22).
- Company names may be used.
- A private, more detailed career map is kept outside this repo. Only short, neutral lines move into `src/data/history.json`.
- MVP layout: expandable year entries (summary that opens into detail bullets), plus a timeless Highlights section. Revisit the layout once the first complete version exists.

Timeline so far:

- 1993: born.
- 2011: got interested in coding; static HTML hello-world pages about topics of interest at the time.
- 2017–2019 (one entry): bachelor's degree in Digital Game Development: programming basics, 2D art, sound design, 3D modeling, artificial intelligence and related topics.
- 2020: one-off freelance jobs.
- 2021: frontend development at Inside Tecnologia.
- Nov 2021 to now: Rede Gazeta, interface analyst (frontend engineer). One entry per year, not condensed. Details being gathered.

After that, the missing pieces: side projects (this app, gamerev, dralph, ddemo), courses and case studies.

Later idea, after the History content is done (not now): a **montage**, like the opening credits of Spider-Man (2002). Fast cuts from page to page, each showing one term or a very short sentence from an era's best moments (no pictures). Opens from the History page as a modal or its own page. Likely built with Motion (motion.dev). Just for fun; it doesn't need to serve any other purpose.

Later idea, same status as the montage: **a searchable career history (RAG)**. Put the history in a vector database and ask questions about it in natural language. Source: only the refined, public entries (the private notes stay out). A way to explore RAG hands-on: a short learning project in the spirit of ddemo, attached to this app, using the `claude` CLI like the recent tools. It may or may not become a feature of the History page.

## 2. Skills

All 36 skills in `src/data/skillsList.json` are mock or draft.

- The fresh topic definitions **add to** the current list rather than replace it. Topics may be moved around afterwards.
- Add the "Also Touched" stacks (Python, C#, PHP, Angular, Postgres, Docker, ...), likely in their own topic.
- Some were used well into production (backend work in particular), so a skill should be able to show its depth, e.g. "tried" vs "used in production".
- Open question: Docker may belong outside "Also Touched".
- Naming rule: skills about AI tooling are always "AI skills" or "LLM skills", never just "skills", so they don't blur with the Skill Shop's skills.

## 3. Blueprints

`src/data/blueprints.ts` is mock. Three blueprints, each a set of topics:

- **Frontend Engineer**
- **AI-assisted Developer**: building with AI (Matt Pocock / aihero.dev style: specs, tickets, agent loops, human review). Building AI into products is only mentioned as studied, plus one LLM feature shipped to production, described generically (never name or detail the project).
- **Product Engineer**: product thinking inside a team (owning outcomes, deciding what to build), plus some 0-to-1 building.

No backend blueprint: backend work was real and reached production, but out of necessity, never the focus.

Self-definition, checked against git across all eras: a frontend engineer focused on UI and UX, who ships end-to-end features when needed (routes, controllers, integrations) and owns build and CI tooling. Frontend is about 80% of the work, tooling and DevOps about 15%, backend under 10%. Use "fullstack" only with a qualifier ("frontend-leaning", "end-to-end features"), never as the headline. Shape the blueprints from this.

## 4. Home and contact

- Real profile photo (hero, and the contact card on the build page).
- Hero copy: "Browse the frontend concepts I work with every day." is a placeholder.
- CV PDF: put it in `public/` and turn on `CV_DOWNLOAD` in `src/data/contactLinks.ts`.
- Instagram and Facebook links are still mock: make them real or remove them.

## Evidence repos: make dralph and ddemo public

Both are private on GitHub and are the main evidence for the AI-assisted Developer blueprint. Before switching them to public:

- `~/Desktop/dralph`: review contents for private information.
- `~/Desktop/ddemo`: review contents for private information. 8 tracked files mention Cloud Run URLs, service account names and GCP project IDs; remove or genericize them.
- Run a secret scanner over the full git history of both (e.g. `gitleaks detect`).
- Then link them from the build (`gamerev`, already public, exists to test dralph).

## Close the test gap

Tests were never a focus, so build them and learn them at the same time. Order: react-shop, then ddemo, then the rest.

1. **react-shop**
   - Skill Shop: add a "Testing" skill under "Engineering practices", marked as in progress until the work below lands.
   - Vitest + React Testing Library. Start with the pure functions in `src/lib` (`skillSort`, `featureFlags`, `skillPath`, `blueprintPlot`, `mergeTransition`), then the build and theme contexts (equip/remove, `localStorage`).
   - Data checks: unique skill ids, every skill's topic is known, blueprints only reference topics that exist.
   - One Playwright test (equip a topic, see it on the build page), plus GitHub Actions running the tests on every PR.
2. **ddemo**: CI smoke test (build the image, start Compose with Postgres, call a health endpoint, guestbook write and read), plus checks that migrations apply and rollbacks work.
3. **The rest**: endorse-backend test-first from its ADRs; dralph with `bats` + `shellcheck` (patches get exported, the mount is never written to); blp-next Firestore rules on the emulator; agtdemo rate limit and killswitch with pytest; gamerev coverage report + one test on the static build.

Learn along the way: unit vs integration vs e2e, test pyramid vs trophy, mocks vs fakes, flaky tests, why coverage isn't the goal.

## Later (technical, optional)

- Bundle over 500 kB: split it with dynamic imports.
- `FEATURE_FLAG_MENU` now gates the demo box on the options page; the name could be updated.
