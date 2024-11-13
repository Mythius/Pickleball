import NavigationBar from "../components/NavigationBar/NavigationBar";
import Menu from "../components/menu/menu";
import Footer from "../components/Footer/Footer";
import AddButton from "../components/AddButton/AddButton";
import { createPromptBox } from "../control";
import { useEffect, useState } from "react";
import Tournament from "../components/Tournament/Tournament";

const MyTourneys = () => {
  let [tournaments, uT] = useState("");

  async function addTournament() {
    let name = await createPromptBox("Enter Tournament Name");
    alert(name);
    let data = window.request("/tournament", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
    console.log(data);
  }

  useEffect(() => {
    window.request("/tournaments").then((data) => {
      uT(() => {
        return data.map((e) => <Tournament name={e.name} id={e.id} />);
      });
    });
  });

  return (
    <>
      <NavigationBar />
      <Menu />
      <div className="main">{tournaments}</div>
      <AddButton onClick={addTournament} />
      <Footer />
    </>
  );
};

export default MyTourneys;
