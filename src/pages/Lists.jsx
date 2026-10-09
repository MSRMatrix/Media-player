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

  return (
    <div>
      <CreatePlaylist />
      {localeStorageContext.playlist.map((playlist) => (
        <div
          className="list"
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
              <div key={song.id}>
                <li
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
                        : "",
                  }}
                >
                  <span>{song.name}</span>
                </li>

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
              </div>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Lists;
