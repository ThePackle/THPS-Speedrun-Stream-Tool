import json
from typing import Any


def load_from_json(
    app: Any,
    filepath: str = "./Resources/Texts/ScoreboardInfo.json",
) -> None:
    try:
        with open(filepath, "r", encoding="utf-8") as jsonfile:
            data: dict[str, Any] = json.load(jsonfile)

        fields = [
            ("p1Seed", "p1Team"),
            ("p1Pron", "p1Pron"),
            ("p1Name", "p1Name"),
            ("p1NScore", "p1NScore"),
            ("p1NTime", "p1NTime"),
            ("p2Seed", "p2Team"),
            ("p2Pron", "p2Pron"),
            ("p2Name", "p2Name"),
            ("p2NScore", "p2NScore"),
            ("p2NTime", "p2NTime"),
            ("bestOf", "bestOf"),
            ("round", "round"),
            ("tournament", "tournament"),
        ]

        for attr, key in fields:
            entry = getattr(app, attr, None)
            if entry:
                entry.delete(0, "end")
                entry.insert(0, data.get(key, ""))

        caster_data = data.get("Casters", [{}] * 3)
        for i, (name, bluesky, twitch) in enumerate(app.Casters):
            if i < len(caster_data):
                name.delete(0, "end")
                name.insert(0, caster_data[i].get("Name", ""))

                bluesky.delete(0, "end")
                bluesky.insert(0, caster_data[i].get("Bluesky", ""))

                twitch.delete(0, "end")
                twitch.insert(0, caster_data[i].get("Twitch", ""))

    except FileNotFoundError:
        print(f"File not found: {filepath}")
    except json.JSONDecodeError:
        print(f"Invalid JSON in: {filepath}")
