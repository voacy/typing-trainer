import { useState } from "react";
import type { Theme } from "./themes";

const DEFAULT_THEME: Theme = "sewing-tin";

const useTheme = () => {
	const [theme, setTheme] = useState<Theme>(() => {
		const saved = (localStorage.getItem("theme") as Theme) || DEFAULT_THEME;
		document.body.setAttribute("data-theme", saved);
		return saved;
	});

	const changeTheme = (newTheme: Theme) => {
		setTheme(newTheme);
		document.body.setAttribute("data-theme", newTheme);
		localStorage.setItem("theme", newTheme);
	};

	return { theme, changeTheme };
};

export default useTheme;
