# Korean 10BX E-Portfolio — Project Guide

## Overview
Static HTML/CSS/JS e-portfolio for **지성 (Jiseong)**, a Korean 10BX student at UC Berkeley. No build tools — vanilla everything. Open `index.html` in a browser to preview.

## Files
- `index.html` — all content inline, one page
- `style.css` — all styles
- `script.js` — scroll reveal, parallax, navbar, intersection observers
- `CLAUDE.md` — this file

## Page Sections (in order)
1. **Hero** — name + tagline
2. **쓰기 숙제** (`#writings`) — writing assignments
3. **Projects** (`#projects`) — 3 cards side by side (`.proj-grid`)
4. **Reflection** (`#reflection`)
5. **Interviews** (`#interviews`) — US map + genre music list

## Design System
```css
--bg: #ffffff
--surface: #f6f6f6
--border: #e5e5e5
--text: #0d0d0d
--muted: #aaa
--red: #C8102E        /* Cal Berkeley red */
--blue: #003478       /* Cal Berkeley blue */
--font-display: 'Bebas Neue'
--font-body: 'Inter'
--font-korean: 'Nanum Gothic'
```

## Scroll Reveal System (script.js)
- `.reveal` — fades in at 10% visibility (standard observer)
- `.reveal-viz` — fades in only after scrolling 160px past the element (vizObs with `rootMargin: '0px 0px -160px 0px'`) — used so question appears first, then visualization appears after more scrolling
- `.fact-item` — slide-in with factObs (12% threshold)

## Interviews Section Structure
Two sub-blocks inside `<section id="interviews">`:

### 1. US Map (`.map-block`)
- D3.js + topojson choropleth map showing classmate hometowns
- Question: "버클리에 다니지 않았다면..."
- Tooltip: `.map-tooltip` — shows on `mouseenter`, repositions on `mousemove`, hides on `mouseleave`
- Tooltip is large: `min-width:340px`, `padding:2.5rem 3rem`, name `font-size:2.2rem`

### 2. Genre Music List (`.music-viz-block`)
- Question: "가장 좋아하는 가수는 누구예요?"
- `.genre-list` is a **2-column CSS grid** (`grid-template-columns: 1fr 1fr; gap: 0 3rem`)
- 6 genre sections as **flat direct children** (auto-placement fills left→right):
  - Row 1: K-Pop | Indie
  - Row 2: Hip-Hop | Rock
  - Row 3: R&B·Latin | Electronic

### Genre Colors (`--gc` CSS variable)
| Genre | Color |
|---|---|
| K-Pop | `#FF2D7A` |
| Hip-Hop | `#FFCF00` |
| R&B | `#B44FFF` |
| Latin | `#FF7122` |
| Indie | `#4ADE80` |
| Rock | `#FF4520` |
| Electronic | `#00CCDD` |

### Artists (15 total)
Each artist is `<a class="artist-card" href="[spotify]">` containing:
- `.artist-photo` > `<img>` — Wikimedia Commons URL, `object-fit:cover; object-position:center top`, `aspect-ratio:3/4`
- `.artist-name` — artist name
- `.artist-person` — classmate's Korean name

