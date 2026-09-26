import { useContext } from "react";
import { LocaleStorageContext } from "../context/LocaleStorageContext";

const Lists = () => {
  const { localeStorageContext, setLocaleStorageContext } =
    useContext(LocaleStorageContext);

  return (
    <>
      {localeStorageContext.playlist.map((playlist) => (
        <div
          key={playlist.id}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            e.preventDefault();

            const song = JSON.parse(e.dataTransfer.getData("text/plain"));
            setLocaleStorageContext((prev) => ({
              ...prev,
              playlist: prev.playlist.map((item) =>
                item.id === playlist.id
                  ? {
                      ...item,
                      songs: [
                        ...item.songs,
                        {
                          ...song,
                          id: crypto.randomUUID(),
                        },
                      ],
                    }
                  : item,
              ),
            }));
          }}
        >
          <h2>{playlist.title}</h2>

          <ul>
            {playlist.songs.map((song) => (
              <li key={song.id}>{song.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default Lists;
