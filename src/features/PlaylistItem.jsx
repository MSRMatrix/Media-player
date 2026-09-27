import { useContext } from "react";
import Icon from "../components/Icon";
import { PlaylistContext } from "../context/PlaylistContext";
import { PlayerModeContext } from "../context/PlayerModeContext";

const PlaylistItem = ({ song, setMetadataIndex, playerSong, setMetadataPlaylist, metadataPlaylist, index }) => {
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
  const removedSong = metadataPlaylist.find(
    (item) => item.id === song.id
  );

  console.log("Entfernt:", removedSong);

  const updatedPlaylist = metadataPlaylist.filter(
    (item) => item.id !== song.id
  );

  setMetadataPlaylist(updatedPlaylist);

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
        data-index={index}
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
