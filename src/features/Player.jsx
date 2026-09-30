import { useContext, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { PlaylistContext } from "../context/PlaylistContext";
import { LocaleStorageContext } from "../context/LocaleStorageContext";
import CreatePlaylist from "./CreatePlaylist";
import PlaylistControls from "./PlaylistControls";
import PlaylistView from "./PlaylistView";
import PlayerStatus from "./PlayerStatus";
import { handleLoadedMetadata } from "../utils/playerFunctions";
import { useLocation } from "react-router-dom";
import { onEnded } from "../utils/onEnded";
import { onError } from "../utils/onError";
import SavedPlaylist from "./SavedPlaylist";
import { PlayerContext } from "../context/PlayerContext";

const Player = () => {
  const { playlistContext, setPlaylistContext } = useContext(PlaylistContext);
  const { playerState, setPlayerState } = useContext(PlayerContext);
  const { localeStorageContext } = useContext(LocaleStorageContext);

  const location = useLocation();

  // Muss Loop und alles erstzen und playerMode löschen

  const playerRef = useRef(null);

  useEffect(() => {
    if (playerState.collectingPlaylist) return;

    if (playlistContext.metadataPlaylist.length === 0) return;

    const complete = playlistContext.metadataPlaylist.every(
      (item) => item.name !== "",
    );

    if (!complete) return;

    setPlaylistContext((prev) => ({
      ...prev,
      currentSong: prev.metadataPlaylist[0],
    }));

    setPlayerState((prev) => ({
      ...prev,
      play: true,
      loop: false,
    }));
  }, [playerState.collectingPlaylist, playlistContext.metadataPlaylist]);

  const playerSong =
  playlistContext.metadataPlaylist.length > 0
    ? playlistContext.metadataPlaylist[playerState.metadataIndex]
    : playlistContext.currentSong;

  useEffect(() => {
    localStorage.setItem(
      "playlist",
      JSON.stringify(localeStorageContext.playlist),
    );
  }, [localeStorageContext.playlist]);

  return (
    <div>
      <ReactPlayer
        style={{ display: !playerState.collectingPlaylist ? "" : "none" }}
        ref={playerRef}
        src={playerSong?.url}
        volume={playerState.volume}
        playbackRate={playerState.playbackRate}
        onWaiting={() => console.log("test")}
        onLoadedMetadata={(e) =>
          handleLoadedMetadata(
            e,
            setPlaylistContext,
            playerState,
            setPlayerState,
            playlistContext,
          )
        }
        onDurationChange={(e) => {
          const duration = e.currentTarget.duration;
          setPlayerState((prev) => ({
            ...prev,
            duration,
          }));
        }}
        onTimeUpdate={(e) => {
          const progress = e.currentTarget.currentTime;
          setPlayerState((prev) => ({ ...prev, progress: progress }));
        }}
        onEnded={() => {
          onEnded(playerRef, playerState, setPlayerState, playlistContext);
        }}
        playing={playerState.play && !playerState.collectingPlaylist}
        loop={false}
        onError={(error) => {
          onError(error);
        }}
      />

      <PlaylistControls playerRef={playerRef} playerSong={playerSong} />

      <PlayerStatus playerSong={playerSong} />

      {/* Muss in MediaInput verschoben werden */}
      {playerState.mode === "test" ? (
        <>
          <PlaylistView playerSong={playerSong} />
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
      {/* Muss in MediaInput verschoben werden */}
    </div>
  );
};
// Drag and Drop
export default Player;
