import { useContext } from "react";
import Form from "../elements/Form";
import { PlaylistContext } from "../context/PlaylistContext";
import { mediaInputArray } from "../config/mediaInputArray";
import { useLocation } from "react-router-dom";
import PlaylistView from "../features/PlaylistView";
import { PlayerContext } from "../context/PlayerContext";
import SavedPlaylist from "../features/SavedPlaylist";
import CreatePlaylist from "../features/CreatePlaylist";

const MediaInput = () => {
  const { setPlaylistContext } = useContext(PlaylistContext);
  const { playerState, setPlayerState } = useContext(PlayerContext);

  const location = useLocation();

  async function onSubmit(e) {
    e.preventDefault();
    const url = e.target.elements.url.value;
    try {
      setPlaylistContext(() => ({
          name: "",
          url: url,
          id: 0,
      }));
      setPlayerState((prev) => ({...prev, songs: []}))
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
      {playerState.mode === "test" ? (
        <>
          <PlaylistView />
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
      )}

    </>
  );
};

export default MediaInput;
