import { useContext } from "react";
import { PlaylistContext } from "../context/PlaylistContext";
import PlaylistItem from "./PlaylistItem";

const PlaylistView = ({
  metadataPlaylist,
  setMetadataIndex,
}) => {

  const { playlistContext } = useContext(PlaylistContext);

  if (metadataPlaylist.length > 1) {
    return (
      <>
        {metadataPlaylist.map((song) => (
          <PlaylistItem
            key={song.id}
            song={song}
            setMetadataIndex={setMetadataIndex}
          />
        ))}
      </>
    );
  }

  if (playlistContext) {
    return (
      <li value={playlistContext.url}>
        {playlistContext.name}
      </li>
    );
  }

  return null;
};

export default PlaylistView;