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
import { useLocation } from "react-router-dom";

const Player = ({
  checkStatus,
  setCheckStatus,
  metadataPlaylist,
  setMetadataPlaylist,
}) => {
  const { playerMode, setPlayerMode } = useContext(PlayerModeContext);
  const { playlistContext, setPlaylistContext } = useContext(PlaylistContext);
  const { localeStorageContext, setLocaleStorageContext } =
    useContext(LocaleStorageContext);

  const location = useLocation();

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(0.2);
  const [loop, setLoop] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  // Temporäre Playlist zum Einsammeln der Metadaten
  const [metadataIndex, setMetadataIndex] = useState(0);

  const [collectingPlaylist, setCollectingPlaylist] = useState(false);

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
    setLoop(false);
  }, [collectingPlaylist, metadataPlaylist]);

  const metadataSong = metadataPlaylist[metadataIndex];

  const playerSong = collectingPlaylist
    ? metadataSong
    : !playlistContext[metadataIndex]
      ? playlistContext
      : playlistContext[metadataIndex];

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
            playlistContext,
          )
        }
        onDurationChange={(e) => {
          setDuration(e.currentTarget.duration);
        }}
        onTimeUpdate={(e) => {
          setProgress(e.currentTarget.currentTime);
        }}
        onEnded={() => {
          if (loop) {
            playerRef.current?.api?.seekTo(0, "seconds");
            return;
          }

          if (metadataPlaylist.length <= 1) {
            setPlayerMode((prev) => ({
              ...prev,
              play: false,
            }));
            return;
          }

          if (shuffle) {
            setMetadataIndex(
              Math.floor(Math.random() * metadataPlaylist.length),
            );

            return;
          }

          setMetadataIndex((prev) =>
            prev + 1 >= metadataPlaylist.length ? 0 : prev + 1,
          );
        }}
        playing={playerMode.play && !collectingPlaylist}
        loop={false}
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
        setPlaybackRate={setPlaybackRate}
        volume={volume}
        setVolume={setVolume}
        metadataIndex={metadataIndex}
        setMetadataIndex={setMetadataIndex}
        metadataPlaylist={metadataPlaylist}
        playerSong={playerSong}
        loop={loop}
        setLoop={setLoop}
        shuffle={shuffle}
        setShuffle={setShuffle}
      />

      <PlayerStatus
        collectingPlaylist={collectingPlaylist}
        playerMode={playerMode}
        playerSong={playerSong}
      />



      {playerMode.mode === "test" ? (
        <>
          <PlaylistView
            metadataPlaylist={metadataPlaylist}
            metadataIndex={metadataIndex}
            setMetadataIndex={setMetadataIndex}
            playerSong={playerSong}
          />
          Listen
          {localeStorageContext.playlist.map((playlist) => (
            <div
              key={playlist.id}
              onDragOver={(e) => {
                e.preventDefault();
                
              }}
              onDrop={(e) => {
                e.preventDefault();
              }}
            >
              <h2>{playlist.title}</h2>

              <ul>
                {playlist.songs.map((song) => (
                  <li key={song.id}>{song.name}</li>
                ))}
              </ul>
            </div>
          ))}
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
    </div>
  );
};
// Drag and Drop
export default Player;
