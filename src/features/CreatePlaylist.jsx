import { useContext, useEffect } from "react";
import { LocaleStorageContext } from "../context/LocaleStorageContext";
import Form from "../elements/Form";
import { createPlaylist } from "../utils/createPlaylist";

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

  

  return (
    <Form
      submitFunction={(e) => createPlaylist(e, localeStorageContext,setLocaleStorageContext)}
      text="Create new list"
      id="Create-new-list"
      className=""
      formarray={formarray}
    />
  );
};

export default CreatePlaylist;