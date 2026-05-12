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
	| "solarized-dark"
	| "dracula"
	| "nord"
	| "tokyo-night"
	| "rose-pine"
	| "gruvbox-dark"
	| "kanagawa"
	| "catppuccin-mocha"
	| "one-dark"
	| "everforest"
	| "dusk"
	| "steel-blue"
	| "muted-grape"
	| "sandstone"
	| "arctic"
	| "slate-mist"
	| "warm-gray"
	| "dusty-rose";
