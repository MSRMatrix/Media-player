export const handleLoadedMetadata = (
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
  playlistContext
) => {

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
  const videoId = api.videoId;
  console.log(playlistContext);
  // Lied aus playlist ziehen

  setPlaylistContext((prev) => ({
    ...prev,
    url: `https://www.youtube.com/watch?v=${videoId}`,
    name: title,
  }));

  setPlayerMode((prev) => ({
    ...prev,
    play: true,
  }));

  return;
}

  startPlaylistCollection(
    playlist,
    setMetadataPlaylist,
    setMetadataIndex,
    setCollectingPlaylist,
    setPlayerMode,
  );
};

const startPlaylistCollection = (
  playlist,
  setMetadataPlaylist,
  setMetadataIndex,
  setCollectingPlaylist,
  setPlayerMode,
) => {
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
