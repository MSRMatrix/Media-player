import { useNavigate, useLocation } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  function navigateFunction(e) {
    navigate(`/${e.target.value}`);
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
      <div>
        {navArray.map((item) => (
          <button
            key={item.name}
            disabled={location.pathname === `/${item.path}`}
            value={item.path}
            onClick={(e) => navigateFunction(e)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </>
  );
};

export default Navigation;
