# Scope: Kept

Kept is a simple medication adherence tracker for adults managing their own chronic care. You can add medicines, receive reminders, record what happened, and understand your adherence over time without a clinical or crowded experience.

**Build approach:** Tracer Bullet (prove one real path through every layer, then thicken that working path).
**Workflow:** Alpha (`/check verify` follows `/develop`). The project default level of rigor. `/architect` is the recommended first stop for a feature with a real decision, but you may skip it when you already know the build. Any feature can carry its own tag to use more or less rigor.

_These are recommendations to keep your build orderly, not requirements. You may skip anything that does not fit. If you already know how to build a feature, you may use `/develop` and skip `/architect`. You decide when a feature is `done`._

## At a glance

| #   | Feature                             | Phase      | Status      |
| --- | ----------------------------------- | ---------- | ----------- |
| 1   | Stack and architecture              | Foundation | done        |
| 2   | Coding standards and tooling        | Foundation | in-progress |
| 3   | Data model                          | Foundation | planned     |
| 4   | Design system and UI foundation     | Foundation | planned     |
| 5   | Core medication loop                | Slice 1    | planned     |
| 6   | Regimen management                  | Slice 2    | planned     |
| 7   | Dose status rules                   | Slice 3    | planned     |
| 8   | Reminder delivery                   | Slice 4    | planned     |
| 9   | Adherence history                   | Slice 5    | planned     |
| 10  | Offline logging and sync            | Slice 6    | planned     |
| 11  | Account recovery and data controls  | Slice 7    | planned     |
| 12  | Product measurement and reliability | Slice 8    | planned     |
| 13  | Public and legal pages              | Slice 9    | planned     |

## Foundations

### 1. Stack and architecture · done · Beta

Choose the application structure and scaffold an installable responsive web app so later slices share a real foundation.

**Done when:** the chosen stack is recorded, the empty app runs locally, it can be installed on a supported device, and its production build passes.

**Spec:** [0001](../specs/0001-stack-architecture/index.md)
**Code:** [application scaffold](../../src)

- [x] Decide the stack (spec)
- [x] Scaffold from the decision: `/develop stack and architecture`
- [x] Verify it: `/check verify stack and architecture` · skipped by engineer
- [x] Test it: `/test stack and architecture` · skipped by engineer

### 2. Coding standards and tooling · in-progress · assumed decision (spec 0002)

Capture conventions from the real scaffold, then add the checks that keep later work consistent.

**Done when:** root `AGENTS.md` reflects the actual project, and its chosen format, lint, type, commit, and continuous integration checks run clean.

**Spec:** [0002](../specs/0002-coding-standards-and-tooling.md)
**Code:** [tooling configuration](../../package.json)

- [x] Capture conventions and tooling choices: `/audit`
- [x] Build it: `/develop coding standards and tooling`

### 3. Data model · needs a decision · GA

Define users, medicines, schedules, generated doses, dose outcomes, and adherence records with clear ownership and history.

**Done when:** the model supports multiple medicines and daily dose instances, preserves corrections, separates skipped from missed doses, and keeps each user's health data private.

- [ ] Design it (spec): `/architect data model`

### 4. Design system and UI foundation · needs a decision

Create a calm visual language and reusable controls that make daily actions quick, readable, and welcoming.

**Done when:** `design.md` defines type, color, spacing, states, and core components; the base interface meets WCAG 2.2 AA; copy and layouts can support later translation.

- [ ] Design it (spec): `/architect design system and UI foundation`

## Slice 1: Core medication loop

### 5. Core medication loop

Prove the complete path with real identity, storage, and interface. A user signs in, adds one daily medicine, sees today's dose, marks it taken, and sees that result persist.

**Done when:** a new user can complete that path on a phone sized screen and still see the recorded outcome after signing out and returning.

- [ ] Build it: `/develop core medication loop`

## Slice 2: Regimen management

### 6. Regimen management

Expand the working path to several medicines and fixed recurring schedules, without adding clinical advice or a medicine catalog.

**Done when:** a user can add, edit, pause, resume, and archive medicines; set one or more fixed daily times; and see correct doses across date and time zone changes.

- [ ] Build it: `/develop regimen management`

## Slice 3: Dose status rules

### 7. Dose status rules · needs a decision · Beta

Make taken, late, skipped, and missed meaningful and consistent, including corrections after an accidental entry.

**Done when:** every scheduled dose reaches one explainable outcome, late and missed thresholds are consistent, users can correct an outcome, and adherence calculations use the same recorded rules.

- [ ] Design it (spec): `/architect dose status rules`

## Slice 4: Reminder delivery

### 8. Reminder delivery · needs a decision · Beta

