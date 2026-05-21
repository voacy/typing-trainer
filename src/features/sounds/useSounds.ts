import useSound from "use-sound";

import clickSound from "../../shared/assets/click.mp3";
import resultSound from "../../shared/assets/results.mp3";
import pageSound from "../../shared/assets/page.mp3";
import { useState } from "react";

const correctSounds = import.meta.glob("../../shared/assets/correct/*.wav", { eager: true });

const incorrectSounds = import.meta.glob("../../shared/assets/incorrect/*.wav", { eager: true });

const useGameSounds = () => {
	const [correctSound, setCorrectSound] = useState(
		localStorage.getItem("correctSound") || "nk-creams",
	);
	const [incorrectSound, setIncorrectSound] = useState(
		localStorage.getItem("incorrectSound") || "punch",
	);

	const key = `../../shared/assets/correct/${correctSound}.wav`;
	const file = (correctSounds[key] as { default: string }).default;

	const changeCorrectSound = (sound: string) => {
		setCorrectSound(sound);
		localStorage.setItem("correctSound", sound);
	};

	const changeIncorrectSound = (sound: string) => {
		setIncorrectSound(sound);
		localStorage.setItem("incorrectSound", sound);
	};

	const incorrectKey = `../../shared/assets/incorrect/${incorrectSound}.wav`;
	const incorrectFile = (incorrectSounds[incorrectKey] as { default: string }).default;

	const [playCorrect] = useSound(file, { volume: 1, preload: true });
	const [playIncorrect] = useSound(incorrectFile, { volume: 1, preload: true });

	const [playPage] = useSound(pageSound, { volume: 0.3, preload: true });
	const [playClick] = useSound(clickSound, { volume: 0.3, preload: true });
	const [playResult] = useSound(resultSound, { volume: 0.2, preload: true });

	return {
		playClick,
		playResult,
		playCorrect,
		playIncorrect,
		playPage,
		changeCorrectSound,
		changeIncorrectSound,
		correctSound,
		incorrectSound,
	};
};

export default useGameSounds;
