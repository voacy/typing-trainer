import useSound from "use-sound";

import clickSound from "../../shared/assets/click.mp3";
import resultSound from "../../shared/assets/results.mp3";

const useGameSounds = () => {
	const [playClick] = useSound(clickSound, { volume: 0.2 });
	const [playResult] = useSound(resultSound, { volume: 0.2 });

	return {
		playClick,
		playResult,
	};
};

export default useGameSounds;
