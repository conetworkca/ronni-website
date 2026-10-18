# Site-wide layout (header + footer)

Source: https://ronnidraft.conetwork.ca — identical on all six pages.

---

## Header

Sticky at the top of the page, translucent linen background with backdrop blur.

### Logo
- **Image:** `https://vibe.filesafe.space/1791614281676719284/attachments/64980e2c-6484-4edd-b1c8-7ff8876ebd29.png`
- **Alt:** `Ronni Landeck — High-Performance & Leadership Coach`
- **Links to:** `/` (aria-label: `Ronni Landeck — Home`)

### Navigation (desktop, shown at 1020px and wider)
| Text | Links to |
|---|---|
| Home | `/` |
| Career Freedom Catalyst | `/career-freedom-catalyst` |
| Free Blueprint | `/free-blueprint` |
| About | `/about` |
| Corporate | `/corporate` |
| Contact | `/contact` |

### Buttons
| Text | Links to | Notes |
|---|---|---|
| Book a Call | `https://ronnilandeck.com/call/` | Opens in new tab. Wine/primary filled button. |
| *(icon only)* | — | Hamburger button, aria-label `Open menu` (changes to `Close menu` when open). Shown below 1020px only. |

### Mobile menu
Drops down below the header when the hamburger is tapped. Contains the same six nav links as above plus the **Book a Call** button (`https://ronnilandeck.com/call/`, new tab).

### Header animation
- On scroll past 24px, the header shrinks/tightens (padding and logo height transition over 300ms) and gains a bottom border.
- Nav links: text colour changes to wine on hover, and an underline grows from the left (`scale-x` 0 → 100%, 300ms). The current page's link shows the underline permanently.
- Book a Call button: on hover, darkens, lifts 2px and gains a soft shadow (200ms).
- Mobile menu: fades in and slides down from the top (200ms).

---

## Footer

Linen background, top border.

### Column 1 — brand
- **Logo image:** `https://vibe.filesafe.space/1791614281676719284/attachments/64980e2c-6484-4edd-b1c8-7ff8876ebd29.png`
  - **Alt:** `Ronni Landeck — High-Performance & Leadership Coach`
  - **Links to:** `/` (aria-label: `Ronni Landeck — Home`)
- **Copy (placeholder on the draft):**
  > [Short positioning line about Ronni’s coaching for accomplished mid-career women in STEM, healthcare and professional services.]
- **Social icon buttons** (all open in a new tab):
  | Icon (aria-label) | Links to |
  |---|---|
  | Facebook | `https://www.facebook.com/RonniLandeckBast/` |
  | LinkedIn | `https://www.linkedin.com/in/ronni-landeck-bast/` |
  | Instagram | `https://www.instagram.com/professional_coach_ronni/` |

### Column 2 — Explore
Heading: **Explore**

| Text | Links to |
|---|---|
| Career Freedom Catalyst | `/career-freedom-catalyst` |
| Free Blueprint | `/free-blueprint` |
| About | `/about` |
| Corporate | `/corporate` |
| Contact | `/contact` |

### Column 3 — Connect
Heading: **Connect**

> [Short invitation to book a call or a one-line contact prompt.]

| Text | Links to |
|---|---|
| Get in touch → | `/contact` |

### Bottom bar
> Legal & tax content on this site is educational and not a substitute for legal or financial advice.

> © 2026 Ronni Landeck

| Text | Links to |
|---|---|
| Privacy Policy | `https://ronnilandeck.com/privacy-policy/` (new tab) |
| Terms | `https://ronnilandeck.com/terms/` (new tab) |

### Footer animation
- Social icons: on hover, fill with wine and the icon turns white (300ms).
- Text links: colour changes to wine on hover. "Get in touch →" underlines on hover.

---

## Site-wide animation patterns (used on every page)

- **Scroll reveal:** Almost every block fades in and rises 28px (`opacity 0 → 1`, `translateY(28px) → 0`, 700ms ease-out) when 12% of it enters the viewport. Elements in a group are staggered with a `transition-delay` (noted per page, e.g. 0 / 90 / 180ms). Runs once. Disabled when the visitor has "reduce motion" turned on.
- **Primary button hover:** darker wine, lifts 2px, soft wine shadow (200ms).
- **Outline button hover:** fills with wine, text turns white, lifts 2px, soft shadow (200ms).
- **Card hover:** cards lift 4px (`-translate-y-1`), some also gain a soft shadow.
- **Testimonials ("CLIENT RESULTS" blocks):** On desktop (768px+), 2 or 3 cards in a grid, each scroll-revealed with a 90ms stagger. On mobile, they become a **horizontal swipe slider**: scroll-snap carousel, each card 85vw wide (max 340px), centred snap, hidden scrollbar, with the caption "Swipe for more →" underneath. No autoplay, arrows or dots.
- **Fonts:** Cormorant Garamond (500, 600) for display headings, Jost (300, 400, 500) for body/labels.
