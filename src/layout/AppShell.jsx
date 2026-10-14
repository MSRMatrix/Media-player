import { Outlet } from "react-router-dom";
import Navigation from "../components/navigation/Navigation";
import Footer from "../components/footer/Footer";
import Player from "../features/Player";
import Lists from "../pages/Lists";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeCondext";
import Statusbar from "../components/tablet/Statusbar";
import Camera from "../components/tablet/Camera";
import Frame from "../components/tablet/Frame";
import Screen from "../components/tablet/Screen";

const AppShell = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div data-theme={theme}>
      <Frame>
      <Statusbar>
        <Camera />
      </Statusbar>
      
        <Screen>
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
          </main>
        
        <footer>
          <Footer />
        </footer>
        </Screen>
      </Frame>
    </div>
  );
};

export default AppShell;
