import NavigationBar from "../components/NavigationBar/NavigationBar";
import Menu from "../components/menu/menu";
import GameResult from "../components/GameResult/GameResult";
import Footer from "../components/Footer/Footer";
import { useEffect, useState } from "react";

const History = () => {
  const [historyEls, setHEs] = useState([]);

  async function getHistory() {
    let history = await window.request("/history");
    if (history.error) return;
    return [...history.games];
  }

  useEffect(() => {
    async function gh() {
      let games = await getHistory();
      let h = games.map((e) => {
        return {
          matchName: e.team1.name + " - " + e.team2.name,
          score: e.points,
          result: e.result,
        };
      });
      getHistoryElements(h);
    }
    gh();
  }, []);

  function getHistoryElements(history) {
    let divs = [];
    for (let h of history) {
      divs.push(
        <GameResult result={h.result} score={h.score} matchName={h.matchName} />
      );
    }
    setHEs(divs);
  }
  return (
    <>
      <NavigationBar />
      <Menu />
      <div className="main">{historyEls}</div>
      <Footer />
    </>
  );
};

export default History;
