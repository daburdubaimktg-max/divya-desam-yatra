# Divya Desam Yatra: Project Handover

Version 5.0, updated 17 November 2026 by Claude (Opus 5.5) for Nishant Sukumaran; first built 16 November 2026 (Fable 5.2).
For: Khushi (Claude Code rebuild for GitHub Pages) and for future update sessions with Opus 5.5.


## 0. What changed in v2 (read this first)

- **Photographs for all 108** (111 files in `img/`, named `001.jpg` to `108.jpg`, plus `020a`, `020b`, `034a` for twin shrines). All come from Wikimedia Commons under free licences; photographer, licence and source link are stored per image in `src/wiki.js` and shown under each picture and on the Sources page. No book or app images are used.
- **`src/wiki.js` is generated**, not hand-written: `python3 gen_wiki.py research/divyadesam-wiki-pack.json` rebuilds it and the `img/` folder from the research pack (Wikipedia list rows, article intros, infoboxes, coordinates, image credits, base64 thumbnails). The pack was collected in a browser from the Wikipedia API on 16 Nov 2026.
- **Map view** (`#map`): schematic SVG dot map from coordinates, six zoom presets, dots coloured by diary status. No tiles, so it works offline and inside the Claude artifact.
- **Every temple now has descriptive text**: a hand-written full profile (21 temples) or the Wikipedia introduction (the rest), with attribution, plus vimanam, tank, festival and builder where the Wikipedia infobox gives them. Google Maps links now use exact coordinates, with a Directions link.
- **New palette**: maroon and gold header, sandal background, peacock accents; dark theme to match.
- **Five profiles from the scanned book** (2 Uraiyur, 3 Uthamar Koil, 4 Thiruvellarai, 5 Anbil, 20 Thanjavur) in `src/content2.js`. The book confirmed the v1 posture overrides for Anbil (reclining, east) and gave facing directions for these temples.
- **Pasurams**: eight of sixteen Tamil texts checked against Tamil Wikisource or Tamil Wikipedia and labelled so in the app; Thiruppallandu 1 corrected. Still from memory: Thiruvaimozhi 5.8.1, 6.10.10, 10.2.1; Perumal Thirumozhi 8.1; Irandam Thiruvandadi 96; Periya Thirumozhi 2.3.1; Kanninun Siruthambu 1; Mudhal Thiruvandadi 1 (first line only checked).
- **Caitanya-caritamrta references checked** against the BBT text: Sri Ranga 9.79 to 165 (Lakshmi and gopis 9.111 to 162), Rishabha Hill 9.166 (purport: Palni hills, so Azhagar Koil is only a possibility), Naya-tripati 9.219, Sri Vaikuntha 9.222, Adi-kesava 9.234 to 241, Ananta Padmanabha 9.241 to 242 (two days).
- The artifact is now published as `index.html` plus the `img/` files. On GitHub Pages copy both.

**Still open after v3:** seven pasuram texts unchecked; facing direction not a structured field; the blessed-by index needs a cited source; divyadesam.com and templenet were not mined (divyadesam.org was read but its numbering differs and it was not merged); 350 book pages not yet scanned; no audio; diary account-sync still untested with a second person.

## 0a. What changed in v3

- **All 108 temples now have a hand-written profile.** 21 long ones in `content.js` and `content2.js`; 87 short ones in `src/short.js` (story, what not to miss, planning tip), written from the collected Wikipedia notes plus general Sri Vaishnava tradition. They need reviewers' eyes like everything else.
- **"Blessed by the Lord" index (brief item 4).** Each temple has a "Blessed here" line (pratyaksham, as told in the sthala purana) and category codes; the Temples tab has a new filter (devas, sages, kings, devotees and Azhwars, heroes of the epics, Lakshmi and Bhumi Devi), and search covers these names. Source: tradition as recalled, not a single citable table. Treat as a first draft.
- **Facing direction** is given in the text where a source confirmed it (book or Wikipedia); it is still not a structured field.
- **Pasurams:** Thiruvaimozhi 6.10.10 now checked against koyil.org. Nine of sixteen checked. Still from memory: Thiruvaimozhi 5.8.1 (first line confirmed only) and 10.2.1; Perumal Thirumozhi 8.1; Irandam Thiruvandadi 96; Periya Thirumozhi 2.3.1; Kanninun Siruthambu 1; Mudhal Thiruvandadi 1 (first line confirmed only). Sources to finish the job: divyaprabandham.koyil.org and acharya.org.
- **Blocked sources:** on the laptop used for research, the office web filter blocks divyadesam.com and bvmlu.org (category "religion"), and templesyatra.com has no posture or pratyaksham fields. divyadesam.org loads but could not be saved to disk. Retry from a home network.
- `gen_wiki.py` fixed so infobox values no longer pick up stray field labels.

