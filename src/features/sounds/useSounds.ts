import useSound from "use-sound";

import clickSound from "../../shared/assets/click.mp3";
import resultSound from "../../shared/assets/results.mp3";
import correctSound from "../../shared/assets/correct.wav";
import incorrectSound from "../../shared/assets/incorrect.wav";
import pageSound from "../../shared/assets/page.mp3";

const useGameSounds = () => {
	const [playPage] = useSound(pageSound, { volume: 0.3, preload: true });
	const [playClick] = useSound(clickSound, { volume: 0.3, preload: true });
	const [playResult] = useSound(resultSound, { volume: 0.2, preload: true });
	const [playCorrect] = useSound(correctSound, { volume: 1, preload: true });
	const [playIncorrect] = useSound(incorrectSound, { volume: 1, preload: true });

	return {
		playClick,
		playResult,
		playCorrect,
		playIncorrect,
		playPage,
	};
};

export default useGameSounds;
