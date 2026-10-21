export function checkedHandler(e, setPlayerState, song) {
    if (e.target.checked) {
      setPlayerState((prev) => ({
        ...prev,
        songs: [...prev.songs, song.id],
      }));
    } else {
      setPlayerState((prev) => ({
        ...prev,
        songs: prev.songs.filter((id) => id !== song.id),
      }));
    }
  }
