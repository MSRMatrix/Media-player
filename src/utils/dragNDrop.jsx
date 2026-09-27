export function onDrop(
  e,
  setLocaleStorageContext,
  playlist,
  dropPosition,
) {
  e.preventDefault();

  const song = JSON.parse(
    e.dataTransfer.getData("text/plain"),
  );

  const newSong = {
    ...song,
    id: crypto.randomUUID(),
  };

  const songs = [...playlist.songs];

  songs.splice(dropPosition, 0, newSong);

  setLocaleStorageContext((prev) => ({
    ...prev,
    playlist: prev.playlist.map((item) =>
      item.id === playlist.id
        ? {
            ...item,
            songs,
          }
        : item,
    ),
  }));
}