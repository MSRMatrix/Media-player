export const createPlaylist = (e, localeStorageContext,setLocaleStorageContext ) => {
    e.preventDefault();

    const value = e.target.elements[2].value.trim();

    if (!value) {
      return;
    }

    const findPlaylist = localeStorageContext.playlist.find(
      (item) => item.title === value,
    );

    if (findPlaylist) {
      alert("Playlist already exists");
      return;
    }

    const newPlaylist = {
      id: crypto.randomUUID(),
      title: value,
      songs: [],
    };

    setLocaleStorageContext((prev) => ({
      ...prev,
      playlist: [...prev.playlist, newPlaylist],
    }));
  };