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
      .listCollections({ name: "tournaments" })
      .toArray();

    if (collections.length === 0) {
      console.log("Tournament collection does not exist. Creating it...");
      await db.createCollection("tournaments");
      console.log("Tournament collection created.");
    } else {
      console.log("Tournament collection already exists.");
    }

    let tournament_data = await db.collection('tournaments').find().toArray();
    loadTournaments(tournament_data);
  });
}

function loadTournaments(trs){
  console.log(`Loading ${trs.length} tournaments`);
  for(let t of trs){
    let nt = new Tournament(t.name,t.type);
    nt.loadData(t);
    tournaments.push(nt);
  }
}

function saveTournament(t, n = false) {
  mongo.connect(async (db) => {
    let tournament = t;
    let tournament_id = t.id;
    let tournamentCollection = db.collection('tournaments');
    const result = await tournamentCollection.updateOne(
      { _id: tournament_id }, // Use tournamentId as the unique identifier
      { $set: tournament }, // Update the tournament data
      { upsert: true } // Create a new document if one doesn't exist
    );

    if (result.upsertedCount > 0) {
      console.log("Tournament created:", tournament_id);
    } else {
      console.log("Tournament updated:", tournament_id);
    }
  });
}


function deleteTournament(tournament) {
  mongo.connect(async (db) => {
    const collection = db.collection("tournaments");
    let trns = await collection.find({name:tournament.name}).toArray();
    let id = trns?.[0]?._id;
    if(!id) return;
    const result = await collection.deleteOne({ _id: id });
    if (result.deletedCount > 0) {
      console.log("Tournament deleted:", id);
    } else {
      console.log("Tournament not found:", id);
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
  
  app.get('/results/:name',(req,res)=>{
    let games = Pairing.getPairings(req.params.name);
    res.send({games});
  })
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
    if(!verifyOwnership(req,res)) return;
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

  app.delete("/join-tournament/:id/:name", (req, res) => {
    if(!verifyOwnership(req,res)) return;
    let id = req.params.id;
    let name = req.params.name;
    let tournament = getTournamentById(id);
    if (!tournament) return;
    let n = 0;
    tournament.removeParticipant((p) => {
      let r = p.name === name;
      if(r) n++;
      return r;
    });
    res.send({message:'Success',teamsRemoved:n});
  });

  app.post("/start-tournament/:id", (req, res) => {
    if(!verifyOwnership(req,res)) return;
    let tournament = getTournamentById(req.params.id);
    if (!tournament) return;
    if (tournament.owner !== req.session.username) {
      res.status(403).send({ message: "Not Allowed" });
    }
    tournament.initializeBracket();
    res.send({ message: "Success", data: tournament.currentRound });
    saveTournament(tournament);
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

function verifyOwnership(req,res){
  let tournament = getTournamentById(req.params.id);
  if(!tournament){
    res.send({message:'Tournament not found'});
    return false;
  }

  return true; // IMPORTANT: Remove to have stricter permissions

  if(tournament.owner !== req.session.username){
    res.send({message:'Not Owner'});
    return false;
  }
  return true;
}

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
