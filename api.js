// const db = require('./db.js');
const md5 = require("md5");
const { Tournament, Team, Pairing } = require("./tournament");
const mongo = require("./mongo");

let tournaments = [];

function getTournamentById(id) {
  for (let t of tournaments) {
    if (t.id == id) return t;
  }
  res.status(404).send({ message: "Tournament not found" });
  return false;
}

function checkAndCreateTournamentCollection() {
  mongo.connect(async (db) => {
    const collections = await db
      .listCollections({ name: "tournament" })
      .toArray();

    if (collections.length === 0) {
      console.log("Tournament collection does not exist. Creating it...");
      await db.createCollection("tournament");
      console.log("Tournament collection created.");
    } else {
      console.log("Tournament collection already exists.");
    }
  });
}

function saveTournament(t, n = false) {
  mongo.connect(async (db) => {
    let tournament = t;
    let tournament_id = t.id;
    const result = await collection.updateOne(
      { _id: tournamentId }, // Use tournamentId as the unique identifier
      { $set: tournamentData }, // Update the tournament data
      { upsert: true } // Create a new document if one doesn't exist
    );

    if (result.upsertedCount > 0) {
      console.log("Tournament created:", result.upsertedId._id);
    } else {
      console.log("Tournament updated:", tournamentId);
    }
  });
}

function deleteTournament(tournament) {
  mongo.connect(async (db) => {
    const collection = db.collection("tournament");
    const result = await collection.deleteOne({ _id: tournamentId });
    if (result.deletedCount > 0) {
      console.log("Tournament deleted:", tournamentId);
    } else {
      console.log("Tournament not found:", tournamentId);
    }
  });
}

exports.public = function (app) {
  app.get("/hello", (req, res) => {
    res.json({ message: "Hello World" });
  });

  app.get("/tournaments", (req, res) => {
    let data = tournaments.map((e) => {
      return {
        name: e.name,
        id: e.id,
      };
    });
    res.json(data);
  });

  app.get("/tournaments/:id", (req, res) => {
    if (!(req.params.id in Tournament.all)) {
      res.send({ message: "Tournament Not Found" });
      return;
    }
    res.send(getTournamentById(req.params.id));
  });

  app.get("/current-round/:id", (req, res) => {
    let t = getTournamentById(req.params.id);
    if (!t) return;
    req.send({ message: "Success", data: tournament.currentRound });
  });
};

exports.private = function (app) {
  app.get("/profile", (req, res) => {
    res.send({ src: req.session.google_data.picture });
  });
  // Create a new tournament
  app.post("/tournament", (req, res) => {
    let data = req.body;
    let name = req.body.name;
    let nt = new Tournament(name, data.type ? data.type : "single");
    nt.owner = req.session.username;
    tournaments.push(nt);
    res.send({ message: "Success", id: nt.id });
    saveTournament(nt);
  });

  app.delete("/tournament/:id", (req, res) => {
    let t = tournaments.filter((e) => e.id == req.params.id)?.[0];
    let ix = tournaments.indexOf(t);
    if (ix != -1) {
      tournaments.splice(ix, 1);
      res.send({ message: "Success" });
    } else {
      res.send({ message: "Tournament not found" });
    }
    deleteTournament(t);
  });

  app.post("/join-tournament/:id/:name", (req, res) => {
    let id = req.params.id;
    let name = req.params.name;
    let tournament = getTournamentById(id);
    if (!tournament) return;
    let t = new Team(name, req.session.username);
    let j = tournament.addParticipant(t);
    res.send({ message: j ? "Success" : "Couldn't Join" });
  });

  app.post("/start-tournament/:id", (req, res) => {
    let tournament = getTournamentById(req.params.id);
    if (!tournament) return;
    if (tournament.owner !== req.session.username) {
      res.status(403).send({ message: "Not Allowed" });
    }
    tournament.initializeBracket();
    res.send({ message: "Success", data: tournament.currentRound });
    saveTournament(t);
  });
  app.post("/matchResults/:matchId", (req, res) => {
    let id = req.params.matchId;
    let body = req.body;
    if (!(id in Pairing.finder)) {
      res.send({ message: "Match not Found" });
      return;
    }
    let pairing = Pairing.finder[id];
    if (
      pairing.team1.name == body.winner ||
      pairing.team2.name == body.winner
    ) {
      let t = Tournament.all[pairing.tournament_id];
      t.updateMatch(id, body.winner, body.score);
      res.send({ message: "Success" });
    } else {
      res.send({
        message: "Not Updated",
        detail: `${body.winner} is not in match ${id}`,
      });
    }
    saveTournament(t);
  });
};


checkAndCreateTournamentCollection();

let data = {};

/* session.google_data

{
  iss: 'https://accounts.google.com',
  azp: '1016767921529-7km6ac8h3cud3256dqjqha6neiufn2om.apps.googleusercontent.com',
  aud: '1016767921529-7km6ac8h3cud3256dqjqha6neiufn2om.apps.googleusercontent.com',
  sub: '103589682456946370010',
  email: 'southwickmatthias@gmail.com',
  email_verified: true,
  nbf: 1723080904,
  name: 'Matthias Southwick',
  picture: 'https://lh3.googleusercontent.com/a/ACg8ocLjdsGc7uC2mmthGuvrPpmV2AFT2U_EdiXxon8tX5QwbR7m8VYkeA=s96-c',
  given_name: 'Matthias',
  family_name: 'Southwick',
  iat: 1723081204,
  exp: 1723084804,
  jti: 'ad27c4b889a0eb48b6ce4cf6690fca739892ca88'
}

*/
