import { useState, useRef } from "react";
import { Howl, Howler } from "howler";

import clickSoundSrc from "../../shared/assets/click.mp3";
import resultSoundSrc from "../../shared/assets/results.mp3";
import pageSoundSrc from "../../shared/assets/page.mp3";

const correctSoundFiles = import.meta.glob("../../shared/assets/correct/*.wav", { eager: true });
const incorrectSoundFiles = import.meta.glob("../../shared/assets/incorrect/*.wav", {
	eager: true,
});

const getFile = (files: Record<string, unknown>, folder: string, name: string): string => {
	const key = `../../shared/assets/${folder}/${name}.wav`;
	return (files[key] as { default: string }).default;
};

const createHowl = (src: string, volume: number) => new Howl({ src: [src], volume, preload: true });

const savedVolume = parseFloat(localStorage.getItem("volume") || "1");
Howler.volume(savedVolume);
const savedCorrectSound = localStorage.getItem("correctSound") || "nk-creams";
const savedIncorrectSound = localStorage.getItem("incorrectSound") || "punch";

let correctHowl =
	savedCorrectSound !== "off"
		? createHowl(getFile(correctSoundFiles, "correct", savedCorrectSound), 1)
		: null;

let incorrectHowl =
	savedIncorrectSound !== "off"
		? createHowl(getFile(incorrectSoundFiles, "incorrect", savedIncorrectSound), 1)
		: null;

const clickHowl = createHowl(clickSoundSrc, 0.3);
const resultHowl = createHowl(resultSoundSrc, 0.2);
const pageHowl = createHowl(pageSoundSrc, 0.3);

const useSound = () => {
	const [correctSound, setCorrectSound] = useState(savedCorrectSound);
	const [incorrectSound, setIncorrectSound] = useState(savedIncorrectSound);
	const [volume, setVolume] = useState(savedVolume);

	const volumePreviewTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	const changeVolume = (value: number) => {
		Howler.volume(value);
		setVolume(value);
		localStorage.setItem("volume", String(value));

		if (volumePreviewTimer.current) clearTimeout(volumePreviewTimer.current);
		volumePreviewTimer.current = setTimeout(() => {
			correctHowl?.play();
		}, 150);
	};

	const changeCorrectSound = (name: string) => {
		correctHowl?.unload();
		correctHowl =
			name !== "off" ? createHowl(getFile(correctSoundFiles, "correct", name), 1) : null;
		setCorrectSound(name);
		localStorage.setItem("correctSound", name);
	};

	const changeIncorrectSound = (name: string) => {
		incorrectHowl?.unload();
		incorrectHowl =
			name !== "off" ? createHowl(getFile(incorrectSoundFiles, "incorrect", name), 1) : null;
		setIncorrectSound(name);
		localStorage.setItem("incorrectSound", name);
	};

	const selectCorrectSound = (name: string) => {
		if (name !== "off") previewCorrect(name);
		changeCorrectSound(name);
	};

	const selectIncorrectSound = (name: string) => {
		if (name !== "off") previewIncorrect(name);
		changeIncorrectSound(name);
	};

	const previewCorrect = (name: string) => {
		const preview = new Howl({
			src: [getFile(correctSoundFiles, "correct", name)],
			volume: 1,
		});
		preview.once("end", () => preview.unload());
		preview.play();
	};

	const previewIncorrect = (name: string) => {
		const preview = new Howl({ src: [getFile(incorrectSoundFiles, "incorrect", name)], volume: 1 });
		preview.once("end", () => preview.unload());
		preview.play();
	};

	const playCorrect = () => correctHowl?.play();
	const playIncorrect = () => incorrectHowl?.play();
	const playClick = () => clickHowl.play();
	const playResult = () => resultHowl.play();
	const playPage = () => pageHowl.play();

	return {
		playCorrect,
		playIncorrect,
		playClick,
		playResult,
		playPage,
		previewCorrect,
		previewIncorrect,
		changeCorrectSound,
		changeIncorrectSound,
		selectCorrectSound,
		selectIncorrectSound,
		correctSound,
		incorrectSound,
		volume,
		changeVolume,
	};
};

export default useSound;
