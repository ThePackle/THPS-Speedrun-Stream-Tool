//animation stuff
const pMove = 20; //distance to move for most of the animations
const sMove = 40; //distance for the score assets

const fadeInTime = .3; //(seconds)
const fadeOutTime = .2;
let introDelay = .8; //all animations will get this delay when the html loads (use this so it times with your transition)

//to avoid the code constantly running the same method over and over
let p1CharacterPrev, p1SkinPrev, p1ScorePrev, p1TimePrev, p1ColorPrev, p1wlPrev;
let p2CharacterPrev, p2SkinPrev, p2ScorePrev, p2TimePrev, p2ColorPrev, p2wlPrev;
let bestOfPrev;

//max text sizes (used when resizing back)
const roundSize = "32px";
const casterSize = "24px";
const twitterSize = "20px";
const p1NScoreSize = "55px";
const p2NScoreSize = "55px";
const formatSize = "28px";
const p1NTimeSize = "32px";
const p2NTimeSize = "32px";

//variables for the twitter/twitch constant change
let socialInt1;
let socialInt2;
let socialInt3;
let socialInt4;
let socialInt5;
let twitter1, twitch1, twitter2, twitch2, twitter3, twitch3, p1Twitch, p2Twitch;
let socialSwitch = true; //true = twitter, false = twitch
const socialInterval = 12000;


let startup = true;


window.onload = init;

function init() {
	async function mainLoop() {
		const scInfo = await getInfo();
		getData(scInfo);
	}

	mainLoop();
	setInterval( () => { mainLoop(); }, 500); //update interval
}

