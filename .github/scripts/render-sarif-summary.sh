#!/usr/bin/env bash
set -euo pipefail

SCANNER="${1:?scanner name required}"
REPORT="${2:?SARIF report path required}"
SUMMARY="${SCANNER}-security-summary.md"

if [[ ! -s "$REPORT" ]]; then
  echo "::error::Expected SARIF report missing: $REPORT"
  exit 1
fi

TOTAL="$(jq '[.runs[]?.results[]?] | length' "$REPORT")"
ERRORS="$(jq '[.runs[]?.results[]? | select((.level // "none") == "error")] | length' "$REPORT")"
WARNINGS="$(jq '[.runs[]?.results[]? | select((.level // "none") == "warning")] | length' "$REPORT")"
NOTES="$(jq '[.runs[]?.results[]? | select((.level // "none") == "note")] | length' "$REPORT")"
OTHER="$((TOTAL - ERRORS - WARNINGS - NOTES))"

{
  echo "# ${SCANNER} security scan"
  echo
  echo "- Commit: \`$GITHUB_SHA\`"
  echo "- Workflow run: \`$GITHUB_SERVER_URL/$GITHUB_REPOSITORY/actions/runs/$GITHUB_RUN_ID\`"
  echo "- Generated (UTC): \`$(date -u +'%Y-%m-%dT%H:%M:%SZ')\`"
  echo
  echo "| SARIF level | Findings |"
  echo "|---|---:|"
  echo "| Error | $ERRORS |"
  echo "| Warning | $WARNINGS |"
  echo "| Note | $NOTES |"
  echo "| Other / unspecified | $OTHER |"
  echo "| **Total** | **$TOTAL** |"
  echo
  echo "> SARIF levels are scanner output classifications, not a universal CVSS severity mapping. Review the raw SARIF and validate findings before remediation."
} > "$SUMMARY"

cat "$SUMMARY" >> "$GITHUB_STEP_SUMMARY"
