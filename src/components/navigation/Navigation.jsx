import { useNavigate, useLocation } from "react-router-dom";
import { PlayerModeContext } from "../../context/PlayerModeContext";
import { useContext } from "react";
import { navArray } from "../../config/navArray";

const Navigation = ({setMetadataPlaylist}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { playerMode, setPlayerMode } = useContext(PlayerModeContext);

  function navigateFunction(e) {
     setPlayerMode((prev) => ({
      ...prev,
      mode: "",
    }));
    setMetadataPlaylist([])
    navigate(`/${e.target.value}`);
  }



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
