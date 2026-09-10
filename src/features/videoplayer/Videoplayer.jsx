import { useContext, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { PlaylistContext } from "../../context/PlaylistContext";
import { PlayerModeContext } from "../../context/PlayerModeContext";
import Button from "../../elements/Button";
import Input from "../../elements/Input";

const Videoplayer = ({ checkStatus, setCheckStatus }) => {
  const { playerMode, setPlayerMode } = useContext(PlayerModeContext);
  const { playlistContext } = useContext(PlaylistContext);
  const playerRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setplayerbackRate] = useState(1);

  const [videoTitle, setVideoTitle] = useState("");
  const [volume, setVolume] = useState(0.5);
  const currentSong = playlistContext;

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
      onChange: (e) => setplayerbackRate(Number(e.target.value)),
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
    <div ref={playerRef}>
      <ReactPlayer
        ref={playerRef}
        src={currentSong?.url}
        volume={volume}
        playbackRate={playbackRate}
        onReady={() => {
          const title = playerRef.current?.api?.videoTitle;
          setVideoTitle(title);
          setCheckStatus("ready");
        }}
        onDurationChange={(e) => {
          setDuration(e.currentTarget.duration);
        }}
        onTimeUpdate={(e) => {
          setProgress(e.currentTarget.currentTime);
        }}
        playing={playerMode.play}
        onError={(error) => {
          setVideoTitle("");
          setCheckStatus("error");
          console.log("Fehler:", error);
        }}
      />
      {playerButtons.map((item) =>
        item.element === "button" ? (
          <Button
            text={item.text}
            key={item.id}
            classname={"button"}
            onClick={item.onClick}
          />
        ) : item.element === "input" ? (
          <Input
            min={item.min}
            max={item.max}
            step={item.step}
            rangeValue={item.rangeValue}
            text={item.text}
            key={item.id}
            classname={"button"}
            onChange={item.id === "progress" ? changeTime : item.onChange}
          />
        ) : (
          <></>
        ),
      )}
      {playerMode.mode === "test" ? (
        <>{videoTitle && <h2>{videoTitle}</h2>}</>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Videoplayer;
