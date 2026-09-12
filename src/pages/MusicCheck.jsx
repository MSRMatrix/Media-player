import { useContext } from "react";
import Form from "../elements/Form";
import { PlaylistContext } from "../context/PlaylistContext";
import { PlayerModeContext } from "../context/PlayerModeContext";
import { LocaleStorageContext } from "../context/LocaleStorageContext";

const MusicCheck = () => {
  const { setPlaylistContext } = useContext(PlaylistContext);
  const { playerMode, setPlayerMode } = useContext(PlayerModeContext);
  const { localeStorageContext, setLocaleStorageContext } =
    useContext(LocaleStorageContext);

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
      setPlaylistContext({
        name: "",
        url: url,
        id: 0,
      });
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
      {playerMode.mode === "test" ? (
        <div>
          {localeStorageContext.playlist.map((item) => (
            <div>
              <h2>{item.id}</h2>
              <ul>
                {item.songs.map((songs, key) => (
                  <li key={key}>{songs}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default MusicCheck;
