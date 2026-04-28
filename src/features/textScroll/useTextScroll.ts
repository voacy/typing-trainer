import { useEffect, useState, type RefObject } from "react";

const useTextScroll = (currentWordIndex: number, wrapperRef: RefObject<HTMLDivElement | null>) => {
	const [currentLine, setCurrentLine] = useState(-1);
	useEffect(() => {
		const activeLetter = wrapperRef.current?.querySelector(".active");
		if (currentWordIndex === 0) return;
		const prevOffset =
			wrapperRef.current?.querySelectorAll("li")[currentWordIndex - 1].offsetTop ?? 0;
		const curOffset = activeLetter?.parentElement?.offsetTop ?? 0;

		if (curOffset > prevOffset) {
			setCurrentLine((prev) => prev + 1);
		}
	}, [currentWordIndex]);
	return currentLine;
};

export default useTextScroll;
