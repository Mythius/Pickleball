import NavigationBar from "../components/NavigationBar/NavigationBar";
import ScheduledGame from "../components/ScheduledGame/ScheduledGame";
import Menu from "../components/menu/menu";
import Footer from "../components/Footer/Footer";
import { useEffect, useState } from "react";
import AddButton from "../components/AddButton/AddButton";
import Share from "../components/Share/Share";
import { createPromptBox } from "../control";
import { useSocket } from "../SocketContext";

const Tournament = () => {
  let [data, setData] = useState([], <centered>Loading...</centered>);
  let [started, setStarted] = useState([], false);
  let [share, setShare] = useState([], false);

  const {updatedAt} = useSocket();

  async function getTournamentData() {
    let params = new URLSearchParams(window.location.search)
    let tid = localStorage.tid || params.get('id');
    let tname = localStorage.tname || params.get('tname');
    localStorage.setItem('tid',tid);
    localStorage.setItem('tid',tid);
    if (!tid) window.location = "my-tourneys";
    let tdata = await window.request("/tournaments/" + tid);
    setStarted(!tdata.open);
    if (tdata.open) {
      let players = tdata.participants.map((e) => e.name);
      setData(
        <centered>
          Players are Joining ({players.length})
          {players.map((e) => (
            <div
              style={{
                backgroundColor: "white",
                padding: "10px",
                margin: "5px",
                width: "80%",
              }}
            >
              {e}
            </div>
          ))}
        </centered>
      );
    } else {
      let i = 0;
      games = tdata.currentRound.map((e) => {
        return {
          id: e.id,
          round: 1,
          court: `Game ${++i}`,
          winner: e.winner,
          teams: [{ players: [e.team1.name] }, { players: [e.team2.name] }],
        };
      });
      setData(generateGames());
    }
  }

  async function startTournament() {
    setShare(false);
    let msg = await window.request("/start-tournament/" + localStorage.tid, {
      method: "POST",
    });
    getTournamentData();
    console.log(msg);
  }

  useEffect(() => {
    setShare(false);
    getTournamentData();
  }, [updatedAt]);

  let games;

  async function updateMatch(m) {
    let winner = await createPromptBox(
      "Which team won?",
      "",
      m.teams.map((e) => e.players[0])
    );
    let score = await createPromptBox("Enter Match Score (optional)");
    let data = { winner, score };
    let resp = await window.request("/matchResults/" + m.id, {
      method: "POST",
      body: JSON.stringify(data),
    });
    console.log(resp);
  }

  function generateGames() {
    let rows = [];
    for (let game of games) {
      rows.push(
        <ScheduledGame
          round={game.round}
          court={game.court}
          team1={game.teams[0].players.join()}
          team2={game.teams[1].players.join()}
          winner={game.winner?.name ?? ''}
          clickCallback={() => {
            updateMatch(game);
          }}
        />
      );
    }
    return rows;
  }

  function toggleShare() {
    setShare(!share);
  }

  return (
    <div>
      <div>
        <NavigationBar />
        <Menu />
        <main style={{ position: "absolute", top: "80px", width: "100%" }}>
          {data}
        </main>
        {started ? "" : <AddButton onClick={startTournament} symbol="►" />}
        {started ? (
          ""
        ) : (
          <AddButton
            transform="translateY(-120%)"
            onClick={toggleShare}
            symbol="share"
          />
        )}
        {share ? <Share url={window.location.href} /> : ""}
        <Footer />
      </div>
    </div>
  );
};

export default Tournament;
