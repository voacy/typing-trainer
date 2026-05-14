import "./App.scss";
import TypingPage from "../pages/TypingPage/TypingPage";
import Header from "../widgets/Header/Header";
import { TooltipProvider } from "../shared/ui/Tooltip";
import { Toaster } from "sonner";
import { SessionProvider } from "./SessionContext";

function App() {
	return (
		<TooltipProvider>
			<Toaster
				position="top-right"
				toastOptions={{
					style: {
						background: "var(--color-mode-bg)",
						color: "var(--color-accent)",
						border: "1px dashed var(--color-mode-bg)",
						outline: "1px dashed var(--color-accent)",
						fontSize: "14px",
						fontFamily: "inherit",
					},
				}}
			/>
			<SessionProvider>
				<Header />
				<TypingPage />
			</SessionProvider>
		</TooltipProvider>
	);
}

export default App;
