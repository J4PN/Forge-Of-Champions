 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/start-site.sh b/start-site.sh
new file mode 100755
index 0000000000000000000000000000000000000000..747e32707999a33a8dfb9c1e1765aaa1dd159f08
--- /dev/null
+++ b/start-site.sh
@@ -0,0 +1,14 @@
+#!/usr/bin/env bash
+set -euo pipefail
+
+PORT="${1:-8080}"
+HOST="${HOST:-0.0.0.0}"
+
+if ! command -v python3 >/dev/null 2>&1; then
+  echo "python3 is required but not installed."
+  exit 1
+fi
+
+echo "Starting Forge of Champions at http://localhost:${PORT}"
+echo "Press Ctrl+C to stop."
+python3 -m http.server "${PORT}" --bind "${HOST}"
 
EOF
)
