import { useContext } from "react";
import { PlaylistContext } from "../context/PlaylistContext";
import { PlayerContext } from "../context/PlayerContext";
import Button from "../elements/Button";

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
        onClick={() =>
          setPlayerState((prev) => ({
            ...prev,
            metadataIndex: song.id,
          }))
        }
        data-url={song.url}
        value={song.url}
        style={{
          background:
            playlistContext[playerState.metadataIndex].url === song.url ||
            playlistContext.url === song.url
              ? "red"
              : "",
        }}
      >
        {song.name}
      </li>

      {playlistIcon.map((item) => (
        <Button
          classname={""}
          onClick={item.onClick}
          disabled={false}
          iconName={item.name}
        />
      ))}

      {playlistContext.length > 1 ? (
        <input
          type="checkbox"
          checked={playerState.songs.includes(song.id)}
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
      ) : (
        <></>
      )}
    </>
  );
};

export default PlaylistItem;
