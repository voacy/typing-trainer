import { useState, useEffect } from "react";

const useTimer = (duration: number) => {
	const [timer, setTimer] = useState(duration);
	const [timerStatus, setTimerStatus] = useState(false);

	useEffect(() => {
		if (timerStatus) {
			const interval = setInterval(() => {
				setTimer((prev) => {
					if (prev <= 1) {
						clearInterval(interval);
						return 0;
					}
					return prev - 1;
				});
			}, 1000);
			return () => clearInterval(interval);
		}
	}, [timerStatus]);

	const startTimer = () => {
		setTimerStatus(true);
	};

	const resetTimer = (newDuration?: number) => {
		setTimer(newDuration ?? duration);
		setTimerStatus(false);
	};

	return { timer, timerStatus, startTimer, resetTimer };
};

export default useTimer;
