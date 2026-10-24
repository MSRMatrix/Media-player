import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { settingsArray } from "../config/settingsArray";
import Button from "../elements/Button";

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
          <Button 
          key={item.name}
            disabled={location.pathname === `/settings/${item.path}`}
            value={item.path}
            onClick={(e) => settingsFunction(e)}
            text={item.name}
          />
        ))}
      </div>

      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Settings;
