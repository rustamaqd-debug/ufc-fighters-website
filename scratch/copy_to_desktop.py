import os
import shutil

src = r"C:\Users\user\.gemini\antigravity\scratch\ufc-fighters-website"
dest = r"C:\Users\user\Desktop\ufc-fighters-website"

if os.path.exists(dest):
    shutil.rmtree(dest)

shutil.copytree(src, dest)
print(f"Successfully copied project files to {dest}")
