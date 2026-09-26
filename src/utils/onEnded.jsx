export function onEnded(loop, playerRef, metadataPlaylist, setPlayerMode, shuffle, setMetadataIndex){
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
}