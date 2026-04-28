import { useEffect, useState, type RefObject } from "react";

const useCursor = (
	currentLetterIndex: number,
	currentWordIndex: number,
	currentLine: number,
	wrapperRef: RefObject<HTMLDivElement | null>,
) => {
	const [cursorPos, setCursorPos] = useState({ top: 0, left: 0 });
	useEffect(() => {
		const activeLetter = wrapperRef.current?.querySelector(".active");

		if (activeLetter && wrapperRef.current) {
			const elPos = activeLetter.getBoundingClientRect();
			const wrapperPos = wrapperRef.current.getBoundingClientRect();
			setCursorPos({
				top: elPos.top - wrapperPos.top,
				left: elPos.left - wrapperPos.left,
			});
		}
	}, [currentLetterIndex, currentWordIndex, currentLine]);
	return cursorPos;
};

export default useCursor;
