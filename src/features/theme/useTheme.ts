import { useState } from "react";
import type { Theme } from "../../shared/types";

const DEFAULT_THEME: Theme = "solarized-dark";

const useTheme = () => {
	const savedTheme = localStorage.getItem("theme") as Theme;
	const [theme, setTheme] = useState<Theme>(savedTheme || DEFAULT_THEME);

	if (savedTheme) {
		document.body.setAttribute("data-theme", savedTheme);
	}

	const changeTheme = (newTheme: Theme) => {
		setTheme(newTheme);
		document.body.setAttribute("data-theme", newTheme);
		localStorage.setItem("theme", newTheme);
	};

	return { theme, changeTheme };
};

export default useTheme;
