import { useThemeContext } from "../../../context/themeContext.jsx";

const ThemeForm = () => {
  const { activeTheme, changeTheme, themes } = useThemeContext();

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-gray-500 uppercase font-bold">Pick a color</p>
      <div className="flex flex-wrap gap-3">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => changeTheme(theme.id)}
            title={theme.label}
            className={`w-8 h-8 rounded-full cursor-pointer ring-offset-2 transition
              ${activeTheme.id === theme.id ? "ring-2 ring-gray-400" : "hover:ring-2 hover:ring-gray-300"}`}
            style={{ backgroundColor: theme.accent }}
          />
        ))}
      </div>
      <p className="text-sm text-gray-500">
        Current theme:{" "}
        <span className="font-medium" style={{ color: activeTheme.accent }}>
          {activeTheme.label}
        </span>
      </p>
    </div>
  );
};

export default ThemeForm;
