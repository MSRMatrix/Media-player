import { useContext } from "react";
import Button from "../elements/Button";
import Input from "../elements/Input";
import { createPlayerButtons } from "../utils/playerButtons";
import { PlayerContext } from "../context/PlayerContext";
import { PlaylistContext } from "../context/PlaylistContext";

const PlaylistControls = ({
  playerRef,
  setPlaylistContext
}) => {
const { playerState, setPlayerState } = useContext(PlayerContext);

  const { playlistContext } = useContext(PlaylistContext);
  const changeTime = (e) => {
    const value = Number(e.target.value);

    setPlayerState((prev) => ({...prev, progress: value}))
    playerRef.current?.api?.seekTo(value, "seconds");
  };

  const playerButtons = createPlayerButtons({
    playerState, 
    setPlayerState,
    playlistContext,
    setPlaylistContext
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
            disabled={item.disabled}
            iconName={item.iconName}
          >
          </Button>
        ) : (
          <Input
            min={item.min}
            max={item.max}
            step={item.step}
            rangeValue={item.rangeValue}
            text={item.text}
            key={item.id}
            disabled={item.disabled}
            classname="button"
            onChange={item.id === "progress" ? changeTime : item.onChange}
          />
        ),
      )}
    </>
  );
};

export default PlaylistControls;
