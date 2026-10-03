import { useContext } from "react";
import { PlaylistContext } from "../context/PlaylistContext";
import PlaylistItem from "./PlaylistItem";
import { PlayerContext } from "../context/PlayerContext";
import Icon from "../components/Icon";

const PlaylistView = () => {

    const { playerState } = useContext(PlayerContext);
  const { playlistContext } = useContext(PlaylistContext);

   const playlistIcon = [
  {
    name: "faHandPointer",
    onDragStart: (e) => {
      e.dataTransfer.setData(
        "text/plain",
        JSON.stringify({
          playlist: playlistContext,
        })
      );
    },
  },
];

  const playlist =
  playlistContext.length > 0
      ? playlistContext
      : [];
      
  if (playlist.length === 0) {
    return null;
  }

  return (
    <>
      {playlist.length > 1 && (
        <div>
          {playerState.metadataIndex + 1}/{playlist.length}
        </div>
      )}

     {playlistIcon.map((item) => (
  <button
    key={item.name}
    draggable
    onDragStart={(e) => item.onDragStart(e)}
  >
    <Icon iconName={item.name} />
  </button>
))}

      {!playerState.collectingPlaylist ? (
        playlist.map((song, index) => (
          <PlaylistItem
            key={song.id}
            song={song}
            index={index}
          />
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default PlaylistView;
