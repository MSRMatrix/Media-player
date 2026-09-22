const PlayerStatus = ({
  collectingPlaylist,
  playerMode,
  playerSong
}) => {

  if (collectingPlaylist) {
    return <div>Loading</div>;
  }

  if (playerMode.mode === "test" && playerSong.name) {
    return <h2>{playerSong.name}</h2>;
  }

  return <div>Loading</div>;
};

export default PlayerStatus;