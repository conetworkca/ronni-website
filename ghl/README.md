# GHL build checklist

Everything in this folder is ready to paste into the GHL website builder. Copy, layout and behaviour match the draft at ronnidraft.conetwork.ca.

## 1. One-time site setup

- [ ] **Fonts:** add to Website settings → Tracking code → **Header**:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Jost:wght@300;400;500&display=swap">
  ```
- [ ] **CSS:** paste all of `global.css` into Website settings → **Custom CSS**.
- [ ] **JS:** paste all of `global.js` into Website settings → Tracking code → **Footer**, inside `<script>` … `</script>`.
- [ ] **Images:** the files in this folder use these GHL Media Library URLs. Still to do: upload the missing image to the Media Library, then find and replace its placeholder in every file in this folder.

  | Image | Used for | GHL Media Library URL |
  |---|---|---|
  | logo.png | Logo — header and footer | https://assets.cdn.filesafe.space/YL4vYOVwDHTOiN7FSHNc/media/6ad579e93cacdd9117b745ce.png |
  | home-hero.png | Home 01 Hero photo (also Home social image) | https://assets.cdn.filesafe.space/YL4vYOVwDHTOiN7FSHNc/media/6ad579a1f9a985d42c05a5fa.png |
  | home-about.png | Home 08 About teaser photo | **Not uploaded yet.** Files use the placeholder `{{GHL_IMAGE_HOME_ABOUT}}` |
  | about-her-story.png | About 01 Her story photo (also About social image) | https://assets.cdn.filesafe.space/YL4vYOVwDHTOiN7FSHNc/media/6ad57a20cd7225ed37db5c82.png |

- [ ] **Page paths:** create the six pages with exactly these paths, so the menu and buttons link correctly: `/`, `/career-freedom-catalyst`, `/free-blueprint`, `/about`, `/corporate`, `/contact`.
- [ ] **Header:** paste `header.html` into a Custom Code element in a **global section** at the top of every page. Section padding: none. Don't turn on GHL's sticky option (the header pins itself).
- [ ] **Footer:** paste `footer.html` into a Custom Code element in a **global section** at the bottom of every page. Section padding: none.
- [ ] **Favicon:** there isn't one on the draft yet (see `../seo.md`).

## 2. Pages

For every section: add a **full-width section with no padding**, drop in a **Custom Code** element, and paste the file. Add them top to bottom in the order listed. Page titles, descriptions and social images are in `../seo.md`.

### Home — `/`

Page title: Ronni Landeck | Career Freedom Catalyst for Women in STEM & Healthcare

- [ ] Header (global section)
- [ ] `home/01-hero.html` — Hero
- [ ] `home/02-real-options.html` — Real options
- [ ] `home/03-client-results-1.html` — Client Results (set 1)
- [ ] `home/04-lacking-a-plan.html` — Lacking a plan
- [ ] `home/05-90-days.html` — 90 days
- [ ] `home/06-framework.html` — The framework
- [ ] `home/07-client-results-2.html` — Client Results (set 2)
- [ ] `home/08-about-teaser.html` — About teaser
- [ ] `home/09-blueprint-promo.html` — Blueprint promo
- [ ] `home/10-client-results-3.html` — Client Results (set 3)
- [ ] `home/11-closing-cta.html` — Closing CTA
- [ ] Footer (global section)

### Career Freedom Catalyst — `/career-freedom-catalyst`

Page title: Career Freedom Catalyst | Ronni Landeck

- [ ] Header (global section)
- [ ] `career-freedom-catalyst/01-hero.html` — Hero
- [ ] `career-freedom-catalyst/02-who-its-for.html` — Who it’s for + What makes this different
- [ ] `career-freedom-catalyst/03-90-day-path.html` — The 90-day path
- [ ] `career-freedom-catalyst/04-outcomes-and-support.html` — What You’ll Walk Away With + Support Structure
- [ ] `career-freedom-catalyst/05-client-results-1.html` — Client Results (set 1)
- [ ] `career-freedom-catalyst/06-guarantee.html` — The guarantee
- [ ] `career-freedom-catalyst/07-private-advisory.html` — Private Advisory
- [ ] `career-freedom-catalyst/08-client-results-2.html` — Client Results (set 2)
- [ ] `career-freedom-catalyst/09-closing-cta.html` — Ready to talk?
- [ ] Footer (global section)

### Free Blueprint — `/free-blueprint`

Page title: Free Blueprint | The STEM-to-Consultant Blueprint — Ronni Landeck

- [ ] Header (global section)
- [ ] `free-blueprint/01-blueprint-copy-and-form.html` — Free Blueprint: copy + form — **add the GHL form where the file says `INSERT GHL FORM HERE`**
- [ ] Footer (global section)

### About — `/about`

Page title: About Ronni Landeck | Career Freedom Catalyst

- [ ] Header (global section)
- [ ] `about/01-her-story.html` — Her story
- [ ] `about/02-beliefs.html` — What Ronni believes
- [ ] `about/03-credentials.html` — Credentials & background
- [ ] `about/04-cta.html` — Call to action
- [ ] Footer (global section)

### Corporate — `/corporate`

Page title: Corporate Facilitation & Speaking | Ronni Landeck

- [ ] Header (global section)
- [ ] `corporate/01-hero.html` — Hero
- [ ] `corporate/02-who-this-is-for.html` — Who This Is For
- [ ] `corporate/03-proof.html` — Proof
- [ ] `corporate/04-cta.html` — Interested in working together?
- [ ] Footer (global section)

### Contact — `/contact`

Page title: Contact Ronni Landeck | Career Freedom Catalyst

- [ ] Header (global section)
- [ ] `contact/01-lets-talk.html` — Let’s talk.
- [ ] `contact/02-call-and-inquiry.html` — Book a Call + Send an Inquiry — **add the GHL form where the file says `INSERT GHL FORM HERE`**
- [ ] Footer (global section)

## 3. Forms

Build these as GHL forms and place them where the section files say `<!-- INSERT GHL FORM HERE -->`. Use this copy exactly (from the draft).

### Free Blueprint form (`free-blueprint/01-blueprint-copy-and-form.html`)

| Field | Label | Placeholder | Required |
|---|---|---|---|
| First name | First name | [Your first name] | Yes |
| Email | Email | [Your email] | Yes |

- Button: **Download the Blueprint**
- Line under the button: *Your information stays private. No spam — only what's useful.* (already in the section file, under the form marker)
- Error messages: "Please enter your first name." / "Please enter your email." / "Please enter a valid email address."
- Thank-you message: **You're in.** — *The STEM-to-Consultant Blueprint is on its way to your inbox. If it doesn't arrive in a few minutes, check your promotions or spam folder.* — with a "Book Your Consulting Roadmap Call" button to https://ronnilandeck.com/call/
- Draft also shows a toast: "Check your inbox — the Blueprint is on its way."
- [ ] Workflow: create/update the contact, then email the Blueprint.

### Contact inquiry form (`contact/02-call-and-inquiry.html`)

| Field | Label | Placeholder | Required |
|---|---|---|---|
| Name | Name | [Your name] | Yes |
| Email | Email | [Your email] | Yes |
| Message (4 rows) | Message | [Your message] | Yes |

- Button: **Send an Inquiry**
- Error messages: "Please enter your name." / "Please enter your email." / "Please enter a valid email address." / "Please enter a message."
- Thank-you message: **Thank you.** — *Your message is on its way to Ronni. She’ll respond personally — usually within a couple of business days.* — with a "Book Your Consulting Roadmap Call" button to https://ronnilandeck.com/call/
- Draft also shows a toast: "Your inquiry has been sent. Ronni will be in touch personally."
- [ ] Workflow: create/update the contact and notify Ronni.

## 4. Before launch

- [ ] No `{{GHL_IMAGE_…}}` placeholders left anywhere.
- [ ] Placeholder copy on the draft still needs real text: footer lines in [brackets], `[Credentials headline]`, `[retail, construction, education]`, `[MOCKUP COVER]`, `[COVER]`, `[RONNI FACILITATING A WORKSHOP]`.
- [ ] Social images for the four pages that have none (see `../seo.md`).
- [ ] Click every menu link and button on a phone and on desktop.
