import { useContext } from "react";
import Icon from "../components/Icon";
import { PlaylistContext } from "../context/PlaylistContext";
import { PlayerContext } from "../context/PlayerContext";

const PlaylistItem = ({ song, index }) => {
  const { playlistContext, setPlaylistContext } = useContext(PlaylistContext);
    const { playerState, setPlayerState } = useContext(PlayerContext);
  const playlistIcon = [
    // {
    //   name: "faHandPointer",
    //   onClick: () => {
    //     console.log("klick");
    //   },
    // },
    {
      name: "faTrashCan",
      onClick: () => {
  const removedSong = playlistContext.find(
    (item) => item.id === song.id
  );

  console.log("Entfernt:", removedSong);

  const updatedPlaylist = playlistContext.filter(
    (item) => item.id !== song.id
  );

  setPlaylistContext(updatedPlaylist)

  setPlayerState((prev) => ({
  ...prev,             
  metadataIndex: 0      
}));

  if(updatedPlaylist.length < 1){
    setPlaylistContext([])
    setPlayerState({
    mode: "",
    play: false,
  })
  }
}
    },
  ];
  
  return (
    <>
      <li
        draggable
        data-index={index}
        onDragStart={(e) => {
  e.dataTransfer.setData(
    "text/plain",
    JSON.stringify({
      song,
      sourcePlaylistId: null,
    }),
  );
}}
        onClick={() => setPlayerState((prev) => ({
  ...prev,             
  metadataIndex: song.id   
}))}
        data-url={song.url}
        value={song.url}
        style={{ background: playlistContext[playerState.metadataIndex].url === song.url || playlistContext.url === song.url ? "red" : "" }}
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
