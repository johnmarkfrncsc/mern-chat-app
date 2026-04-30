import MobileSettings from "./settings/MobileSettings.jsx";
import DesktopSettings from "./settings/DesktopSettings.jsx";

const Settings = (props) => {
  return (
    <>
      <div className="hidden md:block">
        <DesktopSettings {...props} />
      </div>

      <div className="block md:hidden">
        <MobileSettings {...props} />
      </div>
    </>
  );
};

export default Settings;
