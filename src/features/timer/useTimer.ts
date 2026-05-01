import { useState, useEffect } from "react";

const useTimer = (duration: number, isFinished: boolean, mode: string) => {
	const [timer, setTimer] = useState(duration);
	const [timerStatus, setTimerStatus] = useState(false);
	const [elapsed, setElapsed] = useState(0);

	useEffect(() => {
		if (timerStatus) {
			const interval = setInterval(() => {
				if (isFinished) return;
				setElapsed((prev) => prev + 1);
				setTimer((prev) => {
					if (mode !== "time") return prev;
					if (prev <= 1) {
						clearInterval(interval);
						return 0;
					}
					return prev - 1;
				});
			}, 1000);
			return () => clearInterval(interval);
		}
	}, [timerStatus, isFinished]);

	const startTimer = () => {
		setTimerStatus(true);
	};

	const resetTimer = (newDuration?: number) => {
		setTimer(newDuration ?? duration);
		setTimerStatus(false);
		setElapsed(0);
	};

	return { timer, timerStatus, startTimer, resetTimer, elapsed };
};

export default useTimer;
