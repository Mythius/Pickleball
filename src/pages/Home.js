import NavigationBar from "../components/NavigationBar/NavigationBar";
import Menu from "../components/menu/menu";
import GoogleSignIn from "../components/googleSignIn/googleSignIn";
import Footer from "../components/Footer/Footer";

const Home = () => {
  return (
    <>
      <div>
        <NavigationBar />
        <Menu />
        <GoogleSignIn />
        <Footer />
      </div>
    </>
  );
};

export default Home;
