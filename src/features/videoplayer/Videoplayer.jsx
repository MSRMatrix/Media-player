import { useContext, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { PlaylistContext } from "../../context/PlaylistContext";
import { PlayerModeContext } from "../../context/PlayerModeContext";
import Button from "../../elements/Button";
import Input from "../../elements/Input";
import Icon from "../../components/Icon";
import Form from "../../elements/Form";
import { LocaleStorageContext } from "../../context/LocaleStorageContext";

const Videoplayer = ({ checkStatus, setCheckStatus }) => {
  const { playerMode, setPlayerMode } = useContext(PlayerModeContext);
  const { playlistContext, setPlaylistContext } = useContext(PlaylistContext);
  const { localeStorageContext, setLocaleStorageContext } =
    useContext(LocaleStorageContext);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setplayerbackRate] = useState(1);

  const [volume, setVolume] = useState(0.5);

  // Temporäre Playlist zum Einsammeln der Metadaten
  const [metadataPlaylist, setMetadataPlaylist] = useState([]);
  const [metadataIndex, setMetadataIndex] = useState(0);
  const [collectingPlaylist, setCollectingPlaylist] = useState(false);

  const currentSong =  !playlistContext[metadataIndex] ? playlistContext : playlistContext[metadataIndex];

  const playerRef = useRef(null);

  const changeTime = (e) => {
    const value = Number(e.target.value);

    setProgress(value);

    playerRef.current?.api?.seekTo(value, "seconds");
  };

  const playerButtons = [
    {
      element: "button",
      id: "previous",
      text: "Previous",
    },
    {
      element: "button",
      id: !playerMode.play ? "play" : "pause",
      text: !playerMode.play ? "Play" : "Pause",
      onClick: () =>
        setPlayerMode((prev) => ({
          ...prev,
          play: !prev.play,
        })),
    },
    {
      element: "button",
      id: "next",
      text: "Next",
    },
    {
      element: "input",
      id: "volume",
      text: "Volume",
      rangeValue: volume,
      onChange: (e) => setVolume(Number(e.target.value)),
      min: 0,
      max: 1,
      step: 0.01,
    },
    {
      element: "input",
      id: "rate",
      text: "Rate",
      rangeValue: playbackRate,
      onChange: (e) => setplayerbackRate(Number(e.target.value)),
      min: 0,
      max: 4,
      step: 0.25,
    },
    {
      element: "button",
      id: "mute",
      text: "Mute",
      onClick: () => setVolume(volume === 0 ? 0.5 : 0),
    },
    {
      element: "input",
      id: "progress",
      text: "Progress",
      rangeValue: progress,
      min: 0,
      max: duration,
      step: 0.1,
    },
    {
      element: "button",
      id: "loop",
      text: "Loop",
    },
    {
      element: "button",
      id: "shuffle",
      text: "Shuffle",
    },
  ];

  /*
   * Startet das Einsammeln der Playlist.
   *
   * Aus den YouTube-IDs wird zuerst eine temporäre
   * Playlist mit vollständigen URLs erstellt.
   */
  const startPlaylistCollection = (playlist) => {
    const newPlaylist = playlist.map((videoId, index) => ({
      name: "",
      url: `https://www.youtube.com/watch?v=${videoId}`,
      id: index,
    }));

    setMetadataPlaylist(newPlaylist);
    setMetadataIndex(0);
    setCollectingPlaylist(true);

    setPlayerMode((prev) => ({
      ...prev,
      play: false,
    }));
  };

  /*
   * Wird ausgeführt, sobald ReactPlayer die Metadaten
   * des aktuell geladenen Videos besitzt.
   */
  const handleLoadedMetadata = (e) => {
    const api = e.srcElement.api;

    const title = api?.videoTitle || "";
    
setPlaylistContext((prev) => ({
  ...prev,
  name: title,
}));
    setCheckStatus("ready");

    if (collectingPlaylist) {
      setMetadataPlaylist((prev) =>
        prev.map((item, index) =>
          index === metadataIndex
            ? {
                ...item,
                name: title,
              }
            : item,
        ),
      );

      if (metadataIndex < metadataPlaylist.length - 1) {
        setTimeout(() => {
          setMetadataIndex((prev) => prev + 1);
        }, 200);
      } else {
        setCollectingPlaylist(false);
        setMetadataIndex(0);
      }

      return;
    }

    setPlayerMode((prev) => ({
      ...prev,
      mode: "test",
    }));

    const playlist = api.playerInfo?.playlist;

    if (!playlist) {
      setPlayerMode((prev) => ({
        ...prev,
        play: true,
      }));

      return;
    }

    const question = confirm("Do you want to copy the whole playlist?");

    if (!question) {
      setPlayerMode((prev) => ({
        ...prev,
        play: true,
      }));

      return;
    }

    startPlaylistCollection(playlist);
  };




  useEffect(() => {
    if (collectingPlaylist) return;

    if (metadataPlaylist.length === 0) return;

    const complete = metadataPlaylist.every((item) => item.name !== "");

    if (!complete) return;

    setPlaylistContext(metadataPlaylist);

    setPlayerMode((prev) => ({
      ...prev,
      play: true,
    }));
  }, [collectingPlaylist, metadataPlaylist]);

  /*
   * Während des Einsammelns kommt der Song
   * aus metadataPlaylist.
   *
   * Danach kommt er wieder aus playlistContext.
   */
  const metadataSong = metadataPlaylist[metadataIndex];

  const playerSong = collectingPlaylist ? metadataSong : currentSong;

  const formarray = [
    {
      id: 1,
      element: "label",
      text: "Create-new-list",
    },
    {
      id: 2,
      element: "input",
      type: "text",
      placeholder: "New list",
    },
  ];

  useEffect(() => {
    localStorage.setItem(
      "playlist",
      JSON.stringify(localeStorageContext.playlist),
    );
  }, [localeStorageContext.playlist]);

  function onSubmit(e) {
    e.preventDefault();

    const value = e.target.elements[2].value.trim();

    const findPlaylist = localeStorageContext.playlist.find(
      (item) => item.title === value,
    );

    if (findPlaylist) {
      alert("Playlist already exists");
      return;
    }

    const newPlaylist = {
      id: crypto.randomUUID(),
      title: value,
      songs: [],
    };

    setLocaleStorageContext((prev) => ({
      ...prev,
      playlist: [...prev.playlist, newPlaylist],
    }));
  }

  
  
  return (
    <div>
      <ReactPlayer
        style={{ display: !collectingPlaylist ? "" : "none" }}
        ref={playerRef}
        src={playerSong?.url}
        volume={volume}
        playbackRate={playbackRate}
        onLoadedMetadata={handleLoadedMetadata}
        onDurationChange={(e) => {
          setDuration(e.currentTarget.duration);
        }}
        onTimeUpdate={(e) => {
          setProgress(e.currentTarget.currentTime);
        }}
        playing={playerMode.play && !collectingPlaylist}
        onError={(error) => {
          setCheckStatus("error");
          console.log("Fehler:", error);
        }}
      />

      {!collectingPlaylist ? <></> : "Loading"}

      {playerButtons.map((item) =>
        item.element === "button" ? (
          <Button
            text={item.text}
            key={item.id}
            classname="button"
            onClick={item.onClick}
          />
        ) : item.element === "input" ? (
          <Input
            min={item.min}
            max={item.max}
            step={item.step}
            rangeValue={item.rangeValue}
            text={item.text}
            key={item.id}
            classname="button"
            onChange={item.id === "progress" ? changeTime : item.onChange}
          />
        ) : null,
      )}

      {playerMode.mode === "test" && !collectingPlaylist ? (
        <>{playlistContext.name && <h2>{playlistContext.name}</h2>}</>
      ) : (
        "Loading"
      )}
      {metadataPlaylist.length > 1 ? (
        metadataPlaylist.map((song) => (
          <>
            <li
              onClick={() => setMetadataIndex(song.id)}
              key={song.id}
              value={song.url}
            >
              {song.name}
            </li>

            <>
              <Icon iconName={"faHandPointer"} />
              <Icon iconName={"faTrashCan"} />
              <Icon iconName={"faGripLinesVertical"} />
            </>
          </>
        ))
      ) : playlistContext ? (
        <li value={playlistContext.url}>{playlistContext.name}</li>
      ) : (
        <></>
      )}
      <div>
        <Form
          submitFunction={onSubmit}
          text="Create new list"
          id="Create-new-list"
          className={""}
          formarray={formarray}
        />
      </div>
    </div>
  );
};
// Drag and Drop
export default Videoplayer;
