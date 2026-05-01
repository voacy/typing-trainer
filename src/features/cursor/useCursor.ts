import { useEffect, useState, type RefObject } from "react";
import type { CursorPosition } from "../../shared/types";

const useCursor = (
	currentLetterIndex: number,
	currentWordIndex: number,
	offset: number,
	wrapperRef: RefObject<HTMLDivElement | null>,
): CursorPosition => {
	const [cursorPos, setCursorPos] = useState<CursorPosition>({ top: 0, left: 0 });

	useEffect(() => {
		const activeLetter = wrapperRef.current?.querySelector(".active");
		const textEl = wrapperRef.current?.querySelector(".text");

		if (activeLetter && textEl && wrapperRef.current) {
			const elPos = activeLetter.getBoundingClientRect();
			const textPos = textEl.getBoundingClientRect();
			setCursorPos({
				top: elPos.top - textPos.top,
				left: elPos.left - textPos.left,
			});
		}
	}, [currentLetterIndex, currentWordIndex, offset]);

	return cursorPos;
};

export default useCursor;
