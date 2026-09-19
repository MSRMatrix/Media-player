import { useContext, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { PlaylistContext } from "../context/PlaylistContext";
import { PlayerModeContext } from "../context/PlayerModeContext";
import { LocaleStorageContext } from "../context/LocaleStorageContext";
import CreatePlaylist from "./CreatePlaylist";
import PlaylistControls from "./PlaylistControls";
import PlaylistView from "./PlaylistView";
import PlayerStatus from "./PlayerStatus";
import { handleLoadedMetadata } from "../utils/playerFunctions";

const Player = ({ checkStatus, setCheckStatus,  metadataPlaylist, setMetadataPlaylist}) => {
  const { playerMode, setPlayerMode } = useContext(PlayerModeContext);
  const { playlistContext, setPlaylistContext } = useContext(PlaylistContext);
  const { localeStorageContext, setLocaleStorageContext } =
    useContext(LocaleStorageContext);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setplayerbackRate] = useState(1);
  const [volume, setVolume] = useState(0.5);

  // Temporäre Playlist zum Einsammeln der Metadaten
  const [metadataIndex, setMetadataIndex] = useState(0);
  const [collectingPlaylist, setCollectingPlaylist] = useState(false);

  const currentSong = !playlistContext[metadataIndex]
    ? playlistContext
    : playlistContext[metadataIndex];

  const playerRef = useRef(null);

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

  const metadataSong = metadataPlaylist[metadataIndex];

  const playerSong = collectingPlaylist ? metadataSong : currentSong;
  useEffect(() => {
    localStorage.setItem(
      "playlist",
      JSON.stringify(localeStorageContext.playlist),
    );
  }, [localeStorageContext.playlist]);

  return (
    <div>
      <ReactPlayer
        style={{ display: !collectingPlaylist ? "" : "none" }}
        ref={playerRef}
        src={playerSong?.url}
        volume={volume}
        playbackRate={playbackRate}
        onLoadedMetadata={(e) =>
          handleLoadedMetadata(
            e,
            setPlaylistContext,
            setCheckStatus,
            collectingPlaylist,
            setMetadataPlaylist,
            metadataIndex,
            metadataPlaylist,
            setMetadataIndex,
            setCollectingPlaylist,
            setPlayerMode,
          )
        }
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

      <PlaylistControls
        playerRef={playerRef}
        progress={progress}
        setProgress={setProgress}
        duration={duration}
        setDuration={setDuration}
        playbackRate={playbackRate}
        setplayerbackRate={setplayerbackRate}
        volume={volume}
        setVolume={setVolume}
      />

      <PlayerStatus
        collectingPlaylist={collectingPlaylist}
        playerMode={playerMode}
      />

      {playerMode.mode === "test" ? (
        <PlaylistView
          metadataPlaylist={metadataPlaylist}
          setMetadataIndex={setMetadataIndex}
        />
      ) : (
        <></>
      )}

      <CreatePlaylist />
    </div>
  );
};
// Drag and Drop
export default Player;
