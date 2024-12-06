import NavigationBar from "../components/NavigationBar/NavigationBar";
import Menu from "../components/menu/menu";
import GameResult from "../components/GameResult/GameResult";
import Footer from "../components/Footer/Footer";
import { useEffect, useState } from "react";

const History = () => {
  const [history, setHistory] = useState([]);
  const [historyEls, setHEs] = useState([]);

  async function getHistory() {
    let history = await window.request("/history");
    return [...history.games];
  }

  useEffect(() => {
    async function gh() {
      let games = await getHistory();
      if (games.error) return;
      let h = games.map((e) => {
        return {
          matchName: e.team1.name + " - " + e.team2.name,
          score: e.score,
          result: e.result,
        };
      });
      setHistory(h);
      getHistoryElements();
    }
    gh();
  }, []);

  function getHistoryElements() {
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
