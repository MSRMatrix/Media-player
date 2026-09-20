import { useContext } from "react";
import { PlayerModeContext } from "../context/PlayerModeContext";
import Button from "../elements/Button";
import Input from "../elements/Input";

const PlaylistControls = ({
  playerRef,
  progress,
  setProgress,
  duration,
  playbackRate,
  setPlaybackRate,
  volume,
  setVolume,
  metadataIndex,
setMetadataIndex,
metadataPlaylist,
}) => {
  const { playerMode, setPlayerMode } = useContext(PlayerModeContext);

  const changeTime = (e) => {
    const value = Number(e.target.value);

    setProgress(value);

    playerRef.current?.api?.seekTo(value, "seconds");
  };
  const playerButtons = [
    {
      element: "button",
      id: "previous",
      text: "Previous",
      onClick: () => metadataIndex === 0 ? setMetadataIndex(metadataPlaylist.length - 1) : setMetadataIndex(metadataIndex - 1)
        ,
    },
    {
      element: "button",
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
      id: "next",
      text: "Next",
      onClick: () => metadataPlaylist.length === metadataIndex + 1 ? setMetadataIndex(0) : setMetadataIndex(metadataIndex + 1)
        ,
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
      text: "Rate",
      rangeValue: playbackRate,
      onChange: (e) => setPlaybackRate(Number(e.target.value)),
      min: 0,
      max: 4,
      step: 0.25,
    },
    {
      element: "button",
      id: "mute",
      text: "Mute",
      onClick: () => setVolume(volume === 0 ? 0.5 : 0),
    },
    {
      element: "input",
      id: "progress",
      text: "Progress",
      rangeValue: progress,
      min: 0,
      max: duration,
      step: 0.1,
    },
    {
      element: "button",
      id: "loop",
      text: "Loop",
    },
    {
      element: "button",
      id: "shuffle",
      text: "Shuffle",
    },
  ];

  return (
    <>
      {playerButtons.map((item) =>
        item.element === "button" ? (
          <Button
            text={item.text}
            key={item.id}
            classname="button"
            onClick={item.onClick}
          />
        ) : (
          <Input
            min={item.min}
            max={item.max}
            step={item.step}
            rangeValue={item.rangeValue}
            text={item.text}
            key={item.id}
            classname="button"
            onChange={item.id === "progress" ? changeTime : item.onChange}
          />
        ),
      )}
    </>
  );
};

export default PlaylistControls;
