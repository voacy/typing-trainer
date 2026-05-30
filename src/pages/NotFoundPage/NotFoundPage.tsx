import { useEffect } from "react";
import { Link } from "react-router-dom";
import { HouseIcon } from "@phosphor-icons/react";
import "./NotFoundPage.scss";

const NotFoundPage = () => {
	useEffect(() => {
		document.title = "Typezone | Not found";
	}, []);

	return (
		<div className="not-found">
			<h1 className="not-found__title">404</h1>
			<p className="not-found__description">looks like this page doesn't exist</p>
			<Link to="/" className="not-found__link">
				<HouseIcon size={16} weight="fill" />
				go home
			</Link>
		</div>
	);
};

export default NotFoundPage;
