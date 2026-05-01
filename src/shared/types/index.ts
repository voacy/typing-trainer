export type LetterStatus = "correct" | "incorrect" | "idle" | "extra";

export type TypingSettings = {
	mode: string;
	isPunctuation: boolean;
	count: number;
	language: string;
};
