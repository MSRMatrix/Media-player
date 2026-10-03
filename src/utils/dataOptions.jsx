 export const handleExport = (localeStorageContext) => {
    const data = JSON.stringify(localeStorageContext, null, 2);

    const blob = new Blob([data], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "acoustiflow.json";
    link.click();

    URL.revokeObjectURL(url);
  };

 export  const handleImport = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);

        localStorage.getItem("playlist", data);
      } catch (error) {
        console.error("Import fehlgeschlagen:", error);
      }
    };

    reader.readAsText(file);
  };

 export function clearData(setLocaleStorageContext) {
    const question = confirm("Do you want to delete all of your data?");

    if (question) {
      setLocaleStorageContext((prev) => ({
        ...prev,
        playlist: [
          {
            id: crypto.randomUUID(),
            title: "Neue Playlist",
            songs: [],
          },
        ],
      }));
      return;
    } else {
      return;
    }
  }
