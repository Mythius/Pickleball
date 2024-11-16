let md5 = require("md5");
class Team {
  constructor(team_name, email) {
    this.name = team_name;
    this.people_on_team = [email];
  }
}

class Pairing {
  static finder = {};
  constructor(tournament,team1, team2) {
    this.team1 = team1;
    this.team2 = team2;
    this.points = "";
    this.winner = undefined;
    this.tournament_id = tournament.id;
    if (!team1) {
      this.winner = team2;
      this.team1 = {name:'BYE'};
    }
    if (!team2) {
      this.winner = team1;
      this.team2 = {name:'BYE'};
    }
    this.id = md5(this.team1.name + this.team2.name);
    Pairing.finder[this.id] = this;
  }
}
class Tournament {
  static all = {};
  constructor(name, type = "single") {
    this.name = name;
    this.id = md5(name + new Date().toISOString());
    this.participants = [];
    this.type = type; // 'single' or 'double'
    this.bracket = [];
    this.currentRound = [];
    this.losersBracket = [];
    this.open = true;
    this.active = true;
    this.winner = undefined;
    Tournament.all[this.id] = this;
  }

  addParticipant(participant) {
    if (this.open) return this.participants.push(participant);
    return false;
  }

  // Initialize the tournament with first round pairings
  initializeBracket() {
    this.currentRound = this.createPairings(this.participants);
    this.bracket.push(this.currentRound);
    this.open = false;
  }

  // Create pairings for a given round of participants
  createPairings(participants, randomize = true) {
    let pairings = [];
    if (randomize) {
      participants = participants.sort(() => Math.random() - 0.5);
    }
    for (let i = 0; i < participants.length; i += 2) {
      if (i + 1 < participants.length) {
        pairings.push(new Pairing(this,participants[i], participants[i + 1]));
      } else {
        pairings.push(new Pairing(this,participants[i])); // Handle odd number of participants
      }
    }
    return pairings;
  }

  // Update the result of a match
  updateMatch(matchId,name_of_winner,score='') {
    let match = Pairing.finder[matchId];
    let winner = match.team1.name == name_of_winner ? match.team1 : match.team2;
    let loser = match.team1 === winner ? match.team2 : match.team1;
    match.points = score
    match.winner = winner;
    console.log('Updated Match');
    // Handle loser in double elimination
    if (this.type === "double" && match.length === 2) {
      this.losersBracket.push(loser);
    }
    this.checkRoundCompletion();
  }

  // Generate pairings for the next round
  generateNextRound() {
    let winners = this.bracket[this.bracket.length - 1].map(
      (match) => match.winner
    );
    this.currentRound = this.createPairings(winners);
    this.bracket.push(this.currentRound);

    // Handle losers bracket for double elimination
    if (this.type === "double" && this.losersBracket.length > 1) {
      let losersPairings = this.createPairings(this.losersBracket);
      this.losersBracket = [];
      this.bracket.push(losersPairings);
    }
  }

  checkRoundCompletion(){
    let finished = true;
    let size = this.currentRound.length;
    for(let pairing of this.currentRound){
      finished &= !!pairing.winner;
    }
    if(finished){
      if(size == 1){
        this.active = false;
        this.winner = this.currentRound[0].winner;
      } else {
        this.generateNextRound();
      }
    }
  }
}

exports.Tournament = Tournament;
exports.Team = Team;
exports.Pairing = Pairing;