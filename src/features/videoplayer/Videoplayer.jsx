import { useContext, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { PlaylistContext } from "../../context/PlaylistContext";
import { PlayerModeContext } from "../../context/PlayerModeContext";
import Button from "../../elements/Button";
import Input from "../../elements/Input";

const Videoplayer = ({ checkStatus, setCheckStatus }) => {
  const { playerMode, setPlayerMode } = useContext(PlayerModeContext);
  const { playlistContext } = useContext(PlaylistContext);
  //   PlayerMode und Status zusammenlegen
  // Dinge wie Loop etc einfügen
  const [videoTitle, setVideoTitle] = useState("");
  const [volume, setVolume] = useState(0.5)
  const currentSong = playlistContext;

  const playerButtons = [
    {
      element: "button",
      id: "previous",
      text: "Previous",
    },
    {
      element: "button",
      id: !playerMode.play ? "play" : "pause",
      text: !playerMode.play ?"Play" : "Pause",
      onClick: () =>
  setPlayerMode((prev) => ({
    ...prev,
    play: !prev.play,
  }))
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
    },
    {
      element: "button",
      id: "mute",
      text: "Mute",
      onClick: () => setVolume(volume === 0 ? 0.5 : 0)
    },
    {
      element: "input",
      id: "progress",
      text: "Progress",
      // onChange: "",
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
  console.log(playerMode.play);
  
  const playerRef = useRef(null);
console.log(playerMode);

  return (
    <div ref={playerRef}>
      <ReactPlayer
        ref={playerRef}
        src={currentSong?.url}
        volume={volume}
        onReady={() => {
          const title = playerRef.current?.api?.videoTitle;
          setVideoTitle(title);
          setCheckStatus("ready");
        }}

        playing={playerMode.play}
        onError={(error) => {
          setVideoTitle("");
          setCheckStatus("error");
          console.log("Fehler:", error);
        }}
      />
      {playerButtons.map((item) => (
        item.element === "button" ? (<Button text={item.text} key={item.id} classname={"button"} onClick={item.onClick} />)
        : item.element === "input" ? (<Input rangeValue={item.rangeValue} text={item.text} key={item.id} classname={"button"} onChange={item.onChange} />)
        : <></>
        
      ))}
      {playerMode.mode === "test" ? (
        <>{videoTitle && <h2>{videoTitle}</h2>}</>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Videoplayer;
