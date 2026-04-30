import "./Header.scss";
import { RabbitIcon } from "@phosphor-icons/react";

const Header = () => {
	return (
		<header className="header">
			<div className="container">
				<a href="/" className="logo">
					<RabbitIcon size={32} weight="regular" />
					speedkeys
				</a>
			</div>
		</header>
	);
};

export default Header;
