import { Outlet } from "react-router-dom";
import Navigation from "../components/navigation/Navigation";
import Footer from "../components/footer/Footer";
import Player from "../features/Player";

const AppShell = () => {
  return (
    <>
      <nav>
        <Navigation />
      </nav>
      <main>
        <section>
          <Player />
        </section>
        <section>
          <Outlet />
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default AppShell;
