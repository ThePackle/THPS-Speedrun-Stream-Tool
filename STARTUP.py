import json
import os
import tkinter as tk

from PIL import Image, ImageTk

from modules import load_json  # assuming your load_from_json is here

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


class App:
    def __init__(self, root: tk.Tk) -> None:
        self.root = root
        self.root.title("THPS Speedrun Mode Tournament Tracker")
        self.root.config(bg="#E4E2E2")
        self.root.geometry("900x650")

        icon_path = os.path.join(BASE_DIR, "assets", "images", "favicon.png")
        icon = Image.open(icon_path)
        self.icon = ImageTk.PhotoImage(icon)
        self.root.iconphoto(False, self.icon)

        self.build_gui()
        load_json.load_from_json(self)

    def build_gui(self) -> None:
        (
            self.p1Seed,
            self.p1Pron,
            self.p1Name,
            self.p1Twitch,
            self.p1NScore,
            self.p1NTime,
        ) = self.create_player_section(x=19, y=42, bg="#8367ff", title="Player 1")

        (
            self.p2Seed,
            self.p2Pron,
            self.p2Name,
            self.p2Twitch,
            self.p2NScore,
            self.p2NTime,
        ) = self.create_player_section(x=463, y=42, bg="#8c0000", title="Player 2")

        matchinfo = tk.LabelFrame(self.root, text="Match Info", bg="#E4E2E2", fg="#000")
        matchinfo.place(x=19, y=300, width=869, height=120)

        self.bestOf = self.make_entry(matchinfo, row=1, column=0, label="Best Of")
        self.round = self.make_entry(matchinfo, row=1, column=1, label="Round Name")
        self.tournament = self.make_entry(
            matchinfo, row=1, column=2, label="Tournament Name"
        )

        self.Casters = []
        casterframe = tk.LabelFrame(self.root, text="Casters", bg="#E4E2E2", fg="#000")
        casterframe.place(x=19, y=420, width=869, height=180)

        for i in range(3):
            y = i * 2
            name = self.make_entry(
                casterframe, row=y + 1, column=0, label=f"Caster {i + 1} Name"
            )
            bluesky = self.make_entry(casterframe, row=y + 1, column=1, label="Bluesky")
            twitch = self.make_entry(casterframe, row=y + 1, column=2, label="Twitch")
            self.Casters.append((name, bluesky, twitch))

        # Update Button
        update_btn = tk.Button(
            self.root, text="UPDATE", command=self.update_json, bg="#CCCCCC"
        )
        update_btn.place(x=19, y=600, width=869, height=40)

    def create_player_section(
        self,
        x: int,
        y: int,
        bg: str,
        title: str,
    ) -> tuple[tk.Spinbox, tk.Entry, tk.Entry, tk.Spinbox, tk.Entry]:
        frame = tk.LabelFrame(
            self.root, text=title, bg=bg, fg="white" if bg == "#8c0000" else "black"
        )
        frame.grid_propagate(False)
        frame.columnconfigure((0, 1), weight=1)
        frame.place(x=x, y=y, width=425, height=500)

        seed = self.make_labeled_spinbox(frame, "Seed", row=0, bg=bg)
        pronoun = self.make_labeled_entry(frame, "Pronouns", row=1, bg=bg)
        name = self.make_labeled_entry(frame, "Name", row=2, bg=bg)
        twitch = self.make_labeled_entry(frame, "Twitch", row=3, bg=bg)
        score = self.make_labeled_spinbox(frame, "Rounds Won", row=4, bg=bg)
        time = self.make_labeled_entry(frame, "Time [0:00.000]", row=5, bg=bg)

        return seed, pronoun, name, twitch, score, time

    def make_labeled_entry(
        self, parent: tk.Widget, label: str, row: int, bg: str
    ) -> tk.Entry:
        tk.Label(
            parent, text=label, bg=bg, fg="white" if bg == "#8c0000" else "black"
        ).grid(row=row, column=0, sticky="w", padx=10, pady=5)
        entry = tk.Entry(parent, bg="#fff", fg="#000", width=30)
        entry.grid(row=row, column=1, sticky="ew", padx=10, pady=5)
        return entry

    def make_labeled_spinbox(
        self, parent: tk.Widget, label: str, row: int, bg: str
    ) -> tk.Spinbox:
        tk.Label(
            parent, text=label, bg=bg, fg="white" if bg == "#8c0000" else "black"
        ).grid(row=row, column=0, sticky="w", padx=10, pady=5)
        spinbox = tk.Spinbox(
            parent, from_=0, to=100, increment=1, bg="#fff", fg="#000", width=10
        )
        spinbox.grid(row=row, column=1, sticky="ew", padx=10, pady=5)
        return spinbox

    def make_entry(
        self, parent: tk.Widget, row: int, column: int, label: str
    ) -> tk.Entry:
        tk.Label(parent, text=label, bg="#E4E2E2").grid(
            row=0, column=column, padx=10, pady=5, sticky="w"
        )
        entry = tk.Entry(parent, bg="#fff", fg="#000", width=25)
        entry.grid(row=row, column=column, padx=10, pady=5)
        return entry

    def update_json(self) -> None:
        data = {
            "allowIntro": False,
            "p1Team": self.p1Seed.get(),
            "p1Pron": self.p1Pron.get(),
            "p1Name": self.p1Name.get(),
            "p1Twitch": self.p1Twitch.get(),
            "p1Color": "Red",
            "p1Skin": "",
            "p1Character": "",
            "p1NScore": self.p1NScore.get(),
            "p1NTime": self.p1NTime.get(),
            "p1WL": "",
            "p2Team": self.p2Seed.get(),
            "p2Pron": self.p2Pron.get(),
            "p2Name": self.p2Name.get(),
            "p2Twitch": self.p2Twitch.get(),
            "p2Color": "Blue",
            "p2Skin": "",
            "p2Character": "",
            "p2NScore": self.p2NScore.get(),
            "p2NTime": self.p2NTime.get(),
            "p2WL": "",
            "bestOf": self.bestOf.get(),
            "round": self.round.get(),
            "tournament": self.tournament.get(),
            "format": self.bestOf.get()[-1],
            "Casters": [
                {
                    "Name": name.get(),
                    "Bluesky": bluesky.get(),
                    "Twitch": twitch.get(),
                }
                for name, bluesky, twitch in self.Casters
            ],
        }

        save_path = os.path.join(BASE_DIR, "Resources", "Texts", "ScoreboardInfo.json")
        os.makedirs(os.path.dirname(save_path), exist_ok=True)

        with open(save_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4)

        # messagebox.showinfo("Export Complete", "JSON has been updated!")


if __name__ == "__main__":
    root = tk.Tk()
    app = App(root)
    root.mainloop()
