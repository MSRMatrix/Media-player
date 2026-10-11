import { Outlet } from "react-router-dom";
import Navigation from "../components/navigation/Navigation";
import Footer from "../components/footer/Footer";
import Player from "../features/Player";
import Lists from "../pages/Lists";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeCondext";

const AppShell = () => { 
  const {theme} = useContext(ThemeContext)
  return (
    <div data-theme={theme}>
      <nav>
        <Navigation />
      </nav>
      <main>
        <section className="test">
          <div>
          <Player />
             <Outlet />
          </div>
          <Lists />
         
        </section>
        <section>
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default AppShell;
