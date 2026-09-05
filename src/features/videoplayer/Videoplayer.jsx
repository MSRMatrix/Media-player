import { useContext } from 'react';
import ReactPlayer from 'react-player'
import { PlaylistContext } from '../../context/PlaylistContext';
import { PlayerModeContext } from '../../context/PlayerModeContext';

const Videoplayer = ({ checkStatus, setCheckStatus, index }) => {
    const {PlayerMode, setPlayerMode} = useContext(PlayerModeContext);
  const { playlistContext } = useContext(PlaylistContext);
//   PlayerMode und Status zusammenlegen
// Dinge wie Loop etc einfügen

  const currentSong = playlistContext.length > 1 ? playlistContext[index] : playlistContext;
  

  return (
    <ReactPlayer
      src={currentSong?.url}
      onReady={() => {
        setCheckStatus("ready");
        console.log("Video ist bereit");
      }}
      onError={(error) => {
        setCheckStatus("error");
        console.log("Fehler:", error);
      }}
    />
  );
};

export default Videoplayer;