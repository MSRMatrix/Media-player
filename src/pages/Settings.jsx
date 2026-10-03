import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { settingsArray } from "../config/settingsArray";

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();

  function settingsFunction(e) {
    navigate(`${e.target.value}`);
  }

  return (
    <>
      <div>
        {settingsArray.map((item) => (
          <button
            key={item.name}
            disabled={location.pathname === `/settings/${item.path}`}
            value={item.path}
            onClick={(e) => settingsFunction(e)}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Settings;
