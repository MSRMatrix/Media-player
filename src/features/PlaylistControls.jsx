import { useContext } from "react";
import { PlayerModeContext } from "../context/PlayerModeContext";
import Button from "../elements/Button";
import Input from "../elements/Input";
import { createPlayerButtons } from "../utils/playerButtons";

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
  
  const playerButtons = createPlayerButtons({
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
  });

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