async function getData(scInfo) {
	let p1Name = scInfo["p1Name"];
	p1Twitch = scInfo["p1Twitch"];
	let p1Team = scInfo["p1Team"];
	let p1Pron = scInfo["p1Pron"];
	let p1Color = scInfo["p1Color"];
	let p1Character = scInfo["p1Character"];
	let p1Skin = scInfo["p1Skin"];
	let p1WL = scInfo["p1WL"];
	let p1Score = scInfo ["p1Score"];
	let p1Time;
	
	let p2Name = scInfo["p2Name"];
	p2Twitch = scInfo["p2Twitch"];
	let p2Team = scInfo["p2Team"];
	let p2Pron = scInfo["p2Pron"];
	let p2Color = scInfo["p2Color"];
	let p2Character = scInfo["p2Character"];
	let p2Skin = scInfo["p2Skin"];
	let p2WL = scInfo["p2WL"];
	let p2Score = scInfo ["p2Score"];
	let p2Time;
	

	let p1NScore = scInfo ["p1NScore"];
	let p2NScore = scInfo ["p2NScore"];

	let p1NTime = scInfo["p1NTime"];
	let p2NTime = scInfo["p2NTime"];

	let round = scInfo["round"];
	let bestOf = scInfo["bestOf"];
	let format = scInfo["format"];

	let caster1 = scInfo["Casters"][0]["Name"];
	twitter1 = scInfo["Casters"][0]["Bluesky"];
	twitch1 = scInfo["Casters"][0]["Twitch"];
	let caster2 = scInfo["Casters"][1]["Name"];
	twitter2 = scInfo["Casters"][1]["Bluesky"];
	twitch2 = scInfo["Casters"][1]["Twitch"];
	let caster3 = scInfo["Casters"][2]["Name"];
	twitter3 = scInfo["Casters"][2]["Bluesky"];
	twitch3 = scInfo["Casters"][2]["Twitch"];


	//first, things that will happen only the first time the html loads
	if (startup) {
		//of course, we have to start with the cool intro stuff
		const allowIntro = scInfo["allowIntro"]; //to know if the intro is allowed
		if (allowIntro) {

			//this variable is only used in the intro
			const tournamentName = scInfo["tournamentName"];

			//lets see that intro
			document.getElementById("overlayIntro").style.opacity = 1;

			//this vid is just the bars moving (todo: maybe do it through javascript?)
			setTimeout(() => { 
				document.getElementById("introVid").setAttribute("src", "Resources/Webms/Intro.webm");
				document.getElementById("introVid").play();
			}, 0); //if you need it to start later, change that 0 (and also update the introDelay)

			// if (p1NScore + p2NScore == 0) { //if this is the first game, introduce players

				const p1IntroEL = document.getElementById("p1Intro");
				const p2IntroEL = document.getElementById("p2Intro");

				p1IntroEL.textContent = p1Name; //update player 1 intro text
				p1IntroEL.style.fontSize = "60px"; //resize the font to its max size
				resizeText(p1IntroEL); //resize the text if its too large
				p2IntroEL.style.fontSize = "60px";
				p2IntroEL.textContent = p2Name; //p2
				resizeText(p2IntroEL);

				//change the color of the player text shadows
				p1IntroEL.style.textShadow = "0px 0px 20px " + getHexColor(p1Color);
				p2IntroEL.style.textShadow = "0px 0px 20px " + getHexColor(p2Color);

				//player 1 name fade in
				gsap.fromTo("#p1Intro",
					{x: -pMove}, //from
					{delay: introDelay, x: 0, opacity: 1, ease: "power2.out", duration: fadeInTime}); //to

				//same for player 2
				gsap.fromTo("#p2Intro",
					{x: pMove},
					{delay: introDelay, x: 0, opacity: 1, ease: "power2.out", duration: fadeInTime});

			// } else { //if its not the first game, show game count
			// 	const midTextEL = document.getElementById("midTextIntro");
			// 	if ((p1NScore + p2NScore) != 4) { //if its not the last game of a bo5

			// 		//just show the game count in the intro
			// 		midTextEL.textContent = "Game " + (p1NScore + p2NScore + 1);

			// 	} else { //if game 5

			// 		if ((round.toUpperCase() == "True Finals".toUpperCase())) { //if true finals
			// 			midTextEL.textContent = "True Final Game"; //i mean shit gets serious here
			// 		} else {
			// 			midTextEL.textContent = "Final Game";
			// 			//if GF, we dont know if its the last game or not, right?
			// 			if (round.toLocaleUpperCase() == "Grand Finals".toLocaleUpperCase() && !(p1WL == "L" && p2WL == "L")) {
			// 				gsap.to("#superCoolInterrogation", {delay: introDelay+.5, opacity: 1, ease: "power2.out", duration: 1.5});
			// 			}

			// 		}
			// 	}
			// }

			document.getElementById("roundIntro").textContent = round;
			document.getElementById("tNameIntro").textContent = tournamentName;
			
			//round, tournament and VS/GameX text fade in
			gsap.to(".textIntro", {delay: introDelay-.2, opacity: 1, ease: "power2.out", duration: fadeInTime});

			//aaaaand fade out everything
			gsap.to("#overlayIntro", {delay: introDelay+1.6, opacity: 0, ease: "power2.out", duration: fadeInTime+.2});

			//lets delay everything that comes after this so it shows after the intro
			introDelay = 2.6;
		}

		//finally out of the intro, now lets start with player 1 first
		//update player name and team name texts
		updatePlayerName("p1Wrapper", "p1Name", "p1Team", "p1Pron", p1Name, p1Team, p1Pron);
		//sets the starting position for the player text, then fades in and moves the p1 text to the next keyframe
		gsap.fromTo("#p1Wrapper", 
			{x: -pMove}, //from
			{delay: introDelay+.1, x: 0, opacity: 1, ease: "power2.out", duration: fadeInTime}); //to

		//set the character image and saga icon for the player
		// await updateChar(p1Character, p1Skin, "p1Character", "sagaIconP1");
		//when the image finishes loading, fade-in-move the images to the overlay
		initCharaFade("#p1Character", "#sagaIconP1", -pMove);
		//save the character/skin so we run the character change code only when this doesnt equal to the next
		p1CharacterPrev = p1Character;
		p1SkinPrev = p1Skin;

		//if its grands, we need to show the [W] and/or the [L] on the players
		updateWL(p1WL, "1");
		//save for later so the animation doesn"t repeat over and over
		p1wlPrev = p1WL;

		//set the current score
		updateScore(1, p1Score, p1Color);
		//play a sick animation for the score ticks
		moveScoresIntro(1, bestOf, p1WL, sMove);
		//yeah same thing here
		p1ScorePrev = p1Score;
		p1TimePrev = p1Time;

		//set the color
		updateColor("p1Color", "p1Name", p1Color);
		p1ColorPrev = p1Color;

		//took notes from player 1? well, this is exactly the same!
		updatePlayerName("p2Wrapper", "p2Name", "p2Team", "p2Pron", p2Name, p2Team, p2Pron);
		gsap.fromTo("#p2Wrapper", 
			{x: pMove},
			{delay: introDelay+.1, x: 0, opacity: 1, ease: "power2.out", duration: fadeInTime});

		// await updateChar(p2Character, p2Skin, "p2Character", "sagaIconP2");
		initCharaFade("#p2Character", "#sagaIconP2");
		p2CharacterPrev = p2Character;
		p2SkinPrev = p2Skin;

		updateWL(p2WL, "2");
		p2wlPrev = p2WL;

		updateScore(2, p2Score, p2Color);
		moveScoresIntro(2, bestOf, p2WL, -sMove);
		p2ScorePrev = p2Score;
		p2TimePrev = p2Time;

		updateColor("p2Color", "p2Name", p2Color);
		p2ColorPrev = p2Color;


		//set this for later
		bestOfPrev = bestOf;


		//update the round text
		updateRound(round);
		gsap.fromTo("#overlayRound", 
			{x: -pMove}, //from
			{delay: introDelay, opacity: 1, ease: "power2.out", duration: fadeInTime}); //to

		updateFormat(format);
		//update the best of text
		if (bestOf == "Bo5") {
			document.getElementById("bestOf").textContent = "First to ";
		} else {
			document.getElementById("bestOf").textContent = "Best of ";
		}
		//fade them in (but only if round text is not empty)
		if (format != "") {
			gsap.to("#overlayFormat", 
			{delay: introDelay, opacity: 1, ease: "power2.out", duration: fadeInTime+.2});
		}

		updatep1NScore(p1NScore);
		updatep2NScore(p2NScore);
		updatep1NTime(p1NTime);
		updatep2NTime(p2NTime)

		gsap.fromTo("#p1NScore", 
			{x: -pMove}, //from
			{delay: introDelay+.2, x: 0, opacity: 1, ease: "power2.out", duration: fadeInTime}); //to

		gsap.fromTo("#p2NScore", 
			{x: pMove}, //from
			{delay: introDelay+.2, x: 0, opacity: 1, ease: "power2.out", duration: fadeInTime}); //to

		gsap.fromTo("#p1NTime", 
			{x: -pMove}, //from
			{delay: introDelay+.2, x: 0, opacity: 1, ease: "power2.out", duration: fadeInTime}); //to

		gsap.fromTo("#p2NTime", 
			{x: pMove}, //from
			{delay: introDelay+.2, x: 0, opacity: 1, ease: "power2.out", duration: fadeInTime}); //to

		//set the caster info
		updateSocialText("caster1N", caster1, casterSize, "caster1TextBox");
		updateSocialText("caster1Tr", twitter1, twitterSize, "caster1TwitterBox");
		updateSocialText("caster1Th", twitch1, twitterSize, "caster1TwitchBox");
		updateSocialText("caster2N", caster2, casterSize, "caster2TextBox");
		updateSocialText("caster2Tr", twitter2, twitterSize, "caster2TwitterBox");
		updateSocialText("caster2Th", twitch2, twitterSize, "caster2TwitchBox");
		updateSocialText("caster3N", caster3, casterSize, "caster3TextBox");
		updateSocialText("caster3Tr", twitter3, twitterSize, "caster3TwitterBox");
		updateSocialText("caster3Th", twitch3, twitterSize, "caster3TwitchBox");

		updateSocialText("player1Tr", p1Name, casterSize, "player1TwitterBox");
		updateSocialText("player1Th", p1Twitch, twitterSize, "player1TwitchBox");
		updateSocialText("player2Tr", p2Name, casterSize, "player2TwitterBox");
		updateSocialText("player2Th", p2Twitch, twitterSize, "player2TwitchBox");

		//setup twitter/twitch change
		socialChange1("caster1TwitterBox", "caster1TwitchBox");
		socialChange2("caster2TwitterBox", "caster2TwitchBox");
		socialChange3("caster3TwitterBox", "caster3TwitchBox");
		socialChange4("player1TwitterBox", "player1TwitchBox");
		socialChange5("player2TwitterBox", "player2TwitchBox");
		//set an interval to keep changing the names
		socialInt1 = setInterval( () => {
			socialChange1("caster1TwitterBox", "caster1TwitchBox");
		}, socialInterval);
		socialInt2 = setInterval(() => {
			socialChange2("caster2TwitterBox", "caster2TwitchBox");
		}, socialInterval);
		socialInt3 = setInterval(() => {
			socialChange3("caster3TwitterBox", "caster3TwitchBox");
		}, socialInterval);
		socialInt4 = setInterval(() => {
			socialChange4("player1TwitterBox", "player1TwitchBox");
		}, socialInterval);
		socialInt5 = setInterval(() => {
			socialChange5("player2TwitterBox", "player2TwitchBox");
		}, socialInterval);

		//keep changing this boolean for the previous intervals
		setInterval(() => {
			if (socialSwitch) { //true = twitter, false = twitch
				socialSwitch = false;
			} else {
				socialSwitch = true;
			}
		}, socialInterval);

		//if a caster has no name, hide its icon
		if (caster1 == "") {
			document.getElementById("caster1TextBox").style.opacity = 0;
		}
		if (caster2 == "") {
			document.getElementById("caster2TextBox").style.opacity = 0;
		}
		if (caster3 == "") {
			document.getElementById("caster3TextBox").style.opacity = 0;
		}


		//check if the team has a logo we can place on the overlay
		updateTeamLogo("teamLogoP1", p1Team);
		updateTeamLogo("teamLogoP2", p2Team);
		//animate them
		fadeIn("#teamLogoP1");
		fadeIn("#teamLogoP2");


		startup = false; //next time we run this function, it will skip all we just did
	}

	//now things that will happen constantly
	else {
		
	//player 1 time!
	if (document.getElementById("p1Name").textContent != p1Name ||
	document.getElementById("p1Team").textContent != p1Team ||
	document.getElementById("p1Pron").textContent != p1Pron) {
	//move and fade out the player 1"s text
	fadeOutMove("#p1Wrapper", -pMove, () => {
		//now that nobody is seeing it, quick, change the text"s content!
		updatePlayerName("p1Wrapper", "p1Name", "p1Team", "p1Pron", p1Name, p1Team, p1Pron);
		//fade the name back in with a sick movement
		fadeInMove("#p1Wrapper");
	});
}

		//player 1"s character portrait change
		if (p1CharacterPrev != p1Character || p1SkinPrev != p1Skin) {
			//fade out the images while also moving them because that always looks cool
			fadeOutChara("#p1Character", "#sagaIconP1", -pMove, async () => {
				//now that nobody can see them, lets change the images!
				// updateChar(p1Character, p1Skin, "p1Character", "sagaIconP1"); //will return scale
				//and now, fade them in
				fadeInChara("#p1Character", "#sagaIconP1");
			});
			p1CharacterPrev = p1Character;
			p1SkinPrev = p1Skin;
		}

		//the [W] and [L] status for grand finals
		if (p1wlPrev != p1WL) {
			//move it away!
			gsap.to("#wlP1", {x: -pMove, opacity: 0, ease: "power1.in", duration: fadeOutTime, onComplete: pwlMoved});
			function pwlMoved() {
				//change the thing!
				updateWL(p1WL, 1);
				//move it back!
				if (p1WL != "Nada") {
					gsap.to("#wlP1", {delay: .3, x: 0, opacity: 1, ease: "power2.out", duration: fadeInTime});
				} else {
					gsap.to("#wlP1", {x: 0, duration: fadeInTime});
				}
			}
			p1wlPrev = p1WL;
		}


		//score check
		if (p1ScorePrev != p1Score) {
			updateScore(1, p1Score, p1Color);
			p1ScorePrev = p1Score;
		}

		if (p1TimePrev != p1NTime) {
			fadeOut("#p1NTime", () => {
				updatep1NTime(p1NTime);
				if(p1NTime != ""){
					fadeIn("#p1NTime");
				}
			});
			p1TimePrev = p1NTime;
		}

		//change the player"s colors
		if (p1ColorPrev != p1Color) {
			updateColor("p1Color", "p1Team", p1Color);
			updateScore(1, p1Score, p1Color);
			p1ColorPrev = p1Color;
		}

		//check if the team has a logo we can place on the overlay
		if (document.getElementById("p1Team").textContent != p1Team) {
			fadeOut("#teamLogoP1", () => {
				updateTeamLogo("teamLogoP1", p1Team);
				fadeIn("#teamLogoP1");
			});
		}


			//did you pay attention earlier? Well, this is the same as player 1!
			if (document.getElementById("p2Name").textContent != p2Name ||
			document.getElementById("p2Team").textContent != p2Team ||
			document.getElementById("p2Pron").textContent != p2Pron) {
			fadeOutMove("#p2Wrapper", pMove, () => {
				updatePlayerName("p2Wrapper", "p2Name", "p2Team", "p2Pron", p2Name, p2Team, p2Pron);
				fadeInMove("#p2Wrapper");
			});
		}

		if (p2CharacterPrev != p2Character || p2SkinPrev != p2Skin) {
			fadeOutChara("#p2Character", "#sagaIconP2", -pMove, async () => {
				// updateChar(p2Character, p2Skin, "p2Character", "sagaIconP2");
				fadeInChara("#p2Character", "#sagaIconP2", -pMove);
			});
			p2CharacterPrev = p2Character;
			p2SkinPrev = p2Skin;
		}

		if (p2wlPrev != p2WL) {
			gsap.to("#wlP2", {x: pMove, opacity: 0, ease: "power1.in", duration: fadeOutTime, onComplete: pwlMoved});
			function pwlMoved() {
				updateWL(p2WL, 2);
				if (p2WL != "Nada") {
					gsap.to("#wlP2", {delay: .3, x: 0, opacity: 1, ease: "power2.out", duration: fadeInTime});
				} else {
					gsap.to("#wlP2", {x: 0, duration: fadeInTime});
				}
			}
			p2wlPrev = p2WL;
		}

		if (p2ScorePrev != p2Score) {
			updateScore(2, p2Score, p2Color);
			p2ScorePrev = p2Score;
		}

		if (p2TimePrev != p2NTime) {
			fadeOut("#p2NTime", () => {
				updatep2NTime(p2NTime);
				if(p2NTime != ""){
					fadeIn("#p2NTime");
				}
			});
			p2TimePrev = p2NTime;
		}

		if (p2ColorPrev != p2Color) {
			updateColor("p2Color", "p2Team", p2Color);
			updateScore(2, p2Score, p2Color);
			p2ColorPrev = p2Color;
		}

		if (document.getElementById("p2Team").textContent != p2Team) {
			fadeOut("#teamLogoP2", () => {
				updateTeamLogo("teamLogoP2", p2Team);
				fadeIn("#teamLogoP2");
			});
		}


		//hide or show score ticks depending of the Best Of status
		if (bestOfPrev != bestOf) {
			if (bestOf == "Bo5") {
				gsap.fromTo("#win3P1",
					{x: -pMove},
					{x: 0, opacity: 1, ease: "power2.out", duration: fadeInTime});
				gsap.fromTo("#win3P2",
					{x: pMove},
					{x: 0, opacity: 1, ease: "power2.out", duration: fadeInTime});
				
				fadeOut("#bestOf", () => {
					document.getElementById("bestOf").textContent = "First to ";
					fadeIn("#bestOf");
				});
			} else {
				gsap.to("#win3P1",
					{x: -pMove, opacity: 0, ease: "power2.in", duration: fadeInTime});
				gsap.to("#win3P2",
					{x: pMove, opacity: 0, ease: "power2.in", duration: fadeInTime});

				fadeOut("#bestOf", () => {
					document.getElementById("bestOf").textContent = "Best of ";
					fadeIn("#bestOf");
				});
			}
			bestOfPrev = bestOf;
		}

		
		//update the round text
		if (document.getElementById("round").textContent != round){
			fadeOut("#overlayRound", () => {
				updateRound(round);
				if (round != "") {
					fadeIn("#overlayRound");
				}
			});
		}

		if (document.getElementById("format").textContent != format){
			fadeOut("#overlayFormat", () => {
				updateFormat(format);
				if (format != "") {
					fadeIn("#overlayFormat");
				}
			});
		}

		if (document.getElementById("p1NScore").textContent != p1NScore){
			fadeOut("#p1NScore", () => {
				updatep1NScore(p1NScore);
				if (p1NScore != "") {
					fadeIn("#p1NScore");
				}
			});
		}
		if (document.getElementById("p2NScore").textContent != p2NScore){
			fadeOut("#p2NScore", () => {
				updatep2NScore(p2NScore);
				if (p2NScore != "") {
					fadeIn("#p2NScore");
				}
			});
		}

		//update caster 1 info
		if (document.getElementById("caster1N").textContent != caster1){
			fadeOut("#caster1TextBox", () => {
				updateSocialText("caster1N", caster1, casterSize, "caster1TextBox");
				//if no caster name, dont fade in the caster icon
				if (caster1 != "") {
					fadeIn("#caster1TextBox", .2);
				}
			});
		}
		if (document.getElementById("caster1Tr").textContent != twitter1){
			updateSocial(twitter1, "caster1Tr", "caster1TwitterBox", twitch1, "caster1TwitchBox");
		}
		if (document.getElementById("caster1Th").textContent != twitch1){
			updateSocial(twitch1, "caster1Th", "caster1TwitchBox", twitter1, "caster1TwitterBox");
		}

		//caster 2, same as above
		if (document.getElementById("caster2N").textContent != caster2){
			fadeOut("#caster2TextBox", () => {
				updateSocialText("caster2N", caster2, casterSize, "caster2TextBox");
				if (caster2 != "") {
					fadeIn("#caster2TextBox", .2);
				}
			});
		}
		if (document.getElementById("caster2Tr").textContent != twitter2){
			updateSocial(twitter2, "caster2Tr", "caster2TwitterBox", twitch2, "caster2TwitchBox");
		}
		if (document.getElementById("caster2Th").textContent != twitch2){
			updateSocial(twitch2, "caster2Th", "caster2TwitchBox", twitter2, "caster2TwitterBox");
		}

		//update caster 3 info
		if (document.getElementById("caster3N").textContent != caster3){
			fadeOut("#caster3TextBox", () => {
				updateSocialText("caster3N", caster3, casterSize, "caster3TextBox");
				//if no caster name, dont fade in the caster icon
				if (caster3 != "") {
					fadeIn("#caster3TextBox", .2);
				}
			});
		}
		if (document.getElementById("caster3Tr").textContent != twitter3){
			updateSocial(twitter3, "caster3Tr", "caster3TwitterBox", twitter3, "caster3TwitchBox");
		}
		if (document.getElementById("caster3Th").textContent != twitch3){
			updateSocial(twitch3, "caster3Th", "caster3TwitchBox", twitch3, "caster3TwitterBox");
		}

		//player 1 info
		/* if (document.getElementById("player1N").textContent != p1Name){
			fadeOut("#player1TextBox", () => {
				updateSocialText("player1N", p1Name, casterSize, "player1TextBox");
				if (p1Name != "") {
					fadeIn("#player1TextBox", .2);
				}
			});
		} */
		if (document.getElementById("player1Th").textContent != p1Twitch){
			updateSocial(p1Twitch, "player1Th", "player1TwitchBox", p1Twitch, "player1TwitterBox");
		}

		//player 2 info
		/* if (document.getElementById("player2N").textContent != p2Name){
			fadeOut("#player2TextBox", () => {
				updateSocialText("player2N", p2Name, casterSize, "player2TextBox");
				if (p2Name != "") {
					fadeIn("#player2TextBox", .2);
				}
			});
		} */
		if (document.getElementById("player2Th").textContent != p2Twitch){
			updateSocial(p2Twitch, "player2Th", "player2TwitchBox", p2Twitch, "player2TwitterBox");
		}
	}
}


