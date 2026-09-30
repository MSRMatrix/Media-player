import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const PlayerStatus = ({
  playerSong
}) => {


  const { playerState } = useContext(PlayerContext);

  if (playerState.collectingPlaylist) {
    return <div>Loading</div>;
  }

  if (playerState.mode === "test" && playerSong.name) {
    return <h2>{playerSong.name}</h2>;
  }

};

export default PlayerStatus;