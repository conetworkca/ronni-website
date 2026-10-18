# Free Blueprint — `/free-blueprint`

Source: https://ronnidraft.conetwork.ca/free-blueprint

- **Page title:** Free Blueprint | The STEM-to-Consultant Blueprint — Ronni Landeck
- **Meta description:** Download the free STEM-to-Consultant Blueprint. Identify the consulting offer hiding in your technical expertise, avoid pricing mistakes, and run a legal and benefits audit before you make a move.
- **Header & footer:** see [_layout.md](_layout.md)

---

## 1. Hero + opt-in form
Background: linen. The whole page is one section: copy on the left, form card on the right.

### Left column

**Eyebrow:** FREE BLUEPRINT

**H1:** The STEM-to-Consultant Blueprint

**Subheading:**
> Translate your technical expertise into a high-ticket consulting offer — without overthinking your niche, underpricing your value, or making a reckless career move.

**Body:**
> You've spent years solving complex problems inside corporate systems. This fillable blueprint helps you identify the business value behind your technical expertise, map a potential consulting offer, and run a practical legal, logistics, and benefits audit before you build your next chapter.

**Box — label:** WHAT'S INSIDE

Three rows (each tints linen on hover):
1. Identify the consulting offer hiding inside your current expertise
2. Avoid the most common pricing and positioning mistakes
3. Run a legal and benefits audit before you make any public move

**Animation:** eyebrow 0ms → H1 90ms → subheading 170ms → body 240ms → "What's inside" box 300ms → rows 320 / 410 / 500ms.

### Right column — form card

**Cover mockup (placeholder on the draft):**
- Eyebrow: FREE GUIDE
- H3: STEM-to-Consultant Blueprint
- Placeholder text: [COVER]

**Form** (card reveals at 120ms)

| Label | Field id / name | Type | Autocomplete | Placeholder | Required | Error message |
|---|---|---|---|---|---|---|
| First name | `bp-first-name` | text | given-name | [Your first name] | Yes | Please enter your first name. |
| Email | `bp-email` | email | email | [Your email] | Yes | Empty: "Please enter your email." Invalid: "Please enter a valid email address." |

**Submit button:** **Download the Blueprint** (`type="submit"`, primary filled button)

**Text under the button:**
> Your information stays private. No spam — only what's useful.

**Form behaviour (as built on the draft):**
- Validation runs in the browser (`novalidate` on the form). Errors show under each field and clear as soon as the visitor types in that field.
- On success, a toast pops up: **Check your inbox — the Blueprint is on its way.**
- The form card is replaced with a success message:
  - Heading: **You're in.**
  - Body: *The STEM-to-Consultant Blueprint is on its way to your inbox. If it doesn't arrive in a few minutes, check your promotions or spam folder.*
  - Button: **Book Your Consulting Roadmap Call** → `https://ronnilandeck.com/call/` (new tab)
- ⚠️ **The form isn't connected to anything.** It doesn't send the data to any server, email tool or list, and no blueprint is delivered. It will need wiring up (e.g. to an email platform) on the new site.

### Under the form
Text: **Prefer to map your offer live?**

| Text | Links to | Style |
|---|---|---|
| Book a complimentary consulting roadmap call. | `https://ronnilandeck.com/call/` (new tab) | Text link, underlines on hover |

(Reveals at 220ms.)

---

## Images
None in the page body (logo only, in the header/footer). The blueprint cover is a text placeholder.
