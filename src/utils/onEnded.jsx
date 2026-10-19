
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

  if (!playlistContext || playlistContext.length <= 1) {
    setPlayerState((prev) => ({
      ...prev,
      play: false,
    }));
    return;
  }

  if (playerState.shuffle) {
    setPlayerState((prev) => {
      let nextIndex;

      do {
        nextIndex = Math.floor(
          Math.random() * playlistContext.length
        );
      } while (nextIndex === prev.metadataIndex);

      return {
        ...prev,
        metadataIndex: nextIndex,
      };
    });

    return;
  }

  setPlayerState((prev) => ({
    ...prev,
    metadataIndex:
      (prev.metadataIndex + 1) % playlistContext.length,
  }));
}
