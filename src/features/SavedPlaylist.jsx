import { useContext, useState } from "react";
import { LocaleStorageContext } from "../context/LocaleStorageContext";
import { onDragOver, onDrop } from "../utils/dragNDrop";
import Icon from "../components/Icon";

// onDrop muss abgeändert werden

const SavedPlaylist = () => {
  const [dropPosition, setDropPosition] = useState(null);

  const { localeStorageContext, setLocaleStorageContext } =
    useContext(LocaleStorageContext);
  return (
    <>
      {localeStorageContext.playlist.map((playlist) => (
        <div
          key={playlist.id}
          data-playlist-id={playlist.id}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            onDrop(e, setLocaleStorageContext, playlist, dropPosition);
          }}
        >
          <h2>{playlist.title}</h2>

          <ul>
            {playlist.songs.map((song, index) => (
              <li   draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData(
                      "text/plain",
                      JSON.stringify({
                        song,
                        sourcePlaylistId: playlist.id,
                      }),
                    );
                  }} key={song.id}>
                <span onDragOver={(e) => onDragOver(e, index, setDropPosition)}>
                  {song.name}
                </span>

                <button
                  onClick={() => {
                    console.log("Abspielen:", song);
                  }}
                >
                  <Icon iconName="faHandPointer" />
                </button>

                <button
                  onClick={() => {
                    setLocaleStorageContext((prev) => ({
                      ...prev,
                      playlist: prev.playlist.map((item) =>
                        item.id === playlist.id
                          ? {
                              ...item,
                              songs: item.songs.filter(
                                (item) => item.id !== song.id,
                              ),
                            }
                          : item,
                      ),
                    }));
                  }}
                >
                  <Icon iconName="faTrashCan" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default SavedPlaylist;
