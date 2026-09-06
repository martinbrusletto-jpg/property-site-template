#!/usr/bin/env python3
"""Scaffold a new property from the shared template."""
from __future__ import annotations
import json, re, shutil, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]

def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")[:64]

def short_mark(name: str) -> str:
    parts = [p for p in name.split() if p]
    if len(parts) == 1:
        return parts[0][:2].upper()
    return (parts[0][0] + parts[-1][0]).upper()

def main() -> int:
    if len(sys.argv) < 2:
        print("Usage: python3 scripts/new-property.py \"Property Name\"")
        return 1
    name = " ".join(sys.argv[1:]).strip()
    slug = slugify(name)
    dest = ROOT / "properties" / slug
    if dest.exists():
        print(f"Already exists: properties/{slug}")
        return 1
    (dest / "assets").mkdir(parents=True)
    (dest / "template").symlink_to("../../template")
    mark = short_mark(name)
    content = {
        "brand": {"name": name, "short": mark, "location": "City · Country", "tagline": "A quiet residence between light and landscape."},
        "theme": {"palette": "mediterranean"},
        "meta": {"title": name, "description": f"{name} — private residence."},
        "nav": {"menuLabel": "Menu", "contactLabel": "Contact", "links": [
            {"label": "Opening", "href": "#opening"}, {"label": "Wellness", "href": "#wellness"},
            {"label": "Nature", "href": "#nature"}, {"label": "Place", "href": "#place"},
            {"label": "Design", "href": "#design"}, {"label": "Residences", "href": "#residences"},
            {"label": "Interiors", "href": "#interiors"}]},
        "hero": {"kicker": "City · Country", "headline": name, "subhead": "Replace this tagline. Add images to assets/.", "scrollCue": "Discover", "gridImages": []},
        "opening": {"kicker": "The residence", "headline": "Designed to be felt before it is understood.", "body": ["Opening paragraph one.", "Opening paragraph two."], "image": ""},
        "wellness": {"kicker": "Essence of self-care", "headline": "Wellness", "body": "Describe the wellness offer.", "image": "", "chips": [
            {"id": "pool", "label": "Pool", "title": "Pool", "body": "...", "image": ""},
            {"id": "training", "label": "Training", "title": "Training", "body": "...", "image": ""},
            {"id": "spa", "label": "Spa", "title": "Spa", "body": "...", "image": ""},
            {"id": "relax", "label": "Relax", "title": "Relax", "body": "...", "image": ""}]},
        "nature": {"kicker": "Landscape", "headline": "Light and landscape.", "body": "Nature copy.", "image": "", "secondaryImage": ""},
        "place": {"kicker": "Location", "headline": "Place", "body": "Location copy. Verify stats before publishing.", "image": "", "stats": [
            {"value": "—", "label": "Municipality"}, {"value": "—", "label": "To the coast"},
            {"value": "Private", "label": "Setting"}, {"value": "Appointment", "label": "Viewings"}]},
        "design": {"kicker": "Materiality", "headline": "Stone. Oak. Bronze. Linen.", "body": "Materials story.", "image": "", "materials": [
            {"name": "Stone", "note": ""}, {"name": "Oak", "note": ""}, {"name": "Bronze", "note": ""}, {"name": "Linen", "note": ""}]},
        "residences": {"kicker": "Collection of premium living spaces", "headline": "Residences", "body": "Residences summary.", "image": "", "metrics": [
            {"value": "—", "label": "Homes"}, {"value": "—", "label": "Bedrooms"}, {"value": "—", "label": "Wellness"}, {"value": "—", "label": "Outdoor"}],
            "cta": {"label": "Request private viewing", "href": "#contact"}},
        "interiors": {"kicker": "Interiors", "headline": "Light, proportion and a softer rhythm.", "body": "Interiors intro.", "gallery": []},
        "contact": {"kicker": "Private presentation", "headline": "By appointment only.",
            "body": "For specifications, plans and a private viewing — request the full presentation.",
            "formName": "private-viewing", "formAction": "/thanks.html",
            "fields": {"name": "Name", "email": "Email", "phone": "Phone", "message": "Message"},
            "submit": "Request private presentation", "footer": [name, "City · Country", "Private residence"]},
    }
    (dest / "content.json").write_text(json.dumps(content, indent=2, ensure_ascii=False) + "\n")
    index = (ROOT / "properties/los-verdiales/index.html").read_text()
    index = (index.replace("Los Verdiales — Marbella", name)
        .replace("Los Verdiales — a private residence in Marbella.", f"{name} — private residence.")
        .replace(">LV<", f">{mark}<")
        .replace("Los Verdiales", name))
    (dest / "index.html").write_text(index)
    shutil.copy2(ROOT / "properties/los-verdiales/thanks.html", dest / "thanks.html")
    shutil.copy2(ROOT / "template/favicon.svg", dest / "favicon.svg")
    (dest / "assets/.gitkeep").write_text("")
    print(f"Created properties/{slug}")
    print(f"1. Add photos → properties/{slug}/assets/")
    print(f"2. Edit copy  → properties/{slug}/content.json")
    print(f"3. Preview    → cd properties/{slug} && python3 -m http.server 8847")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