//did an image fail to load? this will be used to show nothing
function showNothing(itemEL) {
	itemEL.setAttribute("src", "Resources/Literally Nothing.png");
}


//score change, pretty simple
function updateScore(pNum, pScore, pColor) {
	const score1EL = document.getElementById("win1P"+pNum);
	const score2EL = document.getElementById("win2P"+pNum);
	const score3EL = document.getElementById("win3P"+pNum);

	const time1EL = document.getElementById("time1P"+pNum);
	const time2EL = document.getElementById("time2P"+pNum);

	if (pScore >= 1) {
		scoreChange(score1EL, getHexColor(pColor));
		scoreChange(time1EL, getHexColor(pColor));
	} else if (score1EL.style.fill != "rgb(65, 65, 65)") {
		scoreChange(score1EL, "#727272");
		scoreChange(time1EL, "#727272");
	}
	if (pScore >= 2) {
		scoreChange(score2EL, getHexColor(pColor));
		scoreChange(time2EL, getHexColor(pColor));
	} else if (score2EL.style.fill != "rgb(65, 65, 65)") {
		scoreChange(score2EL, "#727272");
		scoreChange(time2EL, "#727272");
	}
	if (pScore <= 3) {
		scoreChange(score3EL, getHexColor(pColor));
	} else if (score3EL.style.fill != "rgb(65, 65, 65)") {
		scoreChange(score3EL, "#727272");
	}
}
function scoreChange(scoreEL, color) {
	gsap.to(scoreEL, {fill: "#ffffff", duration: fadeInTime})
	gsap.to(scoreEL, {delay: fadeInTime, fill: color, duration: fadeInTime})
}

