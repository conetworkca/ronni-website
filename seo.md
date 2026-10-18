# SEO — page settings for GHL

Pulled word for word from the `<head>` of each page on https://ronnidraft.conetwork.ca. HTML entities have been decoded (`&amp;` → `&`, `&#x27;` → `'`).

In GHL, open each page → **Settings** (gear icon) → **SEO meta data**, and paste:
- **Title** → *Page title*
- **Description** → *Meta description*
- **Social image** → *Social share image*
- **Favicon** → see the [Favicon](#favicon) section at the bottom

The draft also sets a separate social title/description (og:title / og:description) for each page. GHL's page settings generally have one title and one description field, so the main title/description are the ones to use there. The social versions are listed too in case they're wanted in custom head code (see the end).

---

## Home — `/`

| Field | Value |
|---|---|
| **Page title** | Ronni Landeck \| Career Freedom Catalyst for Women in STEM & Healthcare |
| **Meta description** | Evidence-based coaching for accomplished mid-career women in STEM, healthcare and professional services. Turn corporate expertise into a validated consulting practice. |
| **Social share image** | `https://vibe.filesafe.space/1791614281676719284/attachments/2f633b56-555e-47aa-bb26-f03a01e5f0bf.png` (hero photo of Ronni) |
| Social title (og:title) | Ronni Landeck \| Career Freedom Catalyst |
| Social description (og:description) | Evidence-based coaching for accomplished mid-career women in STEM, healthcare and professional services. |

---

## Career Freedom Catalyst — `/career-freedom-catalyst`

| Field | Value |
|---|---|
| **Page title** | Career Freedom Catalyst \| Ronni Landeck |
| **Meta description** | The Career Freedom Catalyst — Ronni Landeck's 90-day, evidence-based program for accomplished mid-career women in STEM, healthcare and professional services to build a consulting foundation strong enough to exit corporate. |
| **Social share image** | ⚠️ **None set on the draft** |
| Social title (og:title) | Career Freedom Catalyst \| Ronni Landeck |
| Social description (og:description) | Build a consulting foundation strong enough to exit corporate within 12 months — with proof, income, and a plan. Ronni Landeck's evidence-based program for accomplished mid-career women in STEM, healthcare and professional services. |

---

## Free Blueprint — `/free-blueprint`

| Field | Value |
|---|---|
| **Page title** | Free Blueprint \| The STEM-to-Consultant Blueprint — Ronni Landeck |
| **Meta description** | Download the free STEM-to-Consultant Blueprint. Identify the consulting offer hiding in your technical expertise, avoid pricing mistakes, and run a legal and benefits audit before you make a move. |
| **Social share image** | ⚠️ **None set on the draft** |
| Social title (og:title) | The STEM-to-Consultant Blueprint \| Ronni Landeck |
| Social description (og:description) | A fillable blueprint to translate your technical expertise into a high-ticket consulting offer — without overthinking your niche or making a reckless move. |

---

## About — `/about`

| Field | Value |
|---|---|
| **Page title** | About Ronni Landeck \| Career Freedom Catalyst |
| **Meta description** | Ronni Landeck spent 25 years in corporate leadership before building her consulting practice first — then making the move. ICF-credentialed coach for accomplished women in STEM, healthcare and professional services. |
| **Social share image** | `https://vibe.filesafe.space/1791614281676719284/attachments/073908c0-6ae2-4d9b-836f-d6dcf8c3dd35.png` (About page photo of Ronni) |
| Social title (og:title) | About Ronni Landeck \| Career Freedom Catalyst |
| Social description (og:description) | A coach who has done this from both sides — 25 years of corporate leadership and 500+ hours coaching accomplished professionals through career transitions. |

---

## Corporate — `/corporate`

| Field | Value |
|---|---|
| **Page title** | Corporate Facilitation & Speaking \| Ronni Landeck |
| **Meta description** | Workshops, talks and retreat facilitation with Ronni Landeck for high-performing teams strengthening resilience, communication, accountability and execution. |
| **Social share image** | ⚠️ **None set on the draft** |
| Social title (og:title) | Corporate Facilitation & Speaking \| Ronni Landeck |
| Social description (og:description) | Leadership facilitation for teams doing serious work — workshops, talks and retreats pairing practical frameworks with deep conversation. |

---

## Contact — `/contact`

| Field | Value |
|---|---|
| **Page title** | Contact Ronni Landeck \| Career Freedom Catalyst |
| **Meta description** | Book a consulting roadmap call or send Ronni Landeck an inquiry about Career Freedom Catalyst, corporate facilitation, or speaking. |
| **Social share image** | ⚠️ **None set on the draft** |
| Social title (og:title) | Contact Ronni Landeck \| Career Freedom Catalyst |
| Social description (og:description) | Two simple ways to reach Ronni — book a focused consulting roadmap call, or send a short inquiry and she will respond personally. |

---

## Favicon

⚠️ **The draft site has no favicon.** None of the pages declare an icon, and `/favicon.ico`, `/favicon.png`, `/favicon.svg` and `/apple-touch-icon.png` all return 404. Browsers show a blank/default tab icon.

A favicon needs to be created (e.g. a square crop of the logo mark or Ronni's initials in Wine `#682830` on Linen `#EBEAE8`, see [brand.md](brand.md)). Upload it in GHL under the site/funnel **Settings → Favicon**. That setting applies to every page.

---

## Tags on every page

These are the same across all six pages:

| Tag | Value |
|---|---|
| `meta name="author"` | Ronni Landeck |
| `og:type` | website |
| `twitter:card` | summary_large_image |
| `twitter:image` | Same as the social share image (Home and About only) |

The draft has **no** canonical URL, robots tag, `og:url`, `twitter:title` or `twitter:description`.

---

## Gaps to fill before launch

1. **Social share image** is missing on 4 pages: Career Freedom Catalyst, Free Blueprint, Corporate, Contact. If left empty, links shared on LinkedIn/Facebook will show no image. A quick option is to reuse the Home image (`2f633b56…png`) until page-specific images are made.
2. **Favicon** doesn't exist yet (see above).
3. **Image hosting:** both social images are hosted on the draft builder (`vibe.filesafe.space`). Upload them to the GHL media library and use those URLs instead, so they keep working if the draft is taken down.

---

## Optional: social title/description via custom head code

If you want the separate social title/description from the draft, add this to the page's **Tracking Code → Header** in GHL (example for Career Freedom Catalyst; swap the values per page from the tables above):

```html
<meta property="og:title" content="Career Freedom Catalyst | Ronni Landeck">
<meta property="og:description" content="Build a consulting foundation strong enough to exit corporate within 12 months — with proof, income, and a plan. Ronni Landeck's evidence-based program for accomplished mid-career women in STEM, healthcare and professional services.">
```

Note: GHL may already output og tags from the page settings, which could create duplicates. Check the page source after publishing.
