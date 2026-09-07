import { useContext } from "react";
import Form from "../elements/Form";
import { PlaylistContext } from "../context/PlaylistContext";
import { PlayerModeContext } from "../context/PlayerModeContext";

const MusicCheck = () => {
  const { setPlaylistContext } = useContext(PlaylistContext);
  const { setPlayerMode } = useContext(PlayerModeContext);

  const formarray = [
    {
      id: 1,
      element: "label",
      text: "Test Song",
    },
    {
      id: 2,
      element: "input",
      type: "url",
      name: "url",
      placeholder: "Musik-URL",
    },
  ];

  async function onSubmit(e) {
    e.preventDefault();

    const url = e.target.elements.url.value;

    try {
      const urlObject = new URL(url);
      const playlistId = urlObject.searchParams.get("list");

      // Playlist
      // if (playlistId) {
      //   console.log("Playlist erkannt:", playlistId);
      // }

      // Einzelnes Video

      setTimeout(() => {
        setPlayerMode((prev) => ({
        ...prev,
        play: true,
        mode: "test",
      }));
      }, 50);
      

      setPlaylistContext({
        name: "",
        url: url,
        id: 0,
      });
      // Array klammern um den context für spätere List Ideen
    } catch (error) {
      console.log("Ungültige URL:", error);
    }
  }

  return (
    <>
      <Form
        submitFunction={onSubmit}
        text="Musik überprüfen"
        id="music-check-form"
        className={""}
        formarray={formarray}
      />
    </>
  );
};

export default MusicCheck;
