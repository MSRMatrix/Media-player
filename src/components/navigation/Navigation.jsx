import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { navArray } from "../../config/navArray";
import { PlayerContext } from "../../context/PlayerContext";
import { PlaylistContext } from "../../context/PlaylistContext";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { playerState, setPlayerState } = useContext(PlayerContext);
  const { setPlaylistContext } = useContext(PlaylistContext);
  function navigateFunction(e) {
    if (location.pathname !== "media-input" && playerState.mode === "test") {
      setPlayerState((prev) => ({
        ...prev,
        mode: "",
      }));
      setPlaylistContext([]);
    }
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
