import { useContext } from "react";
import Icon from "../components/Icon";
import { PlaylistContext } from "../context/PlaylistContext";
import { PlayerModeContext } from "../context/PlayerModeContext";

const PlaylistItem = ({ song, setMetadataIndex, playerSong, setMetadataPlaylist, metadataPlaylist }) => {
  const { setPlaylistContext } = useContext(PlaylistContext);
  const { setPlayerMode } = useContext(PlayerModeContext);
  const playlistIcon = [
    {
      name: "faHandPointer",
      onClick: () => {
        console.log("klick");
      },
    },
    {
      name: "faTrashCan",
      onClick: () => {
        console.log(metadataPlaylist);
  const removedSong = metadataPlaylist.find(
    (item) => item.id === song.id
  );

  console.log("Entfernt:", removedSong);
  // Das Removen vom letzten Lied muss dann auch den Reactplayer sagen dass es nichtsmehr gibt und gestoppt werden

  const updatedPlaylist = metadataPlaylist.filter(
    (item) => item.id !== song.id
  );

  setMetadataPlaylist(updatedPlaylist);
  console.log(updatedPlaylist);
  
  setMetadataIndex(0);
  if(updatedPlaylist.length < 1){
    setPlaylistContext([]);
    setMetadataPlaylist([])
    setPlayerMode({
    mode: "",
    play: false,
  })
  }
}
    },
    {
      name: "faGripLinesVertical",
      onClick: () => {
        console.log(`Grab`);
      },
    },
  ];
  return (
    <>
      <li
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData("text/plain", JSON.stringify(song));
        }}
        onClick={() => setMetadataIndex(song.id)}
        data-url={song.url}
        value={song.url}
        style={{ background: playerSong.url === song.url ? "red" : "" }}
      >
        {song.name}
      </li>

      {playlistIcon.map((item) => (
        <button onClick={() => item.onClick()}>
          <Icon iconName={item.name} />
        </button>
      ))}
    </>
  );
};

export default PlaylistItem;
