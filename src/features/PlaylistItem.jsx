import { useContext } from "react";
import { PlaylistContext } from "../context/PlaylistContext";
import { PlayerContext } from "../context/PlayerContext";
import Button from "../elements/Button";

const PlaylistItem = ({ song, index }) => {
  const { playlistContext, setPlaylistContext } = useContext(PlaylistContext);
  const { playerState, setPlayerState } = useContext(PlayerContext);
  const playlistIcon = [
    {
      name: "faTrashCan",
      onClick: () => {
        const removedSong = playlistContext.find((item) => item.id === song.id);

        console.log("Entfernt:", removedSong);

        const updatedPlaylist = playlistContext.filter(
          (item) => item.id !== song.id,
        );

        setPlaylistContext(updatedPlaylist);

        setPlayerState((prev) => ({
          ...prev,
          metadataIndex: 0,
        }));

        if (updatedPlaylist.length < 1) {
          setPlaylistContext([]);
          setPlayerState({
            mode: "",
            play: false,
          });
        }
      },
    },
  ];
  
  return (
   
<div
  className="song-item"
  draggable
  data-index={index}
  data-url={song.url}
  onDragStart={(e) => {
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({
        song,
        sourcePlaylistId: null,
      }),
    );
  }}
  onClick={() =>
    setPlayerState((prev) => ({
      ...prev,
      metadataIndex: song.id,
    }))
  }
  style={{
    backgroundColor:
      playlistContext[playerState.metadataIndex]?.id === song.id
        ? "color-mix(in srgb, var(--primary) 18%, var(--surface))"
        : "",
    borderColor:
      playlistContext[playerState.metadataIndex]?.id === song.id
        ? "var(--primary)"
        : "transparent",
  }}
>
  <span className="song-name">{song.name}</span>

  <div className="song-actions">
    {playlistIcon.map((item) => (
      <Button
        key={item.name}
        classname=""
        onClick={item.onClick}
        disabled={false}
        iconName={item.name}
      />
    ))}

    {playlistContext.length > 1 && (
      <input
        type="checkbox"
        checked={playerState.songs.includes(song.id)}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          if (e.target.checked) {
            setPlayerState((prev) => ({
              ...prev,
              songs: [...prev.songs, song.id],
            }));
          } else {
            setPlayerState((prev) => ({
              ...prev,
              songs: prev.songs.filter((id) => id !== song.id),
            }));
          }
        }}
      />
    )}
  </div>
</div>
  );
};

export default PlaylistItem;
