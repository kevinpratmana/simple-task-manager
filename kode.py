import subprocess
import sys
import os

# Pastikan di workspace
os.chdir(os.environ.get("WORKSPACE_FOLDER", os.getcwd()))

print("Running npm install...")
subprocess.run(["npm", "install"], check=True)

print("Starting server in background...")
subprocess.run(["node", "index.js"], check=True)

print("Done. Python exit.")
