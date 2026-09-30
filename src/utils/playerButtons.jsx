function durationProgress(progress, duration) {
  const hours = Math.floor(progress / 3600);
  const minutes = Math.floor((progress % 3600) / 60);
  const seconds = Math.floor(progress % 60);

  const durationHours = Math.floor(duration / 3600);
  const durationMinutes = Math.floor((duration % 3600) / 60);
  const durationSeconds = Math.floor(duration % 60);

  return `Progress ${hours}:${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")} / ${durationHours}:${durationMinutes
    .toString()
    .padStart(2, "0")}:${durationSeconds.toString().padStart(2, "0")}`;
}

export const createPlayerButtons = ({
  playerSong,
    playerState, 
    setPlayerState,
    playlistContext
}) => [
  {
    element: "button",
    iconName: "faBackward",
    disabled: playlistContext.metadataPlaylist.length > 1 ? false : true,
    id: "previous",
    text: "Previous",
    onClick: () => {
      if (playerState.shuffle) {
        setPlayerState((prev) => ({...prev, metadataIndex: Math.floor(Math.random() * playlistContext.metadataPlaylist.length)}))
       return;
      }
      
      setPlayerState((prev) => ({
  ...prev,
  metadataIndex: prev.metadataIndex === 0
    ? playlistContext.metadataPlaylist.length - 1  
    : prev.metadataIndex - 1     
}))
    },
  },
  {
    element: "button",
    iconName: !playerState.play ? "faPlay" : "faPause",
    disabled: playerSong?.url ? false : true,
    id: !playerState.play ? "play" : "pause",
    text: !playerState.play ? "Play" : "Pause",
    onClick: () =>
      setPlayerState((prev) => ({
        ...prev,
        play: !prev.play,
      })),
  },
  {
    element: "button",
    iconName: "faForward",
    disabled: playlistContext.metadataPlaylist.length > 1 ? false : true,
    id: "next",
    text: "Next",
    onClick: () => {
      if (playerState.shuffle) {
        setPlayerState((prev) => ({...prev, metadataIndex: Math.floor(Math.random() * playlistContext.metadataPlaylist.length)}))
      
        return;
      }
      playlistContext.metadataPlaylist.length === playerState.metadataIndex + 1
        ? setPlayerState((prev) => ({...prev, metadataIndex: 0}))
      
        : setPlayerState((prev) => ({...prev, metadataIndex: prev.metadataIndex + 1}))
    },
  },
  {
    element: "input",
    id: "volume",
    text: "Volume",
    rangeValue: playerState.volume,
    onChange: (e) => setPlayerState((prev) => ({...prev, volume: Number(e.target.value)})),
    min: 0,
    max: 1,
    step: 0.01,
  },
  {
    element: "input",
    id: "rate",
    text: `Rate: ${playerState.playbackRate}`,
    rangeValue: playerState.playbackRate,
    onChange: (e) => setPlayerState((prev) => ({...prev, playbackRate: Number(e.target.value)})),
    min: 0,
    max: 4,
    step: 0.25,
  },
  {
    element: "button",
    iconName:
      playerState.volume > 0.8
        ? "faVolumeHigh"
        : playerState.volume > 0.3
          ? "faVolume"
          : playerState.volume > 0
            ? "faVolumeLow"
            : "faVolumeXmark",
    disabled: "",
    id: "mute",
    text: "Mute",
    onClick: () =>  setPlayerState((prev) => ({...prev, volume: prev.volume === 0 ? 0.2 : 0})),
  },
  {
    element: "input",
    id: "progress",
    disabled: !playerSong?.url ? true : false,
    text: durationProgress(playerState.progress, playerState.duration),
    rangeValue: playerState.progress,
    min: 0,
    max: playerState.duration,
    step: 0.1,
  },
  {
    element: "button",
    iconName: playerState.loop ? "faRepeat" : "faBan",
    id: "loop",
    text: "Loop",
    onClick: () => setPlayerState((prev) => ({...prev, loop: !prev.loop})),
  },
  {
    element: "button",
    iconName: playerState.shuffle ? "faShuffle" : "faLinkSlash",
    disabled: playlistContext.metadataPlaylist.length > 1 ? false : true,
    id: "shuffle",
    text: "Shuffle",
    onClick: () => setPlayerState((prev) => ({...prev, shuffle: !prev.shuffle}))
  },
];
