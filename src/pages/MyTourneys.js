import NavigationBar from "../components/NavigationBar/NavigationBar";
import Menu from "../components/menu/menu";
import Footer from "../components/Footer/Footer";
import AddButton from "../components/AddButton/AddButton";

const MyTourneys = () => {

  function addTournament(){
    
  }

  return (
    <>
      <NavigationBar />
      <Menu />
      <div className="main">Hi </div>
      <AddButton onClick={addTournament} />
      <Footer />
    </>
  );
};

export default MyTourneys;
