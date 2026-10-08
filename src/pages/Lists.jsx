import { useContext, useState } from "react";
import { LocaleStorageContext } from "../context/LocaleStorageContext";
import { onDragOver, onDrop } from "../utils/dragNDrop";
import Icon from "../components/Icon";
import { PlaylistContext } from "../context/PlaylistContext";
import { PlayerContext } from "../context/PlayerContext";
import { listArray } from "../config/listArray";

const Lists = () => {
  const [dropPosition, setDropPosition] = useState(null);

  const { localeStorageContext, setLocaleStorageContext } =
    useContext(LocaleStorageContext);

  const { playlistContext, setPlaylistContext } = useContext(PlaylistContext);

  const { playerState, setPlayerState } = useContext(PlayerContext);

  return (
    <div>
    <h2>listen</h2>
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
                onDragOver={(e) => onDragOver(e, index, setDropPosition)}
                style={{
                  backgroundColor:
                    playlistContext[playerState.metadataIndex]?.id === song.id
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
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Lists;
