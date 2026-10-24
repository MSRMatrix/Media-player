import { useContext, useState } from "react";
import { LocaleStorageContext } from "../context/LocaleStorageContext";
import { onDragOver, onDrop } from "../utils/dragNDrop";
import { PlaylistContext } from "../context/PlaylistContext";
import { PlayerContext } from "../context/PlayerContext";
import { listArray } from "../config/listArray";
import CreatePlaylist from "../features/CreatePlaylist";
import Button from "../elements/Button";
import Input from "../elements/Input";

const Lists = () => {
  const [dropPosition, setDropPosition] = useState(null);
  const [expandedPlaylists, setExpandedPlaylists] = useState(new Set());

  const { localeStorageContext, setLocaleStorageContext } =
    useContext(LocaleStorageContext);

  const { playlistContext, setPlaylistContext } = useContext(PlaylistContext);

  const { playerState, setPlayerState } = useContext(PlayerContext);

  const togglePlaylist = (playlistId) => {
    setExpandedPlaylists((prev) => {
      const next = new Set(prev);

      if (next.has(playlistId)) {
        next.delete(playlistId);
      } else {
        next.add(playlistId);
      }

      return next;
    });
  };

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

  return (
    <div className="playlists">
      <CreatePlaylist />

      {localeStorageContext.playlist.map((playlist) => {
        const isExpanded = expandedPlaylists.has(playlist.id);

        return (
          <div
            className="list"
            key={playlist.id}
            data-playlist-id={playlist.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) =>
              onDrop(e, setLocaleStorageContext, playlist, dropPosition)
            }
          >
            <h2>{playlist.title}</h2>

            <Button
              onClick={() => {
                if (playerState.songs.length !== playlistContext.length) {
                  const allSongIds = playlistContext.map((song) => song.id);

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
              iconName={
                playerState.songs.length === playlistContext.length
                  ? "faXmark"
                  : "faCheckDouble"
              }
            />

            {playlistIcon.map((item) => (
              <Button
                key={item.name}
                iconName={item.name}
                disabled={playerState.songs.length <= 0}
                onDragStart={(e) => item.onDragStart(e)}
                draggable={true}
              />
            ))}

            <Button
              iconName={"faHandPointer"}
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
            />

            <Button
              type={"button"}
              onClick={() => togglePlaylist(playlist.id)}
              isExpanded={isExpanded}
              iconName={
                isExpanded ? "faCircleChevronUp" : "faCircleChevronDown"
              }
            />

            <ul
              className="playlist-list"
              style={{ display: isExpanded ? "block" : "none" }}
            >
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
                      <Button
                        iconName={action.iconName}
                        key={action.iconName}
                        draggable={action.draggable}
                        onClick={() => action.onClick(playlist, song)}
                        onDragStart={(e) =>
                          action.onDragStart(e, song, playlist)
                        }
                      />
                    ))}

                    <Input
                      type={"checkbox"}
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
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Lists;
