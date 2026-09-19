import { Outlet } from "react-router-dom";
import Navigation from "../components/navigation/Navigation";
import Footer from "../components/footer/Footer";
import { useState } from "react";
import Player from "../features/Player";

const AppShell = () => {
  const [checkStatus, setCheckStatus] = useState(false);
  const [metadataPlaylist, setMetadataPlaylist] = useState([]);
  return (
    <>
      <nav>
        <Navigation setMetadataPlaylist={setMetadataPlaylist}/>
      </nav>
      <main>
        <section>
          <Player checkStatus={checkStatus} setCheckStatus={setCheckStatus} metadataPlaylist={metadataPlaylist} setMetadataPlaylist={setMetadataPlaylist}  />
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
