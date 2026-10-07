import { useContext, useState } from "react";
import { LocaleStorageContext } from "../context/LocaleStorageContext";
import { onDragOver, onDrop } from "../utils/dragNDrop";
import Icon from "../components/Icon";
import { PlaylistContext } from "../context/PlaylistContext";
import { PlayerContext } from "../context/PlayerContext";

const Lists = () => {
  const [dropPosition, setDropPosition] = useState(null);

  const {
    localeStorageContext,
    setLocaleStorageContext,
  } = useContext(LocaleStorageContext);

  const {
    playlistContext,
    setPlaylistContext,
  } = useContext(PlaylistContext);

  const {
    playerState,
    setPlayerState,
  } = useContext(PlayerContext);

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
            onDrop(
              e,
              setLocaleStorageContext,
              playlist,
              dropPosition,
            );
          }}
        >
          <h2>{playlist.title}</h2>

          {/* Ganze Playlist laden */}
          <button
            onClick={() => {
              setPlaylistContext(playlist.songs);

              setPlayerState((prev) => ({
                ...prev,
                title: playlist.title,
                metadataIndex: 0,
                mode: "",
              }));
            }}
          >
            <Icon iconName="faHandPointer" />
          </button>

          <ul>
            {playlist.songs.map((song, index) => (
              <li
                key={song.id}
                onDragOver={(e) =>
                  onDragOver(
                    e,
                    index,
                    setDropPosition,
                  )
                }
                style={{
                  backgroundColor:
                    playlistContext[
                      playerState.metadataIndex
                    ]?.id === song.id
                      ? "red"
                      : "",
                }}
              >
                {/* Song auswählen */}
                <span
                  onClick={() => {
                    setPlaylistContext(playlist.songs);

                    setPlayerState((prev) => ({
                      ...prev,
                      title: playlist.title,
                      metadataIndex: index,
                      mode: "",
                    }));
                  }}
                >
                  {song.name}
                </span>

                {/* Song löschen */}
                <button
                  onClick={() => {
                    setLocaleStorageContext((prev) => ({
                      ...prev,
                      playlist: prev.playlist.map((item) =>
                        item.id === playlist.id
                          ? {
                              ...item,
                              songs: item.songs.filter(
                                (item) =>
                                  item.id !== song.id,
                              ),
                            }
                          : item,
                      ),
                    }));
                  }}
                >
                  <Icon iconName="faTrashCan" />
                </button>

                {/* Nur dieses Icon ist draggable */}
                <button
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData(
                      "text/plain",
                      JSON.stringify({
                        song,
                        sourcePlaylistId: playlist.id,
                      }),
                    );
                  }}
                >
                  <Icon iconName="faGripLines" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default Lists;