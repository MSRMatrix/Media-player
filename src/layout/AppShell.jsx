import { Outlet } from "react-router-dom";
import Navigation from "../components/navigation/Navigation";
import Footer from "../components/footer/Footer";
import Videoplayer from "../features/videoplayer/Videoplayer";
import { useState } from "react";

const AppShell = () => {
  const [checkStatus, setCheckStatus] = useState(false);
  return (
    <>
      <nav>
        <Navigation />
      </nav>
      <main>
        <section>
          <Videoplayer checkStatus={checkStatus} setCheckStatus={setCheckStatus} />
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
