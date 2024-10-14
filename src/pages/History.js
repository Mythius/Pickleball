import NavigationBar from "../components/NavigationBar/NavigationBar";
import Menu from "../components/menu/menu";
import GameResult from "../components/GameResult/GameResult";

const History = () => {
  let history = [
    { matchNum: 1, result: "Loss", score: "11 - 6" },
    { matchNum: 2, result: "Win", score: "8 - 11" },
];
  function getHistory() {
    let divs = [];
    for (let h of history) {
      divs.push(
        <GameResult result={h.result} score={h.score} matchNum={h.matchNum} />
      );
    }
    return divs;
  }
  return (
    <>
      <NavigationBar />
      <Menu />
      <div className="main">{getHistory()}</div>
    </>
  );
};

export default History;
