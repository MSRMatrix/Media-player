import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate()

  function navigateFunction(e, path){
    
   navigate(`/${path}`)
  }

  const navArray = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "lists",
      name: "Lists",
    },
    // {
    //   path: "lists/:id",
    //   name: "List",
    // },
    {
      path: "import-export",
      name: "ImportExport",
    },
    {
      path: "tutorial",
      name: "Tutorial",
    },
    {
      path: "music-check",
      name: "MusicCheck",
    },
    {
      path: "youtube",
      name: "Youtube",
    },
  ];
  return (
    <>
      <ul>
        {navArray.map((item) => (
          <li key={item.name} value={item.name} onClick={(e) => navigateFunction(e, item.path)}>{item.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Navigation;
