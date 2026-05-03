export type LetterStatus = "correct" | "incorrect" | "idle" | "extra";

export type Mode = "words" | "time" | "quote";

export type TypingSettings = {
	mode: Mode;
	isPunctuation: boolean;
	isNumbers: boolean;
	count: number;
	language: string;
};

export type CursorPosition = {
	top: number;
	left: number;
};

export type Theme =
	| "cherry-blossom"
	| "midnight-ocean"
	| "forest-ink"
	| "ember"
	| "gold-rush"
	| "dracula"
	| "nord"
	| "tokyo-night"
	| "catppuccin-mocha"
	| "gruvbox-dark"
	| "solarized-dark"
	| "one-dark"
	| "rose-pine"
	| "matrix"
	| "kanagawa"
	| "neon-city"
	| "coffee"
	| "slate"
	| "crimson";
