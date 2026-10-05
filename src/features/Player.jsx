import { useContext, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { PlaylistContext } from "../context/PlaylistContext";
import { LocaleStorageContext } from "../context/LocaleStorageContext";
import PlaylistControls from "./PlaylistControls";
import PlayerStatus from "./PlayerStatus";
import { handleLoadedMetadata } from "../utils/playerFunctions";
import { onEnded } from "../utils/onEnded";
import { onError } from "../utils/onError";
import { PlayerContext } from "../context/PlayerContext";
import Lists from "../pages/Lists";
import CreatePlaylist from "./CreatePlaylist";

const Player = () => {
  const { playlistContext, setPlaylistContext } = useContext(PlaylistContext);
  const { playerState, setPlayerState } = useContext(PlayerContext);
  const { localeStorageContext } = useContext(LocaleStorageContext);

  const playerRef = useRef(null);

  useEffect(() => {
    if (playerState.collectingPlaylist) return;

    if (playlistContext.length === 0) return;

    const complete = playlistContext.every((item) => item.name !== "");

    if (!complete) return;

    setPlayerState((prev) => ({
      ...prev,
      play: true,
      loop: false,
    }));
  }, [playerState.collectingPlaylist, playlistContext.metadataPlaylist]);

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
        src={
          playlistContext[playerState.metadataIndex]?.url ||
          playlistContext?.url
        }
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

      <PlaylistControls
        playerRef={playerRef}
        setPlaylistContext={setPlaylistContext}
      />

      <PlayerStatus />

      <Lists />

      <CreatePlaylist />
    </div>
  );
};
// Drag and Drop
export default Player;
