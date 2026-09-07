import { useContext, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { PlaylistContext } from "../../context/PlaylistContext";
import { PlayerModeContext } from "../../context/PlayerModeContext";
import Button from "../../elements/Button";

const Videoplayer = ({ checkStatus, setCheckStatus }) => {
  const { playerMode } = useContext(PlayerModeContext);
  const { playlistContext } = useContext(PlaylistContext);
  //   PlayerMode und Status zusammenlegen
  // Dinge wie Loop etc einfügen
  const [videoTitle, setVideoTitle] = useState("");
  const currentSong = playlistContext;

  const playerButtons = [
    {
      id: "previous",
      text: "Previous",
    },
    {
      id: "play",
      text: "Play",
    },
    {
      id: "pause",
      text: "Pause",
    },
    {
      id: "next",
      text: "Next",
    },
    {
      id: "volume",
      text: "Volume",
    },
    {
      id: "mute",
      text: "Mute",
    },
    {
      id: "progress",
      text: "Progress",
    },
    {
      id: "fullscreen",
      text: "Fullscreen",
    },
    {
      id: "loop",
      text: "Loop",
    },
    {
      id: "shuffle",
      text: "Shuffle",
    },
  ];
  const playerRef = useRef(null);
console.log(videoTitle);

  return (
    <div ref={playerRef}>
      <ReactPlayer
        ref={playerRef}
        src={currentSong?.url}
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
        <Button text={item.text} key={item.id} classname={"button"} />
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