//updates the player"s text and portrait background colors
function updateColor(colorID, textID, pColor) {
	const colorEL = document.getElementById(colorID);
	const textEL = document.getElementById(textID);

	gsap.to(colorEL, {backgroundColor: getHexColor(pColor), duration: fadeInTime});
	gsap.to(textEL, {color: getHexColor(pColor), duration: fadeInTime});
}

function updateBorder(bestOf) {
	document.getElementById("borderP1").setAttribute("src", "Resources/Overlay/Border " + bestOf + ".png");
	document.getElementById("borderP2").setAttribute("src", "Resources/Overlay/Border " + bestOf + ".png");
	bestOfPrev = bestOf
}

//team logo change
function updateTeamLogo(logoID, pTeam) {
	//search for an image with the team name
	const logoEL = document.getElementById(logoID);
	logoEL.setAttribute("src", "Resources/TeamLogos/" + pTeam + ".png");
	//no image? show nothing
	if (startup) {logoEL.addEventListener("error", () => {showNothing(logoEL)})}
}

//the logic behind the twitter/twitch constant change
function socialChange1(twitterWrapperID, twitchWrapperID) {

	const twitterWrapperEL = document.getElementById(twitterWrapperID);
	const twitchWrapperEL = document.getElementById(twitchWrapperID);

	if (startup) {
		//if first time, set initial opacities so we can read them later
		if (!twitter1 && !twitch1) { //if all blank
			twitterWrapperEL.style.opacity = 0;
			twitchWrapperEL.style.opacity = 0;
		} else if (!twitter1 && !!twitch1) { //if twitter blank
			twitterWrapperEL.style.opacity = 0;
			twitchWrapperEL.style.opacity = 1;
		} else {
			twitterWrapperEL.style.opacity = 1;
			twitchWrapperEL.style.opacity = 0;
		}
	} else if (!!twitter1 && !!twitch1) {
		if (socialSwitch) {
			fadeOut(twitterWrapperEL, () => {
				fadeIn(twitchWrapperEL, 0);
			});
		} else {
			fadeOut(twitchWrapperEL, () => {
				fadeIn(twitterWrapperEL, 0);
			});
		}
	}
}
//i didnt know how to make it a single function im sorry ;_;
function socialChange2(twitterWrapperID, twitchWrapperID) {
	const twitterWrapperEL = document.getElementById(twitterWrapperID);
	const twitchWrapperEL = document.getElementById(twitchWrapperID);

	if (startup) {
		if (!twitter2 && !twitch2) {
			twitterWrapperEL.style.opacity = 0;
			twitchWrapperEL.style.opacity = 0;
		} else if (!twitter2 && !!twitch2) {
			twitterWrapperEL.style.opacity = 0;
			twitchWrapperEL.style.opacity = 1;
		} else {
			twitterWrapperEL.style.opacity = 1;
			twitchWrapperEL.style.opacity = 0;
		}
	} else if (!!twitter2 && !!twitch2) {
		if (socialSwitch) {
			fadeOut(twitterWrapperEL, () => {
				fadeIn(twitchWrapperEL, 0);
			});
		} else {
			fadeOut(twitchWrapperEL, () => {
				fadeIn(twitterWrapperEL, 0);
			});
		}
	}
}

