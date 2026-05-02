import { useState } from "react";
import type { Theme } from "../../shared/types";

const useTheme = () => {
	const savedTheme = localStorage.getItem("theme") as Theme;
	const [theme, setTheme] = useState<Theme>(savedTheme ? savedTheme : "cherry-blossom");

	if (savedTheme) {
		document.body.setAttribute("data-theme", savedTheme);
	}

	const changeTheme = (newTheme: Theme) => {
		setTheme(newTheme);
		if (newTheme === "cherry-blossom") {
			document.body.removeAttribute("data-theme");
		} else {
			document.body.setAttribute("data-theme", newTheme);
		}

		localStorage.setItem("theme", newTheme);
	};

	return { theme, changeTheme };
};

export default useTheme;
