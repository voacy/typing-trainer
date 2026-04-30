import "./Header.scss";
import { ButterflyIcon } from "@phosphor-icons/react";

const Header = () => {
	return (
		<header className="header">
			<div className="container">
				<a href="/" className="logo">
					<ButterflyIcon size={32} weight="regular" />
					speedkeys
				</a>
			</div>
		</header>
	);
};

export default Header;