function socialChange3(twitterWrapperID, twitchWrapperID) {
	const twitterWrapperEL = document.getElementById(twitterWrapperID);
	const twitchWrapperEL = document.getElementById(twitchWrapperID);

	if (startup) {
		if (!twitter3 && !twitch3) {
			twitterWrapperEL.style.opacity = 0;
			twitchWrapperEL.style.opacity = 0;
		} else if (!twitter3 && !!twitch3) {
			twitterWrapperEL.style.opacity = 0;
			twitchWrapperEL.style.opacity = 1;
		} else {
			twitterWrapperEL.style.opacity = 1;
			twitchWrapperEL.style.opacity = 0;
		}

	} else if (!!twitter3 && !!twitch3) {

		if (socialSwitch) {
			fadeOut(twitterWrapperEL, () => {
				fadeIn(twitchWrapperEL, 0);
			});
		} else {
			fadeOut(twitchWrapperEL, () => {
				fadeIn(twitterWrapperEL, 0);
			});
		}
	}
}

function socialChange4(textWrapperID, twitchWrapperID) {
	const textWrapperEL = document.getElementById(textWrapperID);
	const twitchWrapperEL = document.getElementById(twitchWrapperID);

	if (startup) {
		if (!p1Name && !p1Twitch) {
			textWrapperEL.style.opacity = 0;
			twitchWrapperEL.style.opacity = 0;
		} else if (!p1Name && !!p1Twitch) {
			textWrapperEL.style.opacity = 0;
			twitchWrapperEL.style.opacity = 1;
		} else {
			textWrapperEL.style.opacity = 1;
			twitchWrapperEL.style.opacity = 0;
		}
	} else if (!!p1Name && !!p1Twitch) {
		if (socialSwitch) {
			fadeOut(textWrapperEL, () => {
				fadeIn(twitchWrapperEL, 0);
			});
		} else {
			fadeOut(twitchWrapperEL, () => {
				fadeIn(textWrapperEL, 0);
			});
		}
	}
}

