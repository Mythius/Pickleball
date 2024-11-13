// const db = require('./db.js');
const md5 = require("md5");
const { Tournament, Team } = require("./tournament");

let tournaments = [];

function getTournamentById(id,res){
  for(let t of tournaments){
    if(t.id == id) return t;
  }
  res.status(404).send({message:'Tournament not found'});
  return false;
}

// Example usage
// let participants = ['Alice', 'Bob', 'Charlie', 'Dave', 'Eve', 'Frank','Person 2','Person 3','Person 4'];
// let tournament = new Tournament(participants, 'single');
// tournament.initializeBracket();
// console.log('First round:', tournament.currentRound);

// tournament.updateMatch(0, 0, 'Alice');
// tournament.updateMatch(0, 1, 'Charlie');
// tournament.updateMatch(0, 2, 'Eve');
// tournament.updateMatch(0, 3, 'Person 2');
// tournament.updateMatch(0, 4, 'Person 4');

// tournament.generateNextRound();
// console.log('Next round:', tournament.currentRound);
// console.log(JSON.stringify(tournament));

exports.public = function (app) {
  app.get("/hello", (req, res) => {
    res.json({ message: "Hello World" });
  });

  app.get('/tournaments',(req,res)=>{
    let data = tournaments.map(e=>{
      return {
        name: e.name,
        id: e.id
      }
    })
    res.json(data);
  });

  app.get('/tournaments/:id',(req,res)=>{
    res.send(getTournamentById(req.params.id))
  });

  app.get('/current-round/:id',(req,res)=>{
    let t = getTournamentById(req.params.id);
    if(!t) return;
    req.send({message:'Success',data:tournament.currentRound});
  });
};

exports.private = function (app) {

  app.get('/profile',(req,res)=>{
    res.send({src:req.session.google_data.picture})
  });
  // Create a new tournament
  app.post("/tournament", (req, res) => {
    let data = req.body;
    let name = req.body.name;
    let nt = new Tournament(name,data.type?data.type:'single');
    nt.owner = req.session.username;
    tournaments.push(nt);
    res.send({message:'Success',id:nt.id});
  });

  app.post('/join-tournament/:id/:name',(req,res)=>{
    let id = req.params.id;
    let name = req.params.name;
    let tournament = getTournamentById(id);
    if(!tournament) return;
    let t = new Team(name,req.session.username);
    let j = tournament.addParticipant(t);
    res.send({message:j?'Success':'Couldn\'t Join'})
  });

  app.post('/start-tournament/:id',(req,res)=>{
    let tournament = getTournamentById(req.params.id);
    if(!tournament) return;
    if(tournament.owner !== req.session.username){
      res.status(403).send({message:'Not Allowed'});
    }
    tournament.initializeBracket();
    res.send({message:'Success',data:tournament.currentRound});
  });
};

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
