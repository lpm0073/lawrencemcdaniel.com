---
name: lawrencemcdaniel-git-commits
description: Use whenever the user asks you to "write a git commit" (or a commit message, or the git add) in the lawrencemcdaniel.com repo. Covers the never-execute rule, authorship, the multiple -m command format, conventional-commit types and how semantic-release turns them into versions, the 72-character header limit, and how thorough the body must be.
---

# lawrencemcdaniel.com Git Commits

## The rule: write, never execute

"Write a git commit", in any wording or tone, means **output the command as
text**. It never means run it. Frustrated or emphatic phrasing still asks for
the command text.

- Never execute `git commit`, `git add`, `git reset`, `git restore --staged`,
  `git push`, `git stash`, or any other git command that writes. The user
  stages and commits themselves.
- Read-only git commands (`git status`, `git diff`, `git log`) are fine.
- Don't volunteer commit messages. Write one only when asked.

## Authorship

You are the author. Lawrence McDaniel is the co-author.

- `--author="Claude <noreply@anthropic.com>"`
- The last `-m` is `Co-authored-by: Lawrence McDaniel <lpm0073@gmail.com>`.

## Command format

Exactly one `git commit` command in one code block:

```console
git commit --author="Claude <noreply@anthropic.com>" \
  -m "<type>(<scope>): <subject>" \
  -m "<body paragraph>" \
  -m "<body paragraph or bullet list>" \
  -m "Co-authored-by: Lawrence McDaniel <lpm0073@gmail.com>"
```

- One `-m` per paragraph; a bullet list goes in a single `-m` with real
  newlines between bullets.
- No heredoc, no `-F`, and no `git add` in the same block.
- Avoid backticks, `$` and `!` inside the double-quoted messages. The user's
  shell is zsh, where `!` in double quotes triggers history expansion and
  aborts the command. Reword instead. Escape inner double quotes (`\"`).
- When the user asks for the `git add` too, write it as a separate code block
  that lists the paths explicitly.
- Remember that the husky hook runs `prettier --write .` during the commit, so
  the commit can pick up formatting changes. Mention it if `npx prettier --check .`
  would currently fail.

## Subject line

`<type>(<scope>): <subject>`, read by semantic-release (`release.config.cjs`)
when `main` is pushed, and checked by commitlint
(`@commitlint/config-conventional` + `@commitlint/config-angular`).

- **type:** `feat`, `fix`, `test`, `docs`, `refactor`, `perf`, `style`,
  `build`, `ci`, or `chore`.
  - `feat` (minor release) is for a truly new feature: a new page, a new
    component the site didn't have, a new data source. When in doubt, it is
    `fix`.
  - `fix` (patch release) covers bugs and also content and UI improvements to
    something that already exists, e.g. `fix: add UBCx group photo to about page`.
  - `chore` for links, data and housekeeping (`chore: update smarter links`),
    `chore(deps)` for dependency bumps, `style` for formatting only.
  - Never write `chore(release): ...`; that belongs to semantic-release.
- **scope** (optional): the page or area, lower case: `about`, `home`,
  `clients`, `seo`, `sitemap`, `redux`, `sw` (service worker), `fetchers`,
  `ci`, `claude` (agent configuration and skills).
- **subject:** imperative mood, lower case, no trailing period.
- **length:** the whole header must be **72 characters or fewer**. Measure it
  rather than counting by eye:

  ```console
  printf %s "fix(about): add UBCx group photo to about page" | wc -c
  ```

## Body

Write for a reader with no context. Small content changes can have a short
body; code changes need a full one.

- Start with the problem or motivation.
- Then go area by area, with a short heading paragraph per area naming the
  files (for example `Routes (src/components/Routes.tsx):`), then one bullet per
  change saying what changed and why.
- Name files, components, constants and commands precisely.
- Say how it was verified (`make test`, `yarn build`, the page checked in the
  dev server), and what the new tests prove.
- End with the current status: known gaps or follow-ups.

## Before writing

1. Run `git status` and `git diff --stat` (and `git diff` on anything unclear),
   so the message describes the working tree, not your memory of it.
2. Ask, or check, which files belong to the commit if that's ambiguous.
3. Measure the header with `wc -c`.
4. Start the response with a one-line `Written for:` audience note.
