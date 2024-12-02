import NavigationBar from "../components/NavigationBar/NavigationBar";
import ScheduledGame from "../components/ScheduledGame/ScheduledGame";
import Menu from "../components/menu/menu";
import Footer from "../components/Footer/Footer";
import { useEffect, useState } from "react";

const Tournament = () => {
  let [data, setData] = useState([], <centered>Loading...</centered>);

  async function getTournamentData() {
    let tid = localStorage.tid;
    if (!tid) window.location = "my-tourneys";
    let tdata = await window.request("/tournaments/" + tid);
    if (tdata.open) {
      let players = tdata.participants.map((e) => e.name);
      setData(
        <centered>
          Players are Joining ({players.length})
          {players.map((e) => (
            <div style={{backgroundColor:'white',padding:'10px',margin:'5px',width:'80%'}}>{e}</div>
          ))}
        </centered>
      );
    }
  }

  useEffect(() => {
    getTournamentData();
  }, []);

  let games = [
    {
      time: "1:00",
      court: "Court 2",
      teams: [{ players: ["Person 1"] }, { players: ["Person 2"] }],
    },
  ];

  function getData() {
    return data;
  }

  function generateGames() {
    let rows = [];
    for (let game of games) {
      rows.push(
        <ScheduledGame
          time={game.time}
          court={game.court}
          team1={game.teams[0].players.join()}
          team2={game.teams[1].players.join()}
        />
      );
    }
    return rows;
  }

  return (
    <div>
      <div>
        <NavigationBar />
        <Menu />
        {data}
        <Footer />
      </div>
    </div>
  );
};

export default Tournament;
