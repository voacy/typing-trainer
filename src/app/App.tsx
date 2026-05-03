import "./App.scss";
import TypingPage from "../pages/TypingPage/TypingPage";
import Header from "../widgets/Header/Header";
import { TooltipProvider } from "../shared/ui/Tooltip";

function App() {
	return (
		<TooltipProvider>
			<Header />
			<TypingPage />
		</TooltipProvider>
	);
}

export default App;
