import { useContext } from "react";
import { PlaylistContext } from "../context/PlaylistContext";
import PlaylistItem from "./PlaylistItem";
import { PlayerContext } from "../context/PlayerContext";
import Button from "../elements/Button";

const PlaylistView = () => {
  const { playerState, setPlayerState } = useContext(PlayerContext);
  const { playlistContext } = useContext(PlaylistContext);

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

  const playlist = playlistContext.length > 0 ? playlistContext : [];

  function onClick() {
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
  }

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
        <Button
          classname=""
          onDragStart={(e) => item.onDragStart(e)}
          draggable={true}
          key={item.name}
          disabled={playerState.songs.length <= 0}
          iconName={item.name}
        />
      ))}

      {playlistContext.length > 1 ? (
        <Button
          onClick={onClick}
          iconName={
            playerState.songs.length === playlistContext.length
              ? "faXmark"
              : "faCheckDouble"
          }
        />
      ) : (
        <></>
      )}

      <div className="list">
        {!playerState.collectingPlaylist ? (
          playlist.map((song, index) => (
            <PlaylistItem key={song.id} song={song} index={index} />
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default PlaylistView;
