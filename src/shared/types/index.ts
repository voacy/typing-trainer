export type LetterStatus = "correct" | "incorrect" | "idle" | "extra";

export type Mode = "words" | "time" | "quote";

export type TypingSettings = {
	mode: Mode;
	isPunctuation: boolean;
	count: number;
	language: string;
};

export type CursorPosition = {
	top: number;
	left: number;
};

export type Theme = "cherry-blossom" | "midnight-ocean" | "forest-ink" | "ember" | "gold-rush";
