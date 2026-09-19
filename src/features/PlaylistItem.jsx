import Icon from "../components/Icon";

const PlaylistItem = ({ song, setMetadataIndex }) => {
  return (
    <>
      <li
        onClick={() => setMetadataIndex(song.id)}
        value={song.url}
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