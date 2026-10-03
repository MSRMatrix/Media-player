import { useContext } from "react";
import { LocaleStorageContext } from "../../context/LocaleStorageContext";
import { clearData, handleExport, handleImport } from "../../utils/dataOptions";

const ImportExport = () => {
  const { localeStorageContext, setLocaleStorageContext } =
    useContext(LocaleStorageContext);

  return (
    <>
      <label>
        Import
        <input type="file" accept=".json" onChange={() => handleImport(localeStorageContext)} />
      </label>

      <button onClick={(e) => handleExport(e)}>Export</button>

      <button onClick={() => clearData(setLocaleStorageContext)}>Clear Data</button>
    </>
  );
};

export default ImportExport;
