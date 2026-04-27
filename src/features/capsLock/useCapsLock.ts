import { useEffect, useState } from "react";

const useCapsLock = () => {
	const [isCapsLock, setIsCapsLock] = useState(false);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			setIsCapsLock(e.getModifierState("CapsLock"));
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	return isCapsLock;
};

export default useCapsLock;
