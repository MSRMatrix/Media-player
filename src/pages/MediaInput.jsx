import { useContext } from "react";
import Form from "../elements/Form";
import { PlaylistContext } from "../context/PlaylistContext";
import { PlayerModeContext } from "../context/PlayerModeContext";
import { mediaInputArray } from "../config/mediaInputArray";

const MediaInput = () => {
  const { setPlaylistContext } = useContext(PlaylistContext);
  const { playerMode } = useContext(PlayerModeContext);

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
    </>
  );
};

export default MediaInput;
