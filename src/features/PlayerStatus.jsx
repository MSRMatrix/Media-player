import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { PlaylistContext } from "../context/PlaylistContext";

const PlayerStatus = () => {

  const { playlistContext } = useContext(PlaylistContext);

  const { playerState } = useContext(PlayerContext);

  if (playerState.collectingPlaylist) {
    return <div>Loading</div>;
  }

  if (playerState.mode === "test" && playlistContext[playerState.metadataIndex]?.name || playlistContext?.name) {
    return <h2>{playlistContext[playerState.metadataIndex]?.name || playlistContext?.name}</h2>;
  }

};

export default PlayerStatus;