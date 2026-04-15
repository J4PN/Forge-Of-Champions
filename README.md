 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/data/README.md b/data/README.md
new file mode 100644
index 0000000000000000000000000000000000000000..b0a497542fb6a9ab94ff4129665efd51a676b5f5
--- /dev/null
+++ b/data/README.md
@@ -0,0 +1,20 @@
+# Data Files
+
+- `moves.json` is your move-dex file to pair with your Pokémon dataset.
+- Format per move:
+
+```json
+"Move Name": {
+  "type": "Grass",
+  "category": "Special",
+  "basePower": 90,
+  "accuracy": 100,
+  "pp": 10,
+  "effect": "Text describing side effects"
+}
+```
+
+## Stat order reminder
+For Pokémon base stats, use:
+
+`[hp, atk, def, spAtk, spDef, spe]`
 
EOF
)
