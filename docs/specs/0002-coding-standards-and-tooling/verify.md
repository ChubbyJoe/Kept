# Verify coding standards and tooling

## Local checks

1. Run `npm ci` and confirm the pinned dependency installation completes and Husky configures the Git hooks.
2. Run `npm run check` and confirm formatting, lint, type, environment, and safe logging checks all pass.
3. Run `npm run build` and confirm the Next.js production build and Serwist service worker build both pass.
4. Pipe `chore: verify commit rules` into `npm run commitlint --` and confirm it passes.
5. Pipe `not a conventional commit` into `npm run commitlint --` and confirm it fails with missing type and subject errors.
6. Stage a supported file and run `npx lint-staged`. Confirm the staged file is formatted and any code file is linted without changing unstaged work.

## GitHub Actions

1. Push a Conventional Commit to a branch or open a pull request.
2. Confirm the `CI` workflow installs with `npm ci`, validates the relevant commit messages, runs `npm run check`, and runs `npm run build`.
3. Confirm the workflow completes successfully before merging.
