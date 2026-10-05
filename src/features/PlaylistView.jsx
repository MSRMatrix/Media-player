import { useContext } from "react";
import { PlaylistContext } from "../context/PlaylistContext";
import PlaylistItem from "./PlaylistItem";
import { PlayerContext } from "../context/PlayerContext";
import Icon from "../components/Icon";

const PlaylistView = () => {
  const { playerState, setPlayerState } = useContext(PlayerContext);
  const { playlistContext } = useContext(PlaylistContext);

  const playlistIcon = [
    {
      name: "faHandPointer",
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

  const playlist = playlistContext.length > 0 ? playlistContext : [];

  if (playlist.length === 0) {
    return null;
  }

  return (
    <>
      {playlist.length > 1 && (
        <div>
          {playerState.metadataIndex + 1}/{playlist.length}
        </div>
      )}

      {playlistIcon.map((item) => (
        <button
          key={item.name}
          draggable
          onDragStart={(e) => item.onDragStart(e)}
        >
          <Icon iconName={item.name} />
        </button>
      ))}

     {playlistContext.length > 1 ?( <button
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
        {playerState.songs.length === playlistContext.length
          ? "Uncheck all"
          : "Check all"}
      </button>) : <></>}

      {!playerState.collectingPlaylist ? (
        playlist.map((song, index) => (
          <PlaylistItem key={song.id} song={song} index={index} />
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default PlaylistView;
