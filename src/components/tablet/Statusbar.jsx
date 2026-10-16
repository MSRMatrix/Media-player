const Statusbar = ({ children }) => {
  return (
    <div className="statusbar">
      <div className="statusbar-left">
        <span className="statusbar-time">15:30</span>
      </div>

      <div className="statusbar-center">
        {children}
      </div>

      <div className="statusbar-right">
        <span title="WLAN">⌁</span>
        <span title="Bluetooth">ᛒ</span>
        <span className="battery">
          <span className="battery-level" />
        </span>
      </div>
    </div>
  );
};

export default Statusbar;