# Feedback Loop Metrics

> Feedback compounds when people see that what they said actually ships.

Feedback Loop Metrics is a dependency-free GitHub Action that measures how quickly feedback Issues become delivered changes.

It reports feedback lead time P50/P90, an honest target hit rate that counts overdue open Issues as misses, loop closure, repeat feedback, and repeat-feedback rates split by whether the first item met the delivery target.

The existing TypeScript/Bun architecture harness, security gates, and Claude Code skills remain part of this repository and are used for development quality control.

## Install

Add `.github/workflows/feedback-loop-metrics.yml` to the repository you want to measure:

```yaml
name: Feedback Loop Metrics

on:
  workflow_dispatch:
  schedule:
    - cron: '0 0 * * 1'

permissions:
  contents: read
  issues: read

jobs:
  report:
    runs-on: ubuntu-latest
    steps:
      - uses: susumutomita/feedback-loop-metrics@v1
        with:
          locale: ja
```

Then add the `feedback` label to user-originated Issues. The report appears in the workflow run summary and is also written to `feedback-loop-metrics.json` and `feedback-loop-metrics.md`.

## Production delivery mode

Issue close time is an easy proxy. For feedback-to-production lead time, label an Issue `shipped` only after the change is available to users:

```yaml
- uses: susumutomita/feedback-loop-metrics@v1
  with:
    completion-mode: label
    completion-label: shipped
```

## Metrics

- Feedback lead time P50/P90
- Target hit rate, including overdue open feedback as misses
- Loop closure rate
- Repeat feedback rate
- Repeat rate for target-met and target-missed cohorts
- Longest unshipped and slowest delivered feedback

The cohort comparison is an observed association, not proof that delivery speed caused repeat feedback.

## Development harness

The repository retains the original TypeScript/Bun/Biome architecture harness and its supply-chain, CI, and quality invariants. See `CLAUDE.md`, `docs/architecture/`, and `.claude/skills/` for the development rules.

## License

Apache-2.0 for Feedback Loop Metrics. Existing harness files retain their original notices where applicable.
