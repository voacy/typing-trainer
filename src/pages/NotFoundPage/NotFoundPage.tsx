import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.scss";

const NotFoundPage = () => {
	useEffect(() => {
		document.title = "Typezone | Not found";
	}, []);

	return (
		<div className="not-found">
			<p className="not-found__subtitle">why are you here...</p>
			<h1 className="not-found__title">404 </h1>
			<p className="not-found__description">looks like this page doesn't exist</p>
			<Link to="/" className="not-found__link">
				go home
			</Link>
		</div>
	);
};

export default NotFoundPage;
