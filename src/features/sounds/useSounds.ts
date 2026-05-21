import useSound from "use-sound";
import { useState } from "react";

import clickSound from "../../shared/assets/click.mp3";
import resultSound from "../../shared/assets/results.mp3";
import pageSound from "../../shared/assets/page.mp3";

const correctSounds = import.meta.glob("../../shared/assets/correct/*.wav", { eager: true });
const incorrectSounds = import.meta.glob("../../shared/assets/incorrect/*.wav", { eager: true });

const getFile = (sounds: Record<string, unknown>, folder: string, name: string) => {
	const key = `../../shared/assets/${folder}/${name}.wav`;
	return (sounds[key] as { default: string }).default;
};

const useGameSounds = () => {
	const [correctSound, setCorrectSound] = useState(
		localStorage.getItem("correctSound") || "nk-creams",
	);
	const [incorrectSound, setIncorrectSound] = useState(
		localStorage.getItem("incorrectSound") || "punch",
	);

	const changeCorrectSound = (sound: string) => {
		setCorrectSound(sound);
		localStorage.setItem("correctSound", sound);
	};

	const changeIncorrectSound = (sound: string) => {
		setIncorrectSound(sound);
		localStorage.setItem("incorrectSound", sound);
	};

	const previewCorrect = (name: string) => {
		new Audio(getFile(correctSounds, "correct", name)).play();
	};

	const previewIncorrect = (name: string) => {
		new Audio(getFile(incorrectSounds, "incorrect", name)).play();
	};

	const [playCorrect] = useSound(getFile(correctSounds, "correct", correctSound), {
		volume: 1,
		preload: true,
	});
	const [playIncorrect] = useSound(getFile(incorrectSounds, "incorrect", incorrectSound), {
		volume: 1,
		preload: true,
	});
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
		previewCorrect,
		previewIncorrect,
	};
};

export default useGameSounds;
