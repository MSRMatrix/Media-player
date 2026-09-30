export function onEnded(
  playerRef,
  playerState,
  setPlayerState,
  playlistContext
) {
  if (playerState.loop) {
    playerRef.current?.api?.seekTo(0, "seconds");
    return;
  }

  if (playlistContext.metadataPlaylist.length <= 1) {
    setPlayerState((prev) => ({
      ...prev,
      play: false,
    }));
    return;
  }

  if (playerState.shuffle) {
    setPlayerState((prev) => ({
      ...prev,
      metadataIndex: Math.floor(Math.random() * playlistContext.metadataPlaylist.length),
    }));

    return;
  }
  setPlayerState((prev) => ({
    ...prev,
    metadataIndex:
      prev.metadataIndex + 1 >= playlistContext.metadataPlaylist.length ? 0 : prev + 1,
  }));
}
