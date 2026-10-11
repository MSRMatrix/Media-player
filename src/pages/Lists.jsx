import { useContext, useState } from "react";
import { LocaleStorageContext } from "../context/LocaleStorageContext";
import { onDragOver, onDrop } from "../utils/dragNDrop";
import Icon from "../components/Icon";
import { PlaylistContext } from "../context/PlaylistContext";
import { PlayerContext } from "../context/PlayerContext";
import { listArray } from "../config/listArray";
import CreatePlaylist from "../features/CreatePlaylist";

const Lists = () => {
  const [dropPosition, setDropPosition] = useState(null);

  const { localeStorageContext, setLocaleStorageContext } =
    useContext(LocaleStorageContext);

  const { playlistContext, setPlaylistContext } = useContext(PlaylistContext);

  const { playerState, setPlayerState } = useContext(PlayerContext);

  const playlistIcon = [
    {
      name: "faHandBackFist",
      onDragStart: (e) => {
        const selectedSongs = playlistContext.filter((song) =>
          playerState.songs.includes(song.id),
        );

        e.dataTransfer.setData(
          "text/plain",
          JSON.stringify({
            playlist: selectedSongs,
          }),
        );
      },
    },
  ];

  // Größe der Lieder anpassen, einen Scrollbalken einfügen und die Listen eine einheiltlichen Größe geben

  return (
    <div className="playlists">
      <CreatePlaylist />

      {localeStorageContext.playlist.map((playlist) => (
        <div
          className="list"
          key={playlist.id}
          data-playlist-id={playlist.id}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) =>
            onDrop(e, setLocaleStorageContext, playlist, dropPosition)
          }
        >
          <h2>
            {playlist.title}
            {/* <button onClick={() => true/false}>
            <Icon iconName={"faCircleChevronUp" : "faCircleChevronDown"}/>  
            </button> */}
          </h2>

          {playlistContext.length > 1 ? (
            <button
              disabled={playerState.title !== playlist.title}
              onClick={() => {
                if (playerState.songs.length !== playlistContext.length) {
                  const allSongIds = playlistContext
                    .map((song) => song.id)
                    .sort(
                      (a, b) =>
                        playlistContext.findIndex((song) => song.id === a) -
                        playlistContext.findIndex((song) => song.id === b),
                    );

                  setPlayerState((prev) => ({
                    ...prev,
                    songs: allSongIds,
                  }));
                } else {
                  setPlayerState((prev) => ({
                    ...prev,
                    songs: [],
                  }));
                }
              }}
            >
              <Icon
                iconName={
                  playerState.songs.length === playlistContext.length
                    ? "faXmark"
                    : "faCheckDouble"
                }
              />
            </button>
          ) : (
            <></>
          )}

          {playlistIcon.map((item) => (
            <button
              key={item.name}
              draggable
              disabled={playerState.songs.length <= 0}
              onDragStart={(e) => item.onDragStart(e)}
            >
              <Icon iconName={item.name} />
            </button>
          ))}
          {/* Ganze Playlist laden */}

          <button
            disabled={playlist.songs.length <= 0}
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

          <ul className="playlist-list">
            {playlist.songs.map((song, index) => (
              <li
                key={song.id}
                className="song-item"
                onClick={() => {
                  setPlaylistContext(playlist.songs);

                  setPlayerState((prev) => ({
                    ...prev,
                    title: playlist.title,
                    metadataIndex: index,
                    mode: "",
                  }));
                }}
                onDragOver={(e) => onDragOver(e, index, setDropPosition)}
                style={{
                  backgroundColor:
                    playlistContext[playerState.metadataIndex]?.id === song.id
                      ? "color-mix(in srgb, var(--primary) 18%, var(--surface))"
                      : "",
                  borderColor:
                    playlistContext[playerState.metadataIndex]?.id === song.id
                      ? "var(--primary)"
                      : "transparent",
                }}
              >
                <span className="song-name">{song.name}</span>

                <div
                  className="song-actions"
                  onClick={(e) => e.stopPropagation()}
                >
                  {listArray({ setLocaleStorageContext }).map((action) => (
                    <button
                      key={action.iconName}
                      draggable={action.draggable}
                      onClick={() => action.onClick(playlist, song)}
                      onDragStart={(e) => action.onDragStart(e, song, playlist)}
                    >
                      <Icon iconName={action.iconName} />
                    </button>
                  ))}

                  {playlistContext.length > 1 && (
                    <input
                      type="checkbox"
                      checked={playerState.songs.includes(song.id)}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPlayerState((prev) => ({
                            ...prev,
                            songs: [...prev.songs, song.id],
                          }));
                        } else {
                          setPlayerState((prev) => ({
                            ...prev,
                            songs: prev.songs.filter((id) => id !== song.id),
                          }));
                        }
                      }}
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Lists;
