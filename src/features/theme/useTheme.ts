import { useState } from "react";
import type { Theme } from "../../shared/types";

const useTheme = () => {
	const [theme, setTheme] = useState<Theme>("cherry-blossom");

	const changeTheme = (newTheme: Theme) => {
		setTheme(newTheme);
		if (newTheme === "cherry-blossom") {
			document.body.removeAttribute("data-theme");
		} else {
			document.body.setAttribute("data-theme", newTheme);
		}
	};

	return { theme, changeTheme };
};

export default useTheme;
