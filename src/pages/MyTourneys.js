import NavigationBar from "../components/NavigationBar/NavigationBar";
import Menu from "../components/menu/menu";
import Footer from "../components/Footer/Footer";
import AddButton from "../components/AddButton/AddButton";
import { createPromptBox } from "../control";
import { useEffect, useState } from "react";
import Tournament from "../components/Tournament/Tournament";
import {useSocket} from '../SocketContext';

const MyTourneys = () => {
  const [tournaments, setTournaments] = useState([]); // Set initial state to an array
  
  const {updatedAt} = useSocket();

  localStorage.setItem('tid','');
  localStorage.setItem('tname','');

  // Function to fetch tournaments from the API
  async function fetchTournaments() {
    try {
      const response = await window.request("/tournaments");
      if (response && Array.isArray(response)) {
        setTournaments(response); // Assuming the response is an array
      } else {
        console.error("Failed to load tournaments:", response);
      }
    } catch (error) {
      console.error("Error fetching tournaments:", error);
    }
  }

  // Function to handle adding a tournament
  async function addTournament() {
    try {
      // Prompt for the tournament name
      let name = await createPromptBox("Enter Tournament Name");

      if (!name) return;

      // Make the POST request to add the tournament
      let response = await window.request("/tournament", {
        method: "POST",
        body: JSON.stringify({ name }),
      });

      fetchTournaments();
    } catch (error) {
      console.error("Error adding tournament:", error);
    }
  }

  // Fetch tournaments when the component mounts
  useEffect(() => {
    fetchTournaments();
  }, [updatedAt]); // Empty dependency array to only run once when the component mounts

  return (
    <>
      <NavigationBar />
      <Menu />
      <div className="main">
        {tournaments.length > 0 ? (
          tournaments.map((e) => (
            <Tournament key={e.id} name={e.name} id={e.id} />
          ))
        ) : (
          <p>No tournaments available.</p>
        )}
      </div>
      <AddButton onClick={addTournament} />
      <Footer />
    </>
  );
};

export default MyTourneys;