Notify the user when a dose is due and send one follow up when it remains unresolved, while respecting permission and time zone changes.

**Done when:** an installed app can request permission in context, deliver the due reminder and at most one follow up, open the correct dose, and show a useful state when delivery is unavailable.

- [ ] Design it (spec): `/architect reminder delivery`

## Slice 5: Adherence history

### 9. Adherence history

Turn recorded outcomes into a clear weekly view so users can understand patterns without clinical interpretation.

**Done when:** a user can review doses by day and medicine, see the weekly adherence measure, distinguish late, skipped, and missed outcomes, and understand empty or incomplete weeks.

- [ ] Build it: `/develop adherence history`

## Slice 6: Offline logging and sync

### 10. Offline logging and sync · needs a decision · Beta

Keep the core logging action dependable when a connection drops, then reconcile it safely when the device reconnects.

**Done when:** today's schedule remains visible offline, dose outcomes can be recorded offline, reconnecting syncs once without losing or duplicating an outcome, and conflicts have a visible resolution.

- [ ] Design it (spec): `/architect offline logging and sync`

## Slice 7: Account recovery and data controls

### 11. Account recovery and data controls · needs a decision · GA

Give users control of access and sensitive data through recovery, export, and permanent account deletion.

**Done when:** a user can recover access securely, export their medicines and adherence history in a useful format, and delete the account and associated data through a clear confirmed flow.

- [ ] Design it (spec): `/architect account recovery and data controls`

## Slice 8: Product measurement and reliability

### 12. Product measurement and reliability · needs a decision

Measure whether users complete setup and keep logging each week, while collecting only the minimum product and error data needed to improve reliability.

**Done when:** setup completion, reminder response, and weekly active adherence are defined and observable; errors are reportable; health details never appear in analytics or error payloads; consent follows the chosen launch region.

- [ ] Design it (spec): `/architect product measurement and reliability`

## Slice 9: Public and legal pages

### 13. Public and legal pages · needs a decision

Explain the product before sign in and state its privacy, terms, and tracking only safety boundary for the first launch country.

**Done when:** a responsive landing page has useful page metadata and a social card; privacy and terms pages match actual data handling; the product clearly says it does not provide medical advice; the launch country is recorded.

- [ ] Design it (spec): `/architect public and legal pages`

## Deferred

These ideas remain outside the current build pass so the first product stays focused.

- **Caregiver sharing:** let another person view or help manage a regimen · needs a decision · GA
- **Flexible regimens:** support intervals, as needed medicines, tapering plans, and custom dose instructions · needs a decision
- **Medicine catalog:** search a trusted catalog instead of relying only on manual entry · needs a decision
- **Prescription import:** scan or import prescription details · needs a decision · GA
- **Notes and custom reasons:** attach personal context to skipped or missed doses
- **Multiple languages:** translate the interface after real demand is known
- **Repeated escalation:** continue reminders until the user resolves a dose
- **Paid plans:** consider premium features only after repeated use is proven · needs a decision
- **Clinical support:** clinician guidance, interaction warnings, or regulated decision support · needs a decision · GA
- **Broader content and search:** add educational or acquisition content after the simple landing page proves useful

## Legend

**The decision box.** A feature that still needs a meaningful choice has one box whose label ends with `(spec)`. `/architect` resolves that choice. Every other box is an execution box.

| State                            | Set by          | The feature shows                                                                                      |
| -------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------ |
| `planned` and needs a decision   | `/scope`        | one design box for `/architect`                                                                        |
| `in-progress` after design       | `/architect`    | the design box checked, a linked spec, build milestones, and the checks required by its workflow level |
| `in-progress` while building     | `/develop`      | completed milestones and a code pointer                                                                |
| `in-progress` after verification | `/check verify` | the build and verification boxes checked                                                               |
| `done`                           | you or `/sync`  | the stages you chose are checked and skipped stages are recorded                                       |

- **Next step:** the first unchecked box.
- **Needs a decision:** `/architect` is the recommended next step. A feature without that tag may go straight to `/develop`, except coding standards and tooling begins with `/audit`.
- **Atomic build tasks:** these live in a feature spec. This scope holds only the later milestone summary.
- **Status:** `planned` becomes `in-progress`, then `done`. `existing` marks work from before this workflow. `dropped` keeps the history of removed scope.
- **Workflow:** Alpha adds `/check verify` after `/develop`. Beta adds `/test`. GA also adds a fresh `/check review` and `/document`. A feature tag overrides the Alpha project default.
- **Approach:** a feature tag may override Tracer Bullet. With no tag, the project approach applies.
- **Pointer:** a spec link appears after design, and a code path appears after development.
