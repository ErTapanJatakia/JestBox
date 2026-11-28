# OpenSSF Scorecard — JestBox

## Purpose and scope

OpenSSF Scorecard performs automated checks on public source repositories to identify common security risks. JestBox has a Scorecard workflow; this policy describes how its results should be interpreted and remediated.

Official project: https://github.com/ossf/scorecard  
Project overview: https://openssf.org/projects/scorecard/

## Operating requirements

- Run Scorecard using the repository's configured workflow and supported pinned version.
- Record assessed commit, workflow run, Scorecard version, output artifact and date.
- Review each check's score and detailed findings; do not treat the aggregate score as a certification.
- Prioritize actionable findings by exposure, exploitability and risk.
- Do not suppress or disable checks merely to improve the aggregate score.
- Document N/A or accepted-risk dispositions with a check-specific rationale and review trigger.
- Reassess after changes to repository visibility, branch rules, workflow permissions, dependencies, release process or vulnerability reporting.

## Interpretation

A Scorecard result is point-in-time and scoped to the repository state visible to the scanner. It does not prove application runtime security, code correctness, absence of vulnerabilities, legal compliance or OpenSSF Best Practices Badge achievement.

## Proprietary project applicability

Scorecard is an automated repository assessment tool, not an award. JestBox is publicly viewable but proprietary. Public visibility does not make the project FLOSS or grant rights to reuse the source. Any formal OpenSSF programme eligibility or compliance claim must be checked against that programme's current scope and terms.

## Evidence record

| Date | Commit | Workflow run | Tool version | Result / findings | Disposition |
|---|---|---|---|---|---|
| Pending | Pending | Pending | Read from workflow | Not yet reconciled in this register | Pending |

Populate only from an actual workflow output. Do not invent a score or state.
