let md5 = require('md5');
class Team{
  constructor(team_name,email){
    this.name = team_name;
    this.people_on_team = [email];
  }
}

class Tournament {
  constructor(name, type = 'single') {
    this.name = name;
    this.id = md5(name+new Date().toISOString());
    this.participants = [];
    this.type = type; // 'single' or 'double'
    this.bracket = [];
    this.currentRound = [];
    this.losersBracket = [];
    this.open = true;
  }

  addParticipant(participant){
    if(this.open) return this.participants.push(participant);
    return false;
  }

  // Initialize the tournament with first round pairings
  initializeBracket() {
    this.currentRound = this.createPairings(this.participants);
    this.bracket.push(this.currentRound);
    this.open = false;
  }

  // Create pairings for a given round of participants
  createPairings(participants,randomize=true) {
    let pairings = [];
    if(randomize){
      participants = participants.sort(()=>Math.random()-.5);
    }
    for (let i = 0; i < participants.length; i += 2) {
      if (i + 1 < participants.length) {
        pairings.push([participants[i], participants[i + 1]]);
        pairings.at(-1).id = md5(participants[i]+participants[i+1]);
      } else {
        pairings.push([participants[i]]); // Handle odd number of participants
        pairings.at(-1).id = md5(participants[i]+'BYE');
      }
    }
    return pairings;
  }

  // Update the result of a match
  updateMatch(roundIndex, matchIndex, winner) {
    let match = this.bracket[roundIndex][matchIndex];
    match.winner = winner;

    // Handle loser in double elimination
    if (this.type === 'double' && match.length === 2) {
      let loser = match[0] === winner ? match[1] : match[0];
      this.losersBracket.push(loser);
    }
  }

  // Generate pairings for the next round
  generateNextRound() {
    let winners = this.bracket[this.bracket.length - 1].map(match => match.winner);
    this.currentRound = this.createPairings(winners);
    this.bracket.push(this.currentRound);

    // Handle losers bracket for double elimination
    if (this.type === 'double' && this.losersBracket.length > 1) {
      let losersPairings = this.createPairings(this.losersBracket);
      this.losersBracket = [];
      this.bracket.push(losersPairings);
    }
  }
}

exports.Tournament = Tournament;
exports.Team = Team;