function socialChange5(textWrapperID, twitchWrapperID) {
	const textWrapperEL = document.getElementById(textWrapperID);
	const twitchWrapperEL = document.getElementById(twitchWrapperID);

	if (startup) {
		if (!p2Name && !p2Twitch) {
			textWrapperEL.style.opacity = 0;
			twitchWrapperEL.style.opacity = 0;
		} else if (!p2Name && !!p2Twitch) {
			textWrapperEL.style.opacity = 0;
			twitchWrapperEL.style.opacity = 1;
		} else {
			textWrapperEL.style.opacity = 1;
			twitchWrapperEL.style.opacity = 0;
		}
	} else if (!!p2Name && !!p2Twitch) {
		if (socialSwitch) {
			fadeOut(textWrapperEL, () => {
				fadeIn(twitchWrapperEL, 0);
			});
		} else {
			fadeOut(twitchWrapperEL, () => {
				fadeIn(textWrapperEL, 0);
			});
		}
	}
}

//function to decide when to change to what
function updateSocial(mainSocial, mainText, mainBox, otherSocial, otherBox) {
	//check if this is for twitch or twitter
	let localSwitch = socialSwitch;
	if (mainText == "caster1Th" || mainText == "caster2Th" || mainText == "caster3Th") {
		localSwitch = !localSwitch;
	}
	//check if this is their turn so we fade out the other one
	if (localSwitch) {
		fadeOut("#"+otherBox, () => {})
	}

	//now do the classics
	fadeOut("#"+mainBox, () => {
		updateSocialText(mainText, mainSocial, twitterSize, mainBox);
		//check if its twitter"s turn to show up
		if (otherSocial == "" && mainSocial != "") {
			fadeIn("#"+mainBox, .2);
		} else if (localSwitch && mainSocial != "") {
			fadeIn("#"+mainBox, .2);
		} else if (otherSocial != "") {
			fadeIn("#"+otherBox, .2);
		}
	});
}

