import { useState, useEffect } from "react";

const useTimer = () => {
	const [timer, setTimer] = useState(100);
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

	return { timer, timerStatus, startTimer };
};

export default useTimer;
