# Contact — `/contact`

Source: https://ronnidraft.conetwork.ca/contact

- **Page title:** Contact Ronni Landeck | Career Freedom Catalyst
- **Meta description:** Book a consulting roadmap call or send Ronni Landeck an inquiry about Career Freedom Catalyst, corporate facilitation, or speaking.
- **Header & footer:** see [_layout.md](_layout.md)

---

## 1. Hero
Background: linen.

**Eyebrow:** CONTACT

**H1:** Let’s talk.

**Body:**
> Whether you’re ready to explore Career Freedom Catalyst or have a question first, there are two simple ways to reach Ronni.

---

## 2. Two ways to reach Ronni
Background: linen. Two cards side by side.

### Card 1 — Book a Call

**H2:** Book a Call

**Body:**
> A focused conversation about your consulting direction, and whether Career Freedom Catalyst is the right next step.

**Button:**
| Text | Links to | Style |
|---|---|---|
| Book Your Consulting Roadmap Call | `https://ronnilandeck.com/call/` (new tab) | Primary filled button |

### Card 2 — Send an Inquiry (form)

**H2:** Send an Inquiry

**Body:**
> For corporate facilitation, speaking, or general questions, send a short note and Ronni will respond personally.

**Form fields:**

| Label | Field id / name | Type | Autocomplete | Placeholder | Required | Error message |
|---|---|---|---|---|---|---|
| Name | `ci-name` | text | name | [Your name] | Yes | Please enter your name. |
| Email | `ci-email` | email | email | [Your email] | Yes | Empty: "Please enter your email." Invalid: "Please enter a valid email address." |
| Message | `ci-message` | textarea (4 rows) | — | [Your message] | Yes | Please enter a message. |

**Submit button:** **Send an Inquiry** (`type="submit"`, primary filled button)

**Form behaviour (as built on the draft):**
- Validation runs in the browser (`novalidate` on the form). Errors show under each field and clear as soon as the visitor types in that field.
- On success, a toast pops up: **Your inquiry has been sent. Ronni will be in touch personally.**
- The form card is replaced with a success message:
  - Heading: **Thank you.**
  - Body: *Your message is on its way to Ronni. She’ll respond personally — usually within a couple of business days.*
  - Button: **Book Your Consulting Roadmap Call** → `https://ronnilandeck.com/call/` (new tab)
- ⚠️ **The form isn't connected to anything.** It doesn't send messages to any server or email address, so inquiries are lost. It will need wiring up on the new site.

**Animation:** card 1 reveals at 0ms, form card at 90ms. Inputs change border colour on focus.

---

## Images
None in the page body (logo only, in the header/footer).
