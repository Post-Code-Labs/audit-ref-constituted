#!/usr/bin/env bash
# Fails when the file's "Last reviewed YYYY-MM-DD" line is older than the cadence.
set -euo pipefail

file="${1:-AGENTS.md}"
max_days="${2:-45}"

line=$(grep -Eo 'Last reviewed [0-9]{4}-[0-9]{2}-[0-9]{2}' "$file" || true)
if [[ -z "$line" ]]; then
  echo "::error::$file has no 'Last reviewed YYYY-MM-DD' line"
  exit 1
fi

reviewed="${line#Last reviewed }"
reviewed_epoch=$(python3 -c "import datetime as d; print(int(d.datetime.strptime('$reviewed', '%Y-%m-%d').replace(tzinfo=d.timezone.utc).timestamp()))")
now_epoch=$(date -u +%s)
age_days=$(((now_epoch - reviewed_epoch) / 86400))

if ((age_days > max_days)); then
  echo "::error::$file last reviewed $reviewed (${age_days}d ago; cadence is ${max_days}d)"
  exit 1
fi

echo "$file reviewed $reviewed (${age_days}d ago) — within the ${max_days}d cadence."
