import NavigationBar from "../components/NavigationBar/NavigationBar";
import Menu from "../components/menu/menu";
import GoogleSignIn from "../components/googleSignIn/googleSignIn";

const Home = () => {
  return (
    <>
      <div>
        <NavigationBar />
        <Menu />
        <GoogleSignIn />
      </div>
    </>
  );
};

export default Home;