//player text change
function updatePlayerName(wrapperID, nameID, teamID, pronID, pName, pTeam, pPron) {
	const nameEL = document.getElementById(nameID);
	nameEL.style.fontSize = "40px"; //set original text size
	nameEL.textContent = pName; //change the actual text
	const teamEL = document.getElementById(teamID);
	teamEL.style.fontSize = "20px";
	teamEL.textContent = pTeam;
	const pronEL = document.getElementById(pronID);
	pronEL.style.fontSize = "20px";
	pronEL.textContent = pPron;
	resizeText(document.getElementById(wrapperID)); //resize if it overflows
}

//round change
function updateRound(round) {
	const roundEL = document.getElementById("round");
	roundEL.style.fontSize = roundSize; //set original text size
	roundEL.textContent = round; //change the actual text
	resizeText(roundEL); //resize it if it overflows
}

function updateFormat(format) {
	const formatEL = document.getElementById("format");
	formatEL.style.fontSize = formatSize; //set original text size
	formatEL.textContent = format; //change the actual text
	resizeText(formatEL); //resize it if it overflows
}

//generic text changer
function updateText(textID, textToType, maxSize) {
	const textEL = document.getElementById(textID);
	textEL.style.fontSize = maxSize; //set original text size
	textEL.textContent = textToType; //change the actual text
	resizeText(textEL); //resize it if it overflows
}
//social text changer
function updateSocialText(textID, textToType, maxSize, wrapper) {
	const textEL = document.getElementById(textID);
	textEL.style.fontSize = maxSize; //set original text size
	textEL.textContent = textToType; //change the actual text
	const wrapperEL = document.getElementById(wrapper)
	resizeText(wrapperEL); //resize it if it overflows
}

//nscore change
function updatep1NScore(p1NScore) {
	const p1NScoreEL = document.getElementById("p1NScore");
	p1NScoreEL.style.fontSize = p1NScoreSize; //set original text size
	p1NScoreEL.textContent = p1NScore; //change the actual text
	resizeText(p1NScoreEL); //resize it if it overflows
}

function updatep2NScore(p2NScore) {
	const p2NScoreEL = document.getElementById("p2NScore");
	p2NScoreEL.style.fontSize = p2NScoreSize; //set original text size
	p2NScoreEL.textContent = p2NScore; //change the actual text
	resizeText(p2NScoreEL); //resize it if it overflows
}

function updatep1NTime(p1NTime) {
	const p1NTimeEL = document.getElementById("p1NTime");
	p1NTimeEL.style.fontSize = p1NTimeSize; //set original text size
	p1NTimeEL.textContent = p1NTime; //change the actual text
	resizeText(p1NTimeEL); //resize it if it overflows
}

function updatep2NTime(p2NTime) {
	const p2NTimeEL = document.getElementById("p2NTime");
	p2NTimeEL.style.fontSize = p2NTimeSize; //set original text size
	p2NTimeEL.textContent = p2NTime; //change the actual text
	resizeText(p2NTimeEL); //resize it if it overflows
}


//fade out
function fadeOut(itemID, funct) {
	gsap.to(itemID, {opacity: 0, duration: fadeOutTime, onComplete: funct});
}

//fade out but with movement
function fadeOutMove(itemID, move, funct) {
	gsap.to(itemID, {x: -move, opacity: 0, ease: "power1.in", duration: fadeOutTime, onComplete: funct});
}

//fade out but for character/saga icon
function fadeOutChara (itemID, sagaID, move, funct) {
	gsap.to(itemID, {x: -move, opacity: 0, ease: "power1.in", duration: fadeOutTime, onComplete: funct});
	gsap.to(sagaID, {opacity: 0, ease: "power1.in", duration: fadeOutTime});
}

//fade in
function fadeIn(itemID) {
	gsap.to(itemID, {delay: .2, opacity: 1, duration: fadeInTime});
}

//fade in but with movement
function fadeInMove(itemID) {
	gsap.to(itemID, {delay: .3, x: 0, opacity: 1, ease: "power2.out", duration: fadeInTime});
}

//fade in but for the character/saga icon
function fadeInChara(itemID, sagaID, move = pMove) {
	gsap.to(itemID, {delay: .2, x: 0, opacity: 1, ease: "power2.out", duration: fadeInTime});
	gsap.fromTo(sagaID,
		{x: -move},
		{delay: .3, x: 0, opacity: .3, ease: "power1.in", duration: fadeOutTime});
}

//fade in for the characters when first loading
function initCharaFade(charaID, sagaID, move = pMove) {
	gsap.fromTo(charaID,
		{x: pMove},
		{delay: introDelay, x: 0, opacity: 1, ease: "power2.out", duration: fadeInTime});
	gsap.fromTo(sagaID,
		{x: move},
		{delay: introDelay+.2, x: 0, opacity: .3, ease: "power2.out", duration: fadeInTime});
}

