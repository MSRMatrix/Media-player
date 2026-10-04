import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppShell from "./layout/AppShell";
import { useState } from "react";
import { PlaylistContext } from "./context/PlaylistContext";
import Home from "./pages/Home";
import Lists from "./pages/Lists";
import List from "./pages/List";
import Tutorial from "./pages/Tutorial";
import Youtube from "./pages/Youtube";
import NotFound from "./pages/NotFound";
import { LocaleStorageContext } from "./context/LocaleStorageContext";
import MediaInput from "./pages/MediaInput";
import { PlayerContext } from "./context/PlayerContext";
import Settings from "./pages/Settings";
import ImportExport from "./pages/settings/ImportExport";
import Device from "./pages/settings/Device";

function App() {
  const [playlistContext, setPlaylistContext] = useState([]);

  const [playerState, setPlayerState] = useState({
    mode: "",
    play: false,
    progress: 0,
    duration: 0,
    playbackRate: 1,
    volume: 0.2,
    loop: false,
    shuffle: false,
    metadataIndex: 0,
    collectingPlaylist: false,
    title: "",
    songs: [],
  });

  const [localeStorageContext, setLocaleStorageContext] = useState(() => {
    const savedPlaylist = localStorage.getItem("playlist");

    if (savedPlaylist) {
      return {
        playlist: JSON.parse(savedPlaylist),
      };
    }

    const initialPlaylist = [
      {
        id: crypto.randomUUID(),
        title: "Neue Playlist",
        songs: [],
      },
    ];

    localStorage.setItem("playlist", JSON.stringify(initialPlaylist));

    return {
      playlist: initialPlaylist,
    };
  });

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
          path: "settings",
          element: <Settings />,
          children: [
            {
              path: "import-export",
              element: <ImportExport />,
            },
            {
              path: "device",
              element: <Device />,
            },
          ],
        },

        {
          path: "tutorial",
          element: <Tutorial />,
        },
        {
          path: "media-input",
          element: <MediaInput />,
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
      <PlayerContext.Provider value={{ playerState, setPlayerState }}>
        <LocaleStorageContext.Provider
          value={{ localeStorageContext, setLocaleStorageContext }}
        >
          <PlaylistContext.Provider
            value={{ playlistContext, setPlaylistContext }}
          >
            <RouterProvider router={router} />
          </PlaylistContext.Provider>
        </LocaleStorageContext.Provider>
      </PlayerContext.Provider>
    </>
  );
}

export default App;
