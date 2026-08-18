import os
import shutil

src_dir = r"C:\Users\user\.gemini\antigravity\brain\9f5d90da-bb60-4beb-ac5b-6882d5ddcb23"
dest_dir = r"C:\Users\user\.gemini\antigravity\scratch\ufc-fighters-website\assets"

os.makedirs(dest_dir, exist_ok=True)

# Find files matching the generated prefixes
hero_banner_src = None
card_bg_src = None

for f in os.listdir(src_dir):
    if f.startswith("ufc_hero_banner") and f.endswith(".png"):
        hero_banner_src = os.path.join(src_dir, f)
    elif f.startswith("fighter_card_bg") and f.endswith(".png"):
        card_bg_src = os.path.join(src_dir, f)

if hero_banner_src:
    shutil.copy(hero_banner_src, os.path.join(dest_dir, "hero_banner.png"))
    print(f"Copied {hero_banner_src} to hero_banner.png")
else:
    print("Hero banner not found in source directory.")

if card_bg_src:
    shutil.copy(card_bg_src, os.path.join(dest_dir, "fighter_card_bg.png"))
    print(f"Copied {card_bg_src} to fighter_card_bg.png")
else:
    print("Fighter card background not found in source directory.")
