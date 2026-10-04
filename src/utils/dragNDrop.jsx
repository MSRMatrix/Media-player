export function onDragOver(e, index, setDropPosition) {
  e.preventDefault();

  const rect = e.currentTarget.getBoundingClientRect();

  const insertIndex =
    e.clientY < rect.top + rect.height / 2 ? index : index + 1;

  setDropPosition(insertIndex);
}

export function onDrop(e, setLocaleStorageContext, playlist, dropPosition) {
  e.preventDefault();

  const data = JSON.parse(e.dataTransfer.getData("text/plain"));
  
  const { song, sourcePlaylistId, playlist: sourcePlaylist } = data;

  if (sourcePlaylist) {

    const droppedSongs = sourcePlaylist;

    setLocaleStorageContext((prev) => ({
      ...prev,

      playlist: prev.playlist.map((item) => {
        if (item.id !== playlist.id) {
          return item;
        }

        const songs = [...item.songs];

        // Playlist wird in sich selbst verschoben
        if (sourcePlaylistId === playlist.id) {
          const movingSongs = [...droppedSongs];

          const remainingSongs = songs.filter(
            (song) =>
              !movingSongs.some((movingSong) => movingSong.id === song.id),
          );

          remainingSongs.splice(dropPosition, 0, ...movingSongs);

          return {
            ...item,
            songs: remainingSongs,
          };
        }

        // Andere Playlist → Songs kopieren
        const copiedSongs = droppedSongs.map((song) => ({
          ...song,
          id: crypto.randomUUID(),
        }));

        songs.splice(dropPosition, 0, ...copiedSongs);

        return {
          ...item,
          songs,
        };
      }),
    }));
    return;
  }

  setLocaleStorageContext((prev) => ({
    ...prev,
    playlist: prev.playlist.map((item) => {
      if (item.id !== playlist.id) {
        return item;
      }

      const songs = [...item.songs];

      if (sourcePlaylistId === playlist.id) {
        const oldIndex = songs.findIndex((item) => item.id === song.id);

        songs.splice(oldIndex, 1);

        const newIndex =
          oldIndex < dropPosition ? dropPosition - 1 : dropPosition;

        songs.splice(newIndex, 0, song);

        return {
          ...item,
          songs,
        };
      }

      // Andere Playlist → Kopie erstellen
      songs.splice(dropPosition, 0, {
        ...song,
        id: crypto.randomUUID(),
      });

      return {
        ...item,
        songs,
      };
    }),
  }));
  return;
}
