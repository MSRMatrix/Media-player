import { useContext } from "react";
import Form from "../elements/Form";
import { PlaylistContext } from "../context/PlaylistContext";
import { mediaInputArray } from "../config/mediaInputArray";

const MediaInput = () => {
  const { setPlaylistContext } = useContext(PlaylistContext);

  async function onSubmit(e) {
    e.preventDefault();
    const url = e.target.elements.url.value;
    try {
      setPlaylistContext({
        name: "",
        url: url,
        id: 0,
      });
    } catch (error) {
      console.log("Ungültige URL:", error);
    } finally {
      e.target.reset();
    }
  }

  return (
    <>
      <Form
        submitFunction={onSubmit}
        text="Musik überprüfen"
        id="music-check-form"
        className={""}
        formarray={mediaInputArray} 
        
       
      /> 
{/*       
      {playerMode.mode === "test" ? (
        <>
          <PlaylistView
            metadataPlaylist={metadataPlaylist}
            metadataIndex={metadataIndex}
            setMetadataIndex={setMetadataIndex}
            playerSong={playerSong}
            collectingPlaylist={collectingPlaylist}
            setMetadataPlaylist={setMetadataPlaylist}
          />
          Listen
          <SavedPlaylist />
        </>
      ) : (
        <></>
      )}

      {location.pathname === `/music-check` ||
      location.pathname === `/lists` ? (
        <CreatePlaylist />
      ) : (
        <></>
      )} */}
    </>
  );
};

export default MediaInput;
