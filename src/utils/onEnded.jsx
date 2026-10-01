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

  if (playlistContext.length <= 1) {
    setPlayerState((prev) => ({
      ...prev,
      play: false,
    }));
    return;
  }

  if (playerState.shuffle) {
    setPlayerState((prev) => ({
      ...prev,
      metadataIndex: Math.floor(Math.random() * playlistContext.length),
    }));

    return;
  }
  setPlayerState((prev) => ({
    ...prev,
    metadataIndex:
      prev.metadataIndex + 1 >= playlistContext.length ? 0 : prev + 1,
  }));
}