## 0b. v3.1

- **All 16 pasuram texts are now checked** against a published edition (koyil.org, Tamil Wikisource or Tamil Wikipedia) and labelled in the app. Only sandhi (word-joining) differences were found.
- **Audio:** no freely licensed recordings exist on Wikimedia Commons, and divyadesam.org has none. koyil.org publishes audio pages per decad (for example "thiruvAimozhi 8.1 Audio") but the office filter blocks that site, so files were not checked. Each pasuram card now has two links: YouTube recitations and koyil.org meaning and audio. Embedding real audio needs permission from the reciters or recordings by friends.
- **Suggested websites:** divyadesam.org read (no audio, no structured fields); divyadesam.com and koyil.org blocked by the office filter; templenet not mined.

## 0c. v4 (Opus 5.5, 16 Nov 2026)

- **Real zoomable map** (`src/map.js`, `src/basemap.js`): Leaflet 1.9.4 (from cdnjs; CSS inlined in `shell.html`) on an offline vector base (Natural Earth 1:10m countries from world-atlas 2.0.2 and Indian state lines from datamaps 0.5.9, simplified to 250 KB) because a Claude artifact may not load map tiles. Pins coloured by diary status, names appear from zoom 10, a pop-up per pin with photo, temple page, Google Maps and Directions; ten region views fitted to their temples; shrines sharing one compound are spread slightly so each can be tapped.
  - **On GitHub Pages set `MAP_TILES` in `src/map.js` to an OpenStreetMap tile URL** (`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, attribution "© OpenStreetMap contributors") to get full street detail. Bundle leaflet.js locally for offline use.
  - **Google Maps routes** per base town (`routeLinks`): nearest-neighbour order, split into legs of up to 10 stops (Google's URL limit: destination plus 9 waypoints; phone browsers allow fewer, so open in the Google Maps app).
  - **Google My Maps export**: buttons in the map view (`downloads` capability declared on the artifact) plus `Divya Desam Yatra - 106 temples (Google My Maps).kml` and `.csv` in the app folder.
- **Pasurams on every temple page**: `src/verses.js`. Ten more verses with Tamil text as quoted in each temple's Tamil Wikipedia article, covering 19 more temples (2, 3, 5, 6, 7, 9, 15, 20, 45, 47, 49, 50, 52, 53, 54, 55, 59, 63, 78, 89, 90), with generated transliteration (`tamilTr`) and English study drafts. `SING` lists, for all 108, where the Azhwars sing the temple (decad and verse references from T. R. S. Iyengar's mangalasasanam table and the commentary tradition), each with a koyil.org search link and a YouTube link. Single-verse references for 11, 12, 25, 57, 64, 95, 104 need checking.
- **Sourced fields** (`src/tamilwiki.js`, from the Tamil Wikipedia infobox and text of 106 temple articles): facing direction for 51 temples (only where one direction is stated), temple tank for 45, sacred tree, vimanam and pratyaksham where given. New "Lord faces" filter. The facing value is what the article states and can refer to the main shrine only; reviewers should confirm.
- **Extras** (`src/extras.js`): `#checklist` (tick the 106, copy as text, download CSV), `#quiz` (questions generated from the data, learnt counter stored in `S.learnt`), `#nearby` (eight abhimana sthalams and ten ISKCON temples on the route, also shown under each base town when Gaudiya notes are on).
- **Blocked on the office laptop** (category "religion"): koyil.org, divyadesam.com, trsiyengar.com, projectmadurai.org, bvmlu.org. Full-text Tamil for the remaining temples should come from Project Madurai or koyil.org on a home network.

## 0d. v5 (17 Nov 2026): a verse on every temple page

- **Verse text for the remaining 73 temples**, collected by Khushi on a home network (`research/divyadesam-verses-v5.json`, `research/khushi-report-v5.md`, raw downloads in `research/khushi-raw.zip`). Generated into `src/verses5.js` by `gen_v5.py`; every one of the 108 temple pages now shows at least one verse (110 verse blocks in all).
  - Tamil exactly as published by Project Madurai; for 26, 56, 58 and 99 from dravidaveda.org because the Project Madurai file has broken characters. One hand fix: the stray Latin "f" removed from 68 (Thiruvaimozhi 9.7.1).
  - Transliteration as published on koyil.org; where koyil.org has none (67, 71, 76, 95) the app generates one with `tamilTr`.
  - English renderings are Claude's study drafts (in `gen_v5.py`, keyed by NDP number), not copied translations.
  - Each verse links straight to its koyil.org page and its Tamil source, and carries a collapsible "Source note for reviewers" listing every word-level difference between the two sources.
  - Shared verses: 40 and 96 (Perumal Thirumozhi 10.1, names Ayodhya), 80 and 81 (Thiruvaimozhi 9.2.4). Report offers Perumal Thirumozhi 10.8 as a non-duplicate alternative for 96.
  - References changed by Khushi: 19 uses Periya Thirumozhi 9.2.10 (the only verse naming Nagai); 96 uses Perumal Thirumozhi 10.1. 95 (Thirukkurunthandakam 19) could not be cross-checked: koyil.org has no page for it.
- **Reviewer task**: the report's table of word-level differences (about 35 verses, mostly single letters such as 69 அடியேண் for அடியேன், 71 மீமசை for மீமிசை, 65, 67, 72) lists likely typing slips in the e-text. They are shown as published; Malati or Hrishikesh should confirm each before it is corrected.

## 0e. v5.1 (17 Nov 2026): GitHub Pages, installable, offline

No temple fact, Tamil text, transliteration or translation was changed. `index.html` text was compared route by route with v5.0 and is identical apart from the version number and the new buttons.

- **Build**: still one `index.html` from `build.py` (now also includes `src/config.js` first and `src/pwa.js` last) plus a generated `sw.js`. No framework, no bundler.
- **Map**: Leaflet 1.9.4 is served from `vendor/leaflet.js` (no cdnjs). `MAP_TILES` is the OpenStreetMap URL. The offline vector base is always drawn underneath; when tiles load they cover it and the app's own state and city labels are hidden; with no network the vector base shows through. Tiles are requested only on http(s), so `index.html` opened from disk and the Claude artifact keep the vector map.
- **Installable (PWA)**: `manifest.webmanifest` (name "Divya Desam Yatra", short name "Divya Desam", standalone, theme colour `--head` #6d1422, background `--bg` #fbf4e6), icons in `icons/` including the 180 px apple-touch-icon. The icon is an original gopuram outline in teal (`--rose`) and gold; no deity image.
- **Offline**: `sw.js` stores the page, Leaflet, icons, manifest, all 111 photographs and the Google Fonts (stylesheet and every font file it lists) at install. Map tiles already viewed are kept (up to 600). Cache name is `ddy-app-<APP_VERSION>-<content hash>`; old app caches are deleted when a new version takes over. A new version waits until the person taps "Update available, tap to refresh".
- **Storage**: unchanged. Key `divyadesam-yatra-v1`, same shape as section 3. `window.claude` code is untouched and still silent when absent. Copy-and-paste backup and restore unchanged; added "Download backup as file" and "Restore from file" (same JSON as the pasted backup, so the two are interchangeable).
- **Downloads** (KML, CSV, checklist, backup) go through `saveFile()` in `src/pwa.js`: the artifact's `downloads` capability when inside Claude, otherwise an ordinary browser download (the share sheet in an installed iPhone app).
- **Corrections**: the in-app list and "Copy all to send" are unchanged. Added "Send by email" (a mailto link; recipient is `CORRECTIONS_EMAIL` in `src/config.js`, blank until Nishant chooses an address) and "Report on GitHub (Issues)" (shown when the app runs on github.io, or when `REPO_URL` is set).
- **Not put in the public repository**: `research/khushi-raw.zip` (contains koyil.org commentary, which must not be redistributed) and `EMAIL_to_Khushi.md` (a private email). Both are listed in `.gitignore`.
- **Tested** in Chromium at 390 px and 820 px, light and dark, every route in the brief plus #map, #checklist, #quiz, #nearby, #t-68: no console errors, no sideways scrolling; offline reload and offline cold start; update notice and refresh; an existing v1 diary read, backed up to a file and restored. Not tested on a real iPhone or iPad: that check is still needed.

## 1. What exists today

- **Live app (Claude artifact):** https://claude.ai/artifact/Cnu65GRRpYMZBGbkyGHFzY (private to Nishant until he shares it).
- **Source**, in `app-source/` of the 108 DIVYADESAM folder:
  - `src/data.js`: 108 temple records in a pipe-separated block (`RAW`), plus `AZ` (twelve Azhwars), `GROUPS`, lookup tables.
  - `src/content.js`: `DEEP` (16 full temple profiles with pasurams), `BASES` (19 base towns), `LEARN` (7 articles), `SOURCES`.
  - `src/app.js`: all logic. Vanilla JavaScript, no framework, no build tools beyond concatenation.
  - `src/style.css`, `src/shell.html`.
  - `build.py`: `python3 build.py` writes one self-contained `index.html` (about 135 KB).
- `index.html` works as it is when opened from disk or hosted on any static host. The only outside requests are Google Fonts.

## 2. Features

| Area | What it does |
|---|---|
| Home | Progress ring (visited of 106), progress by region, temple of the day, wish list, entry tiles |
| Temples | Search plus seven filters: region, state, posture, form of the Lord, Azhwar, sacred group, my status |
| Temple page | Facts, one-line pearl, full profile where written, pasuram (Tamil, transliteration, English draft), links to Google Maps, YouTube, Wikipedia, pasuram search and official site, diary, correction box, previous and next |
| Azhwars | Twelve Azhwars with life sketch, works, and every temple each sang, sorted by verse count |
| Journeys | Nine sacred groups, 19 base towns with tips, computed "threads" across temples |
| Learn | What a Divya Desam is; Sri Vaishnavism; Tenkalai and Vadakalai; Sri Vaishnava and Gaudiya synthesis; Mahaprabhu's route; yatra tips; glossary |
| My Yatra | Name, companions, toggle for Gaudiya notes, larger text, diary list, backup and restore by copy and paste, corrections list with copy-to-send |

Routes are plain hashes: `#home #temples #azhwars #journeys #learn #me #about #t-<n> #a-<code> #g-<code>`.

## 3. Storage

- `localStorage` key `divyadesam-yatra-v1`: `{profile:{name,withWhom,gaudiya,big}, diary:{<n>:{s:'v'|'w', d:'YYYY-MM-DD', note}}, fb:[{n,text,t}], ts}`.
- In the Claude artifact only: the `db` and `user` capabilities mirror profile and diary to `data/users/<id>/yatra` (private to each viewer) and corrections to `feedback/<id>` (readable by the owner). All calls are wrapped in try/catch and the app works without them. This path was written from the capability description and has not been exercised by a second signed-in user yet. Test it with one friend before relying on it.
- On GitHub Pages there is no `window.claude`, so the app silently uses `localStorage` only. Each person's diary then lives on their own device; backup and restore cover moving it.

## 4. Data decisions and corrections to sources

Numbering and names follow Wikipedia's "Divya Desam" list. Pasuram counts follow the "Mangalasasanam by Divyadesam" table. Postures follow the Brindhavan Japam list. Where I overrode a source from my own knowledge, a reviewer should confirm:

| # | Temple | Source said | App says | Why |
|---|---|---|---|---|
| 5 | Anbil | standing | reclining | Widely described as bhujanga sayanam |
| 29 | Arimeya Vinnagaram | standing | sitting | Kudamadu Koothan is described as seated |
| 32 | Manimada Koil | standing | sitting | Narayana seated |
| 51 | Thiruvekka | standing | reclining | Yathothakari is famously reclining |
| 60 | Thiruvallikkeni | blank | standing | Venkatakrishna stands |
| 76 | Thiruvattaru | standing | reclining | Adikesava reclines |
| 77 | Thiruppathisaram | standing | sitting | Thiruvazhmarban is seated |
| 79 | Vanamamalai | standing | sitting | Thothadrinathan is seated |
| 95 | Thirumeyyam | standing | standing and reclining | Two sanctums |
| 98 | Thiruppirithi | standing | reclining | Traditional lists give kidantha |
| 40 | Thiruchitrakoodam | Thirumangai 32 | Kulasekhara 11, Thirumangai 21 | Perumal Thirumozhi 10 is on this shrine |
| 56 | Parameswara Vinnagaram | Thirumangai 1 | Thirumangai 10 | Periya Thirumozhi 2.9 |
| 69 | Thiruvallavazh | Nammazhwar 10 | Nammazhwar 11, Thirumangai 11 | Periya Thirumozhi 9.7 |
| 90 | Thirukkoodal | Thondaradippodi 1 | Thirumazhisai 1, Thirumangai 1 | Column slip in source |
| 93 | Thirukkoshtiyur | Kulasekhara 22, Thondaradippodi 13 | Periyazhwar 22, Thirumangai 13 | Column slip in source |

Because of these and because sources differ, the app's totals (66 standing, 22 sitting, 29 reclining counting multi-posture temples more than once; 85 temples for Thirumangai) do not match the traditional tallies (60, 21, 27; 86). The app says so on screen.

**Not verified at all in v1:** facing direction, vimanam, pushkarini, sthala vriksham and pratyaksham (to whom the Lord appeared). These fields are not in the data yet. Tamil spellings of the 108 names and the alternate names of Perumal and Thayar were written from knowledge and need a Tamil reader's pass. Caitanya-caritamrta verse numbers after Madhya 9.90 were not checked against the text (marked with an asterisk in the Learn tab).

## 5. Content rules

1. Summarise in fresh words; never paste from books, sites or other apps.
2. No photographs until rights are cleared per image. The scanned book (Davey Varghese, *108 Vishnu Temples*, Niyogi Books) is copyrighted: use it as a reference for facts and chapter order, not for text or pictures.
3. Pasuram English is a study draft until a named reviewer signs off.
4. No timings or phone numbers in data. Link out.

## 6. Backlog for Opus 5.5 (in priority order)

1. Apply corrections from Malati, Hrishikesh and other reviewers; log each with name and date below.
2. Add full profiles for the remaining 92 temples, region by region, starting with those Nishant has already visited (ask him for his trip records) and the remaining 350 pages of the book when scanned.
3. Add fields: facing, vimanam, pushkarini, pratyaksham, festival month, with a source per temple, and add "blessed whom" as a filter (Nishant's index 4).
4. Add coordinates and a map view (Leaflet with OpenStreetMap tiles will work on GitHub Pages; it will not load inside the Claude artifact because remote images are blocked there).
5. Audio: link each pasuram to a recording with permission, or record friends chanting.
6. Photographs with permission; a "my photos" slot per temple stored on the device.
7. Abhimana sthalams and nearby ISKCON centres as optional layers.
8. Printable checklist of the 106.
9. Benchmark ideas noted from the two iPhone apps reviewed: quiz per temple, "learnt" counter beside "visited", nearby temples by GPS, do's and don'ts page, tour packages page (not planned, the app is non-commercial).

## 7. Change log

- 2026-11-17, v5.1: GitHub Pages build. Installable and offline (manifest, icon, service worker with update notice), Leaflet served locally, OpenStreetMap tiles over the offline base, backup and restore by file, email and GitHub Issues links for corrections. No content changes.
- 2026-11-17, v5.0: verse text with transliteration and English study draft for the remaining 73 temples (Khushi's collection), so all 108 temple pages carry a pasuram; direct koyil.org and source links; reviewer source notes.
- 2026-11-16, v1.0: first build. 108 core records, 16 full profiles, 16 pasurams, 7 Learn articles.
- 2026-11-16, v4.0 (Opus 5.5): zoomable map with Google Maps routes and My Maps export, pasuram references for all 108 and verse text for 19 more temples, facing/tank/tree/pratyaksham from Tamil Wikipedia, checklist, quiz, ISKCON and abhimana sthalams.
- 2026-11-16, v3.0: 87 short profiles (all 108 now covered), blessed-by index and filter, one more pasuram checked.
- 2026-11-16, v2.0: photographs, map, Wikipedia text and facts for all temples, new palette, 5 book-based profiles, pasuram and Caitanya-caritamrta checks.

---

# Meta prompt for Khushi (paste into Claude Code)

```
You are helping me rebuild and publish "Divya Desam Yatra", a pilgrim's companion web app for the
108 Divya Desams (Vishnu temples sung by the Azhwars). It is a not-for-profit devotional service
project owned by Nishant Sukumaran. A working version 5.0 already exists as plain HTML, CSS and
JavaScript (live as a Claude artifact). Your job is to turn it into a GitHub Pages site that installs on an iPhone and iPad
home screen and works offline, without changing its content or losing anyone's diary.

Read these first, fully, before writing any code:
- HANDOVER.md (architecture, storage format, data decisions, backlog, content rules)
- PROJECT_INSTRUCTIONS.md (tone, sourcing and review rules)
- README.md in the zip (what each file is)
- skill/divyadesam-tamil-scholar/SKILL.md (rules for any pasuram text: never edit Tamil without a source)
- src/data.js, src/wiki.js (generated), src/content.js, src/content2.js, src/short.js, src/verses.js, src/verses5.js (generated by gen_v5.py), src/tamilwiki.js, src/basemap.js, src/app.js, src/map.js, src/extras.js, src/style.css,
  src/shell.html, build.py, gen_wiki.py, gen_v5.py, research/ (source data), and the img/ folder (111 photographs with credits)

Goals for this session, in order:
1. Create a new public GitHub repository (suggest the name divya-desam-yatra) and reproduce the
   app there so that the published site looks and behaves the same as index.html from build.py.
   Keep it dependency-free: no framework, no bundler. Keeping build.py is fine, or split into
   index.html plus separate css and js files, whichever is simpler to maintain.
1b. In src/map.js set MAP_TILES to the OpenStreetMap tile URL given in HANDOVER section 0c, and
   serve leaflet.js from the site itself instead of cdnjs so the map works offline.
2. Make it an installable PWA: manifest.webmanifest (name "Divya Desam Yatra", short name
   "Divya Desam", standalone display, theme colours taken from the CSS tokens), app icons
   including a 180x180 apple-touch-icon, and a service worker that caches the app shell, the img/ photographs and the
   Google Fonts so the whole app opens with no network inside a temple. Use a versioned cache name
   and show a small "Update available, tap to refresh" notice when a new version is deployed.
   Design an original icon (for example a simple gopuram outline in the app's teal and gold).
   Do not use any deity photograph or another app's artwork.
3. Keep storage compatible: localStorage key "divyadesam-yatra-v1" and the exact JSON shape in
   HANDOVER.md section 3. The Claude-only cloud sync code (window.claude) must stay harmless when
   absent. The copy-and-paste backup and restore must keep working. Add "Download backup as file"
   and "Restore from file", which GitHub Pages allows.
4. Enable GitHub Pages from the main branch, give me the URL, and give Nishant step-by-step
   instructions for iPhone and iPad: open in Safari, Share, Add to Home Screen.
5. Add a simple way for reviewers to send corrections: keep the in-app list with "Copy all to
   send", and add a "Send by email" mailto link and a link to the repository's Issues page.

Rules you must follow:
- Do not change temple facts, pasuram text or translations. If you think something is wrong, list
  it for Nishant under "Questions" and leave the data as it is.
- Keep every photo credit and the Wikipedia attribution visible (licence condition). Do not add
  photographs without a free licence, scraped text, analytics, ads or trackers.
- Do not list temple phone numbers or timings in the data.
- Test at 390 px width (iPhone) and 820 px (iPad), in light and dark mode, and with the network
  switched off after first load. Check every route: #home #temples #azhwars #journeys #learn #me
  #about, a temple page with a full profile (#t-1), one without (#t-2), an Azhwar (#a-Na) and a
  group (#g-NT). There must be no console errors.
- Commit in small steps with clear messages. Ask me before anything destructive.

When you finish, report: the live URL, what you changed, how to deploy an update, and any
questions for Nishant. Then stop. Later sessions will work through the backlog in HANDOVER.md
section 6 using Opus 5.5.
```
