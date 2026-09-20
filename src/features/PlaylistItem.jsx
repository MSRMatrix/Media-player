import Icon from "../components/Icon";

const PlaylistItem = ({ song, setMetadataIndex, playerSong }) => {
  return (
    <>
      <li
        onClick={() => setMetadataIndex(song.id)}
        value={song.url}
        style={{background: playerSong.url === song.url ? "red" : ""}}
      >
        {song.name}
      </li>

      <Icon iconName="faHandPointer" />
      <Icon iconName="faTrashCan" />
      <Icon iconName="faGripLinesVertical" />
    </>
  );
};

export default PlaylistItem;