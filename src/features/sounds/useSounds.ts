import useSound from "use-sound";

import clickSound from "../../shared/assets/click.mp3";
import resultSound from "../../shared/assets/results.mp3";
import correctSound from "../../shared/assets/correct.wav";
import incorrectSound from "../../shared/assets/incorrect.wav";

const useGameSounds = () => {
	const [playClick] = useSound(clickSound, { volume: 0.2 });
	const [playResult] = useSound(resultSound, { volume: 0.2 });
	const [playCorrect] = useSound(correctSound, { volume: 0.5 });
	const [playIncorrect] = useSound(incorrectSound, { volume: 0.2 });

	return {
		playClick,
		playResult,
		playCorrect,
		playIncorrect,
	};
};

export default useGameSounds;
