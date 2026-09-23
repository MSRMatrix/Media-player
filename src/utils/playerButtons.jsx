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
  metadataIndex,
  metadataPlaylist,
  setMetadataIndex,
  playerMode,
  setPlayerMode,
  volume,
  setVolume,
  playbackRate,
  setPlaybackRate,
  progress,
  duration,
  playerSong,
  loop,
  setLoop,
}) => [
  {
    element: "button",
    iconName: "faBackward",
    disabled: metadataPlaylist.length > 1 ? false : true,
    id: "previous",
    text: "Previous",
    onClick: () =>
      metadataIndex === 0
        ? setMetadataIndex(metadataPlaylist.length - 1)
        : setMetadataIndex(metadataIndex - 1),
  },
  {
    element: "button",
    iconName: !playerMode.play ? "faPlay" : "faPause",
    disabled: playerSong.url ? false : true,
    id: !playerMode.play ? "play" : "pause",
    text: !playerMode.play ? "Play" : "Pause",
    onClick: () =>
      setPlayerMode((prev) => ({
        ...prev,
        play: !prev.play,
      })),
  },
  {
    element: "button",
    iconName: "faForward",
    disabled: metadataPlaylist.length > 1 ? false : true,
    id: "next",
    text: "Next",
    onClick: () =>
      metadataPlaylist.length === metadataIndex + 1
        ? setMetadataIndex(0)
        : setMetadataIndex(metadataIndex + 1),
  },
  {
    element: "input",
    id: "volume",
    text: "Volume",
    rangeValue: volume,
    onChange: (e) => setVolume(Number(e.target.value)),
    min: 0,
    max: 1,
    step: 0.01,
  },
  {
    element: "input",
    id: "rate",
    text: `Rate: ${playbackRate}`,
    rangeValue: playbackRate,
    onChange: (e) => setPlaybackRate(Number(e.target.value)),
    min: 0,
    max: 4,
    step: 0.25,
  },
  {
    element: "button",
    iconName:
      volume > 0.8
        ? "faVolumeHigh"
        : volume > 0.3
          ? "faVolume"
          : volume > 0
            ? "faVolumeLow"
            : "faVolumeXmark",
    disabled: "",
    id: "mute",
    text: "Mute",
    onClick: () => setVolume(volume === 0 ? 0.2 : 0),
  },
  {
    element: "input",
    id: "progress",
    disabled: !playerSong.url ? true : false,
    text: durationProgress(progress, duration),
    rangeValue: progress,
    min: 0,
    max: duration,
    step: 0.1,
  },
  {
    element: "button",
    iconName: loop ? "faRepeat" : "faBan",
    id: "loop",
    text: "Loop",
    onClick: () => setLoop(!loop),
  },
  {
    element: "button",
    iconName: "faShuffle",
    disabled: metadataPlaylist.length > 1 ? false : true,
    id: "shuffle",
    text: "Shuffle",
  },
];