| Artist | Genre | Classmate | Spotify |
|---|---|---|---|
| SG Wannabe | K-Pop | 연재 | `2c3IakpImjWyeXNvyyGsdn` |
| Shiny (SHINee) | K-Pop | 하리 | `2hRQKC0gqlZGPrmUKbcchR` |
| Aespa | K-Pop | 준서 | `6YVMFz59CuY7ngCxTxjpxE` |
| BOYNEXTDOOR | K-Pop | 다혜 | `4hnHLgMSOiqERWBL4jINP1` |
| Kanye West | Hip-Hop | 민종·선종 | `5K4W6rqBFWDnAN6FQUkS6x` |
| Drake | Hip-Hop | 승원 | `3TVXtAsR1Inumwj472S9r4` |
| The Weeknd | R&B·Latin | 발렌틴 | `1Xyo4u8uXC1ZmMpatF05PJ` |
| Tinashe | R&B·Latin | 영선 | `0NIIxcxNHmOoyBx03SfTCD` |
| Bruno Mars | R&B·Latin | 이삭 | `0du5cEVh5yTK9QJze8zvh8` |
| Bad Bunny | Latin | 유나 | `4q3ewBCX7sLwd24euuV69X` |
| Cigarettes After Sex | Indie | 예은 | `1hCkSJcXREhrodeIHQnffn` |
| Laufey | Indie | 진아 | `7gW0r5CkdEUMm42w9XpyZO` |
| Coldplay | Indie | 진 | `4gzpq5DPGxSnKTe4SA8HAU` |
| Slipknot | Rock | 단 | `05fG473iIaoy82BF1aGhL8` |
| Ninajirachi | Electronic | 세은 | `3MekbRujJg5VZThubOlrkR` |

### Artist Photo URLs (Wikimedia Commons)
- SG Wannabe → Kim Jin-ho photo: `Kim_jin_ho.png`
- SHINee → Taemin: `240919_SHINEE_Taemin.jpg`
- Aespa → Karina: `Karina_at_Love_Your_W_event_2025.jpg`
- BOYNEXTDOOR → Woonhak: `Woonhak_of_BoyNextDoor_at_MMA_Awards,_2023_(20231202).jpg`
- Kanye West: `Kanye_West_at_the_2009_Tribeca_Film_Festival_(crop_2).jpg`
- Drake: `Drake_at_The_Carter_Effect_2017_(36818935200)_(cropped).jpg`
- The Weeknd: `The_Weeknd_Portrait_by_Brian_Ziff.jpg`
- Tinashe: `Tinashe_at_Coachella_2024_-_04_(cropped).jpg`
- Bruno Mars: `Bruno_Mars_portrait.jpg` (no thumb/)
- Bad Bunny: `Bad_Bunny_2019_by_Glenn_Francis_(cropped).jpg`
- Cigarettes After Sex → Greg Gonzalez: `Greg_Gonzalez_on_CAS.jpg`
- Laufey: `Laufey_radio_city_music_hall_2024_(cropped).jpg`
- Coldplay → Chris Martin: `ChrisMartinManch030623_(cropped).jpg`
- Slipknot: `20180602_Nürnberg_Rock_im_Park_Stone_Sour_0270_(cropped).jpg`
- Ninajirachi: `Ninajirachi_London_2026.png`

## Projects Section (`.proj-grid`)
3-column grid, 3 cards:

| Card | Title | Description | Link |
|---|---|---|---|
| Group Project Video | Group Project Video | 꿈팀 | Google Drive |
| Presentation Slides | Presentation Slides | 딹갈비 | Google Slides |
| Reflections | Reflections | *(no description)* | Coming soon (`.proj-card--soon`) |

Cards have a red top-border reveal on hover (`::before` pseudo-element with `scaleX` transform).

## Key CSS Patterns
- `.genre-section` has `border-bottom: 1px solid var(--border)`; `.genre-section--last` removes it
- `.genre-label` uses `var(--font-display)` (Bebas Neue), `font-size:2rem`, colored via `var(--gc)`
- `.artist-card` is `width:155px`, lifts on hover with `translateY(-5px)`
- `.artist-photo img` uses `object-fit:cover; object-position:center top` to show faces
- Map tooltip enlarged: `min-width:340px`, font sizes `2.2rem`/`1.8rem`

## Nav Links
```
쓰기 숙제 → #writings
프로젝트 → #projects
성찰 → #reflection
인터뷰 → #interviews
```

## External CDNs
- D3.js v7: `cdn.jsdelivr.net/npm/d3@7`
- topojson-client v3: `cdn.jsdelivr.net/npm/topojson-client@3`
- Google Fonts: Bebas Neue, Inter, Nanum Gothic
