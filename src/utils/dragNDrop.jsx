export function onDrop(e, setLocaleStorageContext, playlist) {
  e.preventDefault();

  const song = JSON.parse(e.dataTransfer.getData("text/plain"));
  setLocaleStorageContext((prev) => ({
    ...prev,
    playlist: prev.playlist.map((item) =>
      item.id === playlist.id
        ? {
            ...item,
            songs: [
              ...item.songs,
              {
                ...song,
                id: crypto.randomUUID(),
              },
            ],
          }
        : item,
    ),
  }));
}
