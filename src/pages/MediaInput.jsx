import { useContext } from "react";
import Form from "../elements/Form";
import { PlaylistContext } from "../context/PlaylistContext";
import { PlayerModeContext } from "../context/PlayerModeContext";
import { LocaleStorageContext } from "../context/LocaleStorageContext";
import { mediaInputArray } from "../config/mediaInputArray";

const MediaInput = () => {
  const { setPlaylistContext } = useContext(PlaylistContext);
  const { playerMode } = useContext(PlayerModeContext);
  const { localeStorageContext } =
    useContext(LocaleStorageContext);

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
      {playerMode.mode === "test" ? (
        <div>
          {localeStorageContext.playlist.map((item) => (
            <div key={item.id}>
              <h2>{item.title}</h2>
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

export default MediaInput;
