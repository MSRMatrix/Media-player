// export function onDrop(e, setLocaleStorageContext, playlist, dropPosition) {
//   e.preventDefault();

//   const song = JSON.parse(e.dataTransfer.getData("text/plain"));

//   const newSong = {
//     ...song,
//     id: crypto.randomUUID(),
//   };

//   const songs = [...playlist.songs];

//   songs.splice(dropPosition, 0, newSong);

//   setLocaleStorageContext((prev) => ({
//     ...prev,
//     playlist: prev.playlist.map((item) =>
//       item.id === playlist.id
//         ? {
//             ...item,
//             songs,
//           }
//         : item,
//     ),
//   }));
// }

export function onDragOver(e, index, setDropPosition) {
  e.preventDefault();

  const rect = e.currentTarget.getBoundingClientRect();

  const insertIndex =
    e.clientY < rect.top + rect.height / 2 ? index : index + 1;

  setDropPosition(insertIndex);
}


export function onDrop(
  e,
  setLocaleStorageContext,
  playlist,
  dropPosition,
) {
  e.preventDefault();

  const data = JSON.parse(
    e.dataTransfer.getData("text/plain"),
  );

console.log(data);

  const {song, sourcePlaylistId} = data;
  

  setLocaleStorageContext((prev) => ({
    ...prev,
    playlist: prev.playlist.map((item) => {
      if (item.id !== playlist.id) {
        return item;
      }

      const songs = [...item.songs];

      if (sourcePlaylistId === playlist.id) {
        const oldIndex = songs.findIndex(
          (item) => item.id === song.id,
        );

        songs.splice(oldIndex, 1);

        const newIndex =
          oldIndex < dropPosition
            ? dropPosition - 1
            : dropPosition;

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
}