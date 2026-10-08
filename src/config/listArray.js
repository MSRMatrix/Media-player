export const listArray = ({ setLocaleStorageContext }) => [
  {
    iconName: "faTrashCan",

    onClick: (playlist, song) => {
      setLocaleStorageContext((prev) => ({
        ...prev,
        playlist: prev.playlist.map((item) =>
          item.id === playlist.id
            ? {
                ...item,
                songs: item.songs.filter(
                  (item) => item.id !== song.id,
                ),
              }
            : item,
        ),
      }));
    },
  },

  {
    iconName: "faGripLines",
    draggable: true,

    onDragStart: (e, song, playlist) => {
      e.dataTransfer.setData(
        "text/plain",
        JSON.stringify({
          song,
          sourcePlaylistId: playlist.id,
        }),
      );
    },
  },
];