# omarfarha.com — site + CMS

A static site built with [Astro](https://astro.build), editable through a
[Decap CMS](https://decapcms.org) admin panel at `/admin`. Hosted on
[Netlify](https://netlify.com), which handles building, hosting, CMS login,
and the contact form — no server to manage.

## How it fits together

- **The site** (`src/`) — a normal Astro project. Netlify runs `npm run
  build` automatically on every push and serves the result.
- **The content** (`src/content/`) — markdown files with structured
  frontmatter: pages, selected-work items, essays. This is what the CMS edits.
- **The CMS** (`public/admin/`) — two static files. Decap CMS itself loads
  from a CDN. Login is handled by Netlify Identity, so there's no OAuth app
  or proxy server to set up.
- **The contact form** — plain HTML, detected and handled automatically by
  Netlify Forms. Submissions show up in your Netlify dashboard, and you can
  turn on email notifications so they land in your inbox too.

Every CMS edit is a commit to GitHub, which Netlify automatically rebuilds
and redeploys — usually live within about a minute.

---

## One-time setup (about 15 minutes, no coding)

### 1. Push this project to GitHub
Create a new repository (can be private) and push this whole folder to it.
If you're not comfortable with git commands, GitHub Desktop is the easiest
way to do this — drag the folder in, and it walks you through the rest.

### 2. Connect the repo to Netlify
- Go to [app.netlify.com](https://app.netlify.com) and sign up (free).
- **Add new site → Import an existing project → GitHub** → select this repo.
- Netlify reads `netlify.toml` automatically, so the build command and
  publish folder are already filled in correctly. Just click **Deploy**.
- After a minute or two, your site is live at a `*.netlify.app` address.
  You can connect your real domain under **Domain settings** whenever
  you're ready.

### 3. Turn on Identity (this is what makes the CMS login work)
- In your site's Netlify dashboard: **Project configuration → Identity → Enable Identity**.
- Under **Registration**, set it to **Invite only** — this means only people
  you personally invite can log into the CMS.
- Scroll to **Services → Git Gateway → Enable Git Gateway**.

### 4. Invite yourself
- Still under Identity → **Invite users** → enter your email.
- You'll get an email with a link — click it, set a password.
- That's it. You can now log into `yourdomain.com/admin` with that email
  and password.

### 5. Check the contact form
- Submit a test message through the site once it's live.
- In Netlify: **Forms** tab → you should see it show up as a submission
  under "contact".
- Turn on email notifications: **Forms → contact → Settings and usage →
  Add notification → Email notification** → your email address. Now every
  submission lands in your inbox too.

That's the whole setup. From here on, publishing content is: log into
`/admin`, write, click Publish — Netlify handles the rest.

---

## Day-to-day editing

Go to `yourdomain.com/admin`, log in, and you'll see three sections:

- **Pages** — Home, Coaching, Consulting. Every headline, paragraph, and
  list of focus areas is a field here.
- **Selected Work** — the six project entries on the Consulting page.
  Toggle "Show on site" off to hide one without deleting it (this is how
  Kyudu is currently hidden).
- **Essays** — currently empty/unpublished. Writing and publishing an essay
  here won't make it appear on the site until you also flip `SHOW_ESSAYS`
  in the code (see below) — this was a deliberate choice so you can draft
  essays privately before the section goes live.

## Turning Essays on

1. Open `src/site.config.ts` in GitHub (you can edit this file directly on
   github.com, no local setup needed — click the file, click the pencil
   icon, change `false` to `true`, commit).
2. Netlify rebuilds automatically.
3. From then on, any essay with "Published" checked in the CMS appears on
   `/essays` and in the homepage's Writing section automatically.

## Local development (optional — only if you want to preview changes before publishing)

```bash
npm install
npm run dev
```
Visit `http://localhost:4321`.
