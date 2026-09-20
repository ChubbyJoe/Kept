# 0002 · Coding standards and tooling

**Status**: Assumed
**Date**: 2026-09-20
**Authorized by**: engineer, during /develop

## Owed decision

Choose the formatter, commit checks, and continuous integration provider that keep later work consistent.

## Assumption built on

Use Prettier for formatting, Conventional Commits enforced by commitlint and Husky, lint-staged for staged file checks, and GitHub Actions for continuous integration. Keep every dependency pinned in `package.json` and `package-lock.json`.

## Code area

`AGENTS.md`, `README.md`, `package.json`, `package-lock.json`, formatter and commit hook configuration, `.husky/`, and `.github/workflows/`.

## Requirements

The root `AGENTS.md` reflects the actual project. The chosen format, lint, type, commit, and continuous integration checks run clean.

## Ratify

This decision was recorded by /develop, not deliberated. Run `/architect coding standards and tooling` to deliberate and ratify it. Until then it stays flagged as an owed decision; it does not block marking the feature `done`.
