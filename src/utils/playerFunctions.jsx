export const handleLoadedMetadata = (
  e,
  setPlaylistContext,
  playerState, 
  setPlayerState,
  playlistContext,
) => {
console.log(`test`);

  const api = e.srcElement.api;

  const title = api?.videoTitle || "";

  setPlaylistContext((prev) => ({
    ...prev,
    name: title,
  }));

  if (playerState.collectingPlaylist) {

    setPlaylistContext((prev) => ({
  ...prev,
  metadataPlaylist: prev.metadataPlaylist.map((item, index) =>
    index === playerState.metadataIndex
      ? {
          ...item,
          name: title,
        }
      : item,
  ),
}));

    if (playerState.metadataIndex < playlistContext.metadataPlaylist.length - 1) {
      setTimeout(() => {
        setPlayerState((prev) => ({...prev, metadataIndex: prev.metadataIndex + 1}))
      }, 200);
    } else {
      setPlayerState((prev) => ({...prev, metadataIndex: 0}))
      setPlayerState((prev) => ({...prev, collectingPlaylist: false}))
    }

    return;
  }

  setPlayerState((prev) => ({
    ...prev,
    mode: "test",
  }));

  const playlist = api.playerInfo?.playlist;

  if (!playlist) {
    setPlayerState((prev) => ({
      ...prev,
      play: true,
    }));

    return;
  }

  const question = confirm("Do you want to copy the whole playlist?");
  
  if (!question) {
  const videoId = api.playerInfo.videoData.video_id;
  
  setPlaylistContext((prev) => ({
    ...prev,
    url: `https://www.youtube.com/watch?v=${videoId}`,
    name: title,
  }));

  setPlayerState((prev) => ({
    ...prev,
    play: true,
  }));

  return;
}

  startPlaylistCollection(
    playlist,
    setPlaylistContext,
    setPlayerState
  );
};

const startPlaylistCollection = (
  playlist,
  setPlaylistContext,
  setPlayerState
) => {
  const newPlaylist = playlist.map((videoId, index) => ({
    name: "",
    url: `https://www.youtube.com/watch?v=${videoId}`,
    id: index,
  }));

  setPlaylistContext((prev) => ({...prev, metadataPlaylist: newPlaylist}))
  setPlayerState((prev) => ({...prev, metadataIndex: 0, collectingPlaylist: true, play: false,
  }))
};
