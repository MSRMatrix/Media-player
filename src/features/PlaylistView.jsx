import { useContext } from "react";
import { PlaylistContext } from "../context/PlaylistContext";
import PlaylistItem from "./PlaylistItem";

const PlaylistView = ({
  metadataPlaylist,
  metadataIndex,
  setMetadataIndex,
  playerSong,
}) => {
  const { playlistContext } = useContext(PlaylistContext);

  const playlist =
    metadataPlaylist.length > 0
      ? metadataPlaylist
      : playlistContext
        ? [playlistContext]
        : [];

  if (playlist.length === 0) {
    return null;
  }

  return (
    <>
      {playlist.length > 1 && (
        <div>
          {metadataIndex + 1}/{playlist.length}
        </div>
      )}

      {playlist.map((song) => (
        <PlaylistItem
          key={song.id}
          song={song}
          setMetadataIndex={setMetadataIndex}
          playerSong={playerSong}
        />
      ))}
    </>
  );
};

export default PlaylistView;