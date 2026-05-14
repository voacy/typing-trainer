import React, { createContext, useContext } from "react";
import useSession from "../pages/TypingPage/useSession";
import type { LetterStatus, TypingSettings } from "../shared/types";

type SessionContextType = {
	settings: TypingSettings;
	setSettings: React.Dispatch<React.SetStateAction<TypingSettings>>;
	isFinished: boolean;
	words: string[];
	timer: number;
	timerStatus: boolean;
	currentWordIndex: number;
	currentLetterIndex: number;
	letterStatuses: LetterStatus[][];
	extraChars: string[][];
	wpm: number;
	accuracy: number;
	handleReset: (newSettings?: TypingSettings) => void;
	chartData: { wpm: number; accuracy: number; errors: number }[];
	elapsed: number;
	correct: number;
	incorrect: number;
	extra: number;
	snapshot: { words: string[]; letterStatuses: LetterStatus[][]; extraChars: string[][] } | null;
};

const SessionContext = createContext<SessionContextType | null>(null);

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
	const session = useSession();

	return (
		<SessionContext value={session}>
			<div className={session.timerStatus ? "session--active" : ""}>{children}</div>
		</SessionContext>
	);
};

export const useSessionContext = () => {
	const value = useContext(SessionContext);
	if (!value) throw new Error("useSessionContext must be used within SessionProvider");
	return value;
};
