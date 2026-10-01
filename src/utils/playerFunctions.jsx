export const handleLoadedMetadata = (
  e,
  setPlaylistContext,
  playerState,
  setPlayerState,
  playlistContext,
) => {
  const api = e.srcElement.api;

  const title = api?.videoTitle || "";

  console.log(api.playerInfo);

  if (playerState.collectingPlaylist) {
    setPlaylistContext((prev) =>
      prev.map((item, index) =>
        index === playerState.metadataIndex
          ? {
              ...item,
              name: title,
            }
          : item,
      ),
    );

    if (playerState.metadataIndex < playlistContext.length - 1) {
      setTimeout(() => {
        setPlayerState((prev) => ({
          ...prev,
          metadataIndex: prev.metadataIndex + 1,
        }));
      }, 200);
    } else {
      setPlayerState((prev) => ({
        ...prev,
        metadataIndex: 0,
        collectingPlaylist: false,
      }));
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

    setPlaylistContext([
      {
        url: `https://www.youtube.com/watch?v=${videoId}`,
        name: title,
        id: 0,
      },
    ]);

    setPlayerState((prev) => ({
      ...prev,
      metadataIndex: 0,
      play: true,
    }));

    return;
  }

  startPlaylistCollection(
    playlist,
    setPlaylistContext,
    setPlayerState,
  );
};

const startPlaylistCollection = (
  playlist,
  setPlaylistContext,
  setPlayerState,
) => {
  const newPlaylist = playlist.map((videoId, index) => ({
    name: "",
    url: `https://www.youtube.com/watch?v=${videoId}`,
    id: index,
  }));

  setPlaylistContext(newPlaylist);

  setPlayerState((prev) => ({
    ...prev,
    metadataIndex: 0,
    collectingPlaylist: true,
    play: false,
  }));
};