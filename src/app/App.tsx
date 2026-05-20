import "./App.scss";
import TypingPage from "../pages/TypingPage/TypingPage";
import Header from "../widgets/Header/Header";
import AboutPage from "../pages/AboutPage/AboutPage";
import SettingsPage from "../pages/SettingsPage/SettingsPage";
import { TooltipProvider } from "../shared/ui/Tooltip";
import { Toaster } from "sonner";
import { Routes, Route, useLocation } from "react-router-dom";
import useTheme from "../features/theme/useTheme";
import NProgress from "nprogress";
import { useEffect } from "react";

function App() {
	useTheme();
	const location = useLocation();

	useEffect(() => {
		NProgress.start();
		NProgress.done();
	}, [location.pathname]);
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
			<Header />
			<Routes>
				<Route path="/" element={<TypingPage />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="/settings" element={<SettingsPage />} />
			</Routes>
		</TooltipProvider>
	);
}

export default App;