//played when loading the html
function moveScoresIntro(pNum, bestOf, pWL, move) {
	const score1EL = document.getElementById("win1P"+pNum);
	const score2EL = document.getElementById("win2P"+pNum);
	const score3EL = document.getElementById("win3P"+pNum);
	const wlEL = document.getElementById("wlP"+pNum);

	gsap.fromTo(score1EL, 
		{x:-move},
		{delay: introDelay+.2, x: 0, opacity: 1, ease: "power2.out", duration: fadeInTime});
	gsap.fromTo(score2EL, 
		{x:-move},
		{delay: introDelay+.4, x: 0, opacity: 1, ease: "power2.out", duration: fadeInTime});
	if (bestOf == "Bo5") {
		gsap.fromTo(score3EL, 
			{x:-move},
			{delay: introDelay+.6, x: 0, opacity: 1, ease: "power2.out", duration: fadeInTime});
	}
	if (pWL == "W" || pWL == "L") {
		gsap.fromTo(wlEL, 
			{x:-move},
			{delay: introDelay+.8, x: 0, opacity: 1, ease: "power2.out", duration: fadeInTime});
	}

}

 
//check if winning or losing in a GF, then change image
function updateWL(pWL, playerNum) {
	const pWLEL = document.getElementById("wlP" + playerNum + "Text");
	if (pWL == "W") {
		pWLEL.setAttribute("src", "Resources/Overlay/[W].png")
	} else if (pWL == "L") {
		pWLEL.setAttribute("src", "Resources/Overlay/[L].png")
	}
	if (startup) {pWLEL.addEventListener("error", () => {
		showNothing(pWLEL)
	})}
}

//text resizing
function resizeText(el) {
    let elWidth = el.offsetWidth;
    let elChildren = el.children; //get all elements inside of the container
    for (let i = 0; i < elChildren.length; i++) {
        let textEL = elChildren[i]; //get the text elements

        if (textEL.offsetWidth > elWidth) { //if it overflows
            let safetyCounter = 0;
            const maxIterations = 200; // NEW: Set a reasonable limit (adjust if needed)

            // Reduce font size until it fits OR maxIterations is reached
            while (textEL.offsetWidth > elWidth && safetyCounter < maxIterations) {
                let currentSize = parseFloat(getComputedStyle(textEL).fontSize);
                if (currentSize <= 1) { // Prevent font size from becoming too small or zero
                    break;
                }
                let newSize = (currentSize - 1) + "px";
                textEL.style.fontSize = newSize;
                safetyCounter++; // Increment safety counter
            }

            // Optional: Log a warning if the loop hit its limit
            if (safetyCounter >= maxIterations) {
                console.warn(`Text overflow for element #${textEL.id} (or its child text). Max resize iterations reached. Current width: ${textEL.offsetWidth}px, Container width: ${elWidth}px`);
            }
        } else {
            if (el.id === "round") {
                textEL.style.fontSize = roundSize;
            } else if (el.id === "caster1Name" || el.id === "caster2Name" || el.id === "caster3Name") {
                textEL.style.fontSize = casterSize;
            } else if (el.id === "caster1Twitter" || el.id === "caster2Twitter" || el.id === "caster3Twitter") {
                textEL.style.fontSize = twitterSize;
            } else if (el.id === "p1NScore") {
                textEL.style.fontSize = p1NScoreSize;
            } else if (el.id === "p2NScore") {
                textEL.style.fontSize = p2NScoreSize;
            } else if (el.id === "format") {
                textEL.style.fontSize = formatSize;
            } else if (el.id === "p1NTime") {
                textEL.style.fontSize = p1NTimeSize;
            } else if (el.id === "p2NTime") {
                textEL.style.fontSize = p2NTimeSize;
            }
        }
    }
}

//returns a smaller fontSize for the given element
function getFontSize(textElement) {
	return (parseFloat(textElement.style.fontSize.slice(0, -2)) * .90) + "px";
}

//color codes here!
function getHexColor(color) {
	switch (color) {
		case "Red":
			return "#fd3232";
		case "Blue":
			return "#2985f5";
		case "Yellow":
			return "#febc0d";	
		case "Green":
			return "#21b546";
		case "Orange":
			return "#f88632";	
		case "Cyan":
			return "#26cae2";
		case "Pink":
			return "#fe9bb5";
		case "Purple":
			return "#9570fe";
		case "CPU":
			return "#ACACAC";
		case "Amiibo":
			return "#87FFCD";				
	}
}

//searches for the main json file
function getInfo() {
	return new Promise(function (resolve) {
		const oReq = new XMLHttpRequest();
		oReq.addEventListener("load", reqListener);
		oReq.open("GET", "Resources/Texts/ScoreboardInfo.json");
		oReq.send();

		//will trigger when file loads
		function reqListener () {
			resolve(JSON.parse(oReq.responseText))
		}
	})
	//i would gladly have used fetch, but OBS local files wont support that :(
}

//searches for a json file with character data
function getCharInfo(pCharacter) {
	return new Promise(function (resolve) {
		const oReq = new XMLHttpRequest();
		oReq.addEventListener("load", reqListener);
		oReq.onerror = () => {resolve("notFound")}; //for obs local file browser sources
		oReq.open("GET", "Resources/Texts/Character Info/" + pCharacter + ".json");
		oReq.send();

		function reqListener () {
			try {resolve(JSON.parse(oReq.responseText))}
			catch {resolve("notFound")} //for live servers
		}
	})
}

//character portrait and saga icon change
async function updateChar(pCharacter, pSkin, charID, sagaID) {
	const charEL = document.getElementById(charID);
	//change the image path depending on the character and skin
	charEL.setAttribute("src", "Resources/Characters/Stock Icons/" + pCharacter + "/" + pSkin + ".png");
	//add a listener to show the random portrait if the image fails to load
	if (startup) {charEL.addEventListener("error", () => {
		if (charEL == document.getElementById("p1Character")) {
			charEL.setAttribute("src", "Resources/Characters/Stock Icons/Random.png");
		} else {
			charEL.setAttribute("src", "Resources/Characters/Stock Icons/Random.png");
		}
	})}

	
}