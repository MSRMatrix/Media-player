import { useContext, useRef, useState } from 'react';
import ReactPlayer from 'react-player'
import { PlaylistContext } from '../../context/PlaylistContext';
import { PlayerModeContext } from '../../context/PlayerModeContext';
import Button from '../../elements/Button';

const Videoplayer = ({ checkStatus, setCheckStatus }) => {
    const {playerMode} = useContext(PlayerModeContext);
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
console.log(playerMode);
const playerRef = useRef()

// console.log(playerRef.current.api.videoTitle);


// console.log(videoTitle);
// async function einfügen um dann verspätet den title einzufügen

  return (
  
  <>
    <ReactPlayer
      src={currentSong?.url}
      onReady={() => {
        const title = playerRef.current?.api?.videoTitle;
console.log(title);

    setVideoTitle(title || "N/A");
        setCheckStatus("ready");
        console.log("Video ist bereit");
      }}
      onError={(error) => {
        setCheckStatus("error");
        console.log("Fehler:", error);
      }}
      ref={playerRef}
    />
    {playerButtons.map((item) => 
      <Button text={item.text} key={item.id} classname={"button"}/>
    )}
   {playerMode === "test" ? (
  <>
    {videoTitle && (
      <h2>{videoTitle}</h2>
    )}
  </>
) : (
  <></>
)}
    </>
  );
};

export default Videoplayer;