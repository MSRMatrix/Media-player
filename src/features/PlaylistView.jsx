import { useContext } from "react";
import { PlaylistContext } from "../context/PlaylistContext";
import PlaylistItem from "./PlaylistItem";
import { PlayerContext } from "../context/PlayerContext";

const PlaylistView = ({
  playerSong,
}) => {

    const { playerState } = useContext(PlayerContext);
  const { playlistContext } = useContext(PlaylistContext);

  const playlist =
  playlistContext.metadataPlaylist.length > 0
    ? playlistContext.metadataPlaylist
    : playlistContext.length > 0
      ? playlistContext
      : [];
      
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

      {!playerState.collectingPlaylist ? (
        playlist.map((song, index) => (
          <PlaylistItem
            key={song.id}
            song={song}
            playerSong={playerSong}
            index={index}
          />
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default PlaylistView;
