import { useEffect, useState, type RefObject } from "react";
import { LINE_HEIGHT } from "../../shared/constants";

const useTextScroll = (currentWordIndex: number, wrapperRef: RefObject<HTMLDivElement | null>) => {
	const [offset, setOffset] = useState(0);

	useEffect(() => {
		const activeLetter = wrapperRef.current?.querySelector(".active");
		const curOffset = activeLetter?.parentElement?.offsetTop ?? 0;

		setOffset((prev) => {
			if (curOffset > prev) {
				return curOffset;
			} else if (curOffset < prev - LINE_HEIGHT) {
				return prev - LINE_HEIGHT;
			}
			return prev;
		});
	}, [currentWordIndex]);

	return offset;
};

export default useTextScroll;
