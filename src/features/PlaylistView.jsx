import { useContext } from "react";
import { PlaylistContext } from "../context/PlaylistContext";
import PlaylistItem from "./PlaylistItem";

const PlaylistView = ({
  metadataPlaylist,
  metadataIndex,
  setMetadataIndex,
  playerSong,
  collectingPlaylist,
  setMetadataPlaylist,
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

      {!collectingPlaylist ? (
        playlist.map((song) => (
          <PlaylistItem
            key={song.id}
            song={song}
            setMetadataIndex={setMetadataIndex}
            playerSong={playerSong}
            setMetadataPlaylist={setMetadataPlaylist}
            metadataPlaylist={metadataPlaylist}
          />
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default PlaylistView;
