import { useContext, useEffect } from "react";
import { LocaleStorageContext } from "../context/LocaleStorageContext";
import Form from "../elements/Form";

const CreatePlaylist = () => {
  const {
    localeStorageContext,
    setLocaleStorageContext,
  } = useContext(LocaleStorageContext);

  const formarray = [
    {
      id: 1,
      element: "label",
      text: "Create-new-list",
    },
    {
      id: 2,
      element: "input",
      type: "text",
      placeholder: "New list",
    },
  ];

  useEffect(() => {
    localStorage.setItem(
      "playlist",
      JSON.stringify(localeStorageContext.playlist),
    );
  }, [localeStorageContext.playlist]);

  const onSubmit = (e) => {
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

  return (
    <Form
      submitFunction={onSubmit}
      text="Create new list"
      id="Create-new-list"
      className=""
      formarray={formarray}
    />
  );
};

export default CreatePlaylist;