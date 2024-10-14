import NavigationBar from "../components/NavigationBar/NavigationBar";
import ScheduledGame from "../components/ScheduledGame/ScheduledGame";
import Menu from "../components/menu/menu";
import Footer from "../components/Footer/Footer";

const Tournament = () => {
  let games = [
    {
      time: "1:00",
      court: "Court 2",
      teams: [{ players: ["Person 1"] }, { players: ["Person 2"] }],
    },
  ];

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
        {generateGames()}
        <Footer />
      </div>
    </div>
  );
};

export default Tournament;
