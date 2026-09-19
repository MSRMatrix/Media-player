import { useContext } from "react";
import { PlaylistContext } from "../context/PlaylistContext";

const PlayerStatus = ({
  collectingPlaylist,
  playerMode,
}) => {

  const { playlistContext } = useContext(PlaylistContext);

  if (collectingPlaylist) {
    return <div>Loading</div>;
  }

  if (playerMode.mode === "test" && playlistContext.name) {
    return <h2>{playlistContext.name}</h2>;
  }

  return <div>Loading</div>;
};

export default PlayerStatus;