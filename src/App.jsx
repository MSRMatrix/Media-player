import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppShell from "./layout/AppShell";
import { useState } from "react";
import { PlaylistContext } from "./context/PlaylistContext";
import Home from "./pages/Home";
import Lists from "./pages/Lists";
import List from "./pages/List";
import ImportExport from "./pages/ImportExport";
import Tutorial from "./pages/Tutorial";
import MusicCheck from "./pages/MusicCheck";
import Youtube from "./pages/Youtube";
import NotFound from "./pages/NotFound";
import { PlayerModeContext } from "./context/PlayerModeContext";

function App() {
  const [playlistContext, setPlaylistContext] = useState([]);
const [PlayerMode, setPlayerMode] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppShell />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "lists",
          element: <Lists />,
        },
        {
          path: "lists/:id",
          element: <List />,
        },
        {
          path: "import-export",
          element: <ImportExport />,
        },
        {
          path: "tutorial",
          element: <Tutorial />,
        },
        {
          path: "music-check",
          element: <MusicCheck />,
        },
        {
          path: "youtube",
          element: <Youtube />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]); 
  return (
    <>
      <PlayerModeContext.Provider value={{PlayerMode, setPlayerMode}}>
        <PlaylistContext.Provider value={{ playlistContext, setPlaylistContext }}>
          <RouterProvider router={router} />
        </PlaylistContext.Provider>
      </PlayerModeContext.Provider>
    </>
  );
}

export default App;
