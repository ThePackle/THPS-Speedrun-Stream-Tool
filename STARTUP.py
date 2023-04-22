import json
import tkinter as tk
import tkinter.font as tkFont

class App:
    def __init__(self, root):
        #setting title
        root.title("THPS 1+2 Tournament Controller")
        #setting window size
        width=573
        height=357
        screenwidth = root.winfo_screenwidth()
        screenheight = root.winfo_screenheight()
        alignstr = '%dx%d+%d+%d' % (width, height, (screenwidth - width) / 2, (screenheight - height) / 2)
        root.geometry(alignstr)
        root.resizable(width=False, height=False)

        self.P1Seed=tk.Entry(root)
        self.P1Seed["borderwidth"] = "1px"
        ft = tkFont.Font(family='Times',size=10)
        self.P1Seed["font"] = ft
        self.P1Seed["fg"] = "#000000"
        self.P1Seed["justify"] = "center"
        self.P1Seed["text"] = "P1Seed"
        self.P1Seed.insert(0, 0)
        self.P1Seed.place(x=10,y=10,width=25,height=25)

        self.P1Pronouns=tk.Entry(root)
        self.P1Pronouns["borderwidth"] = "1px"
        ft = tkFont.Font(family='Times',size=10)
        self.P1Pronouns["font"] = ft
        self.P1Pronouns["fg"] = "#000000"
        self.P1Pronouns["justify"] = "center"
        self.P1Pronouns["text"] = "P1Pronouns"
        self.P1Pronouns.place(x=40,y=10,width=50,height=25)

        self.P1Name=tk.Entry(root)
        self.P1Name["borderwidth"] = "1px"
        ft = tkFont.Font(family='Times',size=10)
        self.P1Name["font"] = ft
        self.P1Name["fg"] = "#000000"
        self.P1Name["justify"] = "center"
        self.P1Name["text"] = "P1Name"
        self.P1Name.insert(0, "Player 1 Name")
        self.P1Name.place(x=100,y=10,width=100,height=25)

        self.P1Score=tk.Entry(root)
        self.P1Score["borderwidth"] = "1px"
        ft = tkFont.Font(family='Times',size=10)
        self.P1Score["font"] = ft
        self.P1Score["fg"] = "#000000"
        self.P1Score["justify"] = "center"
        self.P1Score["text"] = "P1Score"
        self.P1Score.insert(0, 0)
        self.P1Score.place(x=10,y=50,width=50,height=25)

        self.P1Time=tk.Entry(root)
        self.P1Time["borderwidth"] = "1px"
        ft = tkFont.Font(family='Times',size=10)
        self.P1Time["font"] = ft
        self.P1Time["fg"] = "#000000"
        self.P1Time["justify"] = "center"
        self.P1Time["text"] = "P1Time"
        self.P1Time.insert(0, "0:00.000")
        self.P1Time.place(x=70,y=50,width=100,height=25)

        self.P2Seed=tk.Entry(root)
        self.P2Seed["borderwidth"] = "1px"
        ft = tkFont.Font(family='Times',size=10)
        self.P2Seed["font"] = ft
        self.P2Seed["fg"] = "#000000"
        self.P2Seed["justify"] = "center"
        self.P2Seed["text"] = "P2Seed"
        self.P2Seed.insert(0, 0)
        self.P2Seed.place(x=370,y=10,width=25,height=25)

        self.P2Pronouns=tk.Entry(root)
        self.P2Pronouns["borderwidth"] = "1px"
        ft = tkFont.Font(family='Times',size=10)
        self.P2Pronouns["font"] = ft
        self.P2Pronouns["fg"] = "#000000"
        self.P2Pronouns["justify"] = "center"
        self.P2Pronouns["text"] = "P2Pronouns"
        self.P2Pronouns.place(x=400,y=10,width=50,height=25)

        self.P2Name=tk.Entry(root)
        self.P2Name["borderwidth"] = "1px"
        ft = tkFont.Font(family='Times',size=10)
        self.P2Name["font"] = ft
        self.P2Name["fg"] = "#000000"
        self.P2Name["justify"] = "center"
        self.P2Name["text"] = "P2Name"
        self.P2Name.insert(0, "Player 2 Name")
        self.P2Name.place(x=460,y=10,width=100,height=25)

        self.P2Score=tk.Entry(root)
        self.P2Score["borderwidth"] = "1px"
        ft = tkFont.Font(family='Times',size=10)
        self.P2Score["font"] = ft
        self.P2Score["fg"] = "#000000"
        self.P2Score["justify"] = "center"
        self.P2Score["text"] = "P2Score"
        self.P2Score.insert(0, 0)
        self.P2Score.place(x=370,y=50,width=50,height=25)

        self.P2Time=tk.Entry(root)
        self.P2Time["borderwidth"] = "1px"
        ft = tkFont.Font(family='Times',size=10)
        self.P2Time["font"] = ft
        self.P2Time["fg"] = "#000000"
        self.P2Time["justify"] = "center"
        self.P2Time["text"] = "P2Time"
        self.P2Time.insert(0, "0:00.000")
        self.P2Time.place(x=430,y=50,width=100,height=25)

        divider1=tk.Label(root)
        ft = tkFont.Font(family='Times',size=10)
        divider1["font"] = ft
        divider1["fg"] = "#000000"
        divider1["justify"] = "center"
        divider1["text"] = "__________________________________________________________________________________________________________"
        divider1.place(x=260,y=70,width=55,height=30)

        self.format=tk.Entry(root)
        self.format["borderwidth"] = "1px"
        ft = tkFont.Font(family='Times',size=10)
        self.format["font"] = ft
        self.format["fg"] = "#000000"
        self.format["justify"] = "center"
        self.format["text"] = "0"
        self.format.insert(0, 3)
        self.format.place(x=70,y=110,width=25,height=25)

        bestof=tk.Label(root)
        ft = tkFont.Font(family='Times',size=10)
        bestof["font"] = ft
        bestof["fg"] = "#000000"
        bestof["justify"] = "center"
        bestof["text"] = "Best of"
        bestof.place(x=0,y=110,width=70,height=25)

        self.round=tk.Entry(root)
        self.round["borderwidth"] = "1px"
        ft = tkFont.Font(family='Times',size=10)
        self.round["font"] = ft
        self.round["fg"] = "#000000"
        self.round["justify"] = "center"
        self.round["text"] = "Current Round"
        self.round.insert(0, "Round 1")
        self.round.place(x=130,y=110,width=200,height=25)

        self.tourneyname=tk.Entry(root)
        self.tourneyname["borderwidth"] = "1px"
        ft = tkFont.Font(family='Times',size=10)
        self.tourneyname["font"] = ft
        self.tourneyname["fg"] = "#000000"
        self.tourneyname["justify"] = "center"
        self.tourneyname["text"] = "Tournament Name"
        self.tourneyname.insert(0, "Tournament")
        self.tourneyname.place(x=350,y=110,width=200,height=25)

        divider2=tk.Label(root)
        ft = tkFont.Font(family='Times',size=10)
        divider2["font"] = ft
        divider2["fg"] = "#000000"
        divider2["justify"] = "center"
        divider2["text"] = "__________________________________________________________________________________________________________"
        divider2.place(x=250,y=140,width=70,height=25)

        self.caster1name=tk.Entry(root)
        self.caster1name["borderwidth"] = "1px"
        ft = tkFont.Font(family='Times',size=10)
        self.caster1name["font"] = ft
        self.caster1name["fg"] = "#000000"
        self.caster1name["justify"] = "left"
        self.caster1name["text"] = "Caster 1 Name"
        self.caster1name.insert(0, "Caster 1 Name")
        self.caster1name.place(x=20,y=180,width=150,height=25)

        self.caster1twitter=tk.Entry(root)
        self.caster1twitter["borderwidth"] = "1px"
        ft = tkFont.Font(family='Times',size=10)
        self.caster1twitter["font"] = ft
        self.caster1twitter["fg"] = "#000000"
        self.caster1twitter["justify"] = "left"
        self.caster1twitter["text"] = "Caster 1 Twitter"
        self.caster1twitter.insert(0, "Caster 1 Twitter")
        self.caster1twitter.place(x=210,y=180,width=150,height=25)

        self.caster1twitch=tk.Entry(root)
        self.caster1twitch["borderwidth"] = "1px"
        ft = tkFont.Font(family='Times',size=10)
        self.caster1twitch["font"] = ft
        self.caster1twitch["fg"] = "#000000"
        self.caster1twitch["justify"] = "left"
        self.caster1twitch["text"] = "Caster 1 Twitch"
        self.caster1twitch.insert(0, "Caster 1 Twitch")
        self.caster1twitch.place(x=400,y=180,width=150,height=25)

        self.caster2name=tk.Entry(root)
        self.caster2name["borderwidth"] = "1px"
        ft = tkFont.Font(family='Times',size=10)
        self.caster2name["font"] = ft
        self.caster2name["fg"] = "#000000"
        self.caster2name["justify"] = "left"
        self.caster2name["text"] = "Caster 2 Name"
        self.caster2name.insert(0, "Caster 2 Name")
        self.caster2name.place(x=20,y=220,width=150,height=25)

        self.caster2twitter=tk.Entry(root)
        self.caster2twitter["borderwidth"] = "1px"
        ft = tkFont.Font(family='Times',size=10)
        self.caster2twitter["font"] = ft
        self.caster2twitter["fg"] = "#000000"
        self.caster2twitter["justify"] = "left"
        self.caster2twitter["text"] = "Caster 2 Twitter"
        self.caster2twitter.insert(0, "Caster 2 Twitter")
        self.caster2twitter.place(x=210,y=220,width=150,height=25)

        self.caster2twitch=tk.Entry(root)
        self.caster2twitch["borderwidth"] = "1px"
        ft = tkFont.Font(family='Times',size=10)
        self.caster2twitch["font"] = ft
        self.caster2twitch["fg"] = "#000000"
        self.caster2twitch["justify"] = "left"
        self.caster2twitch["text"] = "Caster 2 Twitch"
        self.caster2twitch.insert(0, "Caster 2 Twitch")
        self.caster2twitch.place(x=400,y=220,width=150,height=25)

        self.caster3name=tk.Entry(root)
        self.caster3name["borderwidth"] = "1px"
        ft = tkFont.Font(family='Times',size=10)
        self.caster3name["font"] = ft
        self.caster3name["fg"] = "#000000"
        self.caster3name["justify"] = "left"
        self.caster3name["text"] = "Caster 3 Name"
        self.caster3name.insert(0, "Caster 3 Name")
        self.caster3name.place(x=20,y=260,width=150,height=25)

        self.caster3twitter=tk.Entry(root)
        self.caster3twitter["borderwidth"] = "1px"
        ft = tkFont.Font(family='Times',size=10)
        self.caster3twitter["font"] = ft
        self.caster3twitter["fg"] = "#000000"
        self.caster3twitter["justify"] = "left"
        self.caster3twitter["text"] = "Caster 3 Twitter"
        self.caster3twitter.insert(0, "Caster 3 Twitter")
        self.caster3twitter.place(x=210,y=260,width=150,height=25)

        self.caster3twitch=tk.Entry(root)
        self.caster3twitch["borderwidth"] = "1px"
        ft = tkFont.Font(family='Times',size=10)
        self.caster3twitch["font"] = ft
        self.caster3twitch["fg"] = "#000000"
        self.caster3twitch["justify"] = "left"
        self.caster3twitch["text"] = "Caster 3 Twitch"
        self.caster3twitch.insert(0, "Caster 3 Twitch")
        self.caster3twitch.place(x=400,y=260,width=150,height=25)

        vdivider=tk.Label(root)
        vdivider["bg"] = "#000000"
        ft = tkFont.Font(family='Times',size=10)
        vdivider["font"] = ft
        vdivider["fg"] = "#000000"
        vdivider["justify"] = "center"
        vdivider["text"] = ""
        vdivider.place(x=290,y=0,width=1,height=90)

        P1Label=tk.Label(root)
        ft = tkFont.Font(family='Times',size=46)
        P1Label["font"] = ft
        P1Label["fg"] = "#000000"
        P1Label["justify"] = "center"
        P1Label["text"] = "P1"
        P1Label.place(x=230,y=10,width=59,height=59)

        P2Label=tk.Label(root)
        ft = tkFont.Font(family='Times',size=46)
        P2Label["font"] = ft
        P2Label["fg"] = "#000000"
        P2Label["justify"] = "center"
        P2Label["text"] = "P2"
        P2Label.place(x=290,y=20,width=79,height=36)

        updatebutton=tk.Button(root)
        updatebutton["bg"] = "#a4a4a4"
        updatebutton["borderwidth"] = "0px"
        ft = tkFont.Font(family='Times',size=10)
        updatebutton["font"] = ft
        updatebutton["fg"] = "#000000"
        updatebutton["justify"] = "center"
        updatebutton["text"] = "UPDATE"
        updatebutton.place(x=10,y=310,width=546,height=30)
        updatebutton["command"] = self.updatebutton_command

    def updatebutton_command(self):
        jsoncreate = {
            "p1Name": self.P1Name.get(),
            "p1Team": self.P1Seed.get(),
            "p1Pron": self.P1Pronouns.get(),
            "p1NScore": self.P1Score.get(),
            "p1NTime": self.P1Time.get(),
            "p1Character": "Random",
            "p1Skin": "",
            "p1Color": "Red",
            "p1WL": "Nada",
            "p2Name": self.P2Name.get(),
            "p2Team": self.P2Seed.get(),
            "p2Pron": self.P2Pronouns.get(),
            "p2NScore": self.P2Score.get(),
            "p2NTime": self.P2Time.get(),
            "p2Character": "Random",
            "p2Skin": "",
            "p2Color": "Blue",
            "p2WL": "Nada",
            "bestOf": "Bo3",
            "p3Color": "Purple",
            "round": self.round.get(),
            "format": self.format.get(),
            "tournamentName": self.tourneyname.get(),
            "caster1Name": self.caster1name.get(),
            "caster1Twitter": self.caster1twitter.get(),
            "caster1Twitch": self.caster1twitch.get(),
            "caster2Name": self.caster2name.get(),
            "caster2Twitter": self.caster2twitter.get(),
            "caster2Twitch": self.caster2twitch.get(),
            "caster3Name": self.caster3name.get(),
            "caster3Twitter": self.caster3twitter.get(),
            "caster3Twitch": self.caster3twitch.get(),
            "allowIntro": False
        }

        jsonfile = open("./Resources/Texts/ScoreboardInfo.json","w")
        jsonfile.write(json.dumps(jsoncreate))
        jsonfile.close()

if __name__ == "__main__":
    root = tk.Tk()
    app = App(root)
    root.mainloop()